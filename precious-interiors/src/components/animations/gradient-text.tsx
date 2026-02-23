"use client";

import { cn } from "@/lib/utils";

interface GradientTextProps {
  /** Text content or children to apply gradient to */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Gradient color stops - defaults to green theme */
  colors?: {
    from: string;
    via?: string;
    to: string;
  };
  /** Whether to animate the gradient */
  animate?: boolean;
  /** HTML tag to render */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}

export function GradientText({
  children,
  className,
  duration = 3,
  colors = {
    from: "#22c55e", // green-500
    via: "#10b981", // emerald-500
    to: "#059669", // emerald-600
  },
  animate = true,
  as: Component = "span",
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: colors.via
      ? `linear-gradient(90deg, ${colors.from}, ${colors.via}, ${colors.to}, ${colors.from})`
      : `linear-gradient(90deg, ${colors.from}, ${colors.to}, ${colors.from})`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: animate ? `gradient-shift ${duration}s linear infinite` : "none",
  } as React.CSSProperties;

  return (
    <>
      <style jsx global>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }
      `}</style>
      <Component className={cn("inline-block", className)} style={gradientStyle}>
        {children}
      </Component>
    </>
  );
}

interface ShimmerTextProps {
  /** Text content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** Base text color */
  baseColor?: string;
  /** Shimmer highlight color */
  shimmerColor?: string;
  /** HTML tag to render */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}

export function ShimmerText({
  children,
  className,
  duration = 2,
  baseColor = "#22c55e",
  shimmerColor = "#86efac",
  as: Component = "span",
}: ShimmerTextProps) {
  const shimmerStyle = {
    backgroundImage: `linear-gradient(
      90deg,
      ${baseColor} 0%,
      ${baseColor} 40%,
      ${shimmerColor} 50%,
      ${baseColor} 60%,
      ${baseColor} 100%
    )`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: `shimmer ${duration}s ease-in-out infinite`,
  } as React.CSSProperties;

  return (
    <>
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
      <Component className={cn("inline-block", className)} style={shimmerStyle}>
        {children}
      </Component>
    </>
  );
}

interface GlowTextProps {
  /** Text content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Glow color */
  glowColor?: string;
  /** Animation duration in seconds */
  duration?: number;
  /** HTML tag to render */
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div";
}

export function GlowText({
  children,
  className,
  glowColor = "#22c55e",
  duration = 2,
  as: Component = "span",
}: GlowTextProps) {
  const glowStyle = {
    color: glowColor,
    animation: `text-glow ${duration}s ease-in-out infinite`,
    "--glow-color": glowColor,
  } as React.CSSProperties;

  return (
    <>
      <style jsx global>{`
        @keyframes text-glow {
          0%,
          100% {
            text-shadow: 0 0 10px var(--glow-color), 0 0 20px var(--glow-color),
              0 0 30px var(--glow-color);
          }
          50% {
            text-shadow: 0 0 5px var(--glow-color), 0 0 10px var(--glow-color),
              0 0 15px var(--glow-color);
          }
        }
      `}</style>
      <Component className={cn("inline-block", className)} style={glowStyle}>
        {children}
      </Component>
    </>
  );
}
