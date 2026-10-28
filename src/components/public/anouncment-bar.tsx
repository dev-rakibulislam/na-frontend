"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-primary px-10 py-2 text-center text-sm text-white">
      <p>
        <span className="font-semibold">Special Offer:</span> Enjoy free
        delivery on selected orders.
        <Link
          className="ml-2 font-semibold underline underline-offset-4 hover:text-white/80"
          href="/products"
        >
          Shop Now
        </Link>
      </p>

      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 transition hover:bg-white/10"
      >
        <X className="size-4" />
      </button>
    </div>
  );
}
