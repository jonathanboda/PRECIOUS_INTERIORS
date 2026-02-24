"use client";

import { ArrowRight } from "lucide-react";
import { openWhatsApp, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export function GalleryCTA() {
  return (
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
  );
}
