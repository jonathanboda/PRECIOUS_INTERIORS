"use client";

import { PageHero } from "@/components/sections/page-hero";
import { VideoSection } from "@/components/sections/video-section";
import { getWorkplaceVideos, getRenovationVideos, getTestimonialVideos } from "@/data/videos";
import { ArrowRight } from "lucide-react";
import { openWhatsApp, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export default function GalleryPage() {
  const workplaceVideos = getWorkplaceVideos();
  const renovationVideos = getRenovationVideos();
  const testimonialVideos = getTestimonialVideos();

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Our Journey in Motion"
        backgroundImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85"
      />

      {/* Workplace Videos */}
      <VideoSection
        label="Behind The Scenes"
        title="Our Workplace"
        videos={workplaceVideos}
        className="bg-[#FAF9F6]"
      />

      {/* Renovation Videos */}
      <VideoSection
        label="Project Transformations"
        title="Renovation Stories"
        videos={renovationVideos}
        className="bg-white"
      />

      {/* Testimonial Videos */}
      <VideoSection
        label="Client Stories"
        title="What Our Clients Say"
        videos={testimonialVideos}
        className="bg-[#FAF9F6]"
      />

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary-600">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
            Let&apos;s create a space that tells your story. Get in touch with our team today.
          </p>
          <button
            onClick={() => openWhatsApp(WHATSAPP_MESSAGES.galleryInquiry)}
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-600 font-semibold text-sm tracking-wide uppercase hover:bg-gold-500 hover:text-neutral-900 transition-all duration-400 cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </>
  );
}
