"use client";

import { motion } from "framer-motion";
import {
  Clock3,
  ShieldCheck,
  Cog,
  Truck,
  Headset,
  BadgeCheck,
} from "lucide-react";

import SectionTitle from "@/components/common/SectionTitle";

const benefits = [
  {
    icon: Clock3,
    title: "24-Hour Quotation",
    description:
      "Receive a detailed quotation within one business day after submitting your drawings and project requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential & Secure",
    description:
      "Your CAD files, engineering drawings, and technical data remain confidential and are handled securely.",
  },
  {
    icon: Cog,
    title: "Engineering Review",
    description:
      "Our engineers review manufacturability, material selection, tolerances, and machining feasibility before production.",
  },
  {
    icon: BadgeCheck,
    title: "Precision Manufacturing",
    description:
      "Manufacturing using advanced SSIpro machining with strict quality control and dimensional inspection.",
  },
  {
    icon: Truck,
    title: "Worldwide Delivery",
    description:
      "Reliable packaging and logistics ensure safe delivery of prototype and production parts worldwide.",
  },
  {
    icon: Headset,
    title: "Technical Support",
    description:
      "Dedicated engineering support throughout quotation, production, inspection, and delivery.",
  },
];

export default function UploadBenefits() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <SectionTitle
          subtitle="Why Choose Us"
          title="Why Upload Your Drawings to Us?"
          description="From quotation to final delivery, our engineering team ensures every project receives expert attention, transparent communication, and precision manufacturing."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg">
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900 transition-colors duration-300 hover:text-orange-500">
                  {benefit.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 rounded-3xl bg-slate-900 p-10 text-center text-white"
        >
          <h3 className="text-3xl font-bold">
            From Drawing to Finished Component
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            Whether you need a single prototype or high-volume production,
            our experienced engineers and modern SSIpro machining facility
            ensure every component is manufactured according to your
            exact specifications.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              "Prototype Development",
              "Production Machining",
              "Quality Inspection",
              "Fast Delivery",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}