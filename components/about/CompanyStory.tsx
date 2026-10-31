"use client";

import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

export default function CompanyStory() {
  return (
    <section className="bg-white py-24">

      <Container>

        <SectionTitle
          subtitle="About Company"
          title="Engineering Excellence Since 2010"
          description="Delivering world-class precision machining solutions for global industries."
        />

        <div className="grid items-center gap-16 lg:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7 }}
          >

            <img
              src="/images/about/factory.jpg"
              alt="Factory"
              className="rounded-3xl shadow-2xl"
            />

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <h2 className="text-4xl font-bold text-[#0A2342] transition-colors duration-300 hover:text-orange-500">

              Precision Manufacturing Partner

            </h2>

            <p className="mt-8 leading-8 text-gray-600">

              We specialize in manufacturing custom precision
              machined components according to customer
              engineering drawings.

            </p>

            <p className="mt-6 leading-8 text-gray-600">

              Our facility combines advanced SSIpro Turning,
              Milling, VMC, HMC and Grinding technologies
              with skilled engineers to manufacture parts
              meeting the highest quality standards.

            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">

              <div>

                <h3 className="text-5xl font-bold text-orange-500">
                  15+
                </h3>

                <p className="mt-2">
                  Years Experience
                </p>

              </div>

              <div>

                <h3 className="text-5xl font-bold text-orange-500">
                  5200+
                </h3>

                <p className="mt-2">
                  Projects Delivered
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </Container>

    </section>
  );
}