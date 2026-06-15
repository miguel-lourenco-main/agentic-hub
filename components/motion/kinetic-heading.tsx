"use client";

import * as React from "react";
import { ensureGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type KineticHeadingProps = {
  text: string;
  className?: string;
  as?: React.ElementType;
  /** start the animation on mount instead of on scroll into view */
  immediate?: boolean;
  delay?: number;
  stagger?: number;
};

/**
 * Word-by-word masked rise-in for display headings. Each word sits in an
 * overflow-hidden line so words translate up from behind a mask. Uses GSAP +
 * ScrollTrigger; collapses to plain text under reduced-motion.
 */
export function KineticHeading({
  text,
  className,
  as: Tag = "h1",
  immediate = false,
  delay = 0,
  stagger = 0.06,
}: KineticHeadingProps) {
  const ref = React.useRef<HTMLElement | null>(null);
  const words = React.useMemo(() => text.split(" "), [text]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const targets = el.querySelectorAll<HTMLElement>("[data-word]");

    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: 115, opacity: 0 });
      const tween = gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        ease: "expo.out",
        stagger,
        delay,
        ...(immediate
          ? {}
          : {
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
            }),
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, el);

    return () => ctx.revert();
  }, [delay, immediate, stagger, text]);

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={cn(className)}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-flex overflow-hidden align-bottom"
          style={{ paddingBottom: "0.08em", marginBottom: "-0.08em" }}
        >
          <span data-word className="inline-block will-change-transform">
            {word}
          </span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}
