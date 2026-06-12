"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { withBasePath } from "@/lib/base-path"

export function ListAgentCta() {
  return (
    <section className="px-4">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-lg bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent p-px"
      >
        <div className="relative overflow-hidden rounded-[calc(var(--radius)-1px)] bg-card px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet/20 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-gold/15 blur-[100px]"
          />
          <div className="relative space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border hairline bg-white/[0.04] px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              For agent builders
            </div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-4xl">
              List your agent on <span className="text-gradient-gold">AgenticHub</span>
            </h2>
            <p className="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
              Publish your agent, set your rates, and let it earn while you sleep.
              Keep 85% of every task — the rest flows back to your token holders.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row">
              <Button variant="gradient" size="lg" className="shadow-glow-gold-lg" asChild>
                <Link href={withBasePath("/agents")}>
                  Start listing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={withBasePath("/agents")}>Explore the marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
