"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glareOpacity?: number;
  scale?: number;
  transitionDuration?: number;
}

export function TiltCard({
  children,
  className,
  tiltAmount = 15,
  glareOpacity = 0.2,
  scale = 1.02,
  transitionDuration = 400,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || isTouchDevice) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (-mouseY / (rect.height / 2)) * tiltAmount;
      const rotateY = (mouseX / (rect.width / 2)) * tiltAmount;

      // Calculate glare position (percentage)
      const glareX = ((e.clientX - rect.left) / rect.width) * 100;
      const glareY = ((e.clientY - rect.top) / rect.height) * 100;

      setTransform({ rotateX, rotateY, glareX, glareY });
    },
    [tiltAmount, isTouchDevice]
  );

  const handleMouseEnter = useCallback(() => {
    // Check for touch device
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
    }
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setTransform({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  }, []);

  const cardStyle: React.CSSProperties = {
    transform: isHovering && !isTouchDevice
      ? `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
      : isTouchDevice && isHovering
      ? `scale3d(${scale}, ${scale}, ${scale})`
      : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: `transform ${transitionDuration}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
    transformStyle: "preserve-3d",
  };

  const glareStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    background: `radial-gradient(circle at ${transform.glareX}% ${transform.glareY}%, rgba(255, 255, 255, ${isHovering && !isTouchDevice ? glareOpacity : 0}) 0%, transparent 60%)`,
    transition: isHovering ? "none" : `opacity ${transitionDuration}ms ease`,
    borderRadius: "inherit",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={cn("relative will-change-transform", className)}
    >
      {children}
      <div style={glareStyle} aria-hidden="true" />
    </div>
  );
}
