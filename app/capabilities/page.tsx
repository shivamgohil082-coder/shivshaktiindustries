import Link from "next/link";
import { ArrowRight, Drill, Settings, Ruler, Box, Layers } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "CNC Machining Capabilities and Equipment",
  description:
    "Review Shiv Shakti Industries' listed CNC machining, turning, VMC, materials, and inspection capabilities in Vadodara.",
  path: "/capabilities",
});

const MACHINES = [
  {
    category: "CNC Machining Centers",
    icon: <Settings className="text-primary h-6 w-6" />,
    items: [
      { name: "5-Axis DMG MORI DMU 50", specs: "X/Y/Z: 650/520/475 mm", tolerance: "±0.005mm", qty: 2 },
      { name: "Mazak VTC-800/30SR", specs: "X/Y/Z: 3000/800/720 mm", tolerance: "±0.010mm", qty: 3 },
      { name: "Haas VF-4SS (High Speed)", specs: "X/Y/Z: 1270/508/635 mm", tolerance: "±0.008mm", qty: 5 },
    ]
  },
  {
    category: "CNC Turning & Lathes",
    icon: <Drill className="text-primary h-6 w-6" />,
    items: [
      { name: "Okuma LB3000 EX-II", specs: "Max Dia: 410mm, Length: 1000mm", tolerance: "±0.005mm", qty: 4 },
      { name: "Doosan Puma 2600SY", specs: "Sub-spindle, Y-Axis, Live Tooling", tolerance: "±0.008mm", qty: 4 },
      { name: "Citizen Cincom L20", specs: "Swiss-type auto lathe, Dia: 20mm", tolerance: "±0.003mm", qty: 6 },
    ]
  },
  {
    category: "Metrology & Quality",
    icon: <Ruler className="text-primary h-6 w-6" />,
    items: [
      { name: "Zeiss Contura CMM", specs: "Active Scanning, 700x1000x600 mm", tolerance: "1.5 µm", qty: 2 },
      { name: "Mitutoyo SJ-410", specs: "Surface Roughness Tester", tolerance: "Ra, Rz, Rq", qty: 4 },
      { name: "Keyence IM-8000", specs: "Optical Image Measurement", tolerance: "±0.5 µm", qty: 1 },
    ]
  }
];

const MATERIALS = [
  { group: "Steel Alloys", list: "EN-8, EN-31, EN-47, SS-304, SS-316, SS-316L, 17-4PH, 4140, D2 Tool Steel" },
  { group: "Non-Ferrous", list: "Aluminum 6061/7075, ETP Copper, Phosphor Bronze, Gunmetal, Brass" },
  { group: "Plastics", list: "Delrin (POM), PTFE (Teflon), PEEK, Nylon 66, Polycarbonate" },
];

export default function CapabilitiesPage() {
  return (
    <main className="bg-gray-50 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-24 min-h-screen">
      <Breadcrumbs items={[{ label: "Capabilities", href: "/capabilities" }]} />
      {/* Header */}
      <section className="bg-secondary py-12 sm:py-16 md:py-20 text-white">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">Machining Capabilities</h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-gray-400">
            A comprehensive index of our precision machinery, technical tolerances, and raw material expertise.
          </p>
        </div>
      </section>

      {/* Machinery Infrastructure Table */}
      <section className="container-custom mt-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-secondary">Machinery Infrastructure</h2>
          <div className="mt-4 h-1 w-20 bg-primary"></div>
        </div>
        
        <div className="grid gap-10 lg:grid-cols-1">
          {MACHINES.map((machineGroup, idx) => (
            <div key={idx} className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="bg-gray-100 px-6 py-4 flex items-center gap-3 border-b border-gray-200">
                {machineGroup.icon}
                <h3 className="text-xl font-bold text-secondary">{machineGroup.category}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100">Make & Model</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100">Working Envelope / Specs</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100">Tolerance</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {machineGroup.items.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 border-b border-gray-50 text-sm font-bold text-secondary">{item.name}</td>
                        <td className="px-6 py-4 border-b border-gray-50 text-sm text-gray-600">{item.specs}</td>
                        <td className="px-6 py-4 border-b border-gray-50 text-sm font-semibold text-primary">{item.tolerance}</td>
                        <td className="px-6 py-4 border-b border-gray-50 text-sm font-semibold text-gray-800">{item.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Materials & Secondary Operations */}
      <section className="container-custom mt-12 sm:mt-16 md:mt-20">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2">
          
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Box className="text-primary h-8 w-8" />
              <h2 className="text-xl sm:text-2xl font-bold text-secondary">Machinable Materials</h2>
            </div>
            <div className="space-y-6">
              {MATERIALS.map((mat, idx) => (
                <div key={idx}>
                  <h4 className="text-sm font-bold uppercase text-gray-400 mb-1">{mat.group}</h4>
                  <p className="text-sm font-semibold text-secondary leading-relaxed">{mat.list}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-secondary p-5 sm:p-6 md:p-8 shadow-sm text-white">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="text-primary h-8 w-8" />
              <h2 className="text-2xl font-bold">Secondary Operations</h2>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              We provide end-to-end turnkey manufacturing. The following processes are handled in-house or via our certified vendor network to ensure parts are ready for immediate assembly.
            </p>
            <ul className="space-y-4">
              {[
                { name: "Heat Treatment", desc: "Hardening, Tempering, Case Carburizing" },
                { name: "Surface Coating", desc: "Hard Anodizing, Zinc Plating, Blackening, Powder Coating" },
                { name: "Precision Grinding", desc: "Surface Grinding, Cylindrical Grinding (Tolerance: ±0.002mm)" },
                { name: "Laser Marking", desc: "Part numbering, Barcoding, Logo engraving" },
              ].map((op, i) => (
                <li key={i} className="flex flex-col border-l-2 border-primary pl-4">
                  <span className="font-bold text-white">{op.name}</span>
                  <span className="text-xs font-medium text-gray-400">{op.desc}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 bg-white py-16 border-t border-gray-200">
        <div className="container-custom flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-secondary">Does your project require specific machine routing?</h3>
            <p className="text-gray-600">Our production engineers can develop a tailored CNC strategy for your parts.</p>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 font-bold uppercase tracking-widest text-white transition-all hover:bg-primary/90">
            Contact Our Engineers <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
