"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  className?: string;
  asLink?: boolean;
}

const sizeConfig = {
  sm: {
    text: "text-base",
    interiors: "text-xs",
    spacing: "tracking-[0.08em]",
    interiorsSpacing: "tracking-[0.12em]",
    cornerSize: 6,
    cornerStroke: 1.5,
    padding: "px-3 py-1.5",
    gap: "gap-1.5",
  },
  md: {
    text: "text-lg md:text-xl",
    interiors: "text-xs md:text-sm",
    spacing: "tracking-[0.1em]",
    interiorsSpacing: "tracking-[0.15em]",
    cornerSize: 8,
    cornerStroke: 1.5,
    padding: "px-4 py-2",
    gap: "gap-2",
  },
  lg: {
    text: "text-xl md:text-2xl",
    interiors: "text-sm md:text-base",
    spacing: "tracking-[0.1em]",
    interiorsSpacing: "tracking-[0.15em]",
    cornerSize: 10,
    cornerStroke: 2,
    padding: "px-5 py-2.5",
    gap: "gap-2",
  },
};

function Corner({
  position,
  size,
  stroke,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size: number;
  stroke: number;
}) {
  const getPath = () => {
    switch (position) {
      case "top-left":
        return `M ${size} 0 L 0 0 L 0 ${size}`;
      case "top-right":
        return `M 0 0 L ${size} 0 L ${size} ${size}`;
      case "bottom-left":
        return `M 0 0 L 0 ${size} L ${size} ${size}`;
      case "bottom-right":
        return `M 0 ${size} L ${size} ${size} L ${size} 0`;
    }
  };

  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
  };

  return (
    <svg
      className={cn("absolute", positionClasses[position])}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <path
        d={getPath()}
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="square"
        className="text-gold-500"
      />
    </svg>
  );
}

export function Logo({ size = "md", variant = "light", className, asLink = true }: LogoProps) {
  const config = sizeConfig[size];

  const logoContent = (
    <div
      className={cn(
        "relative inline-flex items-baseline",
        config.padding,
        config.gap,
        className
      )}
    >
      {/* Corner decorations */}
      <Corner position="top-left" size={config.cornerSize} stroke={config.cornerStroke} />
      <Corner position="top-right" size={config.cornerSize} stroke={config.cornerStroke} />
      <Corner position="bottom-left" size={config.cornerSize} stroke={config.cornerStroke} />
      <Corner position="bottom-right" size={config.cornerSize} stroke={config.cornerStroke} />

      {/* Text */}
      <span
        className={cn(
          "font-cinzel font-semibold",
          config.text,
          config.spacing,
          variant === "light" ? "text-white" : "text-neutral-900"
        )}
      >
        The Precious
      </span>
      <span
        className={cn(
          "font-cinzel font-semibold uppercase text-gold-500",
          config.interiors,
          config.interiorsSpacing
        )}
      >
        Interiors
      </span>
    </div>
  );

  if (asLink) {
    return (
      <Link href="/" className="relative z-10 group">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

export default Logo;
