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
    "Shiv Shakti Industries manufactures food processing machinery and industrial equipment for efficient, reliable, and high-quality production.",
  keywords: [
    "CNC Machining Vadodara",
    "VMC Machining Gujarat",
    "Precision CNC Turned Components",
    "Precision Engineering Solutions",
    "Shiv Shakti Industries",
    "Hydraulic Manifolds CNC",
    "Makarpura GIDC CNC Machine Shop",
    "Automotive Machined Parts India",
    "CNC turning",
    "CNC milling",
    "VMC machining",
    "sheet metal fabrication",
    "valves flanges bearings lugs bushes",
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
    icon: [
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Precision CNC Machining Manufacturer | Shiv Shakti Industries",
    description:
      "Shiv Shakti Industries manufactures food processing machinery and industrial equipment for efficient, reliable, and high-quality production.",
    url: SITE_URL,
    siteName: "Shiv Shakti Industries",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
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
      "Shiv Shakti Industries manufactures food processing machinery and industrial equipment for efficient, reliable, and high-quality production.",
    images: ["/images/logo.png"],
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
      logo: `${SITE_URL}/images/logo.png`,
      image: `${SITE_URL}/images/logo.png`,
      description:
        "Shiv Shakti Industries manufactures food processing machinery and industrial equipment for efficient, reliable, and high-quality production.",
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
      description:
        "Shiv Shakti Industries manufactures food processing machinery and industrial equipment for efficient, reliable, and high-quality production.",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileImage" content="/icon-192x192.png" />
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
