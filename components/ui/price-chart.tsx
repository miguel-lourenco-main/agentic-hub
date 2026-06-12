"use client"

import { useId, useRef, useState } from "react"
import { motion } from "framer-motion"
import { PricePoint } from "@/lib/interfaces"
import { cn } from "@/lib/utils"

interface PriceChartProps {
  data: PricePoint[]
  height?: number
  className?: string
}

const W = 100
const H = 100
const STROKE = "#F7931A"

// Line chart in a fixed viewBox; mouse position maps to the nearest data index.
export function PriceChart({ data, height = 220, className }: PriceChartProps) {
  const gradientId = useId()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  if (data.length < 2) return null

  const values = data.map(p => p.v)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const points = data.map((p, i) => ({
    x: (i / (data.length - 1)) * W,
    y: 92 - ((p.v - min) / range) * 78,
  }))
  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ")
  const area = `${line} L${W},${H} L0,${H} Z`

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = (e.clientX - rect.left) / rect.width
    const index = Math.round(ratio * (data.length - 1))
    setHoverIndex(Math.max(0, Math.min(data.length - 1, index)))
  }

  const hovered = hoverIndex !== null ? data[hoverIndex] : null
  const hoveredPoint = hoverIndex !== null ? points[hoverIndex] : null

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height }}
      onMouseMove={handleMove}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={STROKE} stopOpacity="0.25" />
            <stop offset="100%" stopColor={STROKE} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gradientId})`} />
        <motion.path
          d={line}
          fill="none"
          stroke={STROKE}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        {hoveredPoint && (
          <>
            <line
              x1={hoveredPoint.x}
              y1="0"
              x2={hoveredPoint.x}
              y2={H}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="2.5" fill={STROKE} />
          </>
        )}
      </svg>
      {hovered && hoveredPoint && (
        <div
          className="pointer-events-none absolute -top-1 z-10 -translate-x-1/2 rounded-md border hairline bg-popover px-2 py-1 font-mono text-xs shadow-md"
          style={{ left: `${hoveredPoint.x}%` }}
        >
          {hovered.v.toFixed(2)} SOL
          <span className="ml-1.5 text-muted-foreground">{hovered.t}</span>
        </div>
      )}
      <div className="pointer-events-none absolute bottom-1 left-2 font-mono text-[10px] text-muted-foreground/70">
        L {min.toFixed(2)}
      </div>
      <div className="pointer-events-none absolute right-2 top-1 font-mono text-[10px] text-muted-foreground/70">
        H {max.toFixed(2)}
      </div>
    </div>
  )
}
