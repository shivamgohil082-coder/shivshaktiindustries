"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Factory,
  Layers3,
  Ruler,
} from "lucide-react";

import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
  view?: "grid" | "list";
}

export default function ProductCard({
  product,
  index = 0,
}: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
    >
      {/* Product Image */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {product.featured && (
          <div className="absolute left-4 top-4 rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-lg">
            Featured
          </div>
        )}

        {product.inStock ? (
          <div className="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white">
            In Stock
          </div>
        ) : (
          <div className="absolute right-4 top-4 rounded-full bg-red-600 px-3 py-2 text-xs font-semibold text-white">
            Made to Order
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-5 p-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">
            {product.name}
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            {product.description}
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700">
            {product.material}
          </span>

          <span className="rounded-full bg-orange-100 px-3 py-2 text-xs font-semibold text-orange-700">
            {product.process}
          </span>

          <span className="rounded-full bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700">
            {product.industry}
          </span>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4">

          <div className="flex items-center gap-3">
            <BadgeCheck className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-xs text-slate-500">
                Tolerance
              </p>
              <p className="text-sm font-semibold">
                {product.tolerance}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Layers3 className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-xs text-slate-500">
                Finish
              </p>
              <p className="text-sm font-semibold">
                {product.finish}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Ruler className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-xs text-slate-500">
                Size
              </p>
              <p className="text-sm font-semibold">
                {product.dimensions}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Boxes className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-xs text-slate-500">
                MOQ
              </p>
              <p className="text-sm font-semibold">
                {product.moq} pcs
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-5">

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Factory className="h-4 w-4 text-orange-500" />
            Custom Manufacturing
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#0A2342] px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500"
          >
            Request Quote
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>
      </div>
    </motion.article>
  );
}