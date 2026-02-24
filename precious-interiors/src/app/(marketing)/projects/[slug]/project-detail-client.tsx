"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Clock, Maximize2 } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { openWhatsApp, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

// Check if image URL is valid (not a local Windows path)
function isValidImageUrl(url: string): boolean {
  if (!url) return false;
  // Reject Windows absolute paths
  if (/^[A-Za-z]:\\/.test(url)) return false;
  return true;
}

// Fallback placeholder image
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80";

interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  roomType: string;
  style: string;
  image: string;
  year: string;
  duration: string;
  sqft: string;
  description: string;
  services: string[];
  featured: boolean;
}

interface RelatedProject {
  id: string;
  slug: string;
  title: string;
  location: string;
  image: string;
}

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: RelatedProject[];
}

export function ProjectDetailClient({ project, relatedProjects }: ProjectDetailClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main className="bg-[#FAF9F6]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <img
            src={isValidImageUrl(project.image) ? project.image : FALLBACK_IMAGE}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-24 lg:top-28 left-6 lg:left-12 z-10"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Projects</span>
          </Link>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 flex items-end"
        >
          <div className="container mx-auto px-6 lg:px-12 pb-12 lg:pb-20">
            {/* Category & Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-900 text-xs font-medium tracking-wide uppercase">
                {project.roomType}
              </span>
              <span className="px-3 py-1 bg-gold-500/90 backdrop-blur-sm text-neutral-900 text-xs font-medium tracking-wide uppercase">
                {project.style}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-cinzel text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-white tracking-tight mb-4"
            >
              {project.title}
            </motion.h1>

            {/* Location */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-2 text-white/80 text-lg"
            >
              <MapPin className="w-5 h-5" />
              {project.location}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* Project Stats Bar */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-neutral-200"
          >
            <div className="py-6 lg:py-8 pr-6">
              <span className="text-neutral-400 text-xs uppercase tracking-wider block mb-1">Area</span>
              <span className="text-neutral-900 text-lg lg:text-xl font-medium flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-primary-600" />
                {project.sqft}
              </span>
            </div>
            <div className="py-6 lg:py-8 px-6">
              <span className="text-neutral-400 text-xs uppercase tracking-wider block mb-1">Duration</span>
              <span className="text-neutral-900 text-lg lg:text-xl font-medium flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-600" />
                {project.duration}
              </span>
            </div>
            <div className="py-6 lg:py-8 px-6">
              <span className="text-neutral-400 text-xs uppercase tracking-wider block mb-1">Year</span>
              <span className="text-neutral-900 text-lg lg:text-xl font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-600" />
                {project.year}
              </span>
            </div>
            <div className="py-6 lg:py-8 pl-6">
              <span className="text-neutral-400 text-xs uppercase tracking-wider block mb-1">Style</span>
              <span className="text-neutral-900 text-lg lg:text-xl font-medium">
                {project.style}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-cinzel text-2xl lg:text-3xl font-medium text-neutral-900 mb-6">
                  About This Project
                </h2>
                <p className="text-neutral-600 text-lg leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-8 lg:p-10 border border-neutral-200"
              >
                <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-6">
                  Services Provided
                </h3>
                <ul className="space-y-4">
                  {project.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-3 text-neutral-700"
                    >
                      <span className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                      {service}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <button
                    onClick={() => openWhatsApp(WHATSAPP_MESSAGES.similarProject)}
                    className="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-primary-600 text-white font-medium text-sm tracking-wide hover:bg-primary-500 transition-colors cursor-pointer"
                  >
                    <span>Start Similar Project</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-12">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-between mb-12"
            >
              <div>
                <span className="text-gold-500 text-xs font-medium tracking-[0.25em] uppercase block mb-3">
                  More Work
                </span>
                <h2 className="font-cinzel text-3xl lg:text-4xl font-medium text-neutral-900">
                  Related Projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden md:inline-flex items-center gap-2 text-neutral-900 text-sm font-medium hover:text-primary-600 transition-colors"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Related Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/projects/${related.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 mb-4">
                      <img
                        src={isValidImageUrl(related.image) ? related.image : FALLBACK_IMAGE}
                        alt={related.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400" />
                    </div>
                    <h3 className="font-cinzel text-lg font-medium text-neutral-900 group-hover:text-primary-600 transition-colors mb-1">
                      {related.title}
                    </h3>
                    <p className="text-neutral-500 text-sm">{related.location}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile View All */}
            <div className="mt-10 text-center md:hidden">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-neutral-900 text-sm font-medium"
              >
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary-600">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
              Let&apos;s create something beautiful together. Our team is ready to bring your vision to life.
            </p>
            <button
              onClick={() => openWhatsApp(WHATSAPP_MESSAGES.getInTouch)}
              className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-600 font-semibold text-sm tracking-wide uppercase hover:bg-gold-500 hover:text-neutral-900 transition-all duration-400 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
