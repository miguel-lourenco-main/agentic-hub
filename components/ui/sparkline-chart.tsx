"use client"

import { useId } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SparklineChartProps {
  data: number[]
  color?: "gold" | "violet" | "success" | "destructive"
  height?: number
  showArea?: boolean
  className?: string
}

const strokeColors = {
  gold: "#F7931A",
  violet: "#8B5CF6",
  success: "#23C16B",
  destructive: "#DC2626",
}

const WIDTH = 100

function buildPath(data: number[]): { line: string; area: string } {
  if (data.length < 2) return { line: "", area: "" }
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  // 10% vertical padding so the line never clips at the viewBox edge
  const points = data.map((v, i) => ({
    x: (i / (data.length - 1)) * WIDTH,
    y: 90 - ((v - min) / range) * 80 + 0,
  }))
  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ")
  const area = `${line} L${WIDTH},100 L0,100 Z`
  return { line, area }
}

export function SparklineChart({
  data,
  color = "gold",
  height = 40,
  showArea = true,
  className,
}: SparklineChartProps) {
  const gradientId = useId()
  const stroke = strokeColors[color]
  const { line, area } = buildPath(data)
  if (!line) return null

  return (
    <svg
      viewBox={`0 0 ${WIDTH} 100`}
      preserveAspectRatio="none"
      className={cn("w-full", className)}
      style={{ height }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.25" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {showArea && <path d={area} fill={`url(#${gradientId})`} />}
      <motion.path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}
