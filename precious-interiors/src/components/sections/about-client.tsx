"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

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
          textShadow: "0 0 40px rgba(201, 162, 39, 1), 0 0 80px rgba(201, 162, 39, 0.6)",
          duration: 0.4,
        });
      },
      onComplete: () => {
        gsap.to(element, {
          textShadow: "0 0 20px rgba(201, 162, 39, 0.5)",
          duration: 1,
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

// Enhanced Value Card with 3D Tilt Effect
function ValueCard({ value, index }: { value: typeof defaultValues[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      // Gold glow effect
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 1,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0,
          duration: 0.5,
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex items-start gap-4 p-5 bg-white hover:bg-primary-600 border border-neutral-200 hover:border-primary-600 transition-all duration-300 cursor-pointer overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Gold glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(201, 162, 39, 0.1) 0%, transparent 70%)",
        }}
      />

      <span className="relative flex-shrink-0 w-10 h-10 bg-gold-500 text-neutral-900 flex items-center justify-center font-bold text-sm group-hover:bg-gold-400 transition-colors shadow-lg">
        0{index + 1}
      </span>
      <div style={{ transform: "translateZ(20px)" }}>
        <h3 className="text-lg font-cinzel font-semibold text-neutral-900 group-hover:text-white mb-1 transition-colors">
          {value.title}
        </h3>
        <p className="text-neutral-500 group-hover:text-white/80 text-sm transition-colors leading-relaxed">
          {value.description}
        </p>
      </div>

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-gold-500/0 border-l-[40px] border-l-transparent group-hover:border-t-gold-500/30 transition-all duration-300" />
      </div>
    </motion.div>
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
    images: {
      primary: images?.primary || defaultContent.images.primary,
    },
    ctaButton: ctaButton || defaultContent.ctaButton,
  };

  const values = propsValues && propsValues.length > 0 ? propsValues : defaultValues;
  const stats = propsStats && propsStats.length > 0 ? propsStats : defaultStats;

  // Enhanced scroll-triggered animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageParallax = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const smoothImageParallax = useSpring(imageParallax, { stiffness: 100, damping: 30 });

  // Simple fade-in animation for image
  useGSAP(() => {
    if (!imageContainerRef.current || !sectionRef.current) return;

    gsap.fromTo(
      imageContainerRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-28 md:py-36 lg:py-44 bg-cream overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary-600/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-primary-600/5 rounded-full blur-3xl" />

      {/* Decorative gold accent - CSS only */}
      <div className="absolute top-20 right-10 w-16 h-16 pointer-events-none hidden lg:block">
        <div className="w-full h-full bg-gold-500/20 rotate-45 animate-[gentle-float_8s_ease-in-out_infinite]" />
      </div>

      {/* Decorative Lines */}
      <div className="absolute inset-y-0 left-[5%] w-[1px] bg-gradient-to-b from-transparent via-gold-500/20 to-transparent hidden xl:block" />

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
            {/* Main Image with Premium Motion Effects */}
            <div className="relative z-10">
              <div
                ref={imageContainerRef}
                className="relative aspect-[4/5] overflow-hidden shadow-2xl group"
              >
                <motion.div
                  className="relative w-full h-full"
                  initial={{ opacity: 0, scale: 1.1 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  style={{ y: smoothImageParallax }}
                >
                  <img
                    src={content.images.primary}
                    alt="Elegant interior design showcase"
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gold overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 via-transparent to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
                {/* Gold border glow on hover */}
                <div className="absolute inset-0 border-2 border-gold-500/0 group-hover:border-gold-500/50 transition-all duration-500 pointer-events-none" />
              </div>

              {/* Gold accent border with animation */}
              <motion.div
                className="absolute -bottom-4 -left-4 w-full h-full border-2 border-gold-500 -z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />

              {/* Decorative corner elements with animation */}
              <motion.div
                className="absolute -top-3 -right-3 w-12 h-12 border-t-2 border-r-2 border-gold-500"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 w-12 h-12 border-b-2 border-l-2 border-gold-500"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
            </div>

            {/* Experience Badge - Premium Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-8 -right-4 md:right-[-40px] z-30"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gold-500 blur-xl opacity-30 animate-pulse" />

                <div className="relative bg-primary-600 text-white p-6 md:p-8 shadow-2xl border border-gold-500/30">
                  <Sparkles className="absolute top-2 right-2 w-4 h-4 text-gold-400 animate-pulse" />
                  <span className="block text-4xl md:text-5xl font-cinzel font-bold text-gold-400 text-glow-gold">
                    {content.experienceBadge}
                  </span>
                  <span className="text-xs tracking-[0.2em] uppercase text-white/80">Years</span>
                </div>
              </div>
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
              <span className="w-16 h-[2px] bg-gold-500" />
              <span className="text-gold-500 text-sm font-semibold tracking-[0.25em] uppercase">
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
              <span className="text-primary-600 relative">
                {content.headline.highlight}
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-[3px] bg-gold-500"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{ transformOrigin: "left" }}
                />
              </span>
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
            <div className="space-y-4 mb-10">
              {values.map((value, index) => (
                <ValueCard key={value.title} value={value} index={index} />
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link
                href={content.ctaButton?.href || "/projects"}
                className={cn(
                  "group inline-flex items-center gap-3",
                  "px-10 py-5 bg-neutral-900 text-white",
                  "font-semibold tracking-[0.1em] uppercase text-sm",
                  "hover:bg-primary-600 transition-all duration-300",
                  "shadow-lg hover:shadow-xl"
                )}
              >
                <span>{content.ctaButton?.text || "Explore Our Work"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

{/* Stats section removed as per user request */}
      </div>
    </section>
  );
}

export default AboutSectionClient;
