"use client";

import { useEffect, useState, useRef, ReactNode } from "react";
import { motion } from "framer-motion";

interface LazySectionProps {
  children: ReactNode;
  /** Minimum height for placeholder to prevent layout shift */
  minHeight?: string;
  /** How far before the section enters viewport to start loading (in pixels) */
  rootMargin?: string;
  /** Optional className for the wrapper */
  className?: string;
  /** Show a skeleton placeholder while loading */
  showSkeleton?: boolean;
}

export function LazySection({
  children,
  minHeight = "400px",
  rootMargin = "200px",
  className = "",
  showSkeleton = true,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasLoaded(true);
          // Once loaded, disconnect observer
          observer.disconnect();
        }
      },
      {
        rootMargin: rootMargin, // Start loading before section is visible
        threshold: 0,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [rootMargin]);

  // Once loaded, always show content (even if scrolled back up)
  if (hasLoaded) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Placeholder while not yet visible
  return (
    <div
      ref={sectionRef}
      className={className}
      style={{ minHeight }}
    >
      {showSkeleton && (
        <div className="w-full h-full flex items-center justify-center" style={{ minHeight }}>
          {/* Subtle loading skeleton */}
          <div className="flex flex-col items-center gap-4 opacity-30">
            <div className="w-12 h-12 rounded-full border-2 border-gold-500/30 border-t-gold-500 animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}

export default LazySection;
