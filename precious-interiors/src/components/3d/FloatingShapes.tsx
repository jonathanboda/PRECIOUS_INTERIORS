"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  geometry: "torus" | "icosahedron" | "octahedron";
  scale?: number;
  rotationSpeed?: number;
  floatSpeed?: number;
  floatAmplitude?: number;
}

function FloatingShape({
  position,
  geometry,
  scale = 1,
  rotationSpeed = 0.5,
  floatSpeed = 1,
  floatAmplitude = 0.3,
}: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  const timeOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const { pointer } = useThree();

  const geometryComponent = useMemo(() => {
    switch (geometry) {
      case "torus":
        return <torusGeometry args={[1, 0.3, 16, 32]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      default:
        return <octahedronGeometry args={[1, 0]} />;
    }
  }, [geometry]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Floating animation
    meshRef.current.position.y =
      initialY + Math.sin(time * floatSpeed + timeOffset) * floatAmplitude;

    // Rotation animation
    meshRef.current.rotation.x += 0.002 * rotationSpeed;
    meshRef.current.rotation.y += 0.003 * rotationSpeed;

    // Mouse responsiveness - subtle movement towards cursor
    const mouseInfluence = 0.1;
    meshRef.current.position.x +=
      (position[0] + pointer.x * mouseInfluence - meshRef.current.position.x) *
      0.02;
    meshRef.current.position.z +=
      (position[2] + pointer.y * mouseInfluence - meshRef.current.position.z) *
      0.02;

    // Invalidate for demand frameloop
    state.invalidate();
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometryComponent}
      <meshBasicMaterial
        color="#c9a227"
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

interface FloatingShapesProps {
  count?: number;
  spread?: number;
}

export default function FloatingShapes({
  count = 5,
  spread = 8,
}: FloatingShapesProps) {
  const shapes = useMemo(() => {
    const geometries: ("torus" | "icosahedron" | "octahedron")[] = [
      "torus",
      "icosahedron",
      "octahedron",
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread * 0.6,
        (Math.random() - 0.5) * spread * 0.5 - 2,
      ] as [number, number, number],
      geometry: geometries[i % geometries.length],
      scale: 0.3 + Math.random() * 0.4,
      rotationSpeed: 0.3 + Math.random() * 0.7,
      floatSpeed: 0.5 + Math.random() * 1,
      floatAmplitude: 0.2 + Math.random() * 0.3,
    }));
  }, [count, spread]);

  return (
    <group>
      <ambientLight intensity={0.5} />
      {shapes.map((shape) => (
        <FloatingShape
          key={shape.id}
          position={shape.position}
          geometry={shape.geometry}
          scale={shape.scale}
          rotationSpeed={shape.rotationSpeed}
          floatSpeed={shape.floatSpeed}
          floatAmplitude={shape.floatAmplitude}
        />
      ))}
    </group>
  );
}
