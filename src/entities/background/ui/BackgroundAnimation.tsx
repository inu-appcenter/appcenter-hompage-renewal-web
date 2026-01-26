'use client';
import { useState, useRef } from 'react';
import { motion } from 'motion/react';

export const BackgroundAnimation = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnding, setIsEnding] = useState(false);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const fadeThreshold = 1.0;
    if (video.duration - video.currentTime < fadeThreshold) {
      setIsEnding(true);
    } else {
      setIsEnding(false);
    }
  };

  return (
    <div className="pointer-events-none absolute top-0 left-1/2 -z-10 hidden h-screen w-full -translate-x-1/2 overflow-hidden bg-black sm:inline-block">
      <video ref={videoRef} autoPlay muted loop playsInline onTimeUpdate={handleTimeUpdate} className="h-full w-full object-cover">
        <source src="/videos/landing.mp4" type="video/mp4" media="(min-width: 640px)" />
      </video>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: isEnding ? 1 : 0 }} transition={{ duration: 0.8, ease: 'easeInOut' }} className="absolute inset-0 bg-black" />

      <div className="to-background absolute inset-0 bg-linear-to-b from-transparent via-transparent" />
    </div>
  );
};
