"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If user already saw preloader in this session, skip immediately
    if (typeof window !== "undefined") {
      try {
        if (sessionStorage.getItem("ssi_preloader_seen") === "1") {
          setIsLoaded(true);
          return;
        }
      } catch {
        // Ignore sessionStorage restrictions in private/sandboxed modes
      }
    }

    // If user prefers reduced motion, dismiss immediately
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsLoaded(true);
      return;
    }

    let isFinished = false;

    const finishPreloader = () => {
      if (isFinished) return;
      isFinished = true;
      try {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("ssi_preloader_seen", "1");
        }
      } catch {
        // Ignore
      }

      setIsDismissing(true);
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          y: "-100%",
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => {
            setIsLoaded(true);
          },
        });
      } else {
        setIsLoaded(true);
      }
    };

    // HARD SAFETY FALLBACK: Guarantee preloader always disappears
    // even if GSAP stalls, animation tab loses focus, or error occurs
    const safetyTimeout = setTimeout(() => {
      finishPreloader();
    }, 2400);

    // GSAP Scoped Animation
    try {
      const tl = gsap.timeline({
        onComplete: finishPreloader,
      });

      if (textRef.current && progressRef.current) {
        const textElements = textRef.current.querySelectorAll(".preloader-text-item");
        tl.to(textElements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        })
          .to(progressRef.current, {
            scaleX: 1,
            duration: 1.0,
            ease: "power2.inOut",
          })
          .to(containerRef.current, {
            y: "-100%",
            duration: 0.7,
            ease: "power4.inOut",
            delay: 0.1,
          });
      } else {
        // Fallback if refs not yet available
        finishPreloader();
      }

      return () => {
        clearTimeout(safetyTimeout);
        tl.kill();
      };
    } catch (err) {
      console.warn("[Preloader] GSAP animation fallback triggered:", err);
      finishPreloader();
      return () => {
        clearTimeout(safetyTimeout);
      };
    }
  }, []);

  if (isLoaded) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`preloader-container fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 transition-opacity duration-300 ${
        isDismissing ? "pointer-events-none opacity-90" : "pointer-events-auto"
      }`}
    >
      <div ref={textRef} className="flex flex-col items-center px-4 text-center">
        <p className="preloader-text-item flex flex-wrap justify-center translate-y-4 items-center text-2xl sm:text-3xl md:text-4xl font-bold text-white opacity-0">
          <span className="mr-2 text-primary">SHIV SHAKTI</span> INDUSTRIES
        </p>
        <p className="preloader-text-item mt-3 translate-y-4 text-xs sm:text-sm tracking-widest text-zinc-400 opacity-0">
          INITIALIZING FACTORY SYSTEMS...
        </p>
      </div>
      <div className="mt-12 h-[2px] w-64 overflow-hidden bg-zinc-800">
        <div
          ref={progressRef}
          className="preloader-progress h-full w-full origin-left scale-x-0 bg-primary"
        />
      </div>
    </div>
  );
}
