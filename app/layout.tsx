import "@fontsource/space-grotesk";
import "@fontsource/inter";
import "@fontsource/sora";
import "./globals.css";

import type { Metadata, Viewport } from "next";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shivshaktiindustries.org';

export const viewport: Viewport = {
  themeColor: "#aa0000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SHIV SHAKTI INDUSTRIES | Precision CNC Machining & VMC Manufacturing",
    template: "%s | Shiv Shakti Industries",
  },
  description:
    "Leading manufacturer of high-precision CNC turned parts, 4-Axis VMC machined components, brass hydraulic manifolds, and precision engineering assemblies in Makarpura GIDC, Vadodara, Gujarat.",
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
    title: "SHIV SHAKTI INDUSTRIES | Precision CNC Machining & VMC Engineering",
    description:
      "Premier CNC, VMC & Swiss-Turned Engineering Components manufacturer. Micron-level tolerances (±0.003mm) across Automotive, Energy, and Aerospace sectors.",
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
    title: "SHIV SHAKTI INDUSTRIES | Precision CNC Machining",
    description: "Precision CNC Machining, VMC & Engineering Components in Vadodara, Gujarat.",
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
      "@type": ["ManufacturingPlant", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: "Shiv Shakti Industries",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo/logo3.jpeg`,
      image: `${SITE_URL}/images/logo/logo3.jpeg`,
      description:
        "Precision CNC & VMC Machining, Custom Sheet Metal Works, Parts Assembly, and Engineering Solutions in Makarpura GIDC, Vadodara.",
      telephone: "+91 92136 62579",
      email: "info@shivshaktiindustries.org",
      priceRange: "$$",
      currenciesAccepted: "INR, USD, EUR",
      paymentAccepted: "Bank Transfer, Wire Transfer, Letter of Credit",
      address: {
        "@type": "PostalAddress",
        streetAddress: "C1-677, G.I.D.C Estate, Makarpura",
        addressLocality: "Vadodara",
        addressRegion: "Gujarat",
        postalCode: "390010",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 22.2519,
        longitude: 73.1972,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "08:30",
          closes: "19:30",
        },
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91 92136 62579",
          contactType: "sales and quotations",
          email: "rfq@shivshaktiindustries.org",
          areaServed: ["IN", "US", "DE", "GB", "AE"],
          availableLanguage: ["en", "hi", "gu"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+91 92136 62579",
          contactType: "customer service and general inquiries",
          email: "info@shivshaktiindustries.org",
          areaServed: ["IN", "US", "DE", "GB", "AE"],
          availableLanguage: ["en", "hi", "gu"],
        },
      ],
      areaServed: {
        "@type": "Country",
        name: "Worldwide",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "CNC & VMC Precision Manufacturing Capabilities",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "CNC Turning Center Operations",
              description: "Precision CNC turning centers machining 4mm to 550mm diameter components.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Vertical Machining Center (VMC) Milling",
              description: "Multi-axis VMC milling for intricate components up to 3m x 2m x 1m.",
            },
          },
        ],
      },
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
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredSchema) }}
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
        </SmoothScroll>
      </body>
    </html>
  );
}
