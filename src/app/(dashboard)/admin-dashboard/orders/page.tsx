
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  X,
  MapPin,
  Phone,
  Package,
  CreditCard,
  CalendarDays,
} from "lucide-react";

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type PaymentStatus = "Paid" | "Unpaid" | "Refunded";

type Order = {
  id: string;
  customer: string;
  email: string;
  phone: string;
  date: string;
  items: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  address: string;
  products: { name: string; quantity: number; price: number }[];
};

const initialOrders: Order[] = [
  {
    id: "ORD-2026-1001",
    customer: "Tanvir Ahmed",
    email: "tanvir@example.com",
    phone: "01712345678",
    date: "Oct 28, 2026",
    items: 2,
    total: 2450,
    paymentMethod: "bKash",
    paymentStatus: "Paid",
    status: "Processing",
    address: "House 12, Road 4, Uttara, Dhaka",
    products: [
      { name: "Premium Cotton T-Shirt", quantity: 1, price: 850 },
      { name: "Classic Sneakers", quantity: 1, price: 1600 },
    ],
  },
  {
    id: "ORD-2026-1002",
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    phone: "01812345678",
    date: "Oct 28, 2026",
    items: 1,
    total: 1850,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Unpaid",
    status: "Pending",
    address: "Block C, Bashundhara R/A, Dhaka",
    products: [{ name: "Minimal Leather Watch", quantity: 1, price: 1850 }],
  },
  {
    id: "ORD-2026-1003",
    customer: "Sabbir Hossain",
    email: "sabbir@example.com",
    phone: "01912345678",
    date: "Oct 27, 2026",
    items: 3,
    total: 3200,
    paymentMethod: "SSLCommerz",
    paymentStatus: "Paid",
    status: "Shipped",
    address: "Zindabazar, Sylhet",
    products: [
      { name: "Everyday Backpack", quantity: 1, price: 1500 },
      { name: "Cotton T-Shirt", quantity: 2, price: 850 },
    ],
  },
  {
    id: "ORD-2026-1004",
    customer: "Farhana Islam",
    email: "farhana@example.com",
    phone: "01612345678",
    date: "Oct 26, 2026",
    items: 1,
    total: 1200,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Unpaid",
    status: "Delivered",
    address: "GEC Circle, Chattogram",
    products: [{ name: "Wireless Headphones", quantity: 1, price: 1200 }],
  },
  {
    id: "ORD-2026-1005",
    customer: "Rafi Hasan",
    email: "rafi@example.com",
    phone: "01512345678",
    date: "Oct 25, 2026",
    items: 2,
    total: 2750,
    paymentMethod: "bKash",
    paymentStatus: "Refunded",
    status: "Cancelled",
    address: "Station Road, Mymensingh",
    products: [
      { name: "Classic Sneakers", quantity: 1, price: 1600 },
      { name: "Premium Cotton T-Shirt", quantity: 1, price: 1150 },
    ],
  },
  {
    id: "ORD-2026-1006",
    customer: "Mehedi Hasan",
    email: "mehedi@example.com",
    phone: "01312345678",
    date: "Oct 24, 2026",
    items: 2,
    total: 2100,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Unpaid",
    status: "Pending",
    address: "College Road, Tongi, Gazipur",
    products: [
      { name: "Everyday Backpack", quantity: 1, price: 1500 },
      { name: "Cotton Cap", quantity: 1, price: 600 },
    ],
  },
];

const primary = "#92003A";

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-50 text-amber-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-violet-50 text-violet-700",
  Delivered: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-700",
};

const paymentStyles: Record<PaymentStatus, string> = {
  Paid: "bg-emerald-50 text-emerald-700",
  Unpaid: "bg-amber-50 text-amber-700",
  Refunded: "bg-gray-100 text-gray-600",
};

