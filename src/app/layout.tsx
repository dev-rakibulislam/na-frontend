import type { Metadata } from "next";
import {  Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { content } from "@/config/content";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: content.brand.name,
    template: `%s | ${content.brand.name}`,
  },
  description: content.brand.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        inter.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
