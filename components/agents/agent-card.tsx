"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, CircleDollarSign, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { categoryAccentColor, categoryAccentTriple } from "@/lib/category-theme";
import type { Agent } from "@/lib/interfaces";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  agent: Agent;
  index: number;
  categoryIndex?: number;
  variant?: "grid" | "row";
}

export function AgentCard({ agent, index, categoryIndex = 0, variant = "grid" }: AgentCardProps) {
  const isRow = variant === "row";
  const router = useRouter();
  const accent = categoryAccentColor(agent.category);
  const accentTriple = categoryAccentTriple(agent.category);

  return (
    <motion.div
      className={cn(isRow ? "min-w-[400px] max-w-[400px]" : "w-full", "")}
      initial={{ opacity: 0, [isRow ? "x" : "y"]: isRow ? 100 : 20 }}
      animate={{ opacity: 1, [isRow ? "x" : "y"]: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: isRow ? categoryIndex * 0.2 + index * 0.1 : index * 0.1,
      }}
    >
      {/* Whole card is the primary affordance: clicking anywhere opens the
          agent. The "Hire" button is a nested action that stops propagation so
          it can shortcut straight to the hire flow. */}
      <Card
        hoverable
        role="link"
        tabIndex={0}
        onClick={() => router.push(`/agents/${agent.id}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            router.push(`/agents/${agent.id}`);
          }
        }}
        style={{ ["--accent" as string]: accentTriple }}
        className="flex h-[12rem] cursor-pointer flex-col justify-between rounded-lg p-6 group relative overflow-hidden transition-colors hover:border-[rgb(var(--accent)/0.4)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(var(--accent)/0.6)]"
      >
        {/* category-tinted glow that morphs in on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: categoryAccentColor(agent.category, 0.18) }}
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="rounded-lg p-2"
              style={{
                color: accent,
                backgroundColor: categoryAccentColor(agent.category, 0.1),
              }}
            >
              <DynamicIcon name={agent.iconName} className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-heading font-semibold leading-none tracking-tight">
                {agent.name}
              </h3>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                {agent.category}
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3 w-3 fill-gold text-gold" />
                  <span className="font-mono text-xs">{agent.rating}</span>
                </span>
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[rgb(var(--accent))]" />
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {agent.description}
          </p>
          {/* Morphable content: a stat strip that grows in on hover/focus using
              the grid-rows 0fr→1fr trick, so the card reveals more detail
              without a layout jump when idle. */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <div className="flex items-center gap-4 pb-1 font-mono text-[11px] text-muted-foreground/80">
                <span>
                  <span className="text-foreground">
                    {(agent.investment.marketCap / 1_000_000).toFixed(1)}M
                  </span>{" "}
                  mkt cap
                </span>
                <span>
                  <span className="text-foreground">{agent.reviewCount}</span>{" "}
                  reviews
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center font-mono text-sm text-gold">
            <CircleDollarSign className="mr-1.5 size-4" />
            {agent.pricing}
          </div>
          <Link
            href={`/agents/${agent.id}?action=hire`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="gradient" size="sm">Hire</Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
