import express from 'express';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  console.log('[Server] Starting server at ' + new Date().toISOString());
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Debug middleware
  app.use((req, res, next) => {
    if (req.path.startsWith('/api/')) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    }
    next();
  });

  // Storage configuration
  const UPLOADS_DIR = path.join(process.cwd(), 'storage');
  const VARIANTS = {
    thumbnail: { width: 300, suffix: '_thumb' },
    medium: { width: 1600, suffix: '_med' },
    large: { width: 2500, suffix: '_lg' }
  };

  // Ensure storage directories exist
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  await fs.mkdir(path.join(UPLOADS_DIR, 'originals'), { recursive: true });
  await fs.mkdir(path.join(UPLOADS_DIR, 'variants'), { recursive: true });

  // Use diskStorage to keep memory low during large uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(UPLOADS_DIR, 'originals'));
    },
    filename: (req, file, cb) => {
      const fileId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const ext = path.extname(file.originalname) || '.jpg';
      cb(null, `${fileId}${ext}`);
    }
  });

  const upload = multer({ 
    storage,
    limits: { fileSize: 30 * 1024 * 1024 } // Increased to 30MB
  });

  // Optimize Sharp memory
  sharp.concurrency(1); // Process one image at a time
  sharp.cache(false);

  const DB_PATH = path.join(UPLOADS_DIR, 'db.json');

  // Simple JSON DB helpers
  async function getDB() {
    try {
      if (!await fs.access(DB_PATH).then(() => true).catch(() => false)) {
        return { 
          events: {}, 
          eventMetadata: {
            '1': {
              id: '1',
              title: 'Wedding of Sarah & John',
              eventDate: '2024-05-15',
              createdAt: '2024-05-16',
              photoCount: 450,
              folderCount: 4,
              storageSize: 1200,
              image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
              status: 'Published',
              faceSearchCount: 88,
              registrationCount: 120,
              shareSettings: {
                accessType: 'full',
                passwordEnabled: false,
                pin: '0000',
                registrationEnabled: true,
                fullAccessToken: 'wedding-full-2024',
                faceSearchToken: 'wedding-face-xyz'
              }
            },
            '2': {
              id: '2',
              title: 'GALA Night 2024',
              eventDate: '2024-04-20',
              createdAt: '2024-04-21',
              photoCount: 88,
              folderCount: 1,
              storageSize: 240,
              image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=600&auto=format&fit=crop',
              status: 'Published',
              faceSearchCount: 7,
              registrationCount: 3,
              shareSettings: {
                accessType: 'full',
                passwordEnabled: false,
                pin: '5678',
                registrationEnabled: false,
                fullAccessToken: 'gala-full-2024',
                faceSearchToken: 'gala-face-abc'
              }
            },
            '3': {
              id: '3',
              title: 'Summer Festival',
              eventDate: '2024-06-10',
              createdAt: '2024-06-11',
              photoCount: 1205,
              folderCount: 12,
              storageSize: 4500,
              image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=600&auto=format&fit=crop',
              status: 'Published',
              faceSearchCount: 245,
              registrationCount: 500,
              shareSettings: {
                accessType: 'full',
                passwordEnabled: false,
                pin: '1357',
                registrationEnabled: false,
                fullAccessToken: 'summer-f-full',
                faceSearchToken: 'summer-f-face'
              }
            },
            '4': {
              id: '4',
              title: 'Corporate Retreat',
              eventDate: '2024-03-05',
              createdAt: '2024-03-06',
              photoCount: 17,
              folderCount: 1,
              storageSize: 45,
              status: 'Draft',
              faceSearchCount: 0,
              registrationCount: 0,
              shareSettings: {
                accessType: 'full',
                passwordEnabled: false,
                pin: '2468',
                registrationEnabled: false,
                fullAccessToken: 'corp-2024-full',
                faceSearchToken: 'corp-2024-face'
              }
            }
          } 
        };
      }
      const data = await fs.readFile(DB_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      if (!parsed.eventMetadata) parsed.eventMetadata = {};
      return parsed;
    } catch {
      return { events: {}, eventMetadata: {} };
    }
  }

  async function saveToDB(eventId: string, photo: any) {
    const db = await getDB();
    if (!db.events[eventId]) db.events[eventId] = [];
    photo.eventId = eventId; 
    db.events[eventId].push(photo);
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  }

  async function updatePhotoInDB(eventId: string, photoId: string, updates: any) {
    const db = await getDB();
    if (db.events[eventId]) {
      db.events[eventId] = db.events[eventId].map((p: any) => 
        p.id === photoId ? { ...p, ...updates, variants: { ...p.variants, ...updates.variants } } : p
      );
      await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
    }
  }

  async function saveEventToDB(event: any) {
    const db = await getDB();
    db.eventMetadata[event.id] = event;
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2));
  }

  // Serve static files from storage
  app.use('/storage', express.static(UPLOADS_DIR));

  // Image Upload & Processing API
  app.post('/api/upload', (req, res, next) => {
    console.log('[Upload] Starting multer processing...');
    next();
  }, upload.array('photos'), async (req: any, res) => {
    const eventId = req.body.eventId;
    console.log(`[Upload] Body received:`, { eventId, hasFiles: !!req.files });
    const files = req.files as any[];

    try {
      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      const results = [];
      
      for (const file of files) {
        console.log(`[Upload] Processing: ${file.filename}`);
        const fileId = path.basename(file.filename, path.extname(file.filename));
        const originalPath = file.path;

        try {
          const variantMeta: any = {
            id: fileId, // Ensure ID is consistent
            fileId,
            original: `/storage/originals/${file.filename}`,
            filename: file.originalname,
            thumbnail: '',
            medium: '',
            large: '',
            blur: ''
          };

          // Process variants sequentially
          for (const [key, config] of Object.entries(VARIANTS)) {
            const variantFilename = `${fileId}${config.suffix}.webp`;
            const variantPath = path.join(UPLOADS_DIR, 'variants', variantFilename);
            
            await sharp(originalPath)
              .rotate() 
              .resize({ width: config.width, withoutEnlargement: true })
              .webp({ quality: 80 })
              .toFile(variantPath);
            
            variantMeta[key] = `/storage/variants/${variantFilename}`;
          }

          // Generate blur placeholder
          const blurBuffer = await sharp(originalPath)
            .rotate()
            .resize(20)
            .webp({ quality: 20 })
            .toBuffer();
          const blurData = `data:image/webp;base64,${blurBuffer.toString('base64')}`;
          variantMeta.blur = blurData;
          variantMeta.url = variantMeta.medium; // Use medium by default for general display
          variantMeta.variants = {
            thumbnail: variantMeta.thumbnail,
            medium: variantMeta.medium,
            large: variantMeta.large,
            original: variantMeta.original,
            blur: blurData
          };

          await saveToDB(eventId, variantMeta);
          results.push(variantMeta);
        } catch (fileError) {
          console.error(`[Upload] Error processing ${file.filename}:`, fileError);
        }
      }

      res.status(200).json({ success: true, photos: results });
    } catch (error) {
      console.error('[Upload] Critical error:', error);
      res.status(500).json({ error: 'Internal server error during upload' });
    }
  });

  // Events API
  app.get('/api/events', async (req, res) => {
    const db = await getDB();
    res.json({ success: true, events: Object.values(db.eventMetadata) });
  });

  app.post('/api/events', express.json(), async (req, res) => {
    const event = req.body;
    if (!event.id) return res.status(400).json({ error: 'Missing event ID' });
    await saveEventToDB(event);
    res.json({ success: true });
  });

  // Get Photos for Event
  app.get('/api/events/:eventId/photos', async (req, res) => {
    const { eventId } = req.params;
    const db = await getDB();
    const photos = (db.events[eventId] || []).map((p: any) => ({
      ...p,
      eventId: p.eventId || eventId 
    }));
    res.json({ success: true, photos });
  });

  // Smart Rotation API
  app.post('/api/rotate', async (req, res) => {
    const { photoIds, eventId } = req.body;
    if (!photoIds || !Array.isArray(photoIds)) {
      return res.status(400).json({ error: 'Invalid photo IDs' });
    }

    console.log(`[Rotate] Request to rotate ${photoIds.length} photos`);

    try {
      const originalsDir = path.join(UPLOADS_DIR, 'originals');
      const variantsDir = path.join(UPLOADS_DIR, 'variants');
      const files = await fs.readdir(originalsDir);

      console.log(`[Rotate] Found ${files.length} originals. IDs to check: ${photoIds.join(', ')}`);

      const results = [];
      
      for (const id of photoIds) {
        try {
          const originalFile = files.find(f => f.startsWith(id + '.') || f === id);
          
          if (!originalFile) {
            console.log(`[Rotate] Original file not found for ID: ${id}`);
            continue;
          }

          const originalPath = path.join(originalsDir, originalFile);
          
          // Requirement: Check EXIF Orientation tag
          const metadata = await sharp(originalPath).metadata();
          
          // Skip if already correctly oriented (1) or no orientation tag
          // Orientation 1 is normal. Values 2-8 need correction.
          if (!metadata.orientation || metadata.orientation === 1) {
            console.log(`[Rotate] Photo ${id} already correctly oriented or has no EXIF tag. Skipping.`);
            continue;
          }

          console.log(`[Rotate] Fixing photo ${id}: Orientation=${metadata.orientation}`);

          const updatedMeta: any = { id };
          const timestamp = Date.now();
          
          // Force rotation based on EXIF and normalize
          for (const [key, config] of Object.entries(VARIANTS)) {
            const variantFilename = `${id}${config.suffix}.webp`;
            const variantPath = path.join(variantsDir, variantFilename);
            
            await sharp(originalPath)
              .rotate() // Automatically uses EXIF orientation and strips the tag
              .resize({ width: config.width, withoutEnlargement: true })
              .webp({ quality: 80 })
              .toFile(variantPath);
            
            updatedMeta[key] = `/storage/variants/${variantFilename}?t=${timestamp}`;
          }

          const blurBuffer = await sharp(originalPath)
            .rotate()
            .resize(20)
            .webp({ quality: 20 })
            .toBuffer();
          const blurData = `data:image/webp;base64,${blurBuffer.toString('base64')}`;
          updatedMeta.blur = blurData;
          updatedMeta.url = updatedMeta.medium; 

          updatedMeta.variants = {
            thumbnail: updatedMeta.thumbnail,
            medium: updatedMeta.medium,
            large: updatedMeta.large,
            blur: blurData,
            original: `/storage/originals/${originalFile}?t=${timestamp}`
          };

          if (eventId) {
            await updatePhotoInDB(eventId, id, updatedMeta);
          }
          
          results.push(updatedMeta);
          console.log(`[Rotate] Successfully oriented ${id}`);
        } catch (err) {
          console.error(`[Rotate] Error rotating ${id}:`, err);
        }
      }

      res.status(200).json({ 
        success: true, 
        updates: results,
        processedCount: results.length,
        totalRequested: photoIds.length,
        message: results.length === 0 ? 'No physical files found to rotate (ensure photos are uploaded first)' : undefined
      });
    } catch (error) {
      console.error('[Rotate] Critical error:', error);
      res.status(500).json({ error: 'Failed to rotate photos' });
    }
  });

  // Manual Rotation API (Clockwise 90 deg)
  app.post('/api/rotate-manual', express.json(), async (req, res) => {
    const { photoId, eventId, angle = 90 } = req.body;
    if (!photoId) return res.status(400).json({ error: 'Missing photo ID' });

    console.log(`[Rotate-Manual] Rotating photo ${photoId} by ${angle} degrees`);

    try {
      const originalsDir = path.join(UPLOADS_DIR, 'originals');
      const variantsDir = path.join(UPLOADS_DIR, 'variants');
      const files = await fs.readdir(originalsDir);
      
      const originalFile = files.find(f => f.startsWith(photoId + '.'));
      if (!originalFile) return res.status(404).json({ error: 'Original file not found' });

      const originalPath = path.join(originalsDir, originalFile);
      const tempPath = path.join(originalsDir, `temp-${photoId}-${Date.now()}.jpg`);

      // 1. Rotate the original file physically so subsequent "Smart Rotates" or views are correct
      await sharp(originalPath)
        .rotate(angle)
        .toFile(tempPath);
      
      await fs.unlink(originalPath);
      await fs.rename(tempPath, originalPath);

      // 2. Re-generate all variants
      const timestamp = Date.now();
      const updatedMeta: any = { id: photoId };

      for (const [key, config] of Object.entries(VARIANTS)) {
        const variantFilename = `${photoId}${config.suffix}.webp`;
        const variantPath = path.join(variantsDir, variantFilename);
        
        await sharp(originalPath)
          .resize({ width: config.width, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(variantPath);
        
        updatedMeta[key] = `/storage/variants/${variantFilename}?t=${timestamp}`;
      }

      const blurBuffer = await sharp(originalPath)
        .resize(20)
        .webp({ quality: 20 })
        .toBuffer();
      const blurData = `data:image/webp;base64,${blurBuffer.toString('base64')}`;
      
      updatedMeta.blur = blurData;
      updatedMeta.url = updatedMeta.medium;
      updatedMeta.variants = {
        thumbnail: updatedMeta.thumbnail,
        medium: updatedMeta.medium,
        large: updatedMeta.large,
        blur: blurData,
        original: `/storage/originals/${originalFile}?t=${timestamp}`
      };

      if (eventId) {
        await updatePhotoInDB(eventId, photoId, updatedMeta);
      }

      res.status(200).json({ success: true, update: updatedMeta });
    } catch (error) {
      console.error('[Rotate-Manual] Error:', error);
      res.status(500).json({ error: 'Failed to rotate photo' });
    }
  });

  // Global Error Handler for API routes
  app.use((err: any, req: any, res: any, next: any) => {
    console.error('[Global Error Handler]', err);
    
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File size limit exceeded (max 30MB per image)' });
      }
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }
    
    res.status(err.status || 500).json({ 
      error: err.message || 'Internal server error',
      success: false 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
