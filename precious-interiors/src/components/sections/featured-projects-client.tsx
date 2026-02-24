"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowRight, Eye, Sparkles } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionImage } from "@/components/ui/motion-image";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  roomType: string;
  style: string;
  image: string;
}

// Check if image URL is valid (not a local Windows path)
function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  // Reject Windows absolute paths
  if (/^[A-Za-z]:\\/.test(url)) return false;
  return true;
}

// Fallback placeholder image
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80";

// Premium easing curves - typed as tuple for Framer Motion
const premiumEasing: [number, number, number, number] = [0.32, 0.72, 0, 1];
const springConfig = { stiffness: 400, damping: 30, mass: 0.8 };

interface FeaturedProjectsClientProps {
  projects: Project[];
}

// Enhanced 3D Project Card with Premium Effects
function ProjectCard({
  project,
  isLarge,
  index,
}: {
  project: Project;
  isLarge: boolean;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // 3D rotation transforms - more dramatic for premium feel
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);

  // Parallax for image
  const imageX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  // Dynamic shadow
  const shadowX = useTransform(springX, [-0.5, 0.5], [25, -25]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  // Handle mouse movement for tilt
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = (event.clientX - centerX) / rect.width;
      const mouseY = (event.clientY - centerY) / rect.height;

      x.set(mouseX);
      y.set(mouseY);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`project-card relative ${isLarge ? "md:col-span-2" : ""}`}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      data-cursor-view
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <motion.div
          className={`relative overflow-hidden bg-neutral-200 ${
            isLarge ? "aspect-[16/9]" : "aspect-[4/3]"
          }`}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            y: -12,
            transition: { duration: 0.4, ease: premiumEasing },
          }}
        >
          {/* Gold border glow on hover */}
          <motion.div
            ref={glowRef}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              boxShadow: isHovered
                ? "inset 0 0 0 2px rgba(201, 162, 39, 0.5), 0 0 30px rgba(201, 162, 39, 0.2)"
                : "inset 0 0 0 0px rgba(201, 162, 39, 0)",
              transition: "box-shadow 0.4s ease",
            }}
          />

          {/* Dynamic Shadow Layer */}
          <motion.div
            className="absolute inset-0 -z-10"
            style={{
              x: isHovered ? shadowX : 0,
              y: isHovered ? shadowY : 0,
              boxShadow: isHovered
                ? "0 40px 80px rgba(0, 0, 0, 0.35)"
                : "0 10px 30px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.4s ease",
            }}
          />

          {/* Main Image with Parallax - No blur effect */}
          <motion.img
            ref={imageRef}
            src={isValidImageUrl(project.image) ? project.image : FALLBACK_IMAGE}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              x: isHovered ? imageX : 0,
              y: isHovered ? imageY : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Premium gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

          {/* Hover Overlay with smooth transition */}
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundColor: isHovered ? "rgba(26, 58, 47, 0.4)" : "rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.4, ease: premiumEasing }}
          />

          {/* Glossy reflection overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden z-10"
            style={{
              background: useTransform(
                springX,
                [-0.5, 0, 0.5],
                [
                  "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, transparent 100%)",
                  "linear-gradient(135deg, transparent 0%, transparent 50%, transparent 100%)",
                  "linear-gradient(135deg, transparent 0%, transparent 50%, rgba(255,255,255,0.2) 100%)",
                ]
              ),
            }}
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 z-10">
            {/* Category Badge with gold accent */}
            <motion.div
              className="mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isHovered ? 1 : 0.8,
                y: isHovered ? 0 : 5,
              }}
              transition={{ duration: 0.4, ease: premiumEasing }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-500/90 backdrop-blur-sm text-neutral-900 text-xs font-bold tracking-widest uppercase shadow-lg">
                <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                {project.roomType}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              className={`font-cinzel font-semibold text-white mb-1 drop-shadow-lg ${
                isLarge ? "text-2xl lg:text-4xl" : "text-xl lg:text-2xl"
              }`}
              animate={{
                y: isHovered ? -6 : 0,
              }}
              transition={{ duration: 0.4, ease: premiumEasing }}
            >
              {project.title}
            </motion.h3>

            {/* Location with gold accent */}
            <motion.p
              className="text-white/90 text-sm flex items-center gap-2"
              animate={{
                y: isHovered ? -6 : 0,
              }}
              transition={{ duration: 0.4, ease: premiumEasing, delay: 0.05 }}
            >
              <span className="w-4 h-[1px] bg-gold-500" />
              {project.location}
            </motion.p>

            {/* View Project Button */}
            <motion.div
              className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8"
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.8,
                rotate: isHovered ? 0 : -10,
              }}
              transition={{ duration: 0.4, ease: premiumEasing }}
            >
              <motion.span
                className="flex items-center justify-center w-14 h-14 bg-gold-500 rounded-full shadow-xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                style={{
                  boxShadow: "0 8px 30px rgba(201, 162, 39, 0.4)",
                }}
              >
                <Eye className="w-5 h-5 text-neutral-900" />
              </motion.span>
            </motion.div>
          </div>

          {/* Decorative corner accents */}
          <motion.div
            className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold-500/0"
            animate={{
              borderColor: isHovered ? "rgba(201, 162, 39, 0.6)" : "rgba(201, 162, 39, 0)",
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold-500/0"
            animate={{
              borderColor: isHovered ? "rgba(201, 162, 39, 0.6)" : "rgba(201, 162, 39, 0)",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjectsClient({ projects }: FeaturedProjectsClientProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Scroll-based parallax for section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // GSAP Staggered Grid Reveal with enhanced animation
  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".project-card");

      // Set initial state
      gsap.set(cards, {
        opacity: 0,
        scale: 0.85,
        y: 80,
        rotateX: -15,
      });

      // Create staggered reveal animation
      cards.forEach((card, index) => {
        // Calculate stagger based on grid position
        const row = Math.floor(index / 3);
        const col = index % 3;
        const delay = (row * 0.12) + (col * 0.08);

        // Different reveal directions based on position
        const xOffset = col === 0 ? -50 : col === 2 ? 50 : 0;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.85,
            y: 80,
            x: xOffset,
            rotateX: -15,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            rotateX: 0,
            duration: 1,
            delay,
            ease: "power4.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Cleanup
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef, dependencies: [projects] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-40 bg-cream overflow-hidden"
    >
      {/* Background decorations */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-3xl" />
      </motion.div>

      {/* Decorative vertical lines */}
      <div className="absolute inset-y-0 left-[8%] w-[1px] bg-gradient-to-b from-transparent via-gold-500/20 to-transparent hidden xl:block" />
      <div className="absolute inset-y-0 right-[8%] w-[1px] bg-gradient-to-b from-transparent via-gold-500/20 to-transparent hidden xl:block" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <motion.span
              className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformOrigin: "right" }}
            />
            <span className="text-gold-600 text-xs font-bold tracking-[0.3em] uppercase">
              Featured Work
            </span>
            <motion.span
              className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cinzel text-4xl md:text-5xl lg:text-7xl font-semibold text-neutral-900 tracking-tight mb-4"
          >
            Our Latest
            <span className="text-primary-600 relative ml-3">
              Projects
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-600 text-lg max-w-2xl mx-auto"
          >
            Discover our portfolio of meticulously crafted interiors that embody
            elegance, functionality, and timeless design.
          </motion.p>
        </div>

        {/* Asymmetric Grid with GSAP Animation */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8"
          style={{ perspective: 1200 }}
        >
          {projects.map((project, index) => {
            // Large cards: index 0 and 5 (first and last)
            const isLarge = index === 0 || index === 5;

            return (
              <ProjectCard
                key={project.id}
                project={project}
                isLarge={isLarge}
                index={index}
              />
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 lg:mt-24 text-center"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-4 px-10 py-5 bg-neutral-900 text-white font-semibold text-sm tracking-[0.1em] uppercase shadow-xl hover:bg-primary-600 transition-all duration-400"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
