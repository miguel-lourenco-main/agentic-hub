"use client";

import { useEffect, useRef } from "react";
import { getAgentGraph } from "@/lib/agent-graph";
import { seededRandom } from "@/lib/seeded";
import { cn } from "@/lib/utils";

/**
 * Zero-animation fallback for the Agent Core: a single seeded frame of the same
 * node/edge constellation drawn on a 2D canvas. Used on touch / low-power /
 * reduced-motion devices so the brand totem still appears with no WebGL cost.
 */
export default function AgentCoreStatic({
  className,
  focusIndex,
}: {
  className?: string;
  focusIndex?: number;
}) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const graph = getAgentGraph();
    const rand = seededRandom("core-static-brightness");
    const draw = () => {
      const w = parent.clientWidth || 1;
      const h = parent.clientHeight || 1;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.38;
      const focal = 3;
      // tiny fixed rotation so the static frame reads as 3-D, not a flat disc
      const ry = 0.5;
      const project = (x: number, y: number, z: number) => {
        const xr = x * Math.cos(ry) - z * Math.sin(ry);
        const zr = x * Math.sin(ry) + z * Math.cos(ry);
        const s = focal / (focal - zr);
        return { sx: cx + xr * R * s, sy: cy - y * R * s, s };
      };

      // edges
      ctx.lineWidth = 1;
      graph.edges.forEach(([a, b]) => {
        const na = graph.nodes[a]!;
        const nb = graph.nodes[b]!;
        const pa = project(na.x, na.y, na.z);
        const pb = project(nb.x, nb.y, nb.z);
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      });

      // nodes
      graph.nodes.forEach((nd, i) => {
        const p = project(nd.x, nd.y, nd.z);
        const lit = focusIndex === i ? 1 : 0.4 + rand() * 0.6;
        const radius = (5 + nd.weight * 7) * p.s * (0.6 + lit * 0.6);
        const [r, g, bl] = nd.color;
        const col = `${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(bl * 255)}`;
        const grad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, radius);
        grad.addColorStop(0, `rgba(${col},${0.9 * lit})`);
        grad.addColorStop(0.4, `rgba(${col},${0.4 * lit})`);
        grad.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [focusIndex]);

  return (
    <div className={cn("relative h-full w-full", className)}>
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
