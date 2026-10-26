// ────────────────────────────────────────────────
//  Order Types
// ────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: "stripe" | "cod" | "paypal";
  transactionId?: string;
  currency: string;
  subtotal: number;
  shippingFee: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  items: Array<{ productId: string; variantId?: string; quantity: number }>;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: "stripe" | "cod" | "paypal";
  notes?: string;
  couponCode?: string;
}
