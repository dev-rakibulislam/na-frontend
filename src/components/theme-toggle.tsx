"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon,  Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      isDisabled={!mounted}
      aria-label={
        resolvedTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
      className="group inline-flex size-9 items-center justify-center rounded-full bg-background p-0 border-none shadow-sm transition-transform duration-200 hover:bg-transparent active:scale-95 dark:border-neutral-700"
    >
      {!mounted ? (
        <Sun className="size-5" />
      ) : resolvedTheme === "dark" ? (
        <Sun className="size-5 text-primary transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="size-5 text-primary transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </Button>
  );
}
