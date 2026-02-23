"use client";

import { motion } from "framer-motion";
import { VideoCard } from "@/components/ui/video-card";
import type { Video } from "@/data/videos";

interface VideoSectionProps {
  label: string;
  title: string;
  videos: Video[];
  className?: string;
}

export function VideoSection({ label, title, videos, className = "" }: VideoSectionProps) {
  if (videos.length === 0) return null;

  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="text-gold-500 text-xs font-medium tracking-[0.25em] uppercase">
              {label}
            </span>
            <span className="flex-1 h-[1px] bg-gradient-to-r from-gold-500/50 to-transparent max-w-[100px]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cinzel text-3xl lg:text-4xl font-medium text-neutral-900"
          >
            {title}
          </motion.h2>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
