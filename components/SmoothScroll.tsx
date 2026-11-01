"use client";

import { ReactNode, useEffect } from "react";
import type Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia(
        "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
      ).matches
    ) {
      return;
    }

    let cancelled = false;
    let lenis: Lenis | null = null;
    let animationFrame: number | null = null;
    const timer = window.setTimeout(() => {
      void import("lenis")
        .then(({ default: LenisConstructor }) => {
          if (cancelled) return;

          lenis = new LenisConstructor({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            wheelMultiplier: 1,
            touchMultiplier: 2,
          });

          function raf(time: number) {
            if (!lenis) return;
            lenis.raf(time);
            animationFrame = requestAnimationFrame(raf);
          }

          animationFrame = requestAnimationFrame(raf);
        })
        .catch((error: unknown) => {
          console.error("Failed to load smooth scrolling.", error);
        });
    }, 1000);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      lenis?.destroy();
    };
  }, []);

  return <div id="smooth-wrapper" className="min-h-screen flex flex-col">{children}</div>;
}
