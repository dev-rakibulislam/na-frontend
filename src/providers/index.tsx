"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "./auth.provider";
import { CartProvider } from "./cart.provider";

// ────────────────────────────────────────────────
//  Root Providers
//  Compose all context providers in one place.
//  Wrap your layout with <RootProviders>.
// ────────────────────────────────────────────────

export function RootProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
