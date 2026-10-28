import { ArrowRight, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

const statusStyles: Record<string, string> = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Shipped: "bg-blue-50 text-blue-700",
  Processing: "bg-amber-50 text-amber-700",
};

export default function RecentOrders({ data }: any) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-neutral-100 px-4 py-4 sm:px-5">
        <div>
          <h2 className="font-semibold text-neutral-950">Recent orders</h2>
          <p className="mt-1 text-xs text-neutral-500">
            Track your latest purchases
          </p>
        </div>

        <Link
          href="/dashboard/orders"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#92003A] hover:underline"
        >
          View all <ArrowRight className="size-4" />
        </Link>
      </div>

      {data ? (
        <div className="divide-y divide-neutral-100">
          {data.map((d: any) => {
            const StatusIcon = d.icon;

            return (
              <article
                key={d.id}
                className="flex min-w-0 flex-col gap-3 px-4 py-4 transition hover:bg-neutral-50/70 sm:px-5 sm:py-5"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
                    <Package className="size-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="break-all text-xs text-neutral-400">
                      {d.id}
                    </p>
                    <h3 className="mt-1 break-words text-sm font-medium text-neutral-900">
                      {d.product}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-500">
                      {d.category}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-neutral-950">
                    {d.price}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pl-0 sm:pl-14">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[d.status]}`}
                    >
                      <StatusIcon className="size-3.5" />
                      {d.status}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {d.date}
                    </span>
                  </div>

                  <Link
                    href={`/dashboard/orders/${encodeURIComponent(d.id.replace("#", ""))}`}
                    className="text-xs font-medium text-[#92003A] hover:underline"
                  >
                    Details
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center px-5 py-14 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-[#92003A]/[0.07] text-[#92003A]">
            <ShoppingBag className="size-6" />
          </div>
          <h3 className="mt-4 font-semibold text-neutral-950">No orders yet</h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-500">
            Your next favorite find is waiting. Explore the collection and place
            your first order.
          </p>
          <Link
            href="/products"
            className="mt-5 rounded-lg bg-[#92003A] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#76002F]"
          >
            Explore products
          </Link>
        </div>
      )}
    </div>
  );
}
