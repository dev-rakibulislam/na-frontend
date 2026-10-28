"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { DemoProduct, demoProducts } from "@/config/demo-products";

const relatedProducts = [
  {
    id: "related-1",
    name: "Classic Essential Tee",
    slug: "classic-essential-tee",
    category: "T-Shirts",
    price: 850,
    originalPrice: 1100,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "related-2",
    name: "Everyday Oversized Tee",
    slug: "everyday-oversized-tee",
    category: "T-Shirts",
    price: 1050,
    originalPrice: 1350,
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "related-3",
    name: "Minimal Cotton Shirt",
    slug: "minimal-cotton-shirt",
    category: "Shirts",
    price: 1450,
    originalPrice: 1800,
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: "related-4",
    name: "Modern Casual Shirt",
    slug: "modern-casual-shirt",
    category: "Shirts",
    price: 1650,
    originalPrice: 2000,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=700&q=80",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  })
    .format(price)
    .replace("BDT", "৳");

export default function ProductDetailsPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const product = demoProducts.find((item) => item.slug === slug);

  if (!product) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-5 text-center">
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#92003A]/5 text-[#92003A]">
          <ShoppingBag size={34} strokeWidth={1.5} />
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#92003A]">
          Product not found
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950">
          This item is unavailable
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
          The product may have been removed or the link may be incorrect.
        </p>

        <Link
          href="/products"
          className="mt-7 inline-flex items-center gap-2 bg-[#92003A] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#72002D]"
        >
          <ArrowLeft size={16} />
          Browse products
        </Link>
      </main>
    );
  }

  return <ProductDetailsContent product={product} />;
}

