"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, PerformanceMonitor } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type * as THREE from "three";

function GlassTorus() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.22;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.4} floatIntensity={1.1}>
      <mesh ref={ref} scale={1.15}>
        <torusKnotGeometry args={[1, 0.32, 128, 20]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={1.4}
          roughness={0.15}
          metalness={0}
          ior={1.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationDistance={2}
          attenuationColor={"#ffffff"}
          transparent
        />
      </mesh>
    </Float>
  );
}

/**
 * Drives the demand-mode canvas via rAF with a hard frame budget.
 *
 * The material uses `transmission`, which makes three.js render the scene twice
 * per frame. Unthrottled that saturates the main thread on mobile (the cause of
 * the huge TBT in Lighthouse). The rotation speed is slow enough that a capped
 * cadence is visually identical while roughly halving main-thread work.
 * Also pauses entirely when the tab is hidden or the OS prefers reduced motion.
 */
function DemandDriver({ fps }: { fps: number }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    let raf = 0;
    let stopped = document.hidden;
    let last = 0;
    const interval = 1000 / fps;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      invalidate();
      return;
    }
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (stopped) return;
      if (now - last < interval) return;
      last = now;
      invalidate();
    };
    const onVis = () => {
      stopped = document.hidden;
      if (!stopped) invalidate();
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [invalidate, fps]);
  return null;
}

/**
 * Returns true when WebGL is missing or backed by a *software* rasterizer
 * (SwiftShader / llvmpipe / ANGLE software). Those environments — headless
 * Lighthouse/PageSpeed runners and very low-end phones — pay for every
 * transmission pass on the CPU, which is what produced the multi-second TBT.
 * There the canvas is skipped entirely and the CSS glass backdrop stands in.
 */
function detectGpu(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
    const ext = (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info");
    const renderer = ext
      ? String((gl as WebGLRenderingContext).getParameter(ext.UNMASKED_RENDERER_WEBGL))
      : "";
    return !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}

export default function HeroCanvas() {
  const hasGpu = useMemo(detectGpu, []);
  const isLowPower = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
      true;
    const coarse = typeof matchMedia !== "undefined" && matchMedia("(pointer: coarse)").matches;
    return coarse || cores <= 4 || memory <= 4 || saveData;
  }, []);

  const [dpr, setDpr] = useState<[number, number]>(isLowPower ? [1, 1] : [1, 1.25]);

  if (!hasGpu) return null;

  return (
    <Canvas
      dpr={dpr}
      frameloop="demand"
      gl={{
        antialias: !isLowPower,
        alpha: true,
        powerPreference: isLowPower ? "low-power" : "high-performance",
      }}
      camera={{ position: [0, 0, 4.5], fov: 38 }}
      onCreated={({ gl }) => {
        // Halve the resolution of the extra transmission pass; at this blur
        // level it is visually indistinguishable and cuts the per-frame cost.
        const renderer = gl as typeof gl & { transmissionResolutionScale?: number };
        renderer.transmissionResolutionScale = isLowPower ? 0.4 : 0.6;
      }}
    >
      <PerformanceMonitor onDecline={() => setDpr(([min]) => [min, Math.max(min, 1)])} />
      <DemandDriver fps={isLowPower ? 24 : 30} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#7d6cff" />
      <directionalLight position={[-4, -2, 3]} intensity={1} color="#5fc8e8" />
      <directionalLight position={[0, -3, -4]} intensity={0.6} color="#e89cd8" />
      <GlassTorus />
    </Canvas>
  );
}
