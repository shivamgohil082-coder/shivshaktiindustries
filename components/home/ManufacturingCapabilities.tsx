"use client";

import { motion } from "framer-motion";
import {
  Cog,
  Drill,
  Wrench,
  Settings2,
  Hammer,
  Factory,
} from "lucide-react";

import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

const capabilities = [
  {
    icon: Cog,
    title: "CNC Turning",
  },
  {
    icon: Factory,
    title: "CNC Milling",
  },
  {
    icon: Settings2,
    title: "VMC Machining",
  },
  {
    icon: Drill,
    title: "Surface Grinding",
  },
  {
    icon: Hammer,
    title: "Prototype Development",
  },
  {
    icon: Wrench,
    title: "Batch Production",
  },
];

export default function ManufacturingCapabilities() {
  return (
    <section className="bg-white py-24">

      <Container>

        <SectionTitle
          subtitle="Capabilities"
          title="Advanced Manufacturing Technologies"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {capabilities.map((item, index) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * .15 }}
                className="rounded-2xl border bg-white p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
              >

                <Icon
                  size={50}
                  className="text-[#0A2342]"
                />

                <h3 className="mt-6 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  High precision machining using modern CNC technology
                  delivering micron-level accuracy.
                </p>

              </motion.div>
            );
          })}

        </div>

      </Container>

    </section>
  );
}