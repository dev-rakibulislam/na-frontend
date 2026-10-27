"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

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
    >
      {!mounted
        ? "Theme"
        : resolvedTheme === "dark"
          ? "Light Mode"
          : "Dark Mode"}
    </Button>
  );
}
