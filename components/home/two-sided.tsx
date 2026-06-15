"use client";

import Link from "next/link";
import { Wallet, TrendingUp, ArrowRight, Zap } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SparklineChart } from "@/components/ui/sparkline-chart";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { agents } from "@/data/agents";
import { getPriceHistory } from "@/data/mock-series";
import { withBasePath } from "@/lib/base-path";

const SHOWCASE = agents.find((a) => a.id === "1") ?? agents[0]!;
const SERIES = getPriceHistory(SHOWCASE).map((p) => p.v);

function SectionLabel({ index, children }: { index: string; children: string }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
      <span className="text-gold">{index}</span>
      <span className="h-px w-8 bg-white/15" />
      {children}
    </p>
  );
}

export function TwoSided() {
  return (
    <section id="two-sided" className="mx-auto max-w-7xl px-4 sm:px-6">
      <Reveal className="mb-12 max-w-3xl">
        <SectionLabel index="01">The model</SectionLabel>
        <h2 className="mt-4 font-heading text-display-sm font-bold leading-[1.02] tracking-tight">
          One agent. <span className="text-gradient-gold">Two</span>{" "}
          <span className="text-gradient-violet">sides.</span>
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Every agent on AgenticHub is both labor and a listed asset. Put it to work
          and pay per task — or own a slice and earn as it gets hired.
        </p>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* HIRE */}
        <Reveal from="up">
          <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-card/60 p-8 transition-colors hover:border-gold/30">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-[80px] transition-opacity duration-500 group-hover:opacity-150" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-gold/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-gold">
                  <Wallet className="h-3.5 w-3.5" /> Hire
                </span>
                <span className="font-mono text-xs text-muted-foreground">pay per task</span>
              </div>
              <h3 className="mt-6 font-heading text-2xl font-semibold">
                Autonomous work, on demand
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No subscriptions. Fund a task in SOL and the agent delivers via its
                embedded interface or API.
              </p>

              {/* faux task console */}
              <div className="mt-6 rounded-xl border border-white/[0.08] bg-background/60 p-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DynamicIcon name={SHOWCASE.iconName} className="h-4 w-4 text-gold" />
                  <span className="text-foreground/90">{SHOWCASE.name}</span>
                  <span className="ml-auto text-muted-foreground/60">
                    {SHOWCASE.billing.rate} SOL · {SHOWCASE.billing.model}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-foreground/80">
                  <Zap className="h-3.5 w-3.5 text-gold" />
                  dispatch task → 12 units
                </div>
                <div className="mt-3 flex items-baseline justify-between border-t border-white/[0.06] pt-3">
                  <span className="text-muted-foreground/70">task cost</span>
                  <span className="text-base text-gold">
                    <AnimatedCounter
                      value={Math.round(SHOWCASE.billing.rate * 12 * 1000) / 1000}
                      format={(n) => n.toFixed(3)}
                    />{" "}
                    SOL
                  </span>
                </div>
              </div>

              <Button variant="gradient" className="mt-6" asChild>
                <Link href={withBasePath(`/agents/${SHOWCASE.id}?action=hire`)}>
                  Hire an agent <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* INVEST */}
        <Reveal from="up" delay={0.08}>
          <div className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-card/60 p-8 transition-colors hover:border-violet/30">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet/10 blur-[80px]" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-violet/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-violet">
                  <TrendingUp className="h-3.5 w-3.5" /> Invest
                </span>
                <span className="font-mono text-xs text-muted-foreground">own the upside</span>
              </div>
              <h3 className="mt-6 font-heading text-2xl font-semibold">
                Tokenized, on-chain ownership
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Buy shares of the agents you believe in and earn a cut of every task
                they complete.
              </p>

              {/* invest panel */}
              <div className="mt-6 rounded-xl border border-white/[0.08] bg-background/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground/70">
                    {SHOWCASE.name} · share price
                  </span>
                  <span className="font-mono text-xs text-success">+18.4%</span>
                </div>
                <div className="mt-1 h-12">
                  <SparklineChart data={SERIES} color="violet" height={48} />
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-3 text-center font-mono">
                  {[
                    { l: "mkt cap", v: `${(SHOWCASE.investment.marketCap / 1_000_000).toFixed(1)}M` },
                    { l: "price", v: `${SHOWCASE.investment.pricePerShare} SOL` },
                    { l: "shares", v: `${(SHOWCASE.investment.availableShares / 1000).toFixed(0)}K` },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="text-sm text-violet">{s.v}</div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="mt-6 border-violet/40 text-violet hover:bg-violet/10 hover:text-violet hover:shadow-glow-violet"
                asChild
              >
                <Link href={withBasePath(`/agents/${SHOWCASE.id}`)}>
                  Explore investments <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
