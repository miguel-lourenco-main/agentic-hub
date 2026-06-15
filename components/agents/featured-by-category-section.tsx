"use client";

// Horizontal carousels per category — skips the synthetic "All Agents" bucket.
import { AnimatedSection } from "@/components/agents/animated-section";
import { ScrollableList } from "@/components/ui/scrollable-list";
import { AssetCard } from "@/components/home/asset-card";
import { categories } from "@/data/categories";
import { agents } from "@/data/agents";

export function FeaturedByCategorySection() {
  const getFeaturedAgentsForCategory = (categoryName: string) =>
    agents.filter((agent) => agent.category === categoryName);

  return (
    <>
      {categories.slice(1).map((category, categoryIndex) => {
        const featuredAgents = getFeaturedAgentsForCategory(category.name);
        if (featuredAgents.length === 0) return null;
        const idx = String(categoryIndex + 1).padStart(2, "0");

        return (
          <AnimatedSection as="section" key={category.name} className="mb-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
                  <span className="text-gold">{idx}</span>
                  <span className="h-px w-8 bg-white/15" />
                  {category.description}
                </p>
                <h2
                  id={category.name.toLowerCase().replace(/\s+/g, "-")}
                  className="mt-2 scroll-mt-24 font-heading text-3xl font-semibold tracking-tight"
                >
                  {category.name}
                </h2>
              </div>
              <span className="hidden font-mono text-sm text-muted-foreground sm:inline">
                {featuredAgents.length} agents
              </span>
            </div>
            <ScrollableList className="mx-4">
              {featuredAgents.map((agent) => (
                <div key={agent.id} className="min-w-[340px] max-w-[340px]">
                  <AssetCard agent={agent} />
                </div>
              ))}
            </ScrollableList>
          </AnimatedSection>
        );
      })}
    </>
  );
}
