import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Car, Flame, Bot, UtensilsCrossed, Package, Shirt, Pill, Plane, Sun, Cpu } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Industries Served by Our CNC Machining Company",
  description:
    "Explore the automotive, electrical, renewable energy, aerospace, oil and gas, pharmaceutical, textile, and industrial sectors listed by Shiv Shakti Industries.",
  path: "/industries",
});

const INDUSTRIES = [
  {
    icon: <Car className="h-8 w-8 text-primary" />,
    title: "Automotive & Mobility",
    size: "Precision Machined Auto Parts, Structural Assemblies",
    quantity: "Standard",
    img: "/images/industries/auto uindus.jpg",
    product: "Solutions for automotive and mobility industries with precision machined parts and structural assemblies."
  },
  {
    icon: <Cpu className="h-8 w-8 text-primary" />,
    title: "Electrical & Electronics",
    size: "Bi-metallic Splices, Aluminum Lugs, Copper Connectors",
    quantity: "Standard",
    img: "/images/industries/electrical 2_idus.jpg",
    product: "Electrical and electronic components ensuring conductivity, durability, and reliability."
  },
  {
    icon: <Sun className="h-8 w-8 text-primary" />,
    title: "Renewable Energy",
    size: "Mounting Structures, Turbine Components, Energy Connectors",
    quantity: "Standard",
    img: "/images/industries/renewable engery.jpg",
    product: "Precision components for solar, wind, and hydro energy systems."
  },
  {
    icon: <Plane className="h-8 w-8 text-primary" />,
    title: "Aerospace & Defence",
    size: "Precision Machined Aerospace Parts, Defence Assemblies",
    quantity: "Standard",
    img: "/images/industries/WhatsApp Image 2026-10-30 at 12.55.30 PM.jpeg",
    product: "High-accuracy aerospace and defence components meeting stringent safety standards."
  },
  {
    icon: <Flame className="h-8 w-8 text-primary" />,
    title: "Oil, Gas & Petrochemical",
    size: "High-Pressure Valve Bodies, Threaded Flanges, Manifold Blocks",
    quantity: "Standard",
    img: "/images/industries/Oil and Gas (1).jpg",
    product: "Specialized engineering solutions for oil, gas, and petrochemical industries."
  },
  {
    icon: <Pill className="h-8 w-8 text-primary" />,
    title: "Pharmaceutical Equipment",
    size: "Machined Stainless Steel Components, Precision Assemblies",
    quantity: "Standard",
    img: "/images/industries/Pharma (2).jpg",
    product: "Specialized equipment designed for pharmaceutical manufacturing, ensuring hygiene, corrosion resistance, and precision."
  },
  {
    icon: <Shirt className="h-8 w-8 text-primary" />,
    title: "Textile Machinery",
    size: "Machined Rollers, Precision Textile Components",
    quantity: "Standard",
    img: "/images/industries/texyline.png",
    product: "Durable and precise components for textile machinery and high-speed operations."
  },
  {
    icon: <Package className="h-8 w-8 text-primary" />,
    title: "Packaging Systems",
    size: "Machined Packaging Parts, Structural Assemblies",
    quantity: "Standard",
    img: "/images/industries/Packing_indus.webp",
    product: "Reliable packaging system components for food, pharma, and industrial applications."
  },
  {
    icon: <UtensilsCrossed className="h-8 w-8 text-primary" />,
    title: "Food Processing Machinery",
    size: "Stainless Steel Components, Precision Assemblies",
    quantity: "Standard",
    img: "/images/industries/industri food p[rocess.webp",
    product: "Corrosion-resistant and hygienic components for food processing machinery."
  },
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "Industrial Automation",
    size: "Custom Machined Components, Automation Assemblies",
    quantity: "Standard",
    img: "/images/industries/indus_autto_indus.jpg",
    product: "Precision components for industrial automation and smart manufacturing systems."
  }
];

export default function IndustriesPage() {
  return (
    <main className="bg-gray-50 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-24 min-h-screen">
      <Breadcrumbs items={[{ label: "Industries", href: "/industries" }]} />
      {/* Header */}
      <section className="bg-secondary py-12 sm:py-16 md:py-20 text-white">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">Industries We Serve</h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-gray-400">
            SHIV SHAKTI INDUSTRIES is committed to delivering precision-engineered solutions that
meet the demanding standards of a broad spectrum of industrial sectors.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="container-custom mt-8 sm:mt-12 md:mt-16">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {INDUSTRIES.map((industry, idx) => (
            <div key={idx} className="group flex flex-col rounded-2xl bg-white p-5 sm:p-6 md:p-8 shadow-md border border-gray-100 hover:border-orange-200 transition-all">
              <div className="overflow-hidden rounded-3xl border border-gray-100">
                <Image
                  src={industry.img}
                  width={900}
                  height={520}
                  sizes="(max-width: 1023px) calc(100vw - 80px), (max-width: 1456px) calc(50vw - 72px), 628px"
                  alt={industry.title}
                  className="h-44 sm:h-52 w-full object-cover transition-all duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4 mt-5 sm:mt-6">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                  {industry.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-secondary transition-colors group-hover:text-orange-500">{industry.title}</h2>
              </div>
              
              <div className="grid gap-4 border-t border-gray-100 pt-6">
                {/*<div>
                  <span className="block text-xs font-bold uppercase text-gray-400">Problems Solved</span>
                  <p className="text-sm font-semibold text-secondary">{industry.problem}</p>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase text-gray-400">Key Applications</span>
                  <p className="text-sm font-semibold text-secondary">{industry.applications}</p>
                </div>*/}
                <div>
                  <span className="block text-xs font-bold uppercase text-primary">Products Manufactured</span>
                  <p className="text-sm font-bold text-secondary">{industry.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 bg-white py-16 border-t border-gray-200">
        <div className="container-custom text-center">
          <h3 className="mb-4 text-2xl font-bold text-secondary">Don't see your industry listed?</h3>
          <p className="mb-8 text-gray-600">Our versatile CNC centers can machine custom alloys for any application.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-bold uppercase tracking-widest text-white transition-all hover:bg-primary/90">
            Consult an Engineer <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}