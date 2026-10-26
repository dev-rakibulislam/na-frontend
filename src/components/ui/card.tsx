import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ────────────────────────────────────────────────
//  Card — container component
// ────────────────────────────────────────────────

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white p-4 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn("mb-3", className)}>{children}</div>;
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn("", className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardProps) {
  return (
    <div className={cn("mt-3 flex items-center gap-2", className)}>
      {children}
    </div>
  );
}
