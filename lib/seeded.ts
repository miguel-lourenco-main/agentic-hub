// Deterministic pseudo-randomness for mock data. The app is statically
// exported, so build-time HTML must match client hydration — never use
// Math.random() or Date.now() when generating demo data.

/** FNV-ish string hash → unsigned 32-bit seed. */
function hashString(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

/** Mulberry32 PRNG: same seed always yields the same [0,1) sequence. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Stable RNG keyed by string (agent id, chart series, etc.). */
export function seededRandom(key: string): () => number {
  return mulberry32(hashString(key));
}
