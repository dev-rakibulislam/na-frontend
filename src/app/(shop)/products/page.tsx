"use client";

import ProductCard from "@/components/product/ProductCard";
import { useState } from "react";


const products = [
  {
    id: "prod-001",
    name: "Premium Cotton Oversized T-Shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
    category: "Men's Fashion",
    price: 850,
    oldPrice: 1200,
    badge: "Sale",
  },
  {
    id: "prod-002",
    name: "Classic Minimal White Sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    category: "Footwear",
    price: 1850,
    oldPrice: 2200,
    badge: "Popular",
  },
  {
    id: "prod-003",
    name: "Elegant Everyday Shoulder Bag",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    category: "Accessories",
    price: 1450,
    oldPrice: null,
    badge: "New Arrival",
  },
  {
    id: "prod-004",
    name: "Premium Classic Wrist Watch",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800",
    category: "Watches",
    price: 2500,
    oldPrice: 3200,
    badge: "Best Seller",
  },
  {
    id: "prod-005",
    name: "Modern Casual Denim Jacket",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
    category: "Men's Fashion",
    price: 1950,
    oldPrice: 2400,
    badge: "Sale",
  },
  {
    id: "prod-006",
    name: "Everyday Essential Backpack",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
    category: "Bags",
    price: 1650,
    oldPrice: null,
    badge: "New",
  },
  {
    id: "prod-007",
    name: "Classic Black Sunglasses",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800",
    category: "Accessories",
    price: 650,
    oldPrice: 900,
    badge: "Trending",
  },
  {
    id: "prod-008",
    name: "Minimal Everyday Sneakers",
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=800",
    category: "Footwear",
    price: 1750,
    oldPrice: 2100,
    badge: "Popular",
  },
];



export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  return (
    <>
      {" "}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
        {products.map((product, index) => (
          <ProductCard
            key={product.id ?? product.id}
            product={product}
            index={index}
          />
        ))}
      </div>
    </>
  );
}
