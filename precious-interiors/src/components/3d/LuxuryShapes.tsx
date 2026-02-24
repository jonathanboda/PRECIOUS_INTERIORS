"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Diamond Shape - Premium luxury element (optimized)
interface DiamondProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  rotationSpeed?: number;
}

export function Diamond({
  position = [0, 0, 0],
  scale = 1,
  color = "#c9a227",
  rotationSpeed = 0.3,
}: DiamondProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const frameCount = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Throttle to 30fps
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    const time = state.clock.elapsedTime;
    meshRef.current.rotation.y = time * rotationSpeed;
    meshRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.15;
    state.invalidate();
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        metalness={0.95}
        roughness={0.05}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Luxury Ring - Floating ring with emission (optimized)
interface LuxuryRingProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  rotationSpeed?: number;
}

export function LuxuryRing({
  position = [0, 0, 0],
  scale = 1,
  color = "#c9a227",
  rotationSpeed = 0.5,
}: LuxuryRingProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const frameCount = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Throttle to 30fps
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    const time = state.clock.elapsedTime;
    meshRef.current.rotation.x = time * rotationSpeed * 0.5;
    meshRef.current.rotation.y = time * rotationSpeed;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.6) * 0.2;
    state.invalidate();
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.15, 16, 32]} /> {/* Reduced segments for performance */}
      <meshStandardMaterial
        color={color}
        metalness={0.9}
        roughness={0.1}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

// Floating Crystal - Lightweight alternative to MorphingBlob
interface FloatingCrystalProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

export function FloatingCrystal({
  position = [0, 0, 0],
  scale = 1,
  color = "#1a3a2f",
}: FloatingCrystalProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const frameCount = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Throttle to 30fps
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    const time = state.clock.elapsedTime;
    meshRef.current.rotation.y = time * 0.2;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
    meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.25;
    state.invalidate();
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} /> {/* Lower detail than MorphingBlob */}
      <meshStandardMaterial
        color={color}
        metalness={0.4}
        roughness={0.6}
        emissive={color}
        emissiveIntensity={0.15}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// Optimized Luxury Particles
interface LuxuryParticlesProps {
  count?: number;
  spread?: number;
  size?: number;
  color?: string;
}

export function LuxuryParticles({
  count = 60, // Reduced from 200
  spread = 12,
  size = 0.04,
  color = "#c9a227",
}: LuxuryParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const frameCount = useRef(0);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * spread;
      pos[i3 + 1] = (Math.random() - 0.5) * spread;
      pos[i3 + 2] = (Math.random() - 0.5) * spread * 0.5 - 2;

      vel[i3] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 1] = Math.random() * 0.005 + 0.002;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return [pos, vel];
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

      // Floating motion
      posArray[i3] += velocities[i3] + Math.sin(time + i) * 0.0008;
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2];

      // Reduced mouse influence
      posArray[i3] += (pointer.x * 0.03 - posArray[i3]) * 0.0008;
      posArray[i3 + 2] += (pointer.y * 0.03 - posArray[i3 + 2]) * 0.0008;

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
        size={size}
        color={color}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Glowing Sphere with pulse effect (optimized)
interface GlowingSphereProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

export function GlowingSphere({
  position = [0, 0, 0],
  scale = 1,
  color = "#c9a227",
}: GlowingSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const frameCount = useRef(0);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;

    // Throttle to 30fps
    frameCount.current++;
    if (frameCount.current % 2 !== 0) return;

    const time = state.clock.elapsedTime;
    const pulse = Math.sin(time * 2) * 0.1 + 1;

    meshRef.current.scale.setScalar(scale * pulse);
    glowRef.current.scale.setScalar(scale * pulse * 1.3);

    meshRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.2;
    glowRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.2;

    state.invalidate();
  });

  return (
    <group position={position}>
      {/* Glow outer layer */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} /> {/* Reduced segments */}
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </mesh>

      {/* Main sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.8, 16, 16]} /> {/* Reduced segments */}
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

// Premium floating shapes group (optimized)
interface PremiumShapesProps {
  variant?: "hero" | "section" | "minimal";
}

export function PremiumShapes({ variant = "hero" }: PremiumShapesProps) {
  const config = useMemo(() => {
    switch (variant) {
      case "hero":
        return {
          diamonds: [
            { position: [-4, 2, -3] as [number, number, number], scale: 0.4 },
            { position: [5, -1, -4] as [number, number, number], scale: 0.3 },
          ],
          rings: [
            { position: [3, 3, -5] as [number, number, number], scale: 0.5 },
          ],
          crystals: [
            { position: [-3, -2, -3] as [number, number, number], scale: 0.35 },
          ],
          spheres: [
            { position: [4, -2, -3] as [number, number, number], scale: 0.3 },
          ],
          particles: 50,
        };
      case "section":
        return {
          diamonds: [
            { position: [3, 1, -2] as [number, number, number], scale: 0.3 },
          ],
          rings: [],
          crystals: [],
          spheres: [],
          particles: 30,
        };
      case "minimal":
        return {
          diamonds: [
            { position: [2, 0, -2] as [number, number, number], scale: 0.25 },
          ],
          rings: [],
          crystals: [],
          spheres: [],
          particles: 20,
        };
      default:
        return { diamonds: [], rings: [], crystals: [], spheres: [], particles: 0 };
    }
  }, [variant]);

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#fff5e0" />

      {config.diamonds.map((d, i) => (
        <Diamond key={`diamond-${i}`} position={d.position} scale={d.scale} />
      ))}

      {config.rings.map((r, i) => (
        <LuxuryRing key={`ring-${i}`} position={r.position} scale={r.scale} />
      ))}

      {config.crystals.map((c, i) => (
        <FloatingCrystal key={`crystal-${i}`} position={c.position} scale={c.scale} />
      ))}

      {config.spheres.map((s, i) => (
        <GlowingSphere key={`sphere-${i}`} position={s.position} scale={s.scale} />
      ))}

      {config.particles > 0 && (
        <LuxuryParticles count={config.particles} spread={10} />
      )}
    </group>
  );
}

export default PremiumShapes;
