import Image from "next/image";
import { CheckCircle, ShieldCheck, FileText, Settings, Factory, Award, Quote } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Quality Inspection and Manufacturing Infrastructure",
  description:
    "Learn about incoming material checks, in-process inspection, final inspection, and pre-dispatch checks described by Shiv Shakti Industries in Vadodara.",
  path: "/quality",
});

const INSPECTION_STAGES =  [
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: "Incoming Material",
    desc: "Every batch of raw materials is checked and verified for chemical composition before being taken into production."
  },
  {
    icon: <Settings className="h-6 w-6 text-primary" />,
    title: "In-Process Inspection",
    desc: "Operators perform hourly inspections using digital micrometers, plug gauges, and any other measuring instruments required for the specific product."
  },
  {
    icon: <FileText className="h-6 w-6 text-primary" />,
    title: "Final Inspection",
    desc: "A 100% final visual inspection is conducted to ensure product quality and conformity before packing."
  },
  {
    icon: <Factory className="h-6 w-6 text-primary" />,
    title: "Pre-Dispatch Check",
    desc: "Final inspection of packaging and rust prevention measures is carried out to ensure product quality and defect-free delivery."
  }
];

export default function QualityPage() {
  return (
    <main className="bg-gray-50 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-24 min-h-screen">
      <Breadcrumbs items={[{ label: "Quality", href: "/quality" }]} />
      {/* Header */}
      <section className="bg-secondary py-12 sm:py-16 md:py-20 text-white">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">Quality & Infrastructure</h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-gray-400">
            
          </p>
        </div>
      </section>

      {/* 3D Inspection Visualization 
      <section className="container-custom mt-16 mb-24">
        <div className="mb-8 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">Digital Metrology Lab</span>
          <h2 className="mt-2 text-3xl font-bold text-secondary">Laser CMM Scanning</h2>
          <p className="mt-2 text-gray-600">Interact with our 3D metrology visualization demonstrating automated tolerance verification.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
          <InspectionLabDynamic />
        </div>
      </section>*/}

      {/* Inspection Process Grid */}
      <section className="container-custom mt-16 mb-16 py-10">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="text-4xl font-black text-secondary uppercase tracking-tighter">4-Stage Quality Control</h2>
          <div className="mt-4 h-1 w-20 bg-primary"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {INSPECTION_STAGES.map((stage, idx) => (
            <div key={idx} className="group flex flex-col rounded-2xl bg-white p-8 shadow-md border border-gray-100 hover:border-orange-200 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-black transition-transform group-hover:scale-110">
                0{idx + 1}
              </div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 relative z-10">
                {stage.icon}
              </div>
              <h3 className="mb-4 text-xl font-bold text-secondary relative z-10 transition-colors group-hover:text-orange-500">{stage.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">{stage.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Machinery Infrastructure 
      <section className="container-custom mt-24">
        <div className="grid gap-12 lg:grid-cols-2">*/}
          {/* R&D 
          <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Award className="text-primary" size={28} />
            </div>
            <h2 className="text-3xl font-bold text-secondary mb-4">Research & Development</h2>
            <p className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">Innovation drives our growth.</p>
            <p className="text-gray-600 leading-relaxed">
              Our Research & Development team continuously explores advanced manufacturing techniques, tooling improvements, machining optimization, and process enhancements to deliver superior products with higher efficiency and improved productivity.
            </p>
          </div>/*}

          {/* Testimonial 
          <div className="rounded-2xl border border-gray-800 bg-secondary p-10 shadow-xl text-white">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
              <Quote className="text-white" size={28} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Client Testimonial</h2>
            <p className="font-bold text-primary mb-4 uppercase tracking-wider text-sm">Building Trust Through Precision</p>
            <blockquote className="text-gray-300 italic leading-relaxed text-lg border-l-4 border-primary pl-6">
              "Our clients value us for our commitment to quality, precision, and dependable service. By consistently meeting technical requirements and delivery commitments, SHIV SHAKTI INDUSTRIES has built lasting relationships founded on trust, performance, and customer satisfaction."
            </blockquote>
          </div>
        </div>
      </section>*/}

      <section className="container-custom mt-24">
        <div className="mb-12 text-center">
          
          <h2 className="mt-2 text-4xl font-black text-secondary uppercase tracking-tighter">Our Machinery Infrastructure</h2>
          <div className="mt-6 h-1 w-20 bg-primary mx-auto"></div>
        </div>

        <h3 className="mb-8 text-2xl font-bold text-secondary">Precision CNC Machining</h3>
        <div className="grid gap-6 lg:grid-cols-2 mb-16">
          {[
            {
              name: "Semi-Automatic Traub Machines",
              size: "4mm to 60mm Dia",
              Quantity: "06 Machine",
              img: "/images/hero/cnc-milling-machine-operation.webp"
            },
            {
              name: "CNC Turning Centers",
              size: "4mm to 550mm Dia",
              Quantity: "10 Machine",
              img: "/images/quality/quality%20cnc%20turning.jpg"
            },
            {
              name: "Vertical Machining Centers (VMC)",
              size: "From 0.40 m × 0.30 m × 0.40 m up to 3.0 m × 2.0 m × 1.0 m",
              Quantity: "06 Machine",
              img: "/images/quality/vmc%20machine.jpg"
            },
            {
              name: "Milling Machines with DRO",
              size: "Up to 200mm Dia × 1000mm Length",
              Quantity: "02 Machine",
              img: "/images/quality/DRO-Milling-Machine_qua.jpg"
            },
            { name: "CNC Rotary Table", size: "Standard", Quantity: "04 Machine", img: "/images/quality/rotary2_qua.png" },
            { name: "Lathe Machine", size: "Standard", Quantity: "06 Machine", img: "/images/quality/Lathe%20Machine2_qua.png" }
          ].map((m, i) => (
            <div key={i} className="flex bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
              <div className="w-2/5 relative min-h-[200px]">
                <Image
                  src={m.img}
                  alt={m.name}
                  fill
                  sizes="(max-width: 1023px) 38vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="w-3/5 p-6 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-secondary mb-4">{m.name}</h4>
                <p className="text-sm font-medium text-primary mb-1">Machine Size</p>
                <p className="text-gray-600 text-sm mb-3">{m.size}</p>
                <p className="text-sm font-medium text-primary mb-1">Quantity</p>
                <p className="text-gray-800 font-semibold">{m.Quantity}</p>
              </div>
            </div>
          ))}
        </div>


         <h3 className="mb-8 text-2xl font-bold text-secondary">Sheet Metal & Fabrication</h3>
<div className="grid gap-6 lg:grid-cols-2">
  {[
      { name: "Power Presses", size: "Capacity: 5 Tons to 350 Tons", Quantity: "4 Machines", img: "/images/quality/press machine_qua.jpg" },
      { name: "CNC Bending Machines", size: "Capacity: 6 ft to 8 ft", Quantity: "2 Machines", img: "/images/quality/cnc bending_qua.jpg" },
      { name: "Laser Cutting Machines", size: "Power Range: 1.5 kW to 20 kW", Quantity: "2 Machines", img: "/images/quality/laser%20cutting%202_qua.jpg" },
      { name: "Laser Welding Machine", size: "Standard", Quantity: "1 Machine", img: "/images/quality/laser_qua_lasermakerinig.jpg" }
  ].map((m, i) => (
    <div key={i} className="flex bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
      <div className="w-2/5 relative min-h-[200px]">
        <Image
          src={m.img}
          alt={m.name}
          fill
          sizes="(max-width: 1023px) 38vw, 20vw"
          className="object-cover"
        />
      </div>
      <div className="w-3/5 p-6 flex flex-col justify-center">
        <h4 className="text-xl font-bold text-secondary mb-4">{m.name}</h4>
        <p className="text-sm font-medium text-primary mb-1">Machine Size</p>
        <p className="text-gray-600 text-sm mb-3">{m.size}</p>
        <p className="text-sm font-medium text-primary mb-1">Quantity</p>
        <p className="text-gray-800 font-semibold">{m.Quantity}</p>
      </div>
    </div>
  ))}
</div>

          
          
         


        <h3 className="mb-8 text-2xl font-bold text-secondary">Other Machinery</h3>
        <div className="grid gap-6 lg:grid-cols-2">
          {[
           
            { name: "Drilling Machine", size: "Standard", quantity: "02 Machine", img: "/images/quality/drill_qua.jpg" },
            { name: "Surface Grinder and Buffing Machine", size: "Standard", quantity: "02 Machine", img: "/images/quality/surface%20grinder_qua.jpg" },
            { name: "Tapping Machine", size: "Standard", quantity: "02 Machine", img: "/images/quality/tapping_qua.jpg" },
            { name: "Bandsaw Machine", size: "Standard", quantity: "02 Machine", img: "/images/quality/Bandsaw_qua.jpg" },
            { name: "Vibratory Deburring Machines", size: "Standard", quantity: "01 Machine", img: "/images/quality/deburring_qua.jpg" },
            { name: "Laser Marking Machine", size: "Standard", quantity: "01 Machine", img: "/images/quality/laser_qua_markling.jpg" }
          ].map((m, i) => (
            <div key={i} className="flex bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-200 transition-all hover:shadow-lg">
              <div className="w-2/5 relative min-h-[200px]">
                <Image
                  src={m.img}
                  alt={m.name}
                  fill
                  sizes="(max-width: 1023px) 38vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="w-3/5 p-6 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-secondary mb-4">{m.name}</h4>
                <p className="text-sm font-medium text-primary mb-1">Machine Size</p>
                <p className="text-gray-600 text-sm mb-3">{m.size}</p>
                <p className="text-sm font-medium text-primary mb-1">quantity</p>
                <p className="text-gray-800 font-semibold">{m.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Our Machinery 
      <section className="mt-24 border-t border-gray-200 bg-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-secondary">Our Machinery</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            </p>
        </div>

        <div className="container-custom mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "CNC Turning Machines",
              description: "Designed for high-precision turning operations, capable of producing complex components with tight tolerances and superior surface finishes.",
              
            },
            {
              name: "VMC (Vertical Machining Center) Machines",
              description: "Advanced multi-operation machining centers for precision milling, drilling, tapping, pocketing, and contour machining.",
              
            },
            {
              name: "Conventional Lathe Machines",
              description: "Versatile machines for custom turning, repair work, and precision machining of various engineering components.",
              
            },
            {
              name: "Traub Machines",
              description: "High-speed automatic turning machines ideal for manufacturing precision components in medium to high production volumes.",
              
            },
            {
              name: "Hydraulic Hacksaw Machines",
              description: "Heavy-duty cutting machines for accurate and efficient cutting of ferrous and non-ferrous raw materials.",

            },
            {
              name: "Laser Marking Machine",
              description: "Permanent laser marking and engraving solutions for part identification, serial numbering, logos, QR codes, and traceability.",
              
            },
            {
              name: "Drilling & Tapping Machines",
              description: "Precision drilling, reaming, countersinking, and tapping operations for components requiring accurate hole-making and threading.",
              
            },
            {
              name: "Aluminium Cutting Machine",
              description: "Specialized high-precision cutting machine designed for burr-free and accurate cutting of aluminium profiles and sections.",
              
            },
            {
              name: "Buffing & Surface Finishing Machines",
              description: "Deliver high-quality surface finishing, polishing, deburring, and aesthetic enhancement for machined components.",
              
            },
            {
              name: "Inspection & Measuring Equipment",
              description: "Advanced precision measuring instruments ensure dimensional accuracy, quality compliance, and consistency throughout the manufacturing process.",
              
            },
            {
              name: "Supporting Manufacturing Equipment",
              description: "A comprehensive range of auxiliary machinery and tooling supports every stage of production, enhancing productivity, flexibility, and manufacturing efficiency.",
              
            }
          ].map((machine, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="mb-2 text-xl font-bold text-secondary">{machine.name}</h3>
              <p className="text-gray-600">{machine.description}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* Measurement Equipment 
      <section className="container-custom mt-24">
        <div className="rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
          <h3 className="mb-6 text-2xl font-bold text-secondary">Measurement Equipment</h3>
          <ul className="grid gap-4 md:grid-cols-2">
            {[
              "Digital Vernier Calipers",
              "Manual Vernier Calipers",
              "Digital ID Groove Vernier Calipers",
              "Digital Depth Vernier Calipers",
              "Outside Micrometers",
              "Depth Micrometers"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <CheckCircle className="text-primary" size={20} />
                <span className="font-medium text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>*/}

      {/* Surface Finishing Capabilities */}
      <section className="bg-slate-900 text-white mt-24 py-24">
        <div className="container-custom">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-black uppercase tracking-tighter">Surface Finishing Capabilities</h2>
            <div className="mt-6 h-1 w-20 bg-primary mx-auto"></div>
            <p className="mx-auto mt-6 max-w-3xl text-gray-400 text-lg">
              We provide a wide range of surface finishing and post-processing solutions to improve the appearance, corrosion resistance, wear resistance, durability, and overall performance of precision-engineered components.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Electroplating",
                items: ["Zinc Plating", "Nickel Plating", "Chrome Plating", "Tin Plating", "Silver Plating", "Gold Plating"]
              },
              {
                title: "Protective & Decorative",
                items: ["Powder Coating", "Anodizing", "Black Oxide (Blackening)", "Hot-Dip Galvanizing", "Phosphating (Parkerizing)", "Passivation"]
              },
              {
                title: "Surface Preparation",
                items: ["Sand Blasting", "Shot Blasting", "Glass Bead Blasting", "Acid Pickling"]
              },
              {
                title: "Surface Enhancement",
                items: ["Polishing", "Buffing", "Deburring"]
              },
              {
                title: "Heat Treatment",
                items: ["Hardening", "Tempering"]
              }
            ].map((category, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-700 bg-gray-800 p-8 transition-all hover:border-orange-500/50">
                <h3 className="mb-6 text-xl font-bold text-primary">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="text-gray-500" size={16} />
                      <span className="text-gray-300 text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* Machinery Infrastructure */}
      <section className="container-custom mt-12 sm:mt-16 md:mt-24">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
          {/* R&D  */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-8 md:p-10 shadow-sm">
            <div className="mb-4 sm:mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Award className="text-primary" size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-secondary mb-3 sm:mb-4">Research & Development</h2>
            <p className="font-bold text-primary mb-3 sm:mb-4 uppercase tracking-wider text-xs sm:text-sm">Innovation drives our growth.</p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Our Research & Development team continuously explores advanced manufacturing techniques, tooling improvements, machining optimization, and process enhancements to deliver superior products with higher efficiency and improved productivity.
            </p>
          </div>

          {/* Testimonial */}
          <div className="rounded-2xl border border-gray-800 bg-secondary p-5 sm:p-8 md:p-10 shadow-xl text-white">
            <div className="mb-4 sm:mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
              <Quote className="text-white" size={28} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Client Testimonial</h2>
            <p className="font-bold text-primary mb-3 sm:mb-4 uppercase tracking-wider text-xs sm:text-sm">Building Trust Through Precision</p>
            <blockquote className="text-gray-300 italic leading-relaxed text-base sm:text-lg border-l-4 border-primary pl-4 sm:pl-6">
              "Our clients value us for our commitment to quality, precision, and dependable service. By consistently meeting technical requirements and delivery commitments, SHIV SHAKTI INDUSTRIES has built lasting relationships founded on trust, performance, and customer satisfaction."
            </blockquote>
          </div>
        </div>
      </section>
      {/* Advanced Metrology & Documentation */}
      <section className="container-custom mt-12 sm:mt-16 md:mt-24">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 sm:p-8 md:p-10 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-secondary mb-6">Measurement Equipment</h3>
            <ul className="space-y-4">
              {['Digital Vernier Calipers',
                'Manual Vernier Calipers',
                'Digital ID Groove Vernier Calipers',
                'Digital Depth Vernier Calipers',
                'Outside Micrometers',
                'Depth Micrometers',
                'And Many Important EQUIPMENT'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="text-primary" size={20} />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-secondary p-10 border border-gray-800 shadow-xl text-white">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
              <FileText className="text-white" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Documentation & Certificates</h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              We provide comprehensive quality documentation tailored to your industry requirements. Our components are shipped with full traceability.
            </p>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span> ISO 9001:2015 Compliant Processes</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span> Material Test Certificates (MTC)</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span> Pre-Dispatch Inspection Reports (PDIR)</li>
              <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary"></span> PPAP Level 3 Documentation</li>
            </ul>
          </div>
        </div>
      </section>

    {/*Products & Capabilities List 
      <section className="container-custom mt-24 mb-24">
        <div className="rounded-3xl bg-primary p-12 text-center text-white">
          <h2 className="mb-4 text-3xl font-black uppercase tracking-tighter">Our Products</h2>
          <p className="mx-auto mb-10 max-w-2xl text-white/80">
            We manufacture a comprehensive range of precision-engineered products designed to meet the diverse requirements of various industries.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Precision Sheet Metal Components",
              "CNC Machined Components",
              "CNC Turned Components",
              "Custom Engineered Assemblies",
              "Fabricated Assemblies",
              "Precision Mechanical Parts",
              "Prototype Components",
              "Industrial Engineering Components"
            ].map((product, idx) => (
              <span key={idx} className="rounded-full border border-white/30 bg-white/20 px-6 py-3 font-semibold">
                {product}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold uppercase tracking-widest text-primary shadow-xl transition-all hover:bg-gray-100">
              View Product Catalog <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>*/}
    </main>
  );
}
