"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useProduct } from "@/hooks";
import { useCartContext } from "@/providers/cart.provider";
import { formatCurrency } from "@/lib/formatters";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { slug } = use(params);
  const { product, loading, error } = useProduct(slug, true);
  const { addItem } = useCartContext();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(undefined);
  const [addedNotice, setAddedNotice] = useState(false);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-neutral-400">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <Link href="/products" className="mt-4 inline-block text-blue-600 hover:underline">
          &larr; Back to catalog
        </Link>
      </div>
    );
  }

  const handleAddToCart = async () => {
    await addItem(product.id, quantity, selectedVariant);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const currentPrice = product.salePrice ?? product.price;

  return (
    <section className="container mx-auto px-4 py-12 max-w-5xl">
      <Link href="/products" className="text-xs text-neutral-500 hover:underline mb-6 inline-block">
        &larr; Back to all products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="overflow-hidden rounded-2xl bg-neutral-100 aspect-square border border-neutral-200">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
            {product.category}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight mt-1">{product.title}</h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
            <span className="text-amber-500">★ {product.ratingAverage}</span>
            <span>({product.reviewCount} reviews)</span>
            <span className="text-neutral-300">•</span>
            <span className={product.stock > 0 ? "text-emerald-600 font-medium" : "text-red-500 font-medium"}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of stock"}
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold">{formatCurrency(currentPrice)}</span>
            {product.salePrice && (
              <span className="text-lg text-neutral-400 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <p className="mt-6 text-sm text-neutral-600 leading-relaxed">{product.description}</p>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mt-6">
              <label className="text-xs font-semibold text-neutral-700 block mb-2">Select Option:</label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.id)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                      selectedVariant === v.id
                        ? "border-black bg-black text-white"
                        : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    {v.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-neutral-300 bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-2 text-sm hover:bg-neutral-100"
              >
                -
              </button>
              <span className="px-4 py-2 text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                className="px-3 py-2 text-sm hover:bg-neutral-100"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 rounded-xl bg-black py-3 text-sm font-semibold text-white shadow hover:bg-neutral-800 transition cursor-pointer"
            >
              Add to Shopping Cart
            </button>
          </div>

          {addedNotice && (
            <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-center text-xs font-semibold text-emerald-800 border border-emerald-200">
              ✓ Added to cart successfully! <Link href="/cart" className="underline ml-1">View cart</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
