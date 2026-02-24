"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, MapPin, Clock, Maximize2 } from "lucide-react";
import Link from "next/link";
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

// Room types and styles for filters
const roomTypes = [
  "All Projects",
  "Living Room",
  "Bedroom",
  "Kitchen",
  "Bathroom",
  "Office",
  "Full Home",
] as const;

const styles = [
  "All Styles",
  "Modern",
  "Contemporary",
  "Minimalist",
  "Traditional",
  "Industrial",
  "Scandinavian",
] as const;

type RoomType = (typeof roomTypes)[number];
type Style = (typeof styles)[number];

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
  featured: boolean;
}

interface ProjectsGalleryProps {
  projects: Project[];
}

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  const [activeRoomType, setActiveRoomType] = useState<RoomType>("All Projects");
  const [activeStyle, setActiveStyle] = useState<Style>("All Styles");

  // Filter projects
  const filteredProjects = useMemo(() => {
    let result = projects;

    if (activeRoomType !== "All Projects") {
      result = result.filter((project) => project.roomType === activeRoomType);
    }

    if (activeStyle !== "All Styles") {
      result = result.filter((project) => project.style === activeStyle);
    }

    return result;
  }, [activeRoomType, activeStyle, projects]);

  return (
    <section
      id="projects"
      className="relative py-16 md:py-24 bg-white overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <span className="w-12 h-[2px] bg-primary-600" />
            <span className="text-gold-500 text-sm font-semibold tracking-[0.25em] uppercase">
              Our Work
            </span>
            <span className="w-12 h-[2px] bg-primary-600" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-semibold text-neutral-900"
          >
            Featured Projects
          </motion.h2>
        </div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          {/* Two-row filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-8 pb-6 border-b border-neutral-200">
            {/* Room Type Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {roomTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveRoomType(type)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                    activeRoomType === type
                      ? "bg-primary-600 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-neutral-300" />

            {/* Style Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {styles.map((style) => (
                <button
                  key={style}
                  onClick={() => setActiveStyle(style)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                    activeStyle === style
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  )}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-neutral-500 text-lg mb-4">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setActiveRoomType("All Projects");
                setActiveStyle("All Styles");
              }}
              className="text-primary-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}

        {/* Projects Grid - Clean Card Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100 mb-4">
                    <img
                      src={isValidImageUrl(project.image) ? project.image : FALLBACK_IMAGE}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3 px-3 py-1 bg-gold-500/90 backdrop-blur-sm text-neutral-900 text-xs font-semibold tracking-wider uppercase rounded">
                        Featured
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                          <ArrowRight className="w-5 h-5 text-neutral-900" />
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2">
                    {/* Title & Style Badge Row */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <span className="flex-shrink-0 px-2.5 py-1 bg-primary-50 text-primary-600 text-xs font-semibold rounded-full uppercase tracking-wide">
                        {project.style}
                      </span>
                    </div>

                    {/* Location */}
                    <p className="text-neutral-500 text-sm flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-neutral-400 text-sm pt-1">
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5" />
                        {project.sqft}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {project.duration}
                      </span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center"
        >
          <button
            onClick={() => openWhatsApp(WHATSAPP_MESSAGES.projectsInquiry)}
            className={cn(
              "group inline-flex items-center gap-3",
              "px-8 py-4 bg-primary-600 text-white rounded-full",
              "font-semibold text-sm",
              "hover:bg-primary-500 transition-all duration-300 cursor-pointer"
            )}
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectsGallery;
