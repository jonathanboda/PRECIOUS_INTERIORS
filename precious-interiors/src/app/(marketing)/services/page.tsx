"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Home,
  Sofa,
  Hammer,
  Box,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { ServiceHighlights } from "@/components/sections/service-highlights";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Marquee } from "@/components/animations/marquee";
import { openWhatsApp, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

// Service Data
const services = [
  {
    id: "residential",
    number: "01",
    icon: Home,
    title: "Residential Interior Design",
    description:
      "Transform your home into a luxurious sanctuary. Our expert designers create personalized living spaces that reflect your lifestyle and aspirations.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=90",
    subServices: [
      "Living Room Design",
      "Bedroom & Master Suite",
      "Kitchen & Dining",
      "Bathroom Design",
      "Home Office Setup",
      "Kids Room Design",
      "Pooja Room Design",
      "Balcony & Terrace",
    ],
  },
  {
    id: "custom",
    number: "02",
    icon: Sofa,
    title: "Custom Solutions",
    description:
      "Bespoke furniture and custom-made solutions tailored to your exact specifications. Every piece is crafted to perfection with premium materials.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=90",
    subServices: [
      "Bespoke Furniture Design",
      "Custom Cabinetry & Wardrobes",
      "Built-in Storage Solutions",
      "Modular Kitchen",
      "TV Unit & Entertainment",
      "Custom Upholstery & Sofas",
    ],
  },
  {
    id: "renovation",
    number: "03",
    icon: Hammer,
    title: "Renovation Services",
    description:
      "Complete home renovation and remodeling services. We breathe new life into existing spaces with modern designs and quality craftsmanship.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=90",
    subServices: [
      "Complete Home Renovation",
      "Kitchen Remodeling",
      "Bathroom Remodeling",
      "Space Reconfiguration",
      "Flooring & Ceiling Work",
      "Painting & Wall Treatments",
    ],
  },
  {
    id: "visualization",
    number: "04",
    icon: Box,
    title: "3D Visualization & Planning",
    description:
      "See your dream space before it's built. Our advanced 3D visualization brings your ideas to life with photorealistic renders and virtual tours.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=90",
    subServices: [
      "Photorealistic 3D Renders",
      "Virtual Walkthrough Tour",
      "Before/After Visualization",
      "Mood Boards & Color Schemes",
      "Floor Plans & Layouts",
      "Material & Finish Samples",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-neutral-950 overflow-hidden pt-20">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=90')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/70 to-neutral-950" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-semibold text-white/90 tracking-[0.08em] mb-6"
          >
            Transform Your Space
            <br />
            <span className="text-gold-400/90">Into A Masterpiece</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-bellazio text-white/80 text-xl md:text-2xl max-w-2xl mx-auto mb-10"
          >
            From concept to completion, we bring your vision to life with
            exceptional craftsmanship and attention to detail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={() => openWhatsApp(WHATSAPP_MESSAGES.bookConsultation)}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-neutral-900 font-semibold tracking-wide uppercase rounded-full hover:bg-gold-400 transition-all duration-300 group cursor-pointer"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-gold-500 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Marquee Banner */}
      <Marquee variant="light" speed="slow" />

      {/* Services Sections */}
      <section className="bg-cream py-20 md:py-28">
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
                What We Offer
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
              Our Premium Services
            </motion.h2>
          </div>

          {/* Service Cards */}
          <div className="space-y-20">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
                    !isEven && "lg:flex-row-reverse"
                  )}
                >
                  {/* Image */}
                  <div
                    className={cn(
                      "relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden",
                      !isEven && "lg:order-2"
                    )}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />

                    {/* Service Number */}
                    <div className="absolute top-6 left-6">
                      <span className="text-8xl md:text-9xl font-cinzel font-bold text-white/20">
                        {service.number}
                      </span>
                    </div>

                    {/* Border */}
                    <div className="absolute inset-0 border-2 border-primary-600/30 rounded-2xl" />
                  </div>

                  {/* Content */}
                  <div className={cn(!isEven && "lg:order-1")}>
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-cinzel font-bold text-neutral-900 mb-4">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Sub-services Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {service.subServices.map((subService) => (
                        <div
                          key={subService}
                          className="flex items-center gap-2 text-neutral-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary-600 flex-shrink-0" />
                          <span className="text-sm">{subService}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      onClick={() => openWhatsApp(`Hi! I'm interested in your ${service.title} services. Can we discuss my project?`)}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-500 transition-all duration-300 group cursor-pointer"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Highlights */}
      <ServiceHighlights />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90')",
          }}
        />
        <div className="absolute inset-0 bg-neutral-950/90" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-cinzel font-bold text-white mb-6"
          >
            Ready to Transform Your Space?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 text-lg max-w-2xl mx-auto mb-10"
          >
            Let&apos;s discuss your project and bring your vision to life. Book a
            free consultation with our design experts today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => openWhatsApp(WHATSAPP_MESSAGES.bookConsultation)}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold-500 text-neutral-900 font-semibold tracking-wide uppercase rounded-full hover:bg-gold-400 transition-all duration-300 group cursor-pointer"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold tracking-wide uppercase rounded-full border border-white/20 hover:bg-white hover:text-neutral-900 transition-all duration-300"
            >
              <span>View Our Work</span>
            </Link>
          </motion.div>
        </div>
      </section>

    </>
  );
}
