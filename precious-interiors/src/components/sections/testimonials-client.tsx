"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";

interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientTitle: string;
  projectType: string;
  image: string;
  rating: number;
}

interface TestimonialsClientProps {
  testimonials: Testimonial[];
}

// 3D Decorative Quote Mark
function FloatingQuote() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusKnotGeometry args={[0.6, 0.2, 100, 16]} />
      <meshStandardMaterial
        color="#c9a227"
        metalness={0.8}
        roughness={0.2}
        emissive="#c9a227"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function QuoteScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#fff5e0" />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#c9a227" />
      <FloatingQuote />
    </Canvas>
  );
}

// Animated Star Rating with Sequential Fill and Sparkle
function AnimatedStarRating({ rating, isActive }: { rating: number; isActive: boolean }) {
  const starsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!starsRef.current || !isActive) return;

    const stars = starsRef.current.querySelectorAll(".star-item");

    // Reset stars
    gsap.set(stars, { scale: 0, opacity: 0 });

    // Animate stars sequentially
    stars.forEach((star, i) => {
      if (i < rating) {
        gsap.to(star, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          delay: i * 0.15,
          ease: "back.out(1.7)",
          onComplete: () => {
            // Add sparkle effect
            gsap.to(star, {
              filter: "drop-shadow(0 0 8px rgba(201, 162, 39, 0.8))",
              duration: 0.2,
              yoyo: true,
              repeat: 1,
            });
          },
        });
      }
    });
  }, [isActive, rating]);

  return (
    <div ref={starsRef} className="flex items-center gap-1 mb-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="star-item" style={{ opacity: 0, transform: "scale(0)" }}>
          <Star
            className={cn(
              "w-5 h-5 transition-colors",
              i < rating ? "text-gold-500" : "text-neutral-300"
            )}
            fill={i < rating ? "currentColor" : "none"}
          />
        </div>
      ))}
    </div>
  );
}

// Typing Effect for Quote Text
function TypedQuote({ quote, isActive }: { quote: string; isActive: boolean }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setDisplayedText("");
      setIsTyping(false);
      return;
    }

    setIsTyping(true);
    setDisplayedText("");

    let currentIndex = 0;
    const typingSpeed = 20; // ms per character

    const typeInterval = setInterval(() => {
      if (currentIndex < quote.length) {
        setDisplayedText(quote.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [quote, isActive]);

  return (
    <p className="text-xl md:text-2xl lg:text-3xl text-neutral-800 font-cinzel leading-relaxed mb-8">
      &ldquo;{displayedText}
      {isTyping && <span className="animate-pulse text-gold-500">|</span>}
      {!isTyping && displayedText && "&rdquo;"}
    </p>
  );
}

// Gold Frame with Draw-in Animation
function AnimatedGoldFrame({ isActive }: { isActive: boolean }) {
  const frameRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!frameRef.current || !isActive) return;

    const frame = frameRef.current;

    // Reset frame
    gsap.set(frame, {
      clipPath: "inset(0 100% 100% 0)",
    });

    // Animate frame drawing in
    gsap.to(frame, {
      clipPath: "inset(0 0% 0% 0)",
      duration: 1,
      ease: "power2.out",
      delay: 0.3,
    });
  }, [isActive]);

  return (
    <div
      ref={frameRef}
      className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold-500 -z-10"
      style={{ clipPath: "inset(0 100% 100% 0)" }}
    />
  );
}

export function TestimonialsClient({ testimonials }: TestimonialsClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [testimonials.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [testimonials.length, isTransitioning]);

  // Only run auto-play when section is in viewport
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isInView || testimonials.length === 0) return;

    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [isPaused, isInView, nextSlide, testimonials.length]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 80 : -80,
      opacity: 0,
    }),
  };

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="relative py-28 md:py-36 lg:py-44 bg-cream overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary-600/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      {/* 3D Decorative Quote - replacing static quote */}
      <div className="absolute top-10 right-10 w-40 h-40 pointer-events-none hidden lg:block opacity-50">
        <Suspense fallback={null}>
          <QuoteScene />
        </Suspense>
      </div>

      {/* Large Decorative Quote (fallback) */}
      <div className="absolute top-20 right-20 pointer-events-none hidden xl:block lg:hidden">
        <Quote className="w-64 h-64 text-neutral-200" fill="currentColor" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-12 h-[2px] bg-gold-500" />
            <span className="text-gold-600 text-sm font-semibold tracking-[0.2em] uppercase">
              Testimonials
            </span>
            <span className="w-12 h-[2px] bg-gold-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-semibold text-neutral-900 leading-[1.1]"
          >
            Client <span className="text-primary-600">Stories</span>
          </motion.h2>
        </div>

        {/* Testimonial Carousel */}
        <div
          className="max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image with Animated Gold Frame */}
            <div className="order-2 lg:order-1">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div className="relative aspect-[4/5] overflow-hidden shadow-2xl">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].projectType}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/70 via-transparent to-transparent" />

                    {/* Project Label */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block px-4 py-2 bg-gold-500 text-neutral-900 text-xs font-bold tracking-[0.15em] uppercase">
                        {testimonials[currentIndex].projectType}
                      </span>
                    </div>
                  </div>

                  {/* Animated Gold accent frame */}
                  <AnimatedGoldFrame isActive={true} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Animated Star Rating */}
                  <AnimatedStarRating
                    rating={testimonials[currentIndex].rating}
                    isActive={isInView}
                  />

                  {/* Typed Quote Text */}
                  <TypedQuote
                    quote={testimonials[currentIndex].quote}
                    isActive={isInView && !isTransitioning}
                  />

                  {/* Client Info */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-primary-600 flex items-center justify-center">
                      <span className="text-white font-cinzel font-bold text-xl">
                        {testimonials[currentIndex].clientName.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-cinzel font-semibold text-neutral-900 mb-0.5">
                        {testimonials[currentIndex].clientName}
                      </h4>
                      <p className="text-neutral-500 text-sm">
                        {testimonials[currentIndex].clientTitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevSlide}
                  className="w-14 h-14 flex items-center justify-center bg-neutral-100 text-neutral-700 hover:bg-primary-600 hover:text-white transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
                </button>

                <div className="flex items-center gap-3">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (isTransitioning) return;
                        setIsTransitioning(true);
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                        setTimeout(() => setIsTransitioning(false), 600);
                      }}
                      className={cn(
                        "transition-all duration-500",
                        currentIndex === index
                          ? "w-10 h-3 bg-primary-600"
                          : "w-3 h-3 bg-neutral-300 hover:bg-neutral-400"
                      )}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="w-14 h-14 flex items-center justify-center bg-neutral-100 text-neutral-700 hover:bg-primary-600 hover:text-white transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                </button>

                {/* Slide Counter */}
                <span className="ml-4 text-neutral-400 text-sm font-medium">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
