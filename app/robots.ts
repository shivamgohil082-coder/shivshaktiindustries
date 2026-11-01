import type { MetadataRoute } from 'next';
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const ownerAccessPath =
    process.env.OWNER_ACCESS_PATH || "/owner-access-7x9k";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", `${ownerAccessPath}/`],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
