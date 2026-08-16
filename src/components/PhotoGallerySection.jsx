import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images, Filter, Heart, Maximize2 } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayData';
import PolaroidCard from './PolaroidCard';

export default function PhotoGallerySection({ onOpenPhoto }) {
  const { gallery } = BIRTHDAY_DATA;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Portraits', 'Candids', 'Moments'];

  const filteredPhotos = selectedCategory === 'All'
    ? gallery
    : gallery.filter(photo => photo.category === selectedCategory);

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-romance-100 text-romance-800 border border-romance-200 text-xs font-mono tracking-widest uppercase mb-3"
        >
          <Images className="w-3.5 h-3.5" />
          <span>Chapter 04 · The Scrapbook Vault</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-ink tracking-tight"
        >
          Cherished Moments
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-xl sm:text-2xl text-romance-800 mt-2"
        >
          "A million feelings behind every captured frame"
        </motion.p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-14">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-serif font-medium transition-all duration-300 ${
                isSelected
                  ? 'bg-romance-900 text-white shadow-md scale-105'
                  : 'bg-white text-stone-700 hover:bg-romance-50 border border-stone-200 shadow-2xs'
              }`}
            >
              {cat === 'All' ? 'All Memories' : cat}
            </button>
          );
        })}
      </div>

      {/* Masonry-style Scrapbook Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-6 lg:gap-8"
      >
        <AnimatePresence>
          {filteredPhotos.map((photo, idx) => {
            // Subtle alternating rotations
            const rotations = ['-1.5deg', '2deg', '-2.5deg', '1.8deg', '-2deg', '2.5deg'];
            const tapeColors = ['pink', 'lavender', 'gold', 'rose'];
            const rot = rotations[idx % rotations.length];
            const tape = tapeColors[idx % tapeColors.length];

            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex justify-center"
              >
                <div className="w-full max-w-[280px]">
                  <PolaroidCard
                    image={photo.image}
                    caption={photo.caption}
                    date={photo.tag}
                    rotation={rot}
                    tapeColor={tape}
                    showTape={true}
                    tapePosition={idx % 3 === 0 ? 'top-center' : idx % 3 === 1 ? 'top-left' : 'top-right'}
                    onClick={() => onOpenPhoto({
                      image: photo.image,
                      title: photo.category,
                      caption: photo.caption,
                      date: photo.tag
                    })}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
