import React, { useState, useEffect, useRef } from 'react';
import { Phone, MessageCircle, Download, Flame, Clock, Globe, ChevronDown } from 'lucide-react';
import { MainBazarLogo } from './MainBazarLogo';
import { Language, LANGUAGES, translations } from '../translations';

interface HeaderProps {
  phoneNumber: string;
  onScrollToPlay: () => void;
  onScrollToRates: () => void;
  onScrollToFaqs: () => void;
  onDownloadApp: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  phoneNumber,
  onScrollToPlay,
  onScrollToRates,
  onScrollToFaqs,
  onDownloadApp,
  currentLang,
  onLanguageChange,
}) => {
  const [time, setTime] = useState<string>('');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLangConfig = LANGUAGES.find(l => l.code === currentLang) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/95 border-b border-amber-500/20 backdrop-blur-md">
      {/* Ticker marquee */}
      <div className="w-full bg-amber-500 text-zinc-950 font-bold py-1 px-4 text-[11px] overflow-hidden select-none">
        <div className="flex animate-[marquee_28s_linear_infinite] whitespace-nowrap gap-12">
          <span>{t.tickerWelcome}</span>
          <span>{t.tickerSuccess}</span>
          <span>{t.tickerDesc}</span>
          {/* Duplicate to handle seamless marquee wrapping */}
          <span>{t.tickerWelcome}</span>
          <span>{t.tickerSuccess}</span>
          <span>{t.tickerDesc}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand/Logo */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <MainBazarLogo size={52} />
            <div className="absolute -top-1 -right-1 flex h-3.5 w-3.5 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-500"></span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-lg sm:text-2xl tracking-wider text-amber-400 bg-clip-text">
              {t.mainBazarOnline.split(' ')[0]} {t.mainBazarOnline.split(' ')[1] || 'BAZAR'}
            </span>
            <span className="text-[10px] text-zinc-400 tracking-widest uppercase font-semibold">
              {t.officialPlayPortal}
            </span>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
          <button
            onClick={onScrollToPlay}
            className="hover:text-amber-400 cursor-pointer transition-colors"
          >
            {t.playGame}
          </button>
          <button
            onClick={onScrollToRates}
            className="hover:text-amber-400 cursor-pointer transition-colors"
          >
            {t.gameRates}
          </button>
          <button
            onClick={onScrollToFaqs}
            className="hover:text-amber-400 cursor-pointer transition-colors"
          >
            {t.faqs}
          </button>
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-xs text-amber-500">
            <Clock className="w-3.5 h-3.5 animate-[spin_40s_linear_infinite]" />
            <span className="font-mono font-medium">{time || 'LIVE'} IST</span>
          </div>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-2 bg-zinc-950 hover:bg-zinc-900 border border-zinc-850 px-3 py-2.5 rounded-xl text-xs font-bold text-zinc-200 transition-all cursor-pointer outline-none active:scale-[0.98]"
            >
              <span className="text-base">{selectedLangConfig.flag}</span>
              <span className="hidden sm:inline-block font-mono tracking-tight">{selectedLangConfig.nativeName}</span>
              <span className="sm:hidden inline-block uppercase font-mono">{selectedLangConfig.code}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-1.5 z-55 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 border-b border-zinc-800 text-[10px] font-bold text-zinc-500 tracking-wider uppercase flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-amber-500" />
                  <span>Choose Language</span>
                </div>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsLangDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-zinc-850 cursor-pointer ${
                      currentLang === lang.code 
                        ? 'text-amber-400 font-extrabold bg-amber-500/5' 
                        : 'text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </div>
                    {currentLang === lang.code && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* App Download Header Button */}
          <button
            onClick={onDownloadApp}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] text-zinc-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer select-none outline-none border-none animate-[pulseGlow_4s_infinite]"
          >
            <Download className="w-4 h-4 text-zinc-950 stroke-[3px] animate-bounce" />
            <span className="hidden sm:inline">{t.downloadAppButton}</span>
            <span className="sm:hidden">{t.downloadAppButton.split(' ')[0]}</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </header>
  );
};
