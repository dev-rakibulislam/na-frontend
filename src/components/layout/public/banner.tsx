
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Headphones,
  Heart,
  LockKeyhole,
  PackageCheck,

  Sparkles,
  Truck,
} from "lucide-react";

const primary = "#92003A";

const categories = [
  {
    name: "Fashion",
    count: "Explore collection",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85",
    href: "/products?category=fashion",
  },
  {
    name: "Accessories",
    count: "Everyday essentials",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
    href: "/products?category=accessories",
  },
  {
    name: "Footwear",
    count: "Step into style",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    href: "/products?category=footwear",
  },
  {
    name: "Lifestyle",
    count: "Made for everyday",
    image:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=700&q=85",
    href: "/products?category=lifestyle",
  },
];

const products = [
  {
    id: 1,
    name: "Everyday Classic Sneakers",
    category: "Footwear",
    price: 2490,
    oldPrice: 3200,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    name: "Minimal Everyday Watch",
    category: "Accessories",
    price: 1850,
    oldPrice: null,
    badge: "POPULAR",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    name: "Essential Daily Backpack",
    category: "Lifestyle",
    price: 1650,
    oldPrice: 2100,
    badge: "SALE",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    name: "Modern Crossbody Bag",
    category: "Fashion",
    price: 2190,
    oldPrice: null,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85",
  },
];

const benefits = [
  {
    icon: Truck,
    title: "Reliable Delivery",
    text: "Your order, delivered to your doorstep.",
  },
  {
    icon: LockKeyhole,
    title: "Secure Checkout",
    text: "A safer shopping experience from start to finish.",
  },
  {
    icon: PackageCheck,
    title: "Quality Products",
    text: "Carefully selected everyday essentials.",
  },
  {
    icon: Headphones,
    title: "Here to Help",
    text: "Support when you need a hand.",
  },
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reducedMotion ? 0 : 0.65,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-9 flex flex-col gap-3 md:mb-12">
      <p
        className="text-xs font-bold uppercase tracking-[0.22em]"
        style={{ color: primary }}
      >
        {eyebrow}
      </p>
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <p className="max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
        {description}
      </p>
    </div>
  );
}

