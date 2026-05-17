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
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  Pointer, 
  Globe, 
  Moon, 
  Sun,
  Settings,
  Twitter, 
  ArrowUp,
  ArrowRight,
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
import { translations, Language, Translation } from './translations';
import { createContext, useContext } from 'react';

const LanguageContext = createContext<{
  t: Translation;
  setLanguage: (lang: Language) => void;
  language: Language;
} | null>(null);

function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useI18n must be used within LanguageProvider');
  return context;
}

type Page = 'home' | 'pricing' | 'get-started' | 'sign-in' | 'dashboard' | 'event-detail';
type DashboardTab = 'events' | 'calendar' | 'about' | 'profile' | 'contact';
type SortField = 'name' | 'eventDate' | 'createdAt' | 'photoCount' | 'storageSize';

const AZ_MONTHS_SHORT = ['Yan.', 'Fev.', 'Mar.', 'Apr.', 'May', 'İyun', 'İyul', 'Avq.', 'Sen.', 'Okt.', 'Noy.', 'Dek.'];
const AZ_MONTHS_LONG = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

const formatEventDate = (date: string | Date, language: Language, isLong: boolean = false) => {
  const d = new Date(date);
  // Basic sanity check to prevent NaN if date is invalid
  if (isNaN(d.getTime())) return String(date);

  if (language === 'az') {
    const day = d.getDate();
    const month = isLong ? AZ_MONTHS_LONG[d.getMonth()] : AZ_MONTHS_SHORT[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  }
  
  const locale = language === 'tr' ? 'tr-TR' : language === 'ru' ? 'ru-RU' : 'en-US';
  return d.toLocaleDateString(locale, { 
    day: 'numeric', 
    month: isLong ? 'long' : 'short', 
    year: 'numeric' 
  });
};

interface UserProfile {
  name: string;
  surname: string;
  photo?: string;
  email: string;
  emailVisible: boolean;
  phone?: string;
  phoneVisible: boolean;
  socials: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    pinterest?: string;
    other?: string;
  };
  socialsVisible: boolean;
  authProvider: 'google' | 'email';
}

