
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  RotateCcw,
  CheckCircle2,
  Clock3,
  XCircle,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  CalendarDays,
  CreditCard,
  AlertCircle,
} from "lucide-react";

type RefundStatus = "Completed" | "Pending" | "Failed";

type Refund = {
  id: string;
  orderId: string;
  paymentId: string;
  customer: string;
  email: string;
  amount: number;
  method: string;
  reason: string;
  status: RefundStatus;
  requestedAt: string;
  processedAt: string | null;
  transactionId: string;
};

const initialRefunds: Refund[] = [
  {
    id: "REF-1001",
    orderId: "ORD-2026-1005",
    paymentId: "PAY-1005",
    customer: "Rafi Hasan",
    email: "rafi@example.com",
    amount: 2750,
    method: "bKash",
    reason: "Customer cancelled the order",
    status: "Completed",
    requestedAt: "Oct 26, 2026",
    processedAt: "Oct 27, 2026",
    transactionId: "RF-BKX8R51P4",
  },
  {
    id: "REF-1002",
    orderId: "ORD-2026-1012",
    paymentId: "PAY-1012",
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    amount: 1850,
    method: "SSLCommerz",
    reason: "Wrong product received",
    status: "Pending",
    requestedAt: "Oct 28, 2026",
    processedAt: null,
    transactionId: "RF-SSLCZ-1012",
  },
  {
    id: "REF-1003",
    orderId: "ORD-2026-0998",
    paymentId: "PAY-0998",
    customer: "Sabbir Hossain",
    email: "sabbir@example.com",
    amount: 1200,
    method: "bKash",
    reason: "Damaged item",
    status: "Failed",
    requestedAt: "Oct 24, 2026",
    processedAt: null,
    transactionId: "RF-BKX-0998",
  },
  {
    id: "REF-1004",
    orderId: "ORD-2026-0992",
    paymentId: "PAY-0992",
    customer: "Farhana Islam",
    email: "farhana@example.com",
    amount: 950,
    method: "SSLCommerz",
    reason: "Duplicate order",
    status: "Completed",
    requestedAt: "Oct 22, 2026",
    processedAt: "Oct 23, 2026",
    transactionId: "RF-SSLCZ-0992",
  },
  {
    id: "REF-1005",
    orderId: "ORD-2026-0986",
    paymentId: "PAY-0986",
    customer: "Mehedi Hasan",
    email: "mehedi@example.com",
    amount: 1600,
    method: "bKash",
    reason: "Item unavailable",
    status: "Pending",
    requestedAt: "Oct 21, 2026",
    processedAt: null,
    transactionId: "RF-BKX-0986",
  },
  {
    id: "REF-1006",
    orderId: "ORD-2026-0975",
    paymentId: "PAY-0975",
    customer: "Tanvir Ahmed",
    email: "tanvir@example.com",
    amount: 800,
    method: "SSLCommerz",
    reason: "Incorrect size",
    status: "Completed",
    requestedAt: "Oct 18, 2026",
    processedAt: "Oct 19, 2026",
    transactionId: "RF-SSLCZ-0975",
  },
];

const primary = "#92003A";

const statusStyles: Record<RefundStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-700",
};

const money = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);

