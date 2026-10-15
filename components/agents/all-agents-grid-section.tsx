"use client";

import { AnimatedSection } from "@/components/agents/animated-section";
import { AssetCard } from "@/components/home/asset-card";
import { agents } from "@/data/agents";
import { ALL_CATEGORIES, useAgentFilters } from "@/lib/agent-filters";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { categoryAccentColor, getCategoryTheme } from "@/lib/category-theme";
import type { Agent } from "@/lib/interfaces";
import { useCallback, useMemo, useRef, useState } from "react";

const BATCH = 9;

export function AllAgentsGridSection() {
  const { filters } = useAgentFilters();
  const { category } = filters;
  const list = useMemo(
    () =>
      category === ALL_CATEGORIES
        ? agents
        : agents.filter((a) => a.category === category),
    [category]
  );
  // Remount on category change so the infinite-scroll batch starts over.
  return <AgentsGrid key={category} list={list} category={category} />;
}

function AgentsGrid({ list, category }: { list: Agent[]; category: string }) {
  const filtered = category !== ALL_CATEGORIES;
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const visibleAgents = useMemo(
    () => list.slice(0, visibleCount),
    [list, visibleCount]
  );
  const hasMore = visibleCount < list.length;

  // Attach an IntersectionObserver via a ref callback so it re-evaluates every
  // time the sentinel mounts. The previous useInView approach only fired once
  // on enter, so consecutive batches could stall until the user nudged the
  // scroll. This keeps loading promptly (well under 1s) while the sentinel
  // stays visible, and disconnects cleanly when there is nothing left to load.
  const setSentinel = useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisibleCount((prev) => Math.min(prev + BATCH, list.length));
        }
      },
      { rootMargin: "0px 0px 300px 0px" }
    );
    observer.observe(node);
    observerRef.current = observer;
  }, [list.length]);

  return (
    <AnimatedSection as="section" layout={false} className="mb-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
            <span className="text-gold">—</span>{" "}
            {filtered ? "Filtered index" : "The full index"}
          </p>
          <h2
            id="all-agents"
            className="mt-2 flex scroll-mt-24 items-center gap-3 font-heading text-3xl font-semibold tracking-tight"
          >
            {filtered && (
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border"
                style={{
                  color: categoryAccentColor(category),
                  backgroundColor: categoryAccentColor(category, 0.1),
                  borderColor: categoryAccentColor(category, 0.2),
                }}
              >
                <DynamicIcon
                  name={getCategoryTheme(category).iconName}
                  className="h-5 w-5"
                />
              </span>
            )}
            {filtered ? category : "All agents"}
          </h2>
        </div>
        <span className="font-mono text-sm text-muted-foreground">
          {visibleAgents.length} / {list.length}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleAgents.map((agent) => (
          <AssetCard key={agent.id} agent={agent} />
        ))}
      </div>
      {hasMore && <div ref={setSentinel} className="h-8" />}
    </AnimatedSection>
  );
}
