"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

interface Shape {
  id: number;
  type: "circle" | "ring" | "diamond" | "line";
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  rotation: number;
}

interface FloatingShapesProps {
  /** Number of shapes to render */
  count?: number;
  /** Base color for shapes (tailwind color class without opacity) */
  colorClass?: string;
  /** Maximum size of shapes in pixels */
  maxSize?: number;
  /** Minimum size of shapes in pixels */
  minSize?: number;
  /** Animation speed multiplier (1 = default, < 1 slower, > 1 faster) */
  speed?: number;
  /** Additional CSS classes for the container */
  className?: string;
}

// Seeded pseudo-random function for consistent values between server and client
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export function FloatingShapes({
  count = 8,
  colorClass = "primary-500",
  maxSize = 120,
  minSize = 20,
  speed = 1,
  className = "",
}: FloatingShapesProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shapes = useMemo<Shape[]>(() => {
    const shapeTypes: Shape["type"][] = ["circle", "ring", "diamond", "line"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      type: shapeTypes[i % shapeTypes.length],
      size: seededRandom(i * 1.1) * (maxSize - minSize) + minSize,
      x: seededRandom(i * 2.2) * 100,
      y: seededRandom(i * 3.3) * 100,
      duration: (15 + seededRandom(i * 4.4) * 20) / speed,
      delay: seededRandom(i * 5.5) * -20,
      rotation: seededRandom(i * 6.6) * 180,
    }));
  }, [count, maxSize, minSize, speed]);

  const renderShape = (shape: Shape) => {
    const baseClasses = `absolute bg-${colorClass}/10`;

    switch (shape.type) {
      case "circle":
        return (
          <div
            className={`${baseClasses} rounded-full`}
            style={{ width: shape.size, height: shape.size }}
          />
        );
      case "ring":
        return (
          <div
            className={`absolute rounded-full border-2 border-${colorClass}/15 bg-transparent`}
            style={{ width: shape.size, height: shape.size }}
          />
        );
      case "diamond":
        return (
          <div
            className={`${baseClasses} rotate-45`}
            style={{ width: shape.size * 0.7, height: shape.size * 0.7 }}
          />
        );
      case "line":
        return (
          <div
            className={`absolute bg-${colorClass}/10 rounded-full`}
            style={{
              width: shape.size * 1.5,
              height: 2,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        );
      default:
        return null;
    }
  };

  // Don't render on server to avoid hydration mismatch
  if (!isMounted) {
    return <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} />;
  }

  // Static shapes - no infinite animations for better performance
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute opacity-30"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            transform: `rotate(${shape.rotation}deg)`,
          }}
        >
          {renderShape(shape)}
        </div>
      ))}
    </div>
  );
}

export default FloatingShapes;
