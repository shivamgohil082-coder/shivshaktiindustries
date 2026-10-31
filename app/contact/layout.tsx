import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Request a Quote (RFQ)",
  description:
    "Get in touch with Shiv Shakti Industries for precision CNC & VMC machining quotes, technical consulting, drawing reviews, and engineering inquiries in Vadodara, Gujarat.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Shiv Shakti Industries | CNC & VMC Machining Quotes",
    description:
      "Submit CAD drawings and RFQ requirements directly to our engineering team. Rapid quotations with micron-level tolerance reviews.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="contact-layout-wrapper">{children}</div>;
}
