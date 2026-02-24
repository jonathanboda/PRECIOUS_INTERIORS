"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { useInquiryModal } from "@/context/inquiry-modal-context";

interface FloatingCTAProps {
  className?: string;
  text?: string;
  showAfterPx?: number;
  hideNearFooterPx?: number;
}

export function FloatingCTA({
  className,
  text = "Get Quote",
  showAfterPx = 500,
  hideNearFooterPx = 300,
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle with requestAnimationFrame
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const distanceFromBottom = docHeight - (scrollTop + windowHeight);

        const shouldShow = scrollTop > showAfterPx;
        const nearFooter = distanceFromBottom < hideNearFooterPx;

        setIsVisible(shouldShow && !nearFooter);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [showAfterPx, hideNearFooterPx]);

  const { openModal } = useInquiryModal();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          onClick={openModal}
          className={cn(
            "fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50",
            "flex items-center gap-2 px-6 py-4",
            "bg-gold-500 text-primary-900",
            "font-medium text-sm tracking-[0.1em] uppercase",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-300",
            "group",
            className
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          data-cursor-hover
        >
          <span>{text}</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />

          {/* Subtle shine effect */}
          <span
            className={cn(
              "absolute inset-0 overflow-hidden",
              "before:absolute before:inset-0",
              "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
              "before:-translate-x-full group-hover:before:translate-x-full",
              "before:transition-transform before:duration-700"
            )}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default FloatingCTA;
