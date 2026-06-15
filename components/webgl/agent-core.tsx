"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { StrikeEvent, HoverEvent } from "./agent-core-gl";
import AgentCoreStatic from "./agent-core-static";

const AgentCoreGL = dynamic(() => import("./agent-core-gl"), {
  ssr: false,
  loading: () => null,
});

export type { StrikeEvent, HoverEvent };

type Props = {
  className?: string;
  focusIndex?: number;
  strikes?: boolean;
  onStrike?: (e: StrikeEvent) => void;
  onHover?: (e: HoverEvent) => void;
};

/** Detect whether live WebGL should run, or we fall back to the static frame. */
function canRunWebGL(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return false;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (typeof mem === "number" && mem < 4) return false;
  if (typeof window.WebGLRenderingContext === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl") || c.getContext("experimental-webgl");
    if (!gl) return false;
  } catch {
    return false;
  }
  return true;
}

/**
 * Capability-gated Agent Core. Decides once on the client whether to mount the
 * live WebGL scene or the static fallback, so server output and first paint are
 * always the (cheap) static frame.
 */
export function AgentCore(props: Props) {
  const [mode, setMode] = useState<"pending" | "gl" | "static">("pending");

  useEffect(() => {
    setMode(canRunWebGL() ? "gl" : "static");
  }, []);

  if (mode === "gl") {
    return <AgentCoreGL {...props} />;
  }
  // pending + static both render the static frame (no layout shift / flash)
  return <AgentCoreStatic className={props.className} focusIndex={props.focusIndex} />;
}
