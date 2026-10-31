"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Banknote,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Loader2,
  Plus,
  ReceiptText,
  RefreshCw,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";

type SaleStatus = "Paid" | "Pending" | "Overdue" | "Cancelled";

type Sale = {
  id: number;
  reference_no: string;
  customer_name: string;
  amount: number;
  status: SaleStatus;
  sold_at: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

type SalesSummary = {
  totalSales: number;
  totalRevenue: number;
  pendingPayments: number;
  monthlyRevenue: number;
  sales: Sale[];
};

type SaleForm = Omit<Sale, "id" | "created_at" | "updated_at">;

const EMPTY_FORM: SaleForm = {
  reference_no: "",
  customer_name: "",
  amount: 0,
  status: "Pending",
  sold_at: new Date().toISOString().slice(0, 10),
  notes: "",
};

const STATUSES: SaleStatus[] = ["Paid", "Pending", "Overdue", "Cancelled"];
const STATUS_COLORS: Record<SaleStatus, string> = {
  Paid: "#059669",
  Pending: "#d97706",
  Overdue: "#dc2626",
  Cancelled: "#94a3b8",
};
const CURRENCY = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});
const COMPACT_CURRENCY = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1,
});

function formatCurrency(amount: number) {
  return CURRENCY.format(amount);
}

function statusClass(status: SaleStatus) {
  switch (status) {
    case "Paid":
      return "bg-emerald-50 text-emerald-700";
    case "Pending":
      return "bg-amber-50 text-amber-700";
    case "Overdue":
      return "bg-red-50 text-red-700";
    case "Cancelled":
      return "bg-slate-100 text-slate-500";
  }
}

