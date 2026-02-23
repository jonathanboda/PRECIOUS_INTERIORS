"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

const whyChooseUs = [
  {
    title: "Quality Materials",
    description: "Only premium materials and finishes used",
    image: "/choose%20us/quality.jpg",
  },
  {
    title: "On-Time Delivery",
    description: "Projects completed within promised timelines",
    image: "/choose%20us/on-time-delivery.jpg",
  },
  {
    title: "Affordable Pricing",
    description: "Luxury designs at competitive prices",
    image: "/choose%20us/affordable-pricing.jpg",
  },
  {
    title: "5 Year Warranty",
    description: "Comprehensive warranty on all work",
    image: "/choose%20us/5-years.jpeg",
  },
];

// Feature Card with 3D Lift Effect, Gold Glow, and Image Parallax
function FeatureCard({
  feature,
  index,
}: {
  feature: typeof whyChooseUs[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // 3D card hover lift effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      gsap.to(card, {
        rotateX,
        rotateY,
        y: -12,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      // Gold glow effect on edges
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 1,
          boxShadow: "0 0 40px rgba(201, 162, 39, 0.5), 0 0 80px rgba(201, 162, 39, 0.3), inset 0 0 30px rgba(201, 162, 39, 0.1)",
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0,
          boxShadow: "0 0 0px rgba(201, 162, 39, 0)",
          duration: 0.5,
        });
      }
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Image parallax within card
  useGSAP(() => {
    if (!cardRef.current || !imageRef.current) return;

    gsap.to(imageRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl group cursor-pointer h-[280px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Gold glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-10 pointer-events-none rounded-2xl opacity-0"
        style={{
          border: "2px solid rgba(201, 162, 39, 0.5)",
        }}
      />

      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className="absolute inset-0 scale-125 transition-transform duration-500 group-hover:scale-130"
        style={{
          backgroundImage: `url('${feature.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 via-neutral-900/70 to-neutral-900/50 group-hover:from-neutral-900/80 group-hover:via-neutral-900/60 group-hover:to-neutral-900/40 transition-all duration-300" />

      {/* Content */}
      <div
        className="relative h-full flex flex-col items-center justify-end p-6 text-center pb-8"
        style={{ transform: "translateZ(30px)" }}
      >
        <h3 className="text-xl font-cinzel font-semibold text-white mb-2 drop-shadow-lg">
          {feature.title}
        </h3>
        <p className="text-white/80 text-sm drop-shadow">{feature.description}</p>
      </div>

      {/* Border Accent */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold-500/50 rounded-2xl transition-all duration-300" />
    </div>
  );
}

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // GSAP staggered entrance animation
  useGSAP(() => {
    if (!cardsContainerRef.current) return;

    const cards = cardsContainerRef.current.querySelectorAll(".feature-card");

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 60,
        rotateX: -15,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-12 h-[2px] bg-primary-600" />
            <span className="text-primary-600 text-sm font-semibold tracking-[0.2em] uppercase">
              Why Us
            </span>
            <span className="w-12 h-[2px] bg-primary-600" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-cinzel font-bold text-neutral-900 mb-6"
          >
            Why Choose The Precious Interiors
          </motion.h2>
        </div>

        {/* Features Grid with Staggered Animation */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          {whyChooseUs.map((feature, index) => (
            <div key={feature.title} className="feature-card">
              <FeatureCard feature={feature} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
