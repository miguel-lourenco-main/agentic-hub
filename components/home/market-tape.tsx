"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { ActivityEvent } from "@/lib/interfaces";
import { getActivityFeed } from "@/data/activity";
import { withBasePath } from "@/lib/base-path";
import { LiveDot } from "@/components/ui/live-dot";
import { cn } from "@/lib/utils";

function TapeItem({ event }: { event: ActivityEvent }) {
  const invest = event.type === "invest";
  return (
    <Link
      href={withBasePath(`/agents/${event.agentId}`)}
      className="flex shrink-0 items-center gap-2 font-mono text-xs transition-opacity hover:opacity-100 sm:text-sm"
    >
      <span className="text-muted-foreground/70">{event.wallet}</span>
      <span className={cn("font-medium", invest ? "text-violet" : "text-gold")}>
        {invest ? "invested in" : "hired"}
      </span>
      <span className="text-foreground/90">{event.agentName}</span>
      <span className={invest ? "text-violet" : "text-gold"}>{event.amountSol} SOL</span>
      <span className="text-muted-foreground/40">·</span>
    </Link>
  );
}

function Row({ events, reverse }: { events: ActivityEvent[]; reverse?: boolean }) {
  return (
    <div
      className="group flex gap-[var(--gap)] overflow-hidden py-3"
      style={{ "--gap": "2.5rem", "--duration": "55s" } as CSSProperties}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className={cn(
            "flex shrink-0 items-center gap-[var(--gap)] group-hover:[animation-play-state:paused]",
            reverse ? "animate-marquee [animation-direction:reverse]" : "animate-marquee"
          )}
        >
          {events.map((event) => (
            <TapeItem key={`${copy}-${event.id}`} event={event} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function MarketTape() {
  const top = getActivityFeed(undefined, 14);
  const bottom = getActivityFeed("global-2", 14);

  return (
    <section className="relative w-full border-y border-white/[0.07] bg-card/30">
      <div className="mask-fade-x relative">
        <div className="absolute left-0 top-0 z-10 flex h-full items-center gap-2 bg-gradient-to-r from-background via-background/90 to-transparent pl-4 pr-10 sm:pl-6">
          <LiveDot />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
            Live
          </span>
        </div>
        <Row events={top} />
        <div className="border-t border-white/[0.04]" />
        <Row events={bottom} reverse />
      </div>
    </section>
  );
}
