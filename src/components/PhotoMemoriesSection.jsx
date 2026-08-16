import React from 'react';
import { motion } from 'framer-motion';
import PolaroidCard from './PolaroidCard';
import WashiTape from './WashiTape';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import { Heart, Camera } from 'lucide-react';

export default function PhotoMemoriesSection({ onOpenPhoto }) {
  const { memories } = BIRTHDAY_DATA;

  return (
    <section id="memories" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-romance-100/80 text-romance-800 border border-romance-200 text-xs font-mono tracking-widest uppercase mb-3"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Chapter 01 · Snapshots</span>
        </motion.div>
        
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-ink tracking-tight"
        >
          Frozen In Time
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-xl sm:text-2xl text-romance-800 mt-2"
        >
          "Little moments that became our biggest treasures"
        </motion.p>
      </div>

      {/* Scrapbook Grid with organic rotations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 lg:gap-8 items-center">
        {memories.map((mem, idx) => {
          // Dynamic offset for scrapbook feel
          const yOffsets = ['lg:translate-y-0', 'lg:translate-y-6', 'lg:-translate-y-4', 'lg:translate-y-4'];
          
          return (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className={`flex justify-center ${yOffsets[idx % 4]}`}
            >
              <div className="w-full max-w-[270px]">
                <PolaroidCard
                  image={mem.image}
                  title={mem.title}
                  caption={mem.caption}
                  date={mem.date}
                  rotation={mem.rotation}
                  tapeColor={mem.tapeColor}
                  showTape={true}
                  tapePosition={idx % 2 === 0 ? 'top-center' : 'top-right'}
                  onClick={() => onOpenPhoto(mem)}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Scrapbook Sticky Note Annotation */}
      <motion.div
        initial={{ opacity: 0, rotate: -2, scale: 0.95 }}
        whileInView={{ opacity: 1, rotate: -1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-16 max-w-md mx-auto relative bg-[#FFFBEA] p-6 rounded-sm shadow-md border border-amber-200/70"
      >
        <WashiTape color="gold" className="-top-3 left-1/2 -translate-x-1/2" rotation="1deg" />
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-0.5">🐼</span>
          <div>
            <p className="font-handwriting text-xl text-stone-800 leading-snug">
              "No matter how busy life gets or where we are, your smile always stays the warmest reminder of what matters."
            </p>
            <p className="text-right font-serif italic text-xs text-amber-800/80 mt-2 font-medium">
              — A note taped into the scrapbook
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
