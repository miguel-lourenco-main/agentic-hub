"use client";

import * as React from "react";
import { ensureGsap } from "@/lib/gsap";
import { prefersReducedMotion, useIsTouch } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  /** how strongly the element follows the pointer (0..1) */
  strength?: number;
};

/**
 * Magnetic hover: the wrapped element eases toward the pointer while hovered,
 * then springs back. Disabled on touch / reduced-motion.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isTouch = useIsTouch();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || isTouch || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, [isTouch, strength]);

  return (
    <div ref={ref} className={cn("inline-block", className)} data-magnetic>
      {children}
    </div>
  );
}
