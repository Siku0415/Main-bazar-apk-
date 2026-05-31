import React from 'react';
import { Clock, Play, TrendingUp, Sparkles, MessageCircle, Download } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onViewChart: (game: Game) => void;
  onSelectPlay: (game: Game) => void;
  phoneNumber: string;
  onDownloadApp: () => void;
}

export const GameCard: React.FC<GameCardProps> = ({
  game,
  onViewChart,
  onSelectPlay,
  phoneNumber,
  onDownloadApp,
}) => {
  const isClosed = game.status === 'closed';
  const isUpcoming = game.status === 'upcoming';
  const isActive = game.status === 'active';

  const formatResult = () => {
    if (isUpcoming) {
      return (
        <div className="flex items-center gap-1.5 justify-center py-2 text-zinc-500 font-mono text-2xl tracking-widest bg-zinc-950/60 rounded-xl px-4 border border-zinc-900">
          <span>***</span>
          <span className="text-zinc-700 text-lg">-</span>
          <span className="text-zinc-600 bg-zinc-900 border border-zinc-800 px-2 rounded font-bold">**</span>
          <span className="text-zinc-700 text-lg">-</span>
          <span>***</span>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1.5 justify-center py-2 font-mono text-2xl tracking-widest bg-zinc-950/50 rounded-xl px-4 border border-zinc-900">
        <span className="text-zinc-300 font-medium">{game.openPana || '***'}</span>
        <span className="text-amber-500/50 text-xl">-</span>
        <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-lg font-extrabold shadow-[inset_0_0_8px_rgba(245,158,11,0.1)]">
          {game.jodiDigit1 || '*'}{game.jodiDigit2 || '*'}
        </span>
        <span className="text-amber-500/50 text-xl">-</span>
        <span className="text-zinc-300 font-medium">
          {isClosed ? game.closePana : '***'}
        </span>
      </div>
    );
  };

  const statusBadge = () => {
    if (isActive) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-950/80 text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
          <span>MARKET OPEN</span>
        </span>
      );
    }
    if (isUpcoming) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/80 text-amber-500 border border-amber-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-[pulse_1.5s_infinite]" />
          <span>READY TIME</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-400">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
        <span>MARKET CLOSED</span>
      </span>
    );
  };

  const quickWhatsappUrl = `https://wa.me/91${phoneNumber}?text=Hello%20Admin,%20I%20want%20to%20place%20a%20ticket%20for%20${encodeURIComponent(game.name)}.%20Please%20assist%20me%20instantly.`;

  return (
    <div className="relative group overflow-hidden bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border border-zinc-800/80 rounded-2xl p-5 hover:border-amber-500/30 transition-all duration-300 shadow-md hover:shadow-[0_4px_25px_-5px_rgba(0,0,0,0.6),0_10px_20px_-10px_rgba(245,158,11,0.15)] flex flex-col justify-between">
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-300" />

      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3.5">
          {statusBadge()}
          <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
            <Clock className="w-3 h-3 text-zinc-500" />
            <span>
              {game.openTime} - {game.closeTime}
            </span>
          </div>
        </div>

        {/* Game Title */}
        <h3 className="font-display font-bold text-base sm:text-lg text-slate-100 tracking-wide mb-3 flex items-center gap-1.5 group-hover:text-amber-400 transition-colors">
          {game.name}
          {isActive && (
            <Sparkles className="w-4 h-4 text-amber-400 animate-[bounce_2s_infinite]" />
          )}
        </h3>

        {/* Live Result Output */}
        <div className="my-4 text-center">{formatResult()}</div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-3.5">
        <button
          onClick={() => onViewChart(game)}
          className="flex items-center justify-center gap-1 border border-zinc-800 bg-zinc-900-50 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 active:bg-zinc-900 py-2 px-2.5 rounded-xl font-medium transition-all cursor-pointer"
        >
          <TrendingUp className="w-3.5 h-3.5 text-zinc-400" />
          <span>Check Chart</span>
        </button>

        {isActive ? (
          <button
            onClick={() => onSelectPlay(game)}
            className="flex items-center justify-center gap-1 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-zinc-950 text-xs py-2 px-2.5 rounded-xl font-bold transition-all shadow-[0_2px_8px_rgba(245,158,11,0.2)] hover:shadow-[0_4px_12px_rgba(245,158,11,0.4)] cursor-pointer"
          >
            <Play className="w-3 h-3 fill-zinc-950" />
            <span>Bid Play</span>
          </button>
        ) : (
          <button
            onClick={onDownloadApp}
            className="flex items-center justify-center gap-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs py-2 px-2.5 rounded-xl font-bold transition-all cursor-pointer outline-none border-none animate-[pulse_3s_infinite]"
          >
            <Download className="w-3.5 h-3.5 text-zinc-950 stroke-[2.5px]" />
            <span>Get App</span>
          </button>
        )}
      </div>
    </div>
  );
};
