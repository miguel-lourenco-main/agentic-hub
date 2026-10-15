"use client";

import { AnimatedSection } from "@/components/agents/animated-section";
import { CategoryTag } from "@/components/agents/category-tag";
import { categories } from "@/data/categories";
import { agents } from "@/data/agents";
import { ALL_CATEGORIES, useAgentFilters } from "@/lib/agent-filters";

export function CategoriesSection() {
  const { filters, update } = useAgentFilters();
  const { category } = filters;
  const shown =
    category === ALL_CATEGORIES
      ? agents.length
      : agents.filter((a) => a.category === category).length;

  return (
    <AnimatedSection className="mb-12">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
          Index
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-gold">{shown}</span> / {agents.length} agents
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {/* Chips filter the list below: a chip toggles its category, "All
            Agents" clears the filter. The choice is kept in ?category= so the
            filtered view is shareable. */}
        {categories.map((c, index) => {
          const active = c.name === category;
          return (
            <CategoryTag
              key={c.name}
              category={c}
              index={index}
              active={active}
              onClick={() =>
                update({
                  category:
                    active || c.name === ALL_CATEGORIES ? ALL_CATEGORIES : c.name,
                })
              }
            />
          );
        })}
      </div>
    </AnimatedSection>
  );
}
