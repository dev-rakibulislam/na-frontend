"use client";

import { useState, useEffect, useCallback } from "react";
import type { Cart } from "@/types";
import { cartService } from "@/services";

// ────────────────────────────────────────────────
//  useCart — cart state & operations
// ────────────────────────────────────────────────

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await cartService.get();
      setCart(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = useCallback(
    async (productId: string, quantity = 1, variantId?: string) => {
      setError(null);
      try {
        const updated = await cartService.addItem({ productId, variantId, quantity });
        setCart(updated);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to add item");
        throw err;
      }
    },
    []
  );

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    setError(null);
    try {
      const updated = await cartService.updateQuantity(itemId, quantity);
      setCart(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update quantity");
      throw err;
    }
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    setError(null);
    try {
      const updated = await cartService.removeItem(itemId);
      setCart(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove item");
      throw err;
    }
  }, []);

  const clearCart = useCallback(async () => {
    setError(null);
    try {
      const updated = await cartService.clear();
      setCart(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to clear cart");
      throw err;
    }
  }, []);

  const applyCoupon = useCallback(async (code: string) => {
    setError(null);
    try {
      const updated = await cartService.applyCoupon(code);
      setCart(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid coupon code");
      throw err;
    }
  }, []);

  const itemCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;

  return {
    cart,
    loading,
    error,
    itemCount,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    refetch: fetchCart,
  };
}
