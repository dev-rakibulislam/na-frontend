import type { Product, ProductFilters, PaginatedResponse } from "@/types";
import { apiGet, apiPost, apiPut, apiDelete } from "./api-client";
import { mockProductService } from "./mock.service";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";
const BASE = "/products";

const realProductService = {
  async getAll(filters?: ProductFilters): Promise<PaginatedResponse<Product>> {
    const params: Record<string, string> = {};
    if (filters) {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined) params[key] = String(value);
      }
    }
    return apiGet<PaginatedResponse<Product>>(BASE, params);
  },
  async getById(id: string): Promise<Product> { return apiGet<Product>(`${BASE}/${id}`); },
  async getBySlug(slug: string): Promise<Product> { return apiGet<Product>(`${BASE}/slug/${slug}`); },
  async getFeatured(limit = 8): Promise<Product[]> { return apiGet<Product[]>(`${BASE}/featured`, { limit: String(limit) }); },
  async getCategories(): Promise<string[]> { return apiGet<string[]>(`${BASE}/categories`); },
  async create(product: Omit<Product, "id" | "createdAt" | "updatedAt" | "ratingAverage" | "reviewCount">) { return apiPost<Product>(BASE, product); },
  async update(id: string, data: Partial<Product>) { return apiPut<Product>(`${BASE}/${id}`, data); },
  async delete(id: string) { return apiDelete(`${BASE}/${id}`); },
};

export const productService = USE_MOCK ? (mockProductService as unknown as typeof realProductService) : realProductService;