function StatusBadge({ status }: { status: RefundStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default function RefundHistoryPage() {
  const [refunds, setRefunds] = useState(initialRefunds);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedRefund, setSelectedRefund] = useState<Refund | null>(null);
  const [actionRefund, setActionRefund] = useState<Refund | null>(null);
  const [actionType, setActionType] = useState<"complete" | "fail" | null>(
    null,
  );

  const pageSize = 5;

  const stats = useMemo(() => {
    const completed = refunds.filter((r) => r.status === "Completed");
    const pending = refunds.filter((r) => r.status === "Pending");
    const failed = refunds.filter((r) => r.status === "Failed");

    return {
      total: refunds.length,
      completedAmount: completed.reduce((sum, r) => sum + r.amount, 0),
      pendingAmount: pending.reduce((sum, r) => sum + r.amount, 0),
      completedCount: completed.length,
      pendingCount: pending.length,
      failedCount: failed.length,
    };
  }, [refunds]);

  const filteredRefunds = useMemo(() => {
    const query = search.trim().toLowerCase();

    return refunds.filter((refund) => {
      const matchesSearch =
        !query ||
        refund.id.toLowerCase().includes(query) ||
        refund.orderId.toLowerCase().includes(query) ||
        refund.paymentId.toLowerCase().includes(query) ||
        refund.customer.toLowerCase().includes(query) ||
        refund.email.toLowerCase().includes(query) ||
        refund.transactionId.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || refund.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" || refund.method === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [refunds, search, statusFilter, methodFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRefunds.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedRefunds = filteredRefunds.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function updateRefundStatus(id: string, status: RefundStatus) {
    setRefunds((current) =>
      current.map((refund) =>
        refund.id === id
          ? {
              ...refund,
              status,
              processedAt:
                status === "Pending"
                  ? null
                  : new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    }),
            }
          : refund,
      ),
    );

    setSelectedRefund((current) =>
      current?.id === id
        ? {
            ...current,
            status,
            processedAt:
              status === "Pending"
                ? null
                : new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }),
          }
        : current,
    );

    setActionRefund(null);
    setActionType(null);
  }

  function exportRefunds() {
    const headers = [
      "Refund ID",
      "Order ID",
      "Payment ID",
      "Customer",
      "Email",
      "Amount BDT",
      "Payment Method",
      "Reason",
      "Status",
      "Requested At",
      "Processed At",
      "Transaction ID",
    ];

    const escapeCsv = (value: string | number | null) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filteredRefunds.map((refund) =>
      [
        refund.id,
        refund.orderId,
        refund.paymentId,
        refund.customer,
        refund.email,
        refund.amount,
        refund.method,
        refund.reason,
        refund.status,
        refund.requestedAt,
        refund.processedAt,
        refund.transactionId,
      ]
        .map(escapeCsv)
        .join(","),
    );

    const csv = [headers.map(escapeCsv).join(","), ...rows].join("\n");
    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "refund-history.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-[#F8F8FA] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-7">
        {/* Page header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-800">Refund History</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Refund History
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Track refund requests, transaction outcomes and processed amounts.
            </p>
          </div>

          <button
            onClick={exportRefunds}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </header>

        {/* Summary cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Refunds",
              value: stats.total,
              detail: "All recorded requests",
              icon: RotateCcw,
              iconClass: "bg-[#F8E8EF] text-[#92003A]",
            },
            {
              label: "Refunded Amount",
              value: money(stats.completedAmount),
              detail: `${stats.completedCount} completed refunds`,
              icon: CheckCircle2,
              iconClass: "bg-emerald-50 text-emerald-600",
            },
            {
              label: "Pending Amount",
              value: money(stats.pendingAmount),
              detail: `${stats.pendingCount} awaiting processing`,
              icon: Clock3,
              iconClass: "bg-amber-50 text-amber-600",
            },
            {
              label: "Failed Refunds",
              value: stats.failedCount,
              detail: "Require investigation",
              icon: XCircle,
              iconClass: "bg-red-50 text-red-600",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className="rounded-xl border border-gray-200/80 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="mt-3 break-words text-2xl font-bold tracking-tight text-gray-950">
                      {item.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconClass}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-500">{item.detail}</p>
              </article>
            );
          })}
        </section>

        {/* Refund table */}
        <section className="overflow-hidden rounded-xl border border-gray-200/80 bg-white">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-semibold text-gray-950">All refunds</h2>
              <p className="mt-1 text-sm text-gray-500">
                {filteredRefunds.length} records found
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search refund..."
                  className="w-full rounded-lg border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#92003A] focus:ring-2 focus:ring-[#92003A]/10"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#92003A]"
              >
                <option value="All">All statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>

              <select
                value={methodFilter}
                onChange={(event) => {
                  setMethodFilter(event.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#92003A]"
              >
                <option value="All">All payment methods</option>
                <option value="bKash">bKash</option>
                <option value="SSLCommerz">SSLCommerz</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead className="bg-gray-50/80">
                <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-4">Refund / Order</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Reason</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Requested</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedRefunds.map((refund) => (
                  <tr
                    key={refund.id}
                    className="transition hover:bg-gray-50/60"
                  >
                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                        {refund.id}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {refund.orderId}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {refund.paymentId}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-medium text-gray-800">
                        {refund.customer}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {refund.email}
                      </p>
                    </td>

                    <td className="max-w-52 px-5 py-4 text-sm text-gray-600">
                      {refund.reason}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-900">
                      {money(refund.amount)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                      {refund.requestedAt}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={refund.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedRefund(refund)}
                          title="View refund"
                          aria-label="View refund"
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                          <Eye size={17} />
                        </button>

                        {refund.status === "Pending" && (
                          <>
                            <button
                              onClick={() => {
                                setActionRefund(refund);
                                setActionType("complete");
                              }}
                              title="Mark completed (demo only)"
                              aria-label="Mark refund completed"
                              className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50"
                            >
                              <CheckCircle2 size={17} />
                            </button>

                            <button
                              onClick={() => {
                                setActionRefund(refund);
                                setActionType("fail");
                              }}
                              title="Mark failed (demo only)"
                              aria-label="Mark refund failed"
                              className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                            >
                              <XCircle size={17} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedRefunds.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <RotateCcw className="mx-auto text-gray-300" size={30} />
                      <p className="mt-3 font-medium text-gray-700">
                        No refund records found
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {filteredRefunds.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}{" "}
              – {Math.min(currentPage * pageSize, filteredRefunds.length)} of{" "}
              {filteredRefunds.length} refunds
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                aria-label="Previous page"
                className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
              </button>

              <span className="min-w-20 text-center text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setPage((value) => Math.min(totalPages, value + 1))
                }
                aria-label="Next page"
                className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Refund details modal */}
      {selectedRefund && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedRefund(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="refund-details-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Refund details
                </p>
                <h2
                  id="refund-details-title"
                  className="mt-1 text-xl font-bold text-gray-950"
                >
                  {selectedRefund.id}
                </h2>
              </div>

              <button
                onClick={() => setSelectedRefund(null)}
                aria-label="Close refund details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-[#FFF8FB] p-5 text-center">
              <p className="text-sm text-gray-500">Refund amount</p>
              <p className="mt-2 text-3xl font-bold text-[#92003A]">
                {money(selectedRefund.amount)}
              </p>
              <div className="mt-3">
                <StatusBadge status={selectedRefund.status} />
              </div>
            </div>

            <div className="mt-5 divide-y divide-gray-100">
              {[
                ["Order ID", selectedRefund.orderId],
                ["Payment ID", selectedRefund.paymentId],
                ["Customer", selectedRefund.customer],
                ["Email", selectedRefund.email],
                ["Payment method", selectedRefund.method],
                ["Reason", selectedRefund.reason],
                ["Transaction ID", selectedRefund.transactionId],
                ["Requested date", selectedRefund.requestedAt],
                [
                  "Processed date",
                  selectedRefund.processedAt ?? "Not processed",
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 py-3 text-sm"
                >
                  <span className="text-gray-500">{label}</span>
                  <span className="max-w-[65%] break-words text-right font-medium text-gray-900">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedRefund(null)}
              className="mt-5 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Demo status confirmation */}
      {actionRefund && actionType && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onClick={() => {
            setActionRefund(null);
            setActionType(null);
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="refund-action-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8E8EF] text-[#92003A]">
              {actionType === "complete" ? (
                <CheckCircle2 size={22} />
              ) : (
                <XCircle size={22} />
              )}
            </div>

            <h2
              id="refund-action-title"
              className="mt-4 text-lg font-bold text-gray-950"
            >
              {actionType === "complete"
                ? "Mark refund as completed?"
                : "Mark refund as failed?"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {actionRefund.id} · {money(actionRefund.amount)}
            </p>

            <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
              Demo action only. In production, verify the payment gateway
              response before changing a refund status.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => {
                  setActionRefund(null);
                  setActionType(null);
                }}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  updateRefundStatus(
                    actionRefund.id,
                    actionType === "complete" ? "Completed" : "Failed",
                  )
                }
                style={{ backgroundColor: primary }}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Confirm Demo Action
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
