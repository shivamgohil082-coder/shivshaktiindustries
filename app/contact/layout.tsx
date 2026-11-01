import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Us and Request a CNC Machining Quote",
  description:
    "Contact Shiv Shakti Industries in Vadodara, Gujarat, to discuss CNC turning, VMC machining, component drawings, and quotation requirements.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="contact-layout-wrapper">
      <Breadcrumbs items={[{ label: "Contact", href: "/contact" }]} />
      {children}
    </div>
  );
}
