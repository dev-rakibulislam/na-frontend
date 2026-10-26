import type { Order, CreateOrderPayload, PaginatedResponse } from "@/types";
import { apiGet, apiPost, apiPatch } from "./api-client";
import { mockOrderService } from "./mock.service";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";
const BASE = "/orders";

const realOrderService = {
  async create(payload: CreateOrderPayload): Promise<Order> {
    return apiPost<Order>(BASE, payload);
  },
  async getMyOrders(page = 1, limit = 10): Promise<PaginatedResponse<Order>> {
    return apiGet<PaginatedResponse<Order>>(BASE, { page: String(page), limit: String(limit) });
  },
  async getById(id: string): Promise<Order> {
    return apiGet<Order>(`${BASE}/${id}`);
  },
  async track(orderNumber: string): Promise<Order> {
    return apiGet<Order>(`${BASE}/track/${orderNumber}`);
  },
  async cancel(id: string): Promise<Order> {
    return apiPatch<Order>(`${BASE}/${id}/cancel`);
  },
  async getAll(page = 1, limit = 20): Promise<PaginatedResponse<Order>> {
    return apiGet<PaginatedResponse<Order>>(`${BASE}/admin`, { page: String(page), limit: String(limit) });
  },
  async updateStatus(id: string, status: string): Promise<Order> {
    return apiPatch<Order>(`${BASE}/${id}/status`, { status });
  },
};

export const orderService = USE_MOCK ? (mockOrderService as unknown as typeof realOrderService) : realOrderService;
