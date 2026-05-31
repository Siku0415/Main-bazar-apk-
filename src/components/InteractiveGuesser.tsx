import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, MessageCircle, RefreshCw, Star, Info, Download } from 'lucide-react';
import { ALL_GAMES } from '../gamesData';

interface InteractiveGuesserProps {
  phoneNumber: string;
  onDownloadApp: () => void;
}

export const InteractiveGuesser: React.FC<InteractiveGuesserProps> = ({ phoneNumber, onDownloadApp }) => {
  const [userName, setUserName] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<string>('KALYAN');
  const [luckyNumber, setLuckyNumber] = useState<number | string>('');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [results, setResults] = useState<{
    single: string;
    jodi: string;
    pana: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setIsCalculating(true);
    setResults(null);

    // Simulate matrix number rolling
    let count = 0;
    const interval = setInterval(() => {
      setLuckyNumber(Math.floor(Math.random() * 10));
      count++;
      if (count > 15) {
        clearInterval(interval);
        
        // Deterministic generation based on userName + gameName seed
        const seedValue = userName.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0) + selectedGame.split('').reduce((sum, c) => sum + c.charCodeAt(0), 0);
        
        const singleAnk = String((seedValue * 7) % 10);
        const jodi = `${(seedValue * 3) % 10}${(seedValue * 9) % 10}`;
        const p1 = (seedValue * 2) % 6 + 1;
        const p2 = (seedValue * 4) % 6 + 2;
        const p3 = (seedValue * 8) % 6 + 3;
        const pana = `${Math.min(p1, p2, p3)}${7 - Math.min(p1, p2, p3)}${9}`; // make authentic ascending pana

        setResults({
          single: singleAnk,
          jodi: jodi,
          pana: pana
        });
        
        setLuckyNumber(singleAnk);
        setIsCalculating(false);
      }
    }, 100);
  };

  const shareText = results 
    ? `Hello Admin, my calculated Main Bazar lucky number is Single Ank: ${results.single}, Jodi: ${results.jodi}, Pana: ${results.pana} for market: ${selectedGame}. I want to load points and play this prediction instantly!`
    : '';

  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(shareText)}`;

  return (
    <section className="relative overflow-hidden py-16 px-4 bg-zinc-950/40 border-y border-zinc-900">
      <div className="absolute top-0 right-[20%] w-60 h-60 bg-amber-500/[0.01] rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-zinc-950/80 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        {/* Glowing badge */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl translate-x-10 -translate-y-10" />

        <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
          {/* Left panel info */}
          <div className="max-w-md">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-4 font-mono">
              <Star className="w-3.5 h-3.5" />
              <span>KALYAN CHART ANALYTICS</span>
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-none mb-3">
              LOCATE YOUR <span className="text-amber-400">LUCKY NUMBER</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed mb-6">
              Empowered by structural Satta numerology and Kalyan panel records! Type in your profile name, select your desired market window, and let our simulator find the high-probability digit parameters of the day.
            </p>

            {/* Displaying Live Simulation Results */}
            {results && (
              <div className="p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 mt-5 relative animate-[fadeIn_0.3s_ease-out]">
                <div className="absolute right-3 top-3 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </div>
                <h4 className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-bold mb-3">Your Calculated Digits for {selectedGame}</h4>
                
                <div className="grid grid-cols-3 gap-3 text-center mb-4">
                  <div className="bg-zinc-900/80 border border-zinc-800 p-2.5 rounded-xl">
                    <span className="text-[9px] text-zinc-500 font-semibold block uppercase">Single Digit</span>
                    <span className="text-lg font-bold text-amber-400 font-mono">{results.single}</span>
                  </div>
                  <div className="bg-zinc-900/80 border border-zinc-800 p-2.5 rounded-xl">
                    <span className="text-[9px] text-zinc-500 font-semibold block uppercase">Lucky Jodi</span>
                    <span className="text-lg font-bold text-green-400 font-mono">{results.jodi}</span>
                  </div>
                  <div className="bg-zinc-900/80 border border-zinc-800 p-2.5 rounded-xl">
                    <span className="text-[9px] text-zinc-500 font-semibold block uppercase">Open Pana</span>
                    <span className="text-lg font-bold text-rose-400 font-mono">{results.pana}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onDownloadApp}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs py-2.5 px-4 rounded-xl transition-all cursor-pointer outline-none border-none"
                >
                  <Download className="w-4 h-4 text-zinc-950 stroke-[3px] animate-bounce" />
                  <span>Download App To Bid This Digit</span>
                </button>
              </div>
            )}
          </div>

          {/* Right panel interactive form */}
          <div className="w-full max-w-sm bg-zinc-950/80 border border-zinc-800 p-6 rounded-2xl">
            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wide">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-zinc-600 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wide">
                  Target Satta Market
                </label>
                <select
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none transition-all cursor-pointer"
                >
                  <option value="MAIN BAZAR">MAIN BAZAR (9:40 PM)</option>
                  <option value="KALYAN">KALYAN (3:55 PM)</option>
                  <option value="SRIDEVI">SRIDEVI (11:35 AM)</option>
                  <option value="TIME BAZAR">TIME BAZAR (1:00 PM)</option>
                  <option value="RAJDHANI DAY">RAJDHANI DAY (3:00 PM)</option>
                  <option value="MILAN NIGHT">MILAN NIGHT (9:00 PM)</option>
                </select>
              </div>

              {/* Number roller showcase */}
              <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
                <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mb-2">Lucky Satta Engine Feed</span>
                <div className={`w-14 h-14 flex items-center justify-center rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-3xl font-extrabold ${isCalculating ? 'text-amber-500 animate-[pulse_0.5s_infinite]' : 'text-slate-300'}`}>
                  {luckyNumber !== '' ? luckyNumber : '?'}
                </div>
              </div>

              <button
                type="submit"
                disabled={isCalculating || !userName.trim()}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-zinc-950 font-extrabold text-sm rounded-xl transition-all shadow-[0_4px_12px_rgba(245,158,11,0.2)] hover:shadow-[0_6px_18px_rgba(245,158,11,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" />
                    <span>Analyzing Panel Sequence...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-zinc-950 fill-zinc-950" />
                    <span>Calculate Lucky Satta Digits</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
