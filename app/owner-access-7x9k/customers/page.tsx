"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Building2,
  Eye,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
  UserRound,
  X,
} from "lucide-react";

type Customer = {
  id: number;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  billing_address: string;
  shipping_address: string;
  gst_number: string;
  created_at: string;
  updated_at: string;
};

type Enquiry = {
  id: number;
  reference_no: string;
  type: string;
  subject: string;
  status: string;
  created_at: string;
};

type CustomerForm = Omit<Customer, "id" | "created_at" | "updated_at">;

const EMPTY_FORM: CustomerForm = {
  company_name: "",
  contact_name: "",
  email: "",
  phone: "",
  billing_address: "",
  shipping_address: "",
  gst_number: "",
};
const PAGE_SIZE = 10;

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState<CustomerForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerEnquiries, setCustomerEnquiries] = useState<Enquiry[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchCustomers = useCallback(async (query: string, signal?: AbortSignal) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `/api/admin/customers?search=${encodeURIComponent(query)}`,
        { signal }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load customers.");
      }
      setCustomers(data.customers);
    } catch (fetchError) {
      if (fetchError instanceof Error && fetchError.name === "AbortError") return;
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load customers.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      setPage(1);
      void fetchCustomers(search, controller.signal);
    }, 250);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [fetchCustomers, search]);

  const pageCount = Math.max(1, Math.ceil(customers.length / PAGE_SIZE));
  const visibleCustomers = useMemo(
    () => customers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [customers, page]
  );

  const openNewCustomer = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
    setModalOpen(true);
  };

  const openEditCustomer = (customer: Customer) => {
    setEditingId(customer.id);
    setForm({
      company_name: customer.company_name,
      contact_name: customer.contact_name,
      email: customer.email,
      phone: customer.phone,
      billing_address: customer.billing_address,
      shipping_address: customer.shipping_address,
      gst_number: customer.gst_number,
    });
    setError("");
    setModalOpen(true);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch(
        editingId ? `/api/admin/customers/${editingId}` : "/api/admin/customers",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to save customer.");
      }
      setModalOpen(false);
      await fetchCustomers(search);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save customer.");
    } finally {
      setSaving(false);
    }
  };

  const openCustomerDetails = async (customer: Customer) => {
    setSelectedCustomer(customer);
    setCustomerEnquiries([]);
    setDetailLoading(true);
    try {
      const response = await fetch(`/api/admin/customers/${customer.id}`);
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load customer details.");
      }
      setSelectedCustomer(data.customer);
      setCustomerEnquiries(data.enquiries);
    } catch (detailError) {
      setError(detailError instanceof Error ? detailError.message : "Failed to load customer details.");
      setSelectedCustomer(null);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDelete = async (customer: Customer) => {
    if (!window.confirm(`Delete ${customer.company_name} from the customer directory?`)) return;
    setError("");
    try {
      const response = await fetch(`/api/admin/customers/${customer.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to delete customer.");
      }
      setCustomers((current) => current.filter((item) => item.id !== customer.id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete customer.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            Customer Directory
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage customer contacts, billing details, and enquiry history.
          </p>
        </div>
        <button
          type="button"
          onClick={openNewCustomer}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-orange-500"
        >
          <Plus size={16} /> Add Customer
        </button>
      </header>

      {error && !modalOpen && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4">
          <label className="relative block">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search company, contact, email, or phone..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-orange-500"
            />
          </label>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 p-16 text-sm text-slate-500">
            <Loader2 className="animate-spin text-orange-600" size={20} /> Loading customers...
          </div>
        ) : customers.length === 0 ? (
          <div className="p-16 text-center">
            <UserRound className="mx-auto mb-3 text-slate-300" size={36} />
            <p className="font-semibold text-slate-700">No customers found</p>
            <p className="mt-1 text-sm text-slate-500">Add a customer or try another search.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Company / Contact</th>
                    <th className="px-5 py-4">Email / Phone</th>
                    <th className="px-5 py-4">GST Number</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visibleCustomers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                            <Building2 size={18} />
                          </span>
                          <span>
                            <span className="block font-bold text-slate-900">{customer.company_name}</span>
                            <span className="text-xs text-slate-500">{customer.contact_name}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <a className="block text-slate-700 hover:text-orange-600" href={`mailto:${customer.email}`}>
                          {customer.email}
                        </a>
                        <a className="mt-1 block text-xs text-slate-500" href={`tel:${customer.phone}`}>
                          {customer.phone || "No phone"}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{customer.gst_number || "—"}</td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => void openCustomerDetails(customer)}
                            aria-label={`View ${customer.company_name}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-sky-50 hover:text-sky-700"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditCustomer(customer)}
                            aria-label={`Edit ${customer.company_name}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-orange-50 hover:text-orange-700"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleDelete(customer)}
                            aria-label={`Delete ${customer.company_name}`}
                            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <footer className="flex items-center justify-between border-t border-slate-100 px-5 py-4 text-xs text-slate-500">
              <span>
                Showing {Math.min((page - 1) * PAGE_SIZE + 1, customers.length)}–
                {Math.min(page * PAGE_SIZE, customers.length)} of {customers.length}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => current - 1)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="px-2 py-1.5">Page {page} of {pageCount}</span>
                <button
                  type="button"
                  disabled={page >= pageCount}
                  onClick={() => setPage((current) => current + 1)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </footer>
          </>
        )}
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
          <form
            onSubmit={handleSave}
            className="my-8 w-full max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  {editingId ? "Edit Customer" : "Add Customer"}
                </h3>
                <p className="mt-1 text-sm text-slate-500">Company and contact details for your customer records.</p>
              </div>
              <button type="button" onClick={() => setModalOpen(false)} aria-label="Close form">
                <X size={20} />
              </button>
            </div>

            {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold text-slate-600">
                Company name *
                <input required maxLength={200} value={form.company_name} onChange={(e) => setForm({ ...form, company_name: e.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" />
              </label>
              <label className="text-xs font-bold text-slate-600">
                Contact person *
                <input required maxLength={160} value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" />
              </label>
              <label className="text-xs font-bold text-slate-600">
                Email *
                <input required type="email" maxLength={254} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" />
              </label>
              <label className="text-xs font-bold text-slate-600">
                Phone
                <input type="tel" maxLength={40} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" />
              </label>
              <label className="text-xs font-bold text-slate-600 sm:col-span-2">
                GST number (optional)
                <input maxLength={15} value={form.gst_number} onChange={(e) => setForm({ ...form, gst_number: e.target.value.toUpperCase() })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal uppercase" />
              </label>
              <label className="text-xs font-bold text-slate-600">
                Billing address
                <textarea rows={3} maxLength={2000} value={form.billing_address} onChange={(e) => setForm({ ...form, billing_address: e.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" />
              </label>
              <label className="text-xs font-bold text-slate-600">
                Shipping address
                <textarea rows={3} maxLength={2000} value={form.shipping_address} onChange={(e) => setForm({ ...form, shipping_address: e.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" />
              </label>
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">
                {saving && <Loader2 size={16} className="animate-spin" />}
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Customer"}
              </button>
            </div>
          </form>
        </div>
      )}

      {selectedCustomer && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
          <section className="my-8 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-orange-600">Customer profile</p>
                <h3 className="mt-1 text-2xl font-black text-slate-900">{selectedCustomer.company_name}</h3>
                <p className="text-sm text-slate-500">{selectedCustomer.contact_name}</p>
              </div>
              <button type="button" onClick={() => setSelectedCustomer(null)} aria-label="Close customer details">
                <X size={20} />
              </button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <p className="flex items-center gap-2 text-sm text-slate-700"><Mail size={16} />{selectedCustomer.email}</p>
              <p className="flex items-center gap-2 text-sm text-slate-700"><Phone size={16} />{selectedCustomer.phone || "No phone"}</p>
              <p className="flex items-start gap-2 text-sm text-slate-700"><MapPin size={16} className="mt-0.5 shrink-0" />Billing: {selectedCustomer.billing_address || "Not provided"}</p>
              <p className="flex items-start gap-2 text-sm text-slate-700"><MapPin size={16} className="mt-0.5 shrink-0" />Shipping: {selectedCustomer.shipping_address || "Not provided"}</p>
              <p className="text-sm text-slate-700 sm:col-span-2">GST: {selectedCustomer.gst_number || "Not provided"}</p>
            </div>
            <div className="mt-7 border-t border-slate-100 pt-5">
              <h4 className="font-bold text-slate-900">Enquiry history</h4>
              {detailLoading ? (
                <div className="flex items-center gap-2 py-6 text-sm text-slate-500"><Loader2 size={16} className="animate-spin" /> Loading history...</div>
              ) : customerEnquiries.length === 0 ? (
                <p className="py-5 text-sm text-slate-500">No enquiries found for this email address.</p>
              ) : (
                <ul className="mt-3 divide-y divide-slate-100">
                  {customerEnquiries.map((enquiry) => (
                    <li key={enquiry.id} className="flex flex-wrap justify-between gap-2 py-3 text-sm">
                      <span>
                        <span className="block font-semibold text-slate-800">{enquiry.subject}</span>
                        <span className="text-xs text-slate-500">{enquiry.reference_no} · {enquiry.type}</span>
                      </span>
                      <span className="text-xs text-slate-500">{enquiry.status} · {new Date(enquiry.created_at).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
