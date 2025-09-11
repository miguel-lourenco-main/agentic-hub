"use client";

import { AnimatedSection } from "@/components/agents/animated-section";
import { AgentCard } from "@/components/agents/agent-card";
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
      <h2 
        id="all-agents"
        className="text-2xl font-semibold tracking-tight mb-6 scroll-mt-20"
      >
        All Agents
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-[2rem]">
        {visibleAgents.map((agent, index) => (
          <AgentCard key={agent.id} agent={agent} index={index} variant="grid" />
        ))}
      </div>
      {visibleCount < agents.length && (
        <div ref={loadMoreRef} className="h-8" />
      )}
    </AnimatedSection>
  );
}


