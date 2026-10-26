import type { Product } from "@/types/product.types";
import type { Cart } from "@/types/cart.types";
import type { Order } from "@/types/order.types";
import type { User } from "@/types/user.types";

// ────────────────────────────────────────────────
//  Demo Data
// ────────────────────────────────────────────────

export const demoUser: User = {
  id: "u1",
  name: "Rakib Ahmed",
  email: "rakib@example.com",
  role: "customer",
  avatarUrl: "https://i.pravatar.cc/150?u=rakib",
  phone: "+8801700000000",
  createdAt: "2026-01-15T10:00:00Z",
  updatedAt: "2026-10-20T10:00:00Z",
};

export const demoProducts: Product[] = [
  {
    id: "p1", title: "Classic White Sneakers", slug: "classic-white-sneakers",
    description: "Premium leather sneakers with cushioned sole. Perfect for everyday wear.",
    price: 89.99, salePrice: 69.99, currency: "USD",
    images: ["https://picsum.photos/seed/shoe1/600/600", "https://picsum.photos/seed/shoe1b/600/600"],
    category: "Footwear", tags: ["sneakers", "casual", "sale"], stock: 45,
    isActive: true, isFeatured: true, ratingAverage: 4.5, reviewCount: 128,
    variants: [
      { id: "v1", title: "Size 9 / White", sku: "SNK-W-9", price: 69.99, stock: 15, attributes: { size: "9", color: "White" } },
      { id: "v2", title: "Size 10 / White", sku: "SNK-W-10", price: 69.99, stock: 12, attributes: { size: "10", color: "White" } },
    ],
    createdAt: "2026-06-01T00:00:00Z", updatedAt: "2026-10-20T00:00:00Z",
  },
  {
    id: "p2", title: "Wireless Noise-Cancelling Headphones", slug: "wireless-nc-headphones",
    description: "Immersive sound with 30-hour battery life and active noise cancellation.",
    price: 199.99, currency: "USD",
    images: ["https://picsum.photos/seed/headphone1/600/600"],
    category: "Electronics", tags: ["audio", "wireless", "featured"], stock: 30,
    isActive: true, isFeatured: true, ratingAverage: 4.8, reviewCount: 256,
    createdAt: "2026-05-10T00:00:00Z", updatedAt: "2026-10-18T00:00:00Z",
  },
  {
    id: "p3", title: "Minimalist Leather Wallet", slug: "minimalist-leather-wallet",
    description: "Slim RFID-blocking wallet crafted from genuine Italian leather.",
    price: 49.99, currency: "USD",
    images: ["https://picsum.photos/seed/wallet1/600/600"],
    category: "Accessories", tags: ["leather", "minimal"], stock: 80,
    isActive: true, isFeatured: false, ratingAverage: 4.3, reviewCount: 67,
    createdAt: "2026-07-15T00:00:00Z", updatedAt: "2026-10-10T00:00:00Z",
  },
  {
    id: "p4", title: "Organic Cotton T-Shirt", slug: "organic-cotton-tshirt",
    description: "Soft, breathable t-shirt made from 100% organic cotton. Available in multiple colors.",
    price: 34.99, salePrice: 24.99, currency: "USD",
    images: ["https://picsum.photos/seed/tshirt1/600/600"],
    category: "Clothing", tags: ["cotton", "organic", "sale"], stock: 120,
    isActive: true, isFeatured: true, ratingAverage: 4.6, reviewCount: 89,
    variants: [
      { id: "v3", title: "M / Black", sku: "TSH-BK-M", price: 24.99, stock: 30, attributes: { size: "M", color: "Black" } },
      { id: "v4", title: "L / Navy", sku: "TSH-NV-L", price: 24.99, stock: 25, attributes: { size: "L", color: "Navy" } },
    ],
    createdAt: "2026-04-20T00:00:00Z", updatedAt: "2026-10-15T00:00:00Z",
  },
  {
    id: "p5", title: "Stainless Steel Water Bottle", slug: "steel-water-bottle",
    description: "Double-walled insulated bottle. Keeps drinks cold 24h or hot 12h.",
    price: 29.99, currency: "USD",
    images: ["https://picsum.photos/seed/bottle1/600/600"],
    category: "Accessories", tags: ["eco", "hydration"], stock: 200,
    isActive: true, isFeatured: false, ratingAverage: 4.7, reviewCount: 312,
    createdAt: "2026-03-01T00:00:00Z", updatedAt: "2026-09-28T00:00:00Z",
  },
  {
    id: "p6", title: "Smart Fitness Watch", slug: "smart-fitness-watch",
    description: "Track your workouts, heart rate, and sleep with a vibrant AMOLED display.",
    price: 149.99, salePrice: 119.99, currency: "USD",
    images: ["https://picsum.photos/seed/watch1/600/600"],
    category: "Electronics", tags: ["fitness", "smartwatch", "sale"], stock: 55,
    isActive: true, isFeatured: true, ratingAverage: 4.4, reviewCount: 178,
    createdAt: "2026-08-10T00:00:00Z", updatedAt: "2026-10-22T00:00:00Z",
  },
  {
    id: "p7", title: "Canvas Messenger Bag", slug: "canvas-messenger-bag",
    description: "Durable waxed canvas bag with padded laptop compartment.",
    price: 74.99, currency: "USD",
    images: ["https://picsum.photos/seed/bag1/600/600"],
    category: "Accessories", tags: ["bag", "laptop", "canvas"], stock: 35,
    isActive: true, isFeatured: false, ratingAverage: 4.2, reviewCount: 43,
    createdAt: "2026-07-01T00:00:00Z", updatedAt: "2026-10-05T00:00:00Z",
  },
  {
    id: "p8", title: "Bluetooth Portable Speaker", slug: "bluetooth-portable-speaker",
    description: "Waterproof speaker with 360° sound and 16-hour battery.",
    price: 59.99, currency: "USD",
    images: ["https://picsum.photos/seed/speaker1/600/600"],
    category: "Electronics", tags: ["audio", "portable", "waterproof"], stock: 70,
    isActive: true, isFeatured: true, ratingAverage: 4.6, reviewCount: 205,
    createdAt: "2026-06-15T00:00:00Z", updatedAt: "2026-10-19T00:00:00Z",
  },
];

