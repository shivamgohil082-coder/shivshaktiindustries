"use client";

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#07192F] text-white">

      <HeroBackground />

      <div className="container-custom relative z-10">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Content */}

          <div>

            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex rounded-full border border-blue-400/40 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300"
            >
              ISO Certified Precision Engineering Company
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl xl:text-7xl"
            >
              Precision SSIpro
              <br />
              Machining
              <span className="text-orange-500"> Solutions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 max-w-xl text-lg leading-8 text-gray-300"
            >
              We manufacture high precision custom mechanical components from
              engineering drawings using SSIpro Turning, SSIpro Milling, VMC, HMC,
              Surface Grinding and advanced machining technologies.
            </motion.p>

            <HeroButtons />

            <HeroStats />

          </div>

          {/* Right Side */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative hidden lg:block"
          >

            <img
              src="/images/hero/cnc-machine.png"
              alt="SSIpro Machine"
              className="mx-auto w-full max-w-2xl"
            />

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="absolute left-0 top-16 rounded-xl bg-white p-5 text-gray-900 shadow-2xl"
            >
              <h3 className="text-lg font-bold">
                ±0.005 mm
              </h3>

              <p className="text-sm text-gray-500">
                High Precision
              </p>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute bottom-10 right-0 rounded-xl bg-orange-500 p-5 shadow-2xl"
            >
              <h3 className="text-lg font-bold">
                24/7
              </h3>

              <p className="text-sm">
                Manufacturing Support
              </p>
            </motion.div>

          </motion.div>

        </div>

      </div>

      <ScrollIndicator />

    </section>
  );
}