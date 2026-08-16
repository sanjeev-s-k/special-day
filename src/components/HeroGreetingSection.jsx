import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star } from 'lucide-react';
import PolaroidCard from './PolaroidCard';
import { BIRTHDAY_DATA } from '../data/birthdayData';

export default function HeroGreetingSection({ onOpenPhoto }) {
  const { hero } = BIRTHDAY_DATA;

  return (
    <section id="greeting" className="relative min-h-screen flex items-center justify-center py-20 px-4 md:px-8">
      {/* Decorative ambient elements */}
      <div className="absolute top-10 right-10 text-romance-300 opacity-60 animate-pulse">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute bottom-16 left-12 text-lavender-300 opacity-70">
        <Star className="w-6 h-6 fill-lavender-200" />
      </div>

      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Col: Typographic Celebration */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-romance-100 text-romance-900 border border-romance-200/80 text-xs md:text-sm font-serif font-medium"
          >
            <Heart className="w-3.5 h-3.5 text-romance-600 fill-romance-600" />
            <span>August 25, 2026 · A Milestone of Love</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-vintage-ink tracking-tight leading-[1.08]"
          >
            Happy Birthday, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-romance-800 via-romance-600 to-vintage-wine">
              Vichu!
            </span>
          </motion.h2>

          {/* Strong emotional line requested by user */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-romance-100/90 via-romance-50 to-lavender-100/80 border border-romance-200/90 shadow-sm relative overflow-hidden"
          >
            <div className="absolute top-2 right-2 text-2xl opacity-80">🐼</div>
            <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl font-bold text-romance-900 leading-snug">
              "You are my only loveable panda in this world"
            </p>
            <p className="font-serif italic text-romance-700/80 text-xs sm:text-sm mt-1">
              — today, tomorrow, and through every high & low ❤️
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-stone-600 font-sans text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-light"
          >
            Today is a celebration of the wonderful person you are — your kindness, your laughter, your resilience, and the warmth you bring into my life even across miles.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <a
              href="#memories"
              className="px-6 py-2.5 rounded-full bg-romance-900 text-white font-serif text-sm md:text-base hover:bg-romance-800 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Explore Our Memories 📷
            </a>
            <a
              href="#notes"
              className="px-6 py-2.5 rounded-full bg-white text-romance-900 border border-romance-300 font-serif text-sm md:text-base hover:bg-romance-50 transition-all shadow-sm active:scale-95"
            >
              Read Letters ✉️
            </a>
          </motion.div>
        </div>

        {/* Right Col: Featured Hero Polaroid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 2.5 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative max-w-xs sm:max-w-sm w-full">
            <PolaroidCard
              image={hero.heroImage}
              title="Vichu ✨"
              caption={hero.heroCaption}
              date={hero.dateStamp}
              rotation="2.5deg"
              tapeColor="rose"
              showTape={true}
              onClick={() => onOpenPhoto({
                image: hero.heroImage,
                title: "Happy Birthday Vichu",
                caption: hero.heroCaption,
                date: hero.dateStamp
              })}
            />

            {/* Floating cute sticker */}
            <motion.div
              animate={{ rotate: [-2, 4, -2], y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-white/95 px-3 py-1.5 rounded-full shadow-md border border-romance-200 text-xs font-handwriting text-romance-900 font-bold flex items-center gap-1.5"
            >
              <span>🐼 Forever My Panda</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
