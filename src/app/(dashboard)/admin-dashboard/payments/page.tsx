
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  CreditCard,
  CheckCircle2,
  Clock3,
  RotateCcw,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";

type PaymentStatus = "Completed" | "Pending" | "Failed" | "Refunded";

type PaymentMethod = "bKash" | "SSLCommerz" | "Cash on Delivery";

type Payment = {
  id: string;
  orderId: string;
  customer: string;
  email: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  date: string;
  gatewayFee: number;
};

const initialPayments: Payment[] = [
  {
    id: "PAY-1001",
    orderId: "ORD-2026-1001",
    customer: "Tanvir Ahmed",
    email: "tanvir@example.com",
    amount: 2450,
    method: "bKash",
    status: "Completed",
    transactionId: "BKX9A72K1",
    date: "Oct 28, 2026 · 10:42 AM",
    gatewayFee: 36.75,
  },
  {
    id: "PAY-1002",
    orderId: "ORD-2026-1002",
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    amount: 1850,
    method: "Cash on Delivery",
    status: "Pending",
    transactionId: "COD-1002",
    date: "Oct 28, 2026 · 09:18 AM",
    gatewayFee: 0,
  },
  {
    id: "PAY-1003",
    orderId: "ORD-2026-1003",
    customer: "Sabbir Hossain",
    email: "sabbir@example.com",
    amount: 3200,
    method: "SSLCommerz",
    status: "Completed",
    transactionId: "SSLCZ-884291",
    date: "Oct 27, 2026 · 04:35 PM",
    gatewayFee: 48,
  },
  {
    id: "PAY-1004",
    orderId: "ORD-2026-1004",
    customer: "Farhana Islam",
    email: "farhana@example.com",
    amount: 1200,
    method: "SSLCommerz",
    status: "Failed",
    transactionId: "SSLCZ-884305",
    date: "Oct 27, 2026 · 01:12 PM",
    gatewayFee: 0,
  },
  {
    id: "PAY-1005",
    orderId: "ORD-2026-1005",
    customer: "Rafi Hasan",
    email: "rafi@example.com",
    amount: 2750,
    method: "bKash",
    status: "Refunded",
    transactionId: "BKX8R51P4",
    date: "Oct 26, 2026 · 11:20 AM",
    gatewayFee: 0,
  },
  {
    id: "PAY-1006",
    orderId: "ORD-2026-1006",
    customer: "Mehedi Hasan",
    email: "mehedi@example.com",
    amount: 2100,
    method: "Cash on Delivery",
    status: "Pending",
    transactionId: "COD-1006",
    date: "Oct 25, 2026 · 02:05 PM",
    gatewayFee: 0,
  },
];

const primary = "#92003A";

const statusStyles: Record<PaymentStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-700",
  Refunded: "bg-violet-50 text-violet-700",
};

const methodStyles: Record<PaymentMethod, string> = {
  bKash: "bg-pink-50 text-pink-700",
  SSLCommerz: "bg-blue-50 text-blue-700",
  "Cash on Delivery": "bg-gray-100 text-gray-700",
};

const money = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(amount);

function StatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function MethodBadge({ method }: { method: PaymentMethod }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${methodStyles[method]}`}
    >
      {method}
    </span>
  );
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [refundTarget, setRefundTarget] = useState<Payment | null>(null);
  const [refundNote, setRefundNote] = useState("");

  const pageSize = 5;

  const stats = useMemo(() => {
    const completed = payments.filter((p) => p.status === "Completed");
    const pending = payments.filter((p) => p.status === "Pending");
    const refunded = payments.filter((p) => p.status === "Refunded");
    const failed = payments.filter((p) => p.status === "Failed");

    return {
      total: payments.length,
      collected: completed.reduce((sum, p) => sum + p.amount, 0),
      pendingAmount: pending.reduce((sum, p) => sum + p.amount, 0),
      refundedAmount: refunded.reduce((sum, p) => sum + p.amount, 0),
      failedCount: failed.length,
      completedCount: completed.length,
    };
  }, [payments]);

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch =
        !query ||
        payment.id.toLowerCase().includes(query) ||
        payment.orderId.toLowerCase().includes(query) ||
        payment.customer.toLowerCase().includes(query) ||
        payment.email.toLowerCase().includes(query) ||
        payment.transactionId.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || payment.status === statusFilter;

      const matchesMethod =
        methodFilter === "All" || payment.method === methodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });
  }, [payments, search, statusFilter, methodFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function markAsCompleted(id: string) {
    setPayments((current) =>
      current.map((payment) =>
        payment.id === id ? { ...payment, status: "Completed" } : payment,
      ),
    );
    setSelectedPayment((current) =>
      current?.id === id ? { ...current, status: "Completed" } : current,
    );
  }

  function confirmRefund() {
    if (!refundTarget) return;

    // Demo only: a real refund must be processed and verified by the payment gateway.
    setPayments((current) =>
      current.map((payment) =>
        payment.id === refundTarget.id
          ? { ...payment, status: "Refunded" }
          : payment,
      ),
    );

    setSelectedPayment((current) =>
      current?.id === refundTarget.id
        ? { ...current, status: "Refunded" }
        : current,
    );

    setRefundTarget(null);
    setRefundNote("");
  }

  function exportPayments() {
    const headers = [
      "Payment ID",
      "Order ID",
      "Customer",
      "Email",
      "Amount BDT",
      "Method",
      "Status",
      "Transaction ID",
      "Date",
      "Gateway Fee BDT",
    ];

    const escapeCsv = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const rows = filteredPayments.map((payment) =>
      [
        payment.id,
        payment.orderId,
        payment.customer,
        payment.email,
        payment.amount,
        payment.method,
        payment.status,
        payment.transactionId,
        payment.date,
        payment.gatewayFee,
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
    link.download = "payments.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-[#F8F8FA] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-7">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-800">Payments</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Payments
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Track transactions, monitor payment statuses and review refunds.
            </p>
          </div>

          <button
            onClick={exportPayments}
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
              label: "Collected Payments",
              value: money(stats.collected),
              detail: `${stats.completedCount} completed transactions`,
              icon: Wallet,
              iconClass: "bg-[#F8E8EF] text-[#92003A]",
            },
            {
              label: "Pending Amount",
              value: money(stats.pendingAmount),
              detail: "Awaiting confirmation",
              icon: Clock3,
              iconClass: "bg-amber-50 text-amber-600",
            },
            {
              label: "Refunded Amount",
              value: money(stats.refundedAmount),
              detail: "Marked as refunded",
              icon: RotateCcw,
              iconClass: "bg-violet-50 text-violet-600",
            },
            {
              label: "Failed Payments",
              value: stats.failedCount,
              detail: "Transactions requiring review",
              icon: AlertCircle,
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

        {/* Transaction table */}
        <section className="overflow-hidden rounded-xl border border-gray-200/80 bg-white">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-semibold text-gray-950">
                Transaction history
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {filteredPayments.length} transactions found
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
                  placeholder="Search transaction..."
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
                <option value="Refunded">Refunded</option>
              </select>

              <select
                value={methodFilter}
                onChange={(event) => {
                  setMethodFilter(event.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#92003A]"
              >
                <option value="All">All methods</option>
                <option value="bKash">bKash</option>
                <option value="SSLCommerz">SSLCommerz</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead className="bg-gray-50/80">
                <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-4">Transaction</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Method</th>
                  <th className="px-5 py-4">Amount</th>
                  <th className="px-5 py-4">Gateway Fee</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="transition hover:bg-gray-50/60"
                  >
                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                        {payment.id}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {payment.orderId}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        TXN: {payment.transactionId}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-medium text-gray-800">
                        {payment.customer}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {payment.email}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <MethodBadge method={payment.method} />
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-900">
                      {money(payment.amount)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                      {money(payment.gatewayFee)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={payment.status} />
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                      {payment.date}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          title="View transaction"
                          aria-label="View transaction"
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                          <Eye size={17} />
                        </button>

                        {payment.status === "Pending" &&
                          payment.method !== "Cash on Delivery" && (
                            <button
                              onClick={() => markAsCompleted(payment.id)}
                              title="Mark completed (demo only)"
                              aria-label="Mark completed"
                              className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50"
                            >
                              <CheckCircle2 size={17} />
                            </button>
                          )}

                        {payment.status === "Completed" && (
                          <button
                            onClick={() => {
                              setRefundTarget(payment);
                              setRefundNote("");
                            }}
                            title="Request refund"
                            aria-label="Request refund"
                            className="rounded-lg p-2 text-violet-600 transition hover:bg-violet-50"
                          >
                            <RotateCcw size={17} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedPayments.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <CreditCard className="mx-auto text-gray-300" size={30} />
                      <p className="mt-3 font-medium text-gray-700">
                        No transactions found
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
              {filteredPayments.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}{" "}
              – {Math.min(currentPage * pageSize, filteredPayments.length)} of{" "}
              {filteredPayments.length} transactions
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

      {/* Transaction details modal */}
      {selectedPayment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedPayment(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-dialog-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Payment details
                </p>
                <h2
                  id="payment-dialog-title"
                  className="mt-1 text-xl font-bold text-gray-950"
                >
                  {selectedPayment.id}
                </h2>
              </div>

              <button
                onClick={() => setSelectedPayment(null)}
                aria-label="Close payment details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-[#FFF8FB] p-5 text-center">
              <p className="text-sm text-gray-500">Transaction amount</p>
              <p className="mt-2 text-3xl font-bold text-[#92003A]">
                {money(selectedPayment.amount)}
              </p>
              <div className="mt-3">
                <StatusBadge status={selectedPayment.status} />
              </div>
            </div>

            <div className="mt-5 divide-y divide-gray-100">
              {[
                ["Order ID", selectedPayment.orderId],
                ["Customer", selectedPayment.customer],
                ["Email", selectedPayment.email],
                ["Payment method", selectedPayment.method],
                ["Transaction ID", selectedPayment.transactionId],
                ["Gateway fee", money(selectedPayment.gatewayFee)],
                ["Date", selectedPayment.date],
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
              onClick={() => setSelectedPayment(null)}
              className="mt-5 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Refund confirmation */}
      {refundTarget && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setRefundTarget(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="refund-dialog-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <RotateCcw size={22} />
            </div>

            <h2
              id="refund-dialog-title"
              className="mt-4 text-lg font-bold text-gray-950"
            >
              Mark payment as refunded?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              {refundTarget.id} · {money(refundTarget.amount)}
            </p>

            <label
              htmlFor="refund-note"
              className="mt-5 block text-sm font-medium text-gray-700"
            >
              Refund note (optional)
            </label>

            <textarea
              id="refund-note"
              value={refundNote}
              onChange={(event) => setRefundNote(event.target.value)}
              rows={3}
              placeholder="Reason for refund..."
              className="mt-2 w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#92003A] focus:ring-2 focus:ring-[#92003A]/10"
            />

            <p className="mt-3 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
              Demo only: this changes the displayed status. It does not send
              money back through bKash or SSLCommerz.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setRefundTarget(null)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmRefund}
                className="rounded-lg bg-[#92003A] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Confirm Demo Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
