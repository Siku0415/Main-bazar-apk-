import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Star, Phone, MessageCircle, Download } from 'lucide-react';
import { FAQS } from '../gamesData';

interface FAQSectionProps {
  phoneNumber: string;
  onDownloadApp: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ phoneNumber, onDownloadApp }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=Hello%20Admin,%20I'm%20visiting%20the%20Main%20Bazar%20Online%20Play%20app%20and%20had%20some%20questions.%20Could%20you%20please%20help%20me?`;

  return (
    <section id="faqs" className="py-16 px-4 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-3 font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Resolving Doubts</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-white mb-4">
            GENERAL <span className="text-amber-400">FAQS</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
            Need clarity on gaming operations, rules, math payouts, or balance loading? Find replies to FAQs here.
          </p>
        </div>

        {/* Q&A Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/80 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm sm:text-base text-slate-100 hover:text-amber-400 cursor-pointer outline-none select-none transition-colors"
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {/* Animated collapse */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? 'max-h-56 border-t border-zinc-900' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal bg-zinc-900/30">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to action contact / download */}
        <div className="mt-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-zinc-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(245,158,11,0.15)] relative overflow-hidden">
          {/* Shine effect overlay */}
          <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
          
          <div className="text-center md:text-left">
            <h4 className="font-display font-black text-xl sm:text-2xl tracking-tight text-zinc-950">
              GET THE APP FOR INSTANT PLAYS & RESULTS!
            </h4>
            <p className="text-xs font-semibold text-zinc-950/80 mt-1 max-w-xl">
              Enjoy unlimited access to all live Satta markets, instant play rates, and 24/7 withdrawals. Download the Official Android App now!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={onDownloadApp}
              className="w-full sm:w-auto px-6 py-3.5 text-center bg-zinc-950 text-amber-400 hover:text-amber-300 font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer outline-none border-none"
            >
              <Download className="w-4 h-4 text-amber-400 animate-bounce" />
              <span>DOWNLOAD OFFICIAL APP</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
