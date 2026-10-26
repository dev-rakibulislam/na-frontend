"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useCart as useCartHook } from "@/hooks/use-cart";
import type { Cart } from "@/types";

// ────────────────────────────────────────────────
//  Cart Context & Provider
// ────────────────────────────────────────────────

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  itemCount: number;
  addItem: (productId: string, quantity?: number, variantId?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (code: string) => Promise<void>;
  refetch: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCartHook();

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within <CartProvider>");
  return ctx;
}
