import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Locale-independent thousands separator. `toLocaleString()` differs between
 * the build host (Node, en-US) and the browser (system locale), which breaks
 * static-export hydration. Use this in any server-rendered number.
 */
export function formatInt(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}