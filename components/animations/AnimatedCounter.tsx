"use client";

import CountUp from "react-countup";

interface AnimatedCounterProps {
  number: number;
  suffix?: string;
  title: string;
}

export default function AnimatedCounter({
  number,
  suffix,
  title,
}: AnimatedCounterProps) {
  return (
    <div className="text-center">

      <h2 className="text-5xl font-extrabold text-orange-500">

        <CountUp
          end={number}
          duration={3}
        />

        {suffix}

      </h2>

      <p className="mt-4 text-gray-600">

        {title}

      </p>

    </div>
  );
}