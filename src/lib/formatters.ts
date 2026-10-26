// ────────────────────────────────────────────────
//  Formatters
// ────────────────────────────────────────────────

/** Format a number as currency (e.g. $12.99) */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

/** Format a date string for display (e.g. "Oct 26, 2026") */
export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateStr));
}

/** Format a date with time (e.g. "Oct 26, 2026, 9:04 PM") */
export function formatDateTime(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

/** Pretty order status labels */
export function formatOrderStatus(status: string): string {
  const map: Record<string, string> = {
    pending: "Pending",
    paid: "Paid",
    processing: "Processing",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
    refunded: "Refunded",
  };
  return map[status] ?? status;
}

/** Create a slug from a string */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
