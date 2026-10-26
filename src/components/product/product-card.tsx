"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { useCartContext } from "@/providers/cart.provider";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartContext();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await addItem(product.id, 1);
    } finally {
      setAdding(false);
    }
  };

  const displayPrice = product.salePrice ?? product.price;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.salePrice && (
          <span className="absolute top-2 left-2 rounded-md bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">
            Sale
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{product.category}</span>
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-1">
            {product.title}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-amber-500">
          <span>★</span>
          <span className="font-semibold text-gray-700">{product.ratingAverage}</span>
          <span className="text-gray-400">({product.reviewCount})</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">{formatCurrency(displayPrice)}</span>
            {product.salePrice && (
              <span className="text-xs text-gray-400 line-through">{formatCurrency(product.price)}</span>
            )}
          </div>
          {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={handleAddToCart}
            disabled={adding}
            className="rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
          >
            {adding ? "Adding..." : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
