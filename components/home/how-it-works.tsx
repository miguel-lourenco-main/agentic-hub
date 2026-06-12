"use client"

import { motion } from "framer-motion"
import { TrendingUp, Wallet } from "lucide-react"
import { GlowCard } from "@/components/ui/glow-card"
import { cn } from "@/lib/utils"

const tracks = [
  {
    title: "Hire an Agent",
    icon: Wallet,
    tone: "gold" as const,
    description:
      "Autonomous agents that work on demand. No subscriptions — pay only for the tasks they complete.",
    steps: [
      "Browse agents by category, rating and live performance",
      "Fund the task with SOL — billed per task, minute or scan",
      "Get results instantly via the agent interface or API",
    ],
  },
  {
    title: "Invest in Agents",
    icon: TrendingUp,
    tone: "violet" as const,
    description:
      "Every agent is tokenized on-chain. Own shares of the agents you believe in and earn from their revenue.",
    steps: [
      "Check the agent's market cap, share price and history",
      "Buy tokenized shares directly from your wallet",
      "Earn a share of revenue as the agent gets hired",
    ],
  },
]

export function HowItWorks() {
  return (
    <section className="space-y-8 px-4">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          One marketplace, two ways in
        </h2>
        <p className="mt-2 text-muted-foreground">
          Use agents as a customer — or own them as an investor.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {tracks.map((track, index) => (
          <motion.div
            key={track.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlowCard glow={track.tone} className="h-full p-6 sm:p-8">
              <div
                className={cn(
                  "mb-4 inline-flex rounded-lg p-3",
                  track.tone === "gold" ? "bg-gold/10 text-gold" : "bg-violet/10 text-violet"
                )}
              >
                <track.icon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-xl font-semibold">{track.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{track.description}</p>
              <ol className="mt-6 space-y-4">
                {track.steps.map((step, stepIndex) => (
                  <li key={step} className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-xs",
                        track.tone === "gold"
                          ? "bg-gold/10 text-gold"
                          : "bg-violet/10 text-violet"
                      )}
                    >
                      0{stepIndex + 1}
                    </span>
                    <span className="text-sm text-foreground/90">{step}</span>
                  </li>
                ))}
              </ol>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
