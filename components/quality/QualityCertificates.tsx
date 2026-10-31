"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, CheckCircle2 } from "lucide-react";

import SectionTitle from "@/components/common/SectionTitle";
import { qualityCertificates } from "@/data/quality";

export default function QualityCertificates() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <SectionTitle
          subtitle="Certifications & Standards"
          title="Committed to International Quality Standards"
          description="Our quality management system, documentation, and inspection procedures ensure every component is manufactured according to customer requirements and industry standards."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {qualityCertificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
              }}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              {/* Certificate Image */}

              <div className="relative h-60 overflow-hidden">
                <Image
                  src={certificate.image}
                  alt={certificate.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg">
                  <Award size={28} />
                </div>
              </div>

              {/* Content */}

              <div className="p-7">
                <h3 className="text-2xl font-bold text-slate-900">
                  {certificate.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {certificate.description}
                </p>

                <div className="mt-8 flex items-center gap-3 rounded-xl bg-green-50 px-4 py-3">
                  <CheckCircle2
                    size={20}
                    className="text-green-600"
                  />

                  <span className="text-sm font-semibold text-green-700">
                    Verified & Maintained
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Highlights */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-20 rounded-3xl bg-slate-900 p-10 text-white"
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="text-xl font-bold text-orange-400">
                ISO Quality
              </h4>

              <p className="mt-3 text-gray-300">
                Certified quality management system for consistent manufacturing.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-orange-400">
                Material Traceability
              </h4>

              <p className="mt-3 text-gray-300">
                Complete tracking from raw material procurement to finished parts.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-orange-400">
                Inspection Reports
              </h4>

              <p className="mt-3 text-gray-300">
                Dimensional inspection reports available with every production batch.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-orange-400">
                Customer Satisfaction
              </h4>

              <p className="mt-3 text-gray-300">
                Every order is verified before dispatch to meet customer specifications.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}