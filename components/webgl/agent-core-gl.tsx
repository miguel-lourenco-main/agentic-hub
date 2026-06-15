"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getAgentGraph } from "@/lib/agent-graph";
import { seededRandom } from "@/lib/seeded";
import { cn } from "@/lib/utils";

export type StrikeEvent = {
  index: number;
  agentName: string;
  type: "hire" | "invest";
  amount: number;
};

export type HoverEvent = {
  index: number;
  name: string;
  pricing: string;
  rating: number;
  /** container-relative px */
  x: number;
  y: number;
} | null;

type Props = {
  className?: string;
  /** keep one node lit (agent detail) */
  focusIndex?: number;
  /** fire periodic transaction strikes (hero) */
  strikes?: boolean;
  onStrike?: (e: StrikeEvent) => void;
  onHover?: (e: HoverEvent) => void;
};

const RADIUS = 1.62;

function makeDotTexture(): THREE.Texture {
  const s = 64;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.85)");
  g.addColorStop(0.55, "rgba(255,255,255,0.25)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeRingTexture(): THREE.Texture {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  ctx.strokeStyle = "rgba(255,255,255,1)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2 - 8, 0, Math.PI * 2);
  ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export default function AgentCoreGL({
  className,
  focusIndex,
  strikes = false,
  onStrike,
  onHover,
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const onStrikeRef = useRef(onStrike);
  const onHoverRef = useRef(onHover);
  onStrikeRef.current = onStrike;
  onHoverRef.current = onHover;
  const focusRef = useRef<number | undefined>(focusIndex);
  focusRef.current = focusIndex;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const graph = getAgentGraph();
    const count = graph.nodes.length;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 4.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    // tilt (parallax) wraps core (continuous spin)
    const tilt = new THREE.Group();
    const core = new THREE.Group();
    tilt.add(core);
    scene.add(tilt);

    // ---- nodes (points) ----
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const bright = new Float32Array(count);
    const floor = new Float32Array(count);
    graph.nodes.forEach((nd, i) => {
      positions[i * 3] = nd.x * RADIUS;
      positions[i * 3 + 1] = nd.y * RADIUS;
      positions[i * 3 + 2] = nd.z * RADIUS;
      colors[i * 3] = nd.color[0];
      colors[i * 3 + 1] = nd.color[1];
      colors[i * 3 + 2] = nd.color[2];
      sizes[i] = 14 + nd.weight * 26;
    });

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    pGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    const brightAttr = new THREE.BufferAttribute(bright, 1);
    pGeo.setAttribute("aBright", brightAttr);

    const dotTex = makeDotTexture();
    const pMat = new THREE.ShaderMaterial({
      uniforms: { uTex: { value: dotTex }, uDpr: { value: dpr } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute vec3 aColor;
        attribute float aSize;
        attribute float aBright;
        varying vec3 vColor;
        varying float vBright;
        uniform float uDpr;
        void main() {
          vColor = aColor;
          vBright = aBright;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * uDpr * (1.0 + aBright * 0.7) * (3.2 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform sampler2D uTex;
        varying vec3 vColor;
        varying float vBright;
        void main() {
          float a = texture2D(uTex, gl_PointCoord).a;
          vec3 col = vColor * (0.55 + vBright * 1.1) + vBright * 0.25;
          gl_FragColor = vec4(col, a);
        }
      `,
    });
    const points = new THREE.Points(pGeo, pMat);
    core.add(points);

    // ---- edges ----
    const eCount = graph.edges.length;
    const ePos = new Float32Array(eCount * 6);
    const eCol = new Float32Array(eCount * 6);
    graph.edges.forEach(([a, b], i) => {
      const na = graph.nodes[a]!;
      const nb = graph.nodes[b]!;
      ePos.set([na.x * RADIUS, na.y * RADIUS, na.z * RADIUS], i * 6);
      ePos.set([nb.x * RADIUS, nb.y * RADIUS, nb.z * RADIUS], i * 6 + 3);
      eCol.set([na.color[0] * 0.22, na.color[1] * 0.22, na.color[2] * 0.22], i * 6);
      eCol.set([nb.color[0] * 0.22, nb.color[1] * 0.22, nb.color[2] * 0.22], i * 6 + 3);
    });
    const eGeo = new THREE.BufferGeometry();
    eGeo.setAttribute("position", new THREE.BufferAttribute(ePos, 3));
    eGeo.setAttribute("color", new THREE.BufferAttribute(eCol, 3));
    const eMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(eGeo, eMat);
    core.add(lines);

    // ---- tracer + rings ----
    const ringTex = makeRingTexture();
    const tracerMat = new THREE.SpriteMaterial({
      map: dotTex,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0,
    });
    const tracer = new THREE.Sprite(tracerMat);
    tracer.scale.setScalar(0.22);
    core.add(tracer);

    type Ring = { sprite: THREE.Sprite; mat: THREE.SpriteMaterial; t: number; active: boolean };
    const rings: Ring[] = [];
    for (let i = 0; i < 4; i++) {
      const mat = new THREE.SpriteMaterial({
        map: ringTex,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        opacity: 0,
      });
      const sp = new THREE.Sprite(mat);
      sp.scale.setScalar(0.2);
      core.add(sp);
      rings.push({ sprite: sp, mat, t: 0, active: false });
    }
    function spawnRing(pos: THREE.Vector3, color: THREE.Color) {
      const r = rings.find((x) => !x.active) ?? rings[0]!;
      r.active = true;
      r.t = 0;
      r.sprite.position.copy(pos);
      r.mat.color.copy(color);
      r.mat.opacity = 0.9;
    }

    // ---- strike state ----
    const strikeRand = seededRandom("exchange-floor-strikes");
    let nextStrikeAt = 1.2;
    const active = {
      on: false,
      from: new THREE.Vector3(),
      ctrl: new THREE.Vector3(),
      to: new THREE.Vector3(),
      t: 0,
      dur: 0.78,
      targetIndex: 0,
      color: new THREE.Color(),
    };
    function beginStrike() {
      const targetIndex = Math.floor(strikeRand() * count);
      const nd = graph.nodes[targetIndex]!;
      const to = new THREE.Vector3(nd.x * RADIUS, nd.y * RADIUS, nd.z * RADIUS);
      const a1 = strikeRand() * Math.PI * 2;
      const a2 = strikeRand() * Math.PI - Math.PI / 2;
      const from = new THREE.Vector3(
        Math.cos(a1) * Math.cos(a2),
        Math.sin(a2),
        Math.sin(a1) * Math.cos(a2)
      ).multiplyScalar(RADIUS * 2.5);
      const ctrl = from.clone().add(to).multiplyScalar(0.5).multiplyScalar(1.35);
      active.on = true;
      active.t = 0;
      active.from.copy(from);
      active.to.copy(to);
      active.ctrl.copy(ctrl);
      active.targetIndex = targetIndex;
      active.color.setRGB(nd.color[0], nd.color[1], nd.color[2]);
      tracerMat.color.copy(active.color);

      const type: "hire" | "invest" = strikeRand() > 0.62 ? "invest" : "hire";
      const amount =
        type === "invest"
          ? Math.round((5 + strikeRand() * 120) * 100) / 100
          : Math.round((0.005 + strikeRand() * 0.05) * 1000) / 1000;
      onStrikeRef.current?.({ index: targetIndex, agentName: nd.name, type, amount });
    }

    // ---- pointer ----
    const pointer = { px: 0, py: 0, inside: false };
    const targetTilt = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.px = e.clientX - rect.left;
      pointer.py = e.clientY - rect.top;
      const nx = (pointer.px / rect.width) * 2 - 1;
      const ny = -((pointer.py / rect.height) * 2 - 1);
      pointer.inside = true;
      targetTilt.y = nx * 0.34;
      targetTilt.x = -ny * 0.26;
    };
    const onPointerLeave = () => {
      pointer.inside = false;
      targetTilt.x = 0;
      targetTilt.y = 0;
      onHoverRef.current?.(null);
    };
    mount.addEventListener("pointermove", onPointerMove);
    mount.addEventListener("pointerleave", onPointerLeave);

    // ---- sizing ----
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---- pause when offscreen / hidden ----
    let visible = !document.hidden;
    let onscreen = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        onscreen = !!entry?.isIntersecting;
      },
      { threshold: 0.01 }
    );
    io.observe(mount);
    const onVis = () => (visible = !document.hidden);
    document.addEventListener("visibilitychange", onVis);

    // ---- loop ----
    const proj = new THREE.Vector3();
    let raf = 0;
    let last = performance.now();
    let hoverIndex = -1;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!visible || !onscreen) return;

      // spin core, ease tilt parent
      core.rotation.y += dt * 0.12;
      core.rotation.x = Math.sin(now * 0.0002) * 0.08;
      tilt.rotation.x += (targetTilt.x - tilt.rotation.x) * 0.06;
      tilt.rotation.y += (targetTilt.y - tilt.rotation.y) * 0.06;

      const fi = focusRef.current;

      // brightness decay toward floor (focus stays lit)
      for (let i = 0; i < count; i++) {
        const f = fi === i ? 0.95 : floor[i]!;
        bright[i] = f + (bright[i]! - f) * 0.9;
      }

      // ensure world matrices current before projecting
      core.updateWorldMatrix(true, false);

      // hover detection (skip on detail/focus mode)
      if (pointer.inside && fi === undefined) {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        let best = -1;
        let bestD = 34;
        for (let i = 0; i < count; i++) {
          proj.set(positions[i * 3]!, positions[i * 3 + 1]!, positions[i * 3 + 2]!);
          proj.applyMatrix4(core.matrixWorld);
          proj.project(camera);
          if (proj.z >= 1) continue;
          const sx = (proj.x * 0.5 + 0.5) * w;
          const sy = (-proj.y * 0.5 + 0.5) * h;
          const d = Math.hypot(sx - pointer.px, sy - pointer.py);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        if (best >= 0) {
          bright[best] = Math.max(bright[best]!, 1.0);
          const nd = graph.nodes[best]!;
          onHoverRef.current?.({
            index: best,
            name: nd.name,
            pricing: nd.pricing,
            rating: nd.rating,
            x: pointer.px,
            y: pointer.py,
          });
          hoverIndex = best;
        } else if (hoverIndex !== -1) {
          hoverIndex = -1;
          onHoverRef.current?.(null);
        }
      }

      // strikes
      if (strikes) {
        if (!active.on) {
          nextStrikeAt -= dt;
          if (nextStrikeAt <= 0) {
            beginStrike();
            nextStrikeAt = 2.8 + strikeRand() * 2.6;
          }
        } else {
          active.t += dt / active.dur;
          const t = Math.min(1, active.t);
          const it = 1 - t;
          proj
            .copy(active.from)
            .multiplyScalar(it * it)
            .addScaledVector(active.ctrl, 2 * it * t)
            .addScaledVector(active.to, t * t);
          tracer.position.copy(proj);
          tracerMat.opacity = Math.sin(t * Math.PI) * 0.95;
          tracer.scale.setScalar(0.16 + Math.sin(t * Math.PI) * 0.12);
          if (t >= 1) {
            active.on = false;
            tracerMat.opacity = 0;
            bright[active.targetIndex] = 1.8;
            spawnRing(active.to, active.color);
          }
        }
      }

      // rings expand + fade
      for (const r of rings) {
        if (!r.active) continue;
        r.t += dt / 0.9;
        if (r.t >= 1) {
          r.active = false;
          r.mat.opacity = 0;
          continue;
        }
        r.sprite.scale.setScalar(0.2 + r.t * 1.1);
        r.mat.opacity = (1 - r.t) * 0.8;
      }

      brightAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      io.disconnect();
      pGeo.dispose();
      pMat.dispose();
      eGeo.dispose();
      eMat.dispose();
      dotTex.dispose();
      ringTex.dispose();
      tracerMat.dispose();
      rings.forEach((r) => r.mat.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={cn("h-full w-full", className)} />;
}
