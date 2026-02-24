"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { openWhatsApp, WHATSAPP_MESSAGES } from "@/lib/whatsapp";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  cumulativePayment: number;
  paymentNote: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
}

interface ProcessSectionClientProps {
  steps?: ProcessStep[];
}

const defaultProcessSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    subtitle: "Understanding Your Vision",
    description:
      "We begin with a meaningful conversation about your aspirations. Our designers immerse themselves in understanding your lifestyle, preferences, and the way you envision your ideal space. This foundational stage sets the tone for everything that follows.",
    duration: "5 Days",
    cumulativePayment: 5,
    paymentNote: "Pay 5% booking amount to start the discovery phase",
    deliverables: [
      "Comprehensive home visit & space assessment",
      "Lifestyle & aesthetic questionnaire",
      "Moodboard presentation",
      "Preliminary scope & budget outline",
    ],
    image: "/images/how-we-work/stage-1.jpg",
    imageAlt: "Discovery consultation meeting",
  },
  {
    number: "02",
    title: "Design",
    subtitle: "Crafting the Concept",
    description:
      "Where imagination meets precision. Our team develops comprehensive design concepts that translate your vision into tangible plans. Every detail is considered—from spatial flow to material textures—creating a blueprint for transformation.",
    duration: "12 Days",
    cumulativePayment: 55,
    paymentNote: "Pay 50% on Design Freeze to commence manufacturing",
    deliverables: [
      "Detailed floor plans & elevations",
      "Photorealistic 3D visualizations",
      "Material & finish specifications",
      "Complete furniture selections",
    ],
    image: "/images/how-we-work/stage-2.jpeg",
    imageAlt: "Design concept development",
  },
  {
    number: "03",
    title: "Production",
    subtitle: "Bringing Dreams to Life",
    description:
      "The art of execution. We coordinate master craftsmen, artisans, and trusted vendors to bring your design to reality. Our meticulous project management ensures every element meets our exacting standards of quality and timeline.",
    duration: "23 Days",
    cumulativePayment: 95,
    paymentNote: "Pay 40% during production milestones",
    deliverables: [
      "Dedicated project management",
      "Weekly progress documentation",
      "Quality assurance inspections",
      "Procurement & logistics coordination",
    ],
    image: "/images/how-we-work/stage-3.webp",
    imageAlt: "Production and craftsmanship",
  },
  {
    number: "04",
    title: "Handover",
    subtitle: "The Final Unveiling",
    description:
      "The moment of revelation. We orchestrate the finishing touches—styling, art placement, and final adjustments—before unveiling your transformed space. A home that tells your story, ready for the memories yet to come.",
    duration: "5 Days",
    cumulativePayment: 100,
    paymentNote: "Pay final 5% on project completion",
    deliverables: [
      "Professional styling & staging",
      "Architectural photography session",
      "Maintenance & care guidelines",
      "30-day post-completion support",
    ],
    image: "/images/how-we-work/stage-4.jpg",
    imageAlt: "Final handover and reveal",
  },
];

