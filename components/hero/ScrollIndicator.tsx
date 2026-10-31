"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
    >
      <div className="flex flex-col items-center text-white">

        <span className="mb-2 text-sm tracking-widest uppercase">
          Scroll Down
        </span>

        <div className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-white">

          <motion.div
            animate={{
              y: [4, 18, 4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="mt-1 h-3 w-3 rounded-full bg-orange-500"
          />

        </div>

        <ChevronDown className="mt-3" size={22} />

      </div>
    </motion.div>
  );
}