import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, Heart, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import WashiTape from './WashiTape';

export default function InteractiveTimelineSection({ onOpenPhoto }) {
  const { timeline } = BIRTHDAY_DATA;
  const [activeIndex, setActiveIndex] = useState(timeline.length - 1); // default to current milestone (2026)

  return (
    <section id="timeline" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender-100 text-lavender-800 border border-lavender-200 text-xs font-mono tracking-widest uppercase mb-3"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Chapter 02 · Timeline</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-ink tracking-tight"
        >
          Our Story Through Time
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-xl sm:text-2xl text-romance-800 mt-2"
        >
          From a casual meeting in 2023 to August 25, 2026 ✨
        </motion.p>
      </div>

      {/* Year Selector Tabs (Simple, Clean, Interactive Timeline Bar) */}
      <div className="relative mb-12">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-stone-300 -translate-y-1/2 hidden sm:block" />
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
          {timeline.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={item.year}
                onClick={() => setActiveIndex(idx)}
                className={`relative flex flex-col items-center p-3 sm:p-4 rounded-xl transition-all duration-300 border text-center ${
                  isActive
                    ? 'bg-romance-900 text-white border-romance-900 shadow-lg scale-105'
                    : 'bg-white/80 text-stone-700 hover:bg-romance-50 border-stone-200 shadow-xs'
                }`}
              >
                <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                  isActive ? 'text-rose-200' : 'text-stone-400'
                }`}>
                  {item.badge}
                </span>
                <span className="font-serif text-lg sm:text-xl font-bold mt-0.5">
                  {item.year}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="timelineDot"
                    className="w-2 h-2 rounded-full bg-rose-400 mt-1 shadow-sm"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Milestone Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="scrapbook-card rounded-2xl p-6 sm:p-8 md:p-10 border border-stone-200/90 relative shadow-letter overflow-hidden"
        >
          <WashiTape color={activeIndex % 2 === 0 ? 'pink' : 'lavender'} className="-top-3 right-8" rotation="3deg" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Story Text */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-romance-100 text-romance-900 text-xs font-mono font-bold">
                  {timeline[activeIndex].year}
                </span>
                <span className="text-stone-400 text-xs font-serif italic">
                  {timeline[activeIndex].tagline}
                </span>
              </div>

              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-vintage-ink">
                {timeline[activeIndex].title}
              </h4>

              <p className="text-stone-600 font-sans text-base sm:text-lg leading-relaxed font-light">
                {timeline[activeIndex].description}
              </p>

              {/* Special Tag on 2026 */}
              {timeline[activeIndex].year.includes('2026') && (
                <div className="mt-4 p-3.5 rounded-xl bg-romance-50 border border-romance-200/80 flex items-center gap-3 text-romance-900">
                  <span className="text-xl">🎂</span>
                  <p className="font-handwriting text-xl font-bold">
                    August 25, 2026 · Happy Birthday to my favorite Panda!
                  </p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center gap-3 pt-4">
                {activeIndex > 0 && (
                  <button
                    onClick={() => setActiveIndex(activeIndex - 1)}
                    className="text-xs font-serif font-semibold text-stone-500 hover:text-romance-800 transition-colors"
                  >
                    ← Previous Year
                  </button>
                )}
                {activeIndex < timeline.length - 1 && (
                  <button
                    onClick={() => setActiveIndex(activeIndex + 1)}
                    className="inline-flex items-center gap-1 text-xs font-serif font-semibold text-romance-800 hover:text-romance-950 transition-colors"
                  >
                    Next Chapter →
                  </button>
                )}
              </div>
            </div>

            {/* Photo on the right */}
            <div className="md:col-span-5 flex justify-center">
              <div 
                className="w-full max-w-[240px] cursor-pointer group"
                onClick={() => onOpenPhoto({
                  image: timeline[activeIndex].image,
                  title: `${timeline[activeIndex].year} · ${timeline[activeIndex].title}`,
                  caption: timeline[activeIndex].tagline,
                  date: timeline[activeIndex].year
                })}
              >
                <div className="polaroid-frame rounded-sm bg-white border border-stone-200 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className="aspect-[4/5] overflow-hidden rounded-xs bg-stone-100">
                    <img
                      src={timeline[activeIndex].image}
                      alt={timeline[activeIndex].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p className="font-handwriting text-center text-romance-900 text-lg pt-3">
                    {timeline[activeIndex].title}
                  </p>
                  <p className="text-[10px] font-mono text-center text-stone-400 uppercase">
                    Tap to expand
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
