"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setIsLoaded(true),
    });

    // Simple startup animation
    tl.to(".preloader-text", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    })
      .to(".preloader-progress", {
        scaleX: 1,
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(".preloader-container", {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
        delay: 0.2,
      });

    return () => {
      tl.kill();
    };
  }, []);

  if (isLoaded) return null;

  return (
    <div
      aria-hidden="true"
      className="preloader-container fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950"
    >
      <div className="flex flex-col items-center px-4 text-center">
        <p className="preloader-text flex flex-wrap justify-center translate-y-4 items-center text-2xl sm:text-3xl md:text-4xl font-bold text-white opacity-0">
          <span className="mr-2 text-primary">SHIV SHAKTI</span> INDUSTRIES
        </p>
        <p className="preloader-text mt-3 translate-y-4 text-xs sm:text-sm tracking-widest text-zinc-400 opacity-0">
          INITIALIZING FACTORY SYSTEMS...
        </p>
      </div>
      <div className="mt-12 h-[2px] w-64 overflow-hidden bg-zinc-800">
        <div className="preloader-progress h-full w-full origin-left scale-x-0 bg-primary"></div>
      </div>
    </div>
  );
}
