"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Award, Users, MapPin, Calendar } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: 500,
    suffix: "+",
    label: "Projects Completed",
    description: "Spaces transformed",
  },
  {
    icon: Users,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Happy homeowners",
  },
  {
    icon: MapPin,
    value: 25,
    suffix: "+",
    label: "Cities Served",
    description: "Across the nation",
  },
  {
    icon: Calendar,
    value: 8,
    suffix: "+",
    label: "Years Experience",
    description: "Of excellence",
  },
];

export function ProjectStats() {
  return (
    <section className="relative py-20 md:py-28 bg-primary-600 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-700/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />

      {/* Decorative Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--gold-500) 1px, transparent 1px),
                           linear-gradient(90deg, var(--gold-500) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-gold-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Our Track Record
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-semibold text-white leading-[1.1]">
            Numbers That <span className="text-gold-400">Speak</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 text-center hover:bg-white/15 transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 mx-auto mb-4 bg-gold-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-primary-600" strokeWidth={1.5} />
                  </div>

                  {/* Counter */}
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                    delay={index * 0.15}
                    className="block text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-white mb-2"
                  />

                  {/* Label */}
                  <h3 className="text-gold-400 font-semibold text-sm tracking-wide uppercase mb-1">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-xs">
                    {stat.description}
                  </p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[25px] border-t-gold-500 border-l-[25px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <p className="text-white/60 text-lg italic font-cormorant max-w-2xl mx-auto">
            &ldquo;Every project is a new opportunity to create something extraordinary.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectStats;
