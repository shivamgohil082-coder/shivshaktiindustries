"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Upload,
  Phone,
  FileText,
  CheckCircle2,
} from "lucide-react";
import Button from "@/components/common/Button";

const benefits = [
  "Free Engineering Consultation",
  "Fast RFQ Response Within 24 Hours",
  "ISO 9001 Certified Manufacturing",
  "Worldwide Shipping Available",
];

export default function ProductCTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/backgrounds/cta-bg.jpg"
          alt="SSIpro Manufacturing"
          className="h-full w-full object-cover opacity-10"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-950" />
      </div>

      {/* Decorative Blurs */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container relative mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl lg:p-16"
        >

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* Left */}

            <div>

              <span className="rounded-full bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-400">

                Request Custom Manufacturing

              </span>

              <h2 className="mt-6 text-4xl font-black leading-tight lg:text-5xl">

                Have Your Own
                <span className="block text-orange-500">

                  Engineering Drawing?

                </span>

              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-300">

                Upload your CAD drawing, STEP file, PDF,
                or technical blueprint and receive a
                detailed quotation from our engineering
                team within 24 hours.

              </p>

              <div className="mt-8 space-y-4">

                {benefits.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-orange-500"
                    />

                    <span className="text-gray-200">
                      {item}
                    </span>
                  </div>
                ))}

              </div>

            </div>

            {/* Right */}

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl bg-slate-900/80 p-8 shadow-2xl"
            >

              <h3 className="text-2xl font-bold">

                Start Your Project

              </h3>

              <p className="mt-3 text-gray-400">

                Send us your manufacturing requirements
                today.

              </p>

              <div className="mt-8 space-y-4">

                <Button href="/upload">
                  <Upload size={18} />

                  Upload Drawing

                </Button>

                <Button
                  href="/contact"
                  variant="secondary"
                >
                  <FileText size={18} />

                  Request Quote

                </Button>

                <Button
                  href="tel:+911234567890"
                  variant="secondary"
                >
                  <Phone size={18} />

                  Call Our Engineers

                </Button>

              </div>

              <div className="mt-10 rounded-xl border border-orange-500/30 bg-orange-500/10 p-5">

                <p className="text-sm text-orange-300">

                  ✔ Supported File Types

                </p>

                <p className="mt-3 text-gray-300">

                  PDF • DWG • DXF • STEP • IGES • STL • SLDPRT

                </p>

              </div>

            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}