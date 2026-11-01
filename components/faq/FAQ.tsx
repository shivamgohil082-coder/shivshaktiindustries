import Link from "next/link";
import { serializeJsonLd } from "@/lib/seo";

export interface FAQItem {
  question: string;
  answer: string;
  link?: {
    href: string;
    label: string;
  };
}

interface FAQProps {
  title: string;
  items: FAQItem[];
}

export default function FAQ({ title, items }: FAQProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-3xl font-bold text-secondary sm:text-4xl">
            {title}
          </h2>
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {items.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none pr-8 text-lg font-semibold text-secondary marker:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  <h3 className="inline">{item.question}</h3>
                  <span
                    aria-hidden="true"
                    className="float-right text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-3xl leading-7 text-gray-600">
                  {item.answer}
                </p>
                {item.link && (
                  item.link.href.startsWith("/") ? (
                    <Link
                      href={item.link.href}
                      className="mt-3 inline-flex font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      {item.link.label}
                    </Link>
                  ) : (
                    <a
                      href={item.link.href}
                      className="mt-3 inline-flex font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      {item.link.label}
                    </a>
                  )
                )}
              </details>
            ))}
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
    </section>
  );
}