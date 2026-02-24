"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  size?: number;
  color?: string;
}

export default function ParticleField({
  count = 80, // Reduced from 200 for performance
  spread = 15,
  size = 0.06,
  color = "#c9a227",
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const frameCount = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  // Visibility detection for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    // Observe the canvas parent
    const canvas = document.querySelector('canvas');
    if (canvas?.parentElement) {
      observer.observe(canvas.parentElement);
    }

    return () => observer.disconnect();
  }, []);

  // Store initial positions and velocities for animation
  const { positions, initialPositions, velocities, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const initialPositions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random positions within spread area
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread * 0.5 - 3;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      initialPositions[i3] = x;
      initialPositions[i3 + 1] = y;
      initialPositions[i3 + 2] = z;

      // Random velocities for ambient floating
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

      // Varying particle sizes
      sizes[i] = size * (0.5 + Math.random() * 1.5);
    }

    return { positions, initialPositions, velocities, sizes };
  }, [count, spread, size]);

  useFrame((state) => {
    // Skip if not visible or throttle to every 2nd frame
    if (!isVisible || !pointsRef.current) return;

    frameCount.current++;
    if (frameCount.current % 2 !== 0) return; // Run at 30fps instead of 60fps

    const positionAttribute = pointsRef.current.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const posArray = positionAttribute.array as Float32Array;

    const time = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Ambient floating animation
      posArray[i3] =
        initialPositions[i3] +
        Math.sin(time * velocities[i3] * 10 + i) * 0.5 +
        pointer.x * 0.2; // Reduced mouse influence

      posArray[i3 + 1] =
        initialPositions[i3 + 1] +
        Math.cos(time * velocities[i3 + 1] * 10 + i) * 0.5;

      posArray[i3 + 2] =
        initialPositions[i3 + 2] +
        Math.sin(time * velocities[i3 + 2] * 10 + i * 0.5) * 0.3 +
        pointer.y * 0.15; // Reduced mouse influence
    }

    positionAttribute.needsUpdate = true;

    // Slow rotation of entire particle field
    pointsRef.current.rotation.y = time * 0.015;

    // Invalidate for demand frameloop
    state.invalidate();
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
