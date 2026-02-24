"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MotionImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  containerClassName?: string;
  /** Enable parallax scroll effect */
  parallax?: boolean;
  /** Parallax intensity (0.05 - 0.3) */
  parallaxIntensity?: number;
  /** Enable zoom on hover */
  hoverZoom?: boolean;
  /** Zoom scale on hover (1.05 - 1.2) */
  zoomScale?: number;
  /** Enable reveal animation on scroll */
  reveal?: boolean;
  /** Reveal animation type */
  revealType?: "fade" | "slide-up" | "slide-left" | "clip" | "blur";
  /** Enable gold glow border on hover */
  goldGlow?: boolean;
  /** Enable Ken Burns effect (slow zoom + pan) */
  kenBurns?: boolean;
  /** Ken Burns duration in seconds */
  kenBurnsDuration?: number;
  /** Priority loading for LCP images */
  priority?: boolean;
  /** Object fit */
  objectFit?: "cover" | "contain" | "fill";
  /** Optional overlay gradient */
  overlay?: "none" | "subtle" | "dark" | "gold";
  /** Enable 3D tilt effect on hover */
  tilt?: boolean;
  /** Border radius */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function MotionImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  containerClassName,
  parallax = false,
  parallaxIntensity = 0.1,
  hoverZoom = true,
  zoomScale = 1.08,
  reveal = true,
  revealType = "fade",
  goldGlow = false,
  kenBurns = false,
  kenBurnsDuration = 20,
  priority = false,
  objectFit = "cover",
  overlay = "none",
  tilt = false,
  rounded = "none",
}: MotionImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({ rotateX: 0, rotateY: 0 });
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${parallaxIntensity * 100}%`, `-${parallaxIntensity * 100}%`]
  );
  const smoothParallaxY = useSpring(parallaxY, { stiffness: 100, damping: 30 });

  // Handle 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTiltStyle({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({ rotateX: 0, rotateY: 0 });
  };

  // Reveal animation variants
  const easeCustom = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const revealVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.8, ease: easeCustom } },
    },
    "slide-up": {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeCustom } },
    },
    "slide-left": {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeCustom } },
    },
    clip: {
      hidden: { clipPath: "inset(100% 0 0 0)" },
      visible: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1, ease: easeCustom } },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(20px)" },
      visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 1, ease: easeCustom } },
    },
  };

  // Rounded class mapping
  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  // Overlay class mapping
  const overlayClasses = {
    none: "",
    subtle: "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:to-transparent",
    dark: "after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/60 after:via-black/20 after:to-transparent",
    gold: "after:absolute after:inset-0 after:bg-gradient-to-t after:from-primary-900/30 after:via-transparent after:to-gold-500/10",
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        roundedClasses[rounded],
        goldGlow && "group",
        overlayClasses[overlay],
        containerClassName
      )}
      style={{
        perspective: tilt ? "1000px" : undefined,
        transformStyle: tilt ? "preserve-3d" : undefined,
      }}
      variants={reveal ? revealVariants[revealType] : undefined}
      initial={reveal ? "hidden" : undefined}
      animate={reveal && isInView ? "visible" : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gold glow border effect */}
      {goldGlow && (
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 border-2 border-gold-500/50" />
          <div
            className="absolute inset-0"
            style={{
              boxShadow: "inset 0 0 30px rgba(201, 162, 39, 0.2), 0 0 40px rgba(201, 162, 39, 0.15)",
            }}
          />
        </motion.div>
      )}

      {/* Image wrapper with effects */}
      <motion.div
        className={cn("relative w-full h-full", fill && "absolute inset-0")}
        style={{
          y: parallax ? smoothParallaxY : 0,
          rotateX: tiltStyle.rotateX,
          rotateY: tiltStyle.rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: hoverZoom && isHovered ? zoomScale : 1,
        }}
        transition={{
          scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          rotateX: { duration: 0.2 },
          rotateY: { duration: 0.2 },
        }}
      >
        {/* Image wrapper - Ken Burns disabled for performance */}
        <div className="relative w-full h-full">
          {fill ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className={cn(
                objectFit === "cover" && "object-cover",
                objectFit === "contain" && "object-contain",
                objectFit === "fill" && "object-fill",
                className
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              className={cn(
                objectFit === "cover" && "object-cover",
                objectFit === "contain" && "object-contain",
                objectFit === "fill" && "object-fill",
                className
              )}
            />
          )}
        </div>
      </motion.div>

      {/* Hover shine effect */}
      {hoverZoom && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full pointer-events-none z-20"
          animate={{
            x: isHovered ? "200%" : "-100%",
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
}

export default MotionImage;