export const demoCart: Cart = {
  id: "cart1",
  userId: "u1",
  items: [
    { id: "ci1", productId: "p1", variantId: "v1", title: "Classic White Sneakers — Size 9", price: 69.99, image: "https://picsum.photos/seed/shoe1/600/600", quantity: 1, maxStock: 15 },
    { id: "ci2", productId: "p4", variantId: "v3", title: "Organic Cotton T-Shirt — M / Black", price: 24.99, image: "https://picsum.photos/seed/tshirt1/600/600", quantity: 2, maxStock: 30 },
  ],
  subtotal: 119.97,
  tax: 9.60,
  shipping: 5.99,
  discount: 0,
  total: 135.56,
  updatedAt: "2026-10-26T15:00:00Z",
};

export const demoOrders: Order[] = [
  {
    id: "o1", orderNumber: "ORD-20261001-001", userId: "u1",
    items: [
      { id: "oi1", productId: "p2", title: "Wireless Noise-Cancelling Headphones", price: 199.99, quantity: 1, imageUrl: "https://picsum.photos/seed/headphone1/600/600" },
    ],
    shippingAddress: { fullName: "Rakib Ahmed", street: "123 Gulshan Ave", city: "Dhaka", postalCode: "1212", country: "BD", phone: "+8801700000000" },
    status: "delivered", paymentStatus: "succeeded", paymentMethod: "stripe", transactionId: "txn_abc123",
    currency: "USD", subtotal: 199.99, shippingFee: 0, tax: 16.00, discount: 0, total: 215.99,
    createdAt: "2026-10-01T08:00:00Z", updatedAt: "2026-10-05T14:00:00Z",
  },
  {
    id: "o2", orderNumber: "ORD-20261020-002", userId: "u1",
    items: [
      { id: "oi2", productId: "p6", title: "Smart Fitness Watch", price: 119.99, quantity: 1, imageUrl: "https://picsum.photos/seed/watch1/600/600" },
      { id: "oi3", productId: "p5", title: "Stainless Steel Water Bottle", price: 29.99, quantity: 2, imageUrl: "https://picsum.photos/seed/bottle1/600/600" },
    ],
    shippingAddress: { fullName: "Rakib Ahmed", street: "123 Gulshan Ave", city: "Dhaka", postalCode: "1212", country: "BD", phone: "+8801700000000" },
    status: "shipped", paymentStatus: "succeeded", paymentMethod: "stripe",
    currency: "USD", subtotal: 179.97, shippingFee: 5.99, tax: 14.40, discount: 10, total: 190.36,
    createdAt: "2026-10-20T12:00:00Z", updatedAt: "2026-10-24T09:00:00Z",
  },
];

export const demoCategories = ["Electronics", "Clothing", "Footwear", "Accessories"];
