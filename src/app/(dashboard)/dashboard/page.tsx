import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  MapPin,
  Package,
  ShoppingBag,
  Clock3,
  Truck,
  CheckCircle2,
  UserRound,
} from "lucide-react";
import DashboardHeader from "@/components/dashboard/customer-dashboard/dashboard-header";
import RecentOrders from "@/components/dashboard/customer-dashboard/recent-orders";

const stats = [
  {
    label: "Total Orders",
    value: "12",
    note: "All-time orders",
    icon: Package,
    trend: "+2 this month",
    positive: true,
  },
  {
    label: "Pending Orders",
    value: "02",
    note: "Waiting for delivery",
    icon: Clock3,
    trend: "Needs attention",
  },
  {
    label: "Wishlist Items",
    value: "08",
    note: "Saved for later",
    icon: Heart,
    trend: "View wishlist",
  },
  {
    label: "Total Spent",
    value: "৳8,450",
    note: "Completed orders",
    icon: ShoppingBag,
    trend: "Lifetime spending",
  },
];

const orders = [
  {
    id: "#ORD-2026-1042",
    date: "Oct 26, 2026",
    product: "Classic Everyday Sneakers",
    category: "Footwear · Size 42",
    price: "৳2,450",
    status: "Delivered",
    icon: CheckCircle2,
  },
  {
    id: "#ORD-2026-1038",
    date: "Oct 24, 2026",
    product: "Minimal Leather Backpack",
    category: "Accessories · Black",
    price: "৳1,850",
    status: "Shipped",
    icon: Truck,
  },
  {
    id: "#ORD-2026-1031",
    date: "Oct 21, 2026",
    product: "Essential Cotton T-Shirt",
    category: "Clothing · Medium",
    price: "৳650",
    status: "Processing",
    icon: Clock3,
  },
];

export default function CustomerOverviewPage() {
  const hasOrders = orders.length > 0;

  return (
    <div className="min-w-0 space-y-7">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <DashboardHeader userName={"user Name"} />
        <Link
          href="/products"
          className="inline-flex h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-lg px-5 text-sm font-medium  transition "
        >
          <ShoppingBag className="size-4" />
          Continue shopping
          <ArrowRight className="size-4" />
        </Link>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="min-w-0 rounded-xl border border-neutral-200 bg-white p-4 transition hover:border-neutral-300 sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-neutral-500">{stat.label}</p>
                  <p className="mt-3 break-words text-2xl font-semibold tracking-tight text-neutral-950">
                    {stat.value}
                  </p>
                </div>

                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#92003A]/[0.07] text-[#92003A]">
                  <Icon className="size-5" />
                </div>
              </div>

              <p className="mt-3 text-xs text-neutral-500">{stat.note}</p>
              <div className="mt-4 border-t border-neutral-100 pt-3">
                <p className="flex items-center gap-1.5 text-xs text-neutral-500">
                  {stat.positive ? (
                    <ArrowUpRight className="size-3.5 text-emerald-600" />
                  ) : null}
                  {stat.trend}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {/* Orders + account details */}
      <section className="grid min-w-0 grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        {/* Recent orders */}
        <RecentOrders data={orders} />

        {/* Account details */}
        <aside className="min-w-0 space-y-5">
          <div className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-neutral-950">My account</h2>
              <Link
                href="/dashboard/profile"
                aria-label="Edit profile"
                className="flex size-9 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition hover:bg-neutral-50 hover:text-[#92003A]"
              >
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#92003A]/10 text-[#92003A]">
                <UserRound className="size-6" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-neutral-950">
                  Rakibul Islam
                </p>
                <p className="mt-1 break-all text-xs text-neutral-500">
                  rakibul@example.com
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-neutral-100 pt-4">
              <Link
                href="/dashboard/profile"
                className="flex items-center justify-between gap-3 text-sm text-neutral-600 transition hover:text-[#92003A]"
              >
                Personal information <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/dashboard/addresses"
                className="mt-4 flex items-center justify-between gap-3 text-sm text-neutral-600 transition hover:text-[#92003A]"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  Delivery addresses
                </span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
