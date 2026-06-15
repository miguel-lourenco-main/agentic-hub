"use client";

/**
 * Fixed, GPU-cheap ambient backdrop for the void-black canvas: layered radial
 * glows (gold + violet), a masked hairline grid, and film grain. Pure CSS — no
 * WebGL — so it never competes with text contrast or costs frame budget. The
 * slow glow drift is disabled under prefers-reduced-motion via globals.
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(247,147,26,0.06), transparent 55%), radial-gradient(90% 70% at 100% 10%, rgba(139,92,246,0.07), transparent 55%)",
        }}
      />
      {/* drifting glows */}
      <div className="absolute -left-40 top-[-10%] h-[44rem] w-[44rem] animate-float rounded-full bg-gold/[0.07] blur-[140px]" />
      <div
        className="absolute right-[-15%] top-[20%] h-[40rem] w-[40rem] animate-float rounded-full bg-violet/[0.08] blur-[150px]"
        style={{ animationDelay: "-3s" }}
      />
      {/* masked hairline grid */}
      <div className="bg-grid mask-radial absolute inset-0 opacity-[0.5]" />
      {/* grain */}
      <div className="grain absolute inset-0 opacity-[0.035] mix-blend-soft-light" />
      {/* bottom vignette to seat the footer */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
