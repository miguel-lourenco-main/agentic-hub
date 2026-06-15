"use client";

// Paginated agent grid — loads 9 more cards when the sentinel scrolls into view.
import { AnimatedSection } from "@/components/agents/animated-section";
import { AssetCard } from "@/components/home/asset-card";
import { agents } from "@/data/agents";
import { useMemo, useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

export function AllAgentsGridSection() {
  const [visibleCount, setVisibleCount] = useState(9);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(loadMoreRef, { margin: "0px 0px 200px 0px" });

  const visibleAgents = useMemo(() => agents.slice(0, visibleCount), [visibleCount]);

  useEffect(() => {
    if (inView) {
      setVisibleCount((prev) => Math.min(prev + 9, agents.length));
    }
  }, [inView]);

  return (
    <AnimatedSection as="section" layout={false} className="mb-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
            <span className="text-gold">—</span> The full index
          </p>
          <h2
            id="all-agents"
            className="mt-2 scroll-mt-24 font-heading text-3xl font-semibold tracking-tight"
          >
            All agents
          </h2>
        </div>
        <span className="font-mono text-sm text-muted-foreground">
          {visibleAgents.length} / {agents.length}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleAgents.map((agent) => (
          <AssetCard key={agent.id} agent={agent} />
        ))}
      </div>
      {visibleCount < agents.length && <div ref={loadMoreRef} className="h-8" />}
    </AnimatedSection>
  );
}
