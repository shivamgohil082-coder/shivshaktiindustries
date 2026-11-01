"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  FileDown,
  Trash2,
  AlertTriangle,
  Loader2,
  Building2,
  Paperclip,
  X,
  ExternalLink,
} from "lucide-react";

interface Enquiry {
  id: number;
  reference_no: string;
  type: "RFQ" | "General" | "Career" | "Vendor";
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  attachment_path?: string;
  attachment_name?: string;
  status: "New" | "Pending" | "Contacted" | "Completed";
  admin_notes?: string;
  ip_address?: string;
  created_at: string;
  updated_at: string;
}

export default function AdminEnquiriesPage() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id");

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // Selected enquiry for detail modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");

  // Delete modal state
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/enquiries");
      const data = await res.json();
      if (data.success) {
        setEnquiries(data.enquiries);
        if (initialId) {
          const matched = data.enquiries.find((e: Enquiry) => String(e.id) === initialId);
          if (matched) {
            setSelectedEnquiry(matched);
            setAdminNotes(matched.admin_notes || "");
          }
        }
      }
    } catch (err) {
      console.error("Failed fetching enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [initialId]);

  const handleOpenDetail = (e: Enquiry) => {
    setSelectedEnquiry(e);
    setAdminNotes(e.admin_notes || "");
  };

  const handleUpdateStatus = async (
    newStatus: "New" | "Pending" | "Contacted" | "Completed"
  ) => {
    if (!selectedEnquiry) return;
    try {
      setUpdatingStatus(true);
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, admin_notes: adminNotes }),
      });
      const data = await res.json();
      if (data.success && data.enquiry) {
        setSelectedEnquiry(data.enquiry);
        setEnquiries((prev) =>
          prev.map((e) => (e.id === data.enquiry.id ? data.enquiry : e))
        );
      }
    } catch (err) {
      console.error("Failed updating enquiry status:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      setUpdatingStatus(true);
      const res = await fetch(`/api/admin/enquiries/${selectedEnquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_notes: adminNotes }),
      });
      const data = await res.json();
      if (data.success && data.enquiry) {
        setSelectedEnquiry(data.enquiry);
        setEnquiries((prev) =>
          prev.map((e) => (e.id === data.enquiry.id ? data.enquiry : e))
        );
      }
    } catch (err) {
      console.error("Failed saving admin notes:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const confirmDelete = async () => {
    if (!enquiryToDelete) return;
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/admin/enquiries/${enquiryToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) => prev.filter((e) => e.id !== enquiryToDelete.id));
        if (selectedEnquiry?.id === enquiryToDelete.id) {
          setSelectedEnquiry(null);
        }
        setEnquiryToDelete(null);
      }
    } catch (err) {
      console.error("Failed deleting enquiry:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      search === "" ||
      e.full_name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      (e.phone && e.phone.toLowerCase().includes(search.toLowerCase())) ||
      (e.company && e.company.toLowerCase().includes(search.toLowerCase())) ||
      e.reference_no.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || e.status === statusFilter;
    const matchesType = typeFilter === "All" || e.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Customer Inquiries &amp; Quotation Requests
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review all incoming RFQs, update lead progress, and view drawings submitted by clients.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.open("/api/admin/enquiries?export=csv", "_blank")}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
        >
          <FileDown size={16} /> Export All to CSV
        </button>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, email, company, or reference number..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-xs font-bold text-slate-500 shrink-0">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-36 px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 bg-white focus:outline-none focus:border-orange-500"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Pending">Pending</option>
            <option value="Contacted">Contacted</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-xs font-bold text-slate-500 shrink-0">Type:</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full md:w-36 px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 bg-white focus:outline-none focus:border-orange-500"
          >
            <option value="All">All Types</option>
            <option value="RFQ">RFQ (Quotes)</option>
            <option value="General">General</option>
            <option value="Career">Career / HR</option>
            <option value="Vendor">Supplier / Vendor</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-sm text-slate-400 flex flex-col items-center justify-center gap-2">
            <Loader2 size={24} className="animate-spin text-orange-600" />
            <span>Loading inquiries from database...</span>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-16 text-center text-sm text-slate-400">
            No customer inquiries found matching the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 uppercase font-bold text-slate-500 tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Ref No</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Customer Info</th>
                  <th className="py-3.5 px-4">Subject</th>
                  <th className="py-3.5 px-4">Attachment</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {e.reference_no}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          e.type === "RFQ"
                            ? "bg-purple-100 text-purple-700"
                            : e.type === "Career"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {e.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{e.full_name}</div>
                      {e.company && (
                        <div className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
                          <Building2 size={12} /> {e.company}
                        </div>
                      )}
                      <div className="text-[11px] text-slate-500">{e.email}</div>
                      {e.phone && (
                        <div className="text-[11px] text-slate-500">{e.phone}</div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-600">
                      {e.subject}
                    </td>
                    <td className="py-3.5 px-4">
                      {e.attachment_name || e.attachment_path ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-semibold text-slate-700">
                          <Paperclip size={12} className="text-orange-600" />
                          <span className="truncate max-w-[120px]">
                            {e.attachment_name || "CAD File"}
                          </span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">None</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          e.status === "New"
                            ? "bg-red-100 text-red-700"
                            : e.status === "Pending"
                            ? "bg-amber-100 text-amber-700"
                            : e.status === "Contacted"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      {new Date(e.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenDetail(e)}
                          className="px-3 py-1 rounded-lg bg-orange-50 hover:bg-orange-600 hover:text-white text-orange-600 font-bold transition-all"
                        >
                          Details
                        </button>

                        <button
                          type="button"
                          onClick={() => setEnquiryToDelete(e)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-400 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <span className="font-mono text-xs font-bold text-orange-600 uppercase">
                  {selectedEnquiry.reference_no} • {selectedEnquiry.type}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  {selectedEnquiry.subject}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 rounded-full bg-slate-100 text-slate-400 hover:text-slate-800"
              >
                <X size={18} />
              </button>
            </div>

            {/* Customer Details Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  Customer Name
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {selectedEnquiry.full_name}
                </span>
                {selectedEnquiry.company && (
                  <span className="block text-slate-600 mt-0.5">
                    {selectedEnquiry.company}
                  </span>
                )}
              </div>

              <div>
                <span className="text-slate-400 font-bold uppercase tracking-wider block mb-1">
                  Contact Information
                </span>
                <a
                  href={`mailto:${selectedEnquiry.email}`}
                  className="text-orange-600 hover:underline block font-semibold"
                >
                  {selectedEnquiry.email}
                </a>
                {selectedEnquiry.phone && (
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="text-slate-700 block mt-0.5 font-semibold"
                  >
                    {selectedEnquiry.phone}
                  </a>
                )}
              </div>
            </div>

            {/* Message Body */}
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Requirements / Message
              </span>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Attached CAD / Drawing File */}
            {selectedEnquiry.attachment_name && (
              <div className="mb-6 p-4 rounded-2xl bg-orange-50/50 border border-orange-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Paperclip className="text-orange-600" size={18} />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {selectedEnquiry.attachment_name}
                    </span>
                    <span className="text-[11px] text-slate-500">CAD Drawing Attachment</span>
                  </div>
                </div>

                <a
                  href={`/uploads/${selectedEnquiry.attachment_path}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-bold"
                >
                  Download <ExternalLink size={12} />
                </a>
              </div>
            )}

            {/* Status Changer & Admin Internal Notes */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Update Lead Status (Requirement 5)
                </label>
                <div className="flex flex-wrap gap-2">
                  {(["New", "Pending", "Contacted", "Completed"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={updatingStatus}
                      onClick={() => handleUpdateStatus(st)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedEnquiry.status === st
                          ? "bg-slate-900 text-white shadow-md"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                  {updatingStatus && <Loader2 size={16} className="animate-spin text-orange-600 self-center" />}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Internal Engineering Notes
                </label>
                <textarea
                  rows={3}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Quoted ₹180/pc for 200 qty on 31 Oct. Material brass CW614N confirmed."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  disabled={updatingStatus}
                  onClick={handleSaveNotes}
                  className="mt-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
                >
                  Save Internal Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Delete (Requirement 12) */}
      {enquiryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="h-12 w-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Confirm Record Deletion
            </h3>

            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Are you sure you want to permanently delete enquiry{" "}
              <strong className="text-slate-900 font-bold">
                "{enquiryToDelete.reference_no}"
              </strong>{" "}
              from {enquiryToDelete.full_name}? This action cannot be reversed.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setEnquiryToDelete(null)}
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
                {isDeleting ? <Loader2 size={14} className="animate-spin" /> : "Delete Record"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
