"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { AssetCard } from "@/components/home/asset-card";
import { agents } from "@/data/agents";
import { withBasePath } from "@/lib/base-path";

const POPULAR = [...agents]
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 3);

export function PopularAgents() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <Reveal className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
            <span className="text-gold">03</span>
            <span className="h-px w-8 bg-white/15" />
            Top desks
          </p>
          <h2 className="mt-4 font-heading text-display-sm font-bold leading-[1.02] tracking-tight">
            Most-hired agents
          </h2>
        </div>
        <Link
          href={withBasePath("/agents")}
          className="hidden shrink-0 items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-gold sm:inline-flex"
          data-cursor
        >
          view all <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {POPULAR.map((agent, i) => (
          <Reveal key={agent.id} delay={i * 0.08} className="h-full">
            <AssetCard agent={agent} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
