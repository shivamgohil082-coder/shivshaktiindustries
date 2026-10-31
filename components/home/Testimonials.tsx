"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-24">

      <Container>

        <SectionTitle
          subtitle="Testimonials"
          title="What Our Clients Say"
          description="Trusted by manufacturers worldwide for quality, precision and reliability."
        />

        <div className="grid gap-8 lg:grid-cols-3">

          {testimonials.map((item, index) => (

            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="rounded-3xl bg-white p-8 shadow-xl hover:shadow-2xl transition"
            >

              <Quote
                size={42}
                className="text-orange-500"
              />

              <div className="mt-5 flex gap-1">

                {[1,2,3,4,5].map((star)=>(
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              <p className="mt-6 leading-8 text-gray-600 italic">
                "{item.review}"
              </p>

              <div className="mt-8">

                <h4 className="text-xl font-bold">
                  {item.name}
                </h4>

                <p className="text-gray-500">
                  {item.company}
                </p>

              </div>

            </motion.div>

          ))}

        </div>

      </Container>

    </section>
  );
}