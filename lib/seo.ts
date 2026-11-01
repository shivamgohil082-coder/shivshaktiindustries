import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://shivshaktiindustries.org";
const configuredSiteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL,
);
const localHosts = new Set(["localhost", "127.0.0.1", "[::1]"]);

export const SITE_URL =
  process.env.NODE_ENV === "production" &&
  localHosts.has(configuredSiteUrl.hostname)
    ? DEFAULT_SITE_URL
    : configuredSiteUrl.origin;
const SOCIAL_IMAGE = "/images/logo/logo3.jpeg";

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const pageTitle = title.includes("Shiv Shakti Industries")
    ? title
    : `${title} | Shiv Shakti Industries`;
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: "Shiv Shakti Industries",
      locale: "en_IN",
      type: "website",
      images: [{ url: SOCIAL_IMAGE, alt: "Shiv Shakti Industries" }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [SOCIAL_IMAGE],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
