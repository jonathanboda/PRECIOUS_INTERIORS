"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  variant?: "default" | "green";
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function MagneticButton({
  children,
  className,
  magneticStrength = 0.3,
  springConfig = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  },
  variant = "default",
  as = "button",
  href,
  onClick,
  disabled = false,
  type = "button",
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values for position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smooth movement
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!buttonRef.current || disabled) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Apply magnetic effect
      x.set(deltaX * magneticStrength);
      y.set(deltaY * magneticStrength);
    },
    [magneticStrength, x, y, disabled]
  );

  const handleMouseEnter = useCallback(() => {
    if (!disabled) {
      setIsHovering(true);
    }
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const variantStyles = {
    default: cn(
      "bg-neutral-900 text-white hover:bg-neutral-800",
      "dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
    ),
    green: cn(
      "bg-emerald-600 text-white hover:bg-emerald-700",
      "shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40"
    ),
  };

  const baseStyles = cn(
    "inline-flex items-center justify-center",
    "px-6 py-3 rounded-lg font-medium",
    "transition-colors duration-200",
    "cursor-pointer select-none",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantStyles[variant],
    className
  );

  const motionProps = {
    ref: buttonRef as React.RefObject<HTMLButtonElement>,
    style: { x: springX, y: springY },
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    whileTap: disabled ? {} : { scale: 0.97 },
    className: baseStyles,
  };

  if (as === "a" && href) {
    return (
      <motion.a
        {...motionProps}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
      >
        <motion.span
          animate={{
            scale: isHovering ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <motion.span
        animate={{
          scale: isHovering ? 1.05 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
}

export function MagneticWrapper({
  children,
  className,
  magneticStrength = 0.2,
}: MagneticWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x.set((e.clientX - centerX) * magneticStrength);
      y.set((e.clientY - centerY) * magneticStrength);
    },
    [magneticStrength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={wrapperRef}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}
