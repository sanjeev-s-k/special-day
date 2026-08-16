import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function FloatingScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top progress bar */}
      <motion.div
        className="h-1 bg-gradient-to-r from-romance-500 via-romance-800 to-lavender-600 origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