export default function AdminSalesPage() {
  const [summary, setSummary] = useState<SalesSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | SaleStatus>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<SaleForm>(EMPTY_FORM);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/sales");
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to load sales.");
      }
      setSummary(data.summary);
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load sales.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchSales();
  }, [fetchSales]);

  const filteredSales = useMemo(
    () => (summary?.sales || []).filter(
      (sale) => statusFilter === "All" || sale.status === statusFilter
    ),
    [summary, statusFilter]
  );

  const analytics = useMemo(() => {
    const sales = summary?.sales || [];
    const currentDate = new Date();
    const months = Array.from({ length: 6 }, (_, index) => {
      const monthDate = new Date(Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth() - 5 + index,
        1
      ));
      return {
        key: monthDate.toISOString().slice(0, 7),
        label: new Intl.DateTimeFormat("en-IN", {
          month: "short",
          timeZone: "UTC",
        }).format(monthDate),
        revenue: 0,
      };
    });

    const monthlyRevenue = new Map(months.map((month) => [month.key, month]));
    const statusCounts: Record<SaleStatus, number> = {
      Paid: 0,
      Pending: 0,
      Overdue: 0,
      Cancelled: 0,
    };
    const customerRevenue = new Map<string, number>();

    for (const sale of sales) {
      statusCounts[sale.status] += 1;
      if (sale.status !== "Paid") continue;

      const month = monthlyRevenue.get(sale.sold_at.slice(0, 7));
      if (month) month.revenue += sale.amount;
      const customer = sale.customer_name.trim();
      customerRevenue.set(customer, (customerRevenue.get(customer) || 0) + sale.amount);
    }

    return {
      months,
      statusCounts,
      topCustomers: [...customerRevenue.entries()]
        .map(([name, revenue]) => ({ name, revenue }))
        .sort((left, right) => right.revenue - left.revenue || left.name.localeCompare(right.name))
        .slice(0, 5),
    };
  }, [summary]);

  const chartMaxRevenue = Math.max(...analytics.months.map((month) => month.revenue), 1);
  const chartPoints = analytics.months.map((month, index) => ({
    ...month,
    x: 52 + (index * 560) / (analytics.months.length - 1),
    y: 190 - (month.revenue / chartMaxRevenue) * 150,
  }));
  const revenueLine = chartPoints.map((point) => `${point.x},${point.y}`).join(" ");
  const revenueArea = `52,190 ${revenueLine} 612,190`;
  const totalStatusCount = Object.values(analytics.statusCounts).reduce((sum, count) => sum + count, 0);
  const topCustomerMax = Math.max(...analytics.topCustomers.map((customer) => customer.revenue), 1);

  const openNewSale = () => {
    setForm({ ...EMPTY_FORM, sold_at: new Date().toISOString().slice(0, 10) });
    setError("");
    setModalOpen(true);
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/admin/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to save sale.");
      }
      setModalOpen(false);
      await fetchSales();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save sale.");
    } finally {
      setSaving(false);
    }
  };

  const changeStatus = async (sale: Sale, status: SaleStatus) => {
    setError("");
    try {
      const response = await fetch(`/api/admin/sales/${sale.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to update sale.");
      }
      await fetchSales();
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "Failed to update sale.");
    }
  };

  const deleteRecord = async (sale: Sale) => {
    if (!window.confirm(`Delete sale ${sale.reference_no}? This cannot be undone.`)) return;
    setError("");
    try {
      const response = await fetch(`/api/admin/sales/${sale.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to delete sale.");
      }
      await fetchSales();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete sale.");
    }
  };

  const metrics = [
    {
      label: "Total Sales",
      value: summary?.totalSales ?? 0,
      detail: "Non-cancelled records",
      icon: ReceiptText,
      iconClass: "bg-blue-50 text-blue-600",
      display: "number",
    },
    {
      label: "Total Revenue",
      value: summary?.totalRevenue ?? 0,
      detail: "Paid sales",
      icon: Banknote,
      iconClass: "bg-emerald-50 text-emerald-600",
      display: "currency",
    },
    {
      label: "Pending Payments",
      value: summary?.pendingPayments ?? 0,
      detail: "Pending and overdue",
      icon: Clock3,
      iconClass: "bg-amber-50 text-amber-600",
      display: "currency",
    },
    {
      label: "This Month",
      value: summary?.monthlyRevenue ?? 0,
      detail: "Paid revenue this month",
      icon: TrendingUp,
      iconClass: "bg-violet-50 text-violet-600",
      display: "currency",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
            Sales &amp; Revenue
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Track sales, paid revenue, and outstanding customer payments.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void fetchSales()}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-xs font-bold text-slate-600 transition hover:border-slate-300 disabled:opacity-50"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
          <button
            type="button"
            onClick={openNewSale}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-orange-500"
          >
            <Plus size={16} /> Record Sale
          </button>
        </div>
      </header>

      {error && !modalOpen && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{metric.label}</span>
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${metric.iconClass}`}>
                  <Icon size={20} />
                </span>
              </div>
              <p className="text-2xl font-black text-slate-900">
                {loading ? "..." : metric.display === "currency"
                  ? formatCurrency(metric.value)
                  : metric.value.toLocaleString("en-IN")}
              </p>
              <p className="mt-1 text-xs text-slate-500">{metric.detail}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-5 xl:grid-cols-2" aria-label="Sales analytics">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h3 className="font-bold text-slate-900">Revenue Trend</h3>
            <p className="mt-1 text-xs text-slate-500">Paid revenue over the last six months</p>
          </div>
          {loading ? (
            <div className="flex h-56 items-center justify-center text-sm text-slate-400">Loading analytics...</div>
          ) : analytics.months.some((month) => month.revenue > 0) ? (
            <div>
              <svg
                viewBox="0 0 640 250"
                role="img"
                aria-label={`Paid revenue trend for the last six months. ${analytics.months.map((month) => `${month.label}: ${formatCurrency(month.revenue)}`).join(", ")}`}
                className="h-56 w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <title>Paid revenue trend for the last six months</title>
                {[0, 0.5, 1].map((fraction) => {
                  const y = 190 - fraction * 150;
                  return (
                    <g key={fraction}>
                      <line x1="52" x2="612" y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="4 5" />
                      <text x="44" y={y + 4} textAnchor="end" fill="#94a3b8" fontSize="10">
                        {COMPACT_CURRENCY.format(chartMaxRevenue * fraction)}
                      </text>
                    </g>
                  );
                })}
                <polygon points={revenueArea} fill="url(#revenueFill)" />
                <defs>
                  <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0.01" />
                  </linearGradient>
                </defs>
                <polyline points={revenueLine} fill="none" stroke="#ea580c" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                {chartPoints.map((point) => (
                  <g key={point.key}>
                    <circle cx={point.x} cy={point.y} r="4" fill="#fff" stroke="#ea580c" strokeWidth="2.5">
                      <title>{`${point.label}: ${formatCurrency(point.revenue)}`}</title>
                    </circle>
                    <text x={point.x} y="218" textAnchor="middle" fill="#64748b" fontSize="11">
                      {point.label}
                    </text>
                  </g>
                ))}
              </svg>
              <p className="mt-1 text-center text-[11px] text-slate-400">Monthly revenue is based on sale date and paid status.</p>
            </div>
          ) : (
            <div className="flex h-56 items-center justify-center rounded-xl bg-slate-50 px-6 text-center text-sm text-slate-500">
              Record paid sales to see your monthly revenue trend.
            </div>
          )}
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h3 className="font-bold text-slate-900">Payment Status</h3>
            <p className="mt-1 text-xs text-slate-500">Sales records by current payment status</p>
          </div>
          {loading ? (
            <div className="flex h-56 items-center justify-center text-sm text-slate-400">Loading analytics...</div>
          ) : totalStatusCount > 0 ? (
            <div className="space-y-5 pt-1">
              <div
                role="img"
                aria-label={`Payment status breakdown: ${STATUSES.map((status) => `${status}: ${analytics.statusCounts[status]}`).join(", ")}`}
                className="flex h-5 overflow-hidden rounded-full bg-slate-100"
              >
                {STATUSES.map((status) => analytics.statusCounts[status] > 0 && (
                  <span
                    key={status}
                    title={`${status}: ${analytics.statusCounts[status]}`}
                    style={{
                      width: `${(analytics.statusCounts[status] / totalStatusCount) * 100}%`,
                      backgroundColor: STATUS_COLORS[status],
                    }}
                  />
                ))}
              </div>
              <ul className="space-y-3">
                {STATUSES.map((status) => (
                  <li key={status} className="flex items-center justify-between gap-4 text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[status] }} />
                      {status}
                    </span>
                    <span className="font-bold text-slate-900">
                      {analytics.statusCounts[status]}
                      <span className="ml-1 font-normal text-slate-400">
                        ({Math.round((analytics.statusCounts[status] / totalStatusCount) * 100)}%)
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-slate-100 pt-3 text-xs text-slate-500">
                {totalStatusCount} total sale records
              </p>
            </div>
          ) : (
            <div className="flex h-56 items-center justify-center rounded-xl bg-slate-50 px-6 text-center text-sm text-slate-500">
              Payment status insights will appear after you record sales.
            </div>
          )}
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 sm:p-6">
          <div className="mb-5">
            <h3 className="font-bold text-slate-900">Top Customers</h3>
            <p className="mt-1 text-xs text-slate-500">Ranked by paid revenue</p>
          </div>
          {loading ? (
            <div className="flex h-32 items-center justify-center text-sm text-slate-400">Loading analytics...</div>
          ) : analytics.topCustomers.length > 0 ? (
            <ol className="space-y-4">
              {analytics.topCustomers.map((customer, index) => (
                <li key={customer.name} className="grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-xs font-black text-orange-700">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="mb-1.5 flex justify-between gap-3 text-xs">
                      <span className="truncate font-semibold text-slate-700">{customer.name}</span>
                      <span className="shrink-0 font-bold text-slate-900">{formatCurrency(customer.revenue)}</span>
                    </div>
                    <div
                      className="h-2 overflow-hidden rounded-full bg-slate-100"
                      role="img"
                      aria-label={`${customer.name}: ${formatCurrency(customer.revenue)} paid revenue`}
                    >
                      <div
                        className="h-full rounded-full bg-orange-500"
                        style={{ width: `${(customer.revenue / topCustomerMax) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400">#{index + 1}</span>
                </li>
              ))}
            </ol>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-xl bg-slate-50 px-6 text-center text-sm text-slate-500">
              Top customer analytics will appear after paid sales are recorded.
            </div>
          )}
        </article>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Sales Register</h3>
            <p className="mt-0.5 text-xs text-slate-500">Amounts are recorded in Indian rupees (INR).</p>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            Status
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as "All" | SaleStatus)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-orange-500"
            >
              <option>All</option>
              {STATUSES.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 p-16 text-sm text-slate-500">
            <Loader2 className="animate-spin text-orange-600" size={20} /> Loading sales...
          </div>
        ) : filteredSales.length === 0 ? (
          <div className="p-16 text-center">
            <ReceiptText className="mx-auto mb-3 text-slate-300" size={36} />
            <p className="font-semibold text-slate-700">No sales recorded</p>
            <p className="mt-1 text-sm text-slate-500">Record a sale to start tracking revenue and payments.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-4">Reference</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Sale Date</th>
                  <th className="px-5 py-4 text-right">Amount</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Notes</th>
                  <th className="px-5 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-slate-50/70">
                    <td className="whitespace-nowrap px-5 py-4 font-mono text-xs font-bold text-slate-900">
                      {sale.reference_no}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-800">{sale.customer_name}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={14} /> {new Date(`${sale.sold_at}T00:00:00`).toLocaleDateString("en-IN")}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-right font-bold text-slate-900">
                      {formatCurrency(sale.amount)}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        aria-label={`Status for ${sale.reference_no}`}
                        value={sale.status}
                        onChange={(event) => void changeStatus(sale, event.target.value as SaleStatus)}
                        className={`rounded-full border-0 px-3 py-1.5 text-xs font-bold outline-none ${statusClass(sale.status)}`}
                      >
                        {STATUSES.map((status) => <option key={status}>{status}</option>)}
                      </select>
                    </td>
                    <td className="max-w-[200px] truncate px-5 py-4 text-xs text-slate-500">{sale.notes || "—"}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => void deleteRecord(sale)}
                        aria-label={`Delete ${sale.reference_no}`}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {modalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4">
          <form onSubmit={handleCreate} className="my-8 w-full max-w-xl space-y-5 rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">Record a Sale</h3>
                <p className="mt-1 text-sm text-slate-500">Add an invoice or order to the sales register.</p>
              </div>
              <button type="button" onClick={() => setModalOpen(false)} aria-label="Close form">
                <X size={20} />
              </button>
            </div>

            {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold text-slate-600">
                Invoice / Order Reference *
                <input required maxLength={64} value={form.reference_no} onChange={(event) => setForm({ ...form, reference_no: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" />
              </label>
              <label className="text-xs font-bold text-slate-600">
                Customer *
                <input required maxLength={200} value={form.customer_name} onChange={(event) => setForm({ ...form, customer_name: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" />
              </label>
              <label className="text-xs font-bold text-slate-600">
                Amount (INR) *
                <input required type="number" min="0.01" max="999999999.99" step="0.01" value={form.amount || ""} onChange={(event) => setForm({ ...form, amount: Number(event.target.value) })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" />
              </label>
              <label className="text-xs font-bold text-slate-600">
                Sale Date *
                <input required type="date" value={form.sold_at} onChange={(event) => setForm({ ...form, sold_at: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" />
              </label>
              <label className="text-xs font-bold text-slate-600 sm:col-span-2">
                Payment Status *
                <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as SaleStatus })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal">
                  {STATUSES.map((status) => <option key={status}>{status}</option>)}
                </select>
              </label>
              <label className="text-xs font-bold text-slate-600 sm:col-span-2">
                Notes
                <textarea maxLength={2000} rows={3} value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-normal" />
              </label>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button type="button" onClick={() => setModalOpen(false)} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">
                Cancel
              </button>
              <button disabled={saving} type="submit" className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-500 disabled:opacity-60">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                Save Sale
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
