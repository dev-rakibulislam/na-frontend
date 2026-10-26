import type { Cart } from "@/types";
import { apiGet, apiPost, apiPatch, apiDelete } from "./api-client";
import { mockCartService } from "./mock.service";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";
const BASE = "/cart";

const realCartService = {
  async get(): Promise<Cart> { return apiGet<Cart>(BASE); },
  async addItem(payload: { productId: string; variantId?: string; quantity: number }): Promise<Cart> { return apiPost<Cart>(`${BASE}/items`, payload); },
  async updateQuantity(itemId: string, quantity: number): Promise<Cart> { return apiPatch<Cart>(`${BASE}/items/${itemId}`, { quantity }); },
  async removeItem(itemId: string): Promise<Cart> { return apiDelete<Cart>(`${BASE}/items/${itemId}`); },
  async clear(): Promise<Cart> { return apiDelete<Cart>(`${BASE}/items`); },
  async applyCoupon(code: string): Promise<Cart> { return apiPost<Cart>(`${BASE}/coupon`, { code }); },
  async removeCoupon(): Promise<Cart> { return apiDelete<Cart>(`${BASE}/coupon`); },
};

export const cartService = USE_MOCK ? (mockCartService as unknown as typeof realCartService) : realCartService;
