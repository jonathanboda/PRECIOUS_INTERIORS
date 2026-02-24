"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Unified Hero Scene - All 3D elements in single Canvas for performance

// Floating Shape Component
function FloatingShape({
  position,
  geometry,
  color = "#c9a227",
  scale = 1,
  rotationSpeed = 0.2,
  floatSpeed = 0.5,
  floatAmplitude = 0.2,
}: {
  position: [number, number, number];
  geometry: "octahedron" | "torus" | "icosahedron" | "sphere";
  color?: string;
  scale?: number;
  rotationSpeed?: number;
  floatSpeed?: number;
  floatAmplitude?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const frameCount = useRef(0);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;

    // Throttle to 30fps
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    const time = state.clock.elapsedTime;
    meshRef.current.rotation.y = time * rotationSpeed;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    meshRef.current.position.y = initialY + Math.sin(time * floatSpeed) * floatAmplitude;
  });

  const geometryComponent = useMemo(() => {
    switch (geometry) {
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[1, 0.15, 16, 32]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      case "sphere":
        return <sphereGeometry args={[1, 16, 16]} />;
      default:
        return <octahedronGeometry args={[1, 0]} />;
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometryComponent}
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.25}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// Optimized Particles for Hero
function HeroParticles({
  count = 60,
  spread = 18,
  color = "#c9a227",
}: {
  count?: number;
  spread?: number;
  color?: string;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const frameCount = useRef(0);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * spread;
      pos[i3 + 1] = (Math.random() - 0.5) * spread;
      pos[i3 + 2] = (Math.random() - 0.5) * spread * 0.4 - 3;

      vel[i3] = (Math.random() - 0.5) * 0.008;
      vel[i3 + 1] = Math.random() * 0.004 + 0.001;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.004;
    }

    return { positions: pos, velocities: vel };
  }, [count, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Throttle to 30fps
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    const positionAttr = pointsRef.current.geometry.attributes.position;
    const posArray = positionAttr.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Gentle floating motion
      posArray[i3] += velocities[i3] + Math.sin(time + i) * 0.0005;
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Subtle mouse influence
      posArray[i3] += (pointer.x * 0.02 - posArray[i3]) * 0.0005;

      // Reset when out of bounds
      if (posArray[i3 + 1] > spread / 2) {
        posArray[i3 + 1] = -spread / 2;
        posArray[i3] = (Math.random() - 0.5) * spread;
      }
    }

    positionAttr.needsUpdate = true;
    state.invalidate();
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Unified Hero 3D Scene
export default function HeroScene() {
  const [isVisible, setIsVisible] = useState(true);
  const groupRef = useRef<THREE.Group>(null);
  const frameCount = useRef(0);

  // Visibility detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    const canvas = document.querySelector('canvas');
    if (canvas?.parentElement) {
      observer.observe(canvas.parentElement);
    }

    return () => observer.disconnect();
  }, []);

  useFrame((state) => {
    if (!isVisible || !groupRef.current) return;

    // Throttle to 30fps
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    // Subtle rotation of entire scene
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    state.invalidate();
  });

  // Shape configuration
  const shapes = useMemo(() => [
    // Gold diamonds
    { position: [-4, 2, -4] as [number, number, number], geometry: "octahedron" as const, scale: 0.35, color: "#c9a227" },
    { position: [5, -1, -5] as [number, number, number], geometry: "octahedron" as const, scale: 0.25, color: "#c9a227" },
    // Floating rings
    { position: [4, 3, -6] as [number, number, number], geometry: "torus" as const, scale: 0.45, color: "#c9a227" },
    { position: [-5, -2, -4] as [number, number, number], geometry: "torus" as const, scale: 0.3, color: "#d4af37" },
    // Green crystals
    { position: [-3, -3, -3] as [number, number, number], geometry: "icosahedron" as const, scale: 0.3, color: "#1a3a2f" },
    { position: [3, 1, -5] as [number, number, number], geometry: "icosahedron" as const, scale: 0.25, color: "#2d5a4a" },
    // Spheres
    { position: [6, -3, -5] as [number, number, number], geometry: "sphere" as const, scale: 0.25, color: "#c9a227" },
  ], []);

  if (!isVisible) return null;

  return (
    <group ref={groupRef}>
      {/* Lighting - Single light setup */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.7} color="#fff5e0" />

      {/* Floating Shapes */}
      {shapes.map((shape, i) => (
        <FloatingShape
          key={i}
          position={shape.position}
          geometry={shape.geometry}
          scale={shape.scale}
          color={shape.color}
          rotationSpeed={0.15 + i * 0.02}
          floatSpeed={0.4 + i * 0.05}
          floatAmplitude={0.15 + i * 0.02}
        />
      ))}

      {/* Unified Particle System */}
      <HeroParticles count={70} spread={20} />
    </group>
  );
}
