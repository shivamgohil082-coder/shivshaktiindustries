"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import SectionTitle from "@/components/common/SectionTitle";
import { inspectionEquipment } from "@/data/quality";

export default function InspectionEquipment() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <SectionTitle
          subtitle="Inspection Equipment"
          title="Precision Measuring Instruments"
          description="We utilize calibrated inspection equipment to ensure every machined component meets the required tolerances and quality standards."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {inspectionEquipment.map((equipment, index) => {
            const Icon = equipment.icon;

            return (
              <motion.div
                key={equipment.id}
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
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                {/* Image */}

                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={equipment.image}
                    alt={equipment.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg">
                    <Icon size={24} />
                  </div>
                </div>

                {/* Content */}

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {equipment.name}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {equipment.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between rounded-xl bg-orange-50 px-4 py-3">
                    <span className="text-sm font-semibold text-gray-700">
                      Accuracy
                    </span>

                    <span className="rounded-lg bg-orange-500 px-3 py-1 text-sm font-bold text-white">
                      {equipment.accuracy}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Info */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 rounded-3xl border border-orange-200 bg-orange-50 p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-900">
            Calibrated Inspection Equipment
          </h3>

          <p className="mx-auto mt-4 max-w-3xl leading-8 text-gray-600">
            All measuring instruments are periodically calibrated to ensure
            reliable and repeatable inspection results, helping us maintain
            consistent product quality and dimensional accuracy for every
            customer order.
          </p>
        </motion.div>
      </div>
    </section>
  );
}