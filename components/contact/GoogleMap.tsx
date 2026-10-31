"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPinned,
  Navigation,
  Building2,
  Clock3,
  Car,
  Phone,
  ArrowUpRight,
} from "lucide-react";

export default function GoogleMap() {
  return (
    <section className="bg-slate-100 py-24">
      <div className="container mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            Visit Our Facility
          </span>

          <h2 className="mt-6 text-4xl font-black text-slate-900 lg:text-5xl">
            Find Our Manufacturing Unit
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Visit our SSIpro machining facility to discuss your project,
            inspect our manufacturing capabilities, or meet with our
            engineering team.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5">

          {/* Google Map */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg lg:col-span-3"
          >
            <iframe
              title="Company Location"
              src="https://www.google.com/maps?q=Mumbai,Maharashtra&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[600px] w-full"
            />
          </motion.div>

          {/* Information */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 lg:col-span-2"
          >

            {/* Address */}

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="mb-5 inline-flex rounded-2xl bg-orange-100 p-4">
                <Building2
                  size={30}
                  className="text-orange-600"
                />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Office Address
              </h3>

              <p className="mt-5 leading-8 text-slate-600">
                Plot No. 123,
                <br />
                MIDC Industrial Area,
                <br />
                Navi Mumbai,
                <br />
                Maharashtra 400701,
                <br />
                India
              </p>

              <Link
                href="https://maps.google.com"
                target="_blank"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-600 hover:gap-3"
              >
                Open in Google Maps

                <ArrowUpRight size={18} />
              </Link>
            </div>

            {/* Contact */}

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="mb-5 inline-flex rounded-2xl bg-orange-100 p-4">
                <Phone
                  size={30}
                  className="text-orange-600"
                />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Contact
              </h3>

              <div className="mt-6 space-y-3 text-slate-600">
                <p>📞 +91 98765 43210</p>

                <p>✉ sales@yourcompany.com</p>

                <p>🌐 www.yourcompany.com</p>
              </div>
            </div>

            {/* Working Hours */}

            <div className="rounded-3xl bg-white p-8 shadow-lg">
              <div className="mb-5 inline-flex rounded-2xl bg-orange-100 p-4">
                <Clock3
                  size={30}
                  className="text-orange-600"
                />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Working Hours
              </h3>

              <div className="mt-6 space-y-2 text-slate-600">
                <p>Monday – Saturday</p>

                <p>09:00 AM – 06:00 PM</p>

                <p>Sunday - Closed</p>
              </div>
            </div>

            {/* Directions */}

            <div className="rounded-3xl bg-slate-900 p-8 text-white">

              <div className="mb-5 inline-flex rounded-2xl bg-orange-500/20 p-4">
                <Navigation
                  size={30}
                  className="text-orange-400"
                />
              </div>

              <h3 className="text-2xl font-bold">
                Easy Directions
              </h3>

              <div className="mt-6 space-y-4 text-slate-300">

                <div className="flex items-start gap-3">
                  <MapPinned
                    className="mt-1 text-orange-400"
                    size={18}
                  />

                  <span>
                    Located in MIDC Industrial Area
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Car
                    className="mt-1 text-orange-400"
                    size={18}
                  />

                  <span>
                    Parking available for visitors
                  </span>
                </div>

              </div>

              <Link
                href="https://maps.google.com"
                target="_blank"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold transition hover:bg-orange-600"
              >
                Get Directions

                <ArrowUpRight size={18} />
              </Link>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}