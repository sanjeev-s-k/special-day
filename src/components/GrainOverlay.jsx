import React from 'react';

export default function GrainOverlay() {
  return (
    <div className="film-grain" aria-hidden="true">
      <svg className="w-full h-full">
        <filter id="grain-filter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.8" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
