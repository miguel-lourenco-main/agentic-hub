import { cn } from "@/lib/utils"

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "gold" | "violet"
}

export function GradientText({
  variant = "gold",
  className,
  ...props
}: GradientTextProps) {
  return (
    <span
      className={cn(
        variant === "gold" ? "text-gradient-gold" : "text-gradient-violet",
        className
      )}
      {...props}
    />
  )
}
