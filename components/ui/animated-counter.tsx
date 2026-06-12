"use client"

import { useEffect, useRef, useState } from "react"
import { animate, useInView, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCounterProps {
  value: number
  format?: (n: number) => string
  durationMs?: number
  className?: string
}

const defaultFormat = (n: number) => Math.round(n).toLocaleString()

export function AnimatedCounter({
  value,
  format = defaultFormat,
  durationMs = 1600,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(() => format(reducedMotion ? value : 0))

  useEffect(() => {
    if (!isInView) return
    if (reducedMotion) {
      setDisplay(format(value))
      return
    }
    // Count up when the stat scrolls into view; respects prefers-reduced-motion.
    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: latest => setDisplay(format(latest)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, value, durationMs, reducedMotion])

  return (
    <span ref={ref} className={cn("font-mono tabular-nums", className)}>
      {display}
    </span>
  )
}
