"use client";

import { useRef, useState } from "react";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const defaultHighlights = [
  "Living Room Design",
  "Bedroom & Master Suite",
  "Kitchen & Dining",
  "Bathroom Design",
  "Home Office Setup",
  "Kids Room Design",
  "Pooja Room Design",
  "Balcony & Terrace",
  "Bespoke Furniture",
  "Custom Wardrobes",
  "Modular Kitchen",
  "TV Unit & Entertainment",
  "Home Renovation",
  "Kitchen Remodeling",
  "Bathroom Remodeling",
  "3D Renders",
  "Virtual Walkthrough",
  "Floor Plans",
];

interface ServiceHighlightsProps {
  highlights?: string[];
}

// Individual marquee item with 3D text depth and gold gradient on hover
function MarqueeItem({
  text,
  isPaused,
}: {
  text: string;
  isPaused: boolean;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
    if (!textRef.current) return;

    if (isHovered) {
      gsap.to(textRef.current, {
        textShadow: `
          0 1px 0 rgba(201, 162, 39, 0.6),
          0 2px 0 rgba(201, 162, 39, 0.5),
          0 3px 0 rgba(201, 162, 39, 0.4),
          0 4px 0 rgba(201, 162, 39, 0.3),
          0 5px 0 rgba(201, 162, 39, 0.2),
          0 6px 10px rgba(0, 0, 0, 0.3)
        `,
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(textRef.current, {
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHovered]);

  return (
    <span
      ref={textRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        mx-4 md:mx-6 text-lg md:text-xl lg:text-2xl font-cinzel font-medium tracking-tight
        transition-all duration-300 cursor-default inline-block
        ${isHovered ? "text-gradient-gold-animate" : "text-white"}
      `}
      style={{
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {text}
    </span>
  );
}

// Animated star separator with sparkle effect
function StarSeparator({ isPaused }: { isPaused: boolean }) {
  const starRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!starRef.current || isPaused) return;

    // Continuous subtle sparkle animation
    gsap.to(starRef.current, {
      filter: "drop-shadow(0 0 8px rgba(201, 162, 39, 0.8))",
      scale: 1.2,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      repeatDelay: 2,
    });

    return () => {
      gsap.killTweensOf(starRef.current);
    };
  }, [isPaused]);

  return (
    <span ref={starRef} className="text-gold-500 inline-block">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5H22L16 14L18.5 22L12 17L5.5 22L8 14L2 9.5H9.5L12 2Z" />
      </svg>
    </span>
  );
}

export function ServiceHighlights({ highlights: propsHighlights }: ServiceHighlightsProps) {
  const highlights = propsHighlights && propsHighlights.length > 0 ? propsHighlights : defaultHighlights;
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Enhanced hover pause with smooth transition
  useGSAP(() => {
    if (!scrollRef.current) return;

    if (isPaused) {
      gsap.to(scrollRef.current, {
        animationPlayState: "paused",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(scrollRef.current, {
        animationPlayState: "running",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [isPaused]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-5 md:py-6 bg-primary-600"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient overlays for smooth fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-r from-primary-600 to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-primary-600 to-transparent" />

      {/* Subtle shimmer overlay on hover */}
      <div
        className={`
          absolute inset-0 pointer-events-none transition-opacity duration-500
          bg-gradient-to-r from-transparent via-gold-500/10 to-transparent
          ${isPaused ? "opacity-100" : "opacity-0"}
        `}
        style={{
          backgroundSize: "200% 100%",
          animation: isPaused ? "shimmer 2s infinite" : "none",
        }}
      />

      {/* Scrolling content with smooth pause */}
      <div
        ref={scrollRef}
        className="flex whitespace-nowrap"
        style={{
          animation: "marquee 35s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
          transition: "animation-play-state 0.3s ease",
        }}
      >
        {/* Double the content for seamless loop */}
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center shrink-0">
            {highlights.map((item, index) => (
              <span key={`${setIndex}-${index}`} className="flex items-center">
                <MarqueeItem text={item} isPaused={isPaused} />
                <StarSeparator isPaused={isPaused} />
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* CSS for gold gradient text animation */}
      <style jsx>{`
        .text-gradient-gold-animate {
          background: linear-gradient(
            90deg,
            #c9a227 0%,
            #fff5e0 25%,
            #d4af37 50%,
            #fff5e0 75%,
            #c9a227 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gold-gradient-shift 2s linear infinite;
        }

        @keyframes gold-gradient-shift {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </section>
  );
}

export default ServiceHighlights;
