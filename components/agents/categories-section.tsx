"use client";

// Category filter chips + agent count for the marketplace index header.
import { AnimatedSection } from "@/components/agents/animated-section";
import { CategoryTag } from "@/components/agents/category-tag";
import { categories } from "@/data/categories";
import { agents } from "@/data/agents";

export function CategoriesSection() {
  return (
    <AnimatedSection className="mb-12">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
          Index
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-gold">{agents.length}</span> / {agents.length} agents
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <CategoryTag key={category.name} category={category} index={index} />
        ))}
      </div>
    </AnimatedSection>
  );
}
