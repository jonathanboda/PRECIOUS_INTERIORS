"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealDirection = "up" | "down" | "left" | "right";

interface RevealProps {
  /** Content to reveal */
  children: React.ReactNode;
  /** Direction of the reveal animation */
  direction?: RevealDirection;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Additional CSS classes for the wrapper */
  className?: string;
  /** Only animate once when entering viewport */
  once?: boolean;
  /** Viewport margin for triggering animation */
  viewportMargin?: string;
}

const getClipPaths = (direction: RevealDirection): { hidden: string; visible: string } => {
  switch (direction) {
    case "up":
      return {
        hidden: "inset(100% 0 0 0)",
        visible: "inset(0 0 0 0)",
      };
    case "down":
      return {
        hidden: "inset(0 0 100% 0)",
        visible: "inset(0 0 0 0)",
      };
    case "left":
      return {
        hidden: "inset(0 100% 0 0)",
        visible: "inset(0 0 0 0)",
      };
    case "right":
      return {
        hidden: "inset(0 0 0 100%)",
        visible: "inset(0 0 0 0)",
      };
  }
};

const getTranslate = (direction: RevealDirection): { x?: string; y?: string } => {
  switch (direction) {
    case "up":
      return { y: "100%" };
    case "down":
      return { y: "-100%" };
    case "left":
      return { x: "100%" };
    case "right":
      return { x: "-100%" };
  }
};

export function Reveal({
  children,
  direction = "up",
  duration = 0.8,
  delay = 0,
  className,
  once = true,
  viewportMargin = "-100px",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: viewportMargin as `${number}px` });
  const clipPaths = getClipPaths(direction);

  const variants: Variants = {
    hidden: {
      clipPath: clipPaths.hidden,
    },
    visible: {
      clipPath: clipPaths.visible,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easeOut
      },
    },
  };

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
      >
        {children}
      </motion.div>
    </div>
  );
}

interface MaskRevealProps extends RevealProps {
  /** Background color of the mask */
  maskColor?: string;
}

export function MaskReveal({
  children,
  direction = "up",
  duration = 0.8,
  delay = 0,
  className,
  once = true,
  viewportMargin = "-100px",
  maskColor = "#22c55e",
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: viewportMargin as `${number}px` });
  const translate = getTranslate(direction);

  const maskVariants: Variants = {
    hidden: {
      x: 0,
      y: 0,
    },
    visible: {
      x: translate.x || 0,
      y: translate.y || 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const contentVariants: Variants = {
    hidden: {
      x: translate.x ? `-${translate.x}` : 0,
      y: translate.y ? `-${translate.y}` : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: duration * 0.8,
        delay: delay + duration * 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={contentVariants}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: maskColor }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={maskVariants}
      />
    </div>
  );
}

interface TextRevealProps {
  /** Text to reveal */
  text: string;
  /** Direction of the reveal animation */
  direction?: RevealDirection;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
  /** Only animate once when entering viewport */
  once?: boolean;
  /** HTML tag to render */
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
}

export function TextReveal({
  text,
  direction = "up",
  duration = 0.8,
  delay = 0,
  className,
  once = true,
  as: Component = "p",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const translate = getTranslate(direction);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: {
      y: translate.y || 0,
      x: translate.x || 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const words = text.split(" ");

  return (
    <div ref={ref} className="overflow-hidden">
      <Component className={cn(className)}>
        <motion.span
          className="inline-block"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {words.map((word, index) => (
            <span key={index} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block mr-[0.25em]"
                variants={lineVariants}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </Component>
    </div>
  );
}

interface SlideRevealProps {
  /** Content to reveal */
  children: React.ReactNode;
  /** Direction of slide */
  direction?: RevealDirection;
  /** Animation duration */
  duration?: number;
  /** Animation delay */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
  /** Only animate once */
  once?: boolean;
}

export function SlideReveal({
  children,
  direction = "up",
  duration = 0.6,
  delay = 0,
  className,
  once = true,
}: SlideRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: "100%", opacity: 0 };
      case "down":
        return { y: "-100%", opacity: 0 };
      case "left":
        return { x: "100%", opacity: 0 };
      case "right":
        return { x: "-100%", opacity: 0 };
    }
  };

  const variants: Variants = {
    hidden: getInitialPosition(),
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
      >
        {children}
      </motion.div>
    </div>
  );
}
