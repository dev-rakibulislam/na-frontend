
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, ImageOff } from "lucide-react";
import { useState } from "react";

type ProductCardProps = {
  product: Record<string, any>;
  index?: number;
};

type ProductCardData = {
  id: string;
  name: string;
  image: string | null;
  category: string;
  price: number;
  oldPrice: number | null;
  badge: string | null;
};

function getProductCardData(product: Record<string, any>): ProductCardData {
  // Change these mappings to match your actual API response.
  const price = Number(
    product.price ??
      product.salePrice ??
      product.sellingPrice ??
      product.basePrice ??
      0,
  );

  const oldPriceValue =
    product.oldPrice ??
    product.compareAtPrice ??
    product.originalPrice ??
    product.regularPrice ??
    null;

  const rawImage =
    product.image ??
    product.thumbnail ??
    product.imageUrl ??
    product.images?.[0]?.url ??
    product.images?.[0] ??
    product.productImages?.[0]?.url ??
    null;

  return {
    id: String(product.id ?? product.slug ?? ""),
    name: String(product.name ?? product.title ?? "Untitled product"),
    image: typeof rawImage === "string" ? rawImage : (rawImage?.url ?? null),
    category:
      typeof product.category === "string"
        ? product.category
        : (product.category?.name ?? product.categoryName ?? "Products"),
    price,
    oldPrice:
      oldPriceValue != null && Number.isFinite(Number(oldPriceValue))
        ? Number(oldPriceValue)
        : null,
    badge: product.badge ?? product.label ?? null,
  };
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const item = getProductCardData(product);
  const href = `/products/${encodeURIComponent(item.id)}`;

  return (
    <article
      className="group min-w-0 animate-in fade-in duration-500"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative aspect-[0.82] overflow-hidden bg-neutral-100">
        <Link
          href={href}
          aria-label={`View ${item.name}`}
          className="absolute inset-0"
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <span className="flex h-full items-center justify-center text-neutral-400">
              <ImageOff size={32} strokeWidth={1.2} />
            </span>
          )}
        </Link>

        {item.badge && (
          <span className="absolute left-2 top-2 max-w-[75%] truncate bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-neutral-700 sm:left-3 sm:top-3 sm:text-[10px]">
            {item.badge}
          </span>
        )}

        <button
          type="button"
          aria-label={
            wishlisted
              ? `Remove ${item.name} from wishlist`
              : `Add ${item.name} to wishlist`
          }
          aria-pressed={wishlisted}
          onClick={() => setWishlisted((value) => !value)}
          className="absolute right-2 top-2 flex size-9 items-center justify-center bg-white/95 text-neutral-700 transition-colors hover:text-[#92003A] sm:right-3 sm:top-3"
        >
          <Heart
            size={17}
            className={wishlisted ? "fill-[#92003A] text-[#92003A]" : ""}
          />
        </button>

        <Link
          href={href}
          className="absolute inset-x-2 bottom-2 flex min-h-10 translate-y-2 items-center justify-center gap-2 bg-white text-xs font-semibold text-neutral-900 opacity-0 shadow-sm transition-all duration-300 hover:bg-[#92003A] hover:text-white group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 sm:inset-x-3 sm:bottom-3 sm:text-sm"
        >
          View product <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="pt-4">
        <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 sm:text-xs">
          {item.category}
        </p>

        <Link href={href}>
          <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-5 text-neutral-900 transition-colors hover:text-[#92003A] sm:text-base">
            {item.name}
          </h3>
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-neutral-950">
            ৳{item.price.toLocaleString("en-BD")}
          </span>

          {item.oldPrice != null && item.oldPrice > item.price && (
            <span className="text-xs text-neutral-400 line-through">
              ৳{item.oldPrice.toLocaleString("en-BD")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
