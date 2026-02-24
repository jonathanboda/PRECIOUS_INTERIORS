"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  showPercentage?: boolean;
  hideBeforeHero?: boolean;
  position?: "left" | "right";
}

export function ScrollProgress({
  className,
  showPercentage = true,
  hideBeforeHero = true,
  position = "right",
}: ScrollProgressProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = Math.round((scrollTop / docHeight) * 100);

          setPercentage(scrollPercent);

          if (hideBeforeHero) {
            const heroHeight = window.innerHeight;
            setIsVisible(scrollTop > heroHeight * 0.5);
          } else {
            setIsVisible(scrollTop > 100);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideBeforeHero]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: position === "right" ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: position === "right" ? 20 : -20 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "fixed top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3",
            position === "right" ? "right-4 md:right-6" : "left-4 md:left-6",
            className
          )}
        >
          {/* Progress track */}
          <div className="relative w-[2px] h-28 md:h-36 bg-neutral-300/50 overflow-hidden">
            {/* Progress fill */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gold-500 origin-bottom"
              style={{ scaleY }}
            />
          </div>

          {/* Percentage indicator */}
          {showPercentage && (
            <motion.span
              key={percentage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-medium text-primary-600 bg-cream/90 backdrop-blur-sm px-2 py-1 border border-neutral-200"
            >
              {percentage}%
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ScrollProgress;
