import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Precision CNC Machine Shop Vadodara",
  description: "Learn about Shiv Shakti Industries: 11+ years of manufacturing excellence, modern 4-axis/5-axis CNC & VMC machining infrastructure in Makarpura GIDC, Vadodara, Gujarat.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-white pt-24">
      {/* Page Header */}
      <section className="bg-secondary py-20 text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-black uppercase tracking-tighter md:text-7xl">About Us</h1>
          
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24">
        <div className="container-custom grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="mb-4 inline-block font-bold uppercase tracking-widest text-primary">Welcome to SHIV SHAKTI INDUSTRIES</span>
            <h2 className="mb-6 text-4xl font-bold text-secondary transition-colors duration-300 hover:text-orange-500">Leading Manufacturer of Precision Engineering Parts</h2>
            <div className="mb-6 text-gray-600 leading-relaxed space-y-3">
              <p>• SHIV SHAKTI INDUSTRIES is a fast-growing precision engineering company with the objective of delivering world-class machining solutions for various industrial sectors.</p>
              <p>• We manufacture precision components according to customer drawings, technical specifications, samples, and customized requirements while maintaining the highest standards of quality and dimensional accuracy.</p>
              <p>• With a highly experienced technical team, modern machinery, and advanced inspection instruments, we ensure every component meets the exact requirements of our customers.</p>
              <p>• From prototype development to batch production and mass manufacturing, we provide reliable machining solutions for clients across different industries.</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6 border-l-4 border-primary pl-6">
             {/* <div>
                <h3 className="text-4xl font-black text-secondary">15K+</h3>
                <p className="text-sm font-bold uppercase text-gray-500">Products Developed</p>
              </div>
              <div>
                <h3 className="text-4xl font-black text-secondary">50+</h3>
                <p className="text-sm font-bold uppercase text-gray-500">Global Clients</p>
              </div>*/}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="h-64 w-full overflow-hidden rounded-2xl bg-gray-200 relative">
               <div className="absolute inset-0 bg-[url('/images/about/1.png')] bg-cover bg-center"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-48 w-full overflow-hidden rounded-2xl bg-gray-200 relative">
                 <div className="absolute inset-0 bg-[url('/images/about/download.jpg')] bg-cover bg-center"></div>
              </div>
              <div className="h-48 w-full overflow-hidden rounded-2xl bg-gray-200 relative">
                 <div className="absolute inset-0 bg-[url('/images/about/2.jpg')] bg-cover bg-center"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-24">
        <div className="container-custom">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="group rounded-2xl border border-gray-100 bg-white p-10 shadow-md transition-all duration-300 hover:border-orange-200 hover:shadow-xl">
              <h3 className="mb-4 text-2xl font-bold text-secondary transition-colors duration-300 group-hover:text-orange-500">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To engineer and deliver the most precise, reliable, and high-quality machined components in the industry, empowering our clients' innovations while maintaining exceptional customer satisfaction and on-time delivery.
              </p>
            </div>
            <div className="group rounded-2xl border border-gray-100 bg-white p-10 shadow-md transition-all duration-300 hover:border-orange-200 hover:shadow-xl">
              <h3 className="mb-4 text-2xl font-bold text-secondary transition-colors duration-300 group-hover:text-orange-500">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                Our vision is to be recognized as a global leader in precision engineering by delivering innovative, high-quality manufacturing solutions that inspire trust, create lasting value, and drive industrial excellence. SHIV SHAKTI INDUSTRIES aims to contribute to the growth and success of industries across the world
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Working Strategies & Quality */}
      <section className="py-24">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-secondary">OUR EXPERTISE</h2>
          
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Precision CNC Turned Components",
              "High-Accuracy VMC Milled Components",
              "Custom Precision Machined Parts",
              "Sheet Metal Components & Fabrication",
              "Prototype & Product Development",
              "Comprehensive Mechanical Assemblies",
              "Fabricated Structural Assemblies",
              "Plastic Injection Moulded Components",
              "Ferrous & Non-Ferrous Metal Castings",
              "Precision Engineering Components",
              "Industrial Job Work Manufacturing",
 "CNC Turning Services",
 "VMC Milling Services",
 "Component Finishing & Secondary Operations",
 "Drilling, Tapping & Threading Operations"

            ].map((strategy, idx) => (
              <div key={idx} className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-lg">
                <CheckCircle2 className="mt-1 text-primary shrink-0" size={24} />
                <p className="font-semibold text-secondary transition-colors duration-300 group-hover:text-orange-500">{strategy.trim()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PRINCIPLES */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-secondary">Our Principles</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Excellence in Engineering",
"Accuracy and Reliability",
"Continuous Process Enhancement",
"Customer-First Philosophy",
"Timely Project Execution",
"Relationships Built on Trust",

            ].map((principle, idx) => (
              <div key={idx} className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-lg">
                <CheckCircle2 className="mt-1 text-primary shrink-0" size={24} />
                <p className="font-semibold text-secondary transition-colors duration-300 group-hover:text-orange-500">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WE MANUFACTURE COMPONENTS BASED ON */}
      <section className="py-24">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-secondary">WE MANUFACTURE COMPONENTS BASED ON</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3 justify-center">
            {[
              "Customer Engineering Drawings",
              "CAD/CAM Designs",
              "Technical Specifications",
              "Customer Samples",
              "Customized Manufacturing Requirements"
            ].map((principle, idx) => (
              <div key={idx} className="group flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-200 hover:shadow-lg">
                <CheckCircle2 className="mt-1 text-primary shrink-0" size={24} />
                <p className="font-semibold text-secondary transition-colors duration-300 group-hover:text-orange-500">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS WE MACHINE 
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-secondary">Materials We Machine</h2>
            <p className="mt-2 text-gray-500">We work with a wide range of engineering materials including:</p>
          </div>*/}
          
          {/* Ferrous 
          <div className="mb-12">
            <h4 className="mb-6 text-xl font-bold text-secondary border-l-4 border-primary pl-4">Ferrous Engineering Materials</h4>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                "Ductile Iron Components",
                "Cast Iron Components",
                "Tool & Die SteelsBrass & Bronze",
                "EN Series Engineering Steels",
                "Stainless Steel Grades",
                "Carbon & Alloy Steels",
                "Mild Steel"
              ].map((material, idx) => (
                <div key={idx} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <CheckCircle2 className="mt-1 text-primary shrink-0" size={24} />
                  <p className="font-semibold text-secondary">{material}</p>
                </div>
              ))}
            </div>
          </div> */}

          {/* Non-Ferrous 
          <div>
            <h4 className="mb-2 text-xl font-bold text-secondary border-l-4 border-primary pl-4">Non-Ferrous Engineering Materials</h4>
            <p className="mb-6 text-gray-500 text-sm">We also specialize in machining non-ferrous materials such as:</p>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                "Aluminium Alloys",
                "Brass",
                "Bronze",
                "Phosphor Bronze",
                "Titanium",
                "Nylon",
                "Engineering Plastics",
                "Delrin (PO9M)"
              ].map((material, idx) => (
                <div key={idx} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <CheckCircle2 className="mt-1 text-primary shrink-0" size={24} />
                  <p className="font-semibold text-secondary">{material}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="bg-primary py-16 text-white text-center">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-6">Discuss your Requirements with Shiv Shakti industries</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white text-primary px-8 py-4 font-bold uppercase tracking-widest transition-all hover:bg-gray-100">
            Contact Us Today <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}