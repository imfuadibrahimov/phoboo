/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ScanFace, 
  Filter, 
  LayoutGrid, 
  Share2, 
  Search, 
  Lock, 
  Mail, 
  Pointer, 
  Globe, 
  Moon, 
  Sun,
  Twitter, 
  Linkedin, 
  ArrowUp,
  Cloud,
  ChevronRight,
  Camera,
  CloudUpload,
  QrCode,
  Clock,
  Users,
  ShieldCheck
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

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
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

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

  return (
    <div className="relative min-h-screen font-sans">
      <div className="mesh-gradient animate-mesh" />
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 frosted-glass border-b border-white/20">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="text-2xl font-extrabold tracking-tighter text-indigo-900 dark:text-white">Phoboo</div>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-x-8">
            <a className="text-sm font-semibold text-primary border-b-2 border-primary pb-1" href="#">Home</a>
            <a className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-all" href="#">Pricing</a>
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
            <button className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary transition-all whitespace-nowrap">Sign In</button>
            <button className="vibrant-gradient text-white px-6 py-2 rounded-lg text-sm font-bold transition-all transform hover:scale-105 active:scale-95">Get Started</button>
          </div>
        </div>
      </nav>

      <main className="pt-24">
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
              <div 
                className="flex gap-4 md:gap-6 whitespace-nowrap animate-infinite-scroll w-fit"
              >
                {[...WHY_CHOOSE_FEATURES, ...WHY_CHOOSE_FEATURES, ...WHY_CHOOSE_FEATURES].map((feature, idx) => (
                  <ChoiceCard 
                    key={`${feature.title}-${idx}`}
                    {...feature}
                  />
                ))}
              </div>
            </div>
            
            {/* Edge Fades */}
            <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#F0F4FF] via-[#F0F4FF]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#F0F4FF] via-[#F0F4FF]/80 to-transparent z-10 pointer-events-none" />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-white/30 backdrop-blur-sm relative overflow-hidden">
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
              {/* Connecting Line (Desktop) */}
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
          
          {/* Decorative background blobs */}
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
              <div 
                className="flex gap-4 md:gap-6 whitespace-nowrap animate-infinite-scroll w-fit"
              >
                {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((cat, idx) => (
                  <CategoryCard key={`${cat.title}-${idx}`} {...cat} />
                ))}
              </div>
            </div>
            
            {/* Fades */}
            <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#F0F4FF] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#F0F4FF] to-transparent z-10" />
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
                <button className="bg-white text-primary px-12 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-indigo-900/20 active:scale-95">
                  Get Started Now
                </button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white/40 backdrop-blur-xl w-full py-16 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6 lg:col-span-1">
            <div className="text-2xl font-extrabold text-indigo-900 tracking-tighter">Phoboo</div>
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

function FeatureItem({ icon, title, desc, delay = 0 }: { icon: React.ReactNode, title: string, desc: string, delay?: number }) {
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

function ChoiceCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
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
  illustration: React.ReactNode,
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

function CategoryCard({ img, title, desc }: { img: string, title: string, desc: string }) {
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

function FooterColumn({ title, links, icons }: { title: string, links?: string[], icons?: {icon: React.ReactNode, name: string}[] }) {
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
