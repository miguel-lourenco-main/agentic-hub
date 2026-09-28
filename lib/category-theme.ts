// Per-category visual identity so the agents list page reads as distinct
// sections instead of one monotone wall. Each entry maps a category name to an
// accent (used for tints, borders, glows), a representative icon, and a short
// numeric label. Colors are expressed as raw RGB triples so they can drive both
// Tailwind arbitrary values and inline gradients.

export type CategoryTheme = {
  /** lucide-react icon name (consumed by DynamicIcon) */
  iconName: string;
  /** "r g b" triple for the accent color */
  accent: string;
  /** human-friendly accent label, e.g. for tooltips */
  label: string;
};

const THEMES: Record<string, CategoryTheme> = {
  "All Agents": { iconName: "layout-grid", accent: "247 147 26", label: "Gold" },
  Development: { iconName: "code", accent: "96 165 250", label: "Blue" },
  Analytics: { iconName: "bar-chart-3", accent: "52 211 153", label: "Emerald" },
  Content: { iconName: "pen-tool", accent: "232 121 198", label: "Pink" },
  "Customer Support": { iconName: "headphones", accent: "139 92 246", label: "Violet" },
  Research: { iconName: "flask-conical", accent: "251 191 36", label: "Amber" },
};

const FALLBACK: CategoryTheme = {
  iconName: "sparkles",
  accent: "247 147 26",
  label: "Gold",
};

export function getCategoryTheme(categoryName: string): CategoryTheme {
  return THEMES[categoryName] ?? FALLBACK;
}

/** CSS color string for the category accent. */
export function categoryAccentColor(categoryName: string, alpha = 1): string {
  const { accent } = getCategoryTheme(categoryName);
  return alpha >= 1 ? `rgb(${accent})` : `rgb(${accent} / ${alpha})`;
}

/**
 * Raw "r g b" triple for the accent — intended for a CSS custom property that
 * is later wrapped in `rgb(var(--accent) / <alpha>)` (e.g. Tailwind arbitrary
 * values like `border-[rgb(var(--accent)/0.4)]`).
 */
export function categoryAccentTriple(categoryName: string): string {
  return getCategoryTheme(categoryName).accent;
}
