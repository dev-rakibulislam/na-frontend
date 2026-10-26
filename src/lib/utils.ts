import { type ClassValue, clsx } from "clsx";

// ────────────────────────────────────────────────
//  General Utilities
// ────────────────────────────────────────────────

/** Merge Tailwind classes safely (install clsx: npm i clsx) */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Delay for the given number of milliseconds */
export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/** Generate a simple client-side unique ID */
export function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Truncate text to a max length with an ellipsis */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}
