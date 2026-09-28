"use client";

import { AnimatedSection } from "@/components/agents/animated-section";
import { ScrollableList } from "@/components/ui/scrollable-list";
import { AssetCard } from "@/components/home/asset-card";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { categories } from "@/data/categories";
import { agents } from "@/data/agents";
import { getCategoryTheme, categoryAccentColor } from "@/lib/category-theme";

export function FeaturedByCategorySection() {
  const getFeaturedAgentsForCategory = (categoryName: string) =>
    agents.filter((agent) => agent.category === categoryName);

  return (
    <>
      {categories.slice(1).map((category, categoryIndex) => {
        const featuredAgents = getFeaturedAgentsForCategory(category.name);
        if (featuredAgents.length === 0) return null;
        const idx = String(categoryIndex + 1).padStart(2, "0");
        const theme = getCategoryTheme(category.name);

        return (
          <AnimatedSection as="section" key={category.name} className="mb-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
                  <span style={{ color: categoryAccentColor(category.name) }}>
                    {idx}
                  </span>
                  <span
                    className="h-px w-8"
                    style={{
                      background: `linear-gradient(90deg, ${categoryAccentColor(
                        category.name,
                        0.6
                      )}, transparent)`,
                    }}
                  />
                  {category.description}
                </p>
                <h2
                  id={category.name.toLowerCase().replace(/\s+/g, "-")}
                  className="mt-2 flex scroll-mt-24 items-center gap-3 font-heading text-3xl font-semibold tracking-tight"
                >
                  {/* per-category icon chip gives each section a distinct identity */}
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border"
                    style={{
                      color: categoryAccentColor(category.name),
                      backgroundColor: categoryAccentColor(category.name, 0.1),
                      borderColor: categoryAccentColor(category.name, 0.2),
                    }}
                  >
                    <DynamicIcon name={theme.iconName} className="h-5 w-5" />
                  </span>
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
