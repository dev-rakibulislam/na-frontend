"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/providers/cart.provider";
import { usePlaceOrder } from "@/hooks";
import { formatCurrency } from "@/lib/formatters";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCartContext();
  const { placeOrder, loading: placingOrder } = usePlaceOrder();

  const [form, setForm] = useState({
    fullName: "Rakib Ahmed",
    street: "123 Gulshan Ave",
    city: "Dhaka",
    postalCode: "1212",
    country: "BD",
    phone: "+8801700000000",
    paymentMethod: "stripe" as "stripe" | "cod" | "paypal",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart || cart.items.length === 0) return;

    try {
      const order = await placeOrder({
        items: cart.items.map((i) => ({
          productId: i.productId,
          variantId: i.variantId,
          quantity: i.quantity,
        })),
        shippingAddress: {
          fullName: form.fullName,
          street: form.street,
          city: form.city,
          postalCode: form.postalCode,
          country: form.country,
          phone: form.phone,
        },
        paymentMethod: form.paymentMethod,
      });

      router.push(`/orders?placed=${order.orderNumber}`);
    } catch {
      alert("Order placement failed. Check details and retry.");
    }
  };

  return (
    <section className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-semibold text-neutral-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-neutral-600 block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={form.street}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-600 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-600 block mb-1">Postal Code</label>
                <input
                  type="text"
                  required
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-semibold text-neutral-600 block mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 cursor-pointer hover:bg-neutral-50">
                <input
                  type="radio"
                  name="payment"
                  checked={form.paymentMethod === "stripe"}
                  onChange={() => setForm({ ...form, paymentMethod: "stripe" })}
                />
                <span className="text-sm font-medium">Credit / Debit Card (Stripe Mock)</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 cursor-pointer hover:bg-neutral-50">
                <input
                  type="radio"
                  name="payment"
                  checked={form.paymentMethod === "cod"}
                  onChange={() => setForm({ ...form, paymentMethod: "cod" })}
                />
                <span className="text-sm font-medium">Cash on Delivery (COD)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Order review */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold mb-4">Review Order</h2>
          <div className="space-y-3 text-sm text-neutral-600">
            <div className="flex justify-between">
              <span>Items ({cart?.items.length ?? 0})</span>
              <span>{formatCurrency(cart?.subtotal ?? 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatCurrency(cart?.shipping ?? 0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatCurrency(cart?.tax ?? 0)}</span>
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

          <button
            type="submit"
            disabled={placingOrder || !cart || cart.items.length === 0}
            className="mt-6 w-full rounded-xl bg-black py-3 text-center text-sm font-semibold text-white shadow hover:bg-neutral-800 disabled:opacity-50 transition cursor-pointer"
          >
            {placingOrder ? "Placing Order..." : "Confirm & Place Order"}
          </button>
        </div>
      </form>
    </section>
  );
}
