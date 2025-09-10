import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 

export const DEBUG = false//process.env.NODE_ENV !== "production";

export const log = (...args: any[]) => {
  if (DEBUG) console.log("[Utils]", ...args);
};