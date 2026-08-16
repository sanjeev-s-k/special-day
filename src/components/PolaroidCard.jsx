import React from 'react';
import { motion } from 'framer-motion';
import WashiTape from './WashiTape';
import { Maximize2, Heart } from 'lucide-react';

export default function PolaroidCard({
  image,
  title,
  caption,
  date,
  rotation = '0deg',
  tapeColor = 'pink',
  showTape = true,
  tapePosition = 'top-center',
  onClick,
  className = '',
  aspect = 'portrait'
}) {
  const tapePositions = {
    'top-center': '-top-3 left-1/2 -translate-x-1/2',
    'top-left': '-top-3 -left-3',
    'top-right': '-top-3 -right-3',
    'corner': '-top-4 -left-4',
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.03, 
        rotate: 0,
        y: -6,
        transition: { type: 'spring', stiffness: 260, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative group cursor-pointer inline-block ${className}`}
      style={{ transform: `rotate(${rotation})` }}
      onClick={onClick}
    >
      {/* Optional Washi Tape */}
      {showTape && (
        <WashiTape 
          color={tapeColor} 
          className={tapePositions[tapePosition] || tapePositions['top-center']}
          rotation={rotation === '0deg' ? '-1deg' : `calc(-1 * ${rotation})`}
        />
      )}

      {/* Polaroid Frame */}
      <div className="polaroid-frame rounded-sm bg-white border border-stone-200/60 transition-all duration-300">
        {/* Photo Container */}
        <div className={`relative overflow-hidden rounded-xs bg-stone-100 photo-vignette ${
          aspect === 'portrait' ? 'aspect-[4/5]' : aspect === 'square' ? 'aspect-square' : 'aspect-[4/3]'
        }`}>
          <img
            src={image}
            alt={title || caption || 'Vichu memory'}
            loading="lazy"
            className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-[1.02] transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-stone-900/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white">
            <span className="bg-black/50 backdrop-blur-xs px-3 py-1.5 rounded-full text-xs font-medium tracking-wide flex items-center gap-1.5 shadow-sm">
              <Maximize2 className="w-3.5 h-3.5" /> View Photo
            </span>
          </div>

          {/* Subtle Love Heart Badge */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-1 shadow-xs">
            <Heart className="w-3.5 h-3.5 text-romance-600 fill-romance-600" />
          </div>
        </div>

        {/* Polaroid Bottom Caption Area */}
        <div className="pt-3.5 pb-1 px-1.5 text-center flex flex-col justify-between min-h-[46px]">
          {title && (
            <p className="font-serif text-stone-800 text-base md:text-lg font-semibold tracking-wide leading-tight line-clamp-1">
              {title}
            </p>
          )}
          {caption && (
            <p className="font-handwriting text-romance-900 text-base md:text-lg leading-tight mt-0.5">
              {caption}
            </p>
          )}
          {date && (
            <div className="mt-1 flex items-center justify-center gap-1">
              <span className="text-[10px] tracking-widest uppercase font-mono text-stone-400 font-medium">
                {date}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
