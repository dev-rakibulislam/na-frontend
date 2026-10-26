"use client";

import Link from "next/link";
import { Navbar, Footer } from "@/components/layout";
import { ProductCard } from "@/components/product";
import { useFeaturedProducts } from "@/hooks";
import { demoCategories } from "@/lib/demo-data";

export default function HomePage() {
  const { products, loading } = useFeaturedProducts(8);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 text-neutral-900">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-black text-white py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <span className="inline-block rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 mb-4 border border-blue-500/30">
              Mock Data Active ✨ Experience Full E-Commerce Flow
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Next-Gen Shopping Experience
            </h1>
            <p className="mt-4 text-base md:text-lg text-neutral-300 max-w-2xl mx-auto">
              Built with a clean layered architecture, modular services, reactive hooks, and mock/real API toggle.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/products"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-blue-700 transition"
              >
                Browse All Products
              </Link>
              <Link
                href="/cart"
                className="rounded-lg bg-white/10 backdrop-blur px-6 py-3 font-semibold text-white hover:bg-white/20 transition"
              >
                View Cart
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4 py-10 max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-800 shadow-sm hover:border-black transition"
            >
              All
            </Link>
            {demoCategories.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="rounded-full border border-neutral-300 bg-white px-5 py-2 text-sm font-medium text-neutral-800 shadow-sm hover:border-black transition"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
              <p className="text-sm text-neutral-500">Hand-picked selections for today</p>
            </div>
            <Link href="/products" className="text-sm font-medium text-blue-600 hover:underline">
              See all &rarr;
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-72 rounded-xl bg-neutral-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
