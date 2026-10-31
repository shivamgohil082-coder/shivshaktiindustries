"use client";

import { motion } from "framer-motion";

import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";

import { services } from "@/data/services";

export default function ServicesGrid() {
  return (
    <section className="bg-slate-50 py-24">

      <Container>

        <SectionTitle
          subtitle="Our Services"
          title="Complete SSIpro Machining Solutions"
          description="Professional machining services for every stage of manufacturing."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {services.map((service, index) => {

            const Icon = service.icon;

            return (

              <motion.div
                key={service.id}
                initial={{ opacity:0,y:30 }}
                whileInView={{ opacity:1,y:0 }}
                viewport={{ once:true }}
                transition={{ delay:index*.1 }}
                className="group overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >

                <div className="overflow-hidden">

                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                </div>

                <div className="p-8">

                  <div className="inline-flex rounded-full bg-blue-100 p-4">

                    <Icon
                      size={34}
                      className="text-[#0A2342]"
                    />

                  </div>

                  <h3 className="mt-6 text-2xl font-bold transition-colors duration-300 group-hover:text-orange-500">
                    {service.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {service.description}
                  </p>

                  <div className="mt-8">

                    <Button href="/upload">
                      Request Quote
                    </Button>

                  </div>

                </div>

              </motion.div>

            );

          })}

        </div>

      </Container>

    </section>
  );
}