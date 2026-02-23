"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type SplitMode = "chars" | "words" | "lines";

interface SplitTextProps {
  /** The text content to animate */
  text: string;
  /** How to split the text for animation */
  mode?: SplitMode;
  /** Initial delay before animation starts (in seconds) */
  delay?: number;
  /** Delay between each element animation (in seconds) */
  staggerDelay?: number;
  /** Animation duration for each element (in seconds) */
  duration?: number;
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for each animated element */
  elementClassName?: string;
  /** HTML tag to use for the container */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  /** Only animate once when entering viewport */
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: (staggerDelay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
    },
  }),
};

const elementVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (duration: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: "easeOut",
    },
  }),
};

function splitText(text: string, mode: SplitMode): string[] {
  switch (mode) {
    case "chars":
      return text.split("");
    case "words":
      return text.split(" ");
    case "lines":
      return text.split("\n");
    default:
      return text.split("");
  }
}

export function SplitText({
  text,
  mode = "words",
  delay = 0,
  staggerDelay = 0.05,
  duration = 0.5,
  className,
  elementClassName,
  as: Component = "p",
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const elements = splitText(text, mode);

  return (
    <div ref={ref} className="overflow-hidden">
      <Component className={cn(className)}>
        <motion.span
          className="flex flex-wrap"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          custom={staggerDelay}
          style={{ transitionDelay: `${delay}s` }}
        >
          {elements.map((element, index) => (
            <motion.span
              key={`${element}-${index}`}
              className={cn(
                "inline-block",
                mode === "words" && "mr-[0.25em]",
                mode === "chars" && element === " " && "mr-[0.25em]",
                elementClassName
              )}
              variants={elementVariants}
              custom={duration}
            >
              {element === " " ? "\u00A0" : element}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    </div>
  );
}

interface SplitTextRevealProps extends Omit<SplitTextProps, "mode"> {
  /** Animation style variant */
  variant?: "fadeUp" | "fadeIn" | "blur" | "scale";
}

const revealVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function SplitTextReveal({
  text,
  variant = "fadeUp",
  delay = 0,
  staggerDelay = 0.03,
  duration = 0.5,
  className,
  elementClassName,
  as: Component = "p",
  once = true,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const words = text.split(" ");

  const containerVariant: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerDelay,
      },
    },
  };

  const wordVariant: Variants = {
    hidden: revealVariants[variant].hidden,
    visible: {
      ...revealVariants[variant].visible,
      transition: {
        duration,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={ref} className="overflow-hidden">
      <Component className={cn(className)}>
        <motion.span
          className="flex flex-wrap"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariant}
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className={cn("inline-block mr-[0.25em]", elementClassName)}
              variants={wordVariant}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </Component>
    </div>
  );
}