interface Photo {
  id: string;
  url: string;
  filename: string;
  isHidden: boolean;
  eventId?: string;
  size?: string;
  resolution?: string;
  createdAt?: string;
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
      passwordEnabled: false,
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


export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

const languageOptions: { code: Language; label: string; flag: string }[] = [
  { code: 'az', label: 'AZ', flag: '🇦🇿' },
  { code: 'tr', label: 'TR', flag: '🇹🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'ru', label: 'RU', flag: '🇷🇺' },
];

function LanguageSwitcher({ current, onChange, isDark }: { current: Language; onChange: (lang: Language) => void; isDark: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selected = languageOptions.find(opt => opt.code === current) || languageOptions[2];

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-xs font-black tracking-widest uppercase ${
          isDark 
            ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' 
            : 'bg-white border-slate-200 text-brand-dark hover:bg-slate-50 shadow-sm'
        }`}
      >
        <span>{selected.flag}</span>
        <span>{selected.label}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`absolute top-full mt-2 right-0 w-32 rounded-xl border p-1 z-[60] shadow-2xl backdrop-blur-md ${
              isDark 
                ? 'bg-[#12161F]/90 border-white/10' 
                : 'bg-white/90 border-slate-200'
            }`}
          >
            {languageOptions.map((opt) => (
              <button
                key={opt.code}
                onClick={() => {
                  onChange(opt.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  current === opt.code 
                    ? 'bg-primary text-white' 
                    : `text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5`
                }`}
              >
                <span>{opt.flag}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const browserLang = typeof navigator !== 'undefined' ? navigator.language.split('-')[0] as any : 'en';
    const supported: Language[] = ['en', 'az', 'tr', 'ru'];
    return supported.includes(browserLang) ? browserLang : 'en';
  });
  
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

function MainApp() {
  const { t, language, setLanguage } = useI18n();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('events');

  const HERO_FEATURES = [
    {
      icon: <ScanFace className="w-6 h-6" />,
      title: "AI-Powered Face Detection",
      desc: "Fast client access, no manually tagging hundreds."
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Secure & Scalable Galleries",
      desc: "Unlimited uploads, easy organization."
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Instant, Effortless Sharing",
      desc: "Generated dynamic links with one click."
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Delight Clients, Grow Business",
      desc: "Provide a superior, hassle-free delivery experience."
    }
  ];

  const WHY_CHOOSE_FEATURES = [
    {
      icon: <ScanFace className="w-5 h-5 text-white" />,
      title: t.aiFaceSearch,
      desc: t.aiFaceSearchWhyDesc
    },
    {
      icon: <QrCode className="w-5 h-5 text-white" />,
      title: t.qrSharingTitle,
      desc: t.qrSharingDesc
    },
    {
      icon: <Clock className="w-5 h-5 text-white" />,
      title: t.autoExpiringTitle,
      desc: t.autoExpiringDesc
    },
    {
      icon: <Filter className="w-5 h-5 text-white" />,
      title: t.smartBrowsingTitle,
      desc: t.smartBrowsingDesc
    },
    {
      icon: <Users className="w-5 h-5 text-white" />,
      title: t.collaborativeEventsTitle,
      desc: t.collaborativeEventsDesc
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      title: t.privacySafeTitle,
      desc: t.privacySafeDesc
    }
  ];

  const CATEGORIES = [
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRlBZvjUmrzrZ2bX5hdT9S1p0HbeV0O0z6gzA-fDeIfTv1dnK_gnrWyLm5Jczy8ruS_bD0yRmlZbtjIU847jSoLW_h0PvDyS11IbwJZSiMQlMtFFsjFoyeEJxjczBt-SHlYaK21ClxOxKtyYquSZplr7c2PyUaKpahu8s5EaPeWfvYsvlZ9X8fuvwZWk9J8kCDed6OPF6snZP4MKKzNmC0n-YeGdx90IfOW00nuu6qhE7a5m-reQpG9lGjaucaJ1UUo9IbNBW-pA",
      title: t.categoryWeddings,
      desc: t.categoryWeddingsDesc
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs95T99NoKC75-0iur17KMtA8jyXgeT3PW6FMbh0XrtD08FcQZz_-SaZWFrBOS0fcIK3Wc7zuP_HvMpij9mfK-rrE7kTpIbnW1U4Xkc3WXeFoKaQaB7VumEp5XQhI9108lahcODx8Xr46Eun9TTycoYKPsrTBpKQZA1TfY5aGsqJbObFREagV5yi-A2J5YiZoOEmuddYqNv0oT8oITTDGfpVatqUWOqr86NtmWsOkJ7QSPcBMvQ7KevnZVSDxzVYy50H3J7l7nAQ",
      title: t.categoryCorporate,
      desc: t.categoryCorporateDesc
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpPCLbT-3_ygh1pX_Cjj43YxIef7ebC3i7IPx1gklSUKBeGxtJl0BHLrz1beMcSBheBLMtkuA_KdpXJC0Xna_5edEJuV1liFs8IuybIIYcVwDSyvG283xTt1X2xnCXPuuCiJsOdB2PYqeET1V0FHbWpXn9-j8kADe6KymOdTU_DiKHOa7ZcBH4JNEE_Fqn5jRWekecBiWVieMj0HJqCCKQ1GOwXgqTpCg5qldkPIm_OZlJl7fPK2adnaXf1Ay8zzlm6xRPGVIaDA",
      title: t.categorySports,
      desc: t.categorySportsDesc
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk7jjunPzrtmLEh3hQXhv2KShpFd7SRPva7z4eyG8-ytZL7RjyYISNfFRGu0UNjLCn1ad1f7wc-MilaLTeqj7DjixVvmHK95dzJ4XtClNDxUDorl1Ak0jOtKh_-uc-gwpEvNVGkuq_dh3euVU_WbqOoLy19tTcQhXsXhuMkj_hCslUTlDmuAKnTDh_BbNnHp0p-b_f6tp-ybaUUrNc0ZkwKtCuPMHFDPrVkvFDltPvjYrqZiU_2amto62kE1uliR7CwEoPssyzcQ",
      title: t.categoryNightlife,
      desc: t.categoryNightlifeDesc
    }
  ];

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Ibrahim',
    surname: 'Fataliyev',
    email: 'ibrahimov9910@gmail.com',
    emailVisible: true,
    phone: '+994 50 123 45 67',
    phoneVisible: true,
    socials: {
      instagram: 'ibrahim_ph',
      facebook: 'ibrahim.fataliyev',
      linkedin: 'ibrahimf',
    },
    socialsVisible: true,
    authProvider: 'google', // Defaulting to google for this mock
  });
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
          userProfile={userProfile}
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
            userProfile={userProfile}
            setUserProfile={setUserProfile}
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
            <div className="text-2xl font-black tracking-tighter text-brand-dark dark:text-white">Memorpho</div>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-x-8">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`text-sm font-semibold transition-all ${currentPage === 'home' ? 'text-primary border-b-2 border-primary pb-1' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}
            >
              {t.home}
            </button>
            <button 
              onClick={() => setCurrentPage('pricing')}
              className={`text-sm font-semibold transition-all ${currentPage === 'pricing' ? 'text-primary border-b-2 border-primary pb-1' : 'text-slate-600 dark:text-slate-400 hover:text-primary'}`}
            >
              {t.pricing}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher current={language} onChange={setLanguage} isDark={isDark} />
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
                    <Moon className="w-5 h-5 text-primary" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
            <button 
              onClick={() => setCurrentPage('sign-in')}
              className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-all whitespace-nowrap"
            >
              {t.signIn}
            </button>
            <button 
              onClick={() => setCurrentPage('get-started')}
              className="vibrant-gradient text-white px-6 py-2 rounded-lg text-sm font-bold transition-all transform hover:scale-105 active:scale-95"
            >
              {t.getStarted}
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
            <section className="relative h-screen flex flex-col justify-center bg-[#F9F6F1] dark:bg-[#0B0E14] px-6 overflow-hidden">
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-0 -mt-24 mb-8">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col gap-6 z-10"
                >
                  <div className="space-y-3">
                    <h1 className="text-[52px] lg:text-[60px] font-serif font-black text-[#1C1C1C] dark:text-white leading-[1.05] tracking-tight">
                      Upload. Deliver.<br/>
                      <span className="text-[#1C1C1C] dark:text-white">Shared in Seconds.</span>
                    </h1>
                    <p className="text-[#4A4A4A] dark:text-slate-400 max-w-xl text-sm font-medium leading-relaxed">
                      Your complete AI-powered gallery. The absolute fastest way to get event photos to your clients. Perfect for photographers, zero friction for guests.
                    </p>
                  </div>
                </motion.div>

                {/* Laptop Mockup Visual */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Laptop Mockup Wrapper */}
                  <div className="relative z-10 w-full max-w-[580px] ml-auto">
                    {/* Screen Content - Standing alone without the frame */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white shadow-2xl border border-[#C19A5B]/10 dark:border-white/10 shadow-[#C19A5B]/10">
                      <img 
                        src="/src/assets/images/regenerated_image_1778956970237.png" 
                        alt="Memorpho Gallery Interface"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/[0.02]" />
                    </div>

                    {/* Overlays removed per user request */}
                  </div>
                </motion.div>
              </div>

              {/* Feature Cards Grid */}
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 z-10 -mt-4">
                {HERO_FEATURES.map((feature, i) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                    className="bg-white dark:bg-white/5 border border-[#C19A5B]/10 dark:border-white/5 p-5 rounded-[1.5rem] transition-all hover:translate-y-[-4px] hover:shadow-xl group"
                  >
                    <div className="w-10 h-10 bg-[#F9F6F1] dark:bg-white/10 rounded-xl flex items-center justify-center mb-3 text-[#C19A5B] group-hover:bg-[#C19A5B] group-hover:text-white transition-all duration-300">
                      <div className="scale-75">{feature.icon}</div>
                    </div>
                    <h3 className="text-base font-bold text-[#1C1C1C] dark:text-white mb-1 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[12px] font-medium leading-snug">
                      {feature.desc}
                    </p>
                  </motion.div>
                ))}
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
                  <h2 className="text-4xl md:text-5xl font-serif font-black text-brand-dark dark:text-white mb-4 tracking-tight">
                    {t.howItWorks.split(' ')[0]} <span className="text-primary italic">{t.howItWorks.split(' ').slice(1).join(' ')}</span>
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">{t.howItWorksSub}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                  <div className="hidden md:block absolute top-[160px] left-[15%] right-[15%] h-[2px] bg-primary/5 -z-10">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 2, ease: "easeInOut", delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-primary via-primary/50 to-secondary"
                    />
                  </div>

                  <Step 
                    number="01" 
                    title={t.step1Title} 
                    desc={t.step1Desc} 
                    illustration={<EventFormIllustration />}
                    direction="left"
                  />
                  <Step 
                    number="02" 
                    title={t.step2Title} 
                    desc={t.step2Desc} 
                    illustration={<UploadIllustration />}
                    direction="up"
                  />
                  <Step 
                    number="03" 
                    title={t.step3Title} 
                    desc={t.step3Desc} 
                    illustration={<DiscoveryIllustration />}
                    direction="right"
                  />
                </div>
              </div>
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full" />
            </section>

            {/* Why Choose Section */}
            <section className="py-24 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <h2 className="text-4xl font-serif font-bold text-brand-dark dark:text-white mb-4 tracking-tight">{t.whyChoose.split(' ')[0]} {t.whyChoose.split(' ')[1]} <span className="text-primary italic">{t.whyChoose.split(' ')[2] || ''}</span></h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium">{t.whyChooseSub}</p>
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
            <div className="text-2xl font-black text-brand-dark dark:text-white tracking-tighter">Memorpho</div>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="text-sm text-slate-400">{t.copyright}</div>
          </div>
          
          <FooterColumn title={t.legal} links={[t.privacy, t.terms]} />
          <FooterColumn title={t.supportTitle} links={[t.globalSupport, t.documentation]} />
          <FooterColumn title={t.connect} icons={[
            { icon: <Twitter className="w-4 h-4" />, name: "Twitter" },
            { icon: <Linkedin className="w-4 h-4" />, name: "LinkedIn" }
          ]} />
        </div>
      </footer>
    </div>
  );
}

