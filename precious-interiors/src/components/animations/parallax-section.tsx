"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage: string;
  speed?: number;
  overlayColor?: string;
  className?: string;
  contentClassName?: string;
  minHeight?: string;
}

export function ParallaxSection({
  children,
  backgroundImage,
  speed = 0.3,
  overlayColor,
  className,
  contentClassName,
  minHeight = "100vh",
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Clamp speed between 0.1 and 0.5
  const clampedSpeed = Math.max(0.1, Math.min(0.5, speed));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Transform based on scroll progress
  // Negative values move up as you scroll down, creating parallax effect
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-clampedSpeed * 100}%`, `${clampedSpeed * 100}%`]
  );

  return (
    <section
      ref={sectionRef}
      className={cn("relative overflow-hidden", className)}
      style={{ minHeight }}
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 -top-[20%] -bottom-[20%] w-full"
        style={{
          y,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />

      {/* Overlay Gradient */}
      {overlayColor && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${overlayColor}, ${overlayColor})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Content Layer */}
      <div className={cn("relative z-10", contentClassName)}>{children}</div>
    </section>
  );
}

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxBackground({
  children,
  className,
  speed = 0.2,
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
