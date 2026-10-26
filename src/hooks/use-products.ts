"use client";

import { useState, useEffect, useCallback } from "react";
import type { Product, ProductFilters, PaginatedResponse } from "@/types";
import { productService } from "@/services";

// ────────────────────────────────────────────────
//  useProducts — paginated product list
// ────────────────────────────────────────────────

export function useProducts(initialFilters?: ProductFilters) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters ?? {});
  const [data, setData] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await productService.getAll(filters);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { data, loading, error, filters, setFilters, refetch: fetchProducts };
}

// ────────────────────────────────────────────────
//  useProduct — single product by slug or ID
// ────────────────────────────────────────────────

export function useProduct(slugOrId: string, bySlug = true) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const result = bySlug
          ? await productService.getBySlug(slugOrId)
          : await productService.getById(slugOrId);
        if (!cancelled) setProduct(result);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Product not found");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [slugOrId, bySlug]);

  return { product, loading, error };
}

// ────────────────────────────────────────────────
//  useFeaturedProducts
// ────────────────────────────────────────────────

export function useFeaturedProducts(limit = 8) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const result = await productService.getFeatured(limit);
        if (!cancelled) setProducts(result);
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { products, loading, error };
}
