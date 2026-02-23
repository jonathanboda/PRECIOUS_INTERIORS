"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useInquiryModal } from "@/context/inquiry-modal-context";
import { FloatingShapes } from "@/components/animations/floating-shapes";

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  image_url: string;
}

interface ServicesSectionProps {
  services?: Service[];
}

const defaultServices = [
  {
    id: "1",
    title: "Strategic Planning",
    description:
      "We begin every project with deep understanding. Through comprehensive consultation, we analyze your space, lifestyle, and aspirations to create a vision that's uniquely yours.",
    features: ["Space Analysis", "Lifestyle Assessment", "Budget Planning"],
    image_url: "/images/our%20service/strategic%20plans.jpg",
  },
  {
    id: "2",
    title: "Interior Design",
    description:
      "Our design philosophy marries timeless elegance with contemporary sensibility. We craft cohesive visual narratives that transform spaces into artistic expressions.",
    features: ["Concept Development", "Material Selection", "3D Visualization"],
    image_url: "/images/our%20service/interior%20designing.png",
  },
  {
    id: "3",
    title: "Custom Furnishing",
    description:
      "Beyond off-the-shelf solutions, we design bespoke furniture pieces that perfectly complement your space and reflect your personal aesthetic.",
    features: ["Bespoke Design", "Artisan Craftsmanship", "Premium Materials"],
    image_url: "/images/our%20service/custom%20furniture.webp",
  },
  {
    id: "4",
    title: "Final Styling",
    description:
      "The finishing touches transform a designed space into a living environment. We curate art, accessories, and textiles that bring warmth and personality.",
    features: ["Art Curation", "Accessory Styling", "Textile Selection"],
    image_url: "/images/our%20service/final%20styling.png",
  },
];

// Premium easing curves - typed as tuple for Framer Motion
const premiumEasing: [number, number, number, number] = [0.32, 0.72, 0, 1];
const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };

// Enhanced slide animation variants with depth effect
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.85,
    filter: "blur(10px)",
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    rotateY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 35,
      mass: 0.8,
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.85,
    filter: "blur(10px)",
    rotateY: direction < 0 ? 15 : -15,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 35,
      mass: 0.8,
    },
  }),
};

