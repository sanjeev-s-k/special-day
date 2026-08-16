import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Flame, Gift, RefreshCw } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import WashiTape from './WashiTape';

export default function FinalBirthdayMessage() {
  const { finalWishes } = BIRTHDAY_DATA;
  const [candleBlown, setCandleBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandle = () => {
    if (candleBlown) return;
    setCandleBlown(true);
    setWishMade(true);

    // Trigger elegant rose gold / champagne confetti burst
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#9F1239', '#FDA4AF', '#DDD6FE', '#FDE047', '#E11D48', '#FFF1F2'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const resetCandle = () => {
    setCandleBlown(false);
    setWishMade(false);
  };

  return (
    <section id="final-wish" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      {/* Background soft glow */}
      <div className="absolute w-80 h-80 bg-romance-200/30 rounded-full blur-3xl -top-10 left-1/2 -translate-x-1/2 pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-romance-100 text-romance-800 border border-romance-200 text-xs font-mono tracking-widest uppercase mb-4"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Chapter 05 · A Wish For You</span>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-ink tracking-tight mb-3"
      >
        Make A Birthday Wish
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-handwriting text-2xl sm:text-3xl text-romance-800 mb-12"
      >
        "Close your eyes, make the deepest wish, and tap the candle flame ✨"
      </motion.p>

      {/* Interactive Birthday Cake & Candle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative max-w-sm mx-auto mb-16"
      >
        <div 
          onClick={handleBlowCandle}
          className={`relative p-8 rounded-3xl bg-gradient-to-b from-white to-romance-50/60 border border-romance-200 shadow-letter cursor-pointer select-none transition-all duration-500 hover:scale-102 ${
            candleBlown ? 'border-amber-300' : 'hover:border-romance-400'
          }`}
        >
          {/* Candle Container */}
          <div className="flex flex-col items-center">
            {/* Flame */}
            <div className="relative h-16 flex items-center justify-center">
              <AnimatePresence>
                {!candleBlown ? (
                  <motion.div
                    key="flame"
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: [1, 1.15, 0.95, 1.05],
                      rotate: [-2, 3, -1, 2]
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="w-6 h-10 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_25px_#F59E0B] blur-[0.5px]" />
                    <div className="absolute w-3 h-5 rounded-full bg-white/90 top-3" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="smoke"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 0.7, 0], y: -30, x: [0, 8, -5] }}
                    transition={{ duration: 1.5 }}
                    className="text-stone-400 text-xs font-mono"
                  >
                    💨 ~ Wish Sent ~
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Candle Stick */}
            <div className="w-5 h-16 rounded-t-sm bg-gradient-to-b from-romance-200 via-white to-romance-300 border border-romance-300 relative shadow-inner">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(225,29,72,0.2)_4px,rgba(225,29,72,0.2)_8px)]" />
            </div>

            {/* Birthday Cake Base Illustration */}
            <div className="w-44 h-16 rounded-2xl bg-gradient-to-r from-romance-100 via-white to-romance-100 border border-romance-200 shadow-md relative mt-1 flex items-center justify-center">
              <div className="absolute -top-1 left-2 right-2 h-2 bg-romance-200 rounded-full" />
              <div className="text-center">
                <span className="text-xs font-mono font-bold text-romance-900 tracking-wider">
                  VICHU'S WISH CAKE
                </span>
                <p className="text-[10px] text-stone-500 font-sans">
                  {candleBlown ? "✨ Wish granted! Happy Birthday!" : "Tap to blow the candle"}
                </p>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className="mt-6">
            {candleBlown ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-2"
              >
                <p className="font-handwriting text-2xl text-romance-900 font-bold">
                  🎉 Wish Released into the Stars! 🐼
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); resetCandle(); }}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-500 hover:text-romance-800 transition-colors pt-1"
                >
                  <RefreshCw className="w-3 h-3" /> Light candle again
                </button>
              </motion.div>
            ) : (
              <p className="text-xs font-mono text-romance-700 font-medium">
                👉 Tap the flame to blow it out!
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Heartfelt Closing Letter */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-2xl mx-auto"
      >
        <WashiTape color="rose" className="-top-3 left-12" rotation="-3deg" />
        <WashiTape color="gold" className="-bottom-3 right-12" rotation="2deg" />

        <div className="scrapbook-card rounded-3xl p-8 sm:p-12 border border-romance-200/90 shadow-letter text-left relative bg-[#FFFDF9]">
          <h4 className="font-serif text-2xl sm:text-3xl font-bold text-vintage-ink mb-4">
            {finalWishes.title}
          </h4>

          <p className="font-serif italic text-romance-800 text-lg sm:text-xl border-l-2 border-romance-400 pl-4 py-1 mb-6">
            "{finalWishes.quote}"
          </p>

          <p className="font-sans text-stone-700 text-base sm:text-lg leading-relaxed font-light whitespace-pre-line mb-8">
            {finalWishes.letterBody}
          </p>

          <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-stone-400">
                With endless love,
              </p>
              <p className="font-handwriting text-3xl text-romance-900 font-bold mt-1">
                {finalWishes.signature}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-romance-50 px-3.5 py-1.5 rounded-full border border-romance-200/60 self-start sm:self-auto">
              <span className="text-base">🐼</span>
              <span className="text-xs font-serif font-semibold text-romance-900">
                To My Only Loveable Panda
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
