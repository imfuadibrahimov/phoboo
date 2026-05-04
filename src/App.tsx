/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ScanFace, 
  Filter, 
  LayoutGrid, 
  Columns,
  Grid3X3,
  Share2, 
  Search, 
  Lock, 
  Mail, 
  Pointer, 
  Globe, 
  Moon, 
  Sun,
  Settings,
  Twitter, 
  Linkedin, 
  ArrowUp,
  ArrowUpRight,
  ArrowDown,
  Cloud,
  ChevronRight,
  Camera,
  CloudUpload,
  QrCode,
  Clock,
  Users,
  ShieldCheck,
  BarChart3,
  Calendar as CalendarIcon,
  Info,
  User,
  MessageSquare,
  Plus,
  MoreVertical,
  LogOut,
  Folder,
  Image as ImageIcon,
  ArrowUpAZ,
  ArrowDownAZ,
  ArrowDownZA,
  ArrowUpWideNarrow,
  ArrowDownWideNarrow,
  SortAsc,
  SortDesc,
  ChevronDown,
  Monitor,
  Smartphone,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Copy,
  MoreHorizontal,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  ChevronLeft,
  X,
  Languages,
  FolderSymlink,
  ImagePlus,
  List,
  CheckCircle2,
  AlertCircle,
  Edit3
} from 'lucide-react';
import { useRef, useState, useEffect, ReactNode, useMemo, FormEvent, useCallback, ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';

type Page = 'home' | 'pricing' | 'get-started' | 'sign-in' | 'dashboard' | 'event-detail';
type DashboardTab = 'events' | 'metrics' | 'calendar' | 'about' | 'profile' | 'contact';
type SortField = 'name' | 'eventDate' | 'createdAt' | 'photoCount' | 'storageSize';

interface Photo {
  id: string;
  url: string;
  filename: string;
  isHidden: boolean;
  eventId?: string;
  size?: string;
  resolution?: string;
  variants?: {
    thumbnail: string;
    medium: string;
    large: string;
    original: string;
    blur?: string;
  };
}

interface Event {
  id: string;
  title: string;
  eventDate: string;
  endDate?: string;
  createdAt: string;
  photoCount: number;
  folderCount: number;
  storageSize: number; // in MB
  image?: string;
  status: 'Published' | 'Draft';
  faceSearchCount: number;
  registrationCount: number;
  shareSettings?: {
    accessType: 'face_search' | 'full';
    passwordEnabled: boolean;
    pin: string;
    registrationEnabled: boolean;
    fullAccessToken: string;
    faceSearchToken: string;
  };
  galleryDesign?: {
    themeId: string;
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    fontStyle: 'serif' | 'sans';
    coverShape: 'oval' | 'pill' | 'rect' | 'circle';
  };
}

const MOCK_EVENTS: Event[] = [
  {
    id: 'test-1',
    title: 'Test-1',
    eventDate: '2024-05-01',
    createdAt: '2024-05-01',
    photoCount: 5,
    folderCount: 1,
    storageSize: 25,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop',
    status: 'Published',
    faceSearchCount: 12,
    registrationCount: 45,
    shareSettings: {
      accessType: 'full',
      passwordEnabled: true,
      pin: '1234',
      registrationEnabled: false,
      fullAccessToken: 'a7b8c9d0e1f2',
      faceSearchToken: 'z1y2x3w4v5u6'
    }
  },
  {
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
  {
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
  {
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
  {
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
];

const WHY_CHOOSE_FEATURES = [
  {
    icon: <ScanFace className="w-5 h-5 text-white" />,
    title: "AI Face Search",
    desc: "Guests instantly find their photos with AI-powered face search."
  },
  {
    icon: <QrCode className="w-5 h-5 text-white" />,
    title: "QR-Based Sharing",
    desc: "Share a single link or QR code. Everyone gets instant access."
  },
  {
    icon: <Clock className="w-5 h-5 text-white" />,
    title: "Auto-Expiring Events",
    desc: "Events automatically expire after a set time to keep things simple and secure."
  },
  {
    icon: <Filter className="w-5 h-5 text-white" />,
    title: "Smart Browsing & Filters",
    desc: "Guests can browse all photos or filter by gender, group size, and more."
  },
  {
    icon: <Users className="w-5 h-5 text-white" />,
    title: "Collaborative Events",
    desc: "Invite multiple photographers to one event and upload photos together seamlessly."
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-white" />,
    title: "Privacy-Safe Recognition",
    desc: "Face recognition is built with privacy in mind—your data stays secure and protected."
  }
];

const CATEGORIES = [
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRlBZvjUmrzrZ2bX5hdT9S1p0HbeV0O0z6gzA-fDeIfTv1dnK_gnrWyLm5Jczy8ruS_bD0yRmlZbtjIU847jSoLW_h0PvDyS11IbwJZSiMQlMtFFsjFoyeEJxjczBt-SHlYaK21ClxOxKtyYquSZplr7c2PyUaKpahu8s5EaPeWfvYsvlZ9X8fuvwZWk9J8kCDed6OPF6snZP4MKKzNmC0n-YeGdx90IfOW00nuu6qhE7a5m-reQpG9lGjaucaJ1UUo9IbNBW-pA",
    title: "Weddings",
    desc: "Automated guest galleries."
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs95T99NoKC75-0iur17KMtA8jyXgeT3PW6FMbh0XrtD08FcQZz_-SaZWFrBOS0fcIK3Wc7zuP_HvMpij9mfK-rrE7kTpIbnW1U4Xkc3WXeFoKaQaB7VumEp5XQhI9108lahcODx8Xr46Eun9TTycoYKPsrTBpKQZA1TfY5aGsqJbObFREagV5yi-A2J5YiZoOEmuddYqNv0oT8oITTDGfpVatqUWOqr86NtmWsOkJ7QSPcBMvQ7KevnZVSDxzVYy50H3J7l7nAQ",
    title: "Corporate",
    desc: "Headshots and seminars."
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpPCLbT-3_ygh1pX_Cjj43YxIef7ebC3i7IPx1gklSUKBeGxtJl0BHLrz1beMcSBheBLMtkuA_KdpXJC0Xna_5edEJuV1liFs8IuybIIYcVwDSyvG283xTt1X2xnCXPuuCiJsOdB2PYqeET1V0FHbWpXn9-j8kADe6KymOdTU_DiKHOa7ZcBH4JNEE_Fqn5jRWekecBiWVieMj0HJqCCKQ1GOwXgqTpCg5qldkPIm_OZlJl7fPK2adnaXf1Ay8zzlm6xRPGVIaDA",
    title: "Sports",
    desc: "Athlete photo tagging."
  },
  {
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk7jjunPzrtmLEh3hQXhv2KShpFd7SRPva7z4eyG8-ytZL7RjyYISNfFRGu0UNjLCn1ad1f7wc-MilaLTeqj7DjixVvmHK95dzJ4XtClNDxUDorl1Ak0jOtKh_-uc-gwpEvNVGkuq_dh3euVU_WbqOoLy19tTcQhXsXhuMkj_hCslUTlDmuAKnTDh_BbNnHp0p-b_f6tp-ybaUUrNc0ZkwKtCuPMHFDPrVkvFDltPvjYrqZiU_2amto62kE1uliR7CwEoPssyzcQ",
    title: "Nightlife" ,
    desc: "Club and festival sharing."
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('events');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [guestToken, setGuestToken] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.events.length > 0) {
          const serverEvents = data.events;
          setEvents(prev => {
            // Combine server events with mocks, avoiding duplicates by ID
            const combined = [...serverEvents, ...MOCK_EVENTS.filter(m => !serverEvents.some((s: any) => s.id === m.id))];
            return combined;
          });
        }
      });
  }, []);

  useEffect(() => {
    // Safety check: Ensure all existing events have tokens
    setEvents(prevEvents => {
      const hasMissingTokens = prevEvents.some(e => !e.shareSettings?.fullAccessToken || !e.shareSettings?.faceSearchToken);
      if (!hasMissingTokens) return prevEvents;

      const generateToken = () => Math.random().toString(36).substring(2, 11) + Math.random().toString(36).substring(2, 11);
      
      return prevEvents.map(e => {
        if (!e.shareSettings?.fullAccessToken || !e.shareSettings?.faceSearchToken) {
          return {
            ...e,
            shareSettings: {
              accessType: e.shareSettings?.accessType || 'full',
              passwordEnabled: e.shareSettings?.passwordEnabled || false,
              pin: e.shareSettings?.pin || Math.floor(1000 + Math.random() * 9000).toString(),
              registrationEnabled: e.shareSettings?.registrationEnabled || false,
              fullAccessToken: e.shareSettings?.fullAccessToken || generateToken(),
              faceSearchToken: e.shareSettings?.faceSearchToken || generateToken()
            }
          };
        }
        return e;
      });
    });
  }, []);

  // Simulate routing for guest view if URL has /v/
  useEffect(() => {
    const checkGuestAccess = () => {
      const path = window.location.pathname;
      if (path.startsWith('/v/')) {
        const parts = path.split('/');
        const token = parts[parts.length - 1];
        if (token) setGuestToken(token);
      } else {
        setGuestToken(null);
      }
    };
    
    checkGuestAccess();
    window.addEventListener('popstate', checkGuestAccess);
    return () => window.removeEventListener('popstate', checkGuestAccess);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const laptopScale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);

  if (guestToken) {
    const event = events.find(e => 
      e.shareSettings?.fullAccessToken === guestToken || 
      e.shareSettings?.faceSearchToken === guestToken
    );
    
    if (event) {
      // Create a modified event with the determined access type from the token
      const accessType = event.shareSettings?.fullAccessToken === guestToken ? 'full' : 'face_search';
      const guestEvent = {
        ...event,
        shareSettings: {
          ...event.shareSettings,
          accessType
        }
      };
      
      return (
        <GuestView 
          event={guestEvent as Event} 
          isDark={isDark} 
          onClose={() => {
            setGuestToken(null);
            window.history.pushState({}, '', '/');
          }}
        />
      );
    }
  }

  if (isAuthenticated) {
    return (
      <>
        <AnimatePresence>
          {isCreateModalOpen && (
            <CreateEventModal 
              onClose={() => setIsCreateModalOpen(false)} 
              onCreate={async (newEvent) => {
                setEvents(prev => [newEvent, ...prev]);
                setIsCreateModalOpen(false);
                try {
                  await fetch('/api/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newEvent)
                  });
                } catch (err) {
                  console.error('Failed to save event:', err);
                }
              }} 
            />
          )}
        </AnimatePresence>
        
        {currentPage === 'event-detail' && selectedEventId ? (
          <EventDetailView 
            eventId={selectedEventId} 
            onBack={() => {
              setCurrentPage('dashboard');
              setSelectedEventId(null);
            }}
            onUpdateEvent={async (updated) => {
              setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
              try {
                await fetch('/api/events', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updated)
                });
              } catch (err) {
                console.error('Failed to update event:', err);
              }
            }}
            isDark={isDark}
            setIsDark={setIsDark}
            events={events}
          />
        ) : (
          <Dashboard 
            activeTab={dashboardTab} 
            setActiveTab={setDashboardTab} 
            onLogout={() => setIsAuthenticated(false)}
            isDark={isDark}
            setIsDark={setIsDark}
            events={events}
            onSelectEvent={(id) => {
              setSelectedEventId(id);
              setCurrentPage('event-detail');
            }}
            onCreateEvent={() => setIsCreateModalOpen(true)}
            onUpdateEvent={async (updated) => {
              setEvents(prev => prev.map(e => e.id === updated.id ? updated : e));
              try {
                await fetch('/api/events', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(updated)
                });
              } catch (err) {
                console.error('Failed to update event:', err);
              }
            }}
            onDeleteEvent={(id) => {
              setEvents(prev => prev.filter(e => e.id !== id));
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="relative min-h-screen font-sans">
      <AnimatePresence>
        {isCreateModalOpen && (
          <CreateEventModal 
            onClose={() => setIsCreateModalOpen(false)} 
            onCreate={(newEvent) => {
              setEvents(prev => [newEvent, ...prev]);
              setIsCreateModalOpen(false);
            }} 
          />
        )}
      </AnimatePresence>
      <div className="mesh-gradient animate-mesh" />
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 frosted-glass border-b border-white/20">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="text-2xl font-extrabold tracking-tighter text-indigo-900 dark:text-white">Phoboo</div>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-semibold transition-all ${currentPage === 'home' ? 'text-primary border-b-2 border-primary pb-1' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('pricing')}
              className={`text-sm font-semibold transition-all ${currentPage === 'pricing' ? 'text-primary border-b-2 border-primary pb-1' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}
            >
              Pricing
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full bg-white/30 hover:bg-white/50 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'dark' : 'light'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-indigo-600" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
            <button 
              onClick={() => setCurrentPage('sign-in')}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-all whitespace-nowrap"
            >
              Sign In
            </button>
            <button 
              onClick={() => setCurrentPage('get-started')}
              className="vibrant-gradient text-white px-6 py-2 rounded-lg text-sm font-bold transition-all transform hover:scale-105 active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.main 
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="pt-24"
          >
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:pt-32">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8 lg:sticky lg:top-32"
              >
                <h1 className="text-3xl lg:text-5xl font-extrabold text-indigo-950 dark:text-white leading-[1.1] tracking-tight">
                  The fastest way to <span className="text-primary drop-shadow-[0_0_15px_rgba(139,92,246,0.2)]">deliver event photos.</span>
                </h1>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="flex items-center justify-between lg:justify-start gap-2 md:gap-8 py-4 w-full"
                >
                  <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 relative overflow-visible">
                      <Camera className="w-4 h-4 z-10" />
                      <motion.div
                        animate={{ 
                          opacity: [0, 1, 0],
                          scale: [0, 1.8, 0],
                          filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
                        }}
                        transition={{ repeat: Infinity, duration: 3, times: [0, 0.05, 1], ease: "easeOut" }}
                        className="absolute top-1.5 right-1.5 w-3 h-3 bg-white rounded-full z-20 shadow-[0_0_10px_white]"
                      />
                    </div>
                    <span className="text-[10px] md:text-sm font-bold text-indigo-950 dark:text-slate-300 uppercase tracking-tight md:tracking-wider">Shoot</span>
                  </div>

                  <div className="flex-1 max-w-[30px] md:max-w-[40px] h-[2px] bg-primary/10 relative overflow-hidden rounded-full">
                    <motion.div 
                      animate={{ x: [-40, 40] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-primary to-transparent"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 relative overflow-hidden">
                      <Cloud className="w-4 h-4 z-10 opacity-60" />
                      <motion.div
                        animate={{ 
                          y: [8, -12],
                          opacity: [0, 1, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 2, ease: "circIn", delay: 0.5 }}
                        className="absolute z-20"
                      >
                        <ArrowUp className="w-3 h-3 text-secondary" />
                      </motion.div>
                    </div>
                    <span className="text-[10px] md:text-sm font-bold text-indigo-950 dark:text-slate-300 uppercase tracking-tight md:tracking-wider">Upload</span>
                  </div>

                  <div className="flex-1 max-w-[30px] md:max-w-[40px] h-[2px] bg-secondary/10 relative overflow-hidden rounded-full">
                    <motion.div 
                      animate={{ x: [-40, 40] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.5 }}
                      className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-secondary to-transparent"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-950/10 dark:bg-white/10 flex items-center justify-center shrink-0 relative overflow-hidden">
                      <ScanFace className="w-4 h-4 text-indigo-950 dark:text-white z-10" />
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 flex flex-col justify-between p-1.5"
                      >
                        <div className="flex justify-between w-full">
                          <div className="w-1 h-1 border-t border-l border-primary" />
                          <div className="w-1 h-1 border-t border-r border-primary" />
                        </div>
                        <div className="flex justify-between w-full">
                          <div className="w-1 h-1 border-b border-l border-primary" />
                          <div className="w-1 h-1 border-b border-r border-primary" />
                        </div>
                      </motion.div>
                      <motion.div 
                        animate={{ y: [-12, 12, -12] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute left-1/2 -translate-x-1/2 w-4 h-[1px] bg-primary/60 shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                      />
                    </div>
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                      <span className="text-[10px] md:text-sm font-black text-indigo-950 dark:text-white uppercase tracking-tight md:tracking-wider leading-none">Delivered</span>
                      <span className="hidden md:block text-[10px] text-slate-500 dark:text-slate-400 font-medium">Instant Matching</span>
                    </div>
                  </div>
                </motion.div>
                
                <div className="flex flex-col gap-4 max-w-md">
                  <FeatureItem 
                    icon={<ScanFace className="w-4 h-4 text-white" />}
                    title="AI face search"
                    desc="Find every photo you're in instantly using advanced facial recognition."
                    delay={0.1}
                  />
                  <FeatureItem 
                    icon={<Filter className="w-4 h-4 text-white" />}
                    title="Smart filtering"
                    desc="Effortlessly sort through entire galleries by gender and person count."
                    delay={0.2}
                  />
                  <FeatureItem 
                    icon={<LayoutGrid className="w-4 h-4 text-white" />}
                    title="Elegant gallery UI"
                    desc="A premium, distraction-free viewing experience designed for high-end events."
                    delay={0.3}
                  />
                  <FeatureItem 
                    icon={<Share2 className="w-4 h-4 text-white" />}
                    title="One-tap sharing"
                    desc="Instantly download or share high-resolution memories with a single tap."
                    delay={0.4}
                  />
                </div>
              </motion.div>

              {/* Laptop Mockup */}
              <motion.div 
                style={{ scale: laptopScale }}
                className="relative group lg:ml-8"
              >
                <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-3xl group-hover:bg-primary/30 transition-all duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden border border-white/50 dark:border-white/10 shadow-2xl bg-white/20 dark:bg-slate-900/40 backdrop-blur-md">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCiT2co2TEYSQkqKhuRgWXDdi02HnF-q9gbdKC9NrDVYqXce-9k0fGgzo6a7se6Ie72sjo73o0uQa1sL4C28zg4RKBaLQmuUJd2-O6Us9pDrXAISyKdkRewoPcFkCXcfK-SsTRkpnlMj9V5nIeiqZ-RnWkfYm5JitvFQrqYDa71-PR5OcaWvPU7RQpYplnQ14--BQS4yTR2vbQ5F9ooZkICxXNw8kZ3IQfp_mhEF4zq9qa_BAwybGNnKFeunHqjbTquqofwpZBfw" 
                    alt="Photographer browsing photos"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </motion.div>
            </section>

            {/* Why Choose Section */}
            <section className="py-24 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <h2 className="text-4xl font-bold text-indigo-950 dark:text-white mb-4 tracking-tight">Why Choose <span className="text-primary">Phoboo</span></h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">Professional speed and simplicity for modern event photographers.</p>
              </div>
              
              <div className="relative">
                <div className="overflow-hidden">
                  <div className="flex gap-4 md:gap-6 whitespace-nowrap animate-infinite-scroll w-fit">
                    {[...WHY_CHOOSE_FEATURES, ...WHY_CHOOSE_FEATURES, ...WHY_CHOOSE_FEATURES].map((feature, idx) => (
                      <ChoiceCard 
                        key={`${feature.title}-${idx}`}
                        icon={feature.icon}
                        title={feature.title}
                        desc={feature.desc}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#F0F4FF] dark:from-[#0B0E14] via-[#F0F4FF]/80 dark:via-[#0B0E14]/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#F0F4FF] dark:from-[#0B0E14] via-[#F0F4FF]/80 dark:via-[#0B0E14]/80 to-transparent z-10 pointer-events-none" />
              </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-white/30 dark:bg-white/5 backdrop-blur-sm relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-20"
                >
                  <h2 className="text-4xl md:text-5xl font-black text-indigo-950 dark:text-white mb-4 tracking-tighter">How <span className="text-primary">Phoboo Works</span></h2>
                  <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">Three simple steps to automate your gallery delivery.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                  <div className="hidden md:block absolute top-[160px] left-[15%] right-[15%] h-[2px] bg-primary/5 -z-10">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-primary via-indigo-400 to-secondary"
                    />
                  </div>

                  <Step 
                    number="01" 
                    title="Create Your Event" 
                    desc="Set up your event in seconds." 
                    illustration={<EventFormIllustration />}
                    direction="left"
                  />
                  <Step 
                    number="02" 
                    title="Upload Your Photos" 
                    desc="Upload all photos at once or add them anytime." 
                    illustration={<UploadIllustration />}
                    direction="up"
                  />
                  <Step 
                    number="03" 
                    title="Share & Let Guests Find Photos" 
                    desc="Share a QR or link. Guests can browse or instantly find theirs with AI." 
                    illustration={<DiscoveryIllustration />}
                    direction="right"
                  />
                </div>
              </div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full" />
            </section>

            {/* Occasion Categories */}
            <section className="py-24 overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                  <div>
                    <h2 className="text-4xl font-bold text-indigo-950 dark:text-white">Built for <span className="text-primary">Every Occasion</span></h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg mt-2 font-medium">Specialized workflows for diverse photography niches.</p>
                  </div>
                  <motion.button 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-primary font-bold"
                  >
                    See all categories <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="relative">
                <div className="overflow-hidden">
                  <div className="flex gap-4 md:gap-6 whitespace-nowrap animate-infinite-scroll w-fit">
                    {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((cat, idx) => (
                      <CategoryCard 
                        key={`${cat.title}-${idx}`} 
                        img={cat.img}
                        title={cat.title}
                        desc={cat.desc}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#F0F4FF] dark:from-[#0B0E14] to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#F0F4FF] dark:from-[#0B0E14] to-transparent z-10" />
              </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-6 mb-24">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="vibrant-gradient rounded-[2.5rem] p-16 text-center relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0 0 L100 0 L100 100 Z" fill="white" />
                  </svg>
                </div>
                <div className="relative z-10 space-y-8">
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                    Ready to <span className="underline decoration-white/30 decoration-4 underline-offset-8">Transform</span> Your Workflow?
                  </h2>
                  <p className="text-indigo-100 text-xl max-w-2xl mx-auto font-medium">
                    Join 5,000+ photographers automating their delivery. <br />
                    Start your 14-day free trial today.
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={() => setCurrentPage('get-started')}
                      className="bg-white text-primary px-12 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-indigo-900/20 active:scale-95"
                    >
                      Get Started Now
                    </button>
                  </div>
                </div>
              </motion.div>
            </section>
          </motion.main>
        ) : currentPage === 'pricing' ? (
          <PricingPage key="pricing" />
        ) : currentPage === 'get-started' ? (
          <GetStartedPage 
            key="get-started" 
            onSwitchToLogin={() => setCurrentPage('sign-in')} 
            onLogin={() => setIsAuthenticated(true)}
          />
        ) : (
          <SignInPage 
            key="sign-in" 
            onSwitchToRegister={() => setCurrentPage('get-started')} 
            onLogin={() => setIsAuthenticated(true)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl w-full py-16 border-t border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6 lg:col-span-1">
            <div className="text-2xl font-extrabold text-indigo-900 dark:text-white tracking-tighter">Phoboo</div>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Elevating professional photography through intelligent automation and seamless cloud delivery.
            </p>
            <div className="text-sm text-slate-400">© 2024 Phoboo. All rights reserved.</div>
          </div>
          
          <FooterColumn title="Legal" links={["Privacy", "Terms"]} />
          <FooterColumn title="Support" links={["Global Support", "Documentation"]} />
          <FooterColumn title="Connect" icons={[
            { icon: <Twitter className="w-4 h-4" />, name: "Twitter" },
            { icon: <Linkedin className="w-4 h-4" />, name: "LinkedIn" }
          ]} />
        </div>
      </footer>
    </div>
  );
}

function GetStartedPage({ onSwitchToLogin, onLogin }: { onSwitchToLogin: () => void, onLogin: () => void, key?: string | number }) {
  const [showExtraFields, setShowExtraFields] = useState(false);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 flex flex-col lg:flex-row"
    >
      {/* Left side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 relative overflow-hidden">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="max-w-md w-full space-y-8 z-10"
        >
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-black text-indigo-950 dark:text-white tracking-tighter mb-2">Create your <span className="text-primary italic">free account</span></h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Already have an account? <button onClick={onSwitchToLogin} className="text-primary hover:underline font-bold">Log in</button></p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sign up with Google
            </button>
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:opacity-90 transition-all shadow-sm group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2.0-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z" />
              </svg>
              Sign up with Apple
            </button>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#F0F4FF] dark:bg-[#0B0E14] px-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Or use your email</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-xs font-black text-indigo-950 dark:text-white uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Email Address</label>
              <input 
                type="email" 
                placeholder="you@email.com"
                onFocus={() => setShowExtraFields(true)}
                className="w-full px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-indigo-950 dark:text-white font-medium"
              />
            </div>

            <AnimatePresence>
              {showExtraFields && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="space-y-2 group">
                    <label className="text-xs font-black text-indigo-950 dark:text-white uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-indigo-950 dark:text-white font-medium"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-xs font-black text-indigo-950 dark:text-white uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-indigo-950 dark:text-white font-medium"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => {
                if (!showExtraFields) {
                  setShowExtraFields(true);
                } else {
                  onLogin();
                }
              }}
              className="w-full py-4 vibrant-gradient text-white rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              {showExtraFields ? "Create Account" : "Continue with Email"}
            </button>
          </div>

          <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed text-center">
            By creating an account, you agree to Phoboo's <button className="text-slate-600 dark:text-slate-300 hover:underline">Terms of Service</button> and have read and understood the <button className="text-slate-600 dark:text-slate-300 hover:underline">Privacy Policy</button>.
          </p>
        </motion.div>
        
        {/* Glow behind form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/2 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Right side: Image/Canvas */}
      <div className="flex-1 bg-white/30 dark:bg-white/5 relative overflow-hidden min-h-[400px] lg:min-h-screen">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full max-w-2xl aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl iridiescent-border"
          >
            <img 
              src="https://plus.unsplash.com/premium_photo-1661608404281-a831518f8dc0?q=80&w=2670&auto=format&fit=crop" 
              alt="Professional photographer workspace"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 via-transparent to-transparent" />
            
            {/* Overlay UI mockup */}
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-8 left-8 right-8 frosted-glass p-6 rounded-2xl border border-white/30 flex items-center gap-6"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-lg">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" alt="User" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-white text-xs font-black uppercase tracking-widest opacity-80">Instant Delivery</span>
                </div>
                <h4 className="text-white text-lg font-bold">124 photos matched for Sarah</h4>
                <p className="text-white/60 text-sm font-medium">Delivered to Sarah's smartphone via Face Search.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/10 blur-[120px] rounded-full" />
      </div>
    </motion.main>
  );
}

function SignInPage({ onSwitchToRegister, onLogin }: { onSwitchToRegister: () => void, onLogin: () => void, key?: string | number }) {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 flex flex-col lg:flex-row-reverse"
    >
      {/* Side: Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-24 relative overflow-hidden">
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="max-w-md w-full space-y-8 z-10"
        >
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-black text-indigo-950 dark:text-white tracking-tighter mb-2">Welcome <span className="text-primary italic">Back</span></h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">New to Phoboo? <button onClick={onSwitchToRegister} className="text-primary hover:underline font-bold">Create account</button></p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Log in with Google
            </button>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#F0F4FF] dark:bg-[#0B0E14] px-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Or enter details</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-xs font-black text-indigo-950 dark:text-white uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">Email</label>
              <input 
                type="email" 
                placeholder="you@email.com"
                className="w-full px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-indigo-950 dark:text-white font-medium"
              />
            </div>
            <div className="space-y-2 group">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-indigo-950 dark:text-white uppercase tracking-widest group-focus-within:text-primary transition-colors">Password</label>
                <button className="text-[10px] font-bold text-primary hover:underline">Forgot?</button>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-indigo-950 dark:text-white font-medium"
              />
            </div>
            <button 
              onClick={onLogin}
              className="w-full py-4 vibrant-gradient text-white rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              Sign In
            </button>
          </div>
        </motion.div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary/2 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="flex-1 bg-white/30 dark:bg-white/5 relative overflow-hidden min-h-[400px] lg:min-h-screen">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full max-w-2xl aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl iridescent-border"
          >
            <img 
              src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2670&auto=format&fit=crop" 
              alt="Photography equipment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}

function Dashboard({ activeTab, setActiveTab, onLogout, isDark, setIsDark, onSelectEvent, events, onCreateEvent, onUpdateEvent, onDeleteEvent }: { 
  activeTab: DashboardTab, 
  setActiveTab: (tab: DashboardTab) => void,
  onLogout: () => void,
  isDark: boolean,
  setIsDark: (dark: boolean) => void,
  onSelectEvent: (id: string) => void,
  events: Event[],
  onCreateEvent: () => void,
  onUpdateEvent: (event: Event) => void,
  onDeleteEvent: (id: string) => void,
  key?: string | number
}) {
  return (
    <div className="flex bg-[#F8FAFF] dark:bg-[#0B0E14] min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#12161F] border-r border-slate-200 dark:border-white/5 flex flex-col fixed inset-y-0 z-50">
        <div className="p-6">
          <div className="text-2xl font-extrabold tracking-tighter text-indigo-900 dark:text-white mb-8">Phoboo</div>
          
          <nav className="space-y-1">
            <SidebarLink 
              icon={<LayoutGrid className="w-4 h-4" />} 
              label="Events" 
              active={activeTab === 'events'} 
              onClick={() => setActiveTab('events')} 
            />
            <SidebarLink 
              icon={<BarChart3 className="w-4 h-4" />} 
              label="Metrics" 
              active={activeTab === 'metrics'} 
              onClick={() => setActiveTab('metrics')} 
            />
            <SidebarLink 
              icon={<CalendarIcon className="w-4 h-4" />} 
              label="Calendar" 
              active={activeTab === 'calendar'} 
              onClick={() => setActiveTab('calendar')} 
            />
            <SidebarLink 
              icon={<Info className="w-4 h-4" />} 
              label="About" 
              active={activeTab === 'about'} 
              onClick={() => setActiveTab('about')} 
            />
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-1">
          <SidebarLink 
            icon={<User className="w-4 h-4" />} 
            label="Profile" 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')} 
          />
          <SidebarLink 
            icon={<MessageSquare className="w-4 h-4" />} 
            label="Contact" 
            active={activeTab === 'contact'} 
            onClick={() => setActiveTab('contact')} 
          />
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl uppercase">
              F
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 dark:text-white truncate">Fuad Ibrahimov</p>
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Free Plan</p>
            </div>
            <button onClick={() => setIsDark(!isDark)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-all">
              {isDark ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'events' ? (
            <EventsView 
              key="events" 
              onSelectEvent={onSelectEvent} 
              events={events}
              onCreateClick={onCreateEvent}
              isDark={isDark}
              onUpdateEvent={onUpdateEvent}
              onDeleteEvent={onDeleteEvent}
            />
          ) : activeTab === 'calendar' ? (
            <CalendarTab 
              key="calendar" 
              events={events} 
              onSelectEvent={onSelectEvent}
            />
          ) : (
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                {activeTab === 'metrics' && <BarChart3 className="w-10 h-10" />}
                {activeTab === 'about' && <Info className="w-10 h-10" />}
                {activeTab === 'profile' && <User className="w-10 h-10" />}
                {activeTab === 'contact' && <MessageSquare className="w-10 h-10" />}
              </div>
              <h2 className="text-2xl font-black text-indigo-950 dark:text-white capitalize">{activeTab} Page</h2>
              <p className="text-slate-500 max-w-sm">This section is currently under development. Stay tuned for more features!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function SidebarLink({ icon, label, active, onClick }: { icon: ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full group flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-xl transition-all ${
        active 
          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
      }`}
    >
      <span className={`transition-colors ${active ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`}>
        {icon}
      </span>
      {label}
    </button>
  );
}

function EventActionsDropdown({ onEdit, onDelete, isDark, openDirection = 'up' }: { onEdit: () => void, onDelete: () => void, isDark: boolean, openDirection?: 'up' | 'down' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <div className={`relative ${isOpen ? 'z-[100]' : 'z-auto'}`} ref={dropdownRef}>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className={`p-2 rounded-lg transition-all relative ${isOpen ? 'z-[101]' : 'z-auto'} ${isDark ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: openDirection === 'up' ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: openDirection === 'up' ? 10 : -10 }}
            className={`absolute right-0 ${openDirection === 'up' ? 'bottom-full mb-2' : 'top-full mt-2'} w-48 rounded-2xl shadow-2xl border p-2 z-[100] backdrop-blur-xl ${isDark ? 'bg-[#1A1F29] border-white/10' : 'bg-white border-slate-200'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isDark ? 'text-slate-300 hover:bg-white/5 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-primary'}`}
            >
              <Settings className="w-4 h-4 text-primary" />
              Edit Event
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isDark ? 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white'}`}
            >
              <Trash2 className="w-4 h-4" />
              Delete Event
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DeleteConfirmationModal({ event, onClose, onConfirm, isDark }: { event: Event, onClose: () => void, onConfirm: () => void, isDark: boolean }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className={`w-full max-w-md border rounded-[2.5rem] p-10 space-y-8 shadow-2xl ${isDark ? 'bg-[#0D1117] border-white/10' : 'bg-white border-slate-200'}`}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
            <Trash2 className="w-10 h-10 text-red-500" />
          </div>
          <h2 className={`text-2xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-indigo-950'}`}>Delete Event?</h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            Are you sure you want to delete <span className="font-bold text-red-500">"{event.title}"</span>? This action cannot be undone and all data will be permanently removed.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            disabled={countdown > 0}
            onClick={onConfirm}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${
              countdown > 0 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20 active:scale-95'
            }`}
          >
            {countdown > 0 ? `Wait ${countdown}s` : 'Delete Permanently'}
          </button>
          <button 
            onClick={onClose}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EventsView({ onSelectEvent, events, onCreateClick, isDark, onUpdateEvent, onDeleteEvent }: { 
  onSelectEvent: (id: string) => void, 
  events: Event[], 
  onCreateClick: () => void, 
  isDark: boolean,
  onUpdateEvent: (event: Event) => void,
  onDeleteEvent: (id: string) => void,
  key?: string | number 
}) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);

  const filteredEvents = useMemo(() => {
    let result = [...events].filter(e => 
      e.title.toLowerCase().includes(search.toLowerCase())
    );

    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'eventDate':
          comparison = new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'photoCount':
          comparison = a.photoCount - b.photoCount;
          break;
        case 'storageSize':
          comparison = a.storageSize - b.storageSize;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [search, sortBy, sortOrder, events]);

  const formatSize = (mb: number) => {
    if (mb >= 1000) return `${(mb / 1000).toFixed(1)} GB`;
    return `${mb} MB`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <AnimatePresence>
        {editingEvent && (
          <EventSettingsModal 
            event={editingEvent}
            onClose={() => setEditingEvent(null)}
            onSave={(updated) => {
              onUpdateEvent(updated);
              setEditingEvent(null);
            }}
          />
        )}
        {deletingEvent && (
          <DeleteConfirmationModal 
            event={deletingEvent}
            onClose={() => setDeletingEvent(null)}
            onConfirm={() => {
              onDeleteEvent(deletingEvent.id);
              setDeletingEvent(null);
            }}
            isDark={isDark}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-indigo-950 dark:text-white tracking-tighter">My Events</h1>
          <p className="text-sm text-slate-500 font-medium">{filteredEvents.length} total events</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-xl p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search an Event..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-4 py-3 bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary outline-none transition-all w-64 dark:text-white"
            />
          </div>

          <div className="relative group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              className="appearance-none pl-4 pr-10 py-3 bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-xl text-sm font-bold text-slate-700 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer"
            >
              <option value="createdAt">Date Created</option>
              <option value="name">Name</option>
              <option value="eventDate">Event Date</option>
              <option value="photoCount">Photo Count</option>
              <option value="storageSize">Storage Size</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <button 
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="p-3 bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all text-slate-600 dark:text-white"
            title="Toggle Sort Order"
          >
            {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
          </button>

          <button 
            onClick={onCreateClick}
            className="vibrant-gradient text-white flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Event
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredEvents.map(event => (
              <motion.div 
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => onSelectEvent(event.id)}
                className="group bg-white dark:bg-[#12161F] rounded-[2rem] overflow-hidden border border-slate-200 dark:border-white/5 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="aspect-[16/10] relative overflow-hidden">
                  {event.image ? (
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                      event.status === 'Published' 
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                        : 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                    }`}>
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      {event.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold mb-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {(() => {
                        const start = new Date(event.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                        if (!event.endDate || event.endDate === event.eventDate) return start;
                        const end = new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                        return `${start} - ${end}`;
                      })()}
                    </div>
                    <h3 className="text-xl font-bold text-indigo-950 dark:text-white truncate group-hover:text-primary transition-colors">{event.title}</h3>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <ImageIcon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold">{event.photoCount}</span>
                        <span className="text-[10px] font-black uppercase opacity-60">photos</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Folder className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm font-bold">{event.folderCount}</span>
                        <span className="text-[10px] font-black uppercase opacity-60">folders</span>
                      </div>
                    </div>
                    <EventActionsDropdown 
                      onEdit={() => setEditingEvent(event)}
                      onDelete={() => setDeletingEvent(event)}
                      isDark={isDark}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Storage Used</span>
                    <span className="text-indigo-500">{formatSize(event.storageSize)}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min((event.storageSize / 5000) * 100, 100)}%` }} 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-[#12161F] rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/5">
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Event</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-3.5 h-3.5" />
                        Photos
                      </div>
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div className="flex items-center gap-2">
                        <Search className="w-3.5 h-3.5" />
                        Face Searches
                      </div>
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5" />
                        Registrations
                      </div>
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">From Date</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">To Date</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                  {filteredEvents.map((event, index) => (
                    <tr 
                      key={event.id} 
                      onClick={() => onSelectEvent(event.id)}
                      className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all cursor-pointer"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <p className="text-sm font-bold text-indigo-950 dark:text-white group-hover:text-primary transition-colors">{event.title}</p>
                          <p className="text-[10px] font-mono text-slate-400">{event.id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-sm font-bold text-indigo-600 dark:text-primary">
                          {event.photoCount}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 w-fit">
                          <Maximize2 className="w-3.5 h-3.5" />
                          {event.faceSearchCount}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-2 w-fit">
                          <Users className="w-3.5 h-3.5" />
                          {event.registrationCount}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
                          event.status === 'Published' 
                            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
                            : 'bg-slate-100 dark:bg-white/5 text-slate-500 border border-slate-200 dark:border-white/10'
                        }`}>
                          {event.status === 'Draft' && <Edit3 className="w-3 h-3" />}
                          {event.status}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-500 dark:text-slate-400 text-center">
                        {new Date(event.eventDate).toLocaleDateString('en-GB')}
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-500 dark:text-slate-400 text-center">
                        {event.endDate && event.endDate !== event.eventDate ? new Date(event.endDate).toLocaleDateString('en-GB') : '-'}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center">
                          <EventActionsDropdown 
                            onEdit={() => setEditingEvent(event)}
                            onDelete={() => setDeletingEvent(event)}
                            isDark={isDark}
                            openDirection={index === 0 ? 'down' : 'up'}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


const MOCK_PHOTOS: Photo[] = [
  // Photos for Test-1
  {
    id: 't1-1',
    url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop',
    filename: 'REAL_PHOTO_001.jpg',
    isHidden: false,
    eventId: 'test-1',
    variants: {
      thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop',
      medium: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop',
      large: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2400&auto=format&fit=crop',
      original: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
      blur: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
    }
  },
  {
    id: 't1-2',
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    filename: 'REAL_PHOTO_002.jpg',
    isHidden: false,
    eventId: 'test-1',
    variants: {
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop',
      medium: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
      large: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2400&auto=format&fit=crop',
      original: 'https://images.unsplash.com/photo-1519741497674-611481863552',
      blur: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
    }
  },
  {
    id: 't1-3',
    url: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1200&auto=format&fit=crop',
    filename: 'REAL_PHOTO_003.jpg',
    isHidden: false,
    eventId: 'test-1',
    variants: {
      thumbnail: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=400&auto=format&fit=crop',
      medium: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1600&auto=format&fit=crop',
      large: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2400&auto=format&fit=crop',
      original: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f',
      blur: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
    }
  },
  {
    id: 't1-4',
    url: 'https://images.unsplash.com/photo-1481653125770-b78c206c59d4?q=80&w=1200&auto=format&fit=crop',
    filename: 'REAL_PHOTO_004.jpg',
    isHidden: false,
    eventId: 'test-1'
  },
  {
    id: 't1-5',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop',
    filename: 'REAL_PHOTO_005.jpg',
    isHidden: false,
    eventId: 'test-1'
  },
  // Generated photos for other events
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `photo-${i + 1}`,
    url: `https://images.unsplash.com/photo-${1519741490000 + i}?q=80&w=600&auto=format&fit=crop`,
    filename: `EP6A${7279 + i}.jpg`,
    isHidden: false,
    eventId: '1'
  }))
];

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, isDark }: { isOpen: boolean, title: string, message: string, onConfirm: () => void, onCancel: () => void, isDark: boolean }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onCancel} 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className={`relative w-full max-w-md p-8 rounded-[2.5rem] border shadow-2xl ${isDark ? 'bg-[#151921] border-white/10' : 'bg-white border-slate-200'}`}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'}`}>
            <RotateCw className="w-8 h-8" />
          </div>
          <div>
            <h3 className={`text-xl font-black mb-2 uppercase tracking-tight ${isDark ? 'text-white' : 'text-indigo-950'}`}>{title}</h3>
            <p className={`text-sm font-bold leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{message}</p>
          </div>
        </div>
        
        <div className="flex gap-3 mt-8">
          <button onClick={onCancel} className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${isDark ? 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function SimpleToast({ toast, onClose, isDark }: { toast: { message: string; type: 'success' | 'error' | 'info' } | null, onClose: () => void, isDark: boolean }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.9 }}
          className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[300] px-8 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 backdrop-blur-2xl border ${isDark ? 'bg-[#151921]/90 border-white/10 text-white' : 'bg-white/90 border-slate-200 text-indigo-950'}`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-green-500/20 text-green-400' : toast.type === 'error' ? 'bg-red-500/20 text-red-400' : 'bg-primary/20 text-primary'}`}>
            {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : toast.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <Info className="w-4 h-4" />}
          </div>
          <span className="text-sm font-black tracking-tight whitespace-nowrap">{toast.message}</span>
          <button onClick={onClose} className="ml-2 text-slate-500 hover:text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function UploadModal({ eventId, onUploadComplete, onClose }: { eventId: string, onUploadComplete: (photos: Photo[]) => void, onClose: () => void }) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<{ file: File; id: string; status: 'pending' | 'uploading' | 'complete' | 'error'; progress: number }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFiles = (newFiles: FileList | File[]) => {
    setErrorMsg(null);
    const arrayFiles = Array.from(newFiles);
    const mapped = arrayFiles.map(f => ({
      file: f,
      id: Math.random().toString(36).substring(2, 9),
      status: 'pending' as const,
      progress: 0
    }));
    setFiles(prev => [...prev, ...mapped]);
  };

  const uploadAll = async () => {
    if (files.length === 0 || isUploading) return;
    setIsUploading(true);
    setErrorMsg(null);

    const allNewPhotos: Photo[] = [];
    let hasError = false;

    // Upload files one by one for better reliability and progress tracking
    for (let i = 0; i < files.length; i++) {
      const currentFile = files[i];
      if (currentFile.status === 'complete') continue;

      setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'uploading', progress: 30 } : f));

      const formData = new FormData();
      formData.append('eventId', eventId);
      formData.append('photos', currentFile.file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const contentType = response.headers.get('content-type');
        if (!response.ok) {
          let msg = `Server error (${response.status})`;
          if (contentType && contentType.includes('application/json')) {
            const errorData = await response.json();
            msg = errorData.error || msg;
          }
          throw new Error(msg);
        }

        if (!contentType || !contentType.includes('application/json')) {
           const text = await response.text();
           console.error('Server returned non-JSON response:', text);
           throw new Error('Server returned invalid response format. The request may have been blocked or the server is busy.');
        }

        const data = await response.json();
        if (data.success && data.photos.length > 0) {
          const p = data.photos[0];
          const newPhoto: Photo = {
            id: p.fileId,
            url: p.medium,
            filename: currentFile.file.name,
            isHidden: false,
            eventId,
            variants: {
              thumbnail: p.thumbnail,
              medium: p.medium,
              large: p.large,
              original: p.original,
              blur: p.blur
            }
          };
          allNewPhotos.push(newPhoto);
          setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'complete', progress: 100 } : f));
        } else {
          throw new Error('Upload failed for this file');
        }
      } catch (error: any) {
        console.error(`Upload failed for ${currentFile.file.name}:`, error);
        setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'error' } : f));
        setErrorMsg(error.message || 'One or more files failed to upload');
        hasError = true;
        // Continue with other files? For now, yes.
      }
    }

    if (allNewPhotos.length > 0) {
      // Small delay to show completion state
      setTimeout(() => {
        onUploadComplete(allNewPhotos);
        if (!hasError) onClose();
      }, 800);
    }
    
    setIsUploading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-4xl bg-[#0D1117] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col max-h-[85vh] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
      >
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">Import Memories</h2>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Event ID: {eventId}</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8">
          {/* Drag & Drop Zone */}
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
            className={`relative aspect-video md:aspect-[3/1] border-2 border-dashed rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all duration-500 group overflow-hidden ${dragActive ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
          >
            <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-paper.png")' }} />
            
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${dragActive ? 'bg-primary scale-110 shadow-[0_0_40px_rgba(139,92,246,0.5)] text-white' : 'bg-white/5 text-slate-500 group-hover:scale-105'}`}>
              <CloudUpload className="w-8 h-8" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-lg font-black text-white">Drag & Drop Photos</p>
              <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">or click to browse local files</p>
            </div>
            <input 
              type="file" 
              multiple 
              onChange={(e) => e.target.files && handleFiles(e.target.files)} 
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-500 px-2">
                <span>Selected Files ({files.length})</span>
                <button onClick={() => setFiles([])} className="text-red-400 hover:text-red-300">Clear All</button>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {files.map(f => (
                  <div key={f.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center text-slate-500 overflow-hidden">
                       <ImageIcon className="w-6 h-6 opacity-30" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-white truncate">{f.file.name}</p>
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${f.status === 'complete' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-slate-500'}`}>
                          {f.status}
                        </span>
                      </div>
                      {isUploading && (
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${f.progress}%` }}
                            className="h-full bg-primary"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Max 20MB per file • WebP Optimized</p>
            {errorMsg && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest">{errorMsg}</p>}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={uploadAll}
              disabled={files.length === 0 || isUploading}
              className={`px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-primary/20 ${files.length === 0 || isUploading ? 'bg-white/5 text-slate-500 cursor-not-allowed' : 'bg-primary text-white hover:scale-105 active:scale-95'}`}
            >
              {isUploading ? 'Developing...' : `Upload ${files.length || ''} Photos`}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PhotoUploader({ eventId, onUploadComplete, isDark }: { eventId: string, onUploadComplete: (photos: Photo[]) => void, isDark: boolean }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`flex items-center gap-2 px-4 py-2 bg-primary dark:bg-white/10 hover:bg-primary/95 text-white rounded-xl font-bold text-sm transition-all cursor-pointer shadow-lg shadow-primary/20 hover:scale-105 active:scale-95`}
      >
        <CloudUpload className="w-4 h-4" />
        Upload Photos
      </button>

      <AnimatePresence>
        {showModal && (
          <UploadModal 
            eventId={eventId} 
            onUploadComplete={onUploadComplete} 
            onClose={() => setShowModal(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}

function EventDetailView({ eventId, onBack, isDark, setIsDark, events, onUpdateEvent }: { 
  eventId: string, 
  onBack: () => void,
  isDark: boolean,
  setIsDark: (dark: boolean) => void,
  events: Event[],
  onUpdateEvent: (event: Event) => void
}) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/events/${eventId}/photos`);
        const data = await response.json();
        if (data.success) {
          const dbPhotos = data.photos || [];
          const mocks = MOCK_PHOTOS.filter(p => p.eventId === eventId);
          // Combine uploaded photos with mocks, prioritizing uploaded ones
          setPhotos([...dbPhotos, ...mocks.filter(m => !dbPhotos.some((p: any) => p.id === m.id))]);
        }
      } catch (err) {
        console.error('Failed to fetch photos:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  }, [eventId]);

  const [selectedPhotoIds, setSelectedPhotoIds] = useState<Set<string>>(new Set());
  const [previewPhotoIndex, setPreviewPhotoIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'visible' | 'hidden'>('all');
  const [isFoldersOpen, setIsFoldersOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const currentEvent = events.find(e => e.id === eventId);
  const event = currentEvent || events[0];
  
  if (!currentEvent && events.length > 0 && events[0].id !== eventId) {
    // This handles the case where events list might be empty for a moment or not loaded yet
    // but ensures we don't accidentally update the wrong event if it's just a lag in state sync
  }

  const filteredPhotos = useMemo(() => {
    // First filter by eventId
    let base = photos.filter(p => (p as any).eventId === eventId);
    // If no photos for this event yet (mocking), just use what we have to not be empty
    if (base.length === 0) base = photos.slice(0, 5);

    if (filter === 'all') return base;
    if (filter === 'visible') return base.filter(p => !p.isHidden);
    return base.filter(p => p.isHidden);
  }, [photos, filter, eventId]);

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedPhotoIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedPhotoIds(newSelected);
  };

  const selectAll = () => {
    if (selectedPhotoIds.size === filteredPhotos.length) {
      setSelectedPhotoIds(new Set());
    } else {
      setSelectedPhotoIds(new Set(filteredPhotos.map(p => p.id)));
    }
  };

  const handleDelete = (ids: string[]) => {
    setPhotos(prev => prev.filter(p => !ids.includes(p.id)));
    setSelectedPhotoIds(prev => {
      const next = new Set(prev);
      ids.forEach(id => next.delete(id));
      return next;
    });
  };

  const [isRotating, setIsRotating] = useState(false);
  const [rotationProgress, setRotationProgress] = useState<{ current: number; total: number } | null>(null);
  const [showRotateConfirm, setShowRotateConfirm] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const hidePhotos = (ids: string[]) => {
    setPhotos(prev => prev.map(p => ids.includes(p.id) ? { ...p, isHidden: true } : p));
  };

  const unhidePhotos = (ids: string[]) => {
    setPhotos(prev => prev.map(p => ids.includes(p.id) ? { ...p, isHidden: false } : p));
  };

  const executeSmartRotate = async (targetIds?: string[]) => {
    const idsToRotate = targetIds || (selectedPhotoIds.size > 0 
      ? Array.from(selectedPhotoIds) 
      : photos.map(p => p.id));

    if (idsToRotate.length === 0) return;

    setIsRotating(true);
    setShowRotateConfirm(false);
    setRotationProgress({ current: 0, total: idsToRotate.length });

    // Process in batches of 5 for better progress feedback and server stability
    const BATCH_SIZE = 5;
    let processedCount = 0;

    for (let i = 0; i < idsToRotate.length; i += BATCH_SIZE) {
      const batch = idsToRotate.slice(i, i + BATCH_SIZE);
      
      try {
        const response = await fetch('/api/rotate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photoIds: batch, eventId })
        });

        const data = await response.json();
        if (data.success && data.updates) {
          setPhotos(prev => prev.map(p => {
            const update = data.updates.find((u: any) => u.id === p.id);
            if (update) {
              return {
                ...p,
                url: update.medium || update.original || p.url,
                variants: {
                  ...(p.variants || {}),
                  thumbnail: update.thumbnail,
                  medium: update.medium,
                  large: update.large,
                  original: update.original || p.variants?.original,
                  blur: update.blur || p.variants?.blur
                }
              };
            }
            return p;
          }));
          processedCount += data.processedCount;
        }
      } catch (error) {
        console.error('Batch rotation failed:', error);
      }
      
      setRotationProgress(prev => prev ? { ...prev, current: Math.min(i + BATCH_SIZE, idsToRotate.length) } : null);
    }

    setIsRotating(false);
    setRotationProgress(null);
    setSelectedPhotoIds(new Set());
    
    if (processedCount > 0) {
      setToast({ message: `Successfully oriented ${processedCount} photos!`, type: 'success' });
    } else {
      setToast({ message: 'No photos needed orientation fixing.', type: 'info' });
    }
  };

  const handleManualRotate = async (photoId: string) => {
    setIsRotating(true);
    try {
      const response = await fetch('/api/rotate-manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId, eventId, angle: 90 })
      });

      const data = await response.json();
      if (data.success && data.update) {
        setPhotos(prev => prev.map(p => p.id === photoId ? {
          ...p,
          url: data.update.medium,
          variants: {
            ...p.variants,
            ...data.update.variants
          }
        } : p));
        setToast({ message: 'Photo rotated!', type: 'success' });
      } else {
        setToast({ message: data.error || 'Failed to rotate', type: 'error' });
      }
    } catch (err) {
      console.error('Manual rotation failed:', err);
      setToast({ message: 'Rotation failed', type: 'error' });
    } finally {
      setIsRotating(false);
    }
  };

  const handleSmartRotate = () => {
    if (selectedPhotoIds.size > 0) {
      // CASE A: Apply directly to selected photos
      executeSmartRotate(Array.from(selectedPhotoIds));
    } else {
      // CASE B: Show confirmation modal for all photos
      setShowRotateConfirm(true);
    }
  };

  const handleCoverFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCover(true);
    const formData = new FormData();
    formData.append('eventId', eventId);
    formData.append('photos', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success && data.photos.length > 0) {
        const p = data.photos[0];
        // Prefer medium but fall back to url/original
        const coverUrl = p.medium || p.url || p.original;
        
        // Find the LATEST event from current events prop to avoid stale state
        const latestEvent = events.find(e => e.id === eventId);
        if (latestEvent) {
          onUpdateEvent({
            ...latestEvent,
            image: coverUrl
          });
          setToast({ message: 'Cover image updated from upload!', type: 'success' });
        }
      }
    } catch (err) {
      console.error('Failed to upload cover image:', err);
      setToast({ message: 'Failed to upload cover image', type: 'error' });
    } finally {
      setIsUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = '';
    }
  };

  const handleSetCover = (photo: Photo) => {
    // Robust URL selection
    const coverUrl = photo.variants?.medium || photo.url || photo.variants?.original;
    if (!coverUrl) {
      setToast({ message: 'Could not resolve image URL', type: 'error' });
      return;
    }
    
    // Find the LATEST event from current events prop to avoid stale state
    const latestEvent = events.find(e => e.id === eventId);
    if (!latestEvent) {
      setToast({ message: 'Event not found', type: 'error' });
      return;
    }

    onUpdateEvent({
      ...latestEvent,
      image: coverUrl
    });
    setToast({ message: 'Gallery photo set as cover!', type: 'success' });
  };

  return (
    <div className={`flex flex-col h-screen transition-colors duration-300 ${isDark ? 'bg-[#0B0E14] text-white' : 'bg-slate-50 text-indigo-950'}`}>
      <ConfirmModal 
        isOpen={showRotateConfirm}
        title="Smart Auto Rotate"
        message={selectedPhotoIds.size > 0 
          ? `Do you want to fix the orientation of the ${selectedPhotoIds.size} selected photos? This will permanently adjust them to their natural position.`
          : "All photos in this event will be automatically oriented based on their camera metadata. This helps ensure people look natural. Proceed?"
        }
        onConfirm={executeSmartRotate}
        onCancel={() => setShowRotateConfirm(false)}
        isDark={isDark}
      />
      <SimpleToast toast={toast} onClose={() => setToast(null)} isDark={isDark} />
      
      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <EventSettingsModal 
            event={event}
            onClose={() => setIsSettingsOpen(false)}
            onSave={(updated) => {
              onUpdateEvent(updated);
              setIsSettingsOpen(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className={`h-16 px-6 flex items-center justify-between border-b shrink-0 ${isDark ? 'border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
        <div className="flex items-center gap-6">
          <button onClick={onBack} className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-white/5 text-white' : 'hover:bg-slate-100 text-slate-600'}`}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className={`text-xl font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-indigo-950'}`}>{event.title}</h1>
          <div className="relative group ml-4">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-primary' : 'text-slate-400 group-focus-within:text-primary'}`} />
            <input 
              type="text" 
              placeholder="Search a file" 
              className={`pl-11 pr-4 py-2 border rounded-lg text-sm font-medium focus:ring-1 focus:ring-primary outline-none transition-all w-64 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-indigo-950'}`}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDark(!isDark)}
            className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-white/5 text-yellow-400' : 'hover:bg-slate-100 text-slate-400'}`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className={`p-2 rounded-lg transition-all ${isDark ? 'text-slate-400 hover:text-primary hover:bg-white/5' : 'text-slate-400 hover:text-primary hover:bg-slate-100'}`}
          >
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg transition-all text-slate-400">
            <Share2 className="w-5 h-5" />
          </button>
          <PhotoUploader 
            eventId={eventId} 
            isDark={isDark} 
            onUploadComplete={(newPhotos) => {
              setPhotos(prev => [...newPhotos, ...prev]);
              // Update event photo count
              onUpdateEvent({
                ...event,
                photoCount: event.photoCount + newPhotos.length
              });
            }} 
          />
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg hover:scale-105 active:scale-95">
            Publish
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`w-72 border-r flex flex-col shrink-0 ${isDark ? 'border-white/10 bg-[#12161F]/50' : 'bg-white border-slate-200'}`}>
          <div className="p-6 space-y-6">
            {/* Cover Selection */}
            <div className="space-y-4">
              <div 
                onClick={() => coverInputRef.current?.click()}
                className={`aspect-[16/10] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-slate-600 group cursor-pointer hover:border-primary/50 transition-all overflow-hidden relative ${isDark ? 'bg-white/5 border-white/10 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
              >
                {isUploadingCover && (
                  <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full"
                    />
                  </div>
                )}
                {event.image ? (
                  <>
                    <img src={event.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                       <CloudUpload className="w-8 h-8 text-white" />
                    </div>
                  </>
                ) : (
                  <>
                    <ImageIcon className="w-10 h-10 mb-2 group-hover:text-primary transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-center px-4">Set Cover Image</span>
                  </>
                )}
              </div>
              <input 
                type="file" 
                ref={coverInputRef} 
                onChange={handleCoverFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 gap-4 py-4 border-y ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
              <div className="text-center">
                <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-indigo-950'}`}>{event.photoCount}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Photos</p>
              </div>
              <div className="text-center">
                <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-indigo-950'}`}>{event.folderCount}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Folders</p>
              </div>
            </div>

            <button className={`w-full py-3 border rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${isDark ? 'border-white/10 hover:bg-white/5 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
              <Plus className="w-4 h-4" />
              Add Folder
            </button>

            {/* Folders List */}
            <div className="space-y-4">
              <button 
                onClick={() => setIsFoldersOpen(!isFoldersOpen)}
                className={`w-full flex items-center justify-between group px-1 ${isDark ? '' : 'hover:bg-slate-100 rounded-lg py-1'}`}
              >
                <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-indigo-950'}`}>
                  <Folder className="w-4 h-4" />
                  Folders
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isFoldersOpen ? '' : '-rotate-90'}`} />
              </button>

              <AnimatePresence>
                {isFoldersOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-1 overflow-hidden"
                  >
                    <div className={`flex items-center justify-between p-3 rounded-xl border ${isDark ? 'bg-primary/20 text-white border-primary/30' : 'bg-primary/10 text-primary border-primary/20'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-6 rounded-full ${isDark ? 'bg-primary' : 'bg-primary'}`} />
                        <span className="text-sm font-black">Highlights</span>
                      </div>
                      <MoreVertical className={`w-4 h-4 ${isDark ? 'text-white/60' : 'text-primary/60'}`} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </aside>

        {/* Main Area */}
        <main className={`flex-1 overflow-y-auto relative transition-colors duration-300 ${isDark ? 'bg-[#0B0E14]' : 'bg-white'}`}>
          <div className="p-8 space-y-8">
            {/* Grid Controls */}
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-1 p-1 rounded-xl ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                {(['all', 'visible', 'hidden'] as const).map(f => (
                  <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-primary text-white shadow-lg shadow-primary/20' : (isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700')}`}
                  >
                    {f === 'all' ? 'Showing: All' : f}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button 
                   onClick={handleSmartRotate}
                   disabled={isRotating}
                   className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${isDark ? 'hover:bg-white/5 text-slate-300 border-white/5' : 'hover:bg-slate-50 text-slate-600 border-slate-200'} ${isRotating ? 'opacity-50 cursor-wait' : ''}`}
                >
                  <RotateCw className={`w-4 h-4 text-primary ${isRotating ? 'animate-spin' : ''}`} />
                  {isRotating 
                    ? `Processing ${rotationProgress?.current}/${rotationProgress?.total}...` 
                    : 'Smart Auto Rotate'}
                </button>
                <div className="relative group">
                  <select className={`appearance-none pl-4 pr-10 py-2 border rounded-lg text-sm font-bold focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer ${isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
                    <option>Oldest first</option>
                    <option>Newest first</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Photos Grid */}
            {photos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-8">
                <div className="relative w-full max-w-2xl aspect-video">
                  {/* Mock illustration using a styled div since we don't have the real asset */}
                  <div className={`w-full h-full rounded-[3rem] border flex items-center justify-center p-12 ${isDark ? 'bg-gradient-to-br from-indigo-500/10 to-primary/10 border-white/5' : 'bg-slate-50 border-slate-200 shadow-inner'}`}>
                     <div className="relative">
                        <Monitor className={`w-48 h-48 ${isDark ? 'text-indigo-900/50' : 'text-slate-200'}`} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                          <CloudUpload className="w-16 h-16 text-primary mb-4" />
                          <p className={`text-2xl font-black ${isDark ? 'text-white' : 'text-indigo-950'}`}>Drag & Drop</p>
                        </div>
                     </div>
                  </div>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 hover:scale-105 transition-all">
                  <CloudUpload className="w-6 h-6" />
                  Upload Images
                </button>
              </div>
            ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                {filteredPhotos.map((photo, index) => (
                  <div key={photo.id} className="break-inside-avoid">
                    <PhotoCard 
                      photo={photo}
                      isSelected={selectedPhotoIds.has(photo.id)}
                      onSelect={() => toggleSelect(photo.id)}
                      onPreview={() => setPreviewPhotoIndex(index)}
                      onHide={() => hidePhotos([photo.id])}
                      onUnhide={() => unhidePhotos([photo.id])}
                      onDelete={() => handleDelete([photo.id])}
                      onRotate={() => handleManualRotate(photo.id)}
                      onSetCover={() => handleSetCover(photo)}
                      isDark={isDark}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <AnimatePresence>
            {selectedPhotoIds.size > 0 && (
              <BatchActionBar 
                count={selectedPhotoIds.size}
                onSelectAll={selectAll}
                onHide={() => hidePhotos(Array.from(selectedPhotoIds))}
                onUnhide={() => unhidePhotos(Array.from(selectedPhotoIds))}
                onDelete={() => handleDelete(Array.from(selectedPhotoIds))}
                onClose={() => setSelectedPhotoIds(new Set())}
                isDark={isDark}
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      {previewPhotoIndex !== null && (
        <PhotoPreview 
          photos={filteredPhotos}
          currentIndex={previewPhotoIndex}
          onClose={() => setPreviewPhotoIndex(null)}
          onIndexChange={setPreviewPhotoIndex}
          onRotate={() => handleManualRotate(filteredPhotos[previewPhotoIndex].id)}
        />
      )}
    </div>
  );
}

function PhotoCard({ photo, isSelected, onSelect, onPreview, onHide, onUnhide, onDelete, onRotate, onSetCover, isDark }: { 
  photo: Photo, 
  isSelected: boolean,
  onSelect: () => void,
  onPreview: () => void,
  onHide: () => void,
  onUnhide: () => void,
  onDelete: () => void,
  onRotate: () => void,
  onSetCover: () => void,
  isDark: boolean,
  key?: string | number
}) {
  const [showOptions, setShowOptions] = useState(false);

  const displayUrl = photo.variants?.thumbnail || photo.url;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`group relative rounded-3xl overflow-hidden border transition-all cursor-pointer mb-6 ${isDark ? 'bg-[#12161F] border-white/5 hover:border-primary/50' : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-primary/50'}`}
      onMouseLeave={() => setShowOptions(false)}
    >
      {/* Blurred Placeholder */}
      {photo.variants?.blur && !isLoaded && (
        <img 
          src={photo.variants.blur} 
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-50"
          alt="Loading..."
        />
      )}

      <img 
        src={displayUrl} 
        alt={photo.filename} 
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-auto block transition-all duration-1000 ${photo.isHidden ? 'opacity-30 p-8 scale-90' : 'group-hover:scale-105'} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onClick={onPreview}
        loading="lazy"
      />
      
      {/* Overlay controls - top left checkbox */}
      <div className={`absolute top-4 left-4 z-10 transition-all ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary text-white' : 'bg-black/20 border-white/40 hover:border-white'}`}
        >
          {isSelected && <div className="w-3 h-3 bg-white rounded-sm" />}
        </button>
      </div>

      {/* Overlay controls - top right icons */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
        <PhotoActionButton icon={photo.isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />} label={photo.isHidden ? "Unhide" : "Hide"} onClick={photo.isHidden ? onUnhide : onHide} />
        <PhotoActionButton icon={<Trash2 className="w-4 h-4" />} label="Delete" onClick={onDelete} />
        <PhotoActionButton icon={<Download className="w-4 h-4" />} label="Download" onClick={() => {}} />
        
        <div className="relative">
          <PhotoActionButton 
            icon={<MoreHorizontal className="w-4 h-4" />} 
            label="More Options" 
            onClick={() => setShowOptions(!showOptions)} 
          />
                  <AnimatePresence>
            {showOptions && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className={`absolute right-0 top-10 w-40 border border-white/10 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl ${isDark ? 'bg-[#1A1F29] border-white/10' : 'bg-white border-slate-200'}`}
              >
                <DropdownButton icon={<ImagePlus className="w-4 h-4" />} label="Set Cover" onClick={() => { onSetCover(); setShowOptions(false); }} isDark={isDark} />
                <DropdownButton icon={<FolderSymlink className="w-4 h-4" />} label="Move" onClick={() => setShowOptions(false)} isDark={isDark} />
                <DropdownButton icon={<RotateCw className="w-4 h-4" />} label="Rotate" onClick={() => { onRotate(); setShowOptions(false); }} isDark={isDark} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Filename footer */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col">
        <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">Suzannaway</span>
        <span className="text-xs font-bold text-white truncate">{photo.filename}</span>
      </div>
    </motion.div>
  );
}

function DropdownButton({ icon, label, onClick, isDark }: { icon: ReactNode, label: string, onClick: () => void, isDark: boolean }) {
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-lg transition-all ${isDark ? 'text-slate-300 hover:bg-primary/20 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-primary'}`}
    >
      <span className="text-primary">{icon}</span>
      {label}
    </button>
  );
}

function PhotoActionButton({ icon, label, onClick }: { icon: ReactNode, label: string, onClick: () => void }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div className="relative">
      <button 
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="w-8 h-8 rounded-lg bg-black/40 hover:bg-primary text-white flex items-center justify-center transition-all backdrop-blur-sm"
      >
        {icon}
      </button>
      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-[10px] font-black uppercase tracking-widest rounded pointer-events-none z-50 whitespace-nowrap"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BatchActionBar({ count, onSelectAll, onHide, onUnhide, onDelete, onClose, isDark }: { 
  count: number,
  onSelectAll: () => void,
  onHide: () => void,
  onUnhide: () => void,
  onDelete: () => void,
  onClose: () => void,
  isDark: boolean
}) {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6"
    >
      <div className={`border rounded-2xl shadow-2xl p-4 flex items-center justify-between backdrop-blur-xl ${isDark ? 'bg-[#1A1F29] border-white/10 text-white' : 'bg-white border-slate-200 text-indigo-950'}`}>
        <div className="flex items-center gap-6">
          <p className="text-sm font-black whitespace-nowrap">{count} Images selected</p>
          <div className={`w-px h-6 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
        </div>

        <div className="flex items-center gap-2">
          <BatchButton icon={<ChevronDown className="w-4 h-4" />} label="Select All" onClick={onSelectAll} />
          <BatchButton icon={<EyeOff className="w-4 h-4" />} label="Hide" onClick={onHide} />
          <BatchButton icon={<Eye className="w-4 h-4" />} label="Unhide" onClick={onUnhide} />
          <BatchButton icon={<Trash2 className="w-4 h-4" />} label="Delete" onClick={onDelete} />
          <BatchButton icon={<Download className="w-4 h-4" />} label="Download" onClick={() => {}} />
          <BatchButton icon={<FolderSymlink className="w-4 h-4" />} label="Move" onClick={() => {}} />
        </div>

        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg ml-2 text-slate-500">
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

function BatchButton({ icon, label, onClick }: { icon: ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="p-2.5 rounded-xl hover:bg-primary/20 hover:text-primary transition-all group relative shrink-0"
      title={label}
    >
      {icon}
    </button>
  );
}

function PhotoPreview({ photos, currentIndex, onClose, onIndexChange, onRotate }: { 
  photos: Photo[], 
  currentIndex: number, 
  onClose: () => void,
  onIndexChange: (idx: number) => void,
  onRotate?: () => void
}) {
  const currentPhoto = photos[currentIndex];
  // Track loading status of the high-res image
  const [isMainLoaded, setIsMainLoaded] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleNext = useCallback(() => {
    setIsMainLoaded(false);
    onIndexChange((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onIndexChange]);

  const handlePrev = useCallback(() => {
    setIsMainLoaded(false);
    onIndexChange((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onIndexChange]);

  // 1. KEYBOARD NAVIGATION & ESC TO CLOSE
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showOriginal) {
        if (e.key === 'Escape') {
          setShowOriginal(false);
          setZoom(1);
          setPan({ x: 0, y: 0 });
        }
        return;
      }
      
      switch (e.key) {
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, onClose, showOriginal]);

  // Pre-loading logic for smooth transitions
  useEffect(() => {
    setIsMainLoaded(false);

    // 1. PRE-LOADING: Load next and previous high-res images in background
    const preloadIndexes = [
      (currentIndex + 1) % photos.length,
      (currentIndex - 1 + photos.length) % photos.length
    ];

    preloadIndexes.forEach(idx => {
      const p = photos[idx];
      if (p) {
        const nextImg = new Image();
        nextImg.src = p.variants?.large || p.variants?.medium || p.url;
      }
    });

    // Reset loaded state when switching photos
  }, [currentIndex, photos]);

  const handleBackdropClick = (e: ReactMouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Determine the best quality URL available
  const highResUrl = currentPhoto.variants?.large || currentPhoto.variants?.medium || currentPhoto.url;
  const lqipUrl = currentPhoto.variants?.blur || currentPhoto.variants?.thumbnail || currentPhoto.url;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex flex-col backdrop-blur-3xl"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/black-paper.png")' }} />

      <div className="h-20 px-8 flex items-center justify-between border-b border-white/5 relative z-10 bg-black/20">
        <div className="flex items-center gap-6">
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-all text-white/70 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-[0.3em] text-primary uppercase">Photo details</span>
            <span className="text-sm font-bold text-white/90">{currentIndex + 1} of {photos.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PhotoActionButton icon={<Download className="w-4 h-4" />} label="Download" onClick={() => {
            const link = document.createElement('a');
            link.href = currentPhoto.variants?.original || currentPhoto.url;
            link.download = currentPhoto.filename;
            link.click();
          }} />
          <PhotoActionButton icon={<Share2 className="w-4 h-4" />} label="Share" onClick={() => {}} />
          <div className="w-px h-6 bg-white/10 mx-2" />
          <PhotoActionButton 
            icon={<Maximize2 className="w-4 h-4" />} 
            label="Full Resolution" 
            onClick={() => setShowOriginal(true)} 
          />
          {onRotate && <PhotoActionButton icon={<RotateCw className="w-4 h-4" />} label="Rotate" onClick={onRotate} />}
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center p-4 md:p-12 overflow-hidden" onClick={handleBackdropClick}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex items-center justify-center pointer-events-none"
          >
            {/* 2. LQIP (Low Quality Image Placeholder) */}
            {!isMainLoaded && (
              <div 
                className="absolute inset-0 m-auto flex items-center justify-center overflow-hidden" 
                style={{ width: '80%', height: '80%' }}
              >
                <img 
                  src={lqipUrl} 
                  alt="placeholder"
                  className="w-full h-full object-contain blur-2xl scale-125 opacity-40 transition-opacity duration-500"
                />
              </div>
            )}
            
            <img 
              src={highResUrl} 
              alt={currentPhoto.filename} 
              onLoad={() => setIsMainLoaded(true)}
              className={`max-w-full max-h-full object-contain shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-sm transition-opacity duration-700 ease-in-out pointer-events-auto cursor-zoom-in ${isMainLoaded ? 'opacity-100' : 'opacity-0'}`}
              onClick={(e) => {
                e.stopPropagation();
                setShowOriginal(true);
              }}
            />
          </motion.div>
        </AnimatePresence>

        <button 
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/5 backdrop-blur-md z-30"
        >
          <ChevronLeft className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group border border-white/5 backdrop-blur-md z-30"
        >
          <ChevronRight className="w-8 h-8 text-white/40 group-hover:text-white transition-colors" />
        </button>
      </div>

      <div className="h-24 bg-black/50 border-t border-white/5 p-4 flex items-center justify-center gap-2 overflow-x-auto custom-scrollbar relative z-30">
        {photos.slice(Math.max(0, currentIndex - 5), currentIndex + 6).map((p, idx) => {
          const actualIdx = photos.indexOf(p);
          return (
            <button
              key={p.id}
              onClick={(e) => { e.stopPropagation(); onIndexChange(actualIdx); }}
              className={`relative h-16 aspect-square rounded-lg overflow-hidden transition-all shrink-0 border-2 ${actualIdx === currentIndex ? 'border-primary ring-4 ring-primary/20 scale-110' : 'border-primary opacity-40 hover:opacity-100'}`}
            >
              <img src={p.variants?.thumbnail || p.url} className="w-full h-full object-cover" />
            </button>
          );
        })}
      </div>

      {/* ORIGINAL RESOLUTION MODAL WITH ZOOM */}
      <AnimatePresence>
        {showOriginal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col"
          >
            <div className="absolute top-6 right-6 z-50 flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                 <button onClick={() => setZoom(z => Math.max(0.5, z - 0.5))} className="text-white/70 hover:text-white"><ZoomOut className="w-5 h-5" /></button>
                 <span className="text-white font-bold text-sm min-w-[50px] text-center">{Math.round(zoom * 100)}%</span>
                 <button onClick={() => setZoom(z => Math.min(5, z + 0.5))} className="text-white/70 hover:text-white"><ZoomIn className="w-5 h-5" /></button>
              </div>
              <button 
                onClick={() => { setShowOriginal(false); setZoom(1); setPan({ x: 0, y: 0 }); }}
                className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div 
              className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center p-4 md:p-12"
              onMouseDown={(e) => {
                isDragging.current = true;
                lastPos.current = { x: e.clientX, y: e.clientY };
              }}
              onMouseMove={(e) => {
                if (!isDragging.current) return;
                const dx = e.clientX - lastPos.current.x;
                const dy = e.clientY - lastPos.current.y;
                setPan(p => ({ x: p.x + dx, y: p.y + dy }));
                lastPos.current = { x: e.clientX, y: e.clientY };
              }}
              onMouseUp={() => isDragging.current = false}
              onMouseLeave={() => isDragging.current = false}
              onWheel={(e) => {
                const delta = e.deltaY > 0 ? -0.1 : 0.1;
                setZoom(z => Math.min(5, Math.max(0.5, z + delta)));
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <motion.img
                  src={currentPhoto.variants?.original || currentPhoto.url}
                  alt="Full resolution"
                  style={{ 
                    scale: zoom,
                    x: pan.x,
                    y: pan.y
                  }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="max-w-full max-h-full object-contain shadow-2xl pointer-events-none select-none"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: "Free",
      price: 0,
      desc: "Try core features for free",
      features: [
        "Apple Image Format (.HEIC) Support",
        "Unlimited email notifications",
        "2 events",
        "Unlimited face search",
        "15 MB photo upload",
        "10 GB storage",
        "Uncompressed Photos"
      ],
      button: "Get Started",
      highlight: false
    },
    {
      name: "Starter",
      price: isYearly ? 19 : 29,
      originalPrice: isYearly ? 49 : null,
      desc: "Perfect for beginners",
      features: [
        "Unlimited email notifications",
        "Unlimited events",
        "Unlimited face search",
        "50 MB photo upload",
        "125 GB storage",
        "Uncompressed Photos",
        "Apple Image Format (.HEIC) Support"
      ],
      button: "Buy Now",
      highlight: false
    },
    {
      name: "Pro",
      price: isYearly ? 49 : 69,
      originalPrice: isYearly ? 99 : null,
      desc: "Most popular choice",
      features: [
        "Unlimited email notifications",
        "Unlimited events",
        "Unlimited face search",
        "50 MB photo upload",
        "500 GB storage",
        "Uncompressed Photos",
        "Apple Image Format (.HEIC) Support"
      ],
      button: "Buy Now",
      highlight: true,
      badge: "Most Popular"
    },
    {
      name: "Pro Plus",
      price: isYearly ? 89 : 119,
      originalPrice: isYearly ? 169 : null,
      desc: "For full-scale operations",
      features: [
        "Apple Image Format (.HEIC) Support",
        "Unlimited email notifications",
        "Unlimited events",
        "Unlimited face search",
        "50 MB photo upload",
        "1000 GB storage",
        "Uncompressed Photos"
      ],
      button: "Buy Now",
      highlight: false
    }
  ];

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-black text-indigo-950 dark:text-white mb-6 tracking-tighter"
        >
          Pricing & <span className="text-primary italic">Plans</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium mb-10"
        >
          We offer simple, transparent pricing designed to scale with your photography business. Compare plans and find your perfect fit.
        </motion.p>
        
        {/* Toggle */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <span className={`text-sm font-bold ${!isYearly ? 'text-indigo-950 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 bg-slate-200 dark:bg-white/10 rounded-full p-1 transition-all relative"
            >
              <motion.div 
                animate={{ x: isYearly ? 28 : 0 }}
                className="w-5 h-5 bg-primary rounded-full shadow-lg"
              />
            </button>
            <span className={`text-sm font-bold ${isYearly ? 'text-indigo-950 dark:text-white' : 'text-slate-400'}`}>Yearly</span>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-black rounded-full border border-emerald-500/20"
          >
            SAVE 50% WITH YEARLY BILLING
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`frosted-glass p-8 rounded-[2rem] flex flex-col relative group transition-all duration-500 ${plan.highlight ? 'ring-2 ring-primary bg-white/40 dark:bg-primary/5 shadow-2xl shadow-primary/10' : 'bg-white/20 dark:bg-white/5 border border-white/50 dark:border-white/5'}`}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 vibrant-gradient text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                {plan.badge}
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-2xl font-black text-indigo-950 dark:text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-black text-primary">$</span>
                <span className="text-5xl font-black text-indigo-950 dark:text-white tracking-tighter">
                  {plan.price}
                </span>
                {plan.price > 0 && <span className="text-slate-500 font-bold">/month</span>}
              </div>
              {plan.originalPrice && (
                <div className="text-sm text-slate-400 font-medium line-through mb-1">
                  Normally ${plan.originalPrice}
                </div>
              )}
              {plan.price > 0 && <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Billed yearly</div>}
              <p className="text-slate-400 text-sm font-medium mt-4">{plan.desc}</p>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">What's Included</div>
              {plan.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-start gap-3 group/feat">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/feat:bg-emerald-500/20 transition-colors">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium group-hover/feat:text-indigo-950 dark:group-hover/feat:text-white transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all transform active:scale-95 shadow-xl ${plan.highlight ? 'vibrant-gradient text-white shadow-primary/20 hover:scale-[1.02]' : 'bg-indigo-950 dark:bg-white text-white dark:text-indigo-950 hover:bg-black dark:hover:bg-slate-200 shadow-indigo-900/10'}`}>
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-slate-400 font-medium">
          You can upgrade, downgrade, or cancel anytime — no long-term commitments.
        </p>
      </div>
    </motion.main>
  );
}

function FeatureItem({ icon, title, desc, delay = 0 }: { icon: ReactNode, title: string, desc: string, delay?: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="feature-item frosted-glass iridescent-border flex items-center gap-4 px-5 py-4 rounded-2xl cursor-default group hover:bg-white/80 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-xl vibrant-gradient flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-indigo-950 dark:text-white text-lg leading-tight">{title}</span>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5 max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

function ChoiceCard({ icon, title, desc }: { icon: ReactNode, title: string, desc: string, key?: string | number }) {
  return (
    <div className="w-[60vw] md:w-[250px] min-w-[60vw] md:min-w-[250px] frosted-glass iridescent-border p-4 md:p-6 rounded-[1.25rem] md:rounded-[2rem] transition-all group whitespace-normal shrink-0">
      <div className="w-8 h-8 md:w-10 md:h-10 vibrant-gradient rounded-full flex items-center justify-center mb-3 md:mb-5 shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
        <div className="scale-75 md:scale-100">{icon}</div>
      </div>
      <h3 className="text-xs md:text-lg font-bold mb-1 md:mb-2 text-indigo-950 dark:text-white tracking-tight leading-tight">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 leading-snug text-[10px] md:text-xs font-medium line-clamp-3 md:line-clamp-none">{desc}</p>
    </div>
  );
}

function Step({ number, title, desc, illustration, direction }: { 
  number: string, 
  title: string, 
  desc: string, 
  illustration: ReactNode,
  direction: 'left' | 'up' | 'right'
}) {
  const variants = {
    hidden: { 
      opacity: 0, 
      x: direction === 'left' ? -50 : direction === 'right' ? 50 : 0,
      y: direction === 'up' ? 50 : 0
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div 
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="flex flex-col items-center text-center group"
    >
      <div className="relative mb-8 w-full max-w-[280px] aspect-square flex items-center justify-center">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-[2.5rem] blur-2xl transition-all duration-500 -z-10" />
        
        <div className="frosted-glass iridescent-border w-full h-full rounded-[2.5rem] p-6 flex items-center justify-center shadow-xl shadow-indigo-900/5 group-hover:shadow-primary/10 transition-all duration-500 overflow-hidden">
          {illustration}
        </div>
        
        {/* Step Number Badge */}
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="absolute -top-4 -right-4 w-12 h-12 vibrant-gradient rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl"
        >
          {number}
        </motion.div>
      </div>

      <h3 className="text-2xl font-bold text-indigo-950 dark:text-white mb-3 tracking-tight group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[240px]">
        {desc}
      </p>
    </motion.div>
  );
}

function EventFormIllustration() {
  return (
    <div className="w-full space-y-3">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="h-8 w-3/4 bg-white/60 dark:bg-white/10 rounded-lg border border-indigo-100 dark:border-white/5 flex items-center px-3"
      >
        <div className="w-2 h-2 bg-primary/20 rounded-full mr-2" />
        <div className="h-1.5 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="h-8 w-full bg-white/60 dark:bg-white/10 rounded-lg border border-indigo-100 dark:border-white/5 flex items-center px-3"
      >
        <div className="w-2 h-2 bg-primary/20 rounded-full mr-2" />
        <div className="h-1.5 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="h-12 w-full vibrant-gradient rounded-lg flex items-center justify-center shadow-lg"
      >
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="h-2 w-24 bg-white/30 rounded" 
        />
      </motion.div>
    </div>
  );
}

function UploadIllustration() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full aspect-video rounded-xl bg-white/40 dark:bg-white/5 border-2 border-dashed border-indigo-200 dark:border-indigo-900/50 flex flex-col items-center justify-center mb-4 relative overflow-hidden">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <CloudUpload className="w-8 h-8 text-primary/40" />
        </motion.div>
        
        {/* Animated file icons */}
        <motion.div 
          animate={{ y: [20, -40], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute bottom-0 w-6 h-8 bg-white shadow-sm rounded border border-indigo-50"
        />
      </div>
      
      <div className="w-full h-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="h-full bg-primary"
        />
      </div>
      <div className="flex justify-between w-full mt-2">
        <div className="h-1 w-8 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-1 w-12 bg-slate-200 dark:bg-slate-700 rounded" />
      </div>
    </div>
  );
}

function DiscoveryIllustration() {
  return (
    <div className="w-full relative">
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative aspect-square rounded-lg bg-white dark:bg-slate-900 shadow-sm overflow-hidden border border-indigo-50 dark:border-white/5">
            <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800" />
            <div className="absolute inset-x-2 bottom-2 space-y-1">
              <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-1 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
            
            {/* AI Highlight Boxes */}
            {i === 2 && (
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 border-2 border-primary/60 m-2 rounded shadow-[0_0_10px_rgba(139,92,246,0.3)] flex items-center justify-center"
              >
                <div className="w-1 h-1 bg-primary rounded-full absolute -top-0.5 -left-0.5" />
                <div className="w-1 h-1 bg-primary rounded-full absolute -top-0.5 -right-0.5" />
                <div className="w-1 h-1 bg-primary rounded-full absolute -bottom-0.5 -left-0.5" />
                <div className="w-1 h-1 bg-primary rounded-full absolute -bottom-0.5 -right-0.5" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
      
      {/* QR Badge */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute -bottom-2 -right-2 w-16 h-16 bg-white dark:bg-slate-900 p-2 rounded-xl shadow-2xl border border-indigo-50 dark:border-white/5 z-20"
      >
        <QrCode className="w-full h-full text-indigo-900 dark:text-white" />
      </motion.div>
    </div>
  );
}

function CategoryCard({ img, title, desc }: { img: string, title: string, desc: string, key?: string | number }) {
  return (
    <div className="w-[50vw] md:min-w-[280px] group cursor-pointer relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl border border-white/20 shrink-0">
      <img 
        src={img} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-950/20 to-transparent flex flex-col justify-end p-4 md:p-8">
        <h4 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{title}</h4>
        <p className="text-indigo-100 text-[10px] md:text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          {desc}
        </p>
      </div>
    </div>
  );
}

const ALBUM_THEMES = [
  { id: 'minimal-white', name: 'Almond White', bg: '#FDFBF9', text: '#2D241E', accent: '#4A342E', font: 'serif' as const },
  { id: 'classic-cream', name: 'Classic Cream', bg: '#F5E6D3', text: '#3E2723', accent: '#8D6E63', font: 'serif' as const },
  { id: 'royal-emerald', name: 'Royal Emerald', bg: '#062C25', text: '#D1E7E2', accent: '#D4AF37', font: 'serif' as const },
  { id: 'deep-burgundy', name: 'Deep Burgundy', bg: '#2C0606', text: '#F9F0F0', accent: '#E5C100', font: 'serif' as const },
  { id: 'vintage-navy', name: 'Vintage Navy', bg: '#0A192F', text: '#E6F1FF', accent: '#64FFDA', font: 'serif' as const },
  { id: 'earth-brown', name: 'Earth Brown', bg: '#2A2016', text: '#E8DCC4', accent: '#C4A484', font: 'serif' as const },
  { id: 'noir', name: 'Midnight Noir', bg: '#0D1117', text: '#FFFFFF', accent: '#8B5CF6', font: 'sans' as const },
];

function EventSettingsModal({ event, onClose, onSave }: { event: Event, onClose: () => void, onSave: (event: Event) => void }) {
  const [activeTab, setActiveTab] = useState<'general' | 'share' | 'design'>('general');
  const [editedEvent, setEditedEvent] = useState<Event>(() => {
    const generateToken = () => Math.random().toString(36).substring(2, 11) + Math.random().toString(36).substring(2, 11);
    const existing = event.shareSettings;
    const existingDesign = event.galleryDesign;
    
    return {
      ...event,
      shareSettings: {
        accessType: existing?.accessType || 'full',
        passwordEnabled: existing?.passwordEnabled || false,
        pin: existing?.pin || Math.floor(1000 + Math.random() * 9000).toString(),
        registrationEnabled: existing?.registrationEnabled || false,
        fullAccessToken: existing?.fullAccessToken || generateToken(),
        faceSearchToken: existing?.faceSearchToken || generateToken()
      },
      galleryDesign: {
        themeId: existingDesign?.themeId || ALBUM_THEMES[0].id,
        backgroundColor: existingDesign?.backgroundColor || ALBUM_THEMES[0].bg,
        textColor: existingDesign?.textColor || ALBUM_THEMES[0].text,
        accentColor: existingDesign?.accentColor || ALBUM_THEMES[0].accent,
        fontStyle: existingDesign?.fontStyle || ALBUM_THEMES[0].font,
        coverShape: existingDesign?.coverShape || 'oval'
      }
    };
  });

  const nameLimit = 40;
  const descLimit = 255;
  const isNameExceeded = editedEvent.title.length > nameLimit;
  // Note: we'll assume description exists in a future iteration or use a local state if not added to Event type yet.
  // For now, let's just focus on the fields the user requested: name, description, date.
  const [description, setDescription] = useState(''); 
  const isDescExceeded = description.length > descLimit;

  const handleSave = () => {
    if (isNameExceeded || isDescExceeded) return;
    onSave(editedEvent);
  };

  const handleTogglePassword = () => {
    setEditedEvent(prev => ({
      ...prev,
      shareSettings: prev.shareSettings ? {
        ...prev.shareSettings,
        passwordEnabled: !prev.shareSettings.passwordEnabled
      } : undefined
    }));
  };

  const handleToggleRegistration = () => {
    setEditedEvent(prev => ({
      ...prev,
      shareSettings: prev.shareSettings ? {
        ...prev.shareSettings,
        registrationEnabled: !prev.shareSettings.registrationEnabled
      } : undefined
    }));
  };

  const setAccessType = (type: 'face_search' | 'full') => {
    setEditedEvent(prev => ({
      ...prev,
      shareSettings: prev.shareSettings ? {
        ...prev.shareSettings,
        accessType: type
      } : undefined
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full max-w-2xl bg-[#0D1117] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header Tabs */}
        <div className="flex border-b border-white/5 p-2 bg-[#12161F]/50">
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-2xl ${activeTab === 'general' ? 'text-white bg-white/5 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
          >
            General Settings
          </button>
          <button 
            onClick={() => setActiveTab('share')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-2xl ${activeTab === 'share' ? 'text-white bg-white/5 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Share Settings
          </button>
          <button 
            onClick={() => setActiveTab('design')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-2xl ${activeTab === 'design' ? 'text-white bg-white/5 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Gallery Design
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar text-white">
          <AnimatePresence mode="wait">
            {activeTab === 'general' ? (
              <motion.div 
                key="general"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Event Name *</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={editedEvent.title}
                        onChange={(e) => setEditedEvent({...editedEvent, title: e.target.value})}
                        className={`w-full px-6 py-4 bg-[#12161F] border rounded-2xl outline-none transition-all font-bold text-lg ${isNameExceeded ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10'}`}
                        placeholder="My Awesome Event"
                      />
                      {isNameExceeded && <p className="text-[10px] text-red-500 font-bold mt-2 px-1 uppercase tracking-widest">Character limit exceeded</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Description</label>
                    <textarea 
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={`w-full px-6 py-4 bg-[#12161F] border rounded-2xl outline-none transition-all font-medium resize-none ${isDescExceeded ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10'}`}
                      placeholder="Tell us about your event..."
                    />
                    {isDescExceeded && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-widest">Character limit exceeded</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Start Date</label>
                      <div className="relative">
                        <input 
                          type="date"
                          value={editedEvent.eventDate}
                          onChange={(e) => setEditedEvent({...editedEvent, eventDate: e.target.value})}
                          className="w-full px-6 py-4 bg-[#12161F] border border-white/10 rounded-2xl outline-none transition-all font-bold focus:border-primary"
                        />
                        <CalendarIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">End Date</label>
                      <div className="relative">
                        <input 
                          type="date"
                          value={editedEvent.endDate || editedEvent.eventDate}
                          onChange={(e) => setEditedEvent({...editedEvent, endDate: e.target.value})}
                          className="w-full px-6 py-4 bg-[#12161F] border border-white/10 rounded-2xl outline-none transition-all font-bold focus:border-primary"
                        />
                        <CalendarIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : activeTab === 'design' ? (
              <motion.div 
                key="design"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Album Presets</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {ALBUM_THEMES.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => {
                          setEditedEvent(prev => ({
                            ...prev,
                            galleryDesign: prev.galleryDesign ? {
                              ...prev.galleryDesign,
                              themeId: theme.id,
                              backgroundColor: theme.bg,
                              textColor: theme.text,
                              accentColor: theme.accent,
                              fontStyle: theme.font
                            } : undefined
                          }));
                        }}
                        className={`group relative rounded-2xl p-3 border-2 transition-all flex flex-col items-center justify-center gap-3 overflow-hidden ${editedEvent.galleryDesign?.themeId === theme.id ? 'border-primary shadow-[0_0_20px_rgba(139,92,246,0.3)] bg-white/5' : 'border-white/5 hover:border-white/20 bg-white/5'}`}
                      >
                         <div 
                           className="w-10 h-14 rounded shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform relative overflow-hidden"
                           style={{ backgroundColor: theme.bg }}
                         >
                           <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")' }} />
                           <div className="w-6 h-0.5 relative z-10" style={{ backgroundColor: theme.accent, opacity: 0.5 }} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-center">{theme.name}</span>
                         {editedEvent.galleryDesign?.themeId === theme.id && (
                           <div className="absolute top-1 right-1">
                             <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                           </div>
                         )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="space-y-6">
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Cover Styles</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: 'oval', name: 'Classic Oval', icon: <div className="w-10 h-10 border-2 border-current rounded-[40%] flex items-center justify-center"><ImageIcon className="w-4 h-4 opacity-30" /></div> },
                          { id: 'pill', name: 'Elegant Pill', icon: <div className="w-10 h-10 border-2 border-current rounded-[3rem] flex items-center justify-center"><ImageIcon className="w-4 h-4 opacity-30" /></div> },
                          { id: 'circle', name: 'Soft Circle', icon: <div className="w-10 h-10 border-2 border-current rounded-full flex items-center justify-center"><ImageIcon className="w-4 h-4 opacity-30" /></div> },
                          { id: 'rect', name: 'Brutalist Rect', icon: <div className="w-10 h-10 border-2 border-current rounded-xl flex items-center justify-center"><ImageIcon className="w-4 h-4 opacity-30" /></div> },
                        ].map(style => (
                          <button
                            key={style.id}
                            onClick={() => {
                              setEditedEvent(prev => ({
                                ...prev,
                                galleryDesign: prev.galleryDesign ? {
                                  ...prev.galleryDesign,
                                  coverShape: style.id as any
                                } : undefined
                              }));
                            }}
                            className={`p-4 rounded-[1.5rem] border transition-all flex flex-col items-center gap-3 ${editedEvent.galleryDesign?.coverShape === style.id ? 'border-primary bg-primary/10 text-primary shadow-lg' : 'border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200'}`}
                          >
                             {style.icon}
                             <span className="text-[10px] font-black uppercase tracking-widest">{style.name}</span>
                          </button>
                        ))}
                      </div>
                   </div>

                   <div className="space-y-8">
                     <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Live Preview</h3>
                     <div 
                       className="aspect-square rounded-[2rem] p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-2xl overflow-hidden relative"
                       style={{ backgroundColor: editedEvent.galleryDesign?.backgroundColor }}
                     >
                        {/* Texture in preview */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")' }} />
                        
                        <div 
                          className={`w-24 h-32 bg-slate-300 shadow-xl transition-all duration-500 overflow-hidden relative z-10 ${
                            editedEvent.galleryDesign?.coverShape === 'oval' ? 'rounded-[40%]' : 
                            editedEvent.galleryDesign?.coverShape === 'pill' ? 'rounded-[3rem]' :
                            editedEvent.galleryDesign?.coverShape === 'circle' ? 'rounded-full h-24' : 'rounded-xl'
                          }`}
                        >
                          <img src={editedEvent.image} className="w-full h-full object-cover grayscale opacity-50" />
                        </div>
                        <div className="space-y-1 relative z-10">
                          <h4 
                            className={`text-xl ${editedEvent.galleryDesign?.fontStyle === 'serif' ? 'font-serif' : 'font-sans font-bold italic'}`}
                            style={{ color: editedEvent.galleryDesign?.textColor }}
                          >
                            {editedEvent.title}
                          </h4>
                          <div className="w-12 h-0.5 mx-auto" style={{ backgroundColor: editedEvent.galleryDesign?.accentColor, opacity: 0.5 }} />
                        </div>
                     </div>
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="share"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                {/* Access Type */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Access Type</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setAccessType('face_search')}
                      className={`p-6 rounded-3xl border-2 transition-all text-left flex items-center gap-4 ${editedEvent.shareSettings?.accessType === 'face_search' ? 'border-primary bg-primary/5' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${editedEvent.shareSettings?.accessType === 'face_search' ? 'border-primary shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'border-slate-600'}`}>
                        {editedEvent.shareSettings?.accessType === 'face_search' && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                      </div>
                      <span className="font-bold text-sm tracking-tight opacity-90">Face search access</span>
                    </button>
                    <button 
                      onClick={() => setAccessType('full')}
                      className={`p-6 rounded-3xl border-2 transition-all text-left flex items-center gap-4 ${editedEvent.shareSettings?.accessType === 'full' ? 'border-primary bg-primary/5' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${editedEvent.shareSettings?.accessType === 'full' ? 'border-primary shadow-[0_0_10px_rgba(37,99,235,0.5)]' : 'border-slate-600'}`}>
                        {editedEvent.shareSettings?.accessType === 'full' && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                      </div>
                      <span className="font-bold text-sm tracking-tight opacity-90">Full access</span>
                    </button>
                  </div>
                </div>

                {/* Links Section */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Guest Links</h3>
                    
                    {/* Full Access Link */}
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Full Access Gallery</label>
                       <div className="flex gap-2">
                         <div className="flex-1 bg-[#12161F] border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-slate-400 flex items-center overflow-hidden">
                           <Globe className="w-3.5 h-3.5 mr-2 shrink-0 text-primary" />
                           <span className="truncate">gallery.ia/v/{editedEvent.shareSettings?.fullAccessToken}</span>
                         </div>
                         <button 
                           onClick={() => {
                             const url = `https://gallery.ia/v/${editedEvent.shareSettings?.fullAccessToken}`;
                             navigator.clipboard.writeText(url);
                           }}
                           className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition-all border border-white/5"
                         >
                           <Copy className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => {
                             if (editedEvent.shareSettings?.fullAccessToken) {
                               onSave(editedEvent);
                               window.history.pushState({}, '', `/v/${editedEvent.shareSettings.fullAccessToken}`);
                               window.dispatchEvent(new Event('popstate'));
                             }
                           }}
                           className="p-3 bg-primary/20 hover:bg-primary/30 rounded-xl text-primary transition-all border border-primary/20"
                         >
                           <ArrowUpRight className="w-4 h-4" />
                         </button>
                       </div>
                    </div>

                    {/* Face Search Only Link */}
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Face Search Access Only</label>
                       <div className="flex gap-2">
                         <div className="flex-1 bg-[#12161F] border border-white/10 rounded-xl px-4 py-3 text-xs font-mono text-slate-400 flex items-center overflow-hidden">
                           <ScanFace className="w-3.5 h-3.5 mr-2 shrink-0 text-secondary" />
                           <span className="truncate">gallery.ia/v/{editedEvent.shareSettings?.faceSearchToken}</span>
                         </div>
                         <button 
                           onClick={() => {
                             const url = `https://gallery.ia/v/${editedEvent.shareSettings?.faceSearchToken}`;
                             navigator.clipboard.writeText(url);
                           }}
                           className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition-all border border-white/5"
                         >
                           <Copy className="w-4 h-4" />
                         </button>
                         <button 
                           onClick={() => {
                             if (editedEvent.shareSettings?.faceSearchToken) {
                               onSave(editedEvent);
                               window.history.pushState({}, '', `/v/${editedEvent.shareSettings.faceSearchToken}`);
                               window.dispatchEvent(new Event('popstate'));
                             }
                           }}
                           className="p-3 bg-secondary/20 hover:bg-secondary/30 rounded-xl text-secondary transition-all border border-secondary/20"
                         >
                           <ArrowUpRight className="w-4 h-4" />
                         </button>
                       </div>
                    </div>
                  </div>

                  <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 flex items-center gap-6">
                    <div className="bg-white p-3 rounded-2xl shadow-xl shrink-0">
                       <QrCode className="w-16 h-16 text-indigo-950" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-1">Download QR Codes</h4>
                      <p className="text-xs text-slate-400 font-medium">Print these on table cards or display them at your event venue.</p>
                      <button className="mt-3 text-xs font-black text-white hover:text-primary transition-colors flex items-center gap-1 uppercase tracking-widest">
                        Download Kit <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Security options moved here */}
                <div className="space-y-8 pt-8 border-t border-white/5">
                   <div className="grid grid-cols-2 gap-10">
                      <div className="space-y-4">
                         <div className="flex items-center justify-between">
                            <div>
                               <h3 className="font-bold text-sm">Password Protection</h3>
                               <p className="text-xs text-slate-500 font-medium mt-1">Protect your gallery with a 4-digit PIN</p>
                            </div>
                            <button 
                              onClick={handleTogglePassword}
                              className={`w-12 h-6 rounded-full relative transition-all shadow-inner ${editedEvent.shareSettings?.passwordEnabled ? 'bg-primary' : 'bg-slate-800'}`}
                            >
                               <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-md ${editedEvent.shareSettings?.passwordEnabled ? 'right-1' : 'left-1'}`} />
                            </button>
                         </div>
                      </div>

                      <div className="space-y-2">
                          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Security PIN</h3>
                          <div className="relative group">
                             <input 
                               readOnly
                               value={editedEvent.shareSettings?.pin}
                               className="w-full px-6 py-4 bg-[#12161F] border border-white/10 rounded-2xl text-slate-500 font-mono text-xl pr-20 group-hover:bg-white/[0.07] transition-all"
                             />
                             <button 
                               onClick={() => navigator.clipboard.writeText(editedEvent.shareSettings?.pin || '')}
                               className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-bold text-xs"
                             >
                                <Copy className="w-4 h-4" />
                                Copy
                             </button>
                          </div>
                      </div>
                   </div>

                   <div className="flex items-center justify-between">
                      <div>
                         <h3 className="font-bold text-sm">Event Registration</h3>
                         <p className="text-xs text-slate-500 font-medium mt-1">Require guests to register before viewing</p>
                      </div>
                      <button 
                        onClick={handleToggleRegistration}
                        className={`w-12 h-6 rounded-full relative transition-all shadow-inner ${editedEvent.shareSettings?.registrationEnabled ? 'bg-primary' : 'bg-slate-800'}`}
                      >
                         <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-md ${editedEvent.shareSettings?.registrationEnabled ? 'right-1' : 'left-1'}`} />
                      </button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-8 bg-[#12161F]/50 border-t border-white/5 flex gap-4 justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white font-bold transition-all"
          >
            Discard Changes
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CreateEventModal({ onClose, onCreate }: { onClose: () => void, onCreate: (event: Event) => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState<'single' | 'multiple'>('single');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const nameLimit = 40;
  const descLimit = 255;

  const isNameExceeded = name.length >= nameLimit;
  const isDescExceeded = description.length >= descLimit;

  // Localized messages (placeholder for future i18n)
  const messages = {
    nameLimitExceeded: "Character limit exceeded",
    descLimitExceeded: "Character limit exceeded",
    createBtn: "Create New Event",
    modalTitle: "Create Event",
    nameLabel: "Name *",
    descLabel: "Description",
    durationLabel: "Event Duration",
    dateLabel: "Event Date",
    startDateLabel: "Start Date",
    endDateLabel: "End Date",
    singleDay: "Single Day",
    multipleDays: "Multiple Days",
    namePlaceholder: "Event Name",
    descPlaceholder: "Event Description"
  };

  const handleCreate = () => {
    if (!name || isNameExceeded || isDescExceeded) return;
    
    // Helper to generate unpredictable tokens
    const generateToken = () => Math.random().toString(36).substring(2, 11) + Math.random().toString(36).substring(2, 11);

    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: name,
      eventDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || startDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      photoCount: 0,
      folderCount: 0,
      storageSize: 0,
      status: 'Draft',
      faceSearchCount: 0,
      registrationCount: 0,
      shareSettings: {
        accessType: 'full',
        passwordEnabled: false,
        pin: Math.floor(1000 + Math.random() * 9000).toString(),
        registrationEnabled: false,
        fullAccessToken: generateToken(),
        faceSearchToken: generateToken()
      },
      galleryDesign: {
        themeId: ALBUM_THEMES[0].id,
        backgroundColor: ALBUM_THEMES[0].bg,
        textColor: ALBUM_THEMES[0].text,
        accentColor: ALBUM_THEMES[0].accent,
        fontStyle: ALBUM_THEMES[0].font,
        coverShape: 'oval'
      }
    };
    onCreate(newEvent);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full max-w-lg bg-[#12161F] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
      >
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{messages.modalTitle}</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{messages.nameLabel}</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={messages.namePlaceholder}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl outline-none transition-all text-white placeholder:text-slate-600 font-medium ${
                    isNameExceeded 
                      ? 'border-red-500 ring-1 ring-red-500' 
                      : 'border-white/10 focus:ring-2 focus:ring-primary'
                  }`}
                />
                {isNameExceeded && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-red-500 font-bold mt-1 px-1"
                  >
                    {messages.nameLimitExceeded}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{messages.descLabel}</label>
              <div className="relative">
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={messages.descPlaceholder}
                  rows={3}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl outline-none transition-all text-white placeholder:text-slate-600 resize-none font-medium ${
                    isDescExceeded 
                      ? 'border-red-500 ring-1 ring-red-500' 
                      : 'border-white/10 focus:ring-2 focus:ring-primary'
                  }`}
                />
                {isDescExceeded && (
                  <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] text-red-500 font-bold mt-1 px-1"
                  >
                    {messages.descLimitExceeded}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{messages.durationLabel}</label>
                <div className="relative">
                  <select 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value as 'single' | 'multiple')}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-white appearance-none cursor-pointer font-medium"
                  >
                    <option value="single" className="bg-[#12161F]">{messages.singleDay}</option>
                    <option value="multiple" className="bg-[#12161F]">{messages.multipleDays}</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className={`grid gap-4 ${duration === 'multiple' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                    {duration === 'multiple' ? messages.startDateLabel : messages.dateLabel}
                  </label>
                  <div className="relative">
                    <input 
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-3 pl-4 pr-10 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-white cursor-pointer font-medium"
                    />
                    <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {duration === 'multiple' && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">{messages.endDateLabel}</label>
                    <div className="relative">
                      <input 
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-4 py-3 pl-4 pr-10 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all text-white cursor-pointer font-medium"
                      />
                      <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button 
            onClick={handleCreate}
            disabled={!name || !startDate || (duration === 'multiple' && !endDate) || isNameExceeded || isDescExceeded}
            className="w-full py-4 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            {messages.createBtn}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CalendarTab(props: { events: Event[], onSelectEvent: (id: string) => void, key?: string }) {
  const { events, onSelectEvent } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'year' | 'list'>('month');
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const getEventsForDate = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const dateTimestamp = d.getTime();

    return events.filter(e => {
      const start = new Date(e.eventDate);
      start.setHours(0, 0, 0, 0);
      const startTimestamp = start.getTime();
      
      const end = e.endDate ? new Date(e.endDate) : start;
      end.setHours(0, 0, 0, 0);
      const endTimestamp = end.getTime();
      
      return dateTimestamp >= startTimestamp && dateTimestamp <= endTimestamp;
    });
  };

  const renderMonthView = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    const days: { day: number, current: boolean, date: Date }[] = [];
    
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthDays - i, current: false, date: new Date(year, month - 1, prevMonthDays - i) });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, current: true, date: new Date(year, month, i) });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, current: false, date: new Date(year, month + 1, i) });
    }

    return (
      <div className="bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-none">
        <div className="grid grid-cols-7 border-b border-slate-200 dark:border-white/5">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((d, i) => {
            const dayEvents = getEventsForDate(d.date);
            const isToday = new Date().toDateString() === d.date.toDateString();
            return (
              <div 
                key={i} 
                className={`min-h-[140px] p-2 border-r border-b border-slate-100 dark:border-white/5 relative group/cell ${!d.current ? 'bg-slate-50/50 dark:bg-white/[0.01]' : 'hover:bg-slate-50/50 dark:hover:bg-white/[0.02]'} transition-colors`}
              >
                <div className="flex justify-end p-1">
                  <span className={`text-sm font-bold ${isToday ? 'bg-primary text-white w-7 h-7 flex items-center justify-center rounded-full shadow-lg shadow-primary/20' : d.current ? 'text-slate-700 dark:text-slate-300' : 'text-slate-300 dark:text-slate-700'}`}>
                    {d.day}
                  </span>
                </div>
                <div className="space-y-1 mt-1">
                  {dayEvents.map(event => (
                    <CalendarEventItem key={event.id} event={event} onSelect={onSelectEvent} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {months.map((m, idx) => {
          const mName = m.toLocaleString('default', { month: 'long' });
          const mYear = m.getFullYear();
          const mMonth = m.getMonth();
          const daysInM = new Date(mYear, mMonth + 1, 0).getDate();
          const firstD = new Date(mYear, mMonth, 1).getDay();
          const mDays = Array.from({ length: daysInM }, (_, i) => i + 1);
          
          return (
            <div key={idx} className="bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-[2rem] p-6 shadow-sm">
              <h3 className="text-lg font-black text-indigo-950 dark:text-white mb-4 text-center">{mName}</h3>
              <div className="grid grid-cols-7 gap-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                  <div key={d} className="text-[8px] font-black text-slate-400 text-center uppercase mb-2">{d}</div>
                ))}
                {Array.from({ length: firstD }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {mDays.map(d => {
                  const dateObj = new Date(mYear, mMonth, d);
                  const hasEvents = getEventsForDate(dateObj).length > 0;
                  const isT = new Date().toDateString() === dateObj.toDateString();
                  return (
                    <div 
                      key={d} 
                      onClick={() => {
                        setCurrentDate(dateObj);
                        setView('month');
                      }}
                      className={`h-8 flex flex-col items-center justify-center rounded-lg text-[10px] font-bold cursor-pointer transition-all ${
                        isT ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110 z-10' : 
                        hasEvents ? 'bg-red-50 dark:bg-red-500/10 text-red-500 border border-red-200 dark:border-red-500/20' : 
                        'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      {d}
                      {hasEvents && !isT && <div className="w-1 h-1 bg-red-500 rounded-full mt-0.5" />}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const formatEventDate = (event: Event) => {
    const start = new Date(event.eventDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
    if (!event.endDate || event.endDate === event.eventDate) return start;
    const end = new Date(event.endDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
    return `${start} - ${end}`;
  };

  const renderListView = () => {
    const listEvents = [...events].sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
    return (
      <div className="space-y-4">
        {listEvents.map(event => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => onSelectEvent(event.id)}
            className="group flex items-center gap-6 p-6 bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-[2rem] hover:border-primary/50 transition-all cursor-pointer shadow-sm"
          >
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5 flex-shrink-0">
               {event.image ? (
                 <img src={event.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <CalendarIcon className="w-8 h-8" />
                 </div>
               )}
            </div>
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-3 mb-1">
                 <h3 className="text-lg font-black text-indigo-950 dark:text-white truncate">{event.title}</h3>
                 <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${event.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                    {event.status}
                 </span>
               </div>
               <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                     <CalendarIcon className="w-4 h-4 text-primary" />
                     {formatEventDate(event)}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                     <ScanFace className="w-4 h-4 text-secondary" />
                     {event.photoCount} Photos
                  </div>
               </div>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-black text-indigo-950 dark:text-white tracking-tighter capitalize min-w-[200px]">
            {view === 'year' ? year : `${monthName} ${year}`}
          </h1>
          <div className="flex items-center bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-xl p-1">
            <button 
              onClick={() => setCurrentDate(new Date(year, view === 'year' ? 0 : month - 1, view === 'year' ? currentDate.getMonth() : 1).setFullYear(view === 'year' ? year - 1 : year) && new Date(currentDate.setMonth(view === 'year' ? month : month - 1)))}
              onClickCapture={() => {
                const newD = new Date(currentDate);
                if (view === 'year') newD.setFullYear(year - 1);
                else newD.setMonth(month - 1);
                setCurrentDate(newD);
              }}
              className="p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-slate-400 hover:text-primary transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                const newD = new Date(currentDate);
                if (view === 'year') newD.setFullYear(year + 1);
                else newD.setMonth(month + 1);
                setCurrentDate(newD);
              }}
              className="p-2 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-slate-400 hover:text-primary transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-xl text-sm font-bold text-slate-600 dark:text-white hover:bg-slate-50 transition-all shadow-sm"
          >
            Today
          </button>
          <div className="flex items-center bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-xl p-1 shadow-sm">
             <button 
              onClick={() => setView('month')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'month' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
             >Month</button>
             <button 
              onClick={() => setView('year')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'year' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
             >Year</button>
             <button 
              onClick={() => setView('list')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'list' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
             >List</button>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={view + currentDate.getTime()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {view === 'month' ? renderMonthView() : view === 'year' ? renderYearView() : renderListView()}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function CalendarEventItem(props: { event: Event, onSelect: (id: string) => void, key?: string }) {
  const { event, onSelect } = props;
  return (
    <motion.div 
      whileHover={{ scale: 1.02, x: 2 }}
      onClick={() => onSelect(event.id)}
      className="group relative cursor-pointer"
    >
      <div className="px-2 py-1.5 bg-red-500/90 hover:bg-red-500 text-white text-[10px] font-bold rounded-lg truncate transition-colors shadow-md">
        {event.title}
      </div>
      
      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-4 bg-white dark:bg-[#1A1F2B] border border-slate-200 dark:border-white/10 rounded-[1.5rem] shadow-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all pointer-events-none z-50">
        <div className="space-y-3">
          {event.image ? (
            <img src={event.image} alt="" className="w-full h-24 object-cover rounded-xl shadow-inner" />
          ) : (
            <div className="w-full h-24 bg-slate-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-slate-300">
               <CalendarIcon className="w-8 h-8" />
            </div>
          )}
          <div className="space-y-1">
            <p className="font-bold text-xs text-indigo-950 dark:text-white leading-tight">{event.title}</p>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <CalendarIcon className="w-3 h-3 text-primary" />
              {(() => {
                const start = new Date(event.eventDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
                if (!event.endDate || event.endDate === event.eventDate) return start;
                const end = new Date(event.endDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
                return `${start} - ${end}`;
              })()}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <ScanFace className="w-3 h-3 text-secondary" />
              {event.photoCount} Photos
            </div>
          </div>
          <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
             <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${event.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                {event.status}
             </span>
             <span className="text-[8px] font-bold text-slate-400">Click to view detail</span>
          </div>
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-[#1A1F2B] border-r border-b border-slate-200 dark:border-white/10 rotate-45 -mt-1.5" />
      </div>
    </motion.div>
  );
}

function FooterColumn({ title, links, icons }: { title: string, links?: string[], icons?: {icon: ReactNode, name: string}[] }) {
  return (
    <div>
      <h5 className="text-xs font-black text-indigo-900 dark:text-white mb-6 uppercase tracking-widest">{title}</h5>
      <ul className="space-y-4">
        {links?.map(link => (
          <li key={link}>
            <a className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">{link}</a>
          </li>
        ))}
        {icons?.map(item => (
          <li key={item.name}>
            <a className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors" href="#">
              {item.icon} {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GuestPinEntry({ event, onAccessGranted, isDark }: { event: Event, onAccessGranted: () => void, isDark: boolean }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pin === event.shareSettings?.pin) {
      onAccessGranted();
    } else {
      setError(true);
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black">
      {/* Background with blurred cover image */}
      <div 
        className="absolute inset-0 opacity-40 blur-2xl scale-110"
        style={{ 
          backgroundImage: `url(${event.image || 'https://images.unsplash.com/photo-1519741497674-611481863552'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`relative w-full max-w-md p-10 rounded-[2.5rem] border backdrop-blur-3xl shadow-2xl space-y-8 flex flex-col items-center text-center ${isDark ? 'bg-black/60 border-white/10' : 'bg-white/90 border-slate-200'}`}
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group">
          <Lock className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
        </div>
        
        <div className="space-y-2">
          <h2 className={`text-2xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-indigo-950'}`}>Private Event</h2>
          <p className="text-slate-500 text-sm font-medium">{event.title}</p>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-4">Enter access pin to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <input 
            type="password"
            autoFocus
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className={`w-full bg-black/40 border-2 text-center text-3xl tracking-[0.5em] font-black py-4 rounded-2xl outline-none transition-all ${error ? 'border-red-500 animate-shake' : (isDark ? 'border-white/10 focus:border-primary text-white' : 'border-slate-200 focus:border-primary text-indigo-950')}`}
            placeholder="····"
            maxLength={4}
          />
          
          <button 
            type="submit"
            className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            Access Gallery
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function GuestView({ event, isDark, onClose }: { event: Event, isDark: boolean, onClose: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!event.shareSettings?.passwordEnabled);
  const scrollRef = useRef<HTMLDivElement>(null);

  const design = event.galleryDesign || {
    themeId: 'minimal-white',
    backgroundColor: isDark ? '#0D1117' : '#FDFBF9',
    textColor: isDark ? '#FFFFFF' : '#1A1B1E',
    accentColor: '#8B5CF6',
    fontStyle: 'serif',
    coverShape: 'oval'
  };

  const getCoverRadiusClass = () => {
    switch (design.coverShape) {
      case 'circle': return 'rounded-full shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]';
      case 'pill': return 'rounded-[5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]';
      case 'rect': return 'rounded-3xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]';
      default: return 'rounded-t-[50%] rounded-b-[40%] shadow-[20px_40px_100px_-10px_rgba(0,0,0,0.25)]';
    }
  };

  if (!isAuthenticated) {
    return <GuestPinEntry event={event} onAccessGranted={() => setIsAuthenticated(true)} isDark={isDark} />;
  }

  return (
    <div 
      className={`min-h-screen transition-colors duration-700 relative ${design.fontStyle === 'serif' ? 'font-serif' : 'font-sans'}`}
      style={{ backgroundColor: design.backgroundColor, color: design.textColor }}
    >
      {/* Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")' }} />
      
      {/* Navbar for guest */}
      <nav className="fixed top-0 w-full z-50 p-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <span className="text-xs italic opacity-60">Gallery by fuad</span>
        </div>
        <div className="pointer-events-auto">
          <button 
            onClick={onClose}
            className="p-2 rounded-full backdrop-blur-md border border-black/10 bg-black/5 hover:bg-black/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Hero Landing Section */}
      <header className="w-full min-h-[100vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden max-w-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg aspect-[4/5] md:aspect-square mb-16 flex items-center justify-center"
        >
          {/* Subtle glow background */}
          <div 
            className="absolute inset-0 blur-[100px] opacity-20 scale-150" 
            style={{ backgroundColor: design.accentColor }} 
          />
          
          <div className="relative w-full h-full p-8 md:p-12">
             <div className={`w-full h-full overflow-hidden border-4 border-white/20 transition-all duration-1000 ${getCoverRadiusClass()}`}>
               <img 
                 src={event.image || 'https://images.unsplash.com/photo-1519741497674-611481863552'} 
                 alt={event.title} 
                 className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-110"
               />
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="space-y-6 relative z-10"
        >
          <div className="space-y-1">
             <h1 className="text-5xl md:text-8xl tracking-tighter uppercase font-black" style={{ color: design.textColor }}>
               {event.title}
             </h1>
             <div className="w-24 h-1 mx-auto" style={{ backgroundColor: design.accentColor, opacity: 0.6 }} />
          </div>
          <p className="opacity-60 text-lg md:text-2xl italic">
            {new Date(event.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </header>

      {/* Gallery Section */}
      <main className="w-full max-w-none pb-32">
        {event.shareSettings?.accessType === 'full' ? (
          <GuestGalleryView event={event} isDark={isDark} />
        ) : (
          <GuestFaceSearchView event={event} isDark={isDark} />
        )}
      </main>
    </div>
  );
}

function GuestGalleryView({ event, isDark, photos: initialPhotos }: { event: Event, isDark: boolean, photos?: Photo[] }) {
  const design = event.galleryDesign;
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos || []);
  const [isLoading, setIsLoading] = useState(!initialPhotos);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [colCount, setColCount] = useState(5);

  useEffect(() => {
    if (!initialPhotos) {
      fetch(`/api/events/${event.id}/photos`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            const dbPhotos = data.photos || [];
            const mocks = MOCK_PHOTOS.filter(p => p.eventId === event.id);
            setPhotos([...dbPhotos, ...mocks.filter(m => !dbPhotos.some((p: any) => p.id === m.id))]);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [event.id, initialPhotos]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <RotateCw className="w-8 h-8 text-primary animate-spin" />
        <p className="text-xs font-black uppercase tracking-widest opacity-40">Loading Gallery...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 max-w-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-slate-200 dark:border-white/5 pt-12 px-4 md:px-8 gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl uppercase font-black" style={{ color: design?.textColor }}>The Gallery</h2>
          <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Showing {photos.length} moments</p>
        </div>

        {/* Dynamic Column Control */}
        <div className="flex items-center gap-1 p-1 rounded-2xl border bg-black/5 dark:bg-white/5 self-center md:self-auto" style={{ borderColor: `${design?.accentColor}20` }}>
          <button 
            onClick={() => setColCount(3)}
            title="Wide View"
            className={`px-4 py-2 rounded-xl transition-all ${colCount === 3 ? 'bg-white dark:bg-white/10 shadow-sm' : 'opacity-40 hover:opacity-100'}`}
            style={{ color: design?.textColor }}
          >
            <Columns className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setColCount(5)}
            title="Standard View"
            className={`px-4 py-2 rounded-xl transition-all ${colCount === 5 ? 'bg-white dark:bg-white/10 shadow-sm' : 'opacity-40 hover:opacity-100'}`}
            style={{ color: design?.textColor }}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setColCount(8)}
            title="Compact View"
            className={`px-4 py-2 rounded-xl transition-all ${colCount === 8 ? 'bg-white dark:bg-white/10 shadow-sm' : 'opacity-40 hover:opacity-100'}`}
            style={{ color: design?.textColor }}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2">
          <button 
            className="p-3 rounded-xl border transition-all hover:scale-110 active:scale-95"
            style={{ backgroundColor: `${design?.accentColor}15`, borderColor: `${design?.accentColor}30`, color: design?.textColor }}
          >
            <Download className="w-5 h-5" />
          </button>
          <button 
            className="p-3 rounded-xl border transition-all hover:scale-110 active:scale-95"
            style={{ backgroundColor: `${design?.accentColor}15`, borderColor: `${design?.accentColor}30`, color: design?.textColor }}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="w-full px-0 max-w-none">
        <div className={`${colCount === 3 ? 'columns-1 md:columns-3' : colCount === 5 ? 'columns-2 lg:columns-5' : 'columns-3 md:columns-5 lg:columns-6 xl:columns-8'} gap-1 md:gap-2 w-full`}>
          {photos.map((photo, index) => (
            <div key={photo.id} className="break-inside-avoid mb-1 md:mb-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setPreviewIndex(index)}
              className="group relative cursor-pointer"
            >
               <div className={`overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-700 ${colCount === 8 ? 'rounded-lg md:rounded-3xl' : 'rounded-2xl md:rounded-3xl'}`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all z-10" />
                  <img 
                    src={photo.variants?.thumbnail || photo.url} 
                    alt={photo.filename}
                    className="w-full h-auto block transition-transform duration-1000 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Micro interaction - Expand icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-12 h-12 rounded-full backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center text-white">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
               </div>
            </motion.div>
          </div>
        ))}
        </div>
      </div>

      <AnimatePresence>
        {previewIndex !== null && (
          <PhotoPreview 
            photos={photos}
            currentIndex={previewIndex}
            onClose={() => setPreviewIndex(null)}
            onIndexChange={setPreviewIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function GuestFaceSearchView({ event, isDark }: { event: Event, isDark: boolean }) {
  const design = event.galleryDesign;
  return (
    <div className="space-y-12 py-12">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <h2 className="text-4xl uppercase font-black" style={{ color: design?.textColor }}>Find Your Special Moments</h2>
        <p className="opacity-60 italic text-lg leading-relaxed">
          Upload a photo of yourself and our AI will find every image from the event that features your smile.
        </p>
      </div>

      <div 
        className="max-w-2xl mx-auto aspect-square md:aspect-video rounded-[3rem] border-2 border-dashed flex flex-col items-center justify-center p-12 transition-all group shadow-2xl"
        style={{ backgroundColor: `${design?.accentColor}05`, borderColor: `${design?.accentColor}20` }}
      >
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
            <ScanFace className="w-12 h-12" />
          </div>
          <div className="absolute -top-2 -right-2 bg-secondary text-white p-2 rounded-full shadow-lg">
             <Camera className="w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-4">
          <button className="flex-1 py-5 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest">
            <Camera className="w-5 h-5" />
            Take a Selfie
          </button>
          <button 
            className="flex-1 py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all text-sm uppercase tracking-widest shadow-xl"
            style={{ backgroundColor: `${design?.accentColor}10`, color: design?.textColor }}
          >
            <CloudUpload className="w-5 h-5" />
            Upload Profile
          </button>
        </div>
        
        <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] opacity-40">Privacy First: Your photo is only used for searching</p>
      </div>

      {/* Features highlights for guest */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
        <GuestFeature icon={<ShieldCheck className="w-5 h-5" />} title="Private Access" desc="Only you see your matched photos" isDark={isDark} />
        <GuestFeature icon={<ImageIcon className="w-5 h-5" />} title="High Quality" desc="Download uncompressed originals" isDark={isDark} />
        <GuestFeature icon={<BarChart3 className="w-5 h-5" />} title="Instant Results" desc="Find photos across thousands in seconds" isDark={isDark} />
      </div>
    </div>
  );
}

function GuestFeature({ icon, title, desc, isDark }: { icon: ReactNode, title: string, desc: string, isDark: boolean }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <div>
        <h4 className={`text-sm font-black uppercase tracking-widest mb-1 ${isDark ? 'text-white' : 'text-indigo-950'}`}>{title}</h4>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
