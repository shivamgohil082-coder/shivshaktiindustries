"use client";

import { ArrowRight } from "lucide-react";

import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#07192F] py-28 text-white">

      <div className="absolute inset-0 bg-[url('/images/hero/hero-bg.jpg')] bg-cover bg-center opacity-10" />

      <Container>

        <div className="relative z-10 text-center">

          <span className="rounded-full bg-orange-500/20 px-5 py-2 font-semibold text-orange-400">
            Ready To Start?
          </span>

          <h2 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-tight">

            Looking For A Reliable SSIpro
            Manufacturing Partner?

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-300">

            Upload your engineering drawing and receive
            a professional quotation from our engineering
            team within 24 hours.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-5">

            <Button disabled className="opacity-50 cursor-not-allowed">

              Request Quote

              <ArrowRight
                size={18}
                className="ml-2"
              />

            </Button>

            <Button
              href="/contact"
              variant="secondary"
            >

              Contact Us

            </Button>

          </div>

        </div>

      </Container>

    </section>
  );
}