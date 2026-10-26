"use client";

import { useState } from "react";
import { useProducts } from "@/hooks";
import { ProductCard } from "@/components/product";
import { demoCategories } from "@/lib/demo-data";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const { data, loading, setFilters } = useProducts({
    limit: 12,
  });

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setFilters((prev) => ({
      ...prev,
      category: cat || undefined,
      page: 1,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    setFilters((prev) => ({
      ...prev,
      search: val || undefined,
      page: 1,
    }));
  };

  return (
    <section className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Our Catalog</h1>
        <p className="mt-1 text-neutral-500">Discover everything available in our store</p>

        {/* Filter Controls */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search products by title or tag..."
            className="w-full sm:w-80 rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:border-black focus:outline-none"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("")}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                !selectedCategory
                  ? "bg-black text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              All
            </button>
            {demoCategories.map((c) => (
              <button
                key={c}
                onClick={() => handleCategoryChange(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === c
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-72 rounded-xl bg-neutral-200 animate-pulse" />
          ))}
        </div>
      ) : !data || data.data.length === 0 ? (
        <div className="py-20 text-center text-neutral-500">
          <p className="text-lg">No products found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {data.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
