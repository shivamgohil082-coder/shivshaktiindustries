"use client";

import CountUp from "react-countup";
import { stats } from "@/data/stats";

export default function HeroStats() {
  return (
    <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">

      {stats.map((item) => (

        <div key={item.id}>

          <h2 className="text-4xl font-bold text-orange-500">

            <CountUp
              end={item.number}
              duration={3}
            />

            {item.suffix}

          </h2>

          <p className="mt-2 text-gray-300">
            {item.title}
          </p>

        </div>

      ))}

    </div>
  );
}