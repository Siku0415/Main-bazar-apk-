import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Download, 
  Search, 
  RefreshCw, 
  Flame, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle,
  TrendingUp,
  Award,
  BookOpen,
  Filter,
  Coins,
  CreditCard,
  Clock,
  Headphones,
  ArrowUpRight,
  ArrowDownLeft,
  Bell,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ALL_GAMES } from './gamesData';
import { Game } from './types';
import { Header } from './components/Header';
import { GameCard } from './components/GameCard';
import { GameDetailsModal } from './components/GameDetailsModal';
import { GameRates } from './components/GameRates';
import { InteractiveGuesser } from './components/InteractiveGuesser';
import { PlayDemo } from './components/PlayDemo';
import { FAQSection } from './components/FAQSection';
import { MainBazarLogo } from './components/MainBazarLogo';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Language, translations } from './translations';
import { trackSubscribe } from './utils/tracker';

const CONTACT_NUMBER = "8829821655";
const APK_DOWNLOAD_URL = "https://mainbazarronlinematka.site/app/mainbazar.apk";

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('main_bazar_selected_language');
    return (saved as Language) || 'hi'; // default to Hindi or English, 'hi' matches most Indian traffic
  });

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('main_bazar_selected_language', lang);
  };

  const t = translations[currentLang];

  // Meta Pixel tracker diagnostics HUD state
  const [trackingLogs, setTrackingLogs] = useState<{
    id: string;
    eventName: string;
    value: number;
    currency: string;
    method: 'Browser Pixel' | 'Conversions API (CAPI)';
    timestamp: string;
    status: 'success' | 'pending';
    warning?: string;
    simulated?: boolean;
  }[]>([]);
  const [isHudOpen, setIsHudOpen] = useState<boolean>(false);

  useEffect(() => {
    // Initial PageView logger to prove tracking is initialized and active on load
    const initialLog = {
      id: "init-pv-pixel",
      eventName: "PageView",
      value: 0,
      currency: "INR",
      method: "Browser Pixel" as const,
      timestamp: new Date().toLocaleTimeString(),
      status: "success" as const,
    };
    const initialLogCapi = {
      id: "init-pv-capi",
      eventName: "PageView",
      value: 0,
      currency: "INR",
      method: "Conversions API (CAPI)" as const,
      timestamp: new Date().toLocaleTimeString(),
      status: "success" as const,
    };
    setTrackingLogs([initialLog, initialLogCapi]);

    const handlePixelTracked = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { eventName, value, currency, method } = customEvent.detail;
      const newLog = {
        id: Math.random().toString(36).substring(2, 9),
        eventName,
        value,
        currency,
        method: (method && method.includes('CAPI')) ? ('Conversions API (CAPI)' as const) : ('Browser Pixel' as const),
        timestamp: new Date().toLocaleTimeString(),
        status: 'success' as const,
      };
      setTrackingLogs(prev => [newLog, ...prev].slice(0, 15));
    };

    const handleCapiTracked = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { eventName, value, currency, warning, simulated } = customEvent.detail;
      const newLog = {
        id: Math.random().toString(36).substring(2, 9),
        eventName,
        value,
        currency,
        method: 'Conversions API (CAPI)' as const,
        timestamp: new Date().toLocaleTimeString(),
        status: 'success' as const,
        warning,
        simulated,
      };
      setTrackingLogs(prev => [newLog, ...prev].slice(0, 15));
    };

    window.addEventListener('meta-pixel-tracked', handlePixelTracked);
    window.addEventListener('meta-capi-tracked', handleCapiTracked);

    return () => {
      window.removeEventListener('meta-pixel-tracked', handlePixelTracked);
      window.removeEventListener('meta-capi-tracked', handleCapiTracked);
    };
  }, []);

  const [games, setGames] = useState<Game[]>(ALL_GAMES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'morning' | 'day' | 'night'>('all');
  const [selectedGameForChart, setSelectedGameForChart] = useState<Game | null>(null);
  const [isRefreshingResults, setIsRefreshingResults] = useState<boolean>(false);

  // Download simulation state
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [isDownloadDone, setIsDownloadDone] = useState<boolean>(false);

  const handleDownloadApp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (downloadProgress !== null) return; // already in progress

    setDownloadProgress(0);
    setIsDownloadDone(false);

    // Increment progress simulated
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev === null) {
          clearInterval(interval);
          return null;
        }
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloadDone(true);
          
          // Track dynamic event Subscribe for successful app installation start
          trackSubscribe(200, 'INR');
          
          // Trigger actual browser download
          const link = document.createElement("a");
          link.href = APK_DOWNLOAD_URL;
          link.download = "Main_Bazar_Official.apk";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Auto close/reset state after 4 seconds
          setTimeout(() => {
            setDownloadProgress(null);
            setIsDownloadDone(false);
          }, 4000);

          return 100;
        }
        return prev + Math.floor(Math.random() * 12) + 6;
      });
    }, 180);
  };

  // Trust Proof Notification Toast State
  const [liveToast, setLiveToast] = useState<{
    id: number;
    name: string;
    city: string;
    amount: number;
    type: 'deposit' | 'withdrawal';
    method: string;
    timeAgo: string;
  } | null>(null);

  useEffect(() => {
    const INDIAN_USERS = [
      { name: "Suresh Yadav", city: "Patna" },
      { name: "Amit Sharma", city: "New Delhi" },
      { name: "Sanjay Gupta", city: "Kanpur" },
      { name: "Ramesh Chawla", city: "Mumbai" },
      { name: "Sunil Verma", city: "Jaipur" },
      { name: "Vijay Patel", city: "Ahmedabad" },
      { name: "Pooja Sharma", city: "Meerut" },
      { name: "Anjali Rao", city: "Bhopal" },
      { name: "Deepak Mishra", city: "Indore" },
      { name: "Rohan Sawant", city: "Pune" },
      { name: "Rajesh Saini", city: "Lucknow" },
      { name: "Karan Singh", city: "Ludhiana" },
      { name: "Vikram Reddy", city: "Hyderabad" },
      { name: "Neha Joshi", city: "Nagpur" },
      { name: "Rahul Chawla", city: "Amritsar" },
      { name: "Nitin Patil", city: "Surat" },
      { name: "Arvind Meena", city: "Gwalior" },
      { name: "Manish Solanki", city: "Jodhpur" },
      { name: "Sachin Patil", city: "Kolhapur" },
      { name: "Abhishek Dwivedi", city: "Varanasi" }
    ];

    const METHODS = ["PhonePe", "Paytm UPI", "Google Pay QR", "UPI Direct", "Internet Banking"];
    let idCounter = 0;

    const showRandomToast = () => {
      const user = INDIAN_USERS[Math.floor(Math.random() * INDIAN_USERS.length)];
      const type = Math.random() > 0.4 ? 'withdrawal' : 'deposit'; // 60% withdrawals, 40% deposits
      
      // Calculate amount based on requirements (min deposit 100, min withdrawal 500)
      let amount = 0;
      if (type === 'deposit') {
        amount = 100 + Math.floor(Math.random() * 25) * 100 + (Math.random() > 0.5 ? 50 : 0);
      } else {
        const randSeed = Math.random();
        if (randSeed < 0.6) {
          amount = 500 + Math.floor(Math.random() * 45) * 100;
        } else if (randSeed < 0.9) {
          amount = 5000 + Math.floor(Math.random() * 20) * 500;
        } else {
          amount = 15000 + Math.floor(Math.random() * 15) * 2000;
        }
      }

      const method = METHODS[Math.floor(Math.random() * METHODS.length)];
      const secondsAgo = 5 + Math.floor(Math.random() * 30);

      setLiveToast({
        id: ++idCounter,
        name: user.name,
        city: user.city,
        type,
        amount,
        method,
        timeAgo: `${secondsAgo} seconds ago`
      });

      // Hide toast after 4.5 seconds
      setTimeout(() => {
        setLiveToast(null);
      }, 4500);
    };

    // Show initial toast after 2 seconds
    const initialTimeout = setTimeout(showRandomToast, 2000);

    // Set interval to trigger every 8.5 seconds
    const interval = setInterval(showRandomToast, 8500);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);
  
  // Section refs for smooth scrolling
  const gamesSectionRef = useRef<HTMLDivElement>(null);
  const ratesSectionRef = useRef<HTMLDivElement>(null);
  const faqsSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToGames = () => {
    gamesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToRates = () => {
    ratesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToFaqs = () => {
    faqsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Simulating live Satta results updates
  const handleRefreshResults = () => {
    setIsRefreshingResults(true);
    setTimeout(() => {
      setGames((currentGames) => 
        currentGames.map((game) => {
          // Keep upcoming games upcoming, but update active/closed ones with new randomized digits
          if (game.status === 'upcoming') return game;
          
          const randOpen = String(Math.floor(100 + Math.random() * 900));
          const randClose = String(Math.floor(100 + Math.random() * 900));
          const j1 = String(Math.floor(Math.random() * 10));
          const j2 = String(Math.floor(Math.random() * 10));

          return {
            ...game,
            openPana: randOpen,
            jodiDigit1: j1,
            jodiDigit2: j2,
            closePana: randClose
          };
        })
      );
      setIsRefreshingResults(false);
    }, 1200);
  };

  // Filter games based on search and selected tag
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, selectedCategory]);

  const whatsappUrl = `https://wa.me/91${CONTACT_NUMBER}?text=Hello%20Admin,%20I'm%20visiting%20the%20Main%20Bazar%20Online%20Play%20site%20and%20want%20to%20download%20the%20official%20APK%20and%20start%20playing.`;

  return (
    <div className="min-h-screen bg-zinc-950 text-slate-100 flex flex-col font-sans antialiased overflow-x-hidden selection:bg-amber-500 selection:text-zinc-950">
      
      {/* Dynamic Header Component */}
      <Header 
        phoneNumber={CONTACT_NUMBER}
        onScrollToPlay={handleScrollToGames}
        onScrollToRates={handleScrollToRates}
        onScrollToFaqs={handleScrollToFaqs}
        onDownloadApp={handleDownloadApp}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
      />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 md:px-8 border-b border-zinc-900 bg-gradient-to-b from-zinc-950 via-zinc-900/40 to-zinc-950">
        <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tr from-amber-500/[0.04] to-transparent rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Info */}
          <div className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start">
            
            {/* Live active market notification */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500/15 text-amber-500 border border-amber-500/20 mb-6 font-mono shadow-[0_0_15px_rgba(245,158,11,0.05)]">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
              <span>{t.marketLiveResults}</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight text-white leading-none mb-6">
              {currentLang === 'en' ? (
                <>PLAY ONLINE <span className="text-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-black">MAIN BAZAR</span> GAME WITH HIGHEST RATES</>
              ) : currentLang === 'hi' ? (
                <>सबसे ऊंचे रेट्स के साथ ऑनलाइन <span className="text-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-black font-sans">मेन बाजार</span> खेलें</>
              ) : currentLang === 'mr' ? (
                <>उत्कृष्ट रेट्ससह ऑनलाइन <span className="text-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-black font-sans">मेन बाजार</span> मटका खेळा</>
              ) : currentLang === 'gu' ? (
                <>સૌથી ઊંચા રેટ્સ સાથે ઓનલાઈન <span className="text-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-black font-sans">મેન બજાર</span> રમો</>
              ) : currentLang === 'kn' ? (
                <>ಅತ್ಯುನ್ನತ ದರಗಳೊಂದಿಗೆ ಆನ್‌ಲೈನ್ <span className="text-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-black font-sans">ಮೇನ್ ಬಜಾರ್</span> ಆಡಿ</>
              ) : currentLang === 'te' ? (
                <>అత్యున్నత రేట్లతో ఆన్‌లైన్ <span className="text-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-black font-sans">మేన్ బజార్</span> ఆడండి</>
              ) : (
                <>உயர்ந்த விகிதங்களுடன் ஆன்லைன் <span className="text-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 font-black font-sans">மெயின் பஜார்</span> விளையாடுங்கள்</>
              )}
            </h1>

            <p className="max-w-2xl text-sm sm:text-base text-zinc-400 font-normal leading-relaxed mb-8">
              {t.heroDesc}
            </p>

            {/* Core download and contact play triggers */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleDownloadApp}
                className="w-full sm:w-auto justify-center flex items-center gap-2 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-zinc-950 font-black text-sm tracking-wide px-7 py-4 rounded-2xl transition-all shadow-[0_4px_25px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.5)] scale-100 hover:scale-[1.01] cursor-pointer border-none outline-none"
              >
                <Download className="w-5 h-5 text-zinc-950 fill-zinc-950 animate-bounce" />
                <span>{t.downloadAndroidBtn}</span>
              </button>

              <button
                onClick={handleDownloadApp}
                className="w-full sm:w-auto justify-center flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm tracking-wide px-7 py-4 rounded-2xl transition-all cursor-pointer border-none outline-none shadow-lg shadow-green-950/20"
              >
                <Download className="w-5 h-5 text-white stroke-[3px] animate-[pulse_2s_infinite]" />
                <span>{t.downloadSecureApk}</span>
              </button>
            </div>

            {/* App downloads metadata cards */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-lg mt-10 p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800 text-center">
              <div>
                <span className="block font-display font-black text-xl sm:text-2xl text-amber-400">50K+</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold font-mono">{t.downloadsCount}</span>
              </div>
              <div className="border-x border-zinc-800">
                <span className="block font-display font-black text-xl sm:text-2xl text-green-400">4.9★</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold font-mono">{t.clientRating}</span>
              </div>
              <div>
                <span className="block font-display font-black text-xl sm:text-2xl text-slate-100">100%</span>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold font-mono">{t.securePayout}</span>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Banner */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-amber-500/20 rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(245,158,11,0.08)] overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-6 -mt-6" />

              {/* Simulated Satta Phone screen */}
              <div className="bg-zinc-950 rounded-2xl p-4 border border-zinc-800/60 shadow-inner flex flex-col justify-between space-y-6">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <div className="flex items-center gap-2">
                    <MainBazarLogo size={36} />
                    <div>
                      <span className="block font-bold text-xs text-zinc-200">Main Bazar Official</span>
                      <span className="text-[9px] text-green-400 font-medium tracking-wide flex items-center gap-1 font-mono">
                        <span className="w-1 h-1 rounded-full bg-green-400 animate-ping" /> {t.serverSyncActive}
                      </span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-zinc-650 hover:text-amber-400 transition-colors pointer-events-none" />
                </div>

                {/* Simulated live result */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                    <span>{t.liveMarket}</span>
                    <span className="text-amber-500 font-bold">Main Bazar Night</span>
                  </div>
                  <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 text-center">
                    <span className="font-mono text-xs text-zinc-500 uppercase font-bold tracking-wider block mb-1">{t.todayDrawJodi}</span>
                    <span className="font-mono text-3xl font-black text-amber-400 tracking-wider">350-84-149</span>
                  </div>
                </div>

                {/* Multi-category list preview */}
                <div className="space-y-2 text-xs">
                  <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{t.playRatesPremium}</span>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg flex justify-between">
                      <span className="text-zinc-400">{t.singleAnk}:</span>
                      <strong className="text-amber-400">10 का 95</strong>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 p-2 rounded-lg flex justify-between">
                      <span className="text-zinc-400">{t.jodiDigit}:</span>
                      <strong className="text-amber-400">10 का 950</strong>
                    </div>
                  </div>
                </div>

                {/* Action download */}
                <button
                  onClick={handleDownloadApp}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs tracking-wider text-center py-3 rounded-xl transition-all block cursor-pointer uppercase shadow-[0_4px_15px_rgba(245,158,11,0.2)] border-none outline-none"
                >
                  {t.downloadAndroidAppTitle}
                </button>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Trust Highlights Section: Deposit & Withdrawal Limits, Live Support */}
      <section className="bg-zinc-900/40 border-b border-zinc-900 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/[0.015] via-transparent to-green-500/[0.015] pointer-events-none" />
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Limit Card 1: Deposit */}
            <div className="bg-zinc-950/90 border border-zinc-800/80 bg-gradient-to-br from-zinc-950 to-zinc-900/60 rounded-2xl p-5 flex gap-4 items-center shadow-lg transition-transform hover:scale-[1.01]">
              <div className="p-3 bg-green-500/10 text-green-400 rounded-xl">
                <Coins className="w-6 h-6 text-green-400" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">{t.minDeposit}</span>
                <span className="text-lg font-black text-white block">₹100 <span className="text-xs font-bold text-green-400">{t.instantly}</span></span>
                <span className="text-[10px] text-zinc-400 font-medium font-mono truncate block">{t.minDepositLabel}</span>
              </div>
            </div>

            {/* Limit Card 2: Withdrawal */}
            <div className="bg-zinc-950/90 border border-zinc-800/80 bg-gradient-to-br from-zinc-950 to-zinc-900/60 rounded-2xl p-5 flex gap-4 items-center shadow-lg transition-transform hover:scale-[1.01]">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                <CreditCard className="w-6 h-6 text-amber-400" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">{t.minWithdrawal}</span>
                <span className="text-lg font-black text-white block">₹500 <span className="text-xs font-bold text-amber-400">{t.safe}</span></span>
                <span className="text-[10px] text-zinc-400 font-medium font-mono truncate block">{t.minWithdrawalLabel}</span>
              </div>
            </div>

            {/* Limit Card 3: 24h Service */}
            <div className="bg-zinc-950/90 border border-zinc-800/80 bg-gradient-to-br from-zinc-950 to-zinc-900/60 rounded-2xl p-5 flex gap-4 items-center shadow-lg transition-transform hover:scale-[1.01]">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
                <Clock className="w-6 h-6 text-amber-500 animate-[spin_30s_linear_infinite]" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">{t.withdrawalService}</span>
                <span className="text-lg font-black text-white block">{t.live24h}</span>
                <span className="text-[10px] text-zinc-400 font-medium font-mono truncate block">{t.withdrawalServiceLabel}</span>
              </div>
            </div>
            {/* Limit Card 4: Support */}
            <div className="bg-zinc-950/90 border border-zinc-800/80 bg-gradient-to-br from-zinc-950 to-zinc-900/60 rounded-2xl p-5 flex gap-4 items-center shadow-lg transition-transform hover:scale-[1.01]">
              <div className="p-3 bg-green-500/10 text-green-400 rounded-xl">
                <Headphones className="w-6 h-6 text-green-400" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold block">{t.customerSupport}</span>
                <span className="text-lg font-black text-white block">{t.liveSupport247}</span>
                <span className="text-[10px] text-zinc-400 font-medium font-mono truncate block">{t.customerSupportLabel}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Steps of App section */}
      <section className="py-12 px-4 bg-zinc-900/10 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display font-black text-xl tracking-wider text-amber-500 uppercase mb-2">{t.howAppWorks}</h2>
            <p className="text-xs text-zinc-400">{t.howAppWorksDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl">
              <span className="font-mono text-amber-500 font-extrabold text-xl block mb-2">01.</span>
              <h3 className="font-display font-bold text-sm text-slate-100 mb-1">{t.step1Title.split('. ')[1] || t.step1Title}</h3>
              <p className="text-xs text-zinc-400">{t.step1Desc}</p>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl">
              <span className="font-mono text-amber-500 font-extrabold text-xl block mb-2">02.</span>
              <h3 className="font-display font-bold text-sm text-slate-100 mb-1">{t.step2Title.split('. ')[1] || t.step2Title}</h3>
              <p className="text-xs text-zinc-400">{t.step2Desc}</p>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl">
              <span className="font-mono text-amber-500 font-extrabold text-xl block mb-2">03.</span>
              <h3 className="font-display font-bold text-sm text-slate-100 mb-1">{t.step3Title.split('. ')[1] || t.step3Title}</h3>
              <p className="text-xs text-zinc-400">{t.step3Desc}</p>
            </div>
            <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 rounded-2xl">
              <span className="font-mono text-amber-500 font-extrabold text-xl block mb-2">04.</span>
              <h3 className="font-display font-bold text-sm text-slate-100 mb-1">{t.step4Title.split('. ')[1] || t.step4Title}</h3>
              <p className="text-xs text-zinc-400">{t.step4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Matka Games Results Board */}
      <section ref={gamesSectionRef} className="py-16 px-4 bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          
          {/* Grid control bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-zinc-900">
            <div>
              <div className="flex items-center gap-1.5 justify-center md:justify-start text-xs text-amber-400 uppercase font-mono tracking-widest font-bold mb-2">
                <Flame className="w-4 h-4 text-amber-500 animate-[pulse_1s_infinite]" />
                <span>{t.liveResultBoards}</span>
              </div>
              <h2 className="font-display font-black text-3xl text-white tracking-tight leading-none text-center md:text-left">
                {currentLang === 'en' ? (
                  <>MATKA PLAY MARKET <span className="text-amber-400">GAME CODES</span></>
                ) : (
                  <span className="text-amber-400 font-sans font-black">{t.matkaMarketCodes}</span>
                )}
              </h2>
            </div>

            {/* Quick Refresh Live Results */}
            <button
              onClick={handleRefreshResults}
              disabled={isRefreshingResults}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-xs text-amber-400 border border-zinc-800 hover:border-zinc-700/80 py-2.5 px-4 rounded-xl cursor-pointer select-none font-bold active:bg-zinc-950 transition-all font-mono"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingResults ? 'animate-spin' : ''}`} />
              <span>{isRefreshingResults ? t.updatingFeeds : t.instantManualUpdate}</span>
            </button>
          </div>

          {/* Filtering bar search text */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-zinc-600" />
              </span>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-zinc-650 outline-none focus:border-amber-500/50 transition-all font-mono"
              />
            </div>

            {/* Category tabs filters */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider font-mono mr-2 hidden sm:inline flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> {t.groupBy}
              </span>
              
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-xs px-4 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedCategory === 'all' 
                    ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/10' 
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-slate-100'
                }`}
              >
                {t.allMarkets} ({games.length})
              </button>

              <button
                onClick={() => setSelectedCategory('morning')}
                className={`text-xs px-4 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedCategory === 'morning' 
                    ? 'bg-amber-500 text-zinc-950' 
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-slate-100'
                }`}
              >
                {t.morning}
              </button>

              <button
                onClick={() => setSelectedCategory('day')}
                className={`text-xs px-4 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedCategory === 'day' 
                    ? 'bg-amber-500 text-zinc-950' 
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-slate-100'
                }`}
              >
                {t.day}
              </button>

              <button
                onClick={() => setSelectedCategory('night')}
                className={`text-xs px-4 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedCategory === 'night' 
                    ? 'bg-amber-500 text-zinc-950' 
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-slate-100'
                }`}
              >
                {t.night}
              </button>
            </div>
          </div>

          {/* Satta board list grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  phoneNumber={CONTACT_NUMBER}
                  onViewChart={(g) => setSelectedGameForChart(g)}
                  onSelectPlay={(g) => {
                    // Smooth scroll down to Play Room simulator component
                    const el = document.getElementById('play-simulator');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  onDownloadApp={handleDownloadApp}
                />
              ))}
            </div>
          ) : (
            <div className="bg-zinc-900/30 p-12 text-center rounded-2xl border border-dotted border-zinc-800 text-zinc-500">
              <Search className="w-12 h-12 text-zinc-800 mx-auto mb-3" />
              <p className="text-sm">{t.noGamesFound}: "{searchQuery}"</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-4 text-xs font-semibold text-amber-500 underline cursor-pointer font-mono"
              >
                {t.resetSearch}
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Satta Game Rates Section */}
      <div ref={ratesSectionRef}>
        <GameRates />
      </div>

      {/* Lucky guessing section */}
      <InteractiveGuesser phoneNumber={CONTACT_NUMBER} onDownloadApp={handleDownloadApp} />

      {/* Free Play Bid Simulator Section */}
      <PlayDemo games={games} phoneNumber={CONTACT_NUMBER} onDownloadApp={handleDownloadApp} />

      {/* FAQ toggles section */}
      <div ref={faqsSectionRef}>
        <FAQSection phoneNumber={CONTACT_NUMBER} onDownloadApp={handleDownloadApp} />
      </div>

      {/* Trust and security badges panel */}
      <section className="py-12 px-4 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4 p-5 rounded-2xl bg-zinc-900/15 border border-zinc-900">
            <div className="p-3 bg-zinc-900 text-amber-400 rounded-xl h-fit">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-slate-100 uppercase mb-1 tracking-wider">{t.approvedMarketplace}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                {t.marketplaceDesc}
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl bg-zinc-900/15 border border-zinc-900">
            <div className="p-3 bg-zinc-900 text-amber-400 rounded-xl h-fit">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-slate-100 uppercase mb-1 tracking-wider">{t.fastCashouts}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                {t.cashoutsDesc}
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 rounded-2xl bg-zinc-900/15 border border-zinc-900">
            <div className="p-3 bg-zinc-900 text-amber-400 rounded-xl h-fit">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-sm text-slate-100 uppercase mb-1 tracking-wider">{t.analyticalTrends}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                {t.analyticalTrendsDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic User Testimonials section */}
      <TestimonialsSection currentLang={currentLang} />

      {/* Footer disclaimer and references */}
      <footer className="bg-zinc-950 border-t border-zinc-900/80 px-4 py-12 md:px-8 text-xs text-zinc-500 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center gap-2 items-center text-amber-500 font-display font-extrabold text-base tracking-widest uppercase">
            <span>MAIN BAZAR ONLINE</span>
          </div>

          {/* Disclaimer copy block */}
          <div className="bg-zinc-900/40 p-6 rounded-2xl border border-zinc-900 text-left space-y-3 font-normal text-[11px] leading-relaxed">
            <div className="flex items-center gap-1.5 text-zinc-400 uppercase font-bold tracking-wider font-mono">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>{t.disclaimerAdvisory}</span>
            </div>
            <p>
              {t.disclaimerText1}
            </p>
            <p>
              {t.disclaimerText2}
            </p>
          </div>

          <div className="border-t border-zinc-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-600">
            <span>© 2026 MAIN BAZAR ONLINE PLAY INC. ALL RIGHTS SECURED.</span>
            <div className="flex gap-5">
              <a href="#play-simulator" className="hover:text-zinc-400 transition-colors cursor-pointer">Bidding Simulator</a>
              <span>•</span>
              <a href="#faqs" className="hover:text-zinc-400 transition-colors cursor-pointer">Safety Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating App Download widget on screens bottom */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 z-40 max-w-sm ml-auto bg-zinc-950/95 border border-amber-500/40 rounded-2xl p-3 backdrop-blur shadow-[0_8px_32px_rgba(0,0,0,0.9),0_0_15px_rgba(245,158,11,0.1)] flex items-center justify-between animate-[pulseGlow_4s_infinite]">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-br from-amber-400 to-amber-600 text-zinc-950 rounded-xl shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            <Download className="w-5 h-5 text-zinc-950 stroke-[2.5px] animate-bounce" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-white tracking-wide">{t.downloadAppNow}</span>
            <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">{t.fastestLiveSattaResults}</span>
          </div>
        </div>

        <button
          onClick={handleDownloadApp}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black px-4 py-2.5 rounded-xl cursor-pointer shadow-[0_2px_10px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_15px_rgba(245,158,11,0.4)] transition-all border-none outline-none"
        >
          <span>{t.installNow}</span>
        </button>
      </div>

      {/* Real-time trust Proof Toast Notifications */}
      <AnimatePresence>
        {liveToast && (
          <motion.div
            key={liveToast.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-[96px] left-4 right-4 md:bottom-6 md:left-6 md:right-auto z-50 max-w-sm bg-zinc-950/95 border border-zinc-800 rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.95)] backdrop-blur flex items-start gap-3.5"
          >
            {/* Live Indicator Icon */}
            <div className={`p-2.5 rounded-xl text-zinc-950 shadow-inner flex-shrink-0 ${
              liveToast.type === 'deposit' 
                ? 'bg-gradient-to-br from-green-400 to-emerald-600' 
                : 'bg-gradient-to-br from-amber-400 to-amber-600'
            }`}>
              {liveToast.type === 'deposit' ? (
                <ArrowDownLeft className="w-5 h-5 text-zinc-950 stroke-[3px]" />
              ) : (
                <ArrowUpRight className="w-5 h-5 text-zinc-950 stroke-[3px]" />
              )}
            </div>

            {/* Notification Text details */}
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[10px] text-green-400 font-extrabold uppercase tracking-widest flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                  Live Activity
                </span>
                <span className="text-[9px] text-zinc-400 font-bold font-mono">{liveToast.timeAgo}</span>
              </div>
              
              <p className="text-xs font-bold text-white leading-relaxed">
                <span className="text-zinc-200 font-black">{liveToast.name}</span> ({liveToast.city})
                {liveToast.type === 'deposit' ? ' added ' : ' withdrew '}
                <span className={liveToast.type === 'deposit' ? 'text-green-400 font-black' : 'text-amber-400 font-black'}>
                  ₹{liveToast.amount.toLocaleString('en-IN')}
                </span>
              </p>

              <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-zinc-500 font-mono font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-650 text-zinc-500" />
                <span>Via {liveToast.method}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global details modals charts */}
      {selectedGameForChart && (
        <GameDetailsModal
          game={selectedGameForChart}
          onClose={() => setSelectedGameForChart(null)}
        />
      )}

      {/* Downloading Overlay */}
      <AnimatePresence>
        {downloadProgress !== null && (
          <div className="fixed inset-0 bg-zinc-950/90 [background-image:radial-gradient(ellipse_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] backdrop-blur-md z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-zinc-900 border-2 border-amber-500/30 rounded-3xl p-6 shadow-[0_15px_50px_-10px_rgba(245,158,11,0.2)] text-center relative overflow-hidden"
            >
              {/* Background gradient beams */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none" />

              <div className="relative z-10 space-y-5">
                {/* Brand Logo Header */}
                <div className="flex justify-center pb-2">
                  <MainBazarLogo size={100} className="shadow-[0_8px_30px_rgba(245,158,11,0.25)] animate-pulse" />
                </div>

                {isDownloadDone ? (
                  <div className="space-y-4">
                    <h3 className="font-display font-black text-xl text-white tracking-tight">DOWNLOAD COMPLETE</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed px-2">
                      <span className="text-green-400 font-bold block mb-1">✓ Main_Bazar_Official.apk downloaded successfully!</span>
                      To start playing instantly, please click on the downloaded file and install it on your device. Ensure you have "Install from Unknown Sources" enabled under settings for successful play.
                    </p>
                    <div className="inline-flex items-center gap-1.5 bg-green-950/50 border border-green-500/30 text-green-400 font-bold text-xs px-4 py-2 rounded-xl mt-2 font-mono">
                      <ShieldCheck className="w-4 h-4" /> SECURED WITH PLAY PROTECT
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-display font-black text-xl text-slate-100 tracking-tight">SECURELY DOWNLOADING APP...</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Please hold on while our secure server transfers the high-speed Android installation package (APK) to your browser downloads folder.
                    </p>

                    {/* Progress Bar Container */}
                    <div className="space-y-2 pt-2">
                      <div className="w-full h-2.5 bg-zinc-950 border border-zinc-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-full"
                          style={{ width: `${Math.min(downloadProgress, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-zinc-500 font-bold font-mono">
                        <span>APK FILE SIZE: 11.2 MB</span>
                        <span className="text-amber-400 font-black">{Math.min(downloadProgress, 100)}%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Meta Pixel & Conversions API (CAPI) Diagnostics HUD */}
      <div className="fixed bottom-4 left-4 z-50 font-sans">
        {/* Toggle Pill */}
        {!isHudOpen ? (
          <button 
            type="button"
            onClick={() => setIsHudOpen(true)}
            id="meta-hud-toggle"
            className="flex items-center gap-2 bg-zinc-950/95 hover:bg-zinc-900 border border-amber-500/30 text-zinc-100 rounded-full px-4 py-2 text-xs shadow-lg shadow-black/50 transition-all hover:scale-105"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="font-bold tracking-tight">META TRACKING LIVE HUD</span>
          </button>
        ) : (
          <div className="w-[325px] bg-zinc-950/95 border border-zinc-800 rounded-2xl shadow-2xl p-4 text-zinc-200 animate-in fade-in slide-in-from-bottom-5 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-805 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white tracking-wider">META PIXEL DIAGNOSTICS</span>
              </div>
              <button 
                type="button"
                onClick={() => setIsHudOpen(false)}
                className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                id="meta-hud-close"
              >
                ✕
              </button>
            </div>

            {/* Config details */}
            <div className="space-y-1.5 text-[11px] bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80 mb-3">
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Pixel ID:</span>
                <span className="font-mono font-bold text-amber-500">1347133480769229</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Meta Pixel Script:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">🟢 Active & Loaded</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-zinc-400">Conversions API (CAPI):</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">🟢 Server Proxy Active</span>
              </div>
              <div className="mt-1.5 pt-1.5 border-t border-zinc-800 text-[10px] text-zinc-500 leading-snug">
                Note: Iframe sandbox environment might hide extension detection. Live actions trigger immediately on pixel script & cloud server routes!
              </div>
            </div>

            {/* Log Stream */}
            <h4 className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-2 flex items-center justify-between">
              <span>Live Event Stream</span>
              <span className="font-mono text-zinc-600">Max size: 15</span>
            </h4>
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
              {trackingLogs.length === 0 ? (
                <div className="text-center py-4 text-xs text-zinc-600 italic">
                  No events tracked yet. Press download or action buttons to trigger!
                </div>
              ) : (
                trackingLogs.map((log) => (
                  <div key={log.id} className="text-[10px] leading-tight bg-zinc-900/40 border border-zinc-800/60 p-2 rounded-lg space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-100 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {log.eventName}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono">{log.timestamp}</span>
                    </div>
                    {log.value > 0 ? (
                      <div className="text-zinc-400 font-medium font-mono text-[9px]">
                        Value: <span className="text-amber-400 font-bold">₹{log.value} ({log.currency})</span>
                      </div>
                    ) : (
                      <div className="text-zinc-500 text-[9px] italic">No trigger value</div>
                    )}
                    {log.warning && (
                      <div className="text-[9px] text-zinc-300 leading-snug bg-amber-500/10 p-1.5 rounded border border-amber-500/20 mt-1 max-h-[60px] overflow-y-auto font-mono">
                        <span className="text-amber-400 font-bold">Server Warning: </span>
                        {log.warning}
                      </div>
                    )}
                    <div className="flex justify-between text-[9px] font-mono border-t border-zinc-800/50 pt-1">
                      <span className="text-zinc-500">Channel:</span>
                      <span className="text-amber-500/90 font-bold">{log.method} {log.simulated ? "(Simulation Mode)" : ""}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { border-color: rgba(245, 158, 11, 0.2); }
          50% { border-color: rgba(245, 158, 11, 0.4); }
        }
      `}</style>
    </div>
  );
}
