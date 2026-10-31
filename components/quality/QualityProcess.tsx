"use client";

import { motion } from "framer-motion";

import SectionTitle from "@/components/common/SectionTitle";
import { qualityProcess } from "@/data/quality";

export default function QualityProcess() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <SectionTitle
          subtitle="Quality Workflow"
          title="Our Inspection Process"
          description="Every SSIpro machined component passes through a structured quality control process to ensure dimensional accuracy, material integrity, and customer satisfaction."
        />

        <div className="relative mt-16">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 hidden h-full w-1 rounded-full bg-orange-200 lg:block" />

          <div className="space-y-12">
            {qualityProcess.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="relative flex flex-col gap-6 lg:flex-row lg:items-start"
                >
                  {/* Timeline Icon */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg">
                    <Icon size={28} />
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                        {step.id}
                      </span>

                      <h3 className="text-2xl font-bold text-slate-900 transition-colors duration-300 hover:text-orange-500">
                        {step.title}
                      </h3>
                    </div>

                    <p className="leading-7 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}