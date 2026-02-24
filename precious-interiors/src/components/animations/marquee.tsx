"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  variant?: "light" | "dark";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  reverse?: boolean;
}

const speedMap = {
  slow: "60s",
  normal: "40s",
  fast: "25s",
};

export function Marquee({
  className,
  variant = "light",
  speed = "normal",
  pauseOnHover = true,
  reverse = false,
}: MarqueeProps) {
  const words = [
    "The Precious Interiors",
    "Timeless Elegance",
    "Bespoke Design",
    "Refined Living",
    "Artful Spaces",
    "Curated Luxury",
  ];

  return (
    <div
      className={cn(
        "relative overflow-hidden py-4 md:py-6",
        variant === "light"
          ? "bg-primary-600 text-white"
          : "bg-primary-600 text-cream",
        className
      )}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-r from-primary-600 to-transparent"
      />

      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-primary-600 to-transparent"
      />

      {/* Scrolling content - GPU accelerated */}
      <div
        className={cn(
          "flex whitespace-nowrap",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee ${speedMap[speed]} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {/* Double the content for seamless loop */}
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center shrink-0">
            {words.map((word, index) => (
              <span key={`${setIndex}-${index}`} className="flex items-center">
                <span className="mx-6 text-xl md:text-2xl lg:text-3xl font-cinzel font-medium tracking-tight">
                  {word}
                </span>
                <span className="text-gold-500">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L14.5 9.5H22L16 14L18.5 22L12 17L5.5 22L8 14L2 9.5H9.5L12 2Z" />
                  </svg>
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
