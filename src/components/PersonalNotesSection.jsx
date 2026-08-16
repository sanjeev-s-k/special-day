import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, ChevronDown, ChevronUp, Lock, Check } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import WashiTape from './WashiTape';

export default function PersonalNotesSection() {
  const { personalNotes } = BIRTHDAY_DATA;
  const [openNotes, setOpenNotes] = useState({ 'note-1': true, 'note-2': false, 'note-3': false });

  const toggleNote = (id) => {
    setOpenNotes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="notes" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-romance-100 text-romance-800 border border-romance-200 text-xs font-mono tracking-widest uppercase mb-3"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Chapter 03 · Letters From The Heart</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-ink tracking-tight"
        >
          Personal Notes For You
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-xl sm:text-2xl text-romance-800 mt-2"
        >
          Words unspoken, memories kept, and truths etched forever.
        </motion.p>
      </div>

      {/* 3 Notes Stack */}
      <div className="space-y-8">
        {personalNotes.map((note, idx) => {
          const isOpen = openNotes[note.id];
          const tapeColor = idx === 0 ? 'rose' : idx === 1 ? 'gold' : 'lavender';

          return (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative"
            >
              <WashiTape color={tapeColor} className="-top-3 left-8" rotation={idx % 2 === 0 ? '-2deg' : '2deg'} />

              {/* Note Envelope / Container */}
              <div 
                className={`scrapbook-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-romance-300 shadow-letter bg-[#FFFDF9]' 
                    : 'border-stone-200 hover:border-romance-300 bg-white shadow-xs hover:shadow-md cursor-pointer'
                }`}
              >
                {/* Envelope Top Header Bar */}
                <div
                  onClick={() => toggleNote(note.id)}
                  className="p-5 sm:p-6 flex items-center justify-between cursor-pointer select-none bg-stone-50/50 hover:bg-romance-50/40 transition-colors border-b border-stone-100"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Wax Seal Badge */}
                    <div className="wax-seal w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
                      <span className="font-serif text-xs font-bold">{note.number}</span>
                    </div>

                    <div>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold text-vintage-ink">
                        {note.title}
                      </h4>
                      {!isOpen && (
                        <p className="font-handwriting text-base text-stone-500 line-clamp-1 mt-0.5">
                          "{note.preview}"
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-romance-700 hidden sm:inline-block">
                      {isOpen ? 'Fold Letter' : 'Read Letter'}
                    </span>
                    <button
                      className="p-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-romance-800 transition-colors"
                      aria-label={isOpen ? 'Close note' : 'Open note'}
                    >
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Unfolded Letter Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 sm:p-8 md:p-10 bg-gradient-to-b from-[#FFFDF9] to-[#FDFBF7] relative">
                        {/* Lined Paper effect */}
                        <div className="max-w-3xl mx-auto space-y-4">
                          <p className="font-serif text-lg sm:text-xl text-stone-800 leading-relaxed font-normal whitespace-pre-line tracking-wide">
                            {note.content}
                          </p>

                          <div className="pt-6 mt-6 border-t border-stone-200/80 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-xs font-mono text-stone-400">
                              <Heart className="w-3.5 h-3.5 text-romance-600 fill-romance-600" />
                              <span>Straight from the heart</span>
                            </div>

                            <span className="font-handwriting text-2xl text-romance-800">
                              Always & Forever ✨
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
