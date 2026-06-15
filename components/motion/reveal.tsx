"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** seconds */
  delay?: number;
  /** translation direction on enter */
  from?: "up" | "down" | "left" | "right" | "none";
  /** px distance */
  distance?: number;
  once?: boolean;
  as?: React.ElementType;
};

const AXIS: Record<NonNullable<RevealProps["from"]>, (d: number) => string> = {
  up: (d) => `translate3d(0, ${d}px, 0)`,
  down: (d) => `translate3d(0, ${-d}px, 0)`,
  left: (d) => `translate3d(${d}px, 0, 0)`,
  right: (d) => `translate3d(${-d}px, 0, 0)`,
  none: () => "none",
};

/**
 * Lightweight reveal-on-scroll using IntersectionObserver (no ScrollTrigger
 * dependency, works with native or smooth scroll). Honors prefers-reduced-motion
 * via the global `.reveal` CSS rules.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  distance = 30,
  once = true,
  as: Tag = "div",
}: RevealProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const [shown, setShown] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setShown(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={cn(className)}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : AXIS[from](distance),
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </Tag>
  );
}
