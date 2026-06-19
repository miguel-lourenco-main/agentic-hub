"use client";

import { AnimatedSection } from "@/components/agents/animated-section";
import { AssetCard } from "@/components/home/asset-card";
import { agents } from "@/data/agents";
import { useCallback, useMemo, useRef, useState } from "react";

const BATCH = 9;

export function AllAgentsGridSection() {
  const [visibleCount, setVisibleCount] = useState(BATCH);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const visibleAgents = useMemo(
    () => agents.slice(0, visibleCount),
    [visibleCount]
  );
  const hasMore = visibleCount < agents.length;

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
          setVisibleCount((prev) => Math.min(prev + BATCH, agents.length));
        }
      },
      { rootMargin: "0px 0px 300px 0px" }
    );
    observer.observe(node);
    observerRef.current = observer;
  }, []);

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
      {hasMore && <div ref={setSentinel} className="h-8" />}
    </AnimatedSection>
  );
}
