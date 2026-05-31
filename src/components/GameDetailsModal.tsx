import React from 'react';
import { X, Calendar, RefreshCw, FileText, ChevronRight } from 'lucide-react';
import { Game } from '../types';
import { generateHistory } from '../gamesData';

interface GameDetailsModalProps {
  game: Game | null;
  onClose: () => void;
}

export const GameDetailsModal: React.FC<GameDetailsModalProps> = ({ game, onClose }) => {
  if (!game) return null;

  const history = generateHistory(game.name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm transition-opacity" 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl overflow-hidden bg-zinc-900 border border-zinc-800 rounded-3xl shadow-[0_10px_50px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.1)] flex flex-col max-h-[85vh] animate-[scaleIn_0.2s_ease-out]">
        
        {/* Banner header glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-400" />

        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-1 text-[10px] text-amber-500 font-mono tracking-widest uppercase font-bold mb-1">
              <span>Historical Panel Registry</span>
              <ChevronRight className="w-3 h-3 text-amber-500" />
              <span>LIVE</span>
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>{game.name} Chart Records</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-1.5 hover:p-1 hover:px-1.5 rounded-xl block cursor-pointer border border-zinc-800 hover:border-zinc-700 bg-zinc-950 text-zinc-400 hover:text-white transition-all"
            aria-label="Close chart modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Contents */}
        <div className="p-6 md:p-8 overflow-y-auto no-scrollbar flex-1 bg-zinc-900/40">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800/60 text-center">
              <span className="text-[10px] text-zinc-500 font-medium uppercase font-mono tracking-wider block mb-1">Market Window</span>
              <span className="text-sm font-semibold text-zinc-200">{game.openTime} - {game.closeTime}</span>
            </div>
            <div className="bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800/60 text-center">
              <span className="text-[10px] text-zinc-500 font-medium uppercase font-mono tracking-wider block mb-1">Today's Open Pana</span>
              <span className="text-sm font-semibold text-amber-500 font-mono">{game.openPana}</span>
            </div>
            <div className="bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800/60 text-center">
              <span className="text-[10px] text-zinc-500 font-medium uppercase font-mono tracking-wider block mb-1">Today's Jodi Digit</span>
              <span className="text-sm font-semibold text-amber-400 font-mono bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">{game.jodiDigit1}{game.jodiDigit2}</span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 mb-4 font-normal leading-relaxed">
            Historical chart patterns display previous sequential dates and results. These records help identify guessing trends for <strong className="text-amber-400">{game.name}</strong>, enhancing accuracy of numbers prediction.
          </p>

          {/* Table */}
          <div className="overflow-hidden border border-zinc-800 bg-zinc-950/50 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 text-[10px] text-zinc-500 font-mono uppercase tracking-widest border-b border-zinc-800">
                  <th className="py-3 px-4 flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-zinc-600" /> Date</th>
                  <th className="py-3 px-3 text-center">Open Pana</th>
                  <th className="py-3 px-3 text-center">Jodi Pair</th>
                  <th className="py-3 px-3 text-center">Close Pana</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 font-mono text-sm">
                {history.map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3 px-4 text-zinc-400 text-xs">{row.date}</td>
                    <td className="py-3 px-3 text-center text-zinc-300 font-medium">{row.openPana}</td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-block bg-amber-500/5 text-amber-400 border border-amber-500/15 font-bold px-2.5 py-0.5 rounded">
                        {row.jodi}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center text-zinc-300 font-medium">{row.closePana}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer actions */}
        <div className="bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-5 border-t border-zinc-800">
          <span className="text-[11px] text-zinc-500 font-medium flex items-center gap-1 font-mono">
            <RefreshCw className="w-3 h-3 text-zinc-600 animate-spin" />
            Automatic update syncing...
          </span>
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 font-semibold text-xs text-zinc-200 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
