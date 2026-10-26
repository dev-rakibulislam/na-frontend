// ────────────────────────────────────────────────
//  Cart Types
// ────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  maxStock: number;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  updatedAt: string;
}
