import { agents } from "@/data/agents";
import { RGB } from "@/lib/brand";

export type GraphNode = {
  id: string;
  name: string;
  category: string;
  rating: number;
  pricing: string;
  /** unit-sphere position */
  x: number;
  y: number;
  z: number;
  /** size weight ~0.6..1.4 from reviewCount */
  weight: number;
  /** rgb 0..1 */
  color: [number, number, number];
};

export type AgentGraph = {
  nodes: GraphNode[];
  edges: [number, number][];
};

const CATEGORY_ORDER = [
  "Development",
  "Analytics",
  "Content",
  "Customer Support",
  "Research",
];

function lerp3(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

let cached: AgentGraph | null = null;

/**
 * Deterministic node/edge layout for the Agent Core, shared by the WebGL scene
 * and the static fallback so they look identical. Positions use a Fibonacci
 * sphere (even, stable) — no Math.random at module scope.
 */
export function getAgentGraph(): AgentGraph {
  if (cached) return cached;

  const n = agents.length;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const maxReviews = Math.max(...agents.map((a) => a.reviewCount));

  const nodes: GraphNode[] = agents.map((agent, i) => {
    // Fibonacci sphere
    const y = 1 - (i / (n - 1)) * 2; // 1 .. -1
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;

    const catIndex = Math.max(0, CATEGORY_ORDER.indexOf(agent.category));
    const t = catIndex / (CATEGORY_ORDER.length - 1);
    // gold -> violet across categories keeps it on-brand with variety
    const color = lerp3([...RGB.gold], [...RGB.violet], t * 0.85);

    return {
      id: agent.id,
      name: agent.name,
      category: agent.category,
      rating: agent.rating,
      pricing: agent.pricing,
      x,
      y,
      z,
      weight: 0.6 + (agent.reviewCount / maxReviews) * 0.8,
      color,
    };
  });

  // connect each node to its 2 nearest neighbours (dedup undirected)
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i]!;
    const dists: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const b = nodes[j]!;
      const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
      dists.push({ j, d });
    }
    dists.sort((p, q) => p.d - q.d);
    for (let k = 0; k < 2; k++) {
      const j = dists[k]!.j;
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([i, j]);
      }
    }
  }

  cached = { nodes, edges };
  return cached;
}

export function findNodeIndexById(id: string): number {
  return getAgentGraph().nodes.findIndex((n) => n.id === id);
}
