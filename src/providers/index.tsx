"use client";
import type { ReactNode } from "react";
import QueryProvider from "./query.provider";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    // <ThemeProvider
    //   attribute="class"
    //   defaultTheme="system"
    //   enableSystem
    //   disableTransitionOnChange
    // >
    // </ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
  );
}
