"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Browser policy: enforce muted property on the DOM element for autoplay compliance
    video.muted = true;
    video.defaultMuted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err: unknown) => {
        // Autoplay policy prevented playback (common in power-saving mode or certain mobile browsers)
        console.warn("[HeroVideo] Autoplay policy prevented immediate playback:", err);
      });
    }
  }, []);

  const handleLoadedData = () => {
    setIsVideoLoaded(true);
    setHasError(false);
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const target = e.currentTarget;
    const mediaError = target.error;
    console.warn("[HeroVideo] Video failed to load or decode:", {
      code: mediaError?.code,
      message: mediaError?.message,
      currentSrc: target.currentSrc || target.src,
      networkState: target.networkState,
      readyState: target.readyState,
    });
    setHasError(true);
  };

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
      {/* Fallback & Poster Image (visible before video plays or if video fails) */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isVideoLoaded && !hasError ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Image
          src="/images/hero/hero-poster.webp"
          alt="Shiv Shakti Industries CNC Machine Shop"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Soft overlay on poster image for contrast */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" />
      </div>

      {/* Background Video Element */}
      {!hasError && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/hero/hero-poster.webp"
          onLoadedData={handleLoadedData}
          onCanPlay={handleLoadedData}
          onError={handleVideoError}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? "opacity-80" : "opacity-0"
          }`}
        >
          {/* Root-relative paths directly to public/videos/ */}
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Subtle overlay to preserve high readability of foreground hero text */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent pointer-events-none" />
    </div>
  );
}