const orderStatuses: OrderStatus[] = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function PaymentBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${paymentStyles[status]}`}
    >
      {status}
    </span>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusOrder, setStatusOrder] = useState<Order | null>(null);
  const [nextStatus, setNextStatus] = useState<OrderStatus>("Pending");
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  const pageSize = 5;

  const stats = useMemo(() => {
    const activeOrders = orders.filter((order) => order.status !== "Cancelled");

    return {
      total: orders.length,
      pending: orders.filter((order) => order.status === "Pending").length,
      processing: orders.filter((order) => order.status === "Processing")
        .length,
      delivered: orders.filter((order) => order.status === "Delivered").length,
      revenue: activeOrders
        .filter((order) => order.paymentStatus === "Paid")
        .reduce((sum, order) => sum + order.total, 0),
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query) ||
        order.phone.includes(query);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All" || order.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  function changeStatus(id: string, status: OrderStatus) {
    setOrders((current) =>
      current.map((order) => (order.id === id ? { ...order, status } : order)),
    );

    setSelectedOrder((current) =>
      current?.id === id ? { ...current, status } : current,
    );

    setStatusOrder(null);
  }

  function exportOrders() {
    const headers = [
      "Order ID",
      "Customer",
      "Email",
      "Phone",
      "Date",
      "Items",
      "Total BDT",
      "Payment Method",
      "Payment Status",
      "Order Status",
      "Address",
    ];

    const escapeCsv = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const rows = filteredOrders.map((order) =>
      [
        order.id,
        order.customer,
        order.email,
        order.phone,
        order.date,
        order.items,
        order.total,
        order.paymentMethod,
        order.paymentStatus,
        order.status,
        order.address,
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
    link.download = "orders.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function openStatusDialog(order: Order) {
    setStatusOrder(order);
    setNextStatus(order.status);
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
              <span className="text-gray-800">Orders</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
              Orders
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Track orders, update fulfillment status and manage customer
              purchases.
            </p>
          </div>

          <button
            onClick={exportOrders}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </header>

        {/* Summary */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Orders",
              value: stats.total,
              detail: "All recorded orders",
              icon: ShoppingBag,
              iconClass: "bg-[#F8E8EF] text-[#92003A]",
            },
            {
              label: "Pending Orders",
              value: stats.pending,
              detail: "Awaiting confirmation",
              icon: Clock3,
              iconClass: "bg-amber-50 text-amber-600",
            },
            {
              label: "Processing",
              value: stats.processing,
              detail: "Being prepared",
              icon: Package,
              iconClass: "bg-blue-50 text-blue-600",
            },
            {
              label: "Delivered",
              value: stats.delivered,
              detail: "Successfully delivered",
              icon: CheckCircle2,
              iconClass: "bg-emerald-50 text-emerald-600",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className="rounded-xl border border-gray-200/80 bg-white p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{item.label}</p>
                    <p className="mt-3 text-3xl font-bold tracking-tight text-gray-950">
                      {item.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.iconClass}`}
                  >
                    <Icon size={20} />
                  </div>
                </div>
                <p className="mt-4 text-xs text-gray-500">{item.detail}</p>
              </article>
            );
          })}
        </section>

        {/* Revenue note */}
        <div className="flex flex-col gap-2 rounded-xl border border-[#EAD0DB] bg-[#FFF8FB] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#92003A]">
              <CreditCard size={19} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Collected revenue
              </p>
              <p className="text-xs text-gray-500">
                Paid orders only, excluding cancelled orders
              </p>
            </div>
          </div>
          <p className="text-xl font-bold text-[#92003A]">
            {money(stats.revenue)}
          </p>
        </div>

        {/* Orders table */}
        <section className="overflow-hidden rounded-xl border border-gray-200/80 bg-white">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="font-semibold text-gray-950">All orders</h2>
              <p className="mt-1 text-sm text-gray-500">
                {filteredOrders.length} orders found
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="relative sm:col-span-1">
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
                  placeholder="Search order or customer..."
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
                <option value="All">All order statuses</option>
                {orderStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>

              <select
                value={paymentFilter}
                onChange={(event) => {
                  setPaymentFilter(event.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#92003A]"
              >
                <option value="All">All payment statuses</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead className="bg-gray-50/80">
                <tr className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  <th className="px-5 py-4">Order</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Items</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Payment</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-gray-50/60">
                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                        {order.id}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {order.paymentMethod}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="whitespace-nowrap text-sm font-medium text-gray-800">
                        {order.customer}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {order.email}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                      {order.date}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {order.items} {order.items === 1 ? "item" : "items"}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-900">
                      {money(order.total)}
                    </td>

                    <td className="px-5 py-4">
                      <PaymentBadge status={order.paymentStatus} />
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          title="View order"
                          aria-label="View order"
                          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => openStatusDialog(order)}
                          title="Update status"
                          aria-label="Update order status"
                          className="rounded-lg px-3 py-2 text-xs font-semibold text-[#92003A] transition hover:bg-[#F8E8EF]"
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedOrders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-16 text-center">
                      <ShoppingBag
                        className="mx-auto text-gray-300"
                        size={30}
                      />
                      <p className="mt-3 font-medium text-gray-700">
                        No orders found
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
              {filteredOrders.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}{" "}
              – {Math.min(currentPage * pageSize, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
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

      {/* Order details modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-dialog-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Order details
                </p>
                <h2
                  id="order-dialog-title"
                  className="mt-1 text-xl font-bold text-gray-950"
                >
                  {selectedOrder.id}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Placed on {selectedOrder.date}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <StatusBadge status={selectedOrder.status} />
              <PaymentBadge status={selectedOrder.paymentStatus} />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <ShoppingBag size={17} className="text-[#92003A]" />
                  Customer
                </div>
                <p className="mt-3 text-sm font-medium text-gray-800">
                  {selectedOrder.customer}
                </p>
                <p className="mt-1 break-all text-sm text-gray-500">
                  {selectedOrder.email}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <Phone size={14} />
                  {selectedOrder.phone}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <MapPin size={17} className="text-[#92003A]" />
                  Shipping address
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {selectedOrder.address}
                </p>
                <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <CalendarDays size={14} />
                  {selectedOrder.date}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-900">Ordered items</h3>

              <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-200">
                {selectedOrder.products.map((product, index) => (
                  <div
                    key={`${product.name}-${index}`}
                    className="flex items-center justify-between gap-4 p-4"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Qty: {product.quantity}
                      </p>
                    </div>
                    <p className="whitespace-nowrap text-sm font-semibold text-gray-900">
                      {money(product.price * product.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 rounded-xl bg-gray-50 p-4">
                <div className="flex justify-between gap-4 text-sm text-gray-600">
                  <span>Payment method</span>
                  <span className="text-right font-medium text-gray-800">
                    {selectedOrder.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-t border-gray-200 pt-3">
                  <span className="font-semibold text-gray-900">
                    Order total
                  </span>
                  <span className="text-lg font-bold text-[#92003A]">
                    {money(selectedOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => openStatusDialog(selectedOrder)}
                style={{ backgroundColor: primary }}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update status modal */}
      {statusOrder && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setStatusOrder(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="status-dialog-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="status-dialog-title"
                  className="text-lg font-bold text-gray-950"
                >
                  Update order status
                </h2>
                <p className="mt-1 text-sm text-gray-500">{statusOrder.id}</p>
              </div>

              <button
                onClick={() => setStatusOrder(null)}
                aria-label="Close status dialog"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={19} />
              </button>
            </div>

            <label
              htmlFor="order-status"
              className="mt-6 block text-sm font-medium text-gray-700"
            >
              New status
            </label>

            <select
              id="order-status"
              value={nextStatus}
              onChange={(event) =>
                setNextStatus(event.target.value as OrderStatus)
              }
              className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#92003A] focus:ring-2 focus:ring-[#92003A]/10"
            >
              {orderStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {nextStatus === "Cancelled" && (
              <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                Cancelling an order may require stock restoration and payment
                refund handling in the backend.
              </p>
            )}

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setStatusOrder(null)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={() => changeStatus(statusOrder.id, nextStatus)}
                style={{ backgroundColor: primary }}
                className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Save Status
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
