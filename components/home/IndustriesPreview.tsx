"use client";

import { motion } from "framer-motion";

import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

import { industries } from "@/data/industries";

export default function IndustriesPreview() {
  return (
    <section className="bg-gray-50 py-24">

      <Container>

        <SectionTitle
          subtitle="Industries"
          title="Serving Multiple Industries"
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {industries.map((industry, index) => {

            const Icon = industry.icon;

            return (
              <motion.div
                key={industry.id}
                initial={{ opacity:0,y:30 }}
                whileInView={{ opacity:1,y:0 }}
                viewport={{ once:true }}
                transition={{ delay:index*.1 }}
                className="overflow-hidden rounded-2xl bg-white shadow-lg"
              >

                <img
                  src={industry.image}
                  alt={industry.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-6">

                  <Icon
                    size={38}
                    className="text-orange-500"
                  />

                  <h3 className="mt-4 text-xl font-bold">
                    {industry.title}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-7">
                    {industry.description}
                  </p>

                </div>

              </motion.div>
            );

          })}

        </div>

      </Container>

    </section>
  );
}