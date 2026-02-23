"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

// 3D Project Card with Tilt Effect
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
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // 3D rotation transforms
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  // Parallax for image
  const imageX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const imageY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  // Dynamic shadow
  const shadowX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

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

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`project-card relative ${isLarge ? "md:col-span-2" : ""}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
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
            y: -10,
            transition: { duration: 0.4, ease: premiumEasing },
          }}
        >
          {/* Dynamic Shadow Layer */}
          <motion.div
            className="absolute inset-0 -z-10"
            style={{
              x: isHovered ? shadowX : 0,
              y: isHovered ? shadowY : 0,
              boxShadow: isHovered
                ? "0 30px 60px rgba(0, 0, 0, 0.3)"
                : "0 10px 30px rgba(0, 0, 0, 0.1)",
              transition: "box-shadow 0.4s ease",
            }}
          />

          {/* Blur placeholder */}
          <div
            className={`absolute inset-0 bg-neutral-300 transition-opacity duration-700 ${
              isLoaded ? "opacity-0" : "opacity-100"
            }`}
            style={{
              backgroundImage: `url('${isValidImageUrl(project.image) ? project.image : FALLBACK_IMAGE}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px)",
              transform: "scale(1.1)",
            }}
          />

          {/* Main Image with Parallax */}
          <motion.img
            ref={imageRef}
            src={isValidImageUrl(project.image) ? project.image : FALLBACK_IMAGE}
            alt={project.title}
            onLoad={handleImageLoad}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
              isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-md"
            }`}
            style={{
              x: isHovered ? imageX : 0,
              y: isHovered ? imageY : 0,
              scale: isHovered ? 1.08 : 1,
            }}
          />

          {/* Default Gradient (subtle) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Hover Overlay with smooth transition */}
          <motion.div
            className="absolute inset-0 bg-black/0"
            animate={{
              backgroundColor: isHovered ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0)",
            }}
            transition={{ duration: 0.4, ease: premiumEasing }}
          />

          {/* Glossy reflection overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              background: useTransform(
                springX,
                [-0.5, 0, 0.5],
                [
                  "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, transparent 100%)",
                  "linear-gradient(135deg, transparent 0%, transparent 50%, transparent 100%)",
                  "linear-gradient(135deg, transparent 0%, transparent 50%, rgba(255,255,255,0.12) 100%)",
                ]
              ),
            }}
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
            {/* Category Badge */}
            <motion.div
              className="mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.4, ease: premiumEasing }}
            >
              <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-900 text-xs font-medium tracking-wide uppercase">
                {project.roomType}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              className={`font-cinzel font-medium text-white mb-1 ${
                isLarge ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"
              }`}
              animate={{
                y: isHovered ? -4 : 0,
              }}
              transition={{ duration: 0.4, ease: premiumEasing }}
            >
              {project.title}
            </motion.h3>

            {/* Location */}
            <motion.p
              className="text-white/80 text-sm"
              animate={{
                y: isHovered ? -4 : 0,
              }}
              transition={{ duration: 0.4, ease: premiumEasing, delay: 0.05 }}
            >
              {project.location}
            </motion.p>

            {/* Arrow with magnetic effect */}
            <motion.div
              className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 20,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.4, ease: premiumEasing }}
              whileHover={{ scale: 1.15 }}
            >
              <span className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg">
                <ArrowRight className="w-4 h-4 text-neutral-900" />
              </span>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjectsClient({ projects }: FeaturedProjectsClientProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // GSAP Staggered Grid Reveal
  useGSAP(
    () => {
      if (!gridRef.current) return;

      const cards = gridRef.current.querySelectorAll(".project-card");

      // Set initial state
      gsap.set(cards, {
        opacity: 0,
        scale: 0.9,
        y: 60,
      });

      // Create staggered reveal animation
      cards.forEach((card, index) => {
        // Calculate stagger based on grid position
        const row = Math.floor(index / 3);
        const col = index % 3;
        const delay = (row * 0.15) + (col * 0.1);

        // Different reveal directions based on position
        const xOffset = col === 0 ? -40 : col === 2 ? 40 : 0;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.9,
            y: 60,
            x: xOffset,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            delay,
            ease: "power3.out",
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
      className="relative py-24 lg:py-32 bg-[#FAF9F6] overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-500 text-xs font-medium tracking-[0.25em] uppercase">
              Featured Work
            </span>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cinzel text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-900 tracking-tight"
          >
            Our Latest Projects
          </motion.h2>
        </div>

        {/* Asymmetric Grid with GSAP Animation */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
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
          className="mt-16 lg:mt-20 text-center"
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 px-8 py-4 border border-neutral-900 text-neutral-900 font-medium text-sm tracking-wide uppercase hover:bg-neutral-900 hover:text-white transition-all duration-400"
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
