"use client";

import * as React from "react";
import { useIsTouch, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TiltCardProps = React.HTMLAttributes<HTMLDivElement> & {
  /** max tilt in degrees */
  max?: number;
  /** glow accent */
  glow?: "gold" | "violet";
  children: React.ReactNode;
};

/**
 * Pointer-reactive 3D tilt with a spotlight glow that tracks the cursor.
 * Pure CSS transforms (rAF-throttled). No-ops on touch / reduced motion.
 */
export function TiltCard({
  children,
  className,
  max = 7,
  glow = "gold",
  ...props
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const raf = React.useRef<number | null>(null);
  const isTouch = useIsTouch();

  const onMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el || isTouch || prefersReducedMotion()) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const rx = (0.5 - py) * max * 2;
        const ry = (px - 0.5) * max * 2;
        el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
        el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      });
    },
    [isTouch, max]
  );

  const onLeave = React.useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }, []);

  const glowColor =
    glow === "violet" ? "rgba(139,92,246,0.16)" : "rgba(247,147,26,0.16)";

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("group/tilt relative [transform-style:preserve-3d]", className)}
      style={{
        transform:
          "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
        transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
      }}
      {...props}
    >
      {children}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--mx,50%) var(--my,50%), ${glowColor}, transparent 60%)`,
        }}
      />
    </div>
  );
}
