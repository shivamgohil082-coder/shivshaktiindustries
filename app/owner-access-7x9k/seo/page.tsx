"use client";

import React, { useEffect, useState } from "react";
import { Globe, Save, CheckCircle2, Loader2, Sparkles, ExternalLink } from "lucide-react";

interface SeoMeta {
  id: number;
  page_path: string;
  meta_title: string;
  meta_description: string;
  keywords?: string;
  canonical_url?: string;
  updated_at: string;
}

export default function AdminSeoPage() {
  const [seoList, setSeoList] = useState<SeoMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPath, setSavingPath] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchSeo = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/seo");
      const data = await res.json();
      if (data.success) {
        setSeoList(data.seoList);
      }
    } catch (err) {
      console.error("Failed fetching SEO meta:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeo();
  }, []);

  const handleFieldChange = (
    pagePath: string,
    field: "meta_title" | "meta_description" | "keywords" | "canonical_url",
    value: string
  ) => {
    setSeoList((prev) =>
      prev.map((s) => (s.page_path === pagePath ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = async (meta: SeoMeta) => {
    try {
      setSavingPath(meta.page_path);
      setSuccessMessage("");
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meta),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`SEO meta for "${meta.page_path}" saved!`);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error("Failed saving SEO meta:", err);
    } finally {
      setSavingPath(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Search Engine Optimization (SEO) Metadata
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Customize meta titles and Google search snippet descriptions for maximum RFQ conversion.
          </p>
        </div>

        {successMessage && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-fadeIn">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="p-16 text-center text-sm text-slate-400 flex flex-col items-center justify-center gap-2 bg-white rounded-2xl border border-slate-200">
          <Loader2 size={24} className="animate-spin text-orange-600" />
          <span>Loading SEO configurations...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {seoList.map((s) => {
            const titleLength = (s.meta_title || "").length;
            const descLength = (s.meta_description || "").length;

            return (
              <div
                key={s.page_path}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded-lg">
                      {s.page_path}
                    </span>
                    <a
                      href={s.page_path}
                      target="_blank"
                      className="text-slate-400 hover:text-orange-600 text-xs flex items-center gap-1"
                    >
                      View Live <ExternalLink size={11} />
                    </a>
                  </div>

                  <button
                    type="button"
                    disabled={savingPath === s.page_path}
                    onClick={() => handleSave(s)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-orange-600/20 transition-all disabled:opacity-60"
                  >
                    {savingPath === s.page_path ? (
                      <>
                        <Loader2 size={13} className="animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save size={13} /> Save SEO
                      </>
                    )}
                  </button>
                </div>

                {/* Google Search Live Simulation Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Google Search Preview
                  </span>
                  <div className="text-xs text-emerald-700 truncate font-mono">
                    https://shivshaktiindustries.org{s.page_path === "/" ? "" : s.page_path}
                  </div>
                  <div className="text-base text-blue-700 font-semibold hover:underline cursor-pointer truncate mt-0.5">
                    {s.meta_title || "SHIV SHAKTI INDUSTRIES"}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {s.meta_description || "Precision CNC and VMC manufacturing solutions in Vadodara."}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Page Meta Title
                    </label>
                    <span
                      className={`text-[11px] font-mono ${
                        titleLength > 60 ? "text-amber-600 font-bold" : "text-slate-400"
                      }`}
                    >
                      {titleLength}/60 chars (Recommended)
                    </span>
                  </div>
                  <input
                    type="text"
                    value={s.meta_title || ""}
                    onChange={(e) =>
                      handleFieldChange(s.page_path, "meta_title", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Meta Description
                    </label>
                    <span
                      className={`text-[11px] font-mono ${
                        descLength > 160 ? "text-amber-600 font-bold" : "text-slate-400"
                      }`}
                    >
                      {descLength}/160 chars (Recommended)
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={s.meta_description || ""}
                    onChange={(e) =>
                      handleFieldChange(s.page_path, "meta_description", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Target Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={s.keywords || ""}
                    onChange={(e) =>
                      handleFieldChange(s.page_path, "keywords", e.target.value)
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
