"use client";

import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

const machines = [
  "SSIpro Turning Centers",
  "SSIpro Milling Machines",
  "Vertical Machining Centers",
  "Horizontal Machining Centers",
  "Surface Grinding",
  "Inspection Laboratory",
];

export default function FactoryInfrastructure() {
  return (
    <section className="bg-white py-24">

      <Container>

        <SectionTitle
          subtitle="Infrastructure"
          title="Modern Manufacturing Facility"
        />

        <div className="grid gap-10 lg:grid-cols-2">

          <img
            src="/images/about/infrastructure.jpg"
            alt="Infrastructure"
            className="rounded-3xl shadow-xl"
          />

          <div>

            <h3 className="text-3xl font-bold">

              Advanced Manufacturing Equipment

            </h3>

            <div className="mt-8 space-y-4">

              {machines.map((machine) => (

                <div
                  key={machine}
                  className="rounded-xl border p-5"
                >
                  {machine}
                </div>

              ))}

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}