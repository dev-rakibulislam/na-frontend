// ────────────────────────────────────────────────
//  Site Configuration
// ────────────────────────────────────────────────

export const siteConfig = {
  name: "ShopNest",
  description: "Your one-stop modern e-commerce store",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-image.png",
  currency: "USD",
  locale: "en-US",
  socials: {
    twitter: "https://twitter.com/shopnest",
    github: "https://github.com/shopnest",
    facebook: "https://facebook.com/shopnest",
    instagram: "https://instagram.com/shopnest",
  },
} as const;

