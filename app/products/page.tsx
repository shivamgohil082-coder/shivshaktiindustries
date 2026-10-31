import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Precision CNC Products & Components",
  description:
    "Explore our range of precision turned pins, VMC brass hydraulic manifolds, splined transmission assemblies, stainless steel flanges, and bi-metallic connectors with ±0.003mm tolerances.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Precision CNC Products & Components | Shiv Shakti Industries",
    description: "Swiss-turned parts, multi-axis VMC components, and high-voltage electrical lugs.",
    url: "/products",
  },
};

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
  return (
    <main className="bg-gray-50 pt-24 pb-24 min-h-screen">
      {/* Header */}
      <section className="bg-secondary py-20 text-white">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-black uppercase tracking-tighter md:text-7xl">Our Products</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Precision engineered components manufactured to exact specifications for diverse industrial applications worldwide.
          </p>
        </div>
      </section>

      {/* Expandable Image Gallery Section (Recreated from Reference Video) */}
      <section className="container-custom mt-12 mb-8 !p-0">
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
      <section className="mt-24 bg-white py-16 border-t border-gray-200">
        <div className="container-custom flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-black uppercase text-secondary">Require a custom manufactured component?</h3>
            <p className="text-gray-600 mt-1">Submit your 2D/3D CAD drawings for rapid feasibility analysis and quotation.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold uppercase tracking-widest text-white shadow-md hover:bg-red-700 transition-all shrink-0"
          >
            Submit Drawings / RFQ <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
