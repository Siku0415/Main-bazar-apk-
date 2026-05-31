import React from 'react';
import { Award, Coins, HelpCircle, Flame, Star } from 'lucide-react';
import { GAME_RATES } from '../gamesData';

export const GameRates: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-16 px-4 bg-zinc-950">
      {/* Background graphic elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-3 font-mono">
            <Star className="w-3.5 h-3.5" />
            <span>Highest Market Rates</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-white mb-4">
            MAIN BAZAR <span className="text-amber-400">GAME RATES</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            We offer the most transparent, honest, and high-yielding returns in the entire marketplace. Play with points and secure amazing payouts instantly to your account.
          </p>
        </div>

        {/* Rates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAME_RATES.map((rate) => {
            const isSangam = rate.id.includes('sangam');
            return (
              <div
                key={rate.id}
                className={`relative group overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950/80 border ${
                  isSangam 
                    ? 'border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.15)] md:col-span-1 lg:col-span-1' 
                    : 'border-zinc-800'
                } hover:border-amber-500/40 rounded-3xl p-6 transition-all duration-300 hover:translate-y-[-4px] flex flex-col justify-between`}
              >
                {/* Accent glow on hover */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/[0.03] rounded-full blur-2xl group-hover:bg-amber-500/[0.06] transition-all" />

                <div>
                  {/* Card Header & Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${
                        isSangam ? 'bg-amber-500/15 text-amber-400' : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        <Coins className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-zinc-100 tracking-wide">
                        {rate.title}
                      </h3>
                    </div>
                    
                    {/* Ratio badge */}
                    <span className="font-mono text-[11px] font-semibold text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-lg">
                      {rate.ratio}
                    </span>
                  </div>

                  {/* Highlighting Payout */}
                  <div className="my-5 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-900 text-center relative overflow-hidden">
                    {/* Shimmer background line */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/[0.03] to-transparent animate-[shimmer_2s_infinite]" />
                    
                    <span className="text-[11px] text-zinc-500 font-medium font-mono uppercase tracking-wider block mb-0.5">
                      Guaranteed Return
                    </span>
                    <span className="font-display font-black text-2xl sm:text-3xl text-amber-400 tracking-wide drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">
                      {rate.payout}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {rate.description}
                  </p>
                </div>

                {/* Trust icon tag */}
                <div className="mt-5 flex items-center gap-1.5 text-[10px] text-zinc-500 font-mono font-medium border-t border-zinc-900 pt-4">
                  <Award className="w-3.5 h-3.5 text-amber-500/70" />
                  <span>Verified Instant Payout System</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick FAQ info callout */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zinc-800 rounded-2xl text-amber-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-slate-100">Have questions about calculate mathematical returns?</h4>
              <p className="text-xs text-zinc-400 mt-1">If you have customized combinations or bulk tickets, chat with the administrator.</p>
            </div>
          </div>
          <a
            href="#faqs"
            className="w-full md:w-auto px-5 py-2.5 text-center bg-zinc-900 hover:bg-zinc-800 font-semibold text-xs text-zinc-300 border border-zinc-800 rounded-xl transition-all cursor-pointer"
          >
            Read Payout FAQs
          </a>
        </div>

      </div>
    </section>
  );
};
