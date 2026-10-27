"use client";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui";
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col ">
      the home page
      <Button>click me</Button>
      <ThemeToggle />
    </div>
  );
}
