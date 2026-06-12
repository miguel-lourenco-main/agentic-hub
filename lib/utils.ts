import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Merge Tailwind classes; later utilities win over conflicting earlier ones.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}