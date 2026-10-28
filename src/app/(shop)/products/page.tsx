
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpDown,
  Check,
  ChevronDown,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { demoProducts } from "@/config/demo-products";

type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  inStock: boolean;
};

const formatPrice = (price: number) => `৳${price.toLocaleString("en-BD")}`;

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [notice, setNotice] = useState("");

  // Convert demo product data into the shape used by this page.
  const products: Product[] = useMemo(
    () =>
      demoProducts.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        category: item.category,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.images?.[0] ?? "",
        isNew: false,
        inStock: item.stock > 0,
      })),
    [],
  );

  // Build categories from actual product data.
  const categories = useMemo(
    () => ["All", ...new Set(products.map((item) => item.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesMin = minPrice === "" || product.price >= Number(minPrice);

      const matchesMax = maxPrice === "" || product.price <= Number(maxPrice);

      const matchesStock = !inStockOnly || product.inStock;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMin &&
        matchesMax &&
        matchesStock
      );
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "new") {
      result.sort(
        (a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)),
      );
    }

    return result;
  }, [products, search, category, sort, minPrice, maxPrice, inStockOnly]);

  const toggleWishlist = (id: string) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("featured");
    setMinPrice("");
    setMaxPrice("");
    setInStockOnly(false);
  };

  const addToCart = (product: Product) => {
    // TODO: Connect this to your cart store or API.
    setNotice(`${product.name} selected. Connect your cart API to add it.`);
  };

  const FilterContent = () => (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-neutral-950 dark:text-white">
          Filters
        </h2>

        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-medium text-[#92003A] hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Categories
        </h3>

        <div className="space-y-1">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                category === item
                  ? "bg-[#92003A]/10 font-medium text-[#92003A]"
                  : "text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-900"
              }`}
            >
              {item}

              {category === item && <Check className="size-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
          Price range
        </h3>

        <div className="grid grid-cols-2 gap-2">
          <label>
            <span className="text-xs text-neutral-500">Minimum (৳)</span>

            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder="0"
              className="mt-1 h-10 w-full min-w-0 rounded-lg border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-[#92003A] dark:border-neutral-800 dark:bg-neutral-950"
            />
          </label>

          <label>
            <span className="text-xs text-neutral-500">Maximum (৳)</span>

            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="10000"
              className="mt-1 h-10 w-full min-w-0 rounded-lg border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-[#92003A] dark:border-neutral-800 dark:bg-neutral-950"
            />
          </label>
        </div>
      </div>

      {/* Stock filter */}
      <div className="border-t border-neutral-100 pt-5 dark:border-neutral-800">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-neutral-700 dark:text-neutral-300">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => setInStockOnly(event.target.checked)}
            className="size-4 accent-[#92003A]"
          />
          In-stock products only
        </label>
      </div>
    </div>
  );

  return (
    <main className="min-w-0 p-6">
      {/* Heading */}
      <section className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
            All Products
            <span className="text-[#92003A]">.</span>
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Discover products made for your everyday style.
          </p>
        </div>

        <Link
          href="/dashboard/wishlist"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-[#92003A] dark:text-neutral-300"
        >
          <Heart className="size-4" />
          Wishlist ({wishlist.length})
        </Link>
      </section>

      {/* Search and sorting */}
      <section className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products or categories..."
            aria-label="Search products"
            className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[#92003A] focus:ring-2 focus:ring-[#92003A]/10 dark:border-neutral-800 dark:bg-neutral-950"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 text-sm font-medium text-neutral-700 dark:border-neutral-800 dark:text-neutral-200 lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Filters
          </button>

          <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 dark:border-neutral-800 dark:bg-neutral-950 sm:flex-none">
            <ArrowUpDown className="size-4 shrink-0 text-neutral-500" />

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort products"
              className="min-w-0 flex-1 bg-transparent text-sm text-neutral-800 outline-none dark:text-neutral-100 sm:w-40"
            >
              <option value="featured">Featured</option>
              <option value="new">Newest first</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>

            <ChevronDown className="size-4 shrink-0 text-neutral-400" />
          </label>
        </div>
      </section>

      {/* Cart notice */}
      {notice && (
        <div
          role="status"
          className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-[#92003A]/15 bg-[#92003A]/5 px-4 py-3 text-sm text-[#92003A]"
        >
          <span>{notice}</span>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <div className="grid items-start gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
        {/* Desktop filters */}
        <aside className="sticky top-6 hidden rounded-xl border border-neutral-200 p-5 dark:border-neutral-800 lg:block">
          <FilterContent />
        </aside>

        {/* Product results */}
        <section className="min-w-0">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-neutral-500">
              <span className="font-semibold text-neutral-900 dark:text-white">
                {filteredProducts.length}
              </span>{" "}
              products found
            </p>

            <div className="hidden items-center gap-1 text-xs text-neutral-400 sm:flex">
              <span>Sort by</span>
              <ArrowDown className="size-3.5" />
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-10 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);

                const discount =
                  product.originalPrice && product.originalPrice > product.price
                    ? Math.round(
                        (1 - product.price / product.originalPrice) * 100,
                      )
                    : 0;

                return (
                  <article key={product.id} className="group min-w-0">
                    <div className="relative aspect-[0.8] overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
                      <Link
                        href={`/products/${product.slug}`}
                        aria-label={`View ${product.name}`}
                        className="absolute inset-0"
                      >
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 639px) 50vw, (max-width: 1279px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-neutral-400">
                            <ShoppingBag className="size-10" />
                          </div>
                        )}
                      </Link>

                      {discount > 0 && (
                        <span className="absolute left-2.5 top-2.5 rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-[#92003A] shadow-sm sm:left-3 sm:top-3 sm:text-xs">
                          -{discount}%
                        </span>
                      )}

                      {product.isNew && discount === 0 && (
                        <span className="absolute left-2.5 top-2.5 rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-neutral-800 shadow-sm sm:left-3 sm:top-3 sm:text-xs">
                          NEW
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        aria-label={
                          isWishlisted
                            ? `Remove ${product.name} from wishlist`
                            : `Add ${product.name} to wishlist`
                        }
                        aria-pressed={isWishlisted}
                        className={`absolute right-2.5 top-2.5 flex size-9 items-center justify-center rounded-full shadow-sm transition sm:right-3 sm:top-3 ${
                          isWishlisted
                            ? "bg-[#92003A] text-white"
                            : "bg-white/95 text-neutral-800 hover:bg-[#92003A] hover:text-white"
                        }`}
                      >
                        <Heart
                          className={`size-[17px] ${
                            isWishlisted ? "fill-current" : ""
                          }`}
                        />
                      </button>

                      {product.inStock ? (
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="absolute inset-x-2 bottom-2.5 flex h-10 translate-y-2 items-center justify-center gap-2 rounded-lg bg-white/95 text-xs font-semibold text-neutral-900 opacity-0 shadow-sm transition duration-200 hover:bg-[#92003A] hover:text-white group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 sm:inset-x-3 sm:bottom-3 sm:text-sm"
                        >
                          <ShoppingBag className="size-4" />
                          Add to cart
                        </button>
                      ) : (
                        <span className="absolute inset-x-0 bottom-0 bg-neutral-950/75 px-2 py-2.5 text-center text-xs font-medium text-white">
                          Out of stock
                        </span>
                      )}
                    </div>

                    <div className="pt-3.5">
                      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-400 sm:text-xs">
                        {product.category}
                      </p>

                      <Link
                        href={`/products/${product.slug}`}
                        className="line-clamp-2 text-sm font-medium leading-5 text-neutral-900 transition-colors hover:text-[#92003A] dark:text-neutral-100 sm:text-base"
                      >
                        {product.name}
                      </Link>

                      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-sm font-semibold text-neutral-950 dark:text-white sm:text-base">
                          {formatPrice(product.price)}
                        </span>

                        {product.originalPrice !== undefined &&
                          product.originalPrice > product.price && (
                            <span className="text-xs text-neutral-400 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 px-5 text-center dark:border-neutral-800">
              <div className="flex size-14 items-center justify-center rounded-full bg-[#92003A]/10 text-[#92003A]">
                <Search className="size-6" />
              </div>

              <h2 className="mt-4 font-semibold text-neutral-950 dark:text-white">
                No products found
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
                Try changing your search or filters to discover more products.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-lg bg-[#92003A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#76002F]"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="presentation"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div className="absolute inset-0 bg-black/40" />

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filter-title"
            className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-white p-5 dark:bg-neutral-950"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-7 flex items-center justify-between">
              <h2
                id="mobile-filter-title"
                className="text-lg font-semibold text-neutral-950 dark:text-white"
              >
                Filter products
              </h2>

              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="flex size-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800"
              >
                <X className="size-4" />
              </button>
            </div>

            <FilterContent />

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-8 h-11 w-full rounded-lg bg-[#92003A] text-sm font-semibold text-white hover:bg-[#76002F]"
            >
              Show {filteredProducts.length} products
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
