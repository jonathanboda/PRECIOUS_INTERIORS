"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { openWhatsApp, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

const processSteps = [
  {
    number: "01",
    numberWord: "One",
    title: "Discovery",
    subtitle: "Understanding Your Vision",
    duration: "5 Days",
    cumulativePayment: 5,
    paymentNote: "Pay 5% booking amount to start the discovery phase",
    description:
      "We begin with a meaningful conversation about your aspirations. Our designers immerse themselves in understanding your lifestyle, preferences, and the way you envision your ideal space. This foundational stage sets the tone for everything that follows.",
    deliverables: [
      "Comprehensive home visit & space assessment",
      "Lifestyle & aesthetic questionnaire",
      "Moodboard presentation",
      "Preliminary scope & budget outline",
    ],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    imageAlt: "Elegant consultation meeting",
  },
  {
    number: "02",
    numberWord: "Two",
    title: "Design",
    subtitle: "Crafting the Concept",
    duration: "12 Days",
    cumulativePayment: 55,
    paymentNote: "Pay 50% on Design Freeze to commence manufacturing",
    description:
      "Where imagination meets precision. Our team develops comprehensive design concepts that translate your vision into tangible plans. Every detail is considered—from spatial flow to material textures—creating a blueprint for transformation.",
    deliverables: [
      "Detailed floor plans & elevations",
      "Photorealistic 3D visualizations",
      "Material & finish specifications",
      "Complete furniture selections",
    ],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    imageAlt: "Design studio with mood boards",
  },
  {
    number: "03",
    numberWord: "Three",
    title: "Production",
    subtitle: "Bringing Dreams to Life",
    duration: "23 Days",
    cumulativePayment: 95,
    paymentNote: "Pay 40% during production milestones",
    description:
      "The art of execution. We coordinate master craftsmen, artisans, and trusted vendors to bring your design to reality. Our meticulous project management ensures every element meets our exacting standards of quality and timeline.",
    deliverables: [
      "Dedicated project management",
      "Weekly progress documentation",
      "Quality assurance inspections",
      "Procurement & logistics coordination",
    ],
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80",
    imageAlt: "Craftsmanship and construction",
  },
  {
    number: "04",
    numberWord: "Four",
    title: "Handover",
    subtitle: "The Final Unveiling",
    duration: "5 Days",
    cumulativePayment: 100,
    paymentNote: "Pay final 5% on project completion",
    description:
      "The moment of revelation. We orchestrate the finishing touches—styling, art placement, and final adjustments—before unveiling your transformed space. A home that tells your story, ready for the memories yet to come.",
    deliverables: [
      "Professional styling & staging",
      "Architectural photography session",
      "Maintenance & care guidelines",
      "30-day post-completion support",
    ],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    imageAlt: "Beautifully styled luxury interior",
  },
];

