import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Image as ImageIcon, Send, Heart, Download, Sparkles, Check, Trash2, RefreshCw } from 'lucide-react';
import WashiTape from './WashiTape';
import confetti from 'canvas-confetti';

export default function VichuReturnNoteSection() {
  const [noteText, setNoteText] = useState('');
  const [senderName, setSenderName] = useState('Vichu 🐼');
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState('🐼');
  const [isSaved, setIsSaved] = useState(false);
  const [savedNotes, setSavedNotes] = useState([]);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const stickers = ['🐼', '❤️', '✨', '💌', '🌸', '🥂', '💫', '🧸'];

  // Load saved notes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('vichu_notes_for_you');
      if (stored) {
        setSavedNotes(JSON.parse(stored));
      }
    } catch (e) {
      console.log('Error reading localStorage:', e);
    }
  }, []);

  // Camera stream handler
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 960 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Direct camera stream failed, fallback to file input:', err);
      setIsCameraActive(false);
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedImage(dataUrl);

      // Stop video tracks
      const stream = video.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsCameraActive(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNote = () => {
    if (!noteText.trim() && !capturedImage) return;

    const newNote = {
      id: Date.now(),
      text: noteText || "Happy Birthday! Love you!",
      sender: senderName || "Vichu",
      image: capturedImage || "/photos/IMG_20260714_094529_570.jpg",
      sticker: selectedSticker,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newNote, ...savedNotes];
    setSavedNotes(updated);
    try {
      localStorage.setItem('vichu_notes_for_you', JSON.stringify(updated));
    } catch (e) {
      console.log('Error saving note:', e);
    }

    setIsSaved(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#9F1239', '#FDA4AF', '#DDD6FE']
    });

    setTimeout(() => {
      setIsSaved(false);
      setNoteText('');
      setCapturedImage(null);
    }, 2500);
  };

  const handleDeleteNote = (id) => {
    const updated = savedNotes.filter(n => n.id !== id);
    setSavedNotes(updated);
    try {
      localStorage.setItem('vichu_notes_for_you', JSON.stringify(updated));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section id="leave-note" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Hidden canvas for taking snapshot */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Hidden file input with camera capture support on mobile */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-romance-100 text-romance-900 border border-romance-200 text-xs font-mono tracking-widest uppercase mb-3"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Vichu's Corner · Leave A Memory</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-vintage-ink tracking-tight"
        >
          A Note & Photo From You
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-handwriting text-xl sm:text-2xl text-romance-800 mt-2"
        >
          "Snap a picture right now, write what's on your mind, and pin it to our scrapbook ❤️"
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Note & Photo Creator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 relative"
        >
          <WashiTape color="lavender" className="-top-3 left-6" rotation="-2deg" />

          <div className="scrapbook-card rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-letter bg-white relative">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-vintage-ink mb-4 flex items-center gap-2">
              <span>Write To Me</span>
              <span className="text-base font-handwriting text-romance-700 font-normal">
                (I will treasure this forever)
              </span>
            </h4>

            {/* Note Textarea */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">
                  Your Message
                </label>
                <textarea
                  rows="4"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Type anything here... your thoughts, a silly joke, how you're feeling right now, or a note for us..."
                  className="w-full p-4 rounded-xl border border-stone-200 bg-[#FFFDF9] font-handwriting text-xl sm:text-2xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-romance-300 focus:border-romance-400 placeholder:text-stone-300 transition-all"
                />
              </div>

              {/* Photo Input Controls */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">
                  Attach A Selfie or Snapshot
                </label>

                {/* Camera Live View if active */}
                {isCameraActive ? (
                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3] max-w-sm mx-auto mb-3 border border-stone-300">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-3">
                      <button
                        onClick={capturePhoto}
                        className="px-5 py-2 rounded-full bg-romance-700 text-white font-serif text-sm font-semibold shadow-lg hover:bg-romance-800 transition-all flex items-center gap-2"
                      >
                        <Camera className="w-4 h-4" /> Snap Photo
                      </button>
                      <button
                        onClick={stopCamera}
                        className="px-4 py-2 rounded-full bg-black/60 text-white text-xs hover:bg-black/80 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={startCamera}
                      className="px-4 py-2.5 rounded-xl bg-romance-50 hover:bg-romance-100 text-romance-900 border border-romance-200 text-xs sm:text-sm font-serif font-semibold flex items-center gap-2 transition-all"
                    >
                      <Camera className="w-4 h-4 text-romance-700" />
                      Take Selfie Now
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 text-xs sm:text-sm font-serif font-medium flex items-center gap-2 transition-all"
                    >
                      <ImageIcon className="w-4 h-4 text-stone-500" />
                      Choose From Gallery
                    </button>

                    {capturedImage && (
                      <button
                        onClick={() => setCapturedImage(null)}
                        className="text-xs text-rose-600 hover:text-rose-800 underline ml-auto"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Sticker Selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">
                  Pick A Stamp
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {stickers.map((stk) => (
                    <button
                      key={stk}
                      type="button"
                      onClick={() => setSelectedSticker(stk)}
                      className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                        selectedSticker === stk
                          ? 'bg-romance-200 border-2 border-romance-600 scale-110 shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 border border-stone-200'
                      }`}
                    >
                      {stk}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pin Note Button */}
              <div className="pt-4">
                <button
                  onClick={handleSaveNote}
                  disabled={!noteText.trim() && !capturedImage}
                  className={`w-full py-3.5 rounded-xl font-serif text-base font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                    isSaved
                      ? 'bg-emerald-600 text-white'
                      : !noteText.trim() && !capturedImage
                      ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-romance-900 to-vintage-wine text-white hover:opacity-95 hover:shadow-lg active:scale-98'
                  }`}
                >
                  {isSaved ? (
                    <>
                      <Check className="w-5 h-5" /> Pinned To Our Scrapbook!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Pin Note To Scrapbook 💌
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Col: Live Polaroid Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 flex flex-col items-center"
        >
          <div className="w-full max-w-xs relative">
            <WashiTape color="rose" className="-top-3 right-6" rotation="4deg" />

            <div className="polaroid-frame rounded-sm bg-white border border-stone-200 shadow-xl transition-all">
              {/* Photo */}
              <div className="aspect-[4/5] rounded-xs bg-stone-100 overflow-hidden relative flex items-center justify-center">
                {capturedImage ? (
                  <img
                    src={capturedImage}
                    alt="Captured snapshot"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-6 text-center text-stone-400 space-y-2">
                    <Camera className="w-10 h-10 mx-auto text-stone-300 stroke-[1.5]" />
                    <p className="text-xs font-serif italic">
                      Your photo will appear here as a live Polaroid
                    </p>
                  </div>
                )}

                {/* Sticker badge */}
                <div className="absolute top-2 right-2 text-2xl drop-shadow-md">
                  {selectedSticker}
                </div>
              </div>

              {/* Live handwritten note preview */}
              <div className="pt-4 px-2 text-center min-h-[70px] flex flex-col justify-between">
                <p className="font-handwriting text-xl sm:text-2xl text-romance-900 leading-snug break-words line-clamp-3">
                  {noteText.trim() ? `"${noteText}"` : '"A note from Vichu to keep forever..."'}
                </p>
                <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 mt-3 pt-2 border-t border-stone-100 uppercase tracking-wider">
                  <span>Vichu 🐼</span>
                  <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Display previously saved notes */}
      {savedNotes.length > 0 && (
        <div className="mt-20 pt-12 border-t border-stone-200/80">
          <h4 className="font-serif text-2xl font-bold text-center text-vintage-ink mb-8">
            Pinned Scrapbook Notes ({savedNotes.length})
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedNotes.map((item) => (
              <div
                key={item.id}
                className="scrapbook-card p-5 rounded-2xl border border-stone-200 shadow-sm relative group bg-white"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.sticker || '💌'}</span>
                    <div>
                      <span className="text-xs font-mono font-bold text-romance-900">
                        {item.sender}
                      </span>
                      <p className="text-[10px] font-mono text-stone-400">
                        {item.date} · {item.time}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteNote(item.id)}
                    className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-rose-600 p-1 transition-opacity"
                    title="Delete note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {item.image && (
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3 bg-stone-100">
                    <img src={item.image} alt="Memory" className="w-full h-full object-cover" />
                  </div>
                )}

                <p className="font-handwriting text-xl text-stone-800 leading-snug">
                  "{item.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
