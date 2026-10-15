"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Agent } from "@/lib/interfaces";

/**
 * Marketplace filters, kept in the URL query (?category=&price=&rating=&sort=)
 * so a filtered view is shareable and survives a refresh. Everything is read
 * on the client, which keeps it working in the static export.
 */

export const ALL_CATEGORIES = "All Agents";

export type SortKey = "relevance" | "rating" | "price-asc" | "price-desc";

export const SORTS: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "rating", label: "Top rated" },
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
];

// Agent rates run from 0.005 to 0.05 SOL, so three preset bands split the
// catalogue into roughly budget / standard / premium tiers.
export type PriceKey = "low" | "mid" | "high";

export const PRICE_RANGES: {
  key: PriceKey;
  label: string;
  test: (rate: number) => boolean;
}[] = [
  { key: "low", label: "< 0.015 SOL", test: (r) => r < 0.015 },
  { key: "mid", label: "0.015–0.03 SOL", test: (r) => r >= 0.015 && r <= 0.03 },
  { key: "high", label: "> 0.03 SOL", test: (r) => r > 0.03 },
];

// Ratings sit between 4.2 and 4.9; these thresholds each cut meaningfully.
export const MIN_RATINGS = [4.5, 4.7, 4.8] as const;

export interface AgentFilters {
  category: string;
  price: PriceKey | null;
  minRating: number | null;
  sort: SortKey;
}

function parseFilters(params: URLSearchParams | null): AgentFilters {
  const category = params?.get("category") || ALL_CATEGORIES;
  const priceRaw = params?.get("price");
  const price = PRICE_RANGES.some((p) => p.key === priceRaw)
    ? (priceRaw as PriceKey)
    : null;
  const ratingRaw = Number(params?.get("rating"));
  const minRating = (MIN_RATINGS as readonly number[]).includes(ratingRaw)
    ? ratingRaw
    : null;
  const sortRaw = params?.get("sort");
  const sort = SORTS.some((s) => s.key === sortRaw)
    ? (sortRaw as SortKey)
    : "relevance";
  return { category, price, minRating, sort };
}

export function applyAgentFilters(
  list: Agent[],
  { category, price, minRating, sort }: AgentFilters
): Agent[] {
  const priceTest = PRICE_RANGES.find((p) => p.key === price)?.test;
  const filtered = list.filter(
    (a) =>
      (category === ALL_CATEGORIES || a.category === category) &&
      (!priceTest || priceTest(a.billing.rate)) &&
      (minRating === null || a.rating >= minRating)
  );
  if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
  else if (sort === "price-asc")
    filtered.sort((a, b) => a.billing.rate - b.billing.rate);
  else if (sort === "price-desc")
    filtered.sort((a, b) => b.billing.rate - a.billing.rate);
  return filtered;
}

export function useAgentFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname() ?? "/agents/";
  const paramString = searchParams?.toString() ?? "";

  const filters = useMemo(
    () => parseFilters(new URLSearchParams(paramString)),
    [paramString]
  );

  const update = useCallback(
    (patch: Partial<AgentFilters>) => {
      const next = { ...filters, ...patch };
      const params = new URLSearchParams(paramString);
      const set = (key: string, value: string | null) => {
        if (value === null) params.delete(key);
        else params.set(key, value);
      };
      set("category", next.category === ALL_CATEGORIES ? null : next.category);
      set("price", next.price);
      set("rating", next.minRating === null ? null : String(next.minRating));
      set("sort", next.sort === "relevance" ? null : next.sort);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [filters, paramString, pathname, router]
  );

  return { filters, update };
}
