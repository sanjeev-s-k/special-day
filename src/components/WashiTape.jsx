import React from 'react';

export default function WashiTape({ 
  color = 'pink', 
  className = '', 
  rotation = '-2deg',
  width = 'w-24 md:w-32',
  height = 'h-6 md:h-7'
}) {
  const colorMap = {
    pink: 'washi-tape-pink',
    lavender: 'washi-tape-lavender',
    gold: 'washi-tape-gold',
    rose: 'washi-tape-rose'
  };

  const tapeStyle = colorMap[color] || colorMap.pink;

  return (
    <div 
      className={`absolute z-20 shadow-scrapbook-tape pointer-events-none rounded-sm ${tapeStyle} ${width} ${height} ${className}`}
      style={{ transform: `rotate(${rotation})` }}
    />
  );
}
