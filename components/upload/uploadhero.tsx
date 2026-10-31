"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Upload,
  FileText,
  Clock3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import Button from "@/components/common/Button";

const supportedFormats = [
  "STEP",
  "IGES",
  "DWG",
  "DXF",
  "PDF",
  "STL",
  "SLDPRT",
  "SolidWorks",
];

export default function UploadHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/upload/upload-banner.jpg"
          alt="Upload CAD Drawing"
          fill
          priority
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/80" />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container relative mx-auto px-6 py-28">
        {/* Breadcrumb */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-2 text-sm text-gray-300"
        >
          <Link href="/" className="hover:text-orange-400">
            Home
          </Link>

          <ChevronRight size={15} />

          <span className="text-orange-400">
            Upload Drawing
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
              <Upload size={18} />
              Request For Quotation (RFQ)
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight lg:text-6xl">
              Upload Your
              <span className="block text-orange-500">
                Engineering Drawing
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-300">
              Upload your CAD files, technical drawings, or
              specifications and receive a detailed quotation
              from our engineering team within 24 hours.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#upload-form">
                Upload Files
              </Button>

              <Button
                href="/contact"
                variant="secondary"
              >
                Contact Engineers

                <ArrowRight size={18} />
              </Button>
            </div>

            {/* Supported Formats */}

            <div className="mt-10">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">
                Supported File Formats
              </h3>

              <div className="flex flex-wrap gap-3">
                {supportedFormats.map((format) => (
                  <span
                    key={format}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm"
                  >
                    {format}
                  </span>
                ))}
              </div>
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
              <Clock3
                className="mb-5 text-orange-500"
                size={40}
              />

              <h3 className="text-4xl font-bold">
                24 Hrs
              </h3>

              <p className="mt-2 text-gray-300">
                Average Quote Response
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <ShieldCheck
                className="mb-5 text-orange-500"
                size={40}
              />

              <h3 className="text-4xl font-bold">
                NDA
              </h3>

              <p className="mt-2 text-gray-300">
                Confidential File Handling
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <FileText
                className="mb-5 text-orange-500"
                size={40}
              />

              <h3 className="text-4xl font-bold">
                CAD
              </h3>

              <p className="mt-2 text-gray-300">
                Multiple File Formats
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <Upload
                className="mb-5 text-orange-500"
                size={40}
              />

              <h3 className="text-4xl font-bold">
                Fast
              </h3>

              <p className="mt-2 text-gray-300">
                Prototype & Production
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}