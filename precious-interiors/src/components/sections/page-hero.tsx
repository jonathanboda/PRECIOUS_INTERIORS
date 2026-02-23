"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-neutral-800",
        className
      )}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />

      {/* Decorative Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--gold-500) 1px, transparent 1px),
                           linear-gradient(90deg, var(--gold-500) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative h-full container mx-auto px-6 lg:px-8 flex flex-col justify-center items-center text-center">
        {subtitle && (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-bellazio text-gold-400/90 text-lg md:text-xl tracking-wide mb-4"
          >
            {subtitle}
          </motion.span>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-cinzel text-5xl md:text-6xl lg:text-7xl font-semibold text-white/90 tracking-[0.08em]"
        >
          {title}
        </motion.h1>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l border-t border-gold-500/20" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-gold-500/20" />
    </section>
  );
}

export default PageHero;
