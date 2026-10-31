"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock3,
  ChevronRight,
} from "lucide-react";

import Button from "@/components/common/Button";

const contactHighlights = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 98765 43210",
  },
  {
    icon: Mail,
    title: "Email",
    value: "nenadarshan405@gmail.com",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Mumbai, Maharashtra",
  },
  {
    icon: Clock3,
    title: "Response Time",
    value: "< 24 Hours",
  },
];

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 text-white">
      {/* Background */}

      <div className="absolute inset-0">
        <Image
          src="/images/products/c01.jpeg"
          alt="Contact SSIpro Manufacturing Company"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/60" />
      </div>

      {/* Decorative Blurs */}

      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container relative mx-auto px-6">

        {/* Breadcrumb */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2 text-sm text-gray-300"
        >
          <Link
            href="/"
            className="transition hover:text-orange-400"
          >
            Home
          </Link>

          <ChevronRight size={16} />

          <span className="text-orange-400">
            Contact
          </span>
        </motion.div>

        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex rounded-full bg-orange-500/20 px-5 py-2 text-sm font-semibold text-orange-400">
              Contact Our Engineering Team
            </span>

            <h1 className="mt-6 text-5xl font-black leading-tight lg:text-6xl">
              Let's Discuss
              <span className="block text-orange-500">
                Your SSIpro Project
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Whether you need prototype machining, production
              manufacturing, precision SSIpro turning, milling,
              fabrication, or engineering consultation, our team is
              ready to help you find the right solution.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="#contact-form">
                Request a Quote
                <ArrowRight size={18} />
              </Button>

              <Button
                href="/upload"
                variant="secondary"
              >
                Upload Drawing
              </Button>
            </div>
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {contactHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  whileHover={{ y: -6 }}
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all"
                >
                  <div className="mb-5 inline-flex rounded-xl bg-orange-500/20 p-4">
                    <Icon
                      size={28}
                      className="text-orange-400"
                    />
                  </div>

                  <p className="text-sm uppercase tracking-wider text-gray-400">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    {item.value}
                  </h3>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

        {/* Bottom Banner */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 rounded-3xl border border-orange-500/20 bg-white/5 p-8 backdrop-blur-lg"
        >
          <div className="grid gap-8 lg:grid-cols-3">

            <div>
              <h3 className="text-2xl font-bold">
                Fast Response
              </h3>

              <p className="mt-3 text-gray-300">
                Most inquiries receive a response from our
                engineering team within one business day.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                Technical Support
              </h3>

              <p className="mt-3 text-gray-300">
                Need help selecting materials, machining methods,
                or production quantities? We're here to assist.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                Global Service
              </h3>

              <p className="mt-3 text-gray-300">
                Supporting OEMs, startups, and manufacturers with
                worldwide delivery and precision engineering.
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}