"use client"
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  PackageCheck,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";

type OrderStatus = "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

const order = {
  id: "ORD-2026-1038",
  date: "October 24, 2026",
  status: "SHIPPED" as OrderStatus,
  estimatedDelivery: "October 30, 2026",
  trackingNumber: "TRK-BD-839201",
  paymentMethod: "Cash on Delivery",
  paymentStatus: "PENDING",
  customer: {
    name: "Rakibul Islam",
    phone: "01XXXXXXXXX",
    address: "House 12, Road 4",
    area: "Tongi, Gazipur",
    city: "Gazipur",
    postalCode: "1710",
  },
  items: [
    {
      id: "1",
      name: "Minimal Leather Backpack",
      variant: "Black",
      sku: "BAG-001-BLK",
      quantity: 1,
      price: 1850,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=240&h=240&fit=crop",
    },
  ],
  subtotal: 1850,
  discount: 0,
  deliveryFee: 80,
  tax: 0,
  total: 1930,
};

const steps = [
  {
    title: "Order placed",
    description: "Your order has been received.",
    icon: ShoppingBag,
    date: "Oct 24, 2026",
  },
  {
    title: "Processing",
    description: "Your items have been prepared.",
    icon: Package,
    date: "Oct 25, 2026",
  },
  {
    title: "Shipped",
    description: "Your package is on its way.",
    icon: Truck,
    date: "Oct 26, 2026",
  },
  {
    title: "Delivered",
    description: "Your package has arrived.",
    icon: PackageCheck,
    date: "",
  },
];

const statusConfig: Record<OrderStatus, { label: string; className: string }> =
  {
    PROCESSING: {
      label: "Processing",
      className: "bg-amber-50 text-amber-700",
    },
    SHIPPED: {
      label: "Shipped",
      className: "bg-blue-50 text-blue-700",
    },
    DELIVERED: {
      label: "Delivered",
      className: "bg-emerald-50 text-emerald-700",
    },
    CANCELLED: {
      label: "Cancelled",
      className: "bg-red-50 text-red-700",
    },
  };

