"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  PlusCircle,
  Search,
  Filter,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  AlertTriangle,
  Loader2,
  ExternalLink,
  Check,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  material?: string;
  tolerance?: string;
  image: string;
  is_published: number | boolean;
  featured: number | boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Delete modal state
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Status toggle in-flight
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Failed fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleTogglePublished = async (product: Product) => {
    try {
      setTogglingId(product.id);
      const newStatus = product.is_published ? 0 : 1;
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_published: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, is_published: newStatus } : p))
        );
      }
    } catch (err) {
      console.error("Failed toggling status:", err);
    } finally {
      setTogglingId(null);
    }
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/products/${productToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
        setProductToDelete(null);
      }
    } catch (err) {
      console.error("Failed deleting product:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Derive unique categories
  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category))).sort()];

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.material && p.material.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "published" && (p.is_published === 1 || p.is_published === true)) ||
      (statusFilter === "draft" && (p.is_published === 0 || p.is_published === false));

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Product Catalog Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Add, update, publish, or remove precision machined parts visible on your public website.
          </p>
        </div>

        <Link
          href="/owner-access-7x9k/products/new"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-600/20 transition-all hover:-translate-y-0.5"
        >
          <PlusCircle size={16} /> Add New Component
        </Link>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name, material, or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-xs font-bold text-slate-500 shrink-0">Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-44 px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 bg-white focus:outline-none focus:border-orange-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Publication Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-xs font-bold text-slate-500 shrink-0">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-36 px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 bg-white focus:outline-none focus:border-orange-500"
          >
            <option value="All">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft (Hidden)</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-sm text-slate-400 flex flex-col items-center justify-center gap-2">
            <Loader2 size={24} className="animate-spin text-orange-600" />
            <span>Loading product catalog...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-16 text-center text-sm text-slate-400">
            No components match your search or filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 uppercase font-bold text-slate-500 tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Component</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Tolerance</th>
                  <th className="py-3.5 px-4">Material</th>
                  <th className="py-3.5 px-4 text-center">Visibility</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => {
                  const isPub = p.is_published === 1 || p.is_published === true;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block text-sm">
                              {p.name}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              slug: {p.slug}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {p.category}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-orange-600">
                        {p.tolerance || "±0.005mm"}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {p.material || "Standard Spec"}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          disabled={togglingId === p.id}
                          onClick={() => handleTogglePublished(p)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            isPub
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                          }`}
                          title="Click to toggle publish status"
                        >
                          {togglingId === p.id ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : isPub ? (
                            <Eye size={12} />
                          ) : (
                            <EyeOff size={12} />
                          )}
                          <span>{isPub ? "Published" : "Draft"}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/owner-access-7x9k/products/${p.id}/edit`}
                            className="p-2 rounded-lg bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-600 transition-colors"
                            title="Edit Product"
                          >
                            <Edit size={14} />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setProductToDelete(p)}
                            className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Delete (Requirement 12) */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Confirm Record Deletion
            </h3>

            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-slate-900 font-bold">"{productToDelete.name}"</strong>?
              This action cannot be undone and will immediately remove the component from your
              public catalog.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={confirmDelete}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-1.5"
              >
                {isDeleting ? <Loader2 size={14} className="animate-spin" /> : "Delete Component"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
