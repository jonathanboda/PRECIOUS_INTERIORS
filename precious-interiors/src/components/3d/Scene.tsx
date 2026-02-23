"use client";

import { Suspense, ReactNode } from "react";
import { Canvas, CanvasProps } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

interface SceneProps {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
}

function Fallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/50">
      <div className="text-neutral-400 text-sm">Loading 3D content...</div>
    </div>
  );
}

function WebGLFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-900/20 to-neutral-900/20">
      <div className="text-neutral-500 text-sm text-center p-4">
        <p>3D content unavailable</p>
        <p className="text-xs mt-1">WebGL is not supported in your browser</p>
      </div>
    </div>
  );
}

export default function Scene({
  children,
  className = "",
  cameraPosition = [0, 0, 5],
}: SceneProps) {
  // Check for WebGL support
  const isWebGLSupported = (() => {
    if (typeof window === "undefined") return true;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  })();

  if (!isWebGLSupported) {
    return <WebGLFallback />;
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Suspense fallback={<Fallback />}>
        <Canvas
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: true,
          }}
          dpr={[1, 2]}
          camera={{ position: cameraPosition, fov: 45 }}
          frameloop="demand"
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>{children}</Suspense>
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}

// Export a performance-optimized version for background usage
export function BackgroundScene({
  children,
  className = "",
}: Omit<SceneProps, "cameraPosition">) {
  const isWebGLSupported = (() => {
    if (typeof window === "undefined") return true;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch {
      return false;
    }
  })();

  if (!isWebGLSupported) {
    return null; // Silent fail for background scenes
  }

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Suspense fallback={null}>
        <Canvas
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "low-power",
            failIfMajorPerformanceCaveat: true,
          }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 10], fov: 45 }}
          frameloop="demand"
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      </Suspense>
    </div>
  );
}
