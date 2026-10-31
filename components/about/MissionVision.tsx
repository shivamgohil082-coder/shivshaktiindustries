"use client";

import { Target, Eye } from "lucide-react";
import Container from "@/components/common/Container";

export default function MissionVision() {
  return (
    <section className="bg-slate-50 py-24">

      <Container>

        <div className="grid gap-10 lg:grid-cols-2">

          <div className="rounded-3xl bg-white p-10 shadow-xl">

            <Target
              className="text-orange-500"
              size={50}
            />

            <h2 className="mt-6 text-3xl font-bold">
              Our Mission
            </h2>

            <p className="mt-6 leading-8 text-gray-600">

              Deliver precision engineered components with
              exceptional quality, competitive pricing and
              on-time delivery.

            </p>

          </div>

          <div className="rounded-3xl bg-white p-10 shadow-xl">

            <Eye
              className="text-orange-500"
              size={50}
            />

            <h2 className="mt-6 text-3xl font-bold">
              Our Vision
            </h2>

            <p className="mt-6 leading-8 text-gray-600">

              Become one of the world's most trusted SSIpro
              manufacturing partners by continuously
              investing in technology and people.

            </p>

          </div>

        </div>

      </Container>

    </section>
  );
}