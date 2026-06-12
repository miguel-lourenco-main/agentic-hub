"use client"

import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GlowCard } from "@/components/ui/glow-card"
import { LiveDot } from "@/components/ui/live-dot"
import { PriceChart } from "@/components/ui/price-chart"
import { InvestDialog } from "@/components/agents/invest-dialog"
import { getPriceHistory } from "@/data/mock-series"
import type { Agent } from "@/lib/interfaces"
import { cn } from "@/lib/utils"

// Agent token economics panel: price chart, stats, and invest entry point.
export function TokenPanel({ agent }: { agent: Agent }) {
  const history = getPriceHistory(agent)
  const first = history[0]?.v ?? agent.investment.pricePerShare
  const changePct = ((agent.investment.pricePerShare - first) / first) * 100
  // Demo metric: approximate holder count from market cap (not on-chain data).
  const holders = Math.round(agent.investment.marketCap / 1850)

  const rows = [
    { label: "Market Cap", value: `${agent.investment.marketCap.toLocaleString()} SOL` },
    { label: "Price / Share", value: `${agent.investment.pricePerShare.toLocaleString()} SOL` },
    { label: "Available Shares", value: agent.investment.availableShares.toLocaleString() },
    { label: "Holders", value: holders.toLocaleString() },
  ]

  return (
    <GlowCard glow="violet" className="p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-heading text-lg font-semibold">Agent Token</h3>
          <LiveDot label="Token live on Solana" className="mt-1" />
        </div>
        <span
          className={cn(
            "inline-flex w-fit items-center rounded-full px-2.5 py-1 font-mono text-sm",
            changePct >= 0
              ? "bg-success/10 text-success"
              : "bg-destructive/10 text-destructive"
          )}
        >
          {changePct >= 0 ? "+" : ""}
          {changePct.toFixed(1)}% / 30d
        </span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <PriceChart data={history} height={220} />
        <div className="flex flex-col justify-between gap-4">
          <dl className="space-y-3">
            {rows.map(row => (
              <div
                key={row.label}
                className="flex items-center justify-between border-b hairline pb-3 last:border-0"
              >
                <dt className="text-sm text-muted-foreground">{row.label}</dt>
                <dd className="font-mono text-sm tabular-nums">{row.value}</dd>
              </div>
            ))}
          </dl>
          <InvestDialog
            agentName={agent.name}
            marketCap={agent.investment.marketCap}
            availableShares={agent.investment.availableShares}
            pricePerShare={agent.investment.pricePerShare}
          >
            <Button variant="gradient" className="w-full" size="lg">
              <Sparkles className="mr-2 h-4 w-4" />
              Invest in {agent.name}
            </Button>
          </InvestDialog>
        </div>
      </div>
    </GlowCard>
  )
}
