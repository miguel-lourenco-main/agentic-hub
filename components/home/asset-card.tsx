"use client";

// Marketplace card with share-price sparkline and 3D tilt hover (home + /agents).
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { SparklineChart } from "@/components/ui/sparkline-chart";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/tilt-card";
import { getPriceHistory } from "@/data/mock-series";
import { withBasePath } from "@/lib/base-path";
import type { Agent } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return `${n}`;
}

export function AssetCard({ agent, className }: { agent: Agent; className?: string }) {
  const series = getPriceHistory(agent).map((p) => p.v);
  const first = series[0] ?? 1;
  const last = series[series.length - 1] ?? 1;
  const change = ((last - first) / first) * 100;
  const up = change >= 0;

  return (
    <TiltCard glow="gold" className={cn("h-full rounded-2xl", className)}>
      <Link
        href={withBasePath(`/agents/${agent.id}`)}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-card/70 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-gold/30"
        data-cursor
      >
        {/* header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-gold/20 bg-gold/10 p-2.5 text-gold">
              <DynamicIcon name={agent.iconName} className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="truncate font-heading font-semibold tracking-tight">
                {agent.name}
              </h3>
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{agent.category}</span>
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3 fill-gold text-gold" />
                  <span className="font-mono">{agent.rating}</span>
                </span>
              </p>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
        </div>

        <p className="mt-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {agent.description}
        </p>

        {/* share-price sparkline */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
              Share price
            </p>
            <p className="mt-0.5 flex items-baseline gap-2">
              <span className="font-mono text-sm text-violet">
                {agent.investment.pricePerShare} SOL
              </span>
              <span
                className={cn(
                  "font-mono text-[11px]",
                  up ? "text-success" : "text-destructive"
                )}
              >
                {up ? "+" : ""}
                {change.toFixed(1)}%
              </span>
            </p>
          </div>
          <div className="h-9 w-24 opacity-90">
            <SparklineChart
              data={series}
              color={up ? "violet" : "destructive"}
              height={36}
            />
          </div>
        </div>

        {/* footer */}
        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
          <div className="flex flex-col">
            <span className="font-mono text-sm text-gold">{agent.pricing}</span>
            <span className="font-mono text-[10px] text-muted-foreground/60">
              mkt cap {compact(agent.investment.marketCap)} SOL
            </span>
          </div>
          <Button variant="gradient" size="sm" className="shrink-0" asChild>
            <span>
              Try agent
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </Button>
        </div>
      </Link>
    </TiltCard>
  );
}
