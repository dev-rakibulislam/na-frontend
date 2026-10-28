
"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Boxes,
  CalendarDays,
  ChevronDown,
  Clock3,
  CreditCard,
  Package,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "৳ 2,84,500",
    change: "+12.8%",
    positive: true,
    icon: Banknote,
    detail: "vs. previous period",
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    positive: true,
    icon: ShoppingCart,
    detail: "vs. previous period",
  },
  {
    title: "Total Customers",
    value: "864",
    change: "+5.4%",
    positive: true,
    icon: Users,
    detail: "vs. previous period",
  },
  {
    title: "Pending Orders",
    value: "36",
    change: "-3.1%",
    positive: false,
    icon: Package,
    detail: "need your attention",
  },
];

const salesData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 68 },
  { day: "Wed", value: 51 },
  { day: "Thu", value: 83 },
  { day: "Fri", value: 62 },
  { day: "Sat", value: 95 },
  { day: "Sun", value: 74 },
];

const orders = [
  {
    id: "#ORD-1058",
    customer: "Rahim Ahmed",
    initials: "RA",
    date: "28 Oct, 2026",
    amount: "৳ 2,450",
    status: "Processing",
  },
  {
    id: "#ORD-1057",
    customer: "Nusrat Jahan",
    initials: "NJ",
    date: "28 Oct, 2026",
    amount: "৳ 1,890",
    status: "Delivered",
  },
  {
    id: "#ORD-1056",
    customer: "Tanvir Hasan",
    initials: "TH",
    date: "27 Oct, 2026",
    amount: "৳ 3,200",
    status: "Pending",
  },
  {
    id: "#ORD-1055",
    customer: "Sadia Islam",
    initials: "SI",
    date: "27 Oct, 2026",
    amount: "৳ 980",
    status: "Cancelled",
  },
  {
    id: "#ORD-1054",
    customer: "Imran Hossain",
    initials: "IH",
    date: "26 Oct, 2026",
    amount: "৳ 4,500",
    status: "Delivered",
  },
];

const lowStock = [
  { name: "Classic Cotton T-Shirt", sku: "TSH-001", stock: 3 },
  { name: "Premium Casual Shirt", sku: "SHT-014", stock: 5 },
  { name: "Leather Wallet", sku: "WLT-008", stock: 2 },
];

const statusStyles: Record<string, string> = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Processing: "bg-blue-50 text-blue-700",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-700",
};

