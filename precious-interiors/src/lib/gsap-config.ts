"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Export everything needed
export { gsap, ScrollTrigger };

// Default ease curves for premium feel
export const EASE = {
  smooth: "power2.out",
  smooth_inout: "power2.inOut",
  bounce: "back.out(1.7)",
  elastic: "elastic.out(1, 0.3)",
  expo: "expo.out",
  expo_inout: "expo.inOut",
  circ: "circ.out",
  premium: "power4.out",
  luxury: "cubic-bezier(0.16, 1, 0.3, 1)",
};

// Animation presets
export const ANIMATIONS = {
  fadeUp: {
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, duration: 0.8, ease: EASE.premium },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: 0.6, ease: EASE.smooth },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 0.6, ease: EASE.bounce },
  },
  slideInLeft: {
    from: { opacity: 0, x: -80 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: EASE.premium },
  },
  slideInRight: {
    from: { opacity: 0, x: 80 },
    to: { opacity: 1, x: 0, duration: 0.8, ease: EASE.premium },
  },
  clipReveal: {
    from: { clipPath: "inset(0 100% 0 0)" },
    to: { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: EASE.expo_inout },
  },
};

// ScrollTrigger defaults
export const SCROLL_TRIGGER_DEFAULTS = {
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
};

// Utility function to create staggered animations
export function createStaggerAnimation(
  elements: Element[] | NodeListOf<Element>,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  staggerAmount: number = 0.1
) {
  return gsap.fromTo(elements, fromVars, {
    ...toVars,
    stagger: staggerAmount,
  });
}

// Utility function to create a scroll-triggered timeline
export function createScrollTimeline(
  trigger: Element | string,
  options?: ScrollTrigger.Vars
) {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      ...SCROLL_TRIGGER_DEFAULTS,
      ...options,
    },
  });
}

// Particle burst effect helper
export function createParticleBurst(
  container: Element,
  count: number = 12,
  color: string = "#c9a227"
) {
  const particles: HTMLDivElement[] = [];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      width: 6px;
      height: 6px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 100;
    `;
    container.appendChild(particle);
    particles.push(particle);
  }

  const tl = gsap.timeline();

  particles.forEach((particle, i) => {
    const angle = (i / count) * Math.PI * 2;
    const distance = 60 + Math.random() * 40;

    tl.fromTo(
      particle,
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
      },
      {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      },
      0
    );
  });

  return tl;
}

// Text typing effect helper
export function createTypingEffect(
  element: Element,
  text: string,
  duration: number = 2
) {
  const chars = text.split("");
  element.textContent = "";

  const tl = gsap.timeline();

  chars.forEach((char, i) => {
    tl.to(element, {
      duration: duration / chars.length,
      onUpdate: function() {
        element.textContent = text.substring(0, i + 1);
      },
    }, i * (duration / chars.length));
  });

  return tl;
}

// 3D tilt effect helper (for mouse move)
export function create3DTiltEffect(element: HTMLElement, intensity: number = 15) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    gsap.to(element, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
}

// Line drawing animation helper
export function createLineDrawAnimation(
  svgPath: SVGPathElement,
  duration: number = 2
) {
  const length = svgPath.getTotalLength();

  gsap.set(svgPath, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  return gsap.to(svgPath, {
    strokeDashoffset: 0,
    duration,
    ease: EASE.expo_inout,
  });
}

// Counter animation with glow effect
export function createGlowingCounter(
  element: Element,
  target: number,
  duration: number = 2
) {
  const obj = { value: 0 };

  return gsap.to(obj, {
    value: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString();
    },
    onStart: () => {
      gsap.to(element, {
        textShadow: "0 0 20px rgba(201, 162, 39, 0.8), 0 0 40px rgba(201, 162, 39, 0.4)",
        duration: 0.3,
      });
    },
    onComplete: () => {
      gsap.to(element, {
        textShadow: "0 0 10px rgba(201, 162, 39, 0.3)",
        duration: 0.5,
      });
    },
  });
}
