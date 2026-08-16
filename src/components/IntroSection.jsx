import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';
import WashiTape from './WashiTape';

export default function IntroSection({ onStartJourney }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute w-96 h-96 bg-romance-200/35 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-lavender-200/40 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-xl w-full mx-auto"
      >
        {/* Washi tape accents */}
        <WashiTape color="rose" className="-top-4 -left-4" rotation="-6deg" />
        <WashiTape color="gold" className="-bottom-3 -right-4" rotation="5deg" />

        {/* Vintage Envelope / Invitation Card */}
        <div className="scrapbook-card rounded-2xl p-8 md:p-12 border border-romance-200/80 relative shadow-letter">
          {/* Postmark / Stamp */}
          <div className="absolute top-5 right-5 flex flex-col items-center border border-dashed border-romance-400/80 px-2.5 py-1.5 rounded-sm bg-romance-50/50">
            <span className="text-[10px] font-mono tracking-widest uppercase text-romance-800 font-bold">AUG 25</span>
            <span className="text-[9px] font-mono text-stone-500">2026</span>
            <span className="text-xs mt-0.5">💌</span>
          </div>

          {/* Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-romance-100/90 text-romance-900 border border-romance-200 text-xs font-medium tracking-wider uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-romance-700" />
            <span>An Intimate Birthday Scrapbook</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-vintage-ink tracking-tight leading-[1.1] mb-4"
          >
            A Letter For <br />
            <span className="font-serif italic text-romance-800 relative inline-block">
              Vichu
              <svg 
                className="absolute -bottom-2 left-0 w-full text-romance-400" 
                viewBox="0 0 100 20" 
                preserveAspectRatio="none"
              >
                <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
            </span>
          </motion.h1>

          {/* Special Panda Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-handwriting text-2xl md:text-3xl text-romance-700 my-4"
          >
            "For my one and only lovable panda 🐼❤️"
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-stone-600 text-sm md:text-base font-sans font-normal max-w-md mx-auto leading-relaxed mb-8"
          >
            A collection of frozen moments, deep conversations, shared laughs, and memories crafted with all my love.
          </motion.p>

          {/* Interactive Wax Seal / Open Button */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.1, type: "spring" }}
            className="flex flex-col items-center"
          >
            <button
              onClick={onStartJourney}
              className="group relative flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-romance-900 via-romance-800 to-vintage-wine text-white font-serif text-lg tracking-wide rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border border-romance-700/60"
            >
              <span className="wax-seal w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-inner">
                <Heart className="w-3.5 h-3.5 text-rose-200 fill-rose-200" />
              </span>
              <span>Open Envelope & Play Music</span>
            </button>
            <span className="text-[11px] font-mono text-stone-400 mt-2.5">
              Turn up your volume for the best experience 🎵
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 flex flex-col items-center gap-1 text-stone-400 hover:text-romance-700 transition-colors cursor-pointer"
        onClick={onStartJourney}
      >
        <span className="text-[11px] font-mono uppercase tracking-widest">Scroll to begin</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
