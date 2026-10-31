"use client";

import { motion } from "framer-motion";
import Container from "@/components/common/Container";

export default function IndustriesHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#07192F] text-white">

      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('/images/industries/industries-banner.jpg')",
        }}
      />

      <div className="absolute inset-0 bg-[#07192F]/80" />

      <Container>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
          className="relative z-10 max-w-4xl"
        >

          <span className="rounded-full bg-orange-500/20 px-5 py-2 font-semibold text-orange-400">

            Industries We Serve

          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight">

            Precision Components
            <br />
            For Every Industry

          </h1>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">

            Our precision engineering solutions power leading
            manufacturers across Automotive, Aerospace,
            Medical, Robotics, Electronics and Heavy Industry.

          </p>

        </motion.div>

      </Container>

    </section>
  );
}