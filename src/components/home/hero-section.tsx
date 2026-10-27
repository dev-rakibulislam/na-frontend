
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    eyebrow: "THE NEW COLLECTION",
    title: "Discover Your Style.",
    description:
      "Explore the latest collection, thoughtfully selected for your everyday.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=90",
    position: "center 42%",
  },
  {
    eyebrow: "MADE FOR EVERYDAY",
    title: "Little Things. Big Difference.",
    description:
      "Find the pieces that make every day feel a little more special.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=90",
    position: "center 50%",
  },
  {
    eyebrow: "THE LATEST EDIT",
    title: "Something New Awaits.",
    description: "Meet your next favorites in our latest collection.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90",
    position: "center 35%",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const slide = slides[active];

  return (
    <section className="relative isolate h-[calc(100svh-200px)] min-h-[520px] w-full overflow-hidden bg-neutral-950 sm:min-h-[600px]">
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={reducedMotion ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 5.5,
              ease: "linear",
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={active === 0}
              sizes="100vw"
              style={{ objectPosition: slide.position }}
              className="object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex h-full items-center px-6 sm:px-12 lg:px-20 xl:px-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: reducedMotion ? 0 : 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-3xl text-white"
          >
            <p className="text-xs font-semibold tracking-[0.3em] text-white/85 sm:text-sm">
              {slide.eyebrow}
            </p>

            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
              {slide.title}
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              {slide.description}
            </p>

            <a
              href="/products"
              className="mt-9 inline-flex min-h-13 items-center gap-3 bg-[#92003A] px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#72002d]"
            >
              Shop collection
              <ArrowRight size={18} />
            </a>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-7 left-6 z-20 flex items-center gap-3 sm:bottom-10 sm:left-12 lg:left-20 xl:left-28">
        {slides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            aria-current={active === index ? "true" : undefined}
            onClick={() => setActive(index)}
            className={`h-1 transition-all duration-500 ${
              active === index
                ? "w-12 bg-white"
                : "w-6 bg-white/45 hover:bg-white/75"
            }`}
          />
        ))}
        <span className="ml-2 text-xs tracking-widest text-white/80">
          0{active + 1} / 0{slides.length}
        </span>
      </div>
    </section>
  );
}
