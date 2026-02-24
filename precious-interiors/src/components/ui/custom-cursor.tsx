"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasFinPointer, setHasFinPointer] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "text" | "view" | "drag" | "magnetic">("default");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Premium spring config for smooth, luxurious movement
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slower spring for the outer ring (creates trailing effect)
  const ringSpringConfig = { damping: 25, stiffness: 150, mass: 0.8 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

  // Even slower spring for glow trail
  const glowSpringConfig = { damping: 30, stiffness: 100, mass: 1 };
  const glowXSpring = useSpring(cursorX, glowSpringConfig);
  const glowYSpring = useSpring(cursorY, glowSpringConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  // Check for fine pointer on mount
  useEffect(() => {
    setIsMounted(true);
    const hasFine = window.matchMedia("(pointer: fine)").matches;
    setHasFinPointer(hasFine);

    // Add class to body to hide default cursor only when custom cursor is ready
    if (hasFine) {
      document.body.classList.add("cursor-ready");
    }

    return () => {
      document.body.classList.remove("cursor-ready");
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !hasFinPointer) return;

    // Use event delegation for hover detection (no polling!)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check for magnetic effect
      const isMagnetic = target.closest("[data-cursor-magnetic]");
      if (isMagnetic) {
        setCursorVariant("magnetic");
      }

      // Check for custom cursor text
      const cursorTextAttr = target.getAttribute("data-cursor-text") ||
        target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");

      if (cursorTextAttr) {
        setCursorText(cursorTextAttr);
        setCursorVariant("text");
      }

      // Check for view variant (project cards, images)
      const isViewTarget = target.closest("[data-cursor-view]");
      if (isViewTarget) {
        setCursorText("View");
        setCursorVariant("view");
      }

      // Check for drag variant (carousels)
      const isDragTarget = target.closest("[data-cursor-drag]");
      if (isDragTarget) {
        setCursorText("Drag");
        setCursorVariant("drag");
      }

      const isLink =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("data-cursor-hover");

      const isInteractive =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("[data-cursor-expand]");

      setIsHoveringLink(!!isLink);
      setIsHovering(!!isInteractive);
    };

    const handleMouseOut = () => {
      setIsHoveringLink(false);
      setIsHovering(false);
      setCursorText("");
      setCursorVariant("default");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
    };
  }, [
    isMounted,
    hasFinPointer,
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseEnter,
  ]);

  // Don't render until mounted or on touch devices
  if (!isMounted || !hasFinPointer) return null;

  const showTextCursor = cursorVariant === "text" || cursorVariant === "view" || cursorVariant === "drag";

  return (
    <>
      {/* Glow trail effect - furthest back */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9997]"
        style={{
          x: glowXSpring,
          y: glowYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHoveringLink ? 3 : showTextCursor ? 2.5 : 1.8,
            opacity: isVisible ? (isHoveringLink ? 0.2 : 0.1) : 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="w-16 h-16 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(201, 162, 39, 0.6) 0%, transparent 70%)",
              filter: "blur(12px)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Secondary glow trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringXSpring,
          y: ringYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHoveringLink ? 2 : 1.2,
            opacity: isVisible && isHoveringLink ? 0.25 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div
            className="w-12 h-12 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(201, 162, 39, 0.8) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Cursor ring with trailing effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringXSpring,
          y: ringYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.85 : showTextCursor ? 0 : isHoveringLink ? 2 : isHovering ? 2.2 : 1,
            opacity: isVisible ? (isHoveringLink ? 0.6 : 0.4) : 0,
            borderWidth: isHoveringLink ? 2 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div
            className="w-10 h-10 rounded-full"
            style={{
              border: "1px solid rgba(201, 162, 39, 0.8)",
              background: isHoveringLink ? "rgba(201, 162, 39, 0.05)" : "transparent",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isClicking ? 0.7 : showTextCursor ? 0 : isHoveringLink ? 0.8 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: "linear-gradient(135deg, #c9a227 0%, #d4af37 100%)",
              boxShadow: "0 0 10px rgba(201, 162, 39, 0.5)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Text cursor (View, Drag, custom text) */}
      <AnimatePresence>
        {showTextCursor && isVisible && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[10001]"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              animate={{ scale: isClicking ? 0.9 : 1 }}
            >
              {/* Outer glow ring */}
              <motion.div
                className="absolute w-24 h-24 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(201, 162, 39, 0.2) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main circle */}
              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #c9a227 0%, #a67c00 100%)",
                  boxShadow: "0 4px 20px rgba(201, 162, 39, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                {/* Shine effect */}
                <div
                  className="absolute inset-0 rounded-full overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
                  }}
                />
                <span className="relative text-xs font-bold tracking-widest text-neutral-900 uppercase">
                  {cursorText}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magnetic effect indicator */}
      <AnimatePresence>
        {cursorVariant === "magnetic" && isVisible && !showTextCursor && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[10000]"
            style={{
              x: cursorXSpring,
              y: cursorYSpring,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-16 h-16 rounded-full border-2 border-dashed border-gold-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CustomCursor;
