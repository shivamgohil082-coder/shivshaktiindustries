"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  PhoneCall,
  Mail,
  Upload,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Cog,
} from "lucide-react";

import Button from "@/components/common/Button";

const benefits = [
  {
    icon: Clock3,
    title: "24-Hour RFQ Response",
  },
  {
    icon: ShieldCheck,
    title: "NDA Available",
  },
  {
    icon: Cog,
    title: "Precision Manufacturing",
  },
  {
    icon: CheckCircle2,
    title: "100% Quality Inspection",
  },
];

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
      {/* Background */}

      <div className="absolute inset-0">
        <Image
          src="/images/contact/contact-cta.jpg"
          alt="Contact Our SSIpro Manufacturing Team"
          fill
          className="object-cover opacity-15"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-950" />
      </div>

      {/* Decorative Blobs */}

      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container relative mx-auto px-6">

        <div className="mx-auto max-w-6xl">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-5 py-2 text-sm font-semibold text-orange-400">
              Ready to Start?
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight lg:text-6xl">
              Let's Turn Your
              <span className="block text-orange-500">
                Design Into Reality
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Whether you need prototype machining, custom precision parts,
              or high-volume production, our engineering team is ready to
              deliver reliable manufacturing solutions tailored to your
              requirements.
            </p>
          </motion.div>

          {/* Benefits */}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{
                    y: -8,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-orange-500/20 p-3">
                    <Icon
                      size={26}
                      className="text-orange-400"
                    />
                  </div>

                  <h3 className="text-lg font-bold">
                    {item.title}
                  </h3>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 flex flex-wrap justify-center gap-5"
          >
            <Button disabled className="opacity-50 cursor-not-allowed">
              <Upload size={18} />
              Upload CAD Drawing
            </Button>

            <Button
              href="tel:+919213662579"
              variant="secondary"
            >
              <PhoneCall size={18} />
              Call Us
            </Button>

            <Button
              href="mailto:rfq@shivshaktiindustries.org"
              variant="secondary"
            >
              <Mail size={18} />
              Email Us
            </Button>
          </motion.div>

          {/* Bottom Banner */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 rounded-3xl border border-orange-500/20 bg-gradient-to-r from-orange-500/15 to-orange-600/10 p-10"
          >
            <div className="grid items-center gap-10 lg:grid-cols-2">

              <div>
                <h3 className="text-3xl font-bold">
                  Need a Fast Quotation?
                </h3>

                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Upload your CAD drawing today and receive a detailed
                  quotation from our manufacturing engineers within
                  24 business hours.
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <button
                  disabled
                  className="inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-8 py-5 text-lg font-semibold text-white opacity-50 cursor-not-allowed"
                >
                  Upload Drawing Now

                  <ArrowRight size={22} />
                </button>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
