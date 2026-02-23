"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useInquiryModal } from "@/context/inquiry-modal-context";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";

// Dynamically import 3D components to avoid SSR issues
const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });
const FloatingShapes = dynamic(() => import("@/components/3d/FloatingShapes"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/3d/ParticleField"), { ssr: false });

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLHeadingElement>(null);
  const makesRef = useRef<HTMLHeadingElement>(null);
  const beautifulRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { openModal } = useInquiryModal();

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Enhanced parallax transforms with different speeds
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const shapesY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  // Smooth springs for smoother motion
  const smoothVideoY = useSpring(videoY, { stiffness: 100, damping: 30 });
  const smoothVideoScale = useSpring(videoScale, { stiffness: 100, damping: 30 });
  const smoothContentY = useSpring(contentY, { stiffness: 100, damping: 30 });
  const smoothShapesY = useSpring(shapesY, { stiffness: 80, damping: 25 });

  // GSAP text animations
  useGSAP(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      // Timeline for hero entrance
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate TRUST - character by character with 3D rotateX
      if (trustRef.current) {
        const trustText = trustRef.current.textContent || "";
        trustRef.current.innerHTML = "";

        const chars = trustText.split("").map((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.transformStyle = "preserve-3d";
          trustRef.current?.appendChild(span);
          return span;
        });

        tl.fromTo(
          chars,
          {
            opacity: 0,
            y: 80,
            rotateX: 90,
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
          },
          0
        );
      }

      // Animate "Makes Your Home" - word by word
      if (makesRef.current) {
        const makesText = makesRef.current.textContent || "";
        makesRef.current.innerHTML = "";

        const words = makesText.split(" ").map((word, index, arr) => {
          const span = document.createElement("span");
          span.textContent = word + (index < arr.length - 1 ? "\u00A0" : "");
          span.style.display = "inline-block";
          span.style.transformStyle = "preserve-3d";
          makesRef.current?.appendChild(span);
          return span;
        });

        tl.fromTo(
          words,
          {
            opacity: 0,
            y: 50,
            rotateX: 45,
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.3
        );
      }

      // Animate BEAUTIFUL - character by character with enhanced effect
      if (beautifulRef.current) {
        const beautifulText = beautifulRef.current.textContent || "";
        beautifulRef.current.innerHTML = "";

        const chars = beautifulText.split("").map((char) => {
          const span = document.createElement("span");
          span.textContent = char;
          span.style.display = "inline-block";
          span.style.transformStyle = "preserve-3d";
          beautifulRef.current?.appendChild(span);
          return span;
        });

        tl.fromTo(
          chars,
          {
            opacity: 0,
            y: 100,
            rotateX: 90,
            scale: 0.8,
            transformOrigin: "center bottom",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.03,
            ease: "power4.out",
          },
          0.5
        );
      }

      // Animate subheading
      if (subheadingRef.current) {
        tl.fromTo(
          subheadingRef.current,
          {
            opacity: 0,
            y: 40,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
          },
          1
        );
      }

      // Animate CTA buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.children;
        tl.fromTo(
          buttons,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power4.out",
          },
          1.2
        );
      }
    }, containerRef);

    return () => ctx.revert();
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

    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;

    mouseX.set(deltaX);
    mouseY.set(deltaY);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Spring animation for magnetic effect
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

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
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero section/7578545-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* 3D Floating Shapes Layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ y: smoothShapesY }}
      >
        <Scene className="opacity-60">
          <FloatingShapes count={6} spread={12} />
        </Scene>
      </motion.div>

      {/* Particle Field Layer */}
      <div className="absolute inset-0 pointer-events-none z-[2] opacity-40">
        <Scene className="opacity-70">
          <ParticleField count={150} spread={18} size={0.04} color="#c9a227" />
        </Scene>
      </div>

      {/* Strong Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-[3]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 z-[3]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary-600/20 to-transparent z-[4]" />

      {/* Animated glow accent */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full z-[2]"
        style={{
          background: "radial-gradient(circle, rgba(201, 162, 39, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative min-h-screen container mx-auto px-6 lg:px-12 z-[5]"
        style={{ opacity, y: smoothContentY }}
      >
        <div
          ref={headlineRef}
          className="flex flex-col justify-center min-h-screen pt-24 pb-32 max-w-5xl"
        >
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="w-12 h-[2px] bg-gold-500" />
            <span className="text-gold-500 text-sm font-semibold tracking-[0.2em] uppercase">
              Premium Interior Design
            </span>
          </motion.div>

          {/* Main Headlines - Playfair Display + Cormorant Italic */}
          <div className="space-y-1">
            {/* TRUST - Bold, Commanding */}
            <div className="overflow-hidden perspective-[1000px]">
              <h1
                ref={trustRef}
                className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-[-0.02em] leading-[1]"
                style={{ transformStyle: "preserve-3d" }}
              >
                TRUST
              </h1>
            </div>

            {/* Makes Your Home - Elegant Italic Connector */}
            <div className="overflow-hidden perspective-[1000px]">
              <h1
                ref={makesRef}
                className="font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium italic text-gold-400 tracking-[0.02em] leading-[1.3] pl-1"
                style={{ transformStyle: "preserve-3d" }}
              >
                Makes Your Home
              </h1>
            </div>

            {/* BEAUTIFUL - Largest, Most Impactful */}
            <div className="overflow-hidden perspective-[1000px]">
              <h1
                ref={beautifulRef}
                className="font-playfair text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-[-0.02em] leading-[0.9]"
                style={{ transformStyle: "preserve-3d" }}
              >
                BEAUTIFUL
              </h1>
            </div>
          </div>

          {/* Subheading */}
          <p
            ref={subheadingRef}
            className="font-bellazio text-gold-400/90 text-xl md:text-2xl lg:text-3xl max-w-xl leading-relaxed mt-8 md:mt-12 opacity-0"
          >
            Where refined elegance meets purposeful design. We transform spaces
            into living narratives of sophistication.
          </p>

          {/* CTA Buttons with Enhanced Effects */}
          <div
            ref={ctaRef}
            className="flex flex-wrap items-center gap-5 mt-10 md:mt-14"
          >
            {/* Primary CTA with Magnetic Effect and Glow */}
            <motion.button
              onClick={openModal}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ x: springX, y: springY }}
              className={cn(
                "group relative inline-flex items-center justify-center gap-3",
                "px-8 py-4 md:px-10 md:py-5",
                "bg-gold-500 text-neutral-900",
                "font-semibold text-sm md:text-base tracking-[0.1em] uppercase",
                "overflow-hidden transition-all duration-500 cursor-pointer",
                "opacity-0" // Initial state for GSAP
              )}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "0 0 30px rgba(201, 162, 39, 0.6), 0 0 60px rgba(201, 162, 39, 0.3)",
                }}
              />
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1" />
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </motion.button>

            {/* Secondary CTA with Glow Border Effect */}
            <Link href="/projects">
              <motion.span
                className={cn(
                  "group relative flex items-center gap-3",
                  "px-6 py-4",
                  "text-white font-semibold text-sm md:text-base tracking-[0.1em] uppercase",
                  "border-2 border-white/30 hover:border-gold-400 hover:text-gold-400",
                  "transition-all duration-300",
                  "opacity-0" // Initial state for GSAP
                )}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(201, 162, 39, 0.3), inset 0 0 20px rgba(201, 162, 39, 0.1)",
                }}
              >
                {/* Animated border glow */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(201, 162, 39, 0.1), transparent)",
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative z-10">View Projects</span>
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
