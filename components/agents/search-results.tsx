"use client";

import { useMemo, useState } from "react";
import { ArrowDownUp, X } from "lucide-react";
import { agents } from "@/data/agents";
import { categories } from "@/data/categories";
import { AgentCard } from "@/components/agents/agent-card";
import { categoryAccentColor, categoryAccentTriple } from "@/lib/category-theme";
import { cn } from "@/lib/utils";

type SortKey = "relevance" | "rating" | "price-asc" | "price-desc";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "relevance", label: "Relevance" },
  { key: "rating", label: "Top rated" },
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
];

function matches(agent: (typeof agents)[number], words: string[]): boolean {
  if (words.length === 0) return true;
  const haystack = [agent.name, agent.description, agent.category]
    .join(" ")
    .toLowerCase();
  return words.some((w) => haystack.includes(w));
}

export function SearchResults({ query }: { query: string }) {
  const [category, setCategory] = useState<string>("All Agents");
  const [sort, setSort] = useState<SortKey>("relevance");

  const results = useMemo(() => {
    const words = query
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 1);

    let list = agents.filter((agent) => matches(agent, words));

    if (category !== "All Agents") {
      list = list.filter((agent) => agent.category === category);
    }

    const sorted = [...list];
    if (sort === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sort === "price-asc") {
      sorted.sort((a, b) => a.billing.rate - b.billing.rate);
    } else if (sort === "price-desc") {
      sorted.sort((a, b) => b.billing.rate - a.billing.rate);
    }
    return sorted;
  }, [query, category, sort]);

  // Category chips: only show categories that actually have a hit for this query
  // so the filter row stays relevant instead of listing empty buckets.
  const availableCategories = useMemo(() => {
    const words = query
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 1);
    const present = new Set(
      agents.filter((a) => matches(a, words)).map((a) => a.category)
    );
    return categories.filter(
      (c) => c.name === "All Agents" || present.has(c.name)
    );
  }, [query]);

  return (
    <div className="mb-16">
      <h2 className="font-heading text-2xl font-semibold tracking-tight mb-2">
        Search Results
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        {results.length > 0
          ? `Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`
          : `No results found for "${query}"`}
      </p>

      {/* Filter bar: category chips + sort. Lets users narrow a broad query
          without leaving the results view. */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {availableCategories.map((c) => {
            const active = c.name === category;
            return (
              <button
                key={c.name}
                onClick={() => setCategory(c.name)}
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
          {category !== "All Agents" && (
            <button
              onClick={() => setCategory("All Agents")}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" /> clear
            </button>
          )}
        </div>

        <label className="inline-flex items-center gap-2 self-start font-mono text-xs text-muted-foreground sm:self-auto">
          <ArrowDownUp className="h-3.5 w-3.5" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
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