// Particle Burst Component
function ParticleBurst({ active, onComplete }: { active: boolean; onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!active || hasTriggered.current || !containerRef.current) return;
    hasTriggered.current = true;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];
    const count = 12;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: linear-gradient(135deg, #c9a227, #d4af37);
        border-radius: 50%;
        pointer-events: none;
        left: 50%;
        top: 50%;
        box-shadow: 0 0 6px rgba(201, 162, 39, 0.8);
      `;
      container.appendChild(particle);
      particles.push(particle);
    }

    particles.forEach((particle, i) => {
      const angle = (i / count) * Math.PI * 2;
      const distance = 40 + Math.random() * 30;

      gsap.fromTo(
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
          onComplete: () => {
            particle.remove();
            if (i === count - 1) onComplete();
          },
        }
      );
    });
  }, [active, onComplete]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-visible"
      style={{ zIndex: 10 }}
    />
  );
}

// Enhanced Progress Bar with Particle Burst
function AnimatedProgressBar({
  percentage,
  stepIndex,
}: {
  percentage: number;
  stepIndex: number;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [showParticles, setShowParticles] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useGSAP(() => {
    if (!barRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: barRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      barRef.current,
      { width: "0%" },
      {
        width: `${percentage}%`,
        duration: 1.2,
        delay: 0.3 + stepIndex * 0.1,
        ease: "power2.out",
        onComplete: () => {
          setShowParticles(true);
          // Add glow effect at the end
          gsap.to(barRef.current, {
            boxShadow: "0 0 20px rgba(201, 162, 39, 0.6)",
            duration: 0.3,
            yoyo: true,
            repeat: 1,
          });
        },
      }
    );
  }, [percentage, stepIndex]);

  return (
    <div className="w-full h-2.5 bg-neutral-200/70 rounded-full overflow-visible relative">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full relative"
        style={{ width: "0%" }}
      >
        {/* Particle burst at the end of the bar */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          {showParticles && !isComplete && (
            <ParticleBurst active={showParticles} onComplete={() => setIsComplete(true)} />
          )}
        </div>
      </div>
    </div>
  );
}

// Process Card with Enhanced Image Parallax
function ProcessCard({
  step,
  index,
}: {
  step: ProcessStep;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !imageRef.current) return;

    // Image parallax effect within card
    gsap.to(imageRef.current, {
      yPercent: -15,
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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 hover:shadow-xl hover:border-gold-200 transition-all duration-500 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Content */}
          <div className={`p-8 lg:p-10 flex flex-col ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
            {/* Step Number & Title */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-gold-500 font-cinzel text-lg font-semibold">{step.number}</span>
                <span className="w-8 h-[1px] bg-gold-500" />
              </div>
              <h3 className="font-cinzel text-2xl lg:text-3xl font-semibold text-neutral-900 group-hover:text-gold-600 transition-colors duration-300">
                {step.title}
              </h3>
              <span className="text-gold-600 text-sm font-semibold tracking-[0.15em] uppercase">
                {step.subtitle}
              </span>
            </div>

            {/* Divider */}
            <div className="w-16 h-[1px] bg-gold-500 mb-6" />

            {/* Description */}
            <p className="text-neutral-600 text-base lg:text-lg leading-relaxed mb-6">
              {step.description}
            </p>

            {/* Deliverables */}
            <div className="mb-6">
              <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase mb-4 block">
                What You&apos;ll Receive
              </span>
              <ul className="space-y-2">
                {step.deliverables.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-3 text-neutral-700"
                  >
                    <span className="w-5 h-[1px] bg-gold-400" />
                    <span className="text-sm lg:text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Duration */}
            <div className="mb-6 pt-4 border-t border-neutral-100">
              <span className="inline-flex items-center gap-2 text-neutral-500 text-sm font-medium tracking-wider uppercase">
                <span className="w-6 h-[1px] bg-gold-500" />
                Duration: {step.duration}
              </span>
            </div>

            {/* Cumulative Payment Progress Bar with Particle Burst */}
            <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/60 rounded-xl p-5 border border-orange-100/50 mt-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-neutral-600 text-sm font-medium">
                  Cumulative Payment
                </span>
                <span className="text-gold-600 text-xl font-semibold">
                  {step.cumulativePayment}%
                </span>
              </div>
              <AnimatedProgressBar
                percentage={step.cumulativePayment}
                stepIndex={index}
              />
              <div className="mt-3 flex items-start gap-2">
                <div className="w-1 h-full min-h-[20px] bg-gold-400 rounded-full flex-shrink-0 mt-0.5" />
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {step.paymentNote}
                </p>
              </div>
            </div>
          </div>

          {/* Image with Parallax */}
          <div className={`relative h-80 lg:h-auto lg:min-h-[520px] bg-neutral-100 overflow-hidden ${index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}>
            <div ref={imageRef} className="absolute inset-0 scale-125">
              <Image
                src={step.image}
                alt={step.imageAlt}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Timeline Connector with Line Drawing Animation
function TimelineConnector() {
  const lineRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current || !containerRef.current) return;

    const length = lineRef.current.getTotalLength();

    gsap.set(lineRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px hidden lg:block pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 2 100"
        style={{ height: "100%" }}
      >
        <path
          ref={lineRef}
          d="M1 0 L1 100"
          stroke="url(#goldGradient)"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#c9a227" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="1" />
            <stop offset="100%" stopColor="#c9a227" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function ProcessSectionClient({ steps: propsSteps }: ProcessSectionClientProps) {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const processSteps = propsSteps && propsSteps.length > 0 ? propsSteps : defaultProcessSteps;

  // Calculate total days
  const totalDays = processSteps.reduce((acc, step) => {
    const days = parseInt(step.duration) || 0;
    return acc + days;
  }, 0);

  // GSAP staggered entrance for header elements
  useGSAP(() => {
    if (!headerRef.current) return;

    const elements = headerRef.current.querySelectorAll(".gsap-header-item");

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative py-28 md:py-36 lg:py-44 bg-cream overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-100/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="gsap-header-item flex items-center justify-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-gold-500" />
            <span className="text-gold-500 text-sm font-semibold tracking-[0.25em] uppercase">
              How We Work
            </span>
            <span className="w-12 h-[2px] bg-gold-500" />
          </div>

          <h2 className="gsap-header-item font-cinzel text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 leading-[1.1] mb-6">
            Our Design
            <span className="text-gold-600"> Process</span>
          </h2>

          <p className="gsap-header-item text-neutral-600 text-lg md:text-xl leading-relaxed">
            A refined {totalDays}-day journey from initial vision to final reveal, guided by
            expertise, creativity, and attention to detail.
          </p>

          {/* Timeline Summary */}
          <div className="gsap-header-item mt-8 inline-flex items-center gap-6 px-8 py-4 bg-white border border-neutral-200 rounded-lg shadow-sm">
            <div className="text-center">
              <span className="text-gold-600 text-2xl font-semibold block">{processSteps.length}</span>
              <span className="text-neutral-500 text-xs tracking-wider uppercase">Phases</span>
            </div>
            <span className="w-[1px] h-10 bg-neutral-200" />
            <div className="text-center">
              <span className="text-gold-600 text-2xl font-semibold block">{totalDays}</span>
              <span className="text-neutral-500 text-xs tracking-wider uppercase">Days</span>
            </div>
            <span className="w-[1px] h-10 bg-neutral-200" />
            <div className="text-center">
              <span className="text-gold-600 text-2xl font-semibold block">1</span>
              <span className="text-neutral-500 text-xs tracking-wider uppercase">Vision</span>
            </div>
          </div>
        </div>

        {/* Vertical Process Cards with Timeline Connector */}
        <div className="space-y-8 lg:space-y-12 relative">
          <TimelineConnector />
          {processSteps.map((step, index) => (
            <ProcessCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
      </div>

      <div className="bg-primary-600 py-16 md:py-20 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-6 lg:px-12 text-center"
        >
          <p className="text-white/90 text-xl md:text-2xl mb-6 font-cinzel">
            Ready to start your design journey?
          </p>
          <button
            onClick={() => openWhatsApp(WHATSAPP_MESSAGES.scheduleConsultation)}
            className={cn(
              "group inline-flex items-center justify-center gap-3",
              "px-10 py-5 bg-gold-500 text-neutral-900",
              "font-semibold text-sm tracking-[0.1em] uppercase",
              "hover:bg-white transition-all duration-300 cursor-pointer"
            )}
          >
            <span>Schedule Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProcessSectionClient;
