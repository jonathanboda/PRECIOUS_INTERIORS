"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useInquiryModal } from "@/context/inquiry-modal-context";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

interface HeroClientProps {
  label?: string;
  headline1?: string;
  headline2?: string;
  headline3?: string;
  subheading?: string;
  ctaPrimary?: { text: string };
  ctaSecondary?: { text: string; href: string };
  videoUrl?: string;
}

const defaultContent = {
  label: "Premium Interior Design",
  headline1: "TRUST",
  headline2: "Makes Your Home",
  headline3: "BEAUTIFUL",
  subheading: "Where refined elegance meets purposeful design. We transform spaces into living narratives of sophistication.",
  ctaPrimary: { text: "Start Your Project" },
  ctaSecondary: { text: "View Portfolio", href: "/projects" },
  videoUrl: "/hero section/7578545-uhd_3840_2160_30fps.mp4",
};

// Luxury Text Reveal Component
function LuxuryTextReveal({
  text,
  className,
  delay = 0,
  isLoaded
}: {
  text: string;
  className?: string;
  delay?: number;
  isLoaded: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isLoaded || !containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 100,
        rotateX: -90,
        transformOrigin: "center bottom",
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.04,
        delay,
        ease: "power4.out",
      }
    );
  }, [isLoaded, delay]);

  return (
    <div ref={containerRef} className={cn("overflow-hidden perspective-[1000px]", className)}>
      <span className="inline-flex flex-wrap" style={{ transformStyle: "preserve-3d" }}>
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="char inline-block"
            style={{ transformStyle: "preserve-3d" }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </div>
  );
}

// Animated Divider Line
function AnimatedDivider({ isLoaded, delay = 0 }: { isLoaded: boolean; delay?: number }) {
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isLoaded || !lineRef.current) return;

    gsap.fromTo(
      lineRef.current,
      { scaleX: 0, opacity: 0 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.5,
        delay,
        ease: "power4.inOut"
      }
    );
  }, [isLoaded, delay]);

  return (
    <div
      ref={lineRef}
      className="w-32 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent origin-left"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

// Floating Badge Component
function FloatingBadge({ isLoaded }: { isLoaded: boolean }) {
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isLoaded || !badgeRef.current) return;

    gsap.fromTo(
      badgeRef.current,
      { opacity: 0, scale: 0.8, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        delay: 1.8,
        ease: "elastic.out(1, 0.5)"
      }
    );
    // Removed continuous floating animation for performance
  }, [isLoaded]);

  return (
    <motion.div
      ref={badgeRef}
      className="absolute -right-4 md:right-8 top-1/3 hidden lg:flex flex-col items-center gap-3 opacity-0"
      style={{ perspective: "1000px" }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gold-500 blur-xl opacity-40 animate-pulse" />
        <div className="relative bg-primary-600 border border-gold-500/50 px-6 py-8 backdrop-blur-sm">
          <span className="block text-5xl font-cinzel font-bold text-gold-400 text-glow-gold">8+</span>
          <span className="text-xs text-white/80 tracking-[0.2em] uppercase">Years</span>
        </div>
      </div>
      <span className="text-gold-400/60 text-xs tracking-widest rotate-90 origin-center translate-y-8">EST. 2016</span>
    </motion.div>
  );
}

