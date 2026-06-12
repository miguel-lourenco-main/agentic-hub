import Link from "next/link"
import { ActivityEvent } from "@/lib/interfaces"
import { getActivityFeed } from "@/data/activity"
import { withBasePath } from "@/lib/base-path"
import { LiveDot } from "@/components/ui/live-dot"
import { cn } from "@/lib/utils"

function TickerItem({ event }: { event: ActivityEvent }) {
  return (
    <Link
      href={withBasePath(`/agents/${event.agentId}`)}
      className="flex shrink-0 items-center gap-2 text-xs transition-opacity hover:opacity-80"
    >
      <span className="font-mono text-muted-foreground">{event.wallet}</span>
      <span
        className={cn(
          "font-medium",
          event.type === "invest" ? "text-violet" : "text-gold"
        )}
      >
        {event.type === "invest" ? "invested in" : "hired"}
      </span>
      <span className="text-foreground/90">{event.agentName}</span>
      <span className="font-mono text-gold">{event.amountSol} SOL</span>
      <span className="text-muted-foreground/60">{event.timeAgo}</span>
    </Link>
  )
}

// Scrolling marquee of recent hire/invest events from seeded demo data.
export function LiveTicker() {
  const events = getActivityFeed(undefined, 12)

  return (
    <section className="border-y hairline bg-card/40 py-3">
      <div className="flex items-center gap-6 overflow-hidden">
        <div className="z-10 flex shrink-0 items-center gap-2 bg-background/80 pl-6 pr-4">
          <LiveDot label="Live" />
        </div>
        <div
          className="flex min-w-0 gap-[var(--gap)] overflow-hidden"
          style={{ "--gap": "3rem", "--duration": "60s" } as React.CSSProperties}
        >
          {/* Two identical tracks let the CSS marquee loop without a visible seam. */}
          {[0, 1].map(copy => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 animate-marquee items-center gap-[var(--gap)]"
            >
              {events.map(event => (
                <TickerItem key={`${copy}-${event.id}`} event={event} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
