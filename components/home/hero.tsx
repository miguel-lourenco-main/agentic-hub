"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  PenLine,
  Bug,
  BarChart3,
  Brain,
  GitBranch,
  FlaskConical,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { LiveDot } from "@/components/ui/live-dot";
import { AgentCore, type StrikeEvent, type HoverEvent } from "@/components/webgl/agent-core";
import { useSearchUI } from "@/components/search/search-context";
import { ensureGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { withBasePath } from "@/lib/base-path";
import { marketplaceStats } from "@/data/stats";
import { cn, formatInt } from "@/lib/utils";

const SUGGESTIONS = [
  { text: "Pair programming", icon: PenLine },
  { text: "Threat detection", icon: Bug },
  { text: "Optimize performance", icon: BarChart3 },
  { text: "Train ML models", icon: Brain },
  { text: "Version control", icon: GitBranch },
  { text: "Automated testing", icon: FlaskConical },
];

const HEADLINE_LINES: { words: string[]; accentFrom?: number }[] = [
  { words: ["Hire", "the"] },
  { words: ["workforce"] },
  { words: ["you", "own."], accentFrom: 1 },
];

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return formatInt(n);
}

export function Hero() {
  const router = useRouter();
  const { setQuery: setGlobalQuery, setIsTransitioning } = useSearchUI();
  const [value, setValue] = useState("");
  const [hover, setHover] = useState<HoverEvent>(null);
  const [lastStrike, setLastStrike] = useState<StrikeEvent | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  // Signature type-wipe on load (words already in the DOM — no CLS).
  useEffect(() => {
    const el = headlineRef.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 120 });
      gsap.to(words, {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.15,
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const goSearch = (q: string) => {
    const query = q.trim();
    if (!query) return;
    setGlobalQuery(query);
    setIsTransitioning(true);
    try {
      document.cookie = `search_query=${encodeURIComponent(query)}; path=/; max-age=${60 * 60 * 24 * 7}`;
    } catch {}
    router.push(withBasePath(`/agents?query=${encodeURIComponent(query)}`));
  };

  return (
    <section className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 lg:pt-24">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ---- left: editorial ---- */}
        <div className="order-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1">
            <LiveDot />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              The agent exchange
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="font-heading text-display-sm font-bold leading-[0.95] tracking-tight sm:text-display"
          >
            {HEADLINE_LINES.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-[0.06em]">
                <span className="inline-block">
                  {line.words.map((word, wi) => {
                    const accent =
                      line.accentFrom !== undefined && wi >= line.accentFrom;
                    return (
                      <span
                        key={wi}
                        data-word
                        className={cn(
                          "inline-block will-change-transform",
                          accent && "text-gradient-gold"
                        )}
                      >
                        {word}
                        {wi < line.words.length - 1 ? " " : ""}
                      </span>
                    );
                  })}
                </span>
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            A marketplace of autonomous AI agents — hire them per task in{" "}
            <span className="font-mono text-gold">SOL</span>, or own a share of the
            ones you believe in. Settled on-chain, billed by the task.
          </p>

          {/* command search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              goSearch(value);
            }}
            className="mt-8 max-w-xl"
          >
            <motion.div
              layoutId="global-search"
              className="group flex items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 backdrop-blur-sm transition-colors focus-within:border-gold/40"
            >
              <ChevronRight className="h-5 w-5 shrink-0 text-gold" />
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Describe the work — or search a ticker…"
                className="h-9 w-full bg-transparent font-mono text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
                aria-label="Search agents"
              />
              <Button type="submit" variant="gradient" size="sm" className="shrink-0">
                Search
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map(({ text, icon: Icon }, i) => (
              <button
                key={text}
                onClick={() => goSearch(text)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.02] px-3 py-1 text-xs text-foreground/80 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-foreground"
              >
                <Icon className={cn("h-3.5 w-3.5", i % 2 ? "text-violet" : "text-gold")} />
                {text}
              </button>
            ))}
          </div>

          {/* hero stat tape */}
          <dl className="mt-10 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-white/[0.07] pt-6 sm:grid-cols-4">
            {[
              { label: "SOL settled", value: marketplaceStats.solVolume, fmt: compact },
              { label: "Requests", value: marketplaceStats.requestsServed, fmt: compact },
              { label: "Investors", value: marketplaceStats.activeInvestors, fmt: compact },
              { label: "Agents", value: marketplaceStats.totalAgents, fmt: (n: number) => Math.round(n).toString() },
            ].map((s) => (
              <div key={s.label}>
                <dd className="font-mono text-xl font-semibold text-foreground sm:text-2xl">
                  <AnimatedCounter value={s.value} format={s.fmt} />
                </dd>
                <dt className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* ---- right: agent core ---- */}
        <div className="relative order-2">
          <div className="relative mx-auto aspect-square w-full max-w-[34rem] overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent">
            {/* corner labels */}
            <div className="pointer-events-none absolute left-5 top-5 z-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
                Agent core
              </p>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/50">
                <LiveDot /> live network
              </p>
            </div>
            <div className="pointer-events-none absolute bottom-5 right-5 z-10 text-right">
              <p className="font-mono text-[10px] text-muted-foreground/50">
                45 nodes · 5 clusters
              </p>
            </div>

            <AgentCore
              className="absolute inset-0"
              strikes
              onStrike={setLastStrike}
              onHover={setHover}
            />

            {/* node tooltip */}
            {hover && (
              <div
                className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[140%] whitespace-nowrap rounded-lg border border-white/10 bg-background/90 px-2.5 py-1.5 backdrop-blur-sm"
                style={{ left: hover.x, top: hover.y }}
              >
                <span className="font-heading text-xs font-semibold">{hover.name}</span>
                <span className="ml-2 font-mono text-[11px] text-gold">{hover.pricing}</span>
                <span className="ml-1.5 font-mono text-[11px] text-muted-foreground">
                  ★ {hover.rating}
                </span>
              </div>
            )}
          </div>

          {/* transaction-strike readout */}
          <div className="mx-auto mt-4 flex max-w-[34rem] items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
              Last settlement
            </span>
            {lastStrike ? (
              <span className="flex items-center gap-2 font-mono text-xs">
                <span className={lastStrike.type === "invest" ? "text-violet" : "text-gold"}>
                  {lastStrike.type === "invest" ? "invested in" : "hired"}
                </span>
                <span className="text-foreground/90">{lastStrike.agentName}</span>
                <span className={lastStrike.type === "invest" ? "text-violet" : "text-gold"}>
                  {lastStrike.amount} SOL
                </span>
              </span>
            ) : (
              <span className="font-mono text-xs text-muted-foreground/50">
                awaiting network…
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
