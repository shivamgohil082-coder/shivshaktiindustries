"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STATS = [
  { value: 11, label: "Years Experience", suffix: "+" },
  { value: 510, label: "Projects Completed", suffix: "+" },
  { value: 60, label: "Global Customers", suffix: "+" },
  { value: 30, label: "CNC/VMC Machines", suffix: "+" },
  { value: 4100, label: "Components ", suffix: "+" },
];

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (containerRef.current) {
      const counters = gsap.utils.toArray(".stat-value");
      counters.forEach((counter: any) => {
        const target = parseFloat(counter.getAttribute("data-target"));
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center+=200",
            toggleActions: "play none none reverse",
          },
          onUpdate: function () {
            counter.innerHTML = Math.ceil(this.targets()[0].innerHTML).toString();
          }
        });
      });
    }
  }, []);

  return (
    <section className="bg-secondary py-16 text-white">
      <div ref={containerRef} className="container-custom">
        <div className="grid grid-cols-2 gap-4 sm:gap-8 md:grid-cols-3 lg:grid-cols-5 text-center">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-3 sm:p-4 last:col-span-2 md:last:col-span-1">
              <h3 className="mb-2 text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
                <span className="stat-value" data-target={stat.value}>0</span>
                {stat.suffix}
              </h3>
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
