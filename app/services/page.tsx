import Link from "next/link";
import { ArrowRight, Settings2 } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CNC Turning, Milling and Precision Machining Services",
  description:
    "CNC turning, CNC milling, VMC machining, fabrication, and custom manufacturing services for precision components in Vadodara, India.",
  path: "/services",
  keywords: [
    "CNC turning manufacturer India",
    "Custom precision components manufacturer",
    "CNC machining services Vadodara",
  ],
});

const SERVICES = [
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "CNC TURNING",
    description: "High-precision CNC turning for complex components with superior dimensional accuracy and excellent surface finish.",
    benefits: "Zero defects, rapid prototyping, and high repeatability."
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "CNC MILLING",
    description: "Advanced CNC milling solutions for intricate geometries, precision machining, and high-quality finishes.",
    benefits: "Superior accuracy, complex geometries, and consistent quality."
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "VMC MACHINING",
    description: "Precision Vertical Machining Center (VMC) services for high-performance milling, drilling, tapping, and contour machining.",
    benefits: "High-performance machining, versatility, and reliability."
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "CONVENTIONAL MACHINING",
    description: "Comprehensive conventional machining services, including lathe operations, drilling, tapping, boring, reaming, and other secondary processes.",
    benefits: "Cost-effective, flexible, and widely applicable."
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "SHEET METAL FABRICATION",
    description: "Precision sheet metal cutting, bending, forming, welding, and fabrication for custom industrial applications.",
    benefits: "Custom solutions, durability, and industrial-grade fabrication."
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "CUSTOM MANUFACTURING",
    description: "Manufacturing precision components according to customer drawings, CAD models, technical specifications, and samples.",
    benefits: "Tailored production, precision, and customer satisfaction."
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "PROTOTYPE DEVELOPMENT",
    description: "Rapid prototype development to validate designs and accelerate product development before mass production.",
    benefits: "Faster validation, reduced risk, and accelerated innovation."
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "MACHINING ASSEMBLIES",
    description: "Complete machining and assembly of mechanical components, ensuring seamless integration, precision, and functionality.",
    benefits: "Integrated solutions, precision fit, and reliability."
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "FABRICATED ASSEMBLIES",
    description: "Manufacture and assembly of welded and fabricated structures for industrial and engineering applications.",
    benefits: "Strong structures, industrial-grade quality, and durability."
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "BATCH PRODUCTION",
    description: "Efficient small, medium, and large batch manufacturing with consistent quality and precision.",
    benefits: "Scalable production, efficiency, and consistency."
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "MASS PRODUCTION",
    description: "High-volume production supported by optimized machining processes and strict quality control.",
    benefits: "Economies of scale, speed, and strict quality assurance."
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "REVERSE ENGINEERING",
    description: "Accurate component development and reproduction based on physical samples, existing parts, or customer requirements.",
    benefits: "Precision replication, adaptability, and cost savings."
  },
  {
    icon: <Settings2 className="h-8 w-8 text-primary" />,
    title: "QUALITY INSPECTION & TESTING",
    description: "Comprehensive dimensional inspection and quality assurance using advanced measuring instruments to ensure every component meets specified standards.",
    benefits: "Zero defects, compliance, and customer confidence."
  }
];


