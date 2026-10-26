// ────────────────────────────────────────────────
//  App Constants
// ────────────────────────────────────────────────

export const APP_NAME = "ShopNest";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export const PRODUCTS_PER_PAGE = 12;

export const CURRENCY = "USD";

export const ORDER_STATUSES = [
  "pending",
  "paid",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

