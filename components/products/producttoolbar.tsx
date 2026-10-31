"use client";

import { Grid2X2, List, ArrowUpDown } from "lucide-react";

export type SortOption =
  | "featured"
  | "name-asc"
  | "name-desc"
  | "category"
  | "material";

interface ProductToolbarProps {
  totalProducts: number;
  view: "grid" | "list";
  sortBy: SortOption;
  onViewChange: (view: "grid" | "list") => void;
  onSortChange: (sort: SortOption) => void;
}

export default function ProductToolbar({
  totalProducts,
  view,
  sortBy,
  onViewChange,
  onSortChange,
}: ProductToolbarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      {/* Left Side */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Products
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-orange-600">
            {totalProducts}
          </span>{" "}
          products
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Sort */}
        <div className="flex items-center gap-3">
          <ArrowUpDown size={18} className="text-orange-600" />

          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as SortOption)
            }
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
          >
            <option value="featured">Featured First</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="category">Category</option>
            <option value="material">Material</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex overflow-hidden rounded-lg border border-gray-300">
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            className={`flex items-center gap-2 px-4 py-2 transition ${
              view === "grid"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            aria-label="Grid View"
          >
            <Grid2X2 size={18} />
            <span className="hidden sm:block">Grid</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange("list")}
            className={`flex items-center gap-2 px-4 py-2 transition ${
              view === "list"
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
            aria-label="List View"
          >
            <List size={18} />
            <span className="hidden sm:block">List</span>
          </button>
        </div>
      </div>
    </div>
  );
}