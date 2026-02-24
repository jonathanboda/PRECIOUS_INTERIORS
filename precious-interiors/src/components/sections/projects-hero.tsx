"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { openWhatsApp, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export function ProjectsHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-neutral-950 overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90')",
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
          Every Space
          <br />
          <span className="text-gold-400/90">Tells A Story</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-cormorant italic text-white/80 text-xl md:text-2xl max-w-2xl mx-auto mb-10"
        >
          Explore our collection of transformative spaces where vision meets
          craftsmanship and dreams become reality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={() => openWhatsApp(WHATSAPP_MESSAGES.projectsInquiry)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold-500 text-neutral-900 font-semibold tracking-wide uppercase rounded-full hover:bg-gold-400 transition-all duration-300 group cursor-pointer"
          >
            <span>Start Your Project</span>
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
  );
}

export default ProjectsHero;
