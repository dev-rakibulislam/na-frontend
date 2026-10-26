"use client";

import Link from "next/link";
import { useCartContext } from "@/providers/cart.provider";
import { useAuthContext } from "@/providers/auth.provider";

export function Navbar() {
  const { itemCount } = useCartContext();
  const { user, logout } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-neutral-900">
            ShopNest<span className="text-blue-600">.</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-black transition-colors">
            All Products
          </Link>
          <Link href="/orders" className="hover:text-black transition-colors">
            Orders
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 rounded-full bg-gray-100 px-3.5 py-1.5 text-sm font-medium text-gray-800 hover:bg-gray-200 transition-colors"
          >
            🛒 Cart
            {itemCount > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                {user.name}
              </span>
              {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                onClick={() => logout()}
                className="text-xs text-red-600 hover:underline cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
