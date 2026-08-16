import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Play, Pause, Disc } from 'lucide-react';

export default function AmbientAudioPlayer({ 
  src = '/audio/singari.mp3', 
  title = 'Singari',
  autoPlayTrigger = false 
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Audio autoplay prevented by browser policy:', err);
      });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error('Play error:', err);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) setIsMuted(true);
      else if (isMuted) setIsMuted(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p);
    }
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="relative">
        <motion.div
          layout
          className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-2 rounded-full border border-stone-200 shadow-letter hover:shadow-lg transition-all duration-300"
        >
          {/* Vinyl / Music Icon with Spin animation when playing */}
          <button
            onClick={togglePlay}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-95 ${
              isPlaying 
                ? 'bg-romance-800 text-white shadow-md' 
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
            title={isPlaying ? 'Pause Music' : 'Play Music'}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <Disc className="w-5 h-5 text-rose-200" />
              </motion.div>
            ) : (
              <Play className="w-4 h-4 translate-x-0.5" />
            )}
          </button>

          {/* Song Name & Visualizer Bars */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="cursor-pointer pr-1 flex flex-col justify-center select-none"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-serif font-bold text-stone-800 tracking-wide">
                {title}
              </span>
              <span className="text-[10px] uppercase font-mono text-romance-700 bg-romance-100 px-1.5 py-0.2 rounded-sm">
                BGM
              </span>
            </div>

            {/* Audio Visualizer Bars */}
            <div className="flex items-center gap-0.5 h-2.5 mt-0.5">
              {[0.4, 0.8, 0.5, 0.9, 0.6, 0.3].map((height, i) => (
                <motion.span
                  key={i}
                  animate={isPlaying ? {
                    scaleY: [height, 1, 0.3, height],
                    transition: {
                      duration: 0.6 + i * 0.15,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }
                  } : { scaleY: 0.2 }}
                  className="w-0.5 h-full bg-romance-600 rounded-full origin-bottom"
                />
              ))}
            </div>
          </div>

          {/* Quick Mute Toggle */}
          <button
            onClick={toggleMute}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-romance-600" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </motion.div>

        {/* Volume popup slider if expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-14 right-0 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200 shadow-xl w-48 text-stone-700"
            >
              <div className="flex items-center justify-between text-xs font-serif text-stone-600 mb-2">
                <span>Volume</span>
                <span className="font-mono text-[11px]">{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-romance-700"
              />
              <p className="text-[10px] text-stone-400 font-sans text-center mt-2.5">
                Soundtrack: Singari
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
