// ────────────────────────────────────────────────
//  Product Types
// ────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  title: string; // e.g. "Size M / Black"
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>; // { size: "M", color: "Black" }
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1–5
  comment?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  currency: string;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  isActive: boolean;
  isFeatured?: boolean;
  variants?: ProductVariant[];
  ratingAverage: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isFeatured?: boolean;
  sortBy?: "price_asc" | "price_desc" | "newest" | "rating";
  page?: number;
  limit?: number;
}
