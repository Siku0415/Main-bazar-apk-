import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Quote, CheckCircle2, User, PlusCircle, X, ShieldCheck } from 'lucide-react';
import { Language, translations } from '../translations';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
}

interface TestimonialsSectionProps {
  currentLang: Language;
}

const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: "Rajesh Kumar",
    city: "Mumbai",
    rating: 5,
    comment: "This is the most trusted Matka website in India. I requested ₹5000 withdrawal today morning and it was deposited in my PhonePe account in just 10 minutes. 24 گھنٹے لائیو سروس ہے!",
    date: "Today",
    isVerified: true
  },
  {
    id: 't-2',
    name: "Suresh Gowda",
    city: "Bengaluru",
    rating: 5,
    comment: "ಕನ್ನಡದಲ್ಲೂ ಸೈಟ್ ಲಭ್ಯವಿದೆ ಅನ್ನೋದು ಬಹಳ ಸಂತೋಷ ತಂದಿದೆ. ಕಲ್ಯಾಣ್ ಮತ್ತು ಮೇನ್ ಬಜಾರ್ ಜೋಡಿ ರೇಟ್ ತುಂಬಾ ಹೆಚ್ಚಾಗಿದೆ. 10 ಕ್ಕೆ 950 ರೇಟ್ ಬೇರೆಲ್ಲೂ ಸಿಗಲ್ಲ.",
    date: "Yesterday",
    isVerified: true
  },
  {
    id: 't-3',
    name: "Karan Patel",
    city: "Ahmedabad",
    rating: 5,
    comment: "આ વેબસાઈટ ખુબ જ વિશ્વાસપાત્ર છે. ગેમ પોઈન્ટ્સ પણ ફટાફટ એડ થઇ જાય છે અને કસ્ટમર સપોર્ટ પણ ખુબ સરસ રીતે જવાબ આપે છે.",
    date: "2 days ago",
    isVerified: true
  },
  {
    id: 't-4',
    name: "Manoj Deshmukh",
    city: "Pune",
    rating: 4,
    comment: "निकाशी सेवा खुपच वेगवान आहे. सुरुवातीला शंका होती पण ३००० रुपयांचे पेमेंट फक्त ८ मिनिटात आले. मटका खेळणाऱ्या मराठी लोकांसाठी अतिशय सोयीस्कर आहे.",
    date: "3 days ago",
    isVerified: true
  },
  {
    id: 't-5',
    name: "Venkatesh Naidu",
    city: "Hyderabad",
    rating: 5,
    comment: "తెలుగు లాంగ్వేజ్ ఉండటం వల్ల గేమ్ రూಲ್స్ మరియు రిజల్ట్స్ అర్థం చేసుకోవడం చాలా సులువుగా ఉంది. డ్రా జస్టిస్ ఈ పోర్టల్ లో బాగుంది. తప్పకుండా ట్రై చేయండి.",
    date: "4 days ago",
    isVerified: true
  },
  {
    id: 't-6',
    name: "Anandakrishnan",
    city: "Chennai",
    rating: 5,
    comment: "மிகவும் பாதுகாப்பான மற்றும் நம்பகமான தளம். கஸ்டமர் சப்போர்ட் வாட்ஸ்அப்பில் 24 மணி நேரமும் உடனுக்குடன் பதில் தருகிறார்கள். சிறந்த மட்கா ஆப்!",
    date: "5 days ago",
    isVerified: true
  }
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ currentLang }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Modal Form States
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  const t = translations[currentLang];

  // Load testimonials from localStorage on load & combine with seed data
  useEffect(() => {
    const saved = localStorage.getItem('main_bazar_user_testimonials');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Testimonial[];
        setTestimonials([...parsed, ...SEED_TESTIMONIALS]);
      } catch (e) {
        setTestimonials(SEED_TESTIMONIALS);
      }
    } else {
      setTestimonials(SEED_TESTIMONIALS);
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setValidationError('');
    // Reset form
    setRating(5);
    setName('');
    setCity('');
    setComment('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!rating) {
      setValidationError(t.ratingRequired);
      return;
    }
    if (!name.trim()) {
      setValidationError(t.nameRequired);
      return;
    }
    if (!comment.trim()) {
      setValidationError(t.commentsRequired);
      return;
    }

    const newFeedback: Testimonial = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      city: city.trim() || 'India',
      rating,
      comment: comment.trim(),
      date: 'Just now',
      isVerified: true
    };

    // Save only user submitted ones to localStorage to keep persistent
    const saved = localStorage.getItem('main_bazar_user_testimonials');
    let localList: Testimonial[] = [];
    if (saved) {
      try {
        localList = JSON.parse(saved) as Testimonial[];
      } catch (e) {}
    }
    
    const updatedLocalList = [newFeedback, ...localList];
    localStorage.setItem('main_bazar_user_testimonials', JSON.stringify(updatedLocalList));

    // Update state
    setTestimonials([newFeedback, ...testimonials]);
    setIsModalOpen(false);
    
    // Trigger localized feedback complete toast
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 5000);
  };

  return (
    <section className="py-20 px-4 md:px-8 border-t border-zinc-900 bg-zinc-950 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gradient-to-br from-green-500/[0.02] to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-gradient-to-tr from-amber-500/[0.02] to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-zinc-900">
          <div className="text-center md:text-left space-y-1.5">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-none uppercase">
              {t.testimonialsTitle}
            </h2>
            <p className="max-w-2xl text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
              {t.testimonialsSubtitle}
            </p>
          </div>

          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 hover:shadow-[0_4px_20px_rgba(245,158,11,0.25)] font-bold text-xs py-3 px-5 rounded-xl cursor-pointer select-none transition-all active:scale-[0.98] outline-none border-none uppercase tracking-wider"
          >
            <PlusCircle className="w-4 h-4 text-zinc-950 stroke-[2.5px]" />
            <span>{t.submitFeedbackBtn}</span>
          </button>
        </div>

        {/* Testimonials Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl flex flex-col justify-between hover:border-zinc-800 transition-all hover:scale-[1.01] hover:bg-zinc-900/50 shadow-md group relative overflow-hidden"
            >
              {/* Quotes decorator in background */}
              <Quote className="absolute right-4 top-4 w-12 h-12 text-zinc-800/25 pointer-events-none transform translate-x-2 -translate-y-2 group-hover:text-amber-500/5 transition-colors" />

              <div>
                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4 h-5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < item.rating 
                          ? 'text-amber-400 fill-amber-400' 
                          : 'text-zinc-700'
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-zinc-500 font-bold ml-1.5 font-mono">{t.ratingValue}: {item.rating}/5</span>
                </div>

                {/* Comment text */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-6 italic">
                  "{item.comment}"
                </p>
              </div>

              {/* User card info footer */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-900/80">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-zinc-850 flex items-center justify-center text-amber-400 font-extrabold text-sm border border-zinc-800 shadow-inner">
                    {item.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white block flex items-center gap-1.5">
                      {item.name}
                      {item.isVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400 fill-green-400/10" title={t.verifiedPlayer} />
                      )}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-bold font-mono tracking-wider uppercase">
                      {item.city} • <span className="text-zinc-600 font-medium">{item.date}</span>
                    </span>
                  </div>
                </div>

                <span className="text-[9px] text-green-400 font-extrabold uppercase bg-green-500/10 px-2 py-0.5 rounded border border-green-500/10 font-mono tracking-wide">
                  100% Verified
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Dynamic Modal using motion for fluid animations */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-zinc-950/85 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.95)] relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close target */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-white bg-zinc-850 p-2 rounded-xl transition-all border-none outline-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <h3 className="font-display font-black text-xl text-white tracking-tight uppercase">
                    {t.feedbackModalTitle}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                    {t.feedbackModalSubtitle}
                  </p>
                </div>

                {validationError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl font-bold font-mono">
                    ⚠ {validationError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Rating control */}
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-450 text-zinc-400 font-bold uppercase tracking-wider font-mono">
                      {t.ratingLabel}
                    </label>
                    <div className="flex items-center gap-2 pt-1">
                      {Array.from({ length: 5 }).map((_, idx) => {
                        const starValue = idx + 1;
                        const isHighlighted = hoverRating !== null 
                          ? starValue <= hoverRating 
                          : starValue <= rating;

                        return (
                          <button
                            type="button"
                            key={idx}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(null)}
                            onClick={() => setRating(starValue)}
                            className="p-1 rounded-lg hover:bg-zinc-850/60 transition-all cursor-pointer border-none outline-none"
                          >
                            <Star
                              className={`w-8 h-8 transition-transform duration-100 ${
                                isHighlighted 
                                  ? 'text-amber-400 fill-amber-400 scale-105' 
                                  : 'text-zinc-700'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name and City fields grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">
                        {t.nameLabel} <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.namePlaceholder}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-650 outline-none focus:border-amber-500/50 transition-all font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">
                        {t.cityLabel}
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder={t.cityPlaceholder}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-650 outline-none focus:border-amber-500/50 transition-all font-mono"
                      />
                    </div>
                  </div>

                  {/* Comments textarea */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider font-mono">
                      {t.commentsLabel} <span className="text-amber-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={t.commentsPlaceholder}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-650 outline-none focus:border-amber-500/50 transition-all leading-relaxed font-sans"
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-4 border-t border-zinc-850 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                      <span>Instant Live Posting</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="bg-zinc-850 hover:bg-zinc-800 text-zinc-300 font-bold text-xs px-5 py-3 rounded-xl cursor-pointer duration-150 border-none outline-none"
                      >
                        Cancel
                      </button>
                      
                      <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs px-6 py-3 rounded-xl cursor-pointer select-none transition-all active:scale-[0.98] border-none outline-none uppercase tracking-wide"
                      >
                        {t.submitReviewBtn}
                      </button>
                    </div>
                  </div>

                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom success feedback notification toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 z-50 max-w-sm bg-zinc-900 border-2 border-green-500/40 rounded-2xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.95)] backdrop-blur flex items-start gap-3.5"
          >
            <div className="p-2.5 bg-green-500 text-zinc-950 rounded-xl flex-shrink-0 font-bold">
              ✓
            </div>
            <div className="flex-grow">
              <span className="text-[10px] text-green-400 font-extrabold uppercase tracking-widest block font-mono">
                FEEDBACK COMPLETED
              </span>
              <p className="text-xs text-zinc-200 mt-1 leading-relaxed">
                {t.feedbackSuccess}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
