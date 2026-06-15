"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { agents } from "@/data/agents";
import { categories } from "@/data/categories";
import { withBasePath } from "@/lib/base-path";

const CATS = categories.filter((c) => c.name !== "All Agents");

function topAgents(category: string) {
  return [...agents]
    .filter((a) => a.category === category)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 3)
    .map((a) => a.name);
}

export function CategoryIndex() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6">
      <Reveal className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
            <span className="text-gold">02</span>
            <span className="h-px w-8 bg-white/15" />
            The market
          </p>
          <h2 className="mt-4 font-heading text-display-sm font-bold leading-[1.02] tracking-tight">
            Browse the floor
          </h2>
        </div>
        <Link
          href={withBasePath("/agents")}
          className="hidden shrink-0 items-center gap-1.5 font-mono text-sm text-muted-foreground transition-colors hover:text-gold sm:inline-flex"
          data-cursor
        >
          all 45 agents <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Reveal>

      <div className="border-t border-white/[0.08]">
        {CATS.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 0.05}>
            <Link
              href={withBasePath(`/agents/?query=${encodeURIComponent(cat.name)}`)}
              className="group relative flex items-center gap-4 overflow-hidden border-b border-white/[0.08] py-6 sm:gap-8 sm:py-7"
              data-cursor
            >
              {/* hover wash */}
              <span className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-r from-gold/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <span className="relative font-mono text-sm text-muted-foreground/40">
                0{i + 1}
              </span>
              <span className="relative font-heading text-3xl font-semibold tracking-tight text-foreground/80 transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground sm:text-5xl">
                {cat.name}
              </span>

              {/* preview chips */}
              <span className="relative hidden flex-1 translate-x-4 items-center gap-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 lg:flex">
                {topAgents(cat.name).map((name) => (
                  <span
                    key={name}
                    className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {name}
                  </span>
                ))}
              </span>

              <span className="relative ml-auto flex items-center gap-3 sm:gap-5">
                <span className="font-mono text-sm text-gold">{cat.count} agents</span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
