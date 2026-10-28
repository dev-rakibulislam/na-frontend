
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Package,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Truck,
  XCircle,
} from "lucide-react";

type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

type Order = {
  id: string;
  date: string;
  items: number;
  total: number;
  status: OrderStatus;
  products: {
    name: string;
    variant: string;
    quantity: number;
    image: string;
  }[];
};

const demoOrders: Order[] = [
  {
    id: "ORD-2026-1042",
    date: "Oct 26, 2026",
    items: 2,
    total: 2450,
    status: "Delivered",
    products: [
      {
        name: "Everyday Sneakers",
        variant: "White / Size 42",
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=240&h=240&fit=crop",
      },
      {
        name: "Cotton Socks",
        variant: "White / Pack of 2",
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=240&h=240&fit=crop",
      },
    ],
  },
  {
    id: "ORD-2026-1038",
    date: "Oct 24, 2026",
    items: 1,
    total: 1850,
    status: "Shipped",
    products: [
      {
        name: "Minimal Leather Backpack",
        variant: "Black",
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=240&h=240&fit=crop",
      },
    ],
  },
  {
    id: "ORD-2026-1031",
    date: "Oct 21, 2026",
    items: 1,
    total: 650,
    status: "Processing",
    products: [
      {
        name: "Essential Cotton T-Shirt",
        variant: "Beige / Medium",
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=240&h=240&fit=crop",
      },
    ],
  },
  {
    id: "ORD-2026-1024",
    date: "Oct 18, 2026",
    items: 1,
    total: 1200,
    status: "Cancelled",
    products: [
      {
        name: "Everyday Casual Shirt",
        variant: "Blue / Large",
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=240&h=240&fit=crop",
      },
    ],
  },
];

