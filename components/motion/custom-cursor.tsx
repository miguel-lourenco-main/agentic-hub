"use client";

import { useEffect, useRef } from "react";
import { ensureGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * A two-part cursor: a precise dot that tracks the pointer 1:1 and a softer ring
 * that eases behind it and expands over interactive targets. Only mounts on
 * fine-pointer devices without reduced-motion; otherwise the native cursor is
 * left untouched.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const { gsap } = ensureGsap();
    document.documentElement.classList.add("cursor-none");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    let visible = false;
    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const setHover = (on: boolean) =>
      gsap.to(ring, {
        scale: on ? 1.9 : 1,
        borderColor: on ? "rgba(247,147,26,0.9)" : "rgba(247,147,26,0.45)",
        backgroundColor: on ? "rgba(247,147,26,0.08)" : "rgba(247,147,26,0)",
        duration: 0.3,
        ease: "power3.out",
      });

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("a, button, input, textarea, [role='button'], [data-cursor]")) {
        setHover(true);
      }
    };
    const onOut = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("a, button, input, textarea, [role='button'], [data-cursor]")) {
        setHover(false);
      }
    };
    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("pointerleave", onLeaveWindow);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.removeEventListener("pointerleave", onLeaveWindow);
      gsap.killTweensOf([dot, ring]);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border opacity-0"
        style={{ borderColor: "rgba(247,147,26,0.45)" }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold opacity-0"
      />
    </div>
  );
}
