"use client";

import { Suspense } from "react";
import { useOrders } from "@/hooks";
import { formatCurrency, formatDate, formatOrderStatus } from "@/lib/formatters";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function OrdersContent() {
  const searchParams = useSearchParams();
  const placedNumber = searchParams.get("placed");
  const { data, loading } = useOrders(1, 20);

  return (
    <div className="space-y-6">
      {placedNumber && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-900">
          <p className="font-bold">🎉 Order placed successfully!</p>
          <p className="text-sm">
            Your order tracking number is <span className="font-mono font-bold">{placedNumber}</span>.
          </p>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-neutral-200 animate-pulse" />
          ))}
        </div>
      ) : !data || data.data.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center text-neutral-500">
          No orders found.
        </div>
      ) : (
        <div className="space-y-4">
          {data.data.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between border-b border-neutral-100 pb-3 gap-2">
                <div>
                  <span className="text-xs text-neutral-400 block">ORDER ID</span>
                  <span className="font-mono font-bold text-sm">{order.orderNumber}</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">DATE PLACED</span>
                  <span className="text-sm font-medium">{formatDate(order.createdAt)}</span>
                </div>
                <div>
                  <span className="text-xs text-neutral-400 block">TOTAL AMOUNT</span>
                  <span className="text-sm font-bold text-neutral-900">{formatCurrency(order.total)}</span>
                </div>
                <div>
                  <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-800 capitalize">
                    {formatOrderStatus(order.status)}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm py-1">
                    <span className="text-neutral-700">
                      {item.title} <span className="text-xs text-neutral-400">× {item.quantity}</span>
                    </span>
                    <span className="font-medium text-neutral-900">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <section className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Order History</h1>
          <p className="text-sm text-neutral-500">Track and review all previous purchases</p>
        </div>
        <Link href="/products" className="text-sm font-semibold text-blue-600 hover:underline">
          Shop More
        </Link>
      </div>

      <Suspense fallback={<div className="h-32 rounded-2xl bg-neutral-200 animate-pulse" />}>
        <OrdersContent />
      </Suspense>
    </section>
  );
}
