"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function ProcessHero() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleScrollToContent = () => {
    const processSection = document.getElementById("process-steps");
    if (processSection) {
      processSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-neutral-900"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: smoothY }}>
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=85"
          alt="Interior design workspace with mood boards"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/90 via-neutral-900/70 to-neutral-900/95" />
      </motion.div>

      {/* Decorative Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--gold-500) 1px, transparent 1px),
                           linear-gradient(90deg, var(--gold-500) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-gold-500/30" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-gold-500/30" />

      {/* Content */}
      <motion.div
        className="container mx-auto px-6 lg:px-12 relative z-10 py-20"
        style={{ opacity }}
      >
        <div className="text-center max-w-4xl mx-auto">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-12 h-[2px] bg-gold-500" />
            <span className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase">
              The Journey
            </span>
            <span className="w-12 h-[2px] bg-gold-500" />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white/90 tracking-[0.03em] leading-[1.1] mb-8"
          >
            From Vision{" "}
            <span className="text-gold-400">to Reality</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Every extraordinary space begins with a conversation about how you want to live.
            Our refined process guides you through each step of your interior transformation.
          </motion.p>

          {/* Featured Quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-2xl mx-auto border-l-2 border-r-2 border-gold-500/30 px-8 py-4"
          >
            <p className="text-white/70 text-lg md:text-xl italic font-cormorant leading-relaxed">
              &ldquo;Your home should tell the story of who you are, and be a collection of what you love.&rdquo;
            </p>
            <cite className="text-gold-400 text-sm mt-4 block not-italic tracking-wide font-medium">
              — Nate Berkus
            </cite>
          </motion.blockquote>

          {/* Timeline Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 inline-flex items-center gap-6 px-8 py-4 bg-white/5 border border-white/10"
          >
            <div className="text-center">
              <span className="text-gold-400 text-2xl font-semibold block">4</span>
              <span className="text-white/50 text-xs tracking-wider uppercase">Phases</span>
            </div>
            <span className="w-[1px] h-10 bg-white/20" />
            <div className="text-center">
              <span className="text-gold-400 text-2xl font-semibold block">45</span>
              <span className="text-white/50 text-xs tracking-wider uppercase">Days</span>
            </div>
            <span className="w-[1px] h-10 bg-white/20" />
            <div className="text-center">
              <span className="text-gold-400 text-2xl font-semibold block">1</span>
              <span className="text-white/50 text-xs tracking-wider uppercase">Vision</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScrollToContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-gold-400 transition-colors duration-300"
        aria-label="Scroll to process steps"
      >
        <span className="text-xs tracking-[0.2em] uppercase font-medium">
          Explore Our Process
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}

export default ProcessHero;
