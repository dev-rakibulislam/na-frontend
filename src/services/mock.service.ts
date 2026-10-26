import type { Product, ProductFilters, PaginatedResponse } from "@/types";
import type { Cart } from "@/types/cart.types";
import type { Order, CreateOrderPayload } from "@/types/order.types";
import type { User, AuthResponse, LoginCredentials, RegisterPayload } from "@/types/user.types";
import {
  demoProducts, demoCart, demoOrders, demoUser, demoCategories,
} from "@/lib/demo-data";

// ────────────────────────────────────────────────
//  Mock API — swap with real services when backend is ready
//  Set NEXT_PUBLIC_USE_MOCK=true in .env.local to enable
// ────────────────────────────────────────────────

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// ─── in-memory state ─────────────────────────

let cart: Cart = structuredClone(demoCart);

function recalcCart() {
  cart.subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
  cart.tax = +(cart.subtotal * 0.08).toFixed(2);
  cart.total = +(cart.subtotal + cart.tax + cart.shipping - cart.discount).toFixed(2);
  cart.updatedAt = new Date().toISOString();
}

// ─── product mock ─────────────────────────────

export const mockProductService = {
  async getAll(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    await delay();
    let items = [...demoProducts];
    if (filters?.category) items = items.filter((p) => p.category === filters.category);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      items = items.filter((p) => p.title.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q)));
    }
    if (filters?.minPrice) items = items.filter((p) => (p.salePrice ?? p.price) >= filters.minPrice!);
    if (filters?.maxPrice) items = items.filter((p) => (p.salePrice ?? p.price) <= filters.maxPrice!);
    if (filters?.isFeatured) items = items.filter((p) => p.isFeatured);
    if (filters?.sortBy === "price_asc") items.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
    if (filters?.sortBy === "price_desc") items.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
    if (filters?.sortBy === "rating") items.sort((a, b) => b.ratingAverage - a.ratingAverage);
    if (filters?.sortBy === "newest") items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const page = filters?.page ?? 1;
    const limit = filters?.limit ?? 12;
    const start = (page - 1) * limit;
    const paged = items.slice(start, start + limit);
    return { data: paged, total: items.length, page, totalPages: Math.ceil(items.length / limit), hasMore: start + limit < items.length };
  },
  async getById(id: string) { await delay(); return demoProducts.find((p) => p.id === id) ?? null; },
  async getBySlug(slug: string) { await delay(); return demoProducts.find((p) => p.slug === slug) ?? null; },
  async getFeatured(limit = 8) { await delay(); return demoProducts.filter((p) => p.isFeatured).slice(0, limit); },
  async getCategories() { await delay(100); return demoCategories; },
};

// ─── cart mock ────────────────────────────────

export const mockCartService = {
  async get() { await delay(); return structuredClone(cart); },
  async addItem(payload: { productId: string; variantId?: string; quantity: number }) {
    await delay();
    const product = demoProducts.find((p) => p.id === payload.productId)!;
    const existing = cart.items.find((i) => i.productId === payload.productId && i.variantId === (payload.variantId ?? undefined));
    if (existing) { existing.quantity += payload.quantity; }
    else {
      cart.items.push({
        id: `ci${Date.now()}`, productId: product.id, variantId: payload.variantId,
        title: product.title, price: product.salePrice ?? product.price,
        image: product.images[0], quantity: payload.quantity, maxStock: product.stock,
      });
    }
    recalcCart();
    return structuredClone(cart);
  },
  async updateQuantity(itemId: string, quantity: number) {
    await delay();
    const item = cart.items.find((i) => i.id === itemId);
    if (item) item.quantity = Math.max(1, Math.min(quantity, item.maxStock));
    recalcCart();
    return structuredClone(cart);
  },
  async removeItem(itemId: string) {
    await delay();
    cart.items = cart.items.filter((i) => i.id !== itemId);
    recalcCart();
    return structuredClone(cart);
  },
  async clear() { await delay(); cart.items = []; recalcCart(); return structuredClone(cart); },
  async applyCoupon(code: string) {
    await delay();
    if (code.toUpperCase() === "SAVE10") { cart.discount = +(cart.subtotal * 0.1).toFixed(2); }
    else { throw new Error("Invalid coupon code"); }
    recalcCart();
    return structuredClone(cart);
  },
  async removeCoupon() { await delay(); cart.discount = 0; recalcCart(); return structuredClone(cart); },
};

// ─── order mock ───────────────────────────────

export const mockOrderService = {
  async create(payload: CreateOrderPayload) {
    await delay(500);
    const order: Order = {
      id: `o${Date.now()}`, orderNumber: `ORD-${Date.now()}`, userId: "u1",
      items: cart.items.map((i) => ({ id: i.id, productId: i.productId, variantId: i.variantId, title: i.title, price: i.price, quantity: i.quantity, imageUrl: i.image })),
      shippingAddress: payload.shippingAddress, billingAddress: payload.billingAddress,
      status: "pending", paymentStatus: "pending", paymentMethod: payload.paymentMethod,
      currency: "USD", subtotal: cart.subtotal, shippingFee: cart.shipping, tax: cart.tax, discount: cart.discount, total: cart.total,
      notes: payload.notes, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    demoOrders.unshift(order);
    cart.items = []; recalcCart();
    return order;
  },
  async getMyOrders(page = 1, limit = 10) {
    await delay();
    const start = (page - 1) * limit;
    return { data: demoOrders.slice(start, start + limit), total: demoOrders.length, page, totalPages: Math.ceil(demoOrders.length / limit), hasMore: start + limit < demoOrders.length };
  },
  async getById(id: string) { await delay(); return demoOrders.find((o) => o.id === id) ?? null; },
  async track(orderNumber: string) { await delay(); return demoOrders.find((o) => o.orderNumber === orderNumber) ?? null; },
  async cancel(id: string) { await delay(); const o = demoOrders.find((o) => o.id === id); if (o) { o.status = "cancelled"; } return o; },
};

// ─── auth mock ────────────────────────────────

export const mockAuthService = {
  async login(_creds: LoginCredentials): Promise<AuthResponse> {
    await delay(400);
    return { user: demoUser, tokens: { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" } };
  },
  async register(_payload: RegisterPayload): Promise<AuthResponse> {
    await delay(400);
    return { user: { ...demoUser, name: _payload.name, email: _payload.email }, tokens: { accessToken: "mock-access-token", refreshToken: "mock-refresh-token" } };
  },
  async logout() { await delay(100); },
  async refreshToken() { await delay(100); return { user: demoUser, tokens: { accessToken: "mock-new-token", refreshToken: "mock-refresh-token" } }; },
  async getProfile() { await delay(); return demoUser; },
  async updateProfile(data: Partial<User>) { await delay(); return { ...demoUser, ...data }; },
};
