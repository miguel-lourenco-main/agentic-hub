import { cn } from "@/lib/utils"

interface LiveDotProps {
  label?: string
  color?: "success" | "gold" | "violet"
  className?: string
}

const dotColors = {
  success: "bg-success",
  gold: "bg-gold",
  violet: "bg-violet",
}

// Pulsing status dot with optional label — used for "Live" and chain badges.
export function LiveDot({ label, color = "success", className }: LiveDotProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative flex h-2 w-2" aria-hidden>
        <span
          className={cn(
            "absolute inline-flex h-full w-full rounded-full animate-pulse-dot",
            dotColors[color]
          )}
        />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", dotColors[color])} />
      </span>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
    </span>
  )
}
