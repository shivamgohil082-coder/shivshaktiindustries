"use client";

import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { certifications } from "@/data/certification";

export default function Certifications() {
  return (
    <section className="bg-white py-24">

      <Container>

        <SectionTitle
          subtitle="Quality"
          title="Certifications & Inspection"
          description="Committed to delivering consistent quality through modern inspection systems."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {certifications.map((item, index) => (

            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="overflow-hidden rounded-2xl bg-white shadow-xl transition hover:-translate-y-2 hover:shadow-2xl"
            >

              <img
                src={item.image}
                alt={item.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-6">

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
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