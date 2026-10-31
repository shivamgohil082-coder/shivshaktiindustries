"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Cog,
  Factory,
  Truck,
} from "lucide-react";

import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    desc: "Every component undergoes rigorous inspection before dispatch.",
  },
  {
    icon: Cog,
    title: "Precision Manufacturing",
    desc: "High tolerance machining with modern SSIpro equipment.",
  },
  {
    icon: Factory,
    title: "Advanced Infrastructure",
    desc: "Modern production facility equipped with VMC, HMC and SSIpro machines.",
  },
  {
    icon: Truck,
    title: "On-Time Delivery",
    desc: "Efficient production planning ensures reliable delivery schedules.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-24">

      <Container>


        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.15,
                }}
                className="rounded-2xl bg-white p-8 shadow-lg transition-all hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="mb-6 inline-flex rounded-full bg-blue-100 p-4">
                  <Icon
                    size={32}
                    className="text-[#0A2342]"
                  />
                </div>

                <h3 className="mb-4 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="leading-7 text-gray-600">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}

        </div>

      </Container>

    </section>
  );
}