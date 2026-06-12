"use client"

import { motion } from "framer-motion"
import { GlowCard } from "@/components/ui/glow-card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { LiveDot } from "@/components/ui/live-dot"
import { marketplaceStats } from "@/data/stats"

// Abbreviate large headline numbers (e.g. 1.2M, 45.3K).
function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return Math.round(n).toLocaleString()
}

const stats = [
  { label: "Agents listed", value: marketplaceStats.totalAgents, format: (n: number) => Math.round(n).toString(), live: false },
  { label: "SOL volume", value: marketplaceStats.solVolume, format: compact, live: true },
  { label: "Requests served", value: marketplaceStats.requestsServed, format: compact, live: false },
  { label: "Active investors", value: marketplaceStats.activeInvestors, format: compact, live: false },
]

export function StatsStrip() {
  return (
    <section className="grid grid-cols-2 gap-4 px-4 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlowCard className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
              {stat.live && <LiveDot />}
            </div>
            <p className="mt-2 text-2xl font-semibold sm:text-3xl">
              <AnimatedCounter
                value={stat.value}
                format={stat.format}
                className="text-gradient-gold"
              />
            </p>
          </GlowCard>
        </motion.div>
      ))}
    </section>
  )
}
