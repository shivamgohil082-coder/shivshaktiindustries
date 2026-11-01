import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { createPageMetadata, serializeJsonLd, SITE_URL } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Precision CNC Turned Components and Machined Products",
  description:
    "Explore precision CNC turned components, threaded bushings, machined fittings, brass hydraulic manifolds, transmission assemblies, and stainless steel parts.",
  path: "/products",
  keywords: [
    "Precision CNC turned components",
    "Brass CNC turned components",
    "Stainless steel turned components",
    "Precision threaded bushings",
    "CNC machined fittings",
  ],
});

import ProductViewerDynamic from "@/components/products/ProductViewerDynamic";
import ExpandableProductGallery from "@/components/products/ExpandableProductGallery";
import { getAllProducts, getInitialProducts } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const dbProducts = await getAllProducts(true);
  const default16 = getInitialProducts();

  // Combine db products and ensure all 16 precision products are always present
  let productsToUse = dbProducts.length > 0 ? dbProducts : default16;
  if (productsToUse.length < 16) {
    const existingSlugs = new Set(productsToUse.map((p) => p.slug || p.name));
    const missing = default16.filter((p) => !existingSlugs.has(p.slug || p.name));
    productsToUse = [...productsToUse, ...missing];
  }

  // Keep the entire published catalog visible, including products added in Admin.
  const allProducts = productsToUse;
  const productCatalogSchema = allProducts.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Shiv Shakti Industries product catalog",
        itemListElement: allProducts.map((product, index) => {
          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              name: product.name,
              ...(product.description || product.specs
                ? { description: product.description || product.specs }
                : {}),
              ...(product.image
                ? { image: new URL(product.image, SITE_URL).toString() }
                : {}),
              ...(product.category ? { category: product.category } : {}),
              ...(product.material ? { material: product.material } : {}),
              manufacturer: { "@id": `${SITE_URL}/#organization` },
            },
          };
        }),
      }
    : null;

  return (
    <main className="bg-gray-50 pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-24 min-h-screen">
      {productCatalogSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(productCatalogSchema),
          }}
        />
      )}
      <Breadcrumbs items={[{ label: "Products", href: "/products" }]} />
      {/* Header */}
      <section className="bg-secondary py-12 sm:py-16 md:py-20 text-white">
        <div className="container-custom text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight">Our Products</h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-gray-400">
            Precision engineered components manufactured to exact specifications for diverse industrial applications worldwide.
          </p>
        </div>
      </section>

      {/* Expandable Image Gallery Section (Recreated from Reference Video) */}
      <section className="container-custom mt-8 sm:mt-12 mb-8 !p-0">
        <ExpandableProductGallery
          products={allProducts}
          title="Interactive Precision Gallery"
          subtitle="Click any of our  precision CNC turned, VMC milled, and transmission assemblies to expand full engineering details, micro-tolerances, and CAD specs."
        />
      </section>

      {/* 3D Interactive Viewer Section */}
      <section className="container-custom mt-8 mb-24">

        <div className="mb-8 text-center">
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Interact with a complete digital twin of our high-voltage electrical shear connectors engineered with tight tolerances.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
          <ProductViewerDynamic />
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 sm:mt-24 bg-white py-12 sm:py-16 border-t border-gray-200">
        <div className="container-custom flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-black uppercase text-secondary">Require a custom manufactured component?</h3>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Submit your 2D/3D CAD drawings for rapid feasibility analysis and quotation.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold uppercase tracking-wider text-white shadow-md hover:bg-red-700 active:scale-95 transition-all shrink-0 text-sm"
          >
            Submit Drawings / RFQ <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
