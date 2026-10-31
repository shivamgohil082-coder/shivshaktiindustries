"use client";

import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { companyTimeline } from "@/data/timlene";

export default function CompanyTimeline() {
  return (
    <section className="bg-slate-50 py-24">

      <Container>

        <SectionTitle
          subtitle="Journey"
          title="Our Growth Timeline"
          description="From a small workshop to a trusted precision engineering company."
        />

        <div className="relative mx-auto max-w-5xl">

          <div className="absolute left-8 top-0 h-full w-1 bg-orange-500 md:left-1/2 md:-translate-x-1/2" />

          {companyTimeline.map((item, index) => (

            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative mb-16 flex ${
                index % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >

              <div className="hidden md:block md:w-1/2" />

              <div className="absolute left-8 top-5 h-5 w-5 rounded-full border-4 border-white bg-orange-500 md:left-1/2 md:-translate-x-1/2" />

              <div className="ml-20 rounded-2xl bg-white p-8 shadow-xl md:ml-0 md:w-1/2">

                <span className="text-sm font-bold text-orange-500">
                  {item.year}
                </span>

                <h3 className="mt-3 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-gray-600">
                  {item.description}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </Container>

    </section>
  );
}