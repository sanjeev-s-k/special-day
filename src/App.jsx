import React, { useState } from 'react';
import IntroSection from './components/IntroSection';
import HeroGreetingSection from './components/HeroGreetingSection';
import PhotoMemoriesSection from './components/PhotoMemoriesSection';
import InteractiveTimelineSection from './components/InteractiveTimelineSection';
import PersonalNotesSection from './components/PersonalNotesSection';
import PhotoGallerySection from './components/PhotoGallerySection';
import FinalBirthdayMessage from './components/FinalBirthdayMessage';
import VichuReturnNoteSection from './components/VichuReturnNoteSection';
import AmbientAudioPlayer from './components/AmbientAudioPlayer';
import GrainOverlay from './components/GrainOverlay';
import FloatingScrollProgress from './components/FloatingScrollProgress';
import LightboxModal from './components/LightboxModal';
import { BIRTHDAY_DATA } from './data/birthdayData';
import { Heart } from 'lucide-react';

export default function App() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [allPhotosList, setAllPhotosList] = useState([]);
  const [audioAutoPlay, setAudioAutoPlay] = useState(false);

  // Flatten all available gallery and memory photos for lightbox carousel
  const allPhotos = React.useMemo(() => {
    return BIRTHDAY_DATA.gallery.map(p => ({
      image: p.image,
      title: p.category,
      caption: p.caption,
      date: p.tag
    }));
  }, []);

  const handleOpenPhoto = (photo) => {
    const idx = allPhotos.findIndex(p => p.image === photo.image);
    setActivePhoto(photo);
    setActivePhotoIndex(idx !== -1 ? idx : 0);
    setAllPhotosList(allPhotos);
  };

  const handlePrevPhoto = () => {
    if (activePhotoIndex > 0) {
      const nextIdx = activePhotoIndex - 1;
      setActivePhotoIndex(nextIdx);
      setActivePhoto(allPhotosList[nextIdx]);
    }
  };

  const handleNextPhoto = () => {
    if (activePhotoIndex < allPhotosList.length - 1) {
      const nextIdx = activePhotoIndex + 1;
      setActivePhotoIndex(nextIdx);
      setActivePhoto(allPhotosList[nextIdx]);
    }
  };

  const handleStartJourney = () => {
    setAudioAutoPlay(true);
    const greetingEl = document.getElementById('greeting');
    if (greetingEl) {
      greetingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-cream-50 text-vintage-ink selection:bg-romance-300 selection:text-romance-950">
      {/* Film Grain Texture Overlay */}
      <GrainOverlay />

      {/* Floating Scroll Progress Bar */}
      <FloatingScrollProgress />

      {/* Background Music Player (Singari BGM) */}
      <AmbientAudioPlayer
        src={BIRTHDAY_DATA.audioTrack.src}
        title={BIRTHDAY_DATA.audioTrack.title}
        autoPlayTrigger={audioAutoPlay}
      />

      {/* Main Single-Page Cinematic Scrapbook Experience */}
      <main className="relative z-10 space-y-8 sm:space-y-12">
        {/* 1. Intro Section */}
        <IntroSection onStartJourney={handleStartJourney} />

        {/* 2. Birthday Greeting Section */}
        <HeroGreetingSection onOpenPhoto={handleOpenPhoto} />

        {/* 3. Photo Memories Section */}
        <PhotoMemoriesSection onOpenPhoto={handleOpenPhoto} />

        {/* 4. Interactive Timeline Section */}
        <InteractiveTimelineSection onOpenPhoto={handleOpenPhoto} />

        {/* 5. Personal Notes Section */}
        <PersonalNotesSection />

        {/* 6. Large Photo Gallery Section */}
        <PhotoGallerySection onOpenPhoto={handleOpenPhoto} />

        {/* 7. Final Birthday Message Section */}
        <FinalBirthdayMessage />

        {/* 8. Vichu's Interactive Return Note & Photo Snap Section */}
        <VichuReturnNoteSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 text-center border-t border-stone-200/80 mt-20">
        <div className="max-w-md mx-auto space-y-3">
          <p className="font-handwriting text-2xl text-romance-900 flex items-center justify-center gap-2">
            <span>Made with endless love for Vichu</span>
            <Heart className="w-4 h-4 text-romance-600 fill-romance-600" />
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-stone-400">
            August 25, 2026 · Happy Birthday Panda 🐼
          </p>
        </div>
      </footer>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={Boolean(activePhoto)}
        photo={activePhoto}
        onClose={() => setActivePhoto(null)}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
        hasPrev={activePhotoIndex > 0}
        hasNext={activePhotoIndex < allPhotosList.length - 1}
      />
    </div>
  );
}