export default function ServicesPage() {
  return (
    <main className="bg-gray-50 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-24 min-h-screen">
      <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
      {/* Header */}
      <section className="bg-secondary py-12 sm:py-16 md:py-20 text-white">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">Our Services</h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-gray-400">
            From raw materials to final assembly, we provide Total Engineering Solutions using state-of-the-art machinery and rigorous quality control.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container-custom mt-8 sm:mt-12 md:mt-16">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="flex flex-col rounded-2xl bg-white p-5 sm:p-6 md:p-8 shadow-md border border-gray-100 hover:border-orange-200 transition-all">
              <div className="mb-4 sm:mb-6 flex items-center gap-4 sm:gap-5">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  {service.icon}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-secondary transition-colors">{service.title}</h2>
              </div>
              <p className="mb-6 text-sm sm:text-base text-gray-600">{service.description}</p>
              
              <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 border-t border-gray-100 pt-6">
                <div>
                  <span className="block text-xs font-bold uppercase text-gray-400">Benefits</span>
                  <span className="text-sm font-semibold text-secondary">{service.benefits}</span>
                </div>
                <div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-custom mt-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-3xl font-bold text-secondary">
            From component drawing to manufacturing plan
          </h2>
          <p className="mt-4 max-w-4xl leading-7 text-gray-600">
            A useful CNC manufacturing discussion starts with the part drawing
            or a clear specification. Identify the material and grade,
            production quantity, critical dimensions and tolerances, required
            finish, and any inspection or documentation needs. The part geometry
            then informs whether turning, milling, VMC machining, or a
            combination of processes is appropriate. Confirm the proposed scope
            and quotation with the engineering team before production.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/capabilities"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Review capabilities and listed materials
            </Link>
            <Link
              href="/quality"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Read about inspection stages
            </Link>
          </div>
        </div>
      </section>

     {/* OUR MACHINERY
<section className="mt-24 bg-white py-16 border-t border-gray-200">
  <div className="container-custom text-center">
    <h2 className="text-4xl font-bold text-secondary">Our Machinery</h2>
    <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
      Our state-of-the-art machinery enables us to deliver precision-engineered components with exceptional quality and efficiency.
    </p>
  </div>*/}

  {/* Define machines array outside the JSX 
  {(() => {
    const machines = [
      {
        name: "CNC Turning Machines",
        description: "Designed for high-precision turning operations, capable of producing complex components with tight tolerances and superior surface finishes.",
        benefits: "Superior accuracy, tight tolerances, and excellent surface finish."
      },
      {
        name: "VMC (Vertical Machining Center) Machines",
        description: "Advanced multi-operation machining centers for precision milling, drilling, tapping, pocketing, and contour machining.",
        benefits: "Multi-operation capability, precision milling, and versatility."
      },
      {
        name: "Conventional Lathe Machines",
        description: "Versatile machines for custom turning, repair work, and precision machining of various engineering components.",
        benefits: "Flexibility, cost-effective machining, and repair capability."
      },
      {
        name: "Traub Machines",
        description: "High-speed automatic turning machines ideal for manufacturing precision components in medium to high production volumes.",
        benefits: "High-speed production, automation, and efficiency."
      },
      {
        name: "Hydraulic Hacksaw Machines",
        description: "Heavy-duty cutting machines for accurate and efficient cutting of ferrous and non-ferrous raw materials.",
        benefits: "Durability, accurate cutting, and efficiency."
      },
      {
        name: "Laser Marking Machine",
        description: "Permanent laser marking and engraving solutions for part identification, serial numbering, logos, QR codes, and traceability.",
        benefits: "Permanent marking, traceability, and customization."
      },
      {
        name: "Drilling & Tapping Machines",
        description: "Precision drilling, reaming, countersinking, and tapping operations for components requiring accurate hole-making and threading.",
        benefits: "Accurate hole-making, threading, and versatility."
      },
      {
        name: "Aluminium Cutting Machine",
        description: "Specialized high-precision cutting machine designed for burr-free and accurate cutting of aluminium profiles and sections.",
        benefits: "Burr-free cutting, precision, and reliability."
      },
      {
        name: "Buffing & Surface Finishing Machines",
        description: "Deliver high-quality surface finishing, polishing, deburring, and aesthetic enhancement for machined components.",
        benefits: "Enhanced aesthetics, smooth finish, and deburring."
      },
      {
        name: "Inspection & Measuring Equipment",
        description: "Advanced precision measuring instruments ensure dimensional accuracy, quality compliance, and consistency throughout the manufacturing process.",
        benefits: "Dimensional accuracy, quality assurance, and compliance."
      },
      {
        name: "Supporting Manufacturing Equipment",
        description: "A comprehensive range of auxiliary machinery and tooling supports every stage of production, enhancing productivity, flexibility, and manufacturing efficiency.",
        benefits: "Productivity boost, flexibility, and efficiency."
      }
    ];

    return (
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {machines.map((machine, idx) => (
          <div
            key={idx}
            className="glass-card rounded-2xl bg-white p-6 shadow-md border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <h3 className="mb-2 text-xl font-bold text-secondary">{machine.name}</h3>
            <p className="text-gray-600">{machine.description}</p>
            <small className="block mt-2 text-sm text-gray-500">{machine.benefits}</small>
          </div>
        ))}
      </div>
    );
  })()}
</section>*/}
  
        
      {/* CTA */}
      <section className="mt-24 bg-white py-16 border-t border-gray-200">
        <div className="container-custom flex flex-col items-center justify-center gap-6 text-center">
          <div>
            <h3 className="text-2xl font-bold text-secondary">Need a Custom Manufacturing Solution?</h3>
            <p className="text-gray-600">Our engineers are ready to review your CAD drawings and provide a quote.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-bold uppercase tracking-widest text-white shadow-md hover:bg-red-700 transition-all"
          >
            Request a Quote <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
