// Brand color constants for canvas / WebGL / JS use.
// Keep in sync with app/globals.css design tokens.

export const BRAND = {
  bg: "#050507",
  gold: "#f7931a",
  goldLight: "#fbbf24",
  goldDeep: "#ea580c",
  violet: "#8b5cf6",
  violetLight: "#c4b5fd",
  success: "#22c55e",
} as const;

// Normalized RGB triplets (0..1) for three.js Color-free math / shaders.
export const RGB = {
  gold: [0.969, 0.576, 0.102] as [number, number, number],
  violet: [0.545, 0.361, 0.965] as [number, number, number],
  goldLight: [0.984, 0.749, 0.141] as [number, number, number],
} as const;
