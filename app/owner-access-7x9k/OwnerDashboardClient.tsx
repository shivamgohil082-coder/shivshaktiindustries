"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Inbox,
  Clock,
  CheckCircle2,
  PlusCircle,
  FileDown,
  ArrowRight,
  Database,
  ExternalLink,
  Layers,
  Sparkles,
  TrendingUp,
  MessageSquareText,
  UserRound,
  Banknote,
} from "lucide-react";

interface StatsData {
  totalProducts: number;
  totalCustomers: number;
  publishedProducts: number;
  draftProducts: number;
  totalEnquiries: number;
  newEnquiries: number;
  pendingEnquiries: number;
  completedEnquiries: number;
  rfqCount: number;
  generalEnquiryCount: number;
  isMySqlActive: boolean;
  recentEnquiries: Array<{
    id: number;
    reference_no: string;
    type: string;
    full_name: string;
    email: string;
    company?: string;
    subject: string;
    status: string;
    created_at: string;
  }>;
}

export default function OwnerDashboardClient() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch((err) => console.error("Failed to load dashboard metrics:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles size={14} /> Production Management Console
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back to Shiv Shakti Industries
            </h2>
            <p className="text-slate-400 text-sm max-w-xl">
              Control your product portfolio, track live RFQs and customer enquiries, manage website content, and generate comprehensive backups.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/owner-access-7x9k/products/new"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-600/25 transition-all transform active:scale-95"
            >
              <PlusCircle size={18} /> Add New Product
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
            >
              <ExternalLink size={16} /> Live Website
            </Link>
          </div>
        </div>
      </div>

      {/* Database Mode Notification Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3">
          <div
            className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold ${
              stats?.isMySqlActive
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            <Database size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900">
                Database Engine: {stats?.isMySqlActive ? "MySQL Enterprise" : "Local Fast Storage (SQLite Fallback)"}
              </span>
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  stats?.isMySqlActive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
            </div>
            <p className="text-xs text-slate-500">
              {stats?.isMySqlActive
                ? "Connected directly to your secure MySQL production database."
                : "Active zero-config resilient data store. All records safely persist."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/owner-access-7x9k/customers"
            className="text-xs font-semibold text-slate-600 hover:text-orange-600 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-orange-300 transition-colors"
          >
            View Customer Directory ({stats?.totalCustomers || 0})
          </Link>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Products */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Products
            </span>
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">
              {loading ? "..." : stats?.totalProducts ?? 0}
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              {stats?.publishedProducts ?? 0} published
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {stats?.draftProducts ?? 0} items currently drafted
          </p>
        </div>

        {/* Total Enquiries */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              All Enquiries
            </span>
            <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <Inbox size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">
              {loading ? "..." : stats?.totalEnquiries ?? 0}
            </span>
            <span className="text-xs font-semibold text-orange-600">
              {stats?.rfqCount ?? 0} RFQ Quotes
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {stats?.generalEnquiryCount ?? 0} General customer questions
          </p>
        </div>

        {/* New / Action Required */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              New RFQ Submissions
            </span>
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-600">
              {loading ? "..." : stats?.newEnquiries ?? 0}
            </span>
            <span className="text-xs font-semibold text-slate-500">unreviewed</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {stats?.pendingEnquiries ?? 0} currently pending follow-up
          </p>
        </div>

        {/* Completed Quotes */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Completed Deals
            </span>
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600">
              {loading ? "..." : stats?.completedEnquiries ?? 0}
            </span>
            <span className="text-xs font-semibold text-emerald-600">responded</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Satisfied RFQ requests</p>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div>
        <h3 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-orange-600" />
          Quick Management Portals
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/owner-access-7x9k/sales"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-orange-500 hover:shadow-md transition-all group flex items-start justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-orange-600">
                <Banknote size={18} className="text-orange-600" />
                Sales & Revenue
              </div>
              <p className="text-xs text-slate-500">Record sales orders, track client invoices and GST payments</p>
            </div>
            <ArrowRight size={16} className="text-slate-400 group-hover:text-orange-600 transform group-hover:translate-x-1 transition-all mt-1" />
          </Link>

          <Link
            href="/owner-access-7x9k/products"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-orange-500 hover:shadow-md transition-all group flex items-start justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-orange-600">
                <Package size={18} className="text-blue-600" />
                Product Catalog
              </div>
              <p className="text-xs text-slate-500">Publish industrial components, update photos and tolerances</p>
            </div>
            <ArrowRight size={16} className="text-slate-400 group-hover:text-orange-600 transform group-hover:translate-x-1 transition-all mt-1" />
          </Link>

          <Link
            href="/owner-access-7x9k/enquiries"
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-orange-500 hover:shadow-md transition-all group flex items-start justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-orange-600">
                <Inbox size={18} className="text-emerald-600" />
                Live RFQ Inquiries
              </div>
              <p className="text-xs text-slate-500">Read client technical requests and CAD drawing submissions</p>
            </div>
            <ArrowRight size={16} className="text-slate-400 group-hover:text-orange-600 transform group-hover:translate-x-1 transition-all mt-1" />
          </Link>
        </div>
      </div>

      {/* Recent Enquiries & Quick Actions Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Customer Enquiries</h3>
            <p className="text-xs text-slate-500">
              Latest quote inquiries and RFQs received through your online contact and quote forms.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open("/api/admin/enquiries?export=csv", "_blank")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <FileDown size={15} /> Export CSV
            </button>

            <button
              onClick={() => window.open("/api/admin/backup?format=json", "_blank")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <Database size={15} /> Backup Data
            </button>

            <Link
              href="/owner-access-7x9k/enquiries"
              className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading recent enquiries...</div>
        ) : !stats?.recentEnquiries || stats.recentEnquiries.length === 0 ? (
          <div className="p-12 text-center">
            <Inbox size={40} className="mx-auto text-slate-300 mb-3" />
            <p className="text-sm font-semibold text-slate-600">No enquiries received yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Customer inquiries and RFQ quote requests will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3">Reference</th>
                  <th className="px-6 py-3">Type</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Subject</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {stats.recentEnquiries.map((e) => {
                  const statusColors: Record<string, string> = {
                    New: "bg-orange-50 text-orange-700 border-orange-200",
                    Pending: "bg-amber-50 text-amber-700 border-amber-200",
                    Contacted: "bg-blue-50 text-blue-700 border-blue-200",
                    Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
                  };

                  return (
                    <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-xs text-slate-900">
                        {e.reference_no}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            e.type === "RFQ"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {e.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{e.full_name}</div>
                        <div className="text-xs text-slate-400">
                          {e.company ? `${e.company} • ` : ""}
                          {e.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700 max-w-xs truncate">
                        {e.subject || "No subject"}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {new Date(e.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            statusColors[e.status] || "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {e.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/owner-access-7x9k/enquiries?id=${e.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-700 text-xs font-semibold transition-colors"
                        >
                          View <ArrowRight size={13} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
