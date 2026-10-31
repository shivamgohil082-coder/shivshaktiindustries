"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Upload,
  PhoneCall,
} from "lucide-react";

import Button from "@/components/common/Button";

const qualityBenefits = [
  "100% Final Inspection Before Dispatch",
  "ISO 9001 Quality Management",
  "Inspection Reports Available",
  "Material Traceability",
  "Precision Tolerance up to ±0.005 mm",
  "Prototype to Mass Production",
];

export default function QualityCTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/quality/quality-cta.jpg"
          alt="Quality Assurance"
          fill
          className="object-cover opacity-15"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-950" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container relative mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-400">
              <FileCheck size={18} />
              Trusted Manufacturing Partner
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight lg:text-5xl">
              Precision Parts,
              <span className="block text-orange-500">
                Guaranteed Quality
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              From raw material inspection to final dispatch,
              every component is manufactured and verified using
              internationally accepted quality practices to ensure
              complete customer satisfaction.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {qualityBenefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-1 shrink-0 text-orange-500"
                  />

                  <span className="text-gray-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-lg"
          >
            <h3 className="text-3xl font-bold">
              Ready to Start Your Project?
            </h3>

            <p className="mt-4 leading-7 text-gray-300">
              Share your engineering drawings with our team.
              We'll review your requirements and provide a
              competitive quotation within 24 hours.
            </p>

            <div className="mt-8 space-y-4">
              <Button href="/upload" className="w-full justify-center">
                <Upload size={18} />
                Upload CAD Drawing
              </Button>

              <Button
                href="/contact"
                variant="secondary"
                className="w-full justify-center"
              >
                <PhoneCall size={18} />
                Talk to Our Engineers
              </Button>
            </div>

            <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
              <h4 className="font-semibold text-orange-400">
                Accepted File Formats
              </h4>

              <p className="mt-3 text-sm leading-7 text-gray-300">
                STEP • IGES • DWG • DXF • STL • SLDPRT • PDF •
                SolidWorks • AutoCAD
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <div>
                <p className="text-sm text-gray-400">
                  Average Response Time
                </p>

                <p className="text-2xl font-bold text-orange-400">
                  &lt; 24 Hours
                </p>
              </div>

              <ArrowRight
                size={34}
                className="text-orange-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}