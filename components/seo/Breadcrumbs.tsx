import Link from "next/link";
import { serializeJsonLd, SITE_URL } from "@/lib/seo";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const itemListElement = [
    { label: "Home", href: "/" },
    ...items,
  ].map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: new URL(item.href, SITE_URL).toString(),
  }));

  return (
    <nav aria-label="Breadcrumb" className="container-custom py-3 text-sm text-gray-600">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-primary hover:underline">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {index === items.length - 1 ? (
              <span aria-current="page" className="font-medium text-secondary">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-primary hover:underline">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement,
        }) }}
      />
    </nav>
  );
}
