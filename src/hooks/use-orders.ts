"use client";

import { useState, useEffect, useCallback } from "react";
import type { Order, CreateOrderPayload, PaginatedResponse } from "@/types";
import { orderService } from "@/services";

// ────────────────────────────────────────────────
//  useOrders — user's order list
// ────────────────────────────────────────────────

export function useOrders(page = 1, limit = 10) {
  const [data, setData] = useState<PaginatedResponse<Order> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await orderService.getMyOrders(page, limit);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { data, loading, error, refetch: fetchOrders };
}

// ────────────────────────────────────────────────
//  useOrder — single order detail
// ────────────────────────────────────────────────

export function useOrder(orderId: string) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const result = await orderService.getById(orderId);
        if (!cancelled) setOrder(result);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Order not found");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  return { order, loading, error };
}

// ────────────────────────────────────────────────
//  usePlaceOrder — fire-and-forget order creation
// ────────────────────────────────────────────────

export function usePlaceOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeOrder = useCallback(async (payload: CreateOrderPayload) => {
    setLoading(true);
    setError(null);
    try {
      const order = await orderService.create(payload);
      return order;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to place order";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { placeOrder, loading, error };
}
