"use client";

import React, { useEffect, useState } from "react";
import { Save, CheckCircle2, Loader2 } from "lucide-react";

interface ContentBlock {
  id: number;
  section_key: string;
  title?: string;
  subtitle?: string;
  content?: string;
  updated_at: string;
}

export default function AdminContentPage() {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchBlocks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/content");
      const data = await res.json();
      if (data.success) {
        setBlocks(data.blocks);
      }
    } catch (err) {
      console.error("Failed fetching content blocks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, []);

  const handleFieldChange = (
    key: string,
    field: "title" | "subtitle" | "content",
    value: string
  ) => {
    setBlocks((prev) =>
      prev.map((b) => (b.section_key === key ? { ...b, [field]: value } : b))
    );
  };

  const handleSave = async (block: ContentBlock) => {
    try {
      setSavingKey(block.section_key);
      setSuccessMessage("");
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(block),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMessage(`"${block.section_key}" saved successfully!`);
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      console.error("Failed saving content:", err);
    } finally {
      setSavingKey(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Website Content &amp; Text Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Update marketing headlines, company story, and contact statements without touching any code.
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
          <span>Loading editable content blocks...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {blocks.map((b) => (
            <div
              key={b.section_key}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-orange-600">
                    Section: {b.section_key}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    Last updated: {new Date(b.updated_at).toLocaleString()}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={savingKey === b.section_key}
                  onClick={() => handleSave(b)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-orange-600/20 transition-all disabled:opacity-60"
                >
                  {savingKey === b.section_key ? (
                    <>
                      <Loader2 size={13} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save size={13} /> Save Changes
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Title / Headline
                  </label>
                  <input
                    type="text"
                    value={b.title || ""}
                    onChange={(e) => handleFieldChange(b.section_key, "title", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Subtitle / Badge
                  </label>
                  <input
                    type="text"
                    value={b.subtitle || ""}
                    onChange={(e) => handleFieldChange(b.section_key, "subtitle", e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Body Text / Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={b.content || ""}
                  onChange={(e) => handleFieldChange(b.section_key, "content", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
