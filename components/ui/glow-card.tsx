import { cn } from "@/lib/utils"

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "gold" | "violet" | "none"
}

export function GlowCard({ glow = "gold", className, children, ...props }: GlowCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-gradient-to-br from-white/10 via-white/[0.04] to-transparent p-px transition-shadow",
        glow === "gold" && "hover:shadow-glow-gold",
        glow === "violet" && "hover:shadow-glow-violet"
      )}
    >
      <div
        className={cn("h-full rounded-[calc(var(--radius)-1px)] bg-card", className)}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