function GetStartedPage({ onSwitchToLogin, onLogin }: { onSwitchToLogin: () => void, onLogin: () => void, key?: string | number }) {
  const { t } = useI18n();
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
            <h1 className="text-4xl font-serif font-black text-brand-dark dark:text-white tracking-tighter mb-2">{t.createFreeAccount.split(' ').slice(0, 2).join(' ')} <span className="text-primary italic">{t.createFreeAccount.split(' ').slice(2).join(' ')}</span></h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">{t.alreadyHaveAccount} <button onClick={onSwitchToLogin} className="text-primary hover:underline font-bold">{t.login}</button></p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl font-bold text-brand-dark dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {t.signUpGoogle}
            </button>
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:opacity-90 transition-all shadow-sm group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2.0-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z" />
              </svg>
              {t.signUpApple}
            </button>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background dark:bg-[#0B0E14] px-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t.orUseEmail}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-xs font-black text-brand-dark dark:text-white uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">{t.emailAddress}</label>
              <input 
                type="email" 
                placeholder="you@email.com"
                onFocus={() => setShowExtraFields(true)}
                className="w-full px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-brand-dark dark:text-white font-medium"
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
                    <label className="text-xs font-black text-indigo-950 dark:text-white uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">{t.fullName}</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-indigo-950 dark:text-white font-medium"
                    />
                  </div>
                  <div className="space-y-2 group">
                    <label className="text-xs font-black text-indigo-950 dark:text-white uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">{t.password}</label>
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
              {showExtraFields ? t.createAccountLabel : t.continueWithEmail}
            </button>
          </div>

          <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed text-center">
            By creating an account, you agree to Memorpho's <button className="text-slate-600 dark:text-slate-300 hover:underline">Terms of Service</button> and have read and understood the <button className="text-slate-600 dark:text-slate-300 hover:underline">Privacy Policy</button>.
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
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />
            
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
  const { t } = useI18n();
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
            <h1 className="text-4xl font-serif font-black text-brand-dark dark:text-white tracking-tighter mb-2">
              {t.welcomeBack.split(' ')[0]} <span className="text-primary italic">{t.welcomeBack.split(' ')[1] || ''}</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">{t.newToMemorpho} <button onClick={onSwitchToRegister} className="text-primary hover:underline font-bold">{t.createAccount}</button></p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl font-bold text-brand-dark dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {t.logInGoogle}
            </button>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background dark:bg-[#0B0E14] px-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t.orEnterDetails}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-xs font-black text-brand-dark dark:text-white uppercase tracking-widest ml-1 group-focus-within:text-primary transition-colors">{t.email}</label>
              <input 
                type="email" 
                placeholder="you@email.com"
                className="w-full px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-brand-dark dark:text-white font-medium"
              />
            </div>
            <div className="space-y-2 group">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black text-brand-dark dark:text-white uppercase tracking-widest group-focus-within:text-primary transition-colors">{t.password}</label>
                <button className="text-[10px] font-bold text-primary hover:underline">{t.forgot}</button>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-6 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 text-brand-dark dark:text-white font-medium"
              />
            </div>
            <button 
              onClick={onLogin}
              className="w-full py-4 vibrant-gradient text-white rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20"
            >
              {t.signIn}
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
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}

function Dashboard({ activeTab, setActiveTab, onLogout, isDark, setIsDark, onSelectEvent, events, onCreateEvent, onUpdateEvent, onDeleteEvent, userProfile, setUserProfile }: { 
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
  userProfile: UserProfile,
  setUserProfile: (profile: UserProfile) => void,
  key?: string | number
}) {
  const { t, language, setLanguage } = useI18n();
  return (
    <div className="flex bg-background dark:bg-[#0B0E14] min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#12161F] border-r border-brand-dark/5 dark:border-white/5 flex flex-col fixed inset-y-0 z-50">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div 
              onClick={() => setActiveTab('events')}
              className="text-2xl font-black tracking-tighter text-brand-dark dark:text-white cursor-pointer hover:opacity-80 transition-opacity"
            >
              Memorpho
            </div>
            <LanguageSwitcher current={language} onChange={setLanguage} isDark={isDark} />
          </div>
          
          <nav className="space-y-1">
            <SidebarLink 
              icon={<LayoutGrid className="w-4 h-4" />} 
              label={t.events} 
              active={activeTab === 'events'} 
              onClick={() => setActiveTab('events')} 
            />
            <SidebarLink 
              icon={<CalendarIcon className="w-4 h-4" />} 
              label={t.calendar} 
              active={activeTab === 'calendar'} 
              onClick={() => setActiveTab('calendar')} 
            />
            <SidebarLink 
              icon={<Info className="w-4 h-4" />} 
              label={t.about} 
              active={activeTab === 'about'} 
              onClick={() => setActiveTab('about')} 
            />
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-1">
          <SidebarLink 
            icon={<MessageSquare className="w-4 h-4" />} 
            label={t.contact} 
            active={activeTab === 'contact'} 
            onClick={() => setActiveTab('contact')} 
          />
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            {t.signOut}
          </button>
        </div>

        <div className="p-6 border-t border-slate-200 dark:border-white/5">
          <div 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-all hover:bg-slate-50 dark:hover:bg-white/5 ${activeTab === 'profile' ? 'bg-slate-50 dark:bg-white/5 ring-1 ring-primary/20' : ''}`}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl uppercase overflow-hidden">
              {userProfile.photo ? (
                <img src={userProfile.photo} alt={userProfile.name} className="w-full h-full object-cover" />
              ) : (
                userProfile.name[0]
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-brand-dark dark:text-white truncate">{userProfile.name} {userProfile.surname}</p>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest">{t.freePlan}</p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsDark(!isDark);
              }} 
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-all"
            >
              {isDark ? <Sun className="w-4 h-4 text-white" /> : <Moon className="w-4 h-4 text-muted" />}
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
          ) : activeTab === 'profile' ? (
            <ProfileTab 
              profile={userProfile}
              onUpdate={setUserProfile}
              isDark={isDark}
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
                {activeTab === 'about' && <Info className="w-10 h-10" />}
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
  const { t } = useI18n();
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
              {t.editEvent}
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
              {t.deleteEvent}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DeleteConfirmationModal({ event, onClose, onConfirm, isDark }: { event: Event, onClose: () => void, onConfirm: () => void, isDark: boolean }) {
  const { t } = useI18n();
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
          <h2 className={`text-2xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-indigo-950'}`}>{t.deleteEvent}?</h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            {t.confirmDelete} <span className="font-bold text-red-500">"{event.title}"</span>? {t.undoNote}
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
            {countdown > 0 ? `${t.wait} ${countdown}s` : t.deletePermanently}
          </button>
          <button 
            onClick={onClose}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            {t.cancel}
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
  const { t, language } = useI18n();
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
          <h1 className="text-3xl font-black text-brand-dark dark:text-white tracking-tighter">{t.myEvents}</h1>
          <p className="text-sm text-slate-500 font-medium">
            {language === 'az' ? `${t.totalEvents}: ${filteredEvents.length}` : `${filteredEvents.length} ${t.totalEvents}`}
          </p>
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
              placeholder={t.searchEvents} 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 pr-4 py-3 bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary outline-none transition-all w-64 dark:text-white"
            />
          </div>

          <div className="relative group">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              className="appearance-none pl-4 pr-10 py-3 bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-xl text-sm font-bold text-slate-700 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all cursor-pointer min-w-[120px]"
            >
              <option value="createdAt" className="bg-white dark:bg-[#12161F]">{t.dateCreated}</option>
              <option value="name" className="bg-white dark:bg-[#12161F]">{t.name || 'Ad'}</option>
              <option value="eventDate" className="bg-white dark:bg-[#12161F]">{t.eventDate}</option>
              <option value="photoCount" className="bg-white dark:bg-[#12161F]">{t.photoCount}</option>
              <option value="storageSize" className="bg-white dark:bg-[#12161F]">{t.storageSize}</option>
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
            {t.createNewEvent}
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
                      {event.status === 'Published' ? t.published : t.draft}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs font-bold mb-1">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {(() => {
                        const start = formatEventDate(event.eventDate, language, false);
                        if (!event.endDate || event.endDate === event.eventDate) return start;
                        const end = formatEventDate(event.endDate, language, false);
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
                        <span className="text-[10px] font-black uppercase opacity-60">{t.photos}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <Folder className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm font-bold">{event.folderCount}</span>
                        <span className="text-[10px] font-black uppercase opacity-60">{t.totalFolders}</span>
                      </div>
                    </div>
                    <EventActionsDropdown 
                      onEdit={() => setEditingEvent(event)}
                      onDelete={() => setDeletingEvent(event)}
                      isDark={isDark}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>{t.storageUsed}</span>
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
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">{t.event}</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-3.5 h-3.5" />
                        {t.photos}
                      </div>
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div className="flex items-center gap-2">
                        <Search className="w-3.5 h-3.5" />
                        {t.faceSearches}
                      </div>
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5" />
                        {t.registrations}
                      </div>
                    </th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">{t.status}</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">{t.fromDate}</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">{t.toDate}</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">{t.actions}</th>
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
                          <p className="text-[10px] font-mono text-slate-400">{t.eventIdLabel} • {event.id}</p>
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
                          {event.status === 'Published' ? t.published : t.draft}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-500 dark:text-slate-400 text-center">
                        {formatEventDate(event.eventDate, language, false)}
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-slate-500 dark:text-slate-400 text-center">
                        {event.endDate && event.endDate !== event.eventDate ? formatEventDate(event.endDate, language, false) : '-'}
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
    createdAt: '2024-05-15T10:00:00Z',
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
    createdAt: '2024-05-15T11:00:00Z',
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
    createdAt: '2024-05-15T12:00:00Z',
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
    eventId: 'test-1',
    createdAt: '2024-05-15T13:00:00Z'
  },
  {
    id: 't1-5',
    url: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop',
    filename: 'REAL_PHOTO_005.jpg',
    isHidden: false,
    eventId: 'test-1',
    createdAt: '2024-05-15T14:00:00Z'
  },
  // Generated photos for other events
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `photo-${i + 1}`,
    url: `https://images.unsplash.com/photo-${1519741490000 + i}?q=80&w=600&auto=format&fit=crop`,
    filename: `EP6A${7279 + i}.jpg`,
    isHidden: false,
    eventId: '1',
    createdAt: new Date(2024, 4, 1, 10 + i).toISOString()
  }))
];

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, isDark }: { isOpen: boolean, title: string, message: string, onConfirm: () => void, onCancel: () => void, isDark: boolean }) {
  const { t } = useI18n();
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
            {t.cancel}
          </button>
          <button onClick={onConfirm} className="flex-1 py-4 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
            {t.confirm}
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
  const { t } = useI18n();
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
  const [photoSort, setPhotoSort] = useState<'newest' | 'oldest'>('newest');
  const [isFoldersOpen, setIsFoldersOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<'general' | 'share' | 'design'>('general');
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

    let result = base;
    if (filter === 'visible') result = base.filter(p => !p.isHidden);
    else if (filter === 'hidden') result = base.filter(p => p.isHidden);

    // Sort the result
    return [...result].sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      
      if (timeA === timeB) {
        // Fallback to name/id sorting if timestamps are same or missing
        return photoSort === 'newest' ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id);
      }
      return photoSort === 'newest' ? timeB - timeA : timeA - timeB;
    });
  }, [photos, filter, eventId, photoSort]);

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
      setToast({ message: t.successOriented.replace('{count}', processedCount.toString()), type: 'success' });
    } else {
      setToast({ message: t.noPhotosNeedRotate, type: 'info' });
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
        title={t.smartAutoRotate}
        message={selectedPhotoIds.size > 0 
          ? t.confirmAutoRotateSelected.replace('{count}', selectedPhotoIds.size.toString())
          : t.confirmAutoRotateAll
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
            initialTab={settingsTab}
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
              placeholder={t.searchFile} 
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
            onClick={() => {
              setSettingsTab('general');
              setIsSettingsOpen(true);
            }}
            className={`p-2 rounded-lg transition-all ${isDark ? 'text-slate-400 hover:text-primary hover:bg-white/5' : 'text-slate-400 hover:text-primary hover:bg-slate-100'}`}
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              setSettingsTab('share');
              setIsSettingsOpen(true);
            }}
            className="p-2 hover:bg-white/5 rounded-lg transition-all text-slate-400 hover:text-primary"
          >
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
            {t.publish}
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
                    <span className="text-[10px] font-black uppercase tracking-widest text-center px-4">{t.setCoverImage}</span>
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
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.photos}</p>
              </div>
              <div className="text-center">
                <p className={`text-xl font-black ${isDark ? 'text-white' : 'text-indigo-950'}`}>{event.folderCount}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{t.totalFolders}</p>
              </div>
            </div>

            <button className={`w-full py-3 border rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${isDark ? 'border-white/10 hover:bg-white/5 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}>
              <Plus className="w-4 h-4" />
              {t.addFolder}
            </button>

            {/* Folders List */}
            <div className="space-y-4">
              <button 
                onClick={() => setIsFoldersOpen(!isFoldersOpen)}
                className={`w-full flex items-center justify-between group px-1 ${isDark ? '' : 'hover:bg-slate-100 rounded-lg py-1'}`}
              >
                <div className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-indigo-950'}`}>
                  <Folder className="w-4 h-4" />
                  {t.totalFolders}
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
                        <span className="text-sm font-black">{t.highlights}</span>
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
                    {f === 'all' ? t.showingAll : t[f]}
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
                    : t.smartAutoRotate}
                </button>
                <div className="relative group">
                  <select 
                    value={photoSort}
                    onChange={(e) => setPhotoSort(e.target.value as 'newest' | 'oldest')}
                    className={`appearance-none pl-4 pr-10 py-2 border rounded-lg text-sm font-bold focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer ${isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}
                  >
                    <option value="oldest">{t.oldestFirst}</option>
                    <option value="newest">{t.newestFirst}</option>
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
                          <p className={`text-2xl font-black ${isDark ? 'text-white' : 'text-indigo-950'}`}>{t.dragAndDrop}</p>
                        </div>
                     </div>
                  </div>
                </div>
                <button className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 hover:scale-105 transition-all">
                  <CloudUpload className="w-6 h-6" />
                  {t.uploadImages}
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
  const { t } = useI18n();
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
        <PhotoActionButton icon={photo.isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />} label={photo.isHidden ? t.unhide : t.hide} onClick={photo.isHidden ? onUnhide : onHide} />
        <PhotoActionButton icon={<Trash2 className="w-4 h-4" />} label={t.delete} onClick={onDelete} />
        <PhotoActionButton icon={<Download className="w-4 h-4" />} label={t.download} onClick={() => {}} />
        
        <div className="relative">
          <PhotoActionButton 
            icon={<MoreHorizontal className="w-4 h-4" />} 
            label={t.moreOptions} 
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
                <DropdownButton icon={<ImagePlus className="w-4 h-4" />} label={t.setCover} onClick={() => { onSetCover(); setShowOptions(false); }} isDark={isDark} />
                <DropdownButton icon={<FolderSymlink className="w-4 h-4" />} label={t.move} onClick={() => setShowOptions(false)} isDark={isDark} />
                <DropdownButton icon={<RotateCw className="w-4 h-4" />} label={t.rotate} onClick={() => { onRotate(); setShowOptions(false); }} isDark={isDark} />
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
  const { t } = useI18n();
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6"
    >
      <div className={`border rounded-2xl shadow-2xl p-4 flex items-center justify-between backdrop-blur-xl ${isDark ? 'bg-[#1A1F29] border-white/10 text-white' : 'bg-white border-slate-200 text-indigo-950'}`}>
        <div className="flex items-center gap-6">
          <p className="text-sm font-black whitespace-nowrap">{count} {t.imagesSelected}</p>
          <div className={`w-px h-6 ${isDark ? 'bg-white/10' : 'bg-slate-200'}`} />
        </div>

        <div className="flex items-center gap-2">
          <BatchButton icon={<ChevronDown className="w-4 h-4" />} label={t.selectAll} onClick={onSelectAll} />
          <BatchButton icon={<EyeOff className="w-4 h-4" />} label={t.hide} onClick={onHide} />
          <BatchButton icon={<Eye className="w-4 h-4" />} label={t.unhide} onClick={onUnhide} />
          <BatchButton icon={<Trash2 className="w-4 h-4" />} label={t.delete} onClick={onDelete} />
          <BatchButton icon={<Download className="w-4 h-4" />} label={t.download} onClick={() => {}} />
          <BatchButton icon={<FolderSymlink className="w-4 h-4" />} label={t.move} onClick={() => {}} />
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
  const { t } = useI18n();
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
            <span className="text-xs font-black tracking-[0.3em] text-primary uppercase">{t.photoDetails}</span>
            <span className="text-sm font-bold text-white/90">{currentIndex + 1} {t.of} {photos.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PhotoActionButton icon={<Download className="w-4 h-4" />} label={t.download} onClick={() => {
            const link = document.createElement('a');
            link.href = currentPhoto.variants?.original || currentPhoto.url;
            link.download = currentPhoto.filename;
            link.click();
          }} />
          <PhotoActionButton icon={<Share2 className="w-4 h-4" />} label={t.share} onClick={() => {}} />
          <div className="w-px h-6 bg-white/10 mx-2" />
          <PhotoActionButton 
            icon={<Maximize2 className="w-4 h-4" />} 
            label={t.fullResolution} 
            onClick={() => setShowOriginal(true)} 
          />
          {onRotate && <PhotoActionButton icon={<RotateCw className="w-4 h-4" />} label={t.rotate} onClick={onRotate} />}
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
  const { t } = useI18n();
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      name: t.free,
      price: 0,
      desc: t.tryCoreFeatures,
      features: [
        t.heicSupport,
        t.unlimitedEmail,
        t.twoEvents,
        t.unlimitedFaceSearch,
        t.photoUpload15,
        t.storage10,
        t.uncompressedPhotos
      ],
      button: t.getStarted,
      highlight: false
    },
    {
      name: t.starter,
      price: isYearly ? 19 : 29,
      originalPrice: isYearly ? 49 : null,
      desc: t.perfectForBeginners,
      features: [
        t.unlimitedEmail,
        t.unlimitedEvents,
        t.unlimitedFaceSearch,
        t.photoUpload50,
        t.storage125,
        t.uncompressedPhotos,
        t.heicSupport
      ],
      button: t.buyNow,
      highlight: false
    },
    {
      name: t.pro,
      price: isYearly ? 49 : 69,
      originalPrice: isYearly ? 99 : null,
      desc: t.mostPopularChoice,
      features: [
        t.unlimitedEmail,
        t.unlimitedEvents,
        t.unlimitedFaceSearch,
        t.photoUpload50,
        t.storage500,
        t.uncompressedPhotos,
        t.heicSupport
      ],
      button: t.buyNow,
      highlight: true,
      badge: t.mostPopular
    },
    {
      name: t.proPlus,
      price: isYearly ? 89 : 119,
      originalPrice: isYearly ? 169 : null,
      desc: t.forFullScale,
      features: [
        t.heicSupport,
        t.unlimitedEmail,
        t.unlimitedEvents,
        t.unlimitedFaceSearch,
        t.photoUpload50,
        t.storage1000,
        t.uncompressedPhotos
      ],
      button: t.buyNow,
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
          {t.pricingTitle} <span className="text-primary italic">{t.plans}</span>
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg font-medium mb-10"
        >
          {t.pricingDesc}
        </motion.p>
        
        {/* Toggle */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <span className={`text-sm font-bold ${!isYearly ? 'text-indigo-950 dark:text-white' : 'text-slate-400'}`}>{t.monthly}</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 bg-slate-200 dark:bg-white/10 rounded-full p-1 transition-all relative"
            >
              <motion.div 
                animate={{ x: isYearly ? 28 : 0 }}
                className="w-5 h-5 bg-primary rounded-full shadow-lg"
              />
            </button>
            <span className={`text-sm font-bold ${isYearly ? 'text-indigo-950 dark:text-white' : 'text-slate-400'}`}>{t.yearly}</span>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-black rounded-full border border-emerald-500/20"
          >
            {t.saveWithYearly}
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
                {plan.price > 0 && <span className="text-slate-500 font-bold">{t.perMonth}</span>}
              </div>
              {plan.originalPrice && (
                <div className="text-sm text-slate-400 font-medium line-through mb-1">
                  {t.normally} ${plan.originalPrice}
                </div>
              )}
              {plan.price > 0 && <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.billedYearly}</div>}
              <p className="text-slate-400 text-sm font-medium mt-4">{plan.desc}</p>
            </div>

            <div className="space-y-4 mb-10 flex-grow">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.whatsIncluded}</div>
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
          {t.cancelAnytime}
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
    <div className="w-full relative h-32 flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="bg-white/80 dark:bg-white/10 backdrop-blur-md rounded-xl p-4 border border-brand-dark/5 shadow-sm space-y-3"
      >
        <div className="space-y-2">
          <div className="h-2 w-1/2 bg-slate-100 dark:bg-white/10 rounded-full" />
          <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full opacity-60" />
        </div>
        <div className="flex justify-end pt-1">
          <motion.div 
            animate={{ 
              scale: [1, 0.95, 1],
              backgroundColor: ['#C48F28', '#A67922', '#C48F28']
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="h-6 w-16 rounded-lg shadow-md"
          />
        </div>
      </motion.div>
      
      {/* Floating success indicator */}
      <motion.div
        animate={{ 
          y: [-10, -20, -10],
          opacity: [0, 1, 0]
        }}
        transition={{ repeat: Infinity, duration: 2, delay: 1 }}
        className="absolute top-0 right-0 bg-green-500 text-white p-1 rounded-full shadow-lg"
      >
        <div className="w-3 h-3 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
      </motion.div>
    </div>
  );
}

function UploadIllustration() {
  return (
    <div className="w-full relative h-32 flex flex-col items-center justify-center">
      <div className="w-full h-24 border-2 border-dashed border-primary/20 rounded-2xl flex items-center justify-center relative overflow-hidden bg-white/5">
        <motion.div
           animate={{ y: [0, -4, 0] }}
           transition={{ repeat: Infinity, duration: 2 }}
           className="z-10"
        >
          <ArrowUp className="w-6 h-6 text-primary" />
        </motion.div>
        
        {/* Sliding photo cards */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={{ 
              opacity: [0, 1, 0],
              x: [-40, 0, 40],
              y: [0, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3, 
              delay: i * 0.8,
              ease: "easeInOut" 
            }}
            className="absolute w-8 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-brand-dark/5"
          />
        ))}

        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
        />
      </div>
    </div>
  );
}

function DiscoveryIllustration() {
  return (
    <div className="w-full relative h-32 flex items-center justify-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center relative overflow-hidden group">
        <ScanFace className="w-10 h-10 text-primary" />
        
        {/* Scanning line */}
        <motion.div 
          animate={{ y: [-40, 40] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute w-full h-[1px] bg-primary/60 shadow-[0_0_8px_rgba(196,143,40,0.8)]"
        />
      </div>

      {/* Popping photo results */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: [0, Math.cos(angle * Math.PI / 180) * 45],
            y: [0, Math.sin(angle * Math.PI / 180) * 45]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2.5, 
            delay: i * 0.2,
            ease: "backOut" 
          }}
          className="absolute w-6 h-6 rounded-md bg-white dark:bg-slate-800 shadow-sm border border-brand-dark/5"
        />
      ))}
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

function EventSettingsModal({ event, onClose, onSave, initialTab = 'general' }: { event: Event, onClose: () => void, onSave: (event: Event) => void, initialTab?: 'general' | 'share' | 'design' }) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'general' | 'share' | 'design'>(initialTab);
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
  const [description, setDescription] = useState(''); 
  const isDescExceeded = description.length > descLimit;

  const getThemeName = (id: string) => {
    switch (id) {
      case 'classic-cream': return t.themeClassicCream;
      case 'almond-white': return t.themeAlmondWhite;
      case 'modern-dark': return t.themeModernDark;
      case 'ethereal-blue': return t.themeEtherealBlue;
      case 'royal-gold': return t.themeRoyalGold;
      case 'velvet-night': return t.themeVelvetNight;
      default: return id;
    }
  };

  const getCoverStyleName = (id: string) => {
    switch (id) {
      case 'oval': return t.coverStyleClassicOval;
      case 'pill': return t.coverStyleElegantPill;
      case 'circle': return t.coverStyleSoftCircle;
      case 'rect': return t.coverStyleBrutalistRect;
      default: return id;
    }
  };

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
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0D1117] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh] cursor-default"
      >
        {/* Header Tabs */}
        <div className="flex border-b border-white/5 p-2 bg-[#12161F]/50">
          <button 
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-2xl ${activeTab === 'general' ? 'text-white bg-white/5 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {t.generalSettings}
          </button>
          <button 
            onClick={() => setActiveTab('share')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-2xl ${activeTab === 'share' ? 'text-white bg-white/5 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {t.shareSettings}
          </button>
          <button 
            onClick={() => setActiveTab('design')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-2xl ${activeTab === 'design' ? 'text-white bg-white/5 shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}
          >
            {t.galleryDesign}
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
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">{t.eventNameLabel}</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={editedEvent.title}
                        onChange={(e) => setEditedEvent({...editedEvent, title: e.target.value})}
                        className={`w-full px-6 py-4 bg-[#12161F] border rounded-2xl outline-none transition-all font-bold text-lg ${isNameExceeded ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10'}`}
                        placeholder={t.namePlaceholder}
                      />
                      {isNameExceeded && <p className="text-[10px] text-red-500 font-bold mt-2 px-1 uppercase tracking-widest">{t.characterLimitExceeded}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">{t.descLabel}</label>
                    <textarea 
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={`w-full px-6 py-4 bg-[#12161F] border rounded-2xl outline-none transition-all font-medium resize-none ${isDescExceeded ? 'border-red-500 ring-2 ring-red-500/20' : 'border-white/10 focus:border-primary focus:ring-4 focus:ring-primary/10'}`}
                      placeholder={t.descPlaceholder}
                    />
                    {isDescExceeded && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-widest">{t.characterLimitExceeded}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">{t.startDateLabel}</label>
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
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">{t.endDateLabel}</label>
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
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">{t.albumPresets}</h3>
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
                         <span className="text-[10px] font-black uppercase tracking-widest text-center">{getThemeName(theme.id)}</span>
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
                      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">{t.coverStyles}</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { id: 'oval', name: getCoverStyleName('oval'), icon: <div className="w-10 h-10 border-2 border-current rounded-[40%] flex items-center justify-center"><ImageIcon className="w-4 h-4 opacity-30" /></div> },
                          { id: 'pill', name: getCoverStyleName('pill'), icon: <div className="w-10 h-10 border-2 border-current rounded-[3rem] flex items-center justify-center"><ImageIcon className="w-4 h-4 opacity-30" /></div> },
                          { id: 'circle', name: getCoverStyleName('circle'), icon: <div className="w-10 h-10 border-2 border-current rounded-full flex items-center justify-center"><ImageIcon className="w-4 h-4 opacity-30" /></div> },
                          { id: 'rect', name: getCoverStyleName('rect'), icon: <div className="w-10 h-10 border-2 border-current rounded-xl flex items-center justify-center"><ImageIcon className="w-4 h-4 opacity-30" /></div> },
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
                     <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">{t.livePreview}</h3>
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
                {/* Links Section */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <div className="space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">{t.guestLinks}</h3>
                    
                    {/* Full Access Link */}
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{t.fullAccessGallery}</label>
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
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">{t.faceSearchAccessOnly}</label>
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
             </div>

             <div className="space-y-6 pt-8 border-t border-white/5">
                   {/* Password Protection Row */}
                   <div className="flex items-center justify-between group/row">
                      <div className="flex items-center gap-6">
                         <div>
                            <h3 className="font-bold text-sm">{t.passwordProtection}</h3>
                            <p className="text-xs text-slate-500 font-medium mt-1">{t.passwordProtectionDesc}</p>
                         </div>
                         
                         {editedEvent.shareSettings?.passwordEnabled && (
                           <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-12 py-2 gap-4 ml-8 group-hover/row:bg-white/10 transition-all shadow-lg shadow-black/20">
                              <div className="flex flex-col">
                                <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 leading-none mb-1">{t.securityPIN}</span>
                                <span className="text-sm font-mono text-primary font-bold tracking-wider leading-none">
                                  <input 
                                    type="text"
                                    autoFocus
                                    maxLength={4}
                                    value={editedEvent.shareSettings?.pin || ''}
                                    onChange={(e) => {
                                      const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                                      setEditedEvent(prev => ({
                                        ...prev,
                                        shareSettings: prev.shareSettings ? {
                                          ...prev.shareSettings,
                                          pin: val
                                        } : undefined
                                      }));
                                    }}
                                    className="bg-transparent border-none focus:outline-none w-14 p-0 text-primary"
                                  />
                                </span>
                               </div>
                              <div className="w-[1px] h-6 bg-white/10" />
                              <button 
                                onClick={() => navigator.clipboard.writeText(editedEvent.shareSettings?.pin || '')}
                                className="p-1.5 text-slate-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
                                title={t.copy}
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                           </div>
                         )}
                      </div>
                      
                      <button 
                         onClick={handleTogglePassword}
                         className={`w-12 h-6 rounded-full relative transition-all shadow-inner shrink-0 ${editedEvent.shareSettings?.passwordEnabled ? 'bg-primary' : 'bg-slate-800'}`}
                      >
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-md ${editedEvent.shareSettings?.passwordEnabled ? 'right-1' : 'left-1'}`} />
                      </button>
                   </div>

                   {/* Event Registration Row */}
                   <div className="flex items-center justify-between">
                      <div>
                         <h3 className="font-bold text-sm">{t.eventRegistration}</h3>
                         <p className="text-xs text-slate-500 font-medium mt-1">{t.eventRegistrationDesc}</p>
                      </div>
                      <button 
                        onClick={handleToggleRegistration}
                        className={`w-12 h-6 rounded-full relative transition-all shadow-inner shrink-0 ${editedEvent.shareSettings?.registrationEnabled ? 'bg-primary' : 'bg-slate-800'}`}
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
            {t.discardChanges}
          </button>
          <button 
            onClick={handleSave}
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {t.saveChanges}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CreateEventModal({ onClose, onCreate }: { onClose: () => void, onCreate: (event: Event) => void }) {
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState<'single' | 'multiple'>('single');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const nameLimit = 40;
  const descLimit = 255;

  const isNameExceeded = name.length >= nameLimit;
  const isDescExceeded = description.length >= descLimit;

  // Localized messages
  const messages = {
    nameLimitExceeded: t.characterLimitExceeded,
    descLimitExceeded: t.characterLimitExceeded,
    createBtn: t.createNewEvent,
    modalTitle: t.createNewEvent,
    nameLabel: t.nameLabel,
    descLabel: t.descLabel,
    durationLabel: t.durationLabel,
    dateLabel: t.dateLabel,
    startDateLabel: t.startDateLabel,
    endDateLabel: t.endDateLabel,
    singleDay: t.singleDay,
    multipleDays: t.multipleDays,
    namePlaceholder: t.namePlaceholder,
    descPlaceholder: t.descPlaceholder
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

function ProfileTab({ profile, onUpdate, isDark }: { profile: UserProfile, onUpdate: (p: UserProfile) => void, isDark: boolean }) {
  const { t } = useI18n();
  const [editedProfile, setEditedProfile] = useState(profile);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPasswordMatch = passwordForm.new === passwordForm.confirm && passwordForm.new !== '';
  const canSavePassword = editedProfile.authProvider === 'google' 
    ? isPasswordMatch 
    : (passwordForm.current !== '' && isPasswordMatch);

  const handleUpdate = (updates: Partial<UserProfile>) => {
    const updated = { ...editedProfile, ...updates };
    setEditedProfile(updated);
    onUpdate(updated);
  };

  const handleSocialUpdate = (platform: keyof UserProfile['socials'], value: string) => {
    const updatedSocials = { ...editedProfile.socials, [platform]: value };
    handleUpdate({ socials: updatedSocials });
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleUpdate({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto p-8"
    >
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-black text-indigo-950 dark:text-white tracking-tight">{t.publicProfile}</h1>
            <p className="text-slate-500 mt-1 font-medium">{t.manageProfessionalInfo}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className={`p-6 rounded-[2.5rem] border ${isDark ? 'bg-[#12161F] border-white/5' : 'bg-white border-slate-200'} shadow-xl shadow-slate-200/50 dark:shadow-none`}>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 bg-slate-100 dark:bg-white/5">
                    {editedProfile.photo ? (
                      <img src={editedProfile.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <User className="w-12 h-12" />
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handlePhotoUpload} 
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold dark:text-white">{editedProfile.name} {editedProfile.surname}</h2>
                  <p className="text-sm text-slate-500 font-medium">{editedProfile.email}</p>
                </div>
                {editedProfile.photo && (
                  <button 
                    onClick={() => handleUpdate({ photo: undefined })}
                    className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors"
                  >
                    {t.deletePhoto}
                  </button>
                )}
              </div>
            </div>

            <div className={`p-6 rounded-[2.5rem] border ${isDark ? 'bg-[#12161F] border-white/5' : 'bg-white border-slate-200'} shadow-xl shadow-slate-200/50 dark:shadow-none`}>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 px-2">{t.security}</h3>
              <div className="space-y-4">
                {editedProfile.authProvider === 'google' ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-primary/5 border border-indigo-100 dark:border-primary/10">
                      <p className="text-sm font-medium text-indigo-900 dark:text-slate-300">
                        You use Google to sign in. You can set a secondary password for your account.
                      </p>
                    </div>
                    {!isChangingPassword ? (
                      <button 
                        onClick={() => setIsChangingPassword(true)}
                        className="w-full py-3 rounded-xl border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all"
                      >
                        {t.setPassword}
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative">
                          <input 
                            type={showPasswords.new ? "text" : "password"} 
                            placeholder={t.newPassword} 
                            value={passwordForm.new}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, new: e.target.value }))}
                            className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200'} focus:ring-2 focus:ring-primary outline-none transition-all pr-12 text-sm placeholder:text-xs`}
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                          >
                            {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="relative">
                          <input 
                            type="password"
                            placeholder={t.confirmNewPassword} 
                            value={passwordForm.confirm}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                            className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200'} focus:ring-2 focus:ring-primary outline-none transition-all text-sm placeholder:text-xs ${passwordForm.confirm && !isPasswordMatch ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
                          />
                        </div>
                        
                        {passwordForm.confirm && !isPasswordMatch && (
                          <p className="text-xs font-bold text-red-500 px-2 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> {t.passwordsDoNotMatch}
                          </p>
                        )}

                        <div className="flex gap-2">
                          <button 
                            disabled={!canSavePassword}
                            onClick={() => {
                              setIsChangingPassword(false);
                              setPasswordForm({ current: '', new: '', confirm: '' });
                            }}
                            className="flex-1 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {t.save}
                          </button>
                          <button 
                            onClick={() => {
                              setIsChangingPassword(false);
                              setPasswordForm({ current: '', new: '', confirm: '' });
                            }}
                            className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-white/5 font-bold dark:text-white transition-all font-bold"
                          >
                            {t.cancel}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {!isChangingPassword ? (
                      <button 
                        onClick={() => setIsChangingPassword(true)}
                        className="w-full py-3 rounded-xl border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all"
                      >
                        Change Password
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative">
                          <input 
                            type={showPasswords.current ? "text" : "password"} 
                            placeholder="Current Password" 
                            value={passwordForm.current}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, current: e.target.value }))}
                            className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200'} focus:ring-2 focus:ring-primary outline-none transition-all pr-12 text-sm placeholder:text-xs`}
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                          >
                            {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                        <div className="relative">
                          <input 
                            type="password" 
                            placeholder="New Password" 
                            value={passwordForm.new}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, new: e.target.value }))}
                            className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200'} focus:ring-2 focus:ring-primary outline-none transition-all text-sm placeholder:text-xs`}
                          />
                        </div>
                        <div className="relative">
                          <input 
                            type="password" 
                            placeholder="Confirm New Password" 
                            value={passwordForm.confirm}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))}
                            className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200'} focus:ring-2 focus:ring-primary outline-none transition-all text-sm placeholder:text-xs ${passwordForm.confirm && !isPasswordMatch ? 'border-red-500 ring-2 ring-red-500/20' : ''}`}
                          />
                        </div>

                        {passwordForm.confirm && !isPasswordMatch && (
                          <p className="text-xs font-bold text-red-500 px-2 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Passwords do not match
                          </p>
                        )}

                        <div className="flex gap-2">
                          <button 
                            disabled={!canSavePassword}
                            onClick={() => {
                              setIsChangingPassword(false);
                              setPasswordForm({ current: '', new: '', confirm: '' });
                            }}
                            className="flex-1 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Save
                          </button>
                          <button 
                            onClick={() => {
                              setIsChangingPassword(false);
                              setPasswordForm({ current: '', new: '', confirm: '' });
                            }}
                            className="flex-1 py-3 rounded-xl bg-slate-100 dark:bg-white/5 font-bold dark:text-white transition-all font-bold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className={`p-8 rounded-[2.5rem] border ${isDark ? 'bg-[#12161F] border-white/5' : 'bg-white border-slate-200'} shadow-xl shadow-slate-200/50 dark:shadow-none`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-slate-400 px-2">First Name</label>
                  <input 
                    type="text" 
                    value={editedProfile.name}
                    onChange={(e) => handleUpdate({ name: e.target.value })}
                    className={`w-full px-5 py-3 rounded-2xl border ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200'} focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-slate-400 px-2">Last Name</label>
                  <input 
                    type="text" 
                    value={editedProfile.surname}
                    onChange={(e) => handleUpdate({ surname: e.target.value })}
                    className={`w-full px-5 py-3 rounded-2xl border ${isDark ? 'bg-black/20 border-white/10 text-white' : 'bg-slate-50 border-slate-200'} focus:ring-4 focus:ring-primary/10 outline-none transition-all font-bold`}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 px-2">Contact & Visibility</h3>
                
                <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isDark ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</p>
                      <p className="font-bold dark:text-white">{editedProfile.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleUpdate({ emailVisible: !editedProfile.emailVisible })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${editedProfile.emailVisible ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}
                  >
                    {editedProfile.emailVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {editedProfile.emailVisible ? 'Visible' : 'Hidden'}
                  </button>
                </div>

                <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isDark ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">Phone Number</p>
                      <input 
                        type="text" 
                        value={editedProfile.phone || ''}
                        placeholder="Not set"
                        onChange={(e) => handleUpdate({ phone: e.target.value })}
                        className="bg-transparent border-none p-0 focus:ring-0 font-bold dark:text-white placeholder:text-slate-400 w-full"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => handleUpdate({ phoneVisible: !editedProfile.phoneVisible })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${editedProfile.phoneVisible ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}
                  >
                    {editedProfile.phoneVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    {editedProfile.phoneVisible ? 'Visible' : 'Hidden'}
                  </button>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Social Media</h3>
                    <button 
                      onClick={() => handleUpdate({ socialsVisible: !editedProfile.socialsVisible })}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${editedProfile.socialsVisible ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-white/10 text-slate-500'}`}
                    >
                      {editedProfile.socialsVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {editedProfile.socialsVisible ? 'Show on Guest Page' : 'Hidden'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: 'instagram', label: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
                      { id: 'facebook', label: 'Facebook', icon: <Facebook className="w-4 h-4" /> },
                      { id: 'linkedin', label: 'LinkedIn', icon: <Linkedin className="w-4 h-4" /> },
                      { id: 'pinterest', label: 'Pinterest', icon: <ImageIcon className="w-4 h-4" /> }
                    ].map((platform) => (
                      <div key={platform.id} className={`flex items-center gap-3 p-4 rounded-2xl border ${isDark ? 'bg-black/20 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="text-slate-400">{platform.icon}</div>
                        <input 
                          type="text" 
                          placeholder={`${platform.label} handle`}
                          value={editedProfile.socials[platform.id as keyof UserProfile['socials']] || ''}
                          onChange={(e) => handleSocialUpdate(platform.id as keyof UserProfile['socials'], e.target.value)}
                          className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold dark:text-white placeholder:text-slate-400 w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CalendarTab(props: { events: Event[], onSelectEvent: (id: string) => void, key?: string }) {
  const { events, onSelectEvent } = props;
  const { language, t } = useI18n();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'year' | 'list'>('month');
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthName = language === 'az' ? AZ_MONTHS_LONG[month] : currentDate.toLocaleString(language === 'tr' ? 'tr-TR' : language === 'ru' ? 'ru-RU' : 'en-US', { month: 'long' });

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
          {t.weekdaysShort.map((d, i) => (
            <div key={`${d}-${i}`} className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
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
          const mMonth = m.getMonth();
          const mName = language === 'az' ? AZ_MONTHS_LONG[mMonth] : m.toLocaleString(language === 'tr' ? 'tr-TR' : language === 'ru' ? 'ru-RU' : 'en-US', { month: 'long' });
          const mYear = m.getFullYear();
          const daysInM = new Date(mYear, mMonth + 1, 0).getDate();
          const firstD = new Date(mYear, mMonth, 1).getDay();
          const mDays = Array.from({ length: daysInM }, (_, i) => i + 1);
          
          return (
            <div key={idx} className="bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-[2rem] p-6 shadow-sm">
              <h3 className="text-lg font-black text-indigo-950 dark:text-white mb-4 text-center">{mName}</h3>
              <div className="grid grid-cols-7 gap-1">
                {t.weekdaysMin.map((d, i) => (
                  <div key={`${d}-${i}`} className="text-[8px] font-black text-slate-400 text-center uppercase mb-2">{d}</div>
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

  const formatCalEventDate = (event: Event) => {
    const start = formatEventDate(event.eventDate, language, true);
    if (!event.endDate || event.endDate === event.eventDate) return start;
    const end = formatEventDate(event.endDate, language, true);
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
                     {formatCalEventDate(event)}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                     <ScanFace className="w-4 h-4 text-secondary" />
                     {event.photoCount} {t.photos}
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
            {t.today}
          </button>
          <div className="flex items-center bg-white dark:bg-[#12161F] border border-slate-200 dark:border-white/5 rounded-xl p-1 shadow-sm">
             <button 
              onClick={() => setView('month')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'month' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
             >{t.month}</button>
             <button 
              onClick={() => setView('year')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'year' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
             >{t.year}</button>
             <button 
              onClick={() => setView('list')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${view === 'list' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
             >{t.list}</button>
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
  const { t, language } = useI18n();
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
                const start = formatEventDate(event.eventDate, language);
                if (!event.endDate || event.endDate === event.eventDate) return start;
                const end = formatEventDate(event.endDate, language);
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
                {event.status === 'Published' ? t.published : t.draft}
             </span>
             <span className="text-[8px] font-bold text-slate-400">{t.clickToViewDetail}</span>
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

function GuestView({ event, isDark, userProfile, onClose }: { event: Event, isDark: boolean, userProfile: UserProfile, onClose: () => void }) {
  const { t, language } = useI18n();
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
          <span className="text-xs italic opacity-60">{t.galleryBy.replace('{name}', userProfile.name)}</span>
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
            {formatEventDate(event.eventDate, language, true)}
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

      {/* Photographer Profile Section */}
      <footer className="w-full py-32 px-6 border-t border-black/5" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] opacity-40">{t.meetPhotographer}</h2>
            <div className="w-12 h-1 mx-auto" style={{ backgroundColor: design.accentColor, opacity: 0.4 }} />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 text-left">
            <div className={`w-40 h-40 rounded-full overflow-hidden border-8 border-white shadow-2xl ${design.coverShape === 'circle' ? 'rounded-full' : 'rounded-[3rem]'}`}>
              {userProfile.photo ? (
                <img src={userProfile.photo} alt={userProfile.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                  <User className="w-16 h-16" />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-4xl font-black tracking-tight" style={{ color: design.textColor }}>
                  {userProfile.name} {userProfile.surname}
                </h3>
                <p className="text-xl opacity-60 italic mt-1">{t.photographer}</p>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {userProfile.emailVisible && (
                  <a href={`mailto:${userProfile.email}`} className="flex items-center gap-3 group">
                    <div className="p-2 rounded-lg bg-black/5 group-hover:bg-primary/10 transition-colors">
                      <Mail className="w-4 h-4" style={{ color: design.accentColor }} />
                    </div>
                    <span className="font-bold opacity-80">{userProfile.email}</span>
                  </a>
                )}
                {userProfile.phoneVisible && userProfile.phone && (
                  <a href={`tel:${userProfile.phone}`} className="flex items-center gap-3 group">
                    <div className="p-2 rounded-lg bg-black/5 group-hover:bg-primary/10 transition-colors">
                      <Phone className="w-4 h-4" style={{ color: design.accentColor }} />
                    </div>
                    <span className="font-bold opacity-80">{userProfile.phone}</span>
                  </a>
                )}
              </div>

              {userProfile.socialsVisible && (
                <div className="flex gap-4">
                  {userProfile.socials.instagram && (
                    <a href={`https://instagram.com/${userProfile.socials.instagram}`} target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-black/5 hover:bg-primary hover:text-white transition-all">
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {userProfile.socials.facebook && (
                    <a href={`https://facebook.com/${userProfile.socials.facebook}`} target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-black/5 hover:bg-primary hover:text-white transition-all">
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {userProfile.socials.linkedin && (
                    <a href={`https://linkedin.com/in/${userProfile.socials.linkedin}`} target="_blank" rel="noreferrer" className="p-3 rounded-2xl bg-black/5 hover:bg-primary hover:text-white transition-all">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-12 border-t border-black/5 w-full">
            <p className="text-xs font-bold tracking-widest opacity-30 uppercase">
              {t.poweredBy} © 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function GuestGalleryView({ event, isDark, photos: initialPhotos }: { event: Event, isDark: boolean, photos?: Photo[] }) {
  const { t } = useI18n();
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
        <p className="text-xs font-black uppercase tracking-widest opacity-40">{t.loadingGallery}</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 max-w-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-slate-200 dark:border-white/5 pt-12 px-4 md:px-8 gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl uppercase font-black" style={{ color: design?.textColor }}>{t.theGallery}</h2>
          <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">{t.showingMoments.replace('{count}', photos.length.toString())}</p>
        </div>

        {/* Dynamic Column Control */}
        <div className="flex items-center gap-1 p-1 rounded-2xl border bg-black/5 dark:bg-white/5 self-center md:self-auto" style={{ borderColor: `${design?.accentColor}20` }}>
          <button 
            onClick={() => setColCount(3)}
            title={t.wideView}
            className={`px-4 py-2 rounded-xl transition-all ${colCount === 3 ? 'bg-white dark:bg-white/10 shadow-sm' : 'opacity-40 hover:opacity-100'}`}
            style={{ color: design?.textColor }}
          >
            <Columns className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setColCount(5)}
            title={t.standardView}
            className={`px-4 py-2 rounded-xl transition-all ${colCount === 5 ? 'bg-white dark:bg-white/10 shadow-sm' : 'opacity-40 hover:opacity-100'}`}
            style={{ color: design?.textColor }}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setColCount(8)}
            title={t.compactView}
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

      <div className="w-full px-1 md:px-2 max-w-none">
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
  const { t } = useI18n();
  const design = event.galleryDesign;
  return (
    <div className="space-y-12 py-12">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <h2 className="text-4xl uppercase font-black" style={{ color: design?.textColor }}>{t.findYourSpecialMoments}</h2>
        <p className="opacity-60 italic text-lg leading-relaxed">
          {t.uploadSelfieDesc}
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
            {t.takeASelfie}
          </button>
          <button 
            className="flex-1 py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all text-sm uppercase tracking-widest shadow-xl"
            style={{ backgroundColor: `${design?.accentColor}10`, color: design?.textColor }}
          >
            <CloudUpload className="w-5 h-5" />
            {t.uploadProfile}
          </button>
        </div>
        
        <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] opacity-40">{t.privacyFirstDesc}</p>
      </div>

      {/* Features highlights for guest */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
        <GuestFeature icon={<ShieldCheck className="w-5 h-5" />} title={t.privateAccessTitle} desc={t.privateAccessDesc} isDark={isDark} />
        <GuestFeature icon={<ImageIcon className="w-5 h-5" />} title={t.highQualityTitle} desc={t.highQualityDesc} isDark={isDark} />
        <GuestFeature icon={<BarChart3 className="w-5 h-5" />} title={t.instantResultsTitle} desc={t.instantResultsDesc} isDark={isDark} />
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
