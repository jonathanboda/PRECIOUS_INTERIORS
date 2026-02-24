"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
  className?: string;
  asLink?: boolean;
}

const sizeConfig = {
  sm: {
    text: "text-xs",
    interiors: "text-[10px]",
    spacing: "tracking-[0.05em]",
    interiorsSpacing: "tracking-[0.08em]",
    gap: "gap-2",
    logoSize: 32,
  },
  md: {
    text: "text-sm md:text-base",
    interiors: "text-[10px] md:text-xs",
    spacing: "tracking-[0.05em]",
    interiorsSpacing: "tracking-[0.1em]",
    gap: "gap-2 md:gap-3",
    logoSize: 44,
  },
  lg: {
    text: "text-base md:text-lg",
    interiors: "text-xs md:text-sm",
    spacing: "tracking-[0.05em]",
    interiorsSpacing: "tracking-[0.1em]",
    gap: "gap-3",
    logoSize: 56,
  },
};

export function Logo({ size = "md", variant = "light", className, asLink = true }: LogoProps) {
  const config = sizeConfig[size];

  const logoContent = (
    <div
      className={cn(
        "inline-flex items-center whitespace-nowrap",
        config.gap,
        className
      )}
    >
      {/* Logo Image */}
      <Image
        src="/images/logo/IMG_8185.svg"
        alt="The Precious Interiors Logo"
        width={config.logoSize}
        height={config.logoSize}
        className="flex-shrink-0"
      />

      {/* Text - all in one line */}
      <div className="flex items-baseline gap-1">
        <span
          className={cn(
            "font-cinzel font-semibold whitespace-nowrap",
            config.text,
            config.spacing,
            variant === "light" ? "text-white" : "text-neutral-900"
          )}
        >
          The Precious
        </span>
        <span
          className={cn(
            "font-cinzel font-semibold uppercase text-gold-500 whitespace-nowrap",
            config.interiors,
            config.interiorsSpacing
          )}
        >
          Interiors
        </span>
      </div>
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
