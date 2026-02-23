"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Shape {
  id: number;
  type: "circle" | "ring" | "diamond" | "line";
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
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

export function FloatingShapes({
  count = 8,
  colorClass = "primary-500",
  maxSize = 120,
  minSize = 20,
  speed = 1,
  className = "",
}: FloatingShapesProps) {
  const shapes = useMemo<Shape[]>(() => {
    const shapeTypes: Shape["type"][] = ["circle", "ring", "diamond", "line"];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      type: shapeTypes[i % shapeTypes.length],
      size: Math.random() * (maxSize - minSize) + minSize,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: (15 + Math.random() * 20) / speed,
      delay: Math.random() * -20,
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
              transform: `rotate(${Math.random() * 180}deg)`,
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, 0, -20, 0],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}
    </div>
  );
}

export default FloatingShapes;
