"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  /** Target number to count to */
  target: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Suffix to display after the number (e.g., "+", "K", "%") */
  suffix?: string;
  /** Prefix to display before the number (e.g., "$") */
  prefix?: string;
  /** Number of decimal places */
  decimals?: number;
  /** Additional CSS classes */
  className?: string;
  /** Delay before animation starts (in seconds) */
  delay?: number;
}

export function AnimatedCounter({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;

      const controls = animate(0, target, {
        duration,
        delay,
        ease: "easeOut",
        onUpdate: (value) => {
          setDisplayValue(value.toFixed(decimals));
        },
      });

      return () => controls.stop();
    }
  }, [isInView, target, duration, delay, decimals]);

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  );
}

interface AnimatedCounterGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedCounterGroup({
  children,
  className,
}: AnimatedCounterGroupProps) {
  return (
    <div className={cn("flex items-center gap-8", className)}>
      {children}
    </div>
  );
}

interface StatItemProps {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function StatItem({
  target,
  suffix,
  prefix,
  label,
  duration = 2,
  decimals = 0,
  className,
}: StatItemProps) {
  return (
    <div className={cn("text-center", className)}>
      <AnimatedCounter
        target={target}
        duration={duration}
        suffix={suffix}
        prefix={prefix}
        decimals={decimals}
        className="text-4xl font-bold text-green-600"
      />
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
