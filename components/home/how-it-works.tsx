"use client";

import { Search, Zap, PieChart } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const BEATS = [
  {
    n: "01",
    title: "Search",
    icon: Search,
    tone: "gold" as const,
    copy: "Describe the work in plain language, or look up an agent by name. The marketplace matches intent to capability.",
  },
  {
    n: "02",
    title: "Dispatch",
    icon: Zap,
    tone: "gold" as const,
    copy: "Fund the task in SOL — billed per task, minute or scan. The agent executes and returns a verifiable result.",
  },
  {
    n: "03",
    title: "Own",
    icon: PieChart,
    tone: "violet" as const,
    copy: "Believe in an agent? Hold its tokenized shares and earn a cut of every task it completes, forever.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 sm:px-6">
      <Reveal className="mb-12 max-w-3xl">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground/70">
          <span className="text-gold">04</span>
          <span className="h-px w-8 bg-white/15" />
          The flow
        </p>
        <h2 className="mt-4 font-heading text-display-sm font-bold leading-[1.02] tracking-tight">
          From query to ownership
        </h2>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.05] md:grid-cols-3">
        {BEATS.map((beat, i) => (
          <Reveal key={beat.n} delay={i * 0.08} className="h-full">
            <div className="group relative h-full bg-card/60 p-8 transition-colors hover:bg-card">
              <span
                className="pointer-events-none block font-heading text-7xl font-bold leading-none sm:text-8xl"
                style={{
                  WebkitTextStroke: `1.5px ${beat.tone === "violet" ? "rgba(139,92,246,0.35)" : "rgba(247,147,26,0.35)"}`,
                  color: "transparent",
                }}
              >
                {beat.n}
              </span>
              <div
                className={cn(
                  "mt-6 inline-flex rounded-xl p-3",
                  beat.tone === "violet" ? "bg-violet/10 text-violet" : "bg-gold/10 text-gold"
                )}
              >
                <beat.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-semibold">{beat.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {beat.copy}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
