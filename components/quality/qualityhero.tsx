"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  BadgeCheck,
  Microscope,
  Ruler,
  ArrowRight,
} from "lucide-react";

import Button from "@/components/common/Button";

export default function QualityHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/quality/quality-banner.jpg"
          alt="Quality Assurance"
          fill
          priority
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70" />
      </div>

      {/* Decorative Blur */}
      <div className="absolute -left-32 top-16 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container relative mx-auto px-6 py-28">

        {/* Breadcrumb */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex items-center gap-2 text-sm text-gray-300"
        >
          <Link
            href="/"
            className="hover:text-orange-400"
          >
            Home
          </Link>

          <ChevronRight size={15} />

          <span className="text-orange-400">
            Quality
          </span>
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">
              <ShieldCheck size={18} />
              Quality Assurance & Inspection
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight lg:text-6xl">
              Precision
              <span className="block text-orange-500">
                Quality Control
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-300">
              Every component undergoes rigorous
              dimensional inspection, material verification,
              and quality testing to ensure compliance with
              customer specifications and international
              manufacturing standards.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Button href="/upload">
                Upload Drawing
              </Button>

              <Button
                href="/contact"
                variant="secondary"
              >
                Contact Quality Team

                <ArrowRight size={18} />
              </Button>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="grid gap-6 sm:grid-cols-2"
          >

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">

              <BadgeCheck
                className="mb-5 text-orange-500"
                size={42}
              />

              <h3 className="text-4xl font-bold">

                ISO 9001

              </h3>

              <p className="mt-2 text-gray-300">

                Certified Quality System

              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">

              <Microscope
                className="mb-5 text-orange-500"
                size={42}
              />

              <h3 className="text-4xl font-bold">

                100%

              </h3>

              <p className="mt-2 text-gray-300">

                Inspection Before Dispatch

              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">

              <Ruler
                className="mb-5 text-orange-500"
                size={42}
              />

              <h3 className="text-4xl font-bold">

                ±0.005 mm

              </h3>

              <p className="mt-2 text-gray-300">

                Precision Tolerance

              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">

              <ShieldCheck
                className="mb-5 text-orange-500"
                size={42}
              />

              <h3 className="text-4xl font-bold">

                15+

              </h3>

              <p className="mt-2 text-gray-300">

                Years of Manufacturing Excellence

              </p>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}