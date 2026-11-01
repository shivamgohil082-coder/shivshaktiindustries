import "./globals.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import MobileBottomBar from "@/components/mobile/MobileBottomBar";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { serializeJsonLd, SITE_URL } from "@/lib/seo";

const spaceGrotesk = localFont({
  src: "../node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  preload: true,
  variable: "--font-space-grotesk",
});

export const viewport: Viewport = {
  themeColor: "#aa0000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Precision CNC Machining Manufacturer | Vadodara, India",
    template: "%s | Shiv Shakti Industries",
  },
  description:
    "Shiv Shakti Industries manufactures precision CNC turned components, VMC machined parts, and custom engineering assemblies in Vadodara, Gujarat, India.",
  keywords: [
    "CNC Machining Vadodara",
    "VMC Machining Gujarat",
    "Precision CNC Turned Components",
    "Precision Engineering Solutions",
    "Shiv Shakti Industries",
    "Hydraulic Manifolds CNC",
    "Makarpura GIDC CNC Machine Shop",
    "Automotive Machined Parts India",
  ],
  authors: [{ name: "Shiv Shakti Industries" }],
  creator: "Shiv Shakti Industries",
  publisher: "Shiv Shakti Industries",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Precision CNC Machining Manufacturer | Shiv Shakti Industries",
    description:
      "Precision CNC turned components, VMC machined parts, and custom engineering assemblies manufactured in Vadodara, Gujarat, India.",
    url: SITE_URL,
    siteName: "Shiv Shakti Industries",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/logo/logo3.jpeg",
        width: 800,
        height: 600,
        alt: "Shiv Shakti Industries Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Precision CNC Machining Manufacturer | Shiv Shakti Industries",
    description:
      "Precision CNC turned components, VMC machined parts, and custom engineering assemblies in Vadodara, India.",
    images: ["/images/logo/logo3.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const structuredSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Shiv Shakti Industries",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo/logo3.jpeg`,
      description:
        "Precision CNC and VMC machining, custom sheet metal works, parts assembly, and engineering solutions in Makarpura GIDC, Vadodara, Gujarat, India.",
      telephone: "+91 92136 62579",
      email: "info@shivshaktiindustries.org",
      address: {
        "@type": "PostalAddress",
        streetAddress: "C1-677, Makarpura GIDC",
        addressLocality: "Vadodara",
        addressRegion: "Gujarat",
        postalCode: "390010",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91 92136 62579",
          contactType: "sales and quotations",
          email: "rfq@shivshaktiindustries.org",
        },
        {
          "@type": "ContactPoint",
          telephone: "+91 92136 62579",
          contactType: "general inquiries",
          email: "info@shivshaktiindustries.org",
        },
      ],
      sameAs: [
        "https://www.instagram.com/shiv.shakti.industries/",
        "https://www.linkedin.com/company/shivshaktiindustries/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Shiv Shakti Industries",
      description: "Precision CNC Machining & VMC Manufacturing Portal",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceGrotesk.className} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(structuredSchema),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#1a1a1a] antialiased selection:bg-primary selection:text-white">
        <SmoothScroll>
          <Preloader key="app-preloader" />
          <Navbar key="app-navbar" />
          <div key="app-main-content" className="flex-1">
            {children}
          </div>
          <Footer key="app-footer" />
          <MobileBottomBar key="app-mobile-bar" />
        </SmoothScroll>
      </body>
    </html>
  );
}
