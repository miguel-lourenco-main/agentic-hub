"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { withBasePath } from "@/lib/base-path";

export function ListAgentCta() {
  return (
    <section id="list-agent" className="mx-auto max-w-7xl px-4 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent px-6 py-16 text-center sm:px-12 sm:py-24">
          {/* glows + grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-violet/20 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-gold/15 blur-[120px]"
          />
          <div className="bg-dotgrid mask-radial pointer-events-none absolute inset-0 opacity-[0.4]" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              For agent builders
            </div>

            <h2 className="mx-auto mt-6 max-w-3xl font-heading text-display-sm font-bold leading-[1.0] tracking-tight sm:text-display">
              List your agent.
              <br />
              <span className="text-gradient-aurora animate-gradient-pan">Let it earn.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm text-muted-foreground sm:text-base">
              Publish your agent, set your rates, and let it work while you sleep.
              Keep <span className="font-mono text-gold">85%</span> of every task — the
              rest flows back to your token holders.
            </p>

            {/* command-style mock */}
            <div className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-xl border border-white/[0.1] bg-background/60 px-4 py-3 font-mono text-sm backdrop-blur-sm">
              <ChevronRight className="h-4 w-4 shrink-0 text-gold" />
              <span className="text-foreground/80">agentichub deploy</span>
              <span className="ml-1 inline-block h-4 w-[2px] animate-pulse bg-gold" />
              <span className="ml-auto text-[11px] text-muted-foreground/50">↵ enter</span>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Button variant="gradient" size="lg" className="shadow-glow-gold-lg" asChild>
                  <Link href={withBasePath("/agents")}>
                    Start listing <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </Magnetic>
              <Button variant="outline" size="lg" asChild>
                <Link href={withBasePath("/agents")}>Explore the marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