const money = (amount: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

export default function OrderDetailsPage() {
  const status = statusConfig[order.status];
  const isCancelled = order.status === "CANCELLED";
  const currentStep =
    order.status === "PROCESSING"
      ? 1
      : order.status === "SHIPPED"
        ? 2
        : order.status === "DELIVERED"
          ? 3
          : -1;

  return (
    <main className="min-w-0 space-y-6 pb-8">
      {/* Breadcrumb */}
      <Link
        href="/dashboard/orders"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-[#92003A]"
      >
        <ArrowLeft className="size-4" />
        Back to my orders
      </Link>

      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#92003A]">
            Order information
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Order details
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-neutral-500">
            <span className="break-all font-medium text-foreground">
              #{order.id}
            </span>
            <span className="hidden size-1 rounded-full bg-neutral-300 sm:block" />
            <span>Placed on {order.date}</span>
          </div>
        </div>

        <span
          className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${status.className}`}
        >
          <span className="size-1.5 rounded-full bg-current" />
          {status.label}
        </span>
      </section>

      {/* Tracking */}
      <section className="overflow-hidden rounded-xl border border-neutral-200 bg-background">
        <div className="flex flex-col justify-between gap-3 border-b border-neutral-200 p-4 sm:flex-row sm:items-center sm:p-5">
          <div>
            <h2 className="font-semibold">Order tracking</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Follow your order from purchase to delivery.
            </p>
          </div>

          {!isCancelled && order.status !== "DELIVERED" && (
            <div className="rounded-lg bg-neutral-100 px-3 py-2 dark:bg-neutral-800">
              <p className="text-xs text-neutral-500">Estimated delivery</p>
              <p className="mt-1 text-sm font-medium">
                {order.estimatedDelivery}
              </p>
            </div>
          )}
        </div>

        {isCancelled ? (
          <div className="flex items-start gap-3 p-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
              <XCircle className="size-5" />
            </div>
            <div>
              <h3 className="font-medium">This order was cancelled</h3>
              <p className="mt-1 text-sm leading-6 text-neutral-500">
                This order will not proceed to delivery. Contact support if you
                need help with this order.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-0 sm:grid-cols-4 sm:gap-3">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const complete = index < currentStep;
                const current = index === currentStep;
                const reached =
                  complete || current || order.status === "DELIVERED";

                return (
                  <div
                    key={step.title}
                    className="relative flex gap-3 sm:flex-col sm:gap-3"
                  >
                    {index !== steps.length - 1 && (
                      <div
                        className={`absolute left-[15px] top-9 h-[calc(100%-12px)] w-0.5 sm:left-9 sm:top-[15px] sm:h-0.5 sm:w-[calc(100%-12px)] ${
                          complete ? "bg-[#92003A]" : "bg-neutral-200"
                        }`}
                      />
                    )}

                    <div
                      className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border ${
                        reached
                          ? "border-[#92003A] bg-[#92003A] text-white"
                          : "border-neutral-200 bg-background text-neutral-400"
                      } ${current ? "ring-4 ring-[#92003A]/10" : ""}`}
                    >
                      {complete || order.status === "DELIVERED" ? (
                        <Check className="size-4" />
                      ) : (
                        <Icon className="size-4" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1 pb-7 sm:pb-0">
                      <p
                        className={`text-sm font-medium ${
                          reached ? "text-foreground" : "text-neutral-400"
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-neutral-500">
                        {step.description}
                      </p>
                      {step.date && reached && (
                        <p className="mt-1 text-xs text-neutral-400">
                          {step.date}
                        </p>
                      )}
                      {current && (
                        <span className="mt-2 inline-flex rounded-full bg-[#92003A]/[0.07] px-2 py-1 text-xs font-medium text-[#92003A]">
                          Current status
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {order.status === "SHIPPED" && (
              <div className="mt-6 flex flex-col justify-between gap-3 rounded-lg border border-neutral-200 p-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#92003A]/[0.07] text-[#92003A]">
                    <Truck className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Tracking number</p>
                    <p className="mt-1 break-all text-xs text-neutral-500">
                      {order.trackingNumber}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      void navigator.clipboard.writeText(order.trackingNumber);
                    }
                  }}
                  className="h-9 w-fit rounded-lg border border-neutral-200 px-3 text-sm font-medium transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  Copy tracking number
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Main content */}
      <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-5">
          {/* Products */}
          <section className="overflow-hidden rounded-xl border border-neutral-200 bg-background">
            <div className="border-b border-neutral-200 p-4 sm:p-5">
              <h2 className="font-semibold">Items in this order</h2>
              <p className="mt-1 text-sm text-neutral-500">
                {order.items.length}{" "}
                {order.items.length === 1 ? "product" : "products"}
              </p>
            </div>

            <div className="divide-y divide-neutral-200">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex min-w-0 gap-3 p-4 sm:gap-4 sm:p-5"
                >
                  <div className="size-[88px] shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50 sm:size-24">
                    {/* Replace with next/image after configuring remotePatterns */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="min-w-0">
                      <h3 className="break-words text-sm font-medium">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        {item.variant}
                      </p>
                      <p className="mt-1 text-xs text-neutral-400">
                        SKU: {item.sku}
                      </p>
                      <p className="mt-2 text-xs text-neutral-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-semibold">
                      {money(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Delivery address */}
          <section className="rounded-xl border border-neutral-200 bg-background p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#92003A]/[0.07] text-[#92003A]">
                <MapPin className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">Delivery address</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Shipping destination for this order
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-neutral-200 p-4">
              <p className="font-medium">{order.customer.name}</p>
              <p className="mt-2 text-sm leading-6 text-neutral-500">
                {order.customer.address}
                <br />
                {order.customer.area}
                <br />
                {order.customer.city} - {order.customer.postalCode}
              </p>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                Phone: {order.customer.phone}
              </p>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="min-w-0 space-y-5">
          {/* Payment summary */}
          <section className="rounded-xl border border-neutral-200 bg-background p-4 sm:p-5">
            <h2 className="font-semibold">Payment summary</h2>

            <div className="mt-5 space-y-3">
              <PriceRow label="Subtotal" amount={order.subtotal} />
              {order.discount > 0 && (
                <PriceRow label="Discount" amount={-order.discount} discount />
              )}
              <PriceRow label="Delivery fee" amount={order.deliveryFee} />
              {order.tax > 0 && <PriceRow label="Tax" amount={order.tax} />}

              <div className="border-t border-dashed border-neutral-200 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium">Total</span>
                  <span className="text-xl font-semibold">
                    {money(order.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900">
              <div className="flex items-center gap-2">
                <CreditCard className="size-4 text-neutral-500" />
                <span className="text-sm font-medium">
                  {order.paymentMethod}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="text-xs text-neutral-500">Payment status</span>
                <span
                  className={`text-xs font-medium ${
                    order.paymentStatus === "PAID"
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}
                >
                  {order.paymentStatus === "PAID" ? "Paid" : "Pending"}
                </span>
              </div>
            </div>
          </section>

          {/* Help */}
          <section className="rounded-xl border border-neutral-200 bg-background p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 dark:bg-neutral-800">
                <Clock3 className="size-5" />
              </div>
              <div>
                <h2 className="font-semibold">Need help?</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Questions about your order?
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 text-sm font-medium transition hover:border-[#92003A]/30 hover:text-[#92003A]"
            >
              Contact support <ArrowRight className="size-4" />
            </Link>
          </section>

          {/* Back to orders */}
          <Link
            href="/dashboard/orders"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#92003A] px-4 text-sm font-medium text-white transition hover:bg-[#76002F]"
          >
            <ArrowLeft className="size-4" />
            Back to my orders
          </Link>
        </aside>
      </div>
    </main>
  );
}

function PriceRow({
  label,
  amount,
  discount = false,
}: {
  label: string;
  amount: number;
  discount?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-neutral-500">{label}</span>
      <span
        className={discount ? "font-medium text-emerald-600" : "font-medium"}
      >
        {discount && amount < 0 ? `-${money(Math.abs(amount))}` : money(amount)}
      </span>
    </div>
  );
}
