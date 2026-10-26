"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartContext } from "@/providers/cart.provider";
import { formatCurrency } from "@/lib/formatters";

export default function CartPage() {
  const { cart, loading, updateQuantity, removeItem, clearCart, applyCoupon } = useCartContext();
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<string | null>(null);

  if (loading) {
    return <div className="container mx-auto px-4 py-20 text-center">Loading cart...</div>;
  }

  const items = cart?.items ?? [];

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await applyCoupon(coupon);
      setCouponMsg("Coupon applied! (10% discount)");
    } catch {
      setCouponMsg("Invalid coupon. Try: SAVE10");
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 p-12 text-center">
          <p className="text-neutral-500">Your cart is currently empty.</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-xl bg-black px-6 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Item List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-20 w-20 rounded-lg object-cover bg-neutral-100"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-neutral-900">{item.title}</h3>
                  <p className="text-sm font-bold text-neutral-700 mt-0.5">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center rounded border border-neutral-200 text-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-neutral-100"
                      >
                        -
                      </button>
                      <span className="px-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-neutral-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-500 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => clearCart()}
                className="text-xs text-neutral-500 hover:text-red-500 cursor-pointer"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold mb-4">Summary</h2>

            <div className="space-y-3 text-sm text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-neutral-900">{formatCurrency(cart?.subtotal ?? 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-neutral-900">{formatCurrency(cart?.shipping ?? 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-medium text-neutral-900">{formatCurrency(cart?.tax ?? 0)}</span>
              </div>
              {(cart?.discount ?? 0) > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount</span>
                  <span>-{formatCurrency(cart?.discount ?? 0)}</span>
                </div>
              )}
              <div className="border-t border-neutral-200 pt-3 flex justify-between text-base font-bold text-neutral-900">
                <span>Total</span>
                <span>{formatCurrency(cart?.total ?? 0)}</span>
              </div>
            </div>

            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="mt-6 flex gap-2">
              <input
                type="text"
                placeholder="Promo code (SAVE10)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-neutral-800"
              >
                Apply
              </button>
            </form>
            {couponMsg && (
              <p className="mt-1.5 text-xs text-neutral-500">{couponMsg}</p>
            )}

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-xl bg-blue-600 py-3 text-center text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
