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
  const [cursorVariant, setCursorVariant] = useState<"default" | "text" | "view" | "drag">("default");

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slower spring for the outer ring (creates trailing effect)
  const ringSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
  const ringXSpring = useSpring(cursorX, ringSpringConfig);
  const ringYSpring = useSpring(cursorY, ringSpringConfig);

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
            scale: isClicking ? 0.8 : showTextCursor ? 0 : isHoveringLink ? 1.5 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
        >
          <div className="w-3 h-3 bg-gold-500 rounded-full" />
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
            scale: isClicking ? 0.9 : showTextCursor ? 0 : isHoveringLink ? 1.8 : isHovering ? 2 : 1,
            opacity: isVisible ? (isHoveringLink ? 0.5 : 0.3) : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="w-10 h-10 border border-gold-500 rounded-full" />
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
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              animate={{ scale: isClicking ? 0.9 : 1 }}
            >
              <div className="w-20 h-20 rounded-full bg-gold-500 flex items-center justify-center shadow-lg">
                <span className="text-xs font-semibold tracking-wider text-neutral-900 uppercase">
                  {cursorText}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glow trail effect */}
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
            scale: isHoveringLink ? 2.5 : 1.5,
            opacity: isVisible && isHoveringLink ? 0.15 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-16 h-16 rounded-full bg-gold-500 blur-xl" />
        </motion.div>
      </motion.div>
    </>
  );
}

export default CustomCursor;