const filters = [
  "All orders",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;

type Filter = (typeof filters)[number];

const statusStyles: Record<OrderStatus, string> = {
  Processing: "bg-amber-50 text-amber-700 ring-amber-600/15",
  Shipped: "bg-blue-50 text-blue-700 ring-blue-600/15",
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/15",
  Cancelled: "bg-red-50 text-red-700 ring-red-600/15",
};

const statusDot: Record<OrderStatus, string> = {
  Processing: "bg-amber-500",
  Shipped: "bg-blue-500",
  Delivered: "bg-emerald-500",
  Cancelled: "bg-red-500",
};

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

export default function MyOrdersPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All orders");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;

  const counts = useMemo(
    () => ({
      total: demoOrders.length,
      Processing: demoOrders.filter((o) => o.status === "Processing").length,
      Shipped: demoOrders.filter((o) => o.status === "Shipped").length,
      Delivered: demoOrders.filter((o) => o.status === "Delivered").length,
      Cancelled: demoOrders.filter((o) => o.status === "Cancelled").length,
    }),
    [],
  );

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return demoOrders.filter((order) => {
      const matchesFilter =
        activeFilter === "All orders" || order.status === activeFilter;

      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.products.some((product) =>
          product.name.toLowerCase().includes(query),
        );

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const visibleOrders = filteredOrders.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize,
  );

  function changeFilter(filter: Filter) {
    setActiveFilter(filter);
    setCurrentPage(1);
  }

  function changeSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  return (
    <main className="min-w-0 space-y-6 pb-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#92003A]">
            Your account
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            My Orders
          </h1>
          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Keep track of your purchases and delivery updates.
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg bg-[#92003A] px-4 text-sm font-medium text-white transition hover:bg-[#76002F]"
        >
          <ShoppingBag className="size-4" />
          Continue shopping
        </Link>
      </section>

      {/* Order summary */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <SummaryCard
          label="Total orders"
          value={counts.total}
          icon={<Package className="size-5" />}
        />
        <SummaryCard
          label="Processing"
          value={counts.Processing}
          icon={<SlidersHorizontal className="size-5" />}
        />
        <SummaryCard
          label="On the way"
          value={counts.Shipped}
          icon={<Truck className="size-5" />}
        />
        <SummaryCard
          label="Delivered"
          value={counts.Delivered}
          icon={<ShoppingBag className="size-5" />}
        />
      </section>

      {/* Orders list */}
      <section className="overflow-hidden rounded-xl border border-neutral-200 bg-background">
        <div className="space-y-4 border-b border-neutral-200 p-4 sm:p-5">
          <div>
            <h2 className="font-semibold">Order history</h2>
            <p className="mt-1 text-sm text-neutral-500">
              {filteredOrders.length}{" "}
              {filteredOrders.length === 1 ? "order" : "orders"} found
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              value={search}
              onChange={(event) => changeSearch(event.target.value)}
              placeholder="Search by order number or product..."
              aria-label="Search orders"
              className="h-11 w-full rounded-lg border border-neutral-200 bg-background pl-10 pr-10 text-sm outline-none transition placeholder:text-neutral-400 focus:border-[#92003A] focus:ring-2 focus:ring-[#92003A]/10"
            />
            {search && (
              <button
                type="button"
                onClick={() => changeSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-foreground"
              >
                <XCircle className="size-4" />
              </button>
            )}
          </div>

          {/* Status filters */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {filters.map((filter) => {
              const selected = activeFilter === filter;
              const count =
                filter === "All orders"
                  ? counts.total
                  : counts[filter as OrderStatus];

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => changeFilter(filter)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    selected
                      ? "border-[#92003A] bg-[#92003A] text-white"
                      : "border-neutral-200 bg-background text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  {filter}
                  <span
                    className={`text-xs ${
                      selected ? "text-white/75" : "text-neutral-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <div className="divide-y divide-neutral-200">
          {visibleOrders.map((order) => (
            <article
              key={order.id}
              className="p-4 transition-colors hover:bg-neutral-50/50 sm:p-5 dark:hover:bg-neutral-900/40"
            >
              <div className="flex flex-col gap-4">
                {/* Order metadata */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-all text-sm font-semibold">
                      {order.id}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      Placed on {order.date} · {order.items}{" "}
                      {order.items === 1 ? "item" : "items"}
                    </p>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-2.5 py-1.5 text-xs font-medium ring-1 ring-inset ${statusStyles[order.status]}`}
                  >
                    <span
                      className={`size-1.5 rounded-full ${statusDot[order.status]}`}
                    />
                    {order.status}
                  </span>
                </div>

                {/* Product previews */}
                <div className="flex min-w-0 flex-col gap-3">
                  {order.products.slice(0, 2).map((product) => (
                    <div
                      key={product.name}
                      className="flex min-w-0 items-center gap-3"
                    >
                      <div className="size-[68px] shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="break-words text-sm font-medium">
                          {product.name}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {product.variant}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          Qty: {product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                  {order.products.length > 2 && (
                    <p className="text-xs text-neutral-500">
                      +{order.products.length - 2} more products
                    </p>
                  )}
                </div>

                {/* Total + actions */}
                <div className="flex flex-col justify-between gap-3 border-t border-neutral-100 pt-4 sm:flex-row sm:items-center dark:border-neutral-800">
                  <div>
                    <p className="text-xs text-neutral-500">Order total</p>
                    <p className="mt-1 text-lg font-semibold">
                      {formatPrice(order.total)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {order.status === "Shipped" && (
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-3 text-sm font-medium transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <Truck className="size-4" />
                        Track order
                      </Link>
                    )}

                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-3 text-sm font-medium transition hover:border-[#92003A]/30 hover:text-[#92003A]"
                    >
                      View details
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* Empty state */}
          {visibleOrders.length === 0 && (
            <div className="flex flex-col items-center px-5 py-14 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-[#92003A]/[0.07] text-[#92003A]">
                <Package className="size-6" />
              </div>
              <h3 className="mt-4 font-semibold">No orders found</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
                {search
                  ? "Try a different order number or product name."
                  : "There are no orders in this category yet."}
              </p>
              {search && (
                <button
                  type="button"
                  onClick={() => changeSearch("")}
                  className="mt-4 text-sm font-medium text-[#92003A] hover:underline"
                >
                  Clear search
                </button>
              )}
              {!search && activeFilter !== "All orders" && (
                <button
                  type="button"
                  onClick={() => changeFilter("All orders")}
                  className="mt-4 text-sm font-medium text-[#92003A] hover:underline"
                >
                  View all orders
                </button>
              )}
              {!search && activeFilter === "All orders" && (
                <Link
                  href="/products"
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-[#92003A] px-4 text-sm font-medium text-white hover:bg-[#76002F]"
                >
                  Start shopping <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-neutral-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-xs text-neutral-500">
              Showing {(safePage - 1) * pageSize + 1}–
              {Math.min(safePage * pageSize, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-neutral-200 px-3 text-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-neutral-800"
              >
                <ChevronLeft className="size-4" />
                Previous
              </button>
              <span className="px-1 text-sm text-neutral-500">
                {safePage} / {totalPages}
              </span>
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-neutral-200 px-3 text-sm transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-neutral-800"
              >
                Next
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-neutral-200 bg-background p-4 sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm text-neutral-500">{label}</p>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#92003A]/[0.07] text-[#92003A]">
          {icon}
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
