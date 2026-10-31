"use client";

import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";

export default function CompanyOverview() {
  return (
    <section className="bg-white py-24">

      <Container>

        

        <div className="grid items-center gap-16 lg:grid-cols-2">

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <img
              src="/images/about/factory.jpg"
              alt="Factory"
              className="rounded-3xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <h3 className="text-3xl font-bold text-[#0A2342]">
              Committed to Excellence in Sheet Metal Fabrication and Precision CNC & VMC Machining.
            </h3>

            <h3 className="mt-6 text-7xl font-semibold leading-relaxed text-gray-700">
              We have successfully developed and manufactured a wide range of precision metallic and non-metallic components, customized to meet the unique requirements of diverse industries and applications.
            </h3>

          </motion.div>

        </div>

      </Container>

    </section>
  );
}