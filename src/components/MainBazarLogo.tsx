import React from 'react';

interface MainBazarLogoProps {
  className?: string;
  size?: number | string;
}

export const MainBazarLogo: React.FC<MainBazarLogoProps> = ({ className = '', size = 48 }) => {
  return (
    <div 
      className={`relative overflow-hidden flex-shrink-0 select-none bg-zinc-950 p-[3%] ${className}`} 
      style={{ 
        width: size, 
        height: size,
        borderRadius: '22%',
        boxShadow: '0 4px 20px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1)'
      }}
    >
      {/* Golden Outer Ring */}
      <div 
        className="absolute flex items-center justify-center bg-black"
        style={{
          inset: '4%',
          borderRadius: '18%',
          border: '3.5px solid #f59e0b'
        }}
      >
        {/* Red Inner Ring */}
        <div 
          className="absolute flex flex-col items-center justify-center p-1 bg-black"
          style={{
            inset: '3.5%',
            borderRadius: '15%',
            border: '4px solid #dc2626'
          }}
        >
          
          {/* Main Visual Contents */}
          <div className="flex flex-col items-center justify-between w-full h-[95%] py-[2%] text-center">
            
            {/* Money Bag and Coins */}
            <div className="relative w-[38%] h-[38%] flex items-center justify-center">
              {/* Gold Money Bag SVG */}
              <svg viewBox="0 0 100 100" className="w-[85%] h-[85%] drop-shadow-[0_2px_4px_rgba(245,158,11,0.4)]">
                {/* Bag structure */}
                <path d="M 50 15 C 45 15, 42 22, 38 25 C 28 32, 22 45, 22 65 C 22 83, 35 90, 50 90 C 65 90, 78 83, 78 65 C 78 45, 72 32, 62 25 C 58 22, 55 15, 50 15 Z" fill="url(#goldBagGrad)" stroke="#78350f" strokeWidth="2.5" />
                <path d="M 33 24 C 40 28, 60 28, 67 24" fill="none" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
                {/* Ribbon tie */}
                <path d="M 40 24 C 44 26, 56 26, 60 24" fill="none" stroke="#b91c1c" strokeWidth="4" />
                <path d="M 43 24 C 41 29, 39 34, 39 34" fill="none" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round" />
                <path d="M 57 24 C 59 29, 61 34, 61 34" fill="none" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round" />
                {/* Rupee Symbol */}
                <text x="50" y="65" fill="#581c0c" fontSize="26" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">₹</text>
                
                <defs>
                  <linearGradient id="goldBagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="30%" stopColor="#f59e0b" />
                    <stop offset="70%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Stack of gold coins in corner */}
              <div className="absolute -bottom-[5%] -right-[5%] w-[48%] h-[48%] flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  {/* Coin 1 */}
                  <ellipse cx="40" cy="70" rx="30" ry="12" fill="url(#coinGrad3)" stroke="#78350f" strokeWidth="2.5" />
                  {/* Coin 2 */}
                  <ellipse cx="60" cy="61" rx="28" ry="11" fill="url(#coinGrad2)" stroke="#78350f" strokeWidth="2.5" />
                  {/* Coin 3 */}
                  <ellipse cx="50" cy="46" rx="25" ry="10" fill="url(#coinGrad)" stroke="#78350f" strokeWidth="2.5" />
                  {/* Rib details on top coin */}
                  <ellipse cx="50" cy="46" rx="18" ry="7" fill="none" stroke="#ca8a04" strokeWidth="1.5" />
                  
                  <defs>
                    <linearGradient id="coinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="50%" stopColor="#ca8a04" />
                      <stop offset="100%" stopColor="#854d0e" />
                    </linearGradient>
                    <linearGradient id="coinGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="50%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>
                    <linearGradient id="coinGrad3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fde047" />
                      <stop offset="50%" stopColor="#ca8a04" />
                      <stop offset="100%" stopColor="#78350f" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* "MAIN" text */}
            <div 
              className="font-black text-amber-500 select-none uppercase tracking-wide leading-none"
              style={{ 
                fontSize: '15px', 
                fontWeight: 900,
                fontFamily: '"Cinzel", "Georgia", "Times New Roman", serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 3px rgba(245,158,11,0.2)'
              }}
            >
              MAIN
            </div>

            {/* "BAZAR" text */}
            <div 
              className="font-extrabold text-white select-none uppercase tracking-[0.1em] leading-none text-center"
              style={{ 
                fontSize: '16px', 
                fontWeight: 900,
                fontFamily: '"Montserrat", "Inter", sans-serif',
                textShadow: '0 2px 4px rgba(0,0,0,0.9)'
              }}
            >
              BAZAR
            </div>

            {/* Diamond row decorator */}
            <div className="flex items-center justify-center gap-[4%] w-1/2 my-[2%]">
              <span className="w-1.5 h-1.5 rounded-[25%] rotate-45 bg-amber-500" style={{ transform: 'rotate(45deg)' }} />
              <span className="w-1.5 h-1.5 rounded-[25%] rotate-45 bg-red-600" style={{ transform: 'rotate(45deg)' }} />
              <span className="w-2 h-2 rounded-[25%] rotate-45 bg-amber-400" style={{ transform: 'rotate(45deg)' }} />
              <span className="w-1.5 h-1.5 rounded-[25%] rotate-45 bg-red-600" style={{ transform: 'rotate(45deg)' }} />
              <span className="w-1.5 h-1.5 rounded-[25%] rotate-45 bg-amber-500" style={{ transform: 'rotate(45deg)' }} />
            </div>

            {/* OFFICIAL pill label */}
            <div 
              className="rounded-full border border-amber-500 py-[2%] text-white tracking-[0.12em] uppercase font-black text-center flex items-center justify-center select-none"
              style={{ 
                fontSize: '7.5px', 
                fontWeight: 900,
                width: '78%',
                fontFamily: '"Montserrat", "Inter", sans-serif',
                background: 'linear-gradient(180deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,0.98) 100%)',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
              }}
            >
              OFFICIAL
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