export default function Banner() {
  const reducedMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-white text-neutral-950">
    
        <div className="border-t border-neutral-200/80 bg-white/80">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 text-[10px] font-semibold tracking-[0.18em] text-neutral-400 sm:px-8 sm:text-xs lg:px-12">
            <span>DISCOVER MORE</span>
            <span className="flex items-center gap-2">
              SCROLL TO EXPLORE <ArrowDownRight size={15} />
            </span>
          </div>
        </div>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <Reveal>
          <SectionHeading
            eyebrow="Find your favorites"
            title="A little something for everyone."
            description="Explore thoughtfully selected collections and find something that fits your everyday."
          />
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.name} delay={index * 0.08}>
              <Link href={category.href} className="group block">
                <div className="relative aspect-[0.83] overflow-hidden bg-neutral-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
                    <h3 className="text-lg font-semibold sm:text-xl">
                      {category.name}
                    </h3>
                    <p className="mt-1 flex items-center justify-between gap-2 text-xs text-white/80">
                      {category.count}
                      <ArrowUpRight
                        size={17}
                        className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      />
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-[#faf8f7]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28 lg:px-12">
          <Reveal>
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <SectionHeading
                eyebrow="The community favorites"
                title="Worth a closer look."
                description="Everyday essentials selected to fit your style."
              />
              <Link
                href="/products"
                className="mb-10 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#92003A] hover:gap-3"
              >
                View all products <ArrowRight size={17} />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-4">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.07}>
                <article className="group min-w-0">
                  <div className="relative aspect-[0.82] overflow-hidden bg-white">
                    <Link
                      href={`/products/${product.id}`}
                      aria-label={`View ${product.name}`}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    <span className="absolute left-2 top-2 bg-white px-2 py-1 text-[9px] font-bold tracking-wider text-neutral-700 sm:left-3 sm:top-3 sm:text-[10px]">
                      {product.badge}
                    </span>

                    <button
                      type="button"
                      aria-label={`Add ${product.name} to wishlist`}
                      className="absolute right-2 top-2 flex size-9 items-center justify-center bg-white/95 text-neutral-700 transition-colors hover:text-[#92003A] sm:right-3 sm:top-3"
                    >
                      <Heart size={17} />
                    </button>

                    <Link
                      href={`/products/${product.id}`}
                      className="absolute inset-x-2 bottom-2 flex min-h-10 translate-y-2 items-center justify-center gap-2 bg-white text-xs font-semibold opacity-0 shadow-sm transition-all duration-300 hover:bg-[#92003A] hover:text-white group-hover:translate-y-0 group-hover:opacity-100 sm:inset-x-3 sm:bottom-3 sm:text-sm"
                    >
                      View product <ArrowUpRight size={15} />
                    </Link>
                  </div>

                  <div className="pt-4">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400 sm:text-xs">
                      {product.category}
                    </p>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-5 text-neutral-900 transition-colors hover:text-[#92003A] sm:text-base">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-neutral-950">
                        ৳{product.price.toLocaleString("en-BD")}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          ৳{product.oldPrice.toLocaleString("en-BD")}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional banner */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <Reveal>
          <div className="relative grid overflow-hidden bg-[#92003A] text-white md:grid-cols-2">
            <div className="relative z-10 flex flex-col items-start justify-center p-7 sm:p-12 lg:p-16">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                A better everyday
              </p>
              <h2 className="mt-5 max-w-md text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Your next favorite is waiting.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
                Find pieces you will reach for again and again. Good design,
                everyday usefulness, and a little something special.
              </p>
              <Link
                href="/products"
                className="group mt-8 inline-flex min-h-12 items-center gap-3 bg-white px-6 text-sm font-semibold text-[#92003A] transition-colors hover:bg-neutral-100"
              >
                Explore the collection
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="relative min-h-[270px] overflow-hidden bg-[#79002f] md:min-h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85"
                alt="A curated retail collection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-85 transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#92003A]/35 to-transparent" />
              <div className="absolute bottom-5 right-5 border border-white/40 bg-white/10 px-4 py-3 text-xs font-semibold tracking-wide backdrop-blur-sm sm:bottom-8 sm:right-8">
                MADE FOR YOUR EVERYDAY
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* New arrivals */}
      <section className="border-y border-neutral-100">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-[0.8fr_1.2fr] md:items-center md:py-20 lg:px-12">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#92003A]">
              Just landed
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Fresh finds.
              <br />
              First dibs.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-neutral-500">
              Meet the latest additions to our collection. Discover something
              new and make it your own.
            </p>
            <Link
              href="/products?sort=newest"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#92003A]"
            >
              Shop new arrivals <ArrowRight size={17} />
            </Link>
          </Reveal>

          <Reveal delay={0.15}>
            <Link href="/products?sort=newest" className="group block">
              <div className="relative aspect-[1.6] overflow-hidden bg-neutral-100 sm:aspect-[1.9]">
                <Image
                  src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1100&q=85"
                  alt="New season footwear"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <div className="absolute bottom-5 left-5 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                      NEW SEASON
                    </span>
                    <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                      The latest edit
                    </h3>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#92003A]">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
        <div className="grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-4 md:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <Reveal key={benefit.title} delay={index * 0.07}>
                <div className="flex flex-col items-start">
                  <div className="flex size-11 items-center justify-center border border-[#92003A]/15 bg-[#92003A]/[0.04] text-[#92003A]">
                    <Icon size={21} strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold sm:text-base">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-neutral-500 sm:text-sm">
                    {benefit.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#faf8f7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 md:grid-cols-2 md:items-center md:py-20 lg:px-12">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#92003A]">
              Stay in the loop
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Good things, occasionally.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-neutral-500">
              Get updates on new arrivals, thoughtful picks, and special offers.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <form
              action="/newsletter"
              method="get"
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const input = form.elements.namedItem(
                  "email",
                ) as HTMLInputElement | null;

                if (!input?.checkValidity()) {
                  input?.reportValidity();
                  return;
                }

                window.location.href = `/newsletter?email=${encodeURIComponent(input.value)}`;
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
                className="min-h-12 min-w-0 flex-1 border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-[#92003A] focus:ring-2 focus:ring-[#92003A]/10"
              />
              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#92003A] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#72002d]"
              >
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
            <p className="mt-3 text-xs text-neutral-400">
              By subscribing, you agree to receive occasional store updates.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