export function HeroClient({
  label,
  headline1,
  headline2,
  headline3,
  subheading,
  ctaPrimary,
  ctaSecondary,
  videoUrl,
}: HeroClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { openModal } = useInquiryModal();

  // Use props or defaults
  const content = {
    label: label || defaultContent.label,
    headline1: headline1 || defaultContent.headline1,
    headline2: headline2 || defaultContent.headline2,
    headline3: headline3 || defaultContent.headline3,
    subheading: subheading || defaultContent.subheading,
    ctaPrimary: ctaPrimary || defaultContent.ctaPrimary,
    ctaSecondary: ctaSecondary || defaultContent.ctaSecondary,
    videoUrl: videoUrl || defaultContent.videoUrl,
  };

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Enhanced parallax transforms with different speeds
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const shapesY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Smooth springs for smoother motion
  const smoothVideoY = useSpring(videoY, { stiffness: 80, damping: 25 });
  const smoothVideoScale = useSpring(videoScale, { stiffness: 80, damping: 25 });
  const smoothContentY = useSpring(contentY, { stiffness: 80, damping: 25 });
  const smoothShapesY = useSpring(shapesY, { stiffness: 60, damping: 20 });

  // CTA buttons animation
  useGSAP(() => {
    if (!isLoaded || !ctaRef.current) return;

    const buttons = ctaRef.current.children;
    gsap.fromTo(
      buttons,
      {
        opacity: 0,
        y: 40,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        delay: 1.5,
        ease: "power4.out",
      }
    );
  }, [isLoaded]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Magnetic button effect handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.4;
    const deltaY = (e.clientY - centerY) * 0.4;

    mouseX.set(deltaX);
    mouseY.set(deltaY);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Spring animation for magnetic effect
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  return (
    <section
      ref={containerRef}
      className="relative z-10 min-h-screen w-full overflow-hidden bg-neutral-900 isolate"
    >
      {/* Background Video with Enhanced Parallax */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ y: smoothVideoY, scale: smoothVideoScale }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: "transform" }}
        >
          <source src={content.videoUrl} type="video/mp4" />
        </video>
      </motion.div>

      {/* Decorative floating elements - Reduced for performance */}
      <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
        {/* Static gold orbs - no animation for better performance */}
        <div className="absolute top-[20%] left-[15%] w-3 h-3 bg-gold-500/30 rounded-full" />
        <div className="absolute bottom-[30%] left-[25%] w-4 h-4 bg-gold-500/15 rounded-full" />
        <div className="absolute bottom-[40%] right-[15%] w-3 h-3 bg-gold-400/20 rounded-full" />
      </div>

      {/* Premium Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent z-[3]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 z-[3]" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 via-transparent to-transparent z-[3]" />

      {/* Decorative Vertical Lines */}
      <div className="absolute inset-y-0 left-[10%] w-[1px] bg-gradient-to-b from-transparent via-gold-500/20 to-transparent z-[4] hidden lg:block" />
      <div className="absolute inset-y-0 left-[90%] w-[1px] bg-gradient-to-b from-transparent via-gold-500/20 to-transparent z-[4] hidden lg:block" />

      {/* Static Glow Orbs - No animation for better performance */}
      <div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full z-[2] opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(201, 162, 39, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full z-[2] opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(26, 58, 47, 0.2) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative min-h-screen container mx-auto px-6 lg:px-12 z-[5]"
        style={{ opacity, y: smoothContentY }}
      >
        <div className="flex flex-col justify-center min-h-screen pt-24 pb-32 max-w-5xl">
          {/* Section Label with Animation */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-10"
          >
            <motion.span
              className="w-16 h-[2px] bg-gold-500"
              initial={{ scaleX: 0 }}
              animate={isLoaded ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />
            <span className="text-gold-500 text-sm font-semibold tracking-[0.25em] uppercase">
              {content.label}
            </span>
            <motion.span
              className="w-8 h-[2px] bg-gold-500/50"
              initial={{ scaleX: 0 }}
              animate={isLoaded ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          {/* Main Headlines - Premium Typography */}
          <div className="space-y-2 mb-8">
            {/* Headline 1 - Bold, Commanding */}
            <LuxuryTextReveal
              text={content.headline1}
              className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-[-0.02em] leading-[0.95]"
              delay={0.3}
              isLoaded={isLoaded}
            />

            {/* Headline 2 - Elegant Italic Connector */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 py-2"
            >
              <AnimatedDivider isLoaded={isLoaded} delay={1} />
              <span className="font-cormorant text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium italic text-gold-400 tracking-[0.02em]">
                {content.headline2}
              </span>
            </motion.div>

            {/* Headline 3 - Largest, Most Impactful */}
            <LuxuryTextReveal
              text={content.headline3}
              className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-black text-white tracking-[-0.02em] leading-[0.85]"
              delay={0.6}
              isLoaded={isLoaded}
            />
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant italic text-gold-400/90 text-xl md:text-2xl lg:text-3xl max-w-xl leading-relaxed"
          >
            {content.subheading}
          </motion.p>

          {/* CTA Buttons with Enhanced Effects */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-5 mt-12 md:mt-16"
          >
            {/* Primary CTA with Magnetic Effect and Glow */}
            <motion.button
              onClick={openModal}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ x: springX, y: springY }}
              className={cn(
                "group relative inline-flex items-center justify-center gap-3",
                "px-10 py-5 md:px-12 md:py-6",
                "bg-gold-500 text-neutral-900",
                "font-semibold text-sm md:text-base tracking-[0.12em] uppercase",
                "overflow-hidden transition-all duration-500 cursor-pointer",
                "shadow-[0_0_30px_rgba(201,162,39,0.3)]",
                "hover:shadow-[0_0_50px_rgba(201,162,39,0.5)]",
                "opacity-0" // Initial state for GSAP
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Shine effect - only on hover for performance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              <span className="relative z-10">{content.ctaPrimary.text}</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </motion.button>

            {/* Secondary CTA */}
            <Link href={content.ctaSecondary.href}>
              <motion.span
                className={cn(
                  "group relative flex items-center gap-3",
                  "px-8 py-5",
                  "text-white font-semibold text-sm md:text-base tracking-[0.12em] uppercase",
                  "border-2 border-white/30 hover:border-gold-400 hover:text-gold-400",
                  "transition-all duration-300 backdrop-blur-sm",
                  "opacity-0" // Initial state for GSAP
                )}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(201, 162, 39, 0.25), inset 0 0 20px rgba(201, 162, 39, 0.05)",
                }}
              >
                <Play className="w-4 h-4 fill-current" />
                <span className="relative z-10">{content.ctaSecondary.text}</span>
              </motion.span>
            </Link>
          </div>

          {/* Scroll Indicator - CSS animation for better performance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-white/50 text-xs tracking-[0.3em] uppercase">Scroll</span>
            <div
              className="w-[1px] h-16 bg-gradient-to-b from-gold-500 to-transparent animate-pulse"
              style={{ transformOrigin: "top" }}
            />
          </motion.div>
        </div>

      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent z-[6]" />
    </section>
  );
}

export default HeroClient;