function EditorialStep({
  step,
  index,
  isReversed,
}: {
  step: (typeof processSteps)[0];
  index: number;
  isReversed: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.8]);

  return (
    <article
      ref={ref}
      className={cn(
        "relative min-h-[90vh] flex items-center py-20 lg:py-32",
        index % 2 === 0 ? "bg-cream" : "bg-neutral-50"
      )}
    >
      {/* Large Watermark Number */}
      <motion.span
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 font-cinzel text-[180px] lg:text-[280px] font-light text-neutral-200/40 select-none pointer-events-none leading-none",
          isReversed ? "right-0 lg:right-10" : "left-0 lg:left-10"
        )}
      >
        {step.number}
      </motion.span>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div
          className={cn(
            "grid lg:grid-cols-2 gap-12 lg:gap-20 items-center",
            isReversed && "lg:grid-flow-dense"
          )}
        >
          {/* Text Content */}
          <motion.div
            style={{ opacity: contentOpacity }}
            className={cn("relative", isReversed && "lg:col-start-2")}
          >
            {/* Step Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="w-12 h-[1px] bg-gold-500" />
              <span className="text-gold-600 text-sm font-medium tracking-[0.25em] uppercase">
                Step {step.numberWord}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-neutral-900 tracking-wide"
            >
              {step.title}
            </motion.h3>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-cormorant text-2xl lg:text-3xl italic text-gold-600 mt-4"
            >
              &ldquo;{step.subtitle}&rdquo;
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[1px] bg-gold-500 my-8"
            />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-neutral-600 text-lg leading-[1.9] max-w-xl"
            >
              {step.description}
            </motion.p>

            {/* Deliverables */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10"
            >
              <span className="text-xs font-semibold text-neutral-400 tracking-[0.2em] uppercase mb-4 block">
                What You&apos;ll Receive
              </span>
              <ul className="space-y-3">
                {step.deliverables.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-4 text-neutral-700"
                  >
                    <span className="w-6 h-[1px] bg-gold-400" />
                    <span className="text-sm lg:text-base">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Duration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 pt-8 border-t border-neutral-200"
            >
              <div className="mb-6">
                <span className="text-[10px] font-semibold text-neutral-400 tracking-[0.2em] uppercase block mb-1">
                  Duration
                </span>
                <p className="text-neutral-900 font-medium text-lg">{step.duration}</p>
              </div>

              {/* Cumulative Payment Progress Bar */}
              <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/60 rounded-xl p-5 border border-orange-100/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-neutral-600 text-sm font-medium">
                    Cumulative Payment
                  </span>
                  <span className="text-gold-600 text-xl font-semibold">
                    {step.cumulativePayment}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-neutral-200/70 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${step.cumulativePayment}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
                  />
                </div>
                <div className="mt-3 flex items-start gap-2">
                  <div className="w-1 h-full min-h-[20px] bg-gold-400 rounded-full flex-shrink-0 mt-0.5" />
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    {step.paymentNote}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={cn("relative", isReversed && "lg:col-start-1")}
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                style={{ y: imageY }}
                className="relative aspect-[4/5] overflow-hidden shadow-2xl"
              >
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 via-transparent to-transparent" />
              </motion.div>

              {/* Gold Corner Frame - Top Left */}
              <div
                className={cn(
                  "absolute -top-4 w-20 h-20 border-t-2 border-gold-500",
                  isReversed ? "-right-4 border-r-2" : "-left-4 border-l-2"
                )}
              />

              {/* Gold Corner Frame - Bottom Right */}
              <div
                className={cn(
                  "absolute -bottom-4 w-20 h-20 border-b-2 border-gold-500",
                  isReversed ? "-left-4 border-l-2" : "-right-4 border-r-2"
                )}
              />

              {/* Step Number Badge */}
              <div
                className={cn(
                  "absolute -bottom-6 bg-gold-500 text-white px-6 py-3 shadow-lg",
                  isReversed ? "-left-6" : "-right-6"
                )}
              >
                <span className="font-cinzel text-2xl font-medium">{step.number}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

export function ProcessSteps() {
  return (
    <section id="process-steps" className="relative overflow-hidden">
      {/* Section Header */}
      <div className="bg-cream py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <span className="w-12 h-[1px] bg-gold-500" />
              <span className="text-gold-600 text-sm font-medium tracking-[0.25em] uppercase">
                The Journey
              </span>
              <span className="w-12 h-[1px] bg-gold-500" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-neutral-900 tracking-wide"
            >
              The Art of
              <br />
              <span className="text-gold-600">Transformation</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 text-neutral-600 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto"
            >
              A curated journey through four distinct phases, where your vision
              evolves into an extraordinary living space. Each step is crafted
              with intention, precision, and an unwavering commitment to excellence.
            </motion.p>

            {/* Timeline Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 inline-flex items-center gap-3 text-sm text-neutral-500"
            >
              {processSteps.map((step, i) => (
                <span key={step.number} className="flex items-center gap-3">
                  <span className="font-cinzel text-gold-600">{step.number}</span>
                  <span>{step.title}</span>
                  {i < processSteps.length - 1 && (
                    <span className="w-8 h-[1px] bg-neutral-300" />
                  )}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Editorial Steps */}
      {processSteps.map((step, index) => (
        <EditorialStep
          key={step.number}
          step={step}
          index={index}
          isReversed={index % 2 !== 0}
        />
      ))}

      {/* Bottom CTA */}
      <div className="bg-neutral-900 py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-cormorant text-2xl lg:text-3xl italic text-gold-400 mb-6"
          >
            &ldquo;Ready to begin your transformation?&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <button
              onClick={() => openWhatsApp(WHATSAPP_MESSAGES.scheduleConsultation)}
              className={cn(
                "group inline-flex items-center justify-center gap-3",
                "px-10 py-5 bg-gold-500 text-neutral-900",
                "font-semibold text-sm tracking-[0.15em] uppercase",
                "hover:bg-white transition-all duration-300 cursor-pointer"
              )}
            >
              <span>Schedule Your Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-neutral-500 text-sm"
          >
            Complimentary consultation · No obligation · Personalized approach
          </motion.p>
        </div>
      </div>
    </section>
  );
}

export default ProcessSteps;
