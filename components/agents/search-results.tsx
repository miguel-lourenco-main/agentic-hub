"use client";

import { useMemo } from "react";
import { ArrowDownUp, Star, X } from "lucide-react";
import { agents } from "@/data/agents";
import { categories } from "@/data/categories";
import { AgentCard } from "@/components/agents/agent-card";
import { categoryAccentColor, categoryAccentTriple } from "@/lib/category-theme";
import {
  ALL_CATEGORIES,
  MIN_RATINGS,
  PRICE_RANGES,
  SORTS,
  applyAgentFilters,
  useAgentFilters,
  type SortKey,
} from "@/lib/agent-filters";
import { cn } from "@/lib/utils";

function matches(agent: (typeof agents)[number], words: string[]): boolean {
  if (words.length === 0) return true;
  const haystack = [agent.name, agent.description, agent.category]
    .join(" ")
    .toLowerCase();
  return words.some((w) => haystack.includes(w));
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-xs transition-colors",
        active
          ? "border-gold/50 bg-gold/10 text-gold"
          : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

export function SearchResults({ query }: { query: string }) {
  const { filters, update } = useAgentFilters();
  const { category, price, minRating, sort } = filters;

  const queryMatches = useMemo(() => {
    const words = query
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 1);
    return agents.filter((agent) => matches(agent, words));
  }, [query]);

  const results = useMemo(
    () => applyAgentFilters(queryMatches, filters),
    [queryMatches, filters]
  );

  // Category chips: only show categories that actually have a hit for this query
  // so the filter row stays relevant instead of listing empty buckets.
  const availableCategories = useMemo(() => {
    const present = new Set(queryMatches.map((a) => a.category));
    return categories.filter(
      (c) => c.name === ALL_CATEGORIES || present.has(c.name) || c.name === category
    );
  }, [queryMatches, category]);

  const hasFilters =
    category !== ALL_CATEGORIES || price !== null || minRating !== null;

  return (
    <div className="mb-16">
      <h2 className="font-heading text-2xl font-semibold tracking-tight mb-2">
        Search Results
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {results.length > 0
          ? `Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
          : `No results found for "${query}"${hasFilters ? " with these filters" : ""}`}
      </p>

      {/* Filter bar: category chips, price band, minimum rating and sort.
          All of it lives in the URL query so a filtered search is shareable. */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {availableCategories.map((c) => {
            const active = c.name === category;
            return (
              <button
                key={c.name}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  update({
                    category:
                      active || c.name === ALL_CATEGORIES ? ALL_CATEGORIES : c.name,
                  })
                }
                style={{ ["--accent" as string]: categoryAccentTriple(c.name) }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  active
                    ? "border-[rgb(var(--accent)/0.6)] text-[rgb(var(--accent))]"
                    : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:text-foreground"
                )}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: categoryAccentColor(c.name) }}
                />
                {c.name}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <div
              role="group"
              aria-label="Price per task"
              className="flex flex-wrap items-center gap-2"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60">
                Price
              </span>
              {PRICE_RANGES.map((p) => (
                <FilterChip
                  key={p.key}
                  active={price === p.key}
                  onClick={() => update({ price: price === p.key ? null : p.key })}
                >
                  {p.label}
                </FilterChip>
              ))}
            </div>
            <div
              role="group"
              aria-label="Minimum rating"
              className="flex flex-wrap items-center gap-2"
            >
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60">
                Rating
              </span>
              {MIN_RATINGS.map((r) => (
                <FilterChip
                  key={r}
                  active={minRating === r}
                  onClick={() => update({ minRating: minRating === r ? null : r })}
                >
                  <Star
                    className={cn(
                      "h-3 w-3",
                      minRating === r ? "fill-gold text-gold" : "fill-current"
                    )}
                  />
                  {r}+
                </FilterChip>
              ))}
            </div>
            {hasFilters && (
              <button
                type="button"
                onClick={() =>
                  update({ category: ALL_CATEGORIES, price: null, minRating: null })
                }
                className="inline-flex items-center gap-1 self-start text-xs text-muted-foreground hover:text-foreground sm:self-auto"
              >
                <X className="h-3 w-3" /> clear filters
              </button>
            )}
          </div>

          <label className="inline-flex items-center gap-2 self-start font-mono text-xs text-muted-foreground lg:self-auto">
            <ArrowDownUp className="h-3.5 w-3.5" />
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => update({ sort: e.target.value as SortKey })}
              className="cursor-pointer rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-foreground outline-none focus:border-gold/40"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key} className="bg-background">
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} variant="grid" />
          ))}
        </div>
      )}
    </div>
  );
}
