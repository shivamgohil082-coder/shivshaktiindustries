"use client";

import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/images/hero/hero-bg.jpg')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#061426]/85" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Animated Glow */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute left-[-200px] top-[-200px] h-[600px] w-[600px] rounded-full bg-blue-700 blur-[180px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="absolute bottom-[-250px] right-[-250px] h-[650px] w-[650px] rounded-full bg-orange-500 blur-[180px]"
      />
    </>
  );
}