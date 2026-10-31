import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Precision CNC Machining & VMC Manufacturing | Vadodara",
  description:
    "Shiv Shakti Industries is a premier manufacturer of high-precision CNC turned parts, VMC machined components, and custom engineering assemblies in Makarpura GIDC, Vadodara, Gujarat.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <main className="bg-white">
      <Hero />
      <Stats />

      <section className="bg-white pt-24 pb-16">
        <div className="container-custom">
          <div className="mb-14 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Manufacturing Excellence</span>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-secondary md:text-5xl">
              Why Partner With Shiv Shakti Industries
            </h2>
            <div className="mx-auto mt-4 h-1.5 w-20 bg-primary" />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Unmatched Precision",
                desc: "Delivering high accuracy and consistent quality through advanced CNC and VMC machining, ensuring precision in every component.",              },
              {
                title: "11+ Years Experience",
                desc: "Deep expertise in custom component manufacturing across Automotive, Energy, Aerospace and Petrochemical industries.",
              },
              {
                title: "Dependable Delivery Performance",
                desc: "We are committed to delivering every project on time without compromising on quality. Our efficient production planning ensures reliable and consistent delivery schedules.",              },
              {
                title: "Precision Engineered Solutions",
                desc: "Every component is manufactured with strict quality control and micron-level precision, ensuring outstanding performance, durability, and reliability.",
              },
              {
                title: "Cutting-Edge CNC & VMC Technology",
                desc: "Equipped with advanced Traub machines, CNC turning centers, and high-speed VMC milling units for complex geometric repeatability.",
              },
              {
                title: "Dedicated Team of Engineering Professionals",
                desc: "Our experienced engineers and skilled technicians work closely with clients to deliver optimal DFM (Design for Manufacturability) results.",
              },
              
            ].map((item, idx) => (
              <div key={idx} className="group flex flex-col rounded-2xl bg-white p-8 shadow-md border border-gray-100 hover:border-orange-200 transition-all">
                <div className="mb-6 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg">
                  0{idx + 1}
                </div>
                <h3 className="mb-3 text-xl font-bold text-secondary transition-colors group-hover:text-orange-500">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="inline-block rounded-full bg-secondary px-8 py-3.5 text-sm text-white shadow-md md:text-base font-semibold">
              <span className="font-bold
               text-white">Nature of Business :</span> Manufacture
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-20 text-white border-t border-gray-800">
        <div className="container-custom text-center">
          <h2 className="mb-4 text-3xl font-black uppercase tracking-tight md:text-5xl">
            Ready to Manufacture Your Precision Components?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-gray-400 text-base md:text-lg">
            Send us your CAD drawings or technical specifications for rapid feasibility analysis and a competitive quotation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-red-900/30"
          >
            Request Quotation (RFQ) <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