function ProductDetailsContent({ product }: { product: DemoProduct }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] ?? null);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const discount =
    product.originalPrice > 0
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((current) => current + 1);
    }
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleAddToCart = () => {
    if (product.stock < 1) {
      setCartMessage("This product is currently out of stock.");
      return;
    }

    if (product.sizes.length > 0 && !selectedSize) {
      setCartMessage("Please select a size first.");
      return;
    }

    setCartMessage(`${quantity} × ${product.name} added to your cart.`);

    // Connect your cart API or cart state here.
  };

  const handleWishlist = () => {
    setIsWishlisted((current) => !current);

    // Connect your wishlist API here.
  };

  const images = product.images ?? [];

  return (
    <main className="bg-white text-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-xs text-neutral-500"
        >
          <Link href="/" className="transition hover:text-[#92003A]">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="transition hover:text-[#92003A]">
            Products
          </Link>
          <span>/</span>
          <span className="text-neutral-900">{product.name}</span>
        </nav>

        {/* Product */}
        <section className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="min-w-0">
            <div className="relative overflow-hidden bg-neutral-100">
              {images.length > 0 ? (
                <div className="relative aspect-[4/5]">
                  <Image
                    key={images[activeImage]}
                    src={images[activeImage]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition duration-500"
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/5] items-center justify-center text-neutral-400">
                  <ShoppingBag size={48} strokeWidth={1} />
                </div>
              )}

              {discount > 0 && (
                <span className="absolute left-4 top-4 bg-[#92003A] px-3 py-1.5 text-xs font-semibold tracking-wide text-white">
                  SAVE {discount}%
                </span>
              )}

              <button
                type="button"
                onClick={handleWishlist}
                aria-label={
                  isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
                aria-pressed={isWishlisted}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white transition hover:bg-[#92003A] hover:text-white"
              >
                <Heart
                  size={18}
                  className={
                    isWishlisted ? "fill-[#92003A] text-[#92003A]" : ""
                  }
                />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() =>
                      setActiveImage((current) =>
                        current === 0 ? images.length - 1 : current - 1,
                      )
                    }
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 transition hover:bg-white"
                  >
                    <ArrowLeft size={17} />
                  </button>

                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() =>
                      setActiveImage((current) =>
                        current === images.length - 1 ? 0 : current + 1,
                      )
                    }
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 transition hover:bg-white"
                  >
                    <ArrowRight size={17} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                      index
                    }`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={activeImage === index}
                    className={`relative aspect-[4/5] overflow-hidden bg-neutral-100 ${
                      activeImage === index
                        ? "ring-2 ring-[#92003A] ring-offset-2"
                        : "opacity-70 transition hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex min-w-0 flex-col pt-1 lg:pt-4">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#92003A]">
                {product.category}
              </span>

              <span className="h-px w-8 bg-neutral-300" />

              <span className="text-xs text-neutral-500">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[42px]">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < Math.round(product.rating)
                        ? "text-base"
                        : "text-base text-neutral-200"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>

              <span className="text-sm font-medium">
                {product.rating.toFixed(1)}
              </span>

              <span className="text-sm text-neutral-400">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-semibold tracking-tight">
                {formatPrice(product.price)}
              </span>

              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-neutral-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>

                  <span className="bg-[#92003A]/5 px-2.5 py-1 text-xs font-semibold text-[#92003A]">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="my-7 h-px bg-neutral-200" />

            {/* Description */}
            <p className="max-w-xl text-sm leading-7 text-neutral-600">
              {product.description}
            </p>

            {/* Color */}
            {product.colors.length > 0 && (
              <div className="mt-8">
                <div className="mb-4 flex items-center gap-2 text-sm">
                  <span className="font-semibold">Color:</span>
                  <span className="text-neutral-500">
                    {selectedColor?.name ?? "Select a color"}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    const isSelected = selectedColor?.value === color.value;

                    return (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select ${color.name} color`}
                        aria-pressed={isSelected}
                        title={color.name}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-[#92003A] ring-2 ring-[#92003A] ring-offset-2"
                            : "border-neutral-300"
                        }`}
                      >
                        <span
                          className="h-7 w-7 rounded-full border border-black/10"
                          style={{ backgroundColor: color.value }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes.length > 0 && (
              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold">Select size</span>
                  <button
                    type="button"
                    onClick={() =>
                      setCartMessage(
                        "Check the product description for sizing information.",
                      )
                    }
                    className="text-xs text-neutral-500 underline underline-offset-4 transition hover:text-[#92003A]"
                  >
                    Size guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      aria-pressed={selectedSize === size}
                      className={`flex h-11 min-w-12 items-center justify-center border px-4 text-sm transition ${
                        selectedSize === size
                          ? "border-[#92003A] bg-[#92003A] text-white"
                          : "border-neutral-200 hover:border-neutral-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock */}
            <div className="mt-7 flex items-center gap-2 text-sm">
              {product.stock > 0 ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-neutral-600">In stock</span>
                  <span className="text-neutral-400">
                    ({product.stock} available)
                  </span>
                </>
              ) : (
                <>
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-red-600">Out of stock</span>
                </>
              )}
            </div>

            {/* Quantity and cart */}
            <div className="mt-6 grid grid-cols-[120px_1fr] gap-3 sm:grid-cols-[140px_1fr]">
              <div className="flex h-12 items-center justify-between border border-neutral-200">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-full w-9 items-center justify-center text-neutral-600 transition hover:text-[#92003A] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Minus size={15} />
                </button>

                <span className="text-sm font-medium tabular-nums">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  aria-label="Increase quantity"
                  className="flex h-full w-9 items-center justify-center text-neutral-600 transition hover:text-[#92003A] disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock < 1}
                className="flex h-12 items-center justify-center gap-2 bg-[#92003A] px-5 text-sm font-semibold text-white transition hover:bg-[#72002D] disabled:cursor-not-allowed disabled:bg-neutral-300"
              >
                <ShoppingBag size={17} />
                {product.stock > 0 ? "Add to cart" : "Out of stock"}
              </button>
            </div>

            {cartMessage && (
              <div
                role="status"
                className="mt-4 flex items-start gap-2 border border-[#92003A]/15 bg-[#92003A]/5 p-3 text-sm text-[#92003A]"
              >
                <Check size={17} className="mt-0.5 shrink-0" />
                <span>{cartMessage}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleWishlist}
              className="mt-4 flex items-center justify-center gap-2 border border-neutral-200 py-3 text-sm font-medium transition hover:border-[#92003A] hover:text-[#92003A]"
            >
              <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
              {isWishlisted ? "Added to wishlist" : "Add to wishlist"}
            </button>

            {/* Benefits */}
            <div className="mt-8 border-y border-neutral-200">
              <div className="flex items-start gap-4 border-b border-neutral-200 py-5">
                <Truck
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#92003A]"
                />
                <div>
                  <p className="text-sm font-semibold">
                    Delivery across Bangladesh
                  </p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Delivery charges and estimated arrival are shown during
                    checkout.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-neutral-200 py-5">
                <RotateCcw
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#92003A]"
                />
                <div>
                  <p className="text-sm font-semibold">Easy return policy</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Return eligibility is subject to the store&apos;s return
                    policy.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-5">
                <ShieldCheck
                  size={20}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-[#92003A]"
                />
                <div>
                  <p className="text-sm font-semibold">Secure checkout</p>
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    Your order details are handled through the store&apos;s
                    checkout process.
                  </p>
                </div>
              </div>
            </div>

            {/* Product metadata */}
            <div className="mt-6 space-y-2 text-xs text-neutral-500">
              <p>
                <span className="font-semibold text-neutral-800">
                  Category:
                </span>{" "}
                {product.category}
              </p>
              <p>
                <span className="font-semibold text-neutral-800">
                  Product ID:
                </span>{" "}
                {product.id}
              </p>
            </div>
          </div>
        </section>

        {/* Related products */}
        <section className="mt-20 border-t border-neutral-200 pt-12 sm:mt-28">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#92003A]">
                Complete your look
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                You may also like
              </h2>
            </div>

            <Link
              href="/products"
              className="hidden items-center gap-2 text-sm font-medium transition hover:text-[#92003A] sm:inline-flex"
            >
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {relatedProducts
              .filter((item) => item.slug !== product.slug)
              .map((item) => (
                <article key={item.id} className="group min-w-0">
                  <Link href={`/products/${item.slug}`} className="block">
                    <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      />

                      {item.originalPrice > item.price && (
                        <span className="absolute left-2 top-2 bg-white px-2 py-1 text-[10px] font-semibold text-[#92003A] sm:left-3 sm:top-3 sm:text-xs">
                          SALE
                        </span>
                      )}
                    </div>

                    <div className="pt-4">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-neutral-500 sm:text-xs">
                        {item.category}
                      </p>

                      <h3 className="mt-2 line-clamp-2 text-sm font-medium transition group-hover:text-[#92003A] sm:text-base">
                        {item.name}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">
                          {formatPrice(item.price)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-xs text-neutral-400 line-through">
                            {formatPrice(item.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
          </div>

          <Link
            href="/products"
            className="mt-8 flex items-center justify-center gap-2 border border-neutral-200 py-3 text-sm font-medium transition hover:border-[#92003A] hover:text-[#92003A] sm:hidden"
          >
            View all products
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}
