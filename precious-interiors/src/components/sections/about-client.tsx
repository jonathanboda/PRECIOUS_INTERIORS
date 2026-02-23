"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

// 3D Floating Gold Torus Component
function FloatingTorus() {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      torusRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={torusRef}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshStandardMaterial
        color="#c9a227"
        metalness={0.9}
        roughness={0.1}
        emissive="#c9a227"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// 3D Scene Wrapper
function TorusScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#fff5e0" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#c9a227" />
      <FloatingTorus />
    </Canvas>
  );
}

interface AboutSectionClientProps {
  label?: string;
  headline?: { part1: string; highlight: string };
  description?: string[];
  experienceBadge?: string;
  images?: { primary: string };
  values?: { title: string; description: string }[];
  stats?: { value: number; suffix: string; label: string }[];
  ctaButton?: { text: string; href: string };
}

const defaultStats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 8, suffix: "", label: "Years of Excellence" },
  { value: 50, suffix: "+", label: "Design Awards" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

const defaultValues = [
  {
    title: "Timeless Design",
    description: "Creating spaces that transcend fleeting trends, focusing on enduring elegance.",
  },
  {
    title: "Bespoke Solutions",
    description: "Every project uniquely tailored to your vision and lifestyle needs.",
  },
  {
    title: "Refined Craft",
    description: "Meticulous attention to every detail, from concept to completion.",
  },
];

const defaultContent = {
  label: "About Us",
  headline: { part1: "Where Vision", highlight: "Meets Artistry" },
  description: [
    "At The Precious Interiors, we believe that exceptional design transcends the ordinary. Our philosophy centers on creating spaces that are not merely decorated, but thoughtfully crafted to embody your unique essence and aspirations.",
    "With over eight years of dedicated practice, we have honed our craft to deliver interiors that balance timeless elegance with contemporary sensibility.",
  ],
  experienceBadge: "8+",
  images: { primary: "/images/ABOUT/pexels-fotoaibe-1571460.jpg" },
  ctaButton: { text: "Explore Our Work", href: "/projects" },
};

// Enhanced Animated Counter with Glow Effect
function GlowingCounter({
  target,
  suffix,
  duration = 2,
  delay = 0
}: {
  target: number;
  suffix: string;
  duration?: number;
  delay?: number;
}) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsInView(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    if (!isInView || !counterRef.current) return;

    const obj = { value: 0 };
    const element = counterRef.current;

    gsap.to(obj, {
      value: target,
      duration,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        element.textContent = Math.round(obj.value).toString() + suffix;
      },
      onStart: () => {
        gsap.to(element, {
          textShadow: "0 0 30px rgba(201, 162, 39, 1), 0 0 60px rgba(201, 162, 39, 0.6)",
          duration: 0.3,
        });
      },
      onComplete: () => {
        gsap.to(element, {
          textShadow: "0 0 15px rgba(201, 162, 39, 0.4)",
          duration: 0.8,
        });
      },
    });
  }, [isInView, target, suffix, duration, delay]);

  return (
    <span
      ref={counterRef}
      className="block text-5xl md:text-6xl lg:text-7xl font-cinzel font-bold text-gold-400 mb-3 transition-all"
    >
      0{suffix}
    </span>
  );
}

// Value Card with 3D Tilt Effect
function ValueCard({ value, index }: { value: typeof defaultValues[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group flex items-start gap-4 p-4 bg-white hover:bg-primary-600 border border-neutral-200 hover:border-primary-600 transition-all duration-300 cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      <span className="flex-shrink-0 w-8 h-8 bg-gold-500 text-neutral-900 flex items-center justify-center font-bold text-sm group-hover:bg-gold-400 transition-colors">
        0{index + 1}
      </span>
      <div style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-white mb-1 transition-colors">
          {value.title}
        </h3>
        <p className="text-neutral-500 group-hover:text-white/80 text-sm transition-colors">
          {value.description}
        </p>
      </div>
    </div>
  );
}

export function AboutSectionClient({
  label,
  headline,
  description,
  experienceBadge,
  images,
  values: propsValues,
  stats: propsStats,
  ctaButton,
}: AboutSectionClientProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const content = {
    label: label || defaultContent.label,
    headline: headline || defaultContent.headline,
    description: description || defaultContent.description,
    experienceBadge: experienceBadge || defaultContent.experienceBadge,
    images: images || defaultContent.images,
    ctaButton: ctaButton || defaultContent.ctaButton,
  };

  const values = propsValues && propsValues.length > 0 ? propsValues : defaultValues;
  const stats = propsStats && propsStats.length > 0 ? propsStats : defaultStats;

  // GSAP scroll-triggered image reveal with clip-path
  useGSAP(() => {
    if (!imageContainerRef.current || !imageRef.current || !sectionRef.current) return;

    // Image clip-path reveal animation
    gsap.fromTo(
      imageContainerRef.current,
      {
        clipPath: "inset(0 100% 0 0)",
      },
      {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    // Parallax effect on scroll
    gsap.to(imageRef.current, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-36 lg:py-44 bg-cream overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary-600/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      {/* 3D Floating Gold Torus Decoration */}
      <div className="absolute top-20 right-10 w-48 h-48 pointer-events-none opacity-60 hidden lg:block">
        <Suspense fallback={null}>
          <TorusScene />
        </Suspense>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column - Editorial Layout with GSAP clip-path reveal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main Image with GSAP clip-path reveal */}
            <div className="relative z-10">
              <div
                ref={imageContainerRef}
                className="relative aspect-[4/5] overflow-hidden shadow-2xl"
              >
                <div ref={imageRef} className="w-full h-full">
                  <img
                    src={content.images.primary}
                    alt="Elegant interior design showcase"
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
              </div>
              {/* Gold accent line */}
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-gold-500 -z-10" />
            </div>

            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-8 -right-4 md:right-[-30px] bg-primary-600 text-white p-6 md:p-8 z-30 shadow-xl"
            >
              <span className="block text-4xl md:text-5xl font-cinzel font-bold text-gold-400">{content.experienceBadge}</span>
              <span className="text-xs tracking-[0.15em] uppercase text-white/80">Years</span>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <div className="lg:pl-8">
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="w-12 h-[2px] bg-gold-500" />
              <span className="text-gold-600 text-sm font-semibold tracking-[0.2em] uppercase">
                {content.label}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-semibold text-neutral-900 leading-[1.1] mb-8"
            >
              {content.headline.part1}
              <br />
              <span className="text-primary-600">{content.headline.highlight}</span>
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 text-neutral-600 text-lg leading-relaxed mb-10"
            >
              {content.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>

            {/* Values - Bold Cards with 3D Tilt */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4 mb-10"
            >
              {values.map((value, index) => (
                <ValueCard key={value.title} value={value} index={index} />
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href={content.ctaButton.href}
                className={cn(
                  "group inline-flex items-center gap-3",
                  "px-8 py-4 bg-neutral-900 text-white",
                  "font-semibold tracking-[0.08em] uppercase text-sm",
                  "hover:bg-primary-600 transition-all duration-300"
                )}
              >
                <span>{content.ctaButton.text}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats Section - Bold Design with Glowing Counters */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mt-28 md:mt-36"
        >
          <div className="bg-primary-600 p-10 md:p-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center relative"
                >
                  {index > 0 && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-20 w-[1px] bg-white/20 hidden md:block" />
                  )}

                  <GlowingCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                    delay={index * 0.15}
                  />
                  <span className="text-white/70 text-sm tracking-[0.1em] uppercase">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSectionClient;
