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
    text: "text-[9px]",
    interiors: "text-[7px]",
    spacing: "tracking-[0.03em]",
    interiorsSpacing: "tracking-[0.05em]",
    gap: "gap-2",
    logoSize: 55,
  },
  md: {
    text: "text-[10px] md:text-xs",
    interiors: "text-[7px] md:text-[9px]",
    spacing: "tracking-[0.03em]",
    interiorsSpacing: "tracking-[0.05em]",
    gap: "gap-2 md:gap-3",
    logoSize: 70,
  },
  lg: {
    text: "text-xs md:text-sm",
    interiors: "text-[9px] md:text-[10px]",
    spacing: "tracking-[0.03em]",
    interiorsSpacing: "tracking-[0.05em]",
    gap: "gap-3",
    logoSize: 90,
  },
};

// Logo icon component that renders the SVG inline for proper color inheritance
function LogoIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="320 300 380 380"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      style={{ background: 'transparent' }}
    >
      <g transform="translate(0,1024) scale(0.1,-0.1)" fill="currentColor" stroke="none">
        <path d="M3880 6640 c0 -32 5 -52 13 -55 6 -2 30 -9 53 -14 63 -17 106 -51
134 -106 l25 -50 0 -980 0 -980 -24 -48 c-27 -56 -62 -81 -143 -104 l-58 -16
0 -54 0 -53 415 0 415 0 0 53 0 52 -60 18 c-69 20 -118 63 -140 123 -12 33
-15 202 -18 1082 l-3 1043 463 -3 c452 -4 465 -4 533 -27 199 -66 324 -187
391 -381 39 -111 54 -210 54 -352 0 -397 -158 -658 -445 -738 l-60 -17 -3 -58
-3 -58 83 6 c91 8 232 42 327 81 193 78 359 236 447 421 67 144 79 203 79 400
0 166 -1 172 -33 265 -45 129 -101 221 -191 311 -151 151 -297 226 -524 270
-91 18 -153 19 -912 19 l-815 0 0 -50z"/>
        <path d="M5089 6443 c-11 -2 -19 -19 -23 -46 -20 -127 -92 -261 -174 -320 -71
-52 -109 -68 -186 -81 l-71 -12 -3 -47 -3 -47 210 0 211 0 0 -1020 0 -1020
-40 0 -40 0 0 890 0 890 -167 -2 -168 -3 0 -50 0 -50 113 -3 112 -3 0 -239 0
-240 -115 0 -115 0 0 -50 0 -50 115 0 115 0 0 -545 0 -544 -112 -3 -113 -3 -3
-53 -3 -52 473 2 c529 3 488 -3 473 74 l-6 34 -113 0 -113 0 2 778 c1 427 3
803 3 835 l2 57 110 0 110 0 0 55 0 55 -165 0 -165 0 0 -890 0 -890 -40 0 -40
0 0 1020 0 1020 206 0 205 0 -3 48 -3 47 -62 7 c-168 18 -317 174 -353 369
-19 99 -16 94 -61 82z m43 -326 c15 -24 44 -60 63 -80 19 -20 35 -38 35 -42 0
-3 -59 -5 -131 -5 l-131 0 42 47 c22 26 50 64 62 85 12 21 24 38 27 38 3 0 18
-20 33 -43z"/>
      </g>
    </svg>
  );
}

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
      {/* Logo Icon */}
      <LogoIcon
        size={config.logoSize}
        className={cn(
          "flex-shrink-0",
          variant === "light" ? "text-white" : "text-neutral-900"
        )}
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
