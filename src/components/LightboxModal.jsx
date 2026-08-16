import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Calendar } from 'lucide-react';
import WashiTape from './WashiTape';

export default function LightboxModal({
  isOpen,
  photo,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, hasPrev, hasNext, onClose, onPrev, onNext]);

  if (!isOpen || !photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-stone-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-colors"
          aria-label="Close photo viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Prev Button */}
        {hasPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 hidden sm:flex"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 hidden sm:flex"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Polaroid Lightbox Card */}
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full bg-white rounded-sm p-4 sm:p-5 shadow-2xl overflow-hidden border border-stone-100"
        >
          <WashiTape color="rose" className="-top-3 left-1/2 -translate-x-1/2" rotation="-1deg" />

          {/* Photo */}
          <div className="relative aspect-[4/5] sm:aspect-square md:aspect-[4/5] rounded-xs overflow-hidden bg-stone-900">
            <img
              src={photo.image}
              alt={photo.title || photo.caption || 'Scrapbook photograph'}
              className="w-full h-full object-cover object-center filter saturate-[1.05]"
            />
          </div>

          {/* Caption / Details in Polaroid footer */}
          <div className="pt-4 pb-1 text-center space-y-1">
            {photo.title && (
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-vintage-ink tracking-wide">
                {photo.title}
              </h4>
            )}

            {photo.caption && (
              <p className="font-handwriting text-2xl sm:text-3xl text-romance-900">
                "{photo.caption}"
              </p>
            )}

            {photo.date && (
              <div className="flex items-center justify-center gap-1.5 text-xs font-mono uppercase tracking-widest text-stone-400 pt-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{photo.date}</span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