export default function AdminOverviewPage() {
  const [period, setPeriod] = useState("Last 7 days");

  return (
    <main className="min-h-screen bg-[#F7F7F8] p-4 text-gray-900 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-7">
        {/* Page header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-1 text-sm text-gray-500">Dashboard / Overview</p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-600">
              <CalendarDays size={17} />
              <select
                aria-label="Select reporting period"
                value={period}
                onChange={(event) => setPeriod(event.target.value)}
                className="cursor-pointer bg-transparent outline-none"
              >
                <option>Today</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This year</option>
              </select>
            </div>

            <button className="rounded-xl bg-[#92003A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#76002F]">
              + Add Product
            </button>
          </div>
        </header>

        {/* KPI cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.title}
                className="rounded-2xl border border-gray-200/80 bg-white p-5 transition hover:border-gray-300 hover:shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#92003A]/[0.08] text-[#92003A]">
                    <Icon size={20} />
                  </span>
                </div>

                <p className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                  {stat.value}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-1.5 py-1 font-semibold ${
                      stat.positive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {stat.positive ? (
                      <ArrowUpRight size={13} />
                    ) : (
                      <ArrowDownRight size={13} />
                    )}
                    {stat.change}
                  </span>
                  <span className="text-gray-400">{stat.detail}</span>
                </div>
              </article>
            );
          })}
        </section>

        {/* Chart + order status */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <article className="rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6 xl:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-bold">Sales Overview</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Revenue performance for {period.toLowerCase()}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="size-2.5 rounded-full bg-[#92003A]" />
                Revenue
              </div>
            </div>

            <div className="mt-8">
              <div className="flex h-56">
                <div className="flex flex-col justify-between pb-1 pr-3 text-xs text-gray-400">
                  <span>৳ 10k</span>
                  <span>৳ 7.5k</span>
                  <span>৳ 5k</span>
                  <span>৳ 2.5k</span>
                  <span>৳ 0</span>
                </div>

                <div className="relative flex-1">
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4].map((line) => (
                      <div
                        key={line}
                        className="border-t border-dashed border-gray-100"
                      />
                    ))}
                  </div>

                  <div className="absolute inset-0 flex items-end justify-around gap-2 px-1">
                    {salesData.map((item) => (
                      <div
                        key={item.day}
                        className="group relative flex h-full flex-1 flex-col items-center justify-end"
                      >
                        <div
                          className="w-full max-w-10 rounded-t-lg bg-[#92003A]/80 transition-all duration-200 group-hover:bg-[#92003A]"
                          style={{ height: `${item.value}%` }}
                          title={`${item.day}: ${item.value}%`}
                        />
                        <span className="absolute -bottom-6 text-xs text-gray-400">
                          {item.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
              <div>
                <p className="text-xs text-gray-500">Total revenue</p>
                <p className="mt-1 text-xl font-bold">৳ 2,84,500</p>
              </div>
              <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                <TrendingUp size={16} />
                12.8% growth
              </div>
            </div>
          </article>

          {/* Order status */}
          <article className="rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold">Order Status</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Current order breakdown
                </p>
              </div>
              <ShoppingBag className="text-[#92003A]" size={21} />
            </div>

            <div className="mt-7 flex items-center justify-center">
              <div
                className="relative flex size-44 items-center justify-center rounded-full"
                style={{
                  background:
                    "conic-gradient(#92003A 0% 42%, #16A34A 42% 72%, #F59E0B 72% 89%, #D1D5DB 89% 100%)",
                }}
              >
                <div className="flex size-28 flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-3xl font-bold">248</span>
                  <span className="text-xs text-gray-500">Total orders</span>
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {[
                { label: "Processing", value: 104, color: "bg-[#92003A]" },
                { label: "Delivered", value: 74, color: "bg-green-500" },
                { label: "Pending", value: 42, color: "bg-amber-400" },
                { label: "Cancelled", value: 28, color: "bg-gray-300" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className={`size-2.5 rounded-full ${item.color}`} />
                    <span className="text-gray-600">{item.label}</span>
                  </div>
                  <span className="font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* Recent orders */}
        <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
            <div>
              <h2 className="font-bold">Recent Orders</h2>
              <p className="mt-1 text-sm text-gray-500">
                Latest orders placed in your store
              </p>
            </div>
            <button className="inline-flex items-center gap-1 text-sm font-semibold text-[#92003A] hover:underline">
              View all <ArrowRight size={16} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-y border-gray-100 bg-gray-50/80 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-6 py-3.5 font-medium">Order ID</th>
                  <th className="px-6 py-3.5 font-medium">Customer</th>
                  <th className="px-6 py-3.5 font-medium">Date</th>
                  <th className="px-6 py-3.5 font-medium">Amount</th>
                  <th className="px-6 py-3.5 font-medium">Status</th>
                  <th className="px-6 py-3.5 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-gray-50/70">
                    <td className="px-6 py-4 font-semibold text-[#92003A]">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                          {order.initials}
                        </span>
                        <span className="font-medium">{order.customer}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 font-semibold">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        aria-label={`View ${order.id}`}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-[#92003A]"
                      >
                        <ArrowRight size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Low stock + quick actions */}
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold">Low Stock Alert</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Products that need restocking
                </p>
              </div>
              <span className="rounded-xl bg-amber-50 p-2.5 text-amber-600">
                <Boxes size={20} />
              </span>
            </div>

            <div className="mt-5 divide-y divide-gray-100">
              {lowStock.map((item) => (
                <div
                  key={item.sku}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="mt-1 text-xs text-gray-400">{item.sku}</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700">
                    {item.stock} left
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-3 text-sm font-semibold text-[#92003A] hover:underline">
              Manage inventory →
            </button>
          </article>

          <article className="rounded-2xl border border-gray-200/80 bg-white p-5 sm:p-6">
            <h2 className="font-bold">Quick Actions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Common tasks for your store
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  label: "Add new product",
                  description: "Create a product listing",
                  icon: Package,
                },
                {
                  label: "Manage orders",
                  description: "Review customer orders",
                  icon: ShoppingBag,
                },
                {
                  label: "View customers",
                  description: "Manage your customers",
                  icon: Users,
                },
                {
                  label: "Payment settings",
                  description: "Manage payment methods",
                  icon: CreditCard,
                },
              ].map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.label}
                    className="group flex items-center gap-3  border border-gray-200 p-4 text-left transition hover:border-[#92003A]/30 hover:bg-[#92003A]/[0.03]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center  bg-gray-100 text-gray-600 transition group-hover:bg-[#92003A]/10 group-hover:text-[#92003A]">
                      <Icon size={19} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">
                        {action.label}
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        {action.description}
                      </span>
                    </span>
                    <ArrowRight
                      size={15}
                      className="ml-auto shrink-0 text-gray-300 transition group-hover:text-[#92003A]"
                    />
                  </button>
                );
              })}
            </div>
          </article>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-2 pb-2 text-xs text-gray-400">
          <span>Store Admin Dashboard</span>
          <span className="flex items-center gap-1">
            <Clock3 size={13} /> Demo dashboard data
          </span>
        </footer>
      </div>
    </main>
  );
}