// Feature tag animation variants
const featureContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const featureTagVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
    },
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// 3D Card Tilt Component
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

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
  }, [x, y]);

  // Dynamic shadow based on tilt
  const shadowX = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const shadowY = useTransform(springY, [-0.5, 0.5], [-30, 30]);

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative", className)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glossy reflection overlay */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none rounded-3xl overflow-hidden"
        style={{
          background: useTransform(
            springX,
            [-0.5, 0, 0.5],
            [
              "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, transparent 100%)",
              "linear-gradient(135deg, transparent 0%, transparent 50%, transparent 100%)",
              "linear-gradient(135deg, transparent 0%, transparent 50%, rgba(255,255,255,0.15) 100%)",
            ]
          ),
        }}
      />

      {/* Dynamic shadow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-3xl"
        style={{
          x: shadowX,
          y: shadowY,
          boxShadow: "0 40px 100px rgba(0, 0, 0, 0.5)",
          filter: "blur(20px)",
        }}
      />

      {children}
    </motion.div>
  );
}

// Feature Tag Component with glow effect
function FeatureTag({ feature }: { feature: string }) {
  return (
    <motion.span
      variants={featureTagVariants}
      className="relative px-4 py-2 bg-primary-600/20 backdrop-blur-sm text-primary-300 text-xs md:text-sm font-medium tracking-wide rounded-full overflow-hidden group/tag cursor-default"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
      }}
    >
      {/* Glow effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 opacity-0 group-hover/tag:opacity-100 transition-opacity duration-300" />
      <span className="relative z-10">{feature}</span>
    </motion.span>
  );
}

export function ServicesSection({ services: propsServices }: ServicesSectionProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const { openModal } = useInquiryModal();

  // Use props services if provided, otherwise use defaults
  const services = propsServices && propsServices.length > 0 ? propsServices : defaultServices;

  const paginate = (newDirection: number) => {
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < services.length) {
      setPage([newPage, newDirection]);
    }
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold && page < services.length - 1) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold && page > 0) {
      paginate(-1);
    }
  };

  const activeService = services[page];

  return (
    <section
      id="services"
      className="relative py-16 md:py-20 lg:py-24 bg-neutral-950 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-600/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl" />

      {/* Floating Shapes Background */}
      <FloatingShapes
        count={12}
        colorClass="primary-500"
        maxSize={100}
        minSize={20}
        speed={0.5}
        className="opacity-30"
      />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-12 h-[2px] bg-primary-500" />
            <span className="text-primary-400 text-sm font-semibold tracking-[0.2em] uppercase">
              Our Services
            </span>
            <span className="w-12 h-[2px] bg-primary-500" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-semibold text-white leading-[1.1] mb-6"
          >
            A Comprehensive
            <br />
            <span className="text-primary-400">Design Experience</span>
          </motion.h2>
        </div>

        {/* Premium Card Carousel */}
        <div className="relative max-w-5xl mx-auto" style={{ perspective: 1200 }}>
          {/* Arrow Navigation - Left */}
          <motion.button
            onClick={() => paginate(-1)}
            disabled={page === 0}
            whileHover={{ scale: page === 0 ? 1 : 1.1 }}
            whileTap={{ scale: page === 0 ? 1 : 0.95 }}
            className={cn(
              "absolute -left-2 md:-left-20 top-1/2 -translate-y-1/2 z-20",
              "w-14 h-14 md:w-16 md:h-16 rounded-full",
              "bg-white/10 backdrop-blur-md shadow-2xl",
              "flex items-center justify-center text-white",
              "transition-all duration-300",
              page === 0
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-primary-600"
            )}
          >
            <ChevronLeft className="w-7 h-7" />
          </motion.button>

          {/* Arrow Navigation - Right */}
          <motion.button
            onClick={() => paginate(1)}
            disabled={page === services.length - 1}
            whileHover={{ scale: page === services.length - 1 ? 1 : 1.1 }}
            whileTap={{ scale: page === services.length - 1 ? 1 : 0.95 }}
            className={cn(
              "absolute -right-2 md:-right-20 top-1/2 -translate-y-1/2 z-20",
              "w-14 h-14 md:w-16 md:h-16 rounded-full",
              "bg-white/10 backdrop-blur-md shadow-2xl",
              "flex items-center justify-center text-white",
              "transition-all duration-300",
              page === services.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-primary-600"
            )}
          >
            <ChevronRight className="w-7 h-7" />
          </motion.button>

          {/* Card Container */}
          <div className="relative h-[480px] md:h-[420px] overflow-visible rounded-3xl">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                style={{ transformStyle: "preserve-3d" }}
              >
                <TiltCard className="h-full">
                  {/* Premium Card with Image */}
                  <div className="h-full relative rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
                    {/* Full Background Image */}
                    <motion.div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${activeService.image_url}')` }}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: premiumEasing }}
                    />

                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/95 via-neutral-900/75 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 via-transparent to-transparent" />

                    {/* Content */}
                    <div className="relative h-full p-8 md:p-12 flex flex-col justify-center max-w-2xl">
                      {/* Title */}
                      <motion.h3
                        key={`title-${page}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: premiumEasing }}
                        className="text-3xl md:text-5xl font-cinzel font-bold text-white mb-4 leading-tight"
                      >
                        {activeService.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        key={`desc-${page}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2, ease: premiumEasing }}
                        className="text-white/80 text-base md:text-lg leading-relaxed mb-6 max-w-lg"
                      >
                        {activeService.description}
                      </motion.p>

                      {/* Features Tags with Staggered Animation */}
                      <motion.div
                        key={`features-${page}`}
                        variants={featureContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-wrap gap-2 md:gap-3 mb-8"
                      >
                        {activeService.features.map((feature) => (
                          <FeatureTag key={feature} feature={feature} />
                        ))}
                      </motion.div>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5, ease: premiumEasing }}
                      >
                        <Link
                          href="/services"
                          className="inline-flex items-center gap-3 w-fit px-6 py-3 bg-primary-600 text-white font-semibold tracking-wide uppercase text-sm rounded-full shadow-[0_8px_24px_rgba(26,58,47,0.4)] hover:shadow-[0_12px_32px_rgba(26,58,47,0.5)] hover:bg-primary-500 hover:scale-105 transition-all duration-300 group/btn"
                        >
                          <span>Explore Service</span>
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    </div>

                    {/* Decorative Glow */}
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />
                  </div>
                </TiltCard>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {services.map((service, index) => (
              <motion.button
                key={service.title}
                onClick={() => setPage([index, index > page ? 1 : -1])}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "h-3 rounded-full transition-all duration-300",
                  index === page
                    ? "w-12 bg-primary-500 shadow-lg shadow-primary-500/30"
                    : "w-3 bg-neutral-600 hover:bg-primary-400"
                )}
                aria-label={`Go to ${service.title}`}
              />
            ))}
          </div>

          {/* Swipe Hint */}
          <p className="text-center text-neutral-500 text-sm mt-4 font-medium">
            Swipe or use arrows to explore our services
          </p>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8"
        >
          <p className="text-neutral-300 text-lg">
            Ready to transform your space?
          </p>
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "group inline-flex items-center justify-center gap-3",
              "px-10 py-5 bg-primary-600 text-white",
              "font-semibold text-sm tracking-[0.1em] uppercase rounded-full",
              "shadow-[0_8px_24px_rgba(26,58,47,0.3)]",
              "hover:shadow-[0_12px_32px_rgba(26,58,47,0.4)]",
              "transition-all duration-300 cursor-pointer"
            )}
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;
