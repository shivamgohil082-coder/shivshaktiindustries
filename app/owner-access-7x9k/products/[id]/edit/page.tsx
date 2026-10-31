"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  Loader2,
  PackageCheck,
  Image as ImageIcon,
  CheckCircle2,
} from "lucide-react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "Turning",
    process: "",
    industry: "",
    material: "",
    tolerance: "±0.005mm",
    finish: "",
    dimensions: "",
    weight: "",
    moq: 10,
    specs: "",
    applications: "",
    description: "",
    image: "",
    is_published: 1,
    featured: 0,
  });

  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.product) {
          const p = data.product;
          setFormData({
            name: p.name || "",
            slug: p.slug || "",
            category: p.category || "Turning",
            process: p.process || "",
            industry: p.industry || "",
            material: p.material || "",
            tolerance: p.tolerance || "±0.005mm",
            finish: p.finish || "",
            dimensions: p.dimensions || "",
            weight: p.weight || "",
            moq: Number(p.moq) || 10,
            specs: p.specs || "",
            applications: p.applications || "",
            description: p.description || "",
            image: p.image || "",
            is_published: p.is_published ? 1 : 0,
            featured: p.featured ? 1 : 0,
          });
        } else {
          setError(data.error || "Component not found.");
        }
      })
      .catch(() => setError("Failed to retrieve component details."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      setError("");
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        setError(data.error || "Image upload failed.");
      }
    } catch {
      setError("Network error while uploading image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/owner-access-7x9k/products");
          router.refresh();
        }, 1200);
      } else {
        setError(data.error || "Failed to update product.");
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
        <Loader2 size={24} className="animate-spin text-orange-600" />
        <span>Loading component specifications...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/owner-access-7x9k/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
          <div className="h-12 w-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
            <PackageCheck size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Edit Engineering Component</h2>
            <p className="text-xs text-slate-500">
              Update tolerances, descriptions, or change publish status.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 size={16} /> Component updated successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Component Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:border-orange-500"
              >
                <option value="Turning">Turning</option>
                <option value="Milling">Milling (VMC)</option>
                <option value="Flanges & Valves">Flanges &amp; Valves</option>
                <option value="Electrical & Connectors">Electrical &amp; Connectors</option>
                <option value="Assembly & Machining">Assembly &amp; Machining</option>
                <option value="Sheet Metal">Sheet Metal &amp; Fabrication</option>
                <option value="Custom Components">Custom Components</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Tolerance (e.g. ±0.003mm)
              </label>
              <input
                type="text"
                value={formData.tolerance}
                onChange={(e) => setFormData({ ...formData, tolerance: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Material Grade
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Machining Process
              </label>
              <input
                type="text"
                value={formData.process}
                onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Target Industry
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Surface Finish
              </label>
              <input
                type="text"
                value={formData.finish}
                onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Min. Order Qty (MOQ)
              </label>
              <input
                type="number"
                value={formData.moq}
                onChange={(e) => setFormData({ ...formData, moq: Number(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Engineering Specifications
            </label>
            <textarea
              rows={2}
              value={formData.specs}
              onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Industrial Applications
            </label>
            <textarea
              rows={2}
              value={formData.applications}
              onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Component Photo
            </span>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="h-24 w-24 rounded-2xl bg-slate-200 overflow-hidden border border-slate-300 shrink-0 relative">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-slate-400">
                    <ImageIcon size={24} />
                  </div>
                )}
              </div>

              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 hover:border-orange-500 text-xs font-bold text-slate-700 shadow-sm transition-all">
                    <Upload size={14} />
                    {uploadingImage ? "Uploading..." : "Replace Image"}
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      className="hidden"
                      onChange={handleImageFileChange}
                      disabled={uploadingImage}
                    />
                  </label>
                  {uploadingImage && <Loader2 size={16} className="animate-spin text-orange-600" />}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Path:</span>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-600 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={Boolean(formData.is_published)}
                onChange={(e) => setFormData({ ...formData, is_published: e.target.checked ? 1 : 0 })}
                className="h-4 w-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300"
              />
              <span>Published on public website</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-800">
              <input
                type="checkbox"
                checked={Boolean(formData.featured)}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked ? 1 : 0 })}
                className="h-4 w-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300"
              />
              <span>Featured on interactive precision carousel</span>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <Link
              href="/owner-access-7x9k/products"
              className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Saving...
                </>
              ) : (
                "Update Component"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
