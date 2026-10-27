// ────────────────────────────────────────────────
//  Site Configuration
// ────────────────────────────────────────────────

export const siteConfig = {
  name: "na",
  description: "Your one-stop modern e-commerce store",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og-image.png",
  currency: "BDT",
  locale: "DB",
  socials: {
    twitter: "https://twitter.com/na",
    github: "https://github.com/na",
    facebook: "https://facebook.com/na",
    instagram: "https://instagram.com/na",
  },
} as const;
