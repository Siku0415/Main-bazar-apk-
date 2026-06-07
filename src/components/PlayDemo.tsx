import React, { useState, useEffect } from 'react';
import { FileText, MessageCircle, Star, Sparkles, AlertCircle, RefreshCw, CheckCircle2, Download } from 'lucide-react';
import { Game } from '../types';

interface PlayDemoProps {
  games: Game[];
  phoneNumber: string;
  onDownloadApp: () => void;
}

export const PlayDemo: React.FC<PlayDemoProps> = ({ games, phoneNumber, onDownloadApp }) => {
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [playType, setPlayType] = useState<string>('single-digit');
  const [userDigit, setUserDigit] = useState<string>('');
  const [points, setPoints] = useState<string>('100');
  const [ticket, setTicket] = useState<{
    id: string;
    gameName: string;
    typeTitle: string;
    digit: string;
    spentPoints: number;
    estimatedReturn: number;
  } | null>(null);

  // Default to first active or any game
  useEffect(() => {
    if (games.length > 0) {
      const active = games.find((g) => g.status === 'active');
      setSelectedGame(active ? active.name : games[0].name);
    }
  }, [games]);

  const ratesMap: Record<string, { title: string; multiplier: number }> = {
    'single-digit': { title: 'Single Digit (Ank)', multiplier: 9.5 },
    jodi: { title: 'Jodi (Double Digit)', multiplier: 95 },
    'single-pana': { title: 'Single Pana', multiplier: 140 },
    'double-pana': { title: 'Double Pana', multiplier: 280 },
    'triple-pana': { title: 'Triple Pana', multiplier: 700 },
    'sangam-half': { title: 'Sangam Half', multiplier: 1000 },
    'sangam-full': { title: 'Sangam Full', multiplier: 10000 },
  };

  const getPointsMultiplier = () => {
    return ratesMap[playType]?.multiplier || 9.5;
  };

  const getPlayTypeTitle = () => {
    return ratesMap[playType]?.title || 'Single Digit';
  };

  const handleGenerateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGame || !userDigit || !points) return;

    const ptVal = parseFloat(points);
    if (isNaN(ptVal) || ptVal <= 0) return;

    const returnEstimate = ptVal * getPointsMultiplier();
    const mockId = 'MB-' + Math.floor(100000 + Math.random() * 900000);

    setTicket({
      id: mockId,
      gameName: selectedGame,
      typeTitle: getPlayTypeTitle(),
      digit: userDigit,
      spentPoints: ptVal,
      estimatedReturn: returnEstimate,
    });
  };

  const ticketText = ticket
    ? `🏆 NEW MATKA BID TICKET: [${ticket.id}]\n--------------------\n🎮 Game: ${ticket.gameName}\n📝 Type: ${ticket.typeTitle}\n🎯 guessed Satta Number: ${ticket.digit}\n💰 Points: ${ticket.spentPoints} Rs\n💎 Est. Return Payout: ${ticket.estimatedReturn} Rs\n--------------------\nPlease confirm my bid ticket and provide UPI gateway to load points!`
    : '';

  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(ticketText)}`;

  return (
    <section id="play-simulator" className="py-16 px-4 bg-gradient-to-b from-zinc-950 to-zinc-900 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-green-500/10 text-green-400 border border-green-500/20 mb-3 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Play Room</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-white mb-4">
            ONLINE MATKA <span className="text-amber-400">PLAY BID ROOM</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Configure your favorite guessings, estimate your potential Satta payouts dynamically, print a digital play slip, and send it directly to the admin on WhatsApp for instant booking!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-md">
            <h3 className="font-display font-bold text-lg text-slate-100 mb-6 flex items-center gap-2 border-b border-zinc-900 pb-4">
              <FileText className="w-5 h-5 text-amber-500" />
              <span>Configure Your Custom Play Slip</span>
            </h3>

            <form onSubmit={handleGenerateTicket} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wide">
                    Select Matka Market
                  </label>
                  <select
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none transition-all cursor-pointer"
                  >
                    {games.map((g) => (
                      <option key={g.id} value={g.name}>
                        {g.name} ({g.openTime})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wide">
                    Play Category / Type
                  </label>
                  <select
                    value={playType}
                    onChange={(e) => {
                      setPlayType(e.target.value);
                      setUserDigit(''); // reset to match category constraint
                    }}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none transition-all cursor-pointer"
                  >
                    <option value="single-digit">Single Digit (1/10)</option>
                    <option value="jodi">Jodi Double (1/100)</option>
                    <option value="single-pana">Single Pana Panel</option>
                    <option value="double-pana">Double Pana Panel</option>
                    <option value="triple-pana">Triple Pana (Jackpot)</option>
                    <option value="sangam-half">Half Sangam Combination</option>
                    <option value="sangam-full">Full Sangam Combination</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wide">
                    Your guess Number / Digit
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={playType === 'single-digit' ? 1 : playType === 'jodi' ? 2 : 6}
                    placeholder={
                      playType === 'single-digit'
                        ? 'Try 0 to 9'
                        : playType === 'jodi'
                        ? 'Try 00 to 99'
                        : 'Enter Pana or sequence'
                    }
                    value={userDigit}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d*$/.test(val)) {
                        setUserDigit(val);
                      }
                    }}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-zinc-600 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wide">
                    Points (Bid Amount)
                  </label>
                  <input
                    type="number"
                    min="10"
                    placeholder="Min 10"
                    required
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-amber-500/50 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-zinc-600 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Dynamic estimated return showcase */}
              {points && parseFloat(points) > 0 && (
                <div className="bg-zinc-900/60 border border-zinc-800/80 p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span>Payout Multiplier Rate: <strong className="text-slate-100">{getPointsMultiplier()}x</strong></span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-500 block uppercase font-mono">Possible Earnings</span>
                    <span className="font-mono text-base font-extrabold text-green-400">
                      ₹{(parseFloat(points) * getPointsMultiplier()).toFixed(0)} Rs
                    </span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-zinc-950 font-extrabold text-sm rounded-xl transition-all shadow-[0_4px_12px_rgba(245,158,11,0.2)]"
              >
                Generate Simulated Slip
              </button>
            </form>
          </div>

          {/* Receipt Preview Side */}
          <div className="lg:col-span-5 flex h-full">
            {ticket ? (
              <div className="w-full bg-zinc-900 border border-amber-500/30 rounded-3xl p-6 relative flex flex-col justify-between shadow-[0_0_20px_rgba(245,158,11,0.05)] animate-[slideLeft_0.3s_ease-out]">
                
                {/* Visual Top Cutout Lines */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[radial-gradient(circle_at_center,transparent_4px,rgba(245,158,11,0.3)_4px)] bg-[length:12px_12px] opacity-40" />

                <div>
                  <div className="flex items-center justify-between mt-3 mb-6">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold tracking-widest">Matka Receipt Generated</span>
                    </div>
                    <span className="font-mono font-bold text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded">
                      {ticket.id}
                    </span>
                  </div>

                  <div className="space-y-4 border-y border-zinc-800/80 py-5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">Selected Game Market:</span>
                      <strong className="text-slate-100 font-display font-medium">{ticket.gameName}</strong>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">Bet Type Selected:</span>
                      <strong className="text-slate-100 font-display font-medium">{ticket.typeTitle}</strong>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500">Your guessed Digit:</span>
                      <strong className="text-green-400 font-mono text-lg font-black">{ticket.digit}</strong>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-500 font-mono">Bidded Points Value:</span>
                      <strong className="text-amber-500 font-mono text-lg font-bold">₹{ticket.spentPoints} Rs</strong>
                    </div>
                  </div>

                  <div className="my-6 p-4 rounded-2xl bg-zinc-950 text-center border border-zinc-800/80">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block mb-1">
                      Estimated Winning Payout
                    </span>
                    <span className="font-display font-black text-3xl text-green-400 tracking-wide">
                      ₹{ticket.estimatedReturn.toFixed(0)} Rs
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={onDownloadApp}
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 hover:shadow-[0_4px_12px_rgba(245,158,11,0.3)] text-zinc-950 font-extrabold text-sm py-3 px-4 rounded-xl transition-all cursor-pointer outline-none border-none"
                  >
                    <Download className="w-5 h-5 text-zinc-950 stroke-[3px] animate-bounce" />
                    <span>Download App To Submit Ticket</span>
                  </button>

                  <button
                    onClick={() => setTicket(null)}
                    className="w-full flex items-center justify-center gap-2 hover:bg-zinc-800 text-zinc-400 hover:text-slate-200 font-semibold text-xs py-2 px-4 rounded-xl transition-all border border-transparent hover:border-zinc-800 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Configure Another Bidding</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full bg-zinc-900/50 border border-dashed border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center text-zinc-500 min-h-[300px]">
                <FileText className="w-12 h-12 text-zinc-700 mb-3 animate-pulse" />
                <h4 className="font-display font-bold text-sm text-zinc-400 mb-1">Active Slip Pending</h4>
                <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                  Provide market, predict category, guess digit sequence, and configure points on the left to review your receipt invoice instantly here.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  );
};
