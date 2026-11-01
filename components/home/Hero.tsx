import Link from "next/link";
import { ArrowRight, FileCheck } from "lucide-react";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  return (
    <>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-white pt-20">
      <HeroVideo />

      <div className="container-custom relative z-10 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            Premium Industrial Manufacturing
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[1.1] tracking-tight text-secondary">
            Precision <br />
            <span className="text-primary">Engineering</span> <br />
            Solutions.
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all hover:bg-red-700 active:scale-95"
            >
              <FileCheck size={18} /> Request RFQ
            </Link>
            <Link
              href="/services"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border-2 border-secondary bg-transparent px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-bold uppercase tracking-wider text-secondary transition-all hover:bg-secondary hover:text-white active:scale-95"
            >
              Explore Capabilities <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Blueprint/Factory Graphic Element */}
        {/* <div className="hidden lg:block">
          <div className="glass-card relative h-[500px] w-full rounded-2xl border border-gray-200 bg-white/50 p-8 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-[url('https://www.transparenttextures.com/patterns/blueprint.png')] opacity-10 mix-blend-multiply"></div>
            
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="font-mono text-xs font-bold text-gray-500">TOLERANCE: ±0.005mm</p>
                <p className="font-mono text-xs font-bold text-gray-500">MATERIAL: EN-31, AL-6061, SS-304</p>
              </div>
              
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-2xl font-bold text-secondary">Advanced CNC Machining</h3>
                <p className="mt-2 text-sm text-gray-600">
                  We utilize multi-axis machining centers to produce complex geometries with zero defects.
                </p>
              </div>
            </div>
          </div>
        </div> */}

        </div>
      </section>

      <section className="bg-white py-10 sm:py-12 md:py-16">
        <div className="container-custom">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 sm:p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-secondary">
              "Committed to Excellence in Sheet Metal Fabrication and Precision CNC & VMC Machining."
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl font-medium leading-relaxed text-gray-700">
              We have successfully developed and manufactured a wide range of precision metallic and non-metallic components, customized to meet the unique requirements of diverse industries and applications.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
