
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  Heart,
  Search,
  ShoppingBag,
  ShoppingCart,
  Trash2,
} from "lucide-react";

type WishlistProduct = {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  addedAt: string;
};

const initialWishlist: WishlistProduct[] = [
  {
    id: "1",
    name: "Everyday Sneakers",
    slug: "everyday-sneakers",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=85",
    price: 2450,
    originalPrice: 2990,
    inStock: true,
    addedAt: "2026-10-28",
  },
  {
    id: "2",
    name: "Classic Shoulder Bag",
    slug: "classic-shoulder-bag",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=85",
    price: 1850,
    inStock: true,
    addedAt: "2026-10-27",
  },
  {
    id: "3",
    name: "Minimal Wristwatch",
    slug: "minimal-wristwatch",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&q=85",
    price: 3100,
    originalPrice: 3500,
    inStock: false,
    addedAt: "2026-10-25",
  },
  {
    id: "4",
    name: "Essential Backpack",
    slug: "essential-backpack",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=85",
    price: 2200,
    inStock: true,
    addedAt: "2026-10-24",
  },
  {
    id: "5",
    name: "Classic Sunglasses",
    slug: "classic-sunglasses",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&q=85",
    price: 950,
    inStock: true,
    addedAt: "2026-10-22",
  },
  {
    id: "6",
    name: "Casual Sneakers",
    slug: "casual-sneakers",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=700&q=85",
    price: 2750,
    inStock: true,
    addedAt: "2026-10-20",
  },
];

const formatPrice = (price: number) => `৳${price.toLocaleString("en-BD")}`;

export default function WishlistPage() {
  const [products, setProducts] = useState<WishlistProduct[]>(initialWishlist);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase().trim()),
    );

    return result.sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    });
  }, [products, search, sort]);

  const removeProduct = (id: string) => {
    setProducts((current) => current.filter((product) => product.id !== id));
    setNotice("Product removed from your wishlist.");
  };

  const addToCart = (product: WishlistProduct) => {
    // TODO: Replace with your cart API or cart mutation.
    setNotice(`${product.name} is ready to be added to your cart.`);
  };

  return (
    <main className="min-w-0 space-y-7 pb-10">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-neutral-500">
            <Link
              href="/dashboard"
              className="transition-colors hover:text-[#92003A]"
            >
              My Account
            </Link>
            <span>/</span>
            <span className="text-neutral-900 dark:text-neutral-100">
              Wishlist
            </span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-3xl">
              My Wishlist
            </h1>
            <span className="rounded-full bg-[#92003A]/10 px-3 py-1 text-sm font-medium text-[#92003A]">
              {products.length}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Keep the products you love in one place.
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-[#92003A] transition-colors hover:text-[#70002D]"
        >
          <ShoppingBag className="size-4" />
          Continue shopping
        </Link>
      </section>

      {/* Search and sorting */}
      {products.length > 0 && (
        <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search saved products..."
              aria-label="Search wishlist products"
              className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[#92003A] focus:ring-2 focus:ring-[#92003A]/10 dark:border-neutral-800 dark:bg-neutral-950 dark:text-white"
            />
          </div>

          <label className="flex h-11 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3.5 dark:border-neutral-800 dark:bg-neutral-950">
            <ArrowUpDown className="size-4 text-neutral-500" />
            <span className="text-sm text-neutral-500">Sort by</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="min-w-0 bg-transparent text-sm font-medium text-neutral-900 outline-none dark:text-white"
              aria-label="Sort wishlist products"
            >
              <option value="recent">Recently added</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </section>
      )}

      {notice && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-xl border border-[#92003A]/15 bg-[#92003A]/5 px-4 py-3 text-sm text-[#92003A]"
        >
          <span>{notice}</span>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="shrink-0 font-medium hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Product grid */}
      {filteredProducts.length > 0 ? (
        <section className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.id} className="group min-w-0">
              <div className="relative aspect-[0.82] overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
                <Link
                  href={`/products/${product.slug}`}
                  aria-label={`View ${product.name}`}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </Link>

                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="absolute left-3 top-3 rounded-md bg-white px-2 py-1 text-[11px] font-semibold text-[#92003A] shadow-sm">
                      SAVE{" "}
                      {Math.round(
                        (1 - product.price / product.originalPrice) * 100,
                      )}
                      %
                    </span>
                  )}

                <button
                  type="button"
                  onClick={() => removeProduct(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/95 text-[#92003A] shadow-sm transition hover:bg-[#92003A] hover:text-white"
                >
                  <Heart className="size-[17px] fill-current" />
                </button>

                {!product.inStock && (
                  <div className="absolute inset-x-0 bottom-0 bg-neutral-950/75 px-3 py-2.5 text-center text-xs font-medium text-white">
                    Currently unavailable
                  </div>
                )}
              </div>

              <div className="pt-3.5">
                <Link
                  href={`/products/${product.slug}`}
                  className="line-clamp-2 text-sm font-medium leading-5 text-neutral-900 transition-colors hover:text-[#92003A] dark:text-neutral-100 sm:text-base"
                >
                  {product.name}
                </Link>

                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-base font-semibold text-neutral-950 dark:text-white">
                    {formatPrice(product.price)}
                  </span>

                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <span className="text-xs text-neutral-400 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                </div>

                <p
                  className={`mt-2 text-xs ${
                    product.inStock
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-neutral-500"
                  }`}
                >
                  {product.inStock ? "In stock" : "Out of stock"}
                </p>

                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className="mt-3 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#92003A] px-3 text-xs font-semibold text-white transition hover:bg-[#76002F] disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-500 dark:disabled:bg-neutral-800 sm:text-sm"
                >
                  <ShoppingCart className="size-4" />
                  {product.inStock ? "Add to Cart" : "Unavailable"}
                </button>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="flex min-h-[340px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 px-5 py-12 text-center dark:border-neutral-800">
          <div className="flex size-16 items-center justify-center rounded-full bg-[#92003A]/10 text-[#92003A]">
            {products.length === 0 ? (
              <Heart className="size-7" />
            ) : (
              <Search className="size-7" />
            )}
          </div>

          <h2 className="mt-5 text-lg font-semibold text-neutral-950 dark:text-white">
            {products.length === 0
              ? "Your wishlist is empty"
              : "No products found"}
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
            {products.length === 0
              ? "Save products you love and come back to them whenever you like."
              : "Try another search term to find your saved products."}
          </p>

          {products.length === 0 ? (
            <Link
              href="/products"
              className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#92003A] px-5 text-sm font-semibold text-white transition hover:bg-[#76002F]"
            >
              <ShoppingBag className="size-4" />
              Explore products
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-5 text-sm font-medium text-[#92003A] hover:underline"
            >
              Clear search
            </button>
          )}
        </section>
      )}
    </main>
  );
}
