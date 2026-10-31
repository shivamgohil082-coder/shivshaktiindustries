"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  Building2,
  Globe,
  ArrowUpRight,
} from "lucide-react";

const contactCards = [
  {
    icon: MapPin,
    title: "Office Address",
    description:
      "C1-677, Makarpura GIDC,\nVadodara, Gujarat 390010, India",
    action: "View on Google Maps",
    href: "https://maps.google.com",
  },
  {
    icon: Phone,
    title: "Phone Number",
    description:
      "+91 92136 62579\n+91 98765 43211",
    action: "Call Now",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    title: "Email Address",
    description:
      "info@shivshaktiindustries.org",
    action: "Send Email",
    href: "mailto:info@shivshaktiindustries.org",
  },
  {
    icon: Clock3,
    title: "Working Hours",
    description:
      "Monday – Saturday\n9:00 AM – 6:00 PM",
    action: "Quick Response < 24 Hours",
    href: "#contact-form",
  },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "#",
  },
  {
    name: "Facebook",
    href: "#",
  },
  {
    name: "Instagram",
    href: "#",
  },
  {
    name: "YouTube",
    href: "#",
  },
];

export default function ContactInfo() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
            Contact Information
          </span>

          <h2 className="mt-6 text-4xl font-black text-slate-900 lg:text-5xl">
            We're Always Ready to Help
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Reach out to our engineering team for quotations,
            technical consultation, prototype development,
            or production manufacturing inquiries.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="inline-flex rounded-2xl bg-orange-100 p-4">
                  <Icon
                    size={30}
                    className="text-orange-600"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900 transition-colors duration-300 hover:text-orange-500">
                  {card.title}
                </h3>

                <p className="mt-5 whitespace-pre-line leading-8 text-slate-600">
                  {card.description}
                </p>

                <Link
                  href={card.href}
                  className="mt-8 inline-flex items-center gap-2 font-semibold text-orange-600 transition hover:gap-3"
                >
                  {card.action}

                  <ArrowUpRight size={18} />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Information */}

        <div className="mt-20 grid gap-10 lg:grid-cols-2">

          {/* Company */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            className="rounded-3xl bg-slate-900 p-10 text-white"
          >
            <div className="mb-6 inline-flex rounded-2xl bg-orange-500/20 p-4">
              <Building2
                size={34}
                className="text-orange-400"
              />
            </div>

            <h3 className="text-3xl font-bold">
              About Our Company
            </h3>

            <p className="mt-6 leading-8 text-slate-300">
              We specialize in precision SSIpro machining,
              custom manufacturing, reverse engineering,
              prototype development, and production machining
              for industries worldwide.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                ✓ ISO 9001 Certified
              </div>

              <div className="flex items-center gap-3">
                ✓ Precision up to ±0.005 mm
              </div>

              <div className="flex items-center gap-3">
                ✓ Global Shipping Available
              </div>

              <div className="flex items-center gap-3">
                ✓ 24-Hour RFQ Response
              </div>
            </div>
          </motion.div>

          {/* Social */}

          <motion.div
            initial={{
              opacity: 0,
              x: 40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm"
          >
            <div className="mb-6 inline-flex rounded-2xl bg-orange-100 p-4">
              <Globe
                size={34}
                className="text-orange-600"
              />
            </div>

            <h3 className="text-3xl font-bold text-slate-900">
              Follow Our Company
            </h3>

            <p className="mt-6 leading-8 text-slate-600">
              Stay connected with us to see our latest
              manufacturing projects, precision engineering
              solutions, and company updates.
            </p>

            <div className="mt-10 space-y-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="flex items-center justify-between rounded-xl border border-slate-200 p-5 transition hover:border-orange-500 hover:bg-orange-50"
                >
                  <span className="font-semibold">
                    {social.name}
                  </span>

                  <ArrowUpRight size={18} />
                </Link>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-orange-50 p-6">
              <h4 className="font-bold text-slate-900">
                Need an Urgent Quote?
              </h4>

              <p className="mt-3 leading-7 text-slate-600">
                Upload your engineering drawing today,
                and our engineers will provide a quotation
                within 24 business hours.
              </p>

              <Link
                href="/upload"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Upload Drawing

                <ArrowUpRight size={18} />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
