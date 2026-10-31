"use client";

import { motion } from "framer-motion";

import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import Button from "@/components/common/Button";

import { industryDetails } from "@/data/industry-details";

export default function IndustriesGrid() {
  return (
    <section className="bg-white py-24">

      <Container>

        <SectionTitle
          subtitle="Industries"
          title="Industries We Proudly Serve"
          description="Our machining expertise supports multiple industrial sectors worldwide."
        />

        <div className="space-y-12">

          {industryDetails.map((industry, index) => {

            const Icon = industry.icon;

            return (

              <motion.div
                key={industry.id}
                initial={{ opacity:0,y:40 }}
                whileInView={{ opacity:1,y:0 }}
                viewport={{ once:true }}
                transition={{ delay:index*.08 }}
                className="grid overflow-hidden rounded-3xl bg-slate-50 shadow-xl lg:grid-cols-2"
              >

                <img
                  src={industry.image}
                  alt={industry.title}
                  className={`h-full min-h-[350px] w-full object-cover ${
                    index % 2 ? "lg:order-2" : ""
                  }`}
                />

                <div className="flex flex-col justify-center p-10">

                  <div className="inline-flex w-fit rounded-full bg-blue-100 p-4">

                    <Icon
                      size={34}
                      className="text-[#0A2342]"
                    />

                  </div>

                  <h2 className="mt-6 text-4xl font-bold transition-colors duration-300 hover:text-orange-500">

                    {industry.title}

                  </h2>

                  <p className="mt-6 leading-8 text-gray-600">

                    {industry.description}

                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4">

                    {industry.applications.map((item) => (

                      <div
                        key={item}
                        className="rounded-xl bg-white p-4 shadow"
                      >

                        ✓ {item}

                      </div>

                    ))}

                  </div>

                  <div className="mt-10">

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