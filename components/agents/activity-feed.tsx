"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LiveDot } from "@/components/ui/live-dot"
import { getActivityFeed } from "@/data/activity"
import { cn } from "@/lib/utils"

export function ActivityFeed({ agentId }: { agentId: string }) {
  // Recent hire/invest events scoped to this agent.
  const events = getActivityFeed(agentId, 8)
  if (events.length === 0) return null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="font-heading text-lg">Live Activity</CardTitle>
        <LiveDot label="Live" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {events.map((event, index) => (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-between gap-3 rounded-md px-2 py-2.5 text-sm transition-colors hover:bg-white/[0.03]"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">
                  {event.wallet}
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                    event.type === "invest"
                      ? "bg-violet/10 text-violet"
                      : "bg-gold/10 text-gold"
                  )}
                >
                  {event.type === "invest" ? "invested" : "hired"}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-xs text-gold">
                  {event.amountSol} SOL
                </span>
                <span className="w-14 text-right text-xs text-muted-foreground/60">
                  {event.timeAgo}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
