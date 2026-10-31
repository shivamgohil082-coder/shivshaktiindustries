"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";
import ProductFilters, {
  ProductFiltersState,
} from "./ProductFilter";
import ProductToolbar, {
  SortOption,
} from "./producttoolbar";
import ProductPagination from "./ProductPagination";

import { products } from "@/data/products-full";
import { Product } from "@/types/product";

const PRODUCTS_PER_PAGE = 9;

export default function ProductGrid() {
  const [search, setSearch] = useState("");

  const [view, setView] = useState<"grid" | "list">(
    "grid"
  );

  const [sortBy, setSortBy] =
    useState<SortOption>("featured");

  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] =
    useState<ProductFiltersState>({
      category: "",
      material: "",
      industry: "",
      process: "",
      featured: false,
      inStock: false,
    });

  /**
   * -----------------------------------
   * Filter Options
   * -----------------------------------
   */

  const categories = useMemo(
    () =>
      [...new Set(products.map((p) => p.category))].sort(),
    []
  );

  const materials = useMemo(
    () =>
      [...new Set(products.map((p) => p.material))].sort(),
    []
  );

  const industries = useMemo(
    () =>
      [...new Set(products.map((p) => p.industry))].sort(),
    []
  );

  const processes = useMemo(
    () =>
      [...new Set(products.map((p) => p.process))].sort(),
    []
  );

  /**
   * -----------------------------------
   * Search + Filter Products
   * -----------------------------------
   */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        product.name.toLowerCase().includes(keyword) ||
        product.material.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) ||
        product.process.toLowerCase().includes(keyword) ||
        product.industry.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword);

      const matchesCategory =
        !filters.category ||
        product.category === filters.category;

      const matchesMaterial =
        !filters.material ||
        product.material === filters.material;

      const matchesIndustry =
        !filters.industry ||
        product.industry === filters.industry;

      const matchesProcess =
        !filters.process ||
        product.process === filters.process;

      const matchesFeatured =
        !filters.featured || product.featured;

      const matchesStock =
        !filters.inStock || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMaterial &&
        matchesIndustry &&
        matchesProcess &&
        matchesFeatured &&
        matchesStock
      );
    });
  }, [search, filters]);

  /**
   * -----------------------------------
   * Sorting
   * -----------------------------------
   */

  const sortedProducts = useMemo(() => {
    const data = [...filteredProducts];

    switch (sortBy) {
      case "featured":
        data.sort(
          (a, b) =>
            Number(b.featured) -
            Number(a.featured)
        );
        break;

      case "name-asc":
        data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "name-desc":
        data.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;

      case "category":
        data.sort((a, b) =>
          a.category.localeCompare(b.category)
        );
        break;

      case "material":
        data.sort((a, b) =>
          a.material.localeCompare(b.material)
        );
        break;

      default:
        break;
    }

    return data;
  }, [filteredProducts, sortBy]);

  /**
   * -----------------------------------
   * Pagination
   * -----------------------------------
   */

  const totalPages = Math.ceil(
    sortedProducts.length / PRODUCTS_PER_PAGE
  );

  const paginatedProducts = useMemo(() => {
    const start =
      (currentPage - 1) * PRODUCTS_PER_PAGE;

    return sortedProducts.slice(
      start,
      start + PRODUCTS_PER_PAGE
    );
  }, [sortedProducts, currentPage]);

  /**
   * Reset page whenever
   * search/filter changes
   */

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters, sortBy]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">

        {/* Search */}
        <div className="mb-8">
          <ProductSearch
            value={search}
            onChange={setSearch}
            placeholder="Search products, material, industry..."
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ProductFilters
            filters={filters}
            onChange={setFilters}
            categories={categories}
            materials={materials}
            industries={industries}
            processes={processes}
          />
        </div>

        {/* Toolbar */}
        <ProductToolbar
          totalProducts={sortedProducts.length}
          view={view}
          sortBy={sortBy}
          onViewChange={setView}
          onSortChange={setSortBy}
        />

        {/* Empty State */}

        {sortedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-dashed border-gray-300 py-24 text-center"
          >
            <h3 className="text-2xl font-bold">
              No Products Found
            </h3>

            <p className="mt-3 text-gray-500">
              Try changing the search keyword or filters.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${view}-${currentPage}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.35 }}
              className={
                view === "grid"
                  ? "grid gap-8 md:grid-cols-2 xl:grid-cols-3"
                  : "space-y-6"
              }
            >
              {paginatedProducts.map((product: Product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <ProductCard
                    product={product}
                    view={view}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
                {sortedProducts.length > 0 && (
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}