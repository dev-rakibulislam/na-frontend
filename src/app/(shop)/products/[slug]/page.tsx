"use client";

import { use, useState } from "react";
import Link from "next/link";

export default function ProductDetailPage() {


  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(undefined);
  const [addedNotice, setAddedNotice] = useState(false);

  return (
    <section className="container mx-auto px-4 py-12 max-w-5xl">
      <Link
        href="/products"
        className="text-xs text-neutral-500 hover:underline mb-6 inline-block"
      >
        &larr; Back to all products
      </Link>
    </section>
  );
}
