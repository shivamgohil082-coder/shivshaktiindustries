"use client";

import { RotateCcw } from "lucide-react";

export interface ProductFiltersState {
  category: string;
  material: string;
  industry: string;
  process: string;
  featured: boolean;
  inStock: boolean;
}

interface ProductFiltersProps {
  filters: ProductFiltersState;
  categories: string[];
  materials: string[];
  industries: string[];
  processes: string[];
  onChange: (filters: ProductFiltersState) => void;
}

const defaultFilters: ProductFiltersState = {
  category: "",
  material: "",
  industry: "",
  process: "",
  featured: false,
  inStock: false,
};

export default function ProductFilters({
  filters,
  categories,
  materials,
  industries,
  processes,
  onChange,
}: ProductFiltersProps) {
  const update = (
    key: keyof ProductFiltersState,
    value: string | boolean
  ) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onChange(defaultFilters);
  };

  const selectClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition";

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Filter Products
        </h3>

        <button
          onClick={resetFilters}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition hover:bg-orange-50 hover:text-orange-600"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            value={filters.category}
            onChange={(e) => update("category", e.target.value)}
            className={selectClass}
          >
            <option value="">All Categories</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Material */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Material
          </label>

          <select
            value={filters.material}
            onChange={(e) => update("material", e.target.value)}
            className={selectClass}
          >
            <option value="">All Materials</option>

            {materials.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Industry */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Industry
          </label>

          <select
            value={filters.industry}
            onChange={(e) => update("industry", e.target.value)}
            className={selectClass}
          >
            <option value="">All Industries</option>

            {industries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Process */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Manufacturing Process
          </label>

          <select
            value={filters.process}
            onChange={(e) => update("process", e.target.value)}
            className={selectClass}
          >
            <option value="">All Processes</option>

            {processes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3 rounded-lg border p-4">
          <input
            id="featured"
            type="checkbox"
            checked={filters.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="h-4 w-4 accent-orange-500"
          />

          <label
            htmlFor="featured"
            className="cursor-pointer text-sm font-medium"
          >
            Featured Products Only
          </label>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-3 rounded-lg border p-4">
          <input
            id="stock"
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => update("inStock", e.target.checked)}
            className="h-4 w-4 accent-orange-500"
          />

          <label
            htmlFor="stock"
            className="cursor-pointer text-sm font-medium"
          >
            In Stock Only
          </label>
        </div>
      </div>
    </div>
  );
}