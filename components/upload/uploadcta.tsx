"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Mail,
  Upload,
  FileCheck,
  Clock3,
} from "lucide-react";

import Button from "@/components/common/Button";

const features = [
  "Free Engineering Consultation",
  "Quotation Within 24 Hours",
  "Prototype & Mass Production",
  "100% Quality Inspection",
  "Worldwide Shipping",
  "NDA Available on Request",
];

export default function UploadCTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      {/* Background */}

      <div className="absolute inset-0">
        <Image
          src="/images/upload/upload-cta.jpg"
          alt="Request SSIpro Quote"
          fill
          className="object-cover opacity-15"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-950" />
      </div>

      {/* Decorative Blur */}

      <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container relative mx-auto px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-400">
              <FileCheck size={18} />
              Start Your Manufacturing Project
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight lg:text-5xl">
              Let's Build Your
              <span className="block text-orange-500">
                Next Precision Component
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-300">
              Upload your CAD drawings and let our experienced
              manufacturing engineers review your design,
              recommend improvements, and provide a competitive
              quotation for prototype or production machining.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="text-orange-500"
                  />

                  <span className="text-gray-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#upload-form">
                <Upload size={18} />
                Upload Drawing
              </Button>

              <Button
                href="/contact"
                variant="secondary"
              >
                Contact Sales
                <ArrowRight size={18} />
              </Button>
            </div>
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl"
          >
            <h3 className="text-3xl font-bold">
              Need Immediate Assistance?
            </h3>

            <p className="mt-4 leading-7 text-gray-300">
              Our engineering team is available to discuss your
              project requirements, manufacturing feasibility,
              material selection, and production timelines.
            </p>

            <div className="mt-10 space-y-8">

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-orange-500/20 p-3">
                  <PhoneCall
                    size={22}
                    className="text-orange-400"
                  />
                </div>

                <div>
                  <p className="font-semibold">
                    Call Our Engineers
                  </p>

                  <a
                    href="tel:+919213662579"
                    className="mt-1 block text-gray-300 hover:text-orange-400"
                  >
                    +91 92136 62579
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-orange-500/20 p-3">
                  <Mail
                    size={22}
                    className="text-orange-400"
                  />
                </div>

                <div>
                  <p className="font-semibold">
                    Email Us
                  </p>

                  <a
                    href="mailto:rfq@shivshaktiindustries.org"
                    className="mt-1 block text-gray-300 hover:text-orange-400"
                  >
                    rfq@shivshaktiindustries.org
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-orange-500/20 p-3">
                  <Clock3
                    size={22}
                    className="text-orange-400"
                  />
                </div>

                <div>
                  <p className="font-semibold">
                    Business Hours
                  </p>

                  <p className="mt-1 text-gray-300">
                    Monday – Saturday
                    <br />
                    9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-10 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-6">
              <h4 className="font-bold text-orange-400">
                Supported CAD Formats
              </h4>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "STEP",
                  "STP",
                  "IGES",
                  "DWG",
                  "DXF",
                  "PDF",
                  "STL",
                  "SLDPRT",
                  "SolidWorks",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-white/10 px-3 py-2 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 border-t border-white/10 pt-6">
                <p className="text-sm text-gray-300">
                  Average RFQ response time:
                </p>

                <p className="mt-2 text-3xl font-bold text-orange-400">
                  Less than 24 Hours
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Banner */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500/15 to-orange-600/10 p-8 text-center"
        >
          <h3 className="text-3xl font-bold">
            Ready to Get Started?
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-gray-300">
            Whether you need one prototype or large-scale production,
            our SSIpro machining experts are ready to transform your
            engineering drawings into high-quality precision components.
          </p>

          <div className="mt-8">
            <Link
              href="#upload-form"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-orange-600"
            >
              Upload Your Drawing
              <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
