
export type DemoProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  sku: string;
  description: string;
  colors: {
    name: string;
    value: string;
  }[];
  sizes: string[];
  images: string[];
};

export const demoProducts: DemoProduct[] = [
  {
    id: "p-001",
    name: "Everyday Essential Sneakers",
    slug: "everyday-essential-sneakers",
    category: "Footwear",
    price: 2450,
    originalPrice: 2990,
    rating: 4.8,
    reviews: 124,
    stock: 18,
    sku: "FW-SNK-001",
    description:
      "Designed for everyday movement. These versatile sneakers combine a clean silhouette with a comfortable cushioned sole, making them an easy choice for daily wear.",
    colors: [
      { name: "Off White", value: "#F2EFE8" },
      { name: "Black", value: "#222222" },
      { name: "Olive", value: "#73785A" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1000&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=1000&auto=format&fit=crop&q=85",
    ],
  },
  {
    id: "p-002",
    name: "Classic Street Sneakers",
    slug: "classic-street-sneakers",
    category: "Footwear",
    price: 2190,
    originalPrice: 2690,
    rating: 4.6,
    reviews: 86,
    stock: 24,
    sku: "FW-SNK-002",
    description:
      "Classic street-style sneakers with a versatile design for everyday outfits and casual occasions.",
    colors: [
      { name: "White", value: "#F5F5F5" },
      { name: "Black", value: "#222222" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44"],
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1000&auto=format&fit=crop&q=85",
    ],
  },
  {
    id: "p-003",
    name: "Minimal Runner",
    slug: "minimal-runner",
    category: "Footwear",
    price: 2790,
    originalPrice: 3290,
    rating: 4.7,
    reviews: 93,
    stock: 15,
    sku: "FW-RUN-003",
    description:
      "Lightweight running-inspired shoes designed for comfort, movement and a clean everyday look.",
    colors: [
      { name: "Grey", value: "#A3A3A3" },
      { name: "Black", value: "#222222" },
      { name: "White", value: "#F5F5F5" },
    ],
    sizes: ["40", "41", "42", "43", "44"],
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1000&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=1000&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&auto=format&fit=crop&q=85",
    ],
  },
  {
    id: "p-004",
    name: "Daily Canvas Shoes",
    slug: "daily-canvas-shoes",
    category: "Footwear",
    price: 1890,
    originalPrice: 2290,
    rating: 4.5,
    reviews: 67,
    stock: 32,
    sku: "FW-CNV-004",
    description:
      "Easy-to-style canvas shoes with a relaxed silhouette, ideal for everyday wear and weekend outings.",
    colors: [
      { name: "Cream", value: "#E8DDC8" },
      { name: "Black", value: "#222222" },
    ],
    sizes: ["39", "40", "41", "42", "43"],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1000&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=1000&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&auto=format&fit=crop&q=85",
    ],
  },
  {
    id: "p-005",
    name: "Urban Classic Sneakers",
    slug: "urban-classic-sneakers",
    category: "Footwear",
    price: 2590,
    originalPrice: 3090,
    rating: 4.9,
    reviews: 152,
    stock: 12,
    sku: "FW-SNK-005",
    description:
      "A modern classic sneaker featuring a timeless profile that pairs effortlessly with everyday essentials.",
    colors: [
      { name: "White", value: "#F5F5F5" },
      { name: "Olive", value: "#73785A" },
    ],
    sizes: ["40", "41", "42", "43", "44"],
    images: [
      "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=1000&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1000&auto=format&fit=crop&q=85",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1000&auto=format&fit=crop&q=85",
    ],
  },
];
