# Precious Interiors - Development Skills

## Project Context
Professional interior design website with clean minimalist aesthetic, inspired by Elvenwood Studio.

---

## Design System

### Color Palette
```typescript
// Primary - Green tones
primary-50:  '#f0fdf4'  // Lightest backgrounds
primary-100: '#dcfce7'  // Hover backgrounds
primary-200: '#bbf7d0'  // Borders, accents
primary-300: '#86efac'  // Light accents
primary-400: '#4ade80'  // Medium accents
primary-500: '#22c55e'  // Main brand green
primary-600: '#16a34a'  // Dark green (buttons, CTAs)

// Neutrals
neutral-50:  '#fafafa'  // Page background
neutral-100: '#f5f5f5'  // Card backgrounds
neutral-200: '#e5e5e5'  // Borders
neutral-300: '#d4d4d4'  // Disabled states
neutral-700: '#404040'  // Body text
neutral-900: '#171717'  // Headings
```

### Typography
- **Headings**: `font-heading` (Outfit or Montserrat), weights 500-700
- **Body**: `font-sans` (Inter or Geist), weights 400-500
- **Sizes**: Use Tailwind scale (text-sm, text-base, text-lg, text-xl, text-2xl, etc.)

### Spacing
- Section padding: `py-16 md:py-24 lg:py-32`
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Card padding: `p-6 md:p-8`

---

## Component Patterns

### File Structure
```typescript
// src/components/sections/example.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExampleProps {
  className?: string;
}

export function Example({ className }: ExampleProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      {/* content */}
    </section>
  );
}
```

### Section Component Template
```typescript
"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export function SectionName() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          {/* Section content */}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## Animation Patterns

### Framer Motion - Use For:
- Scroll-triggered fade-ins
- Hover/tap states on interactive elements
- Testimonial carousel
- Simple transitions

```typescript
// Fade in on scroll
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>

// Hover effect on cards
<motion.div
  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
  transition={{ type: "spring", stiffness: 300 }}
>

// Staggered children
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};
```

### GSAP - Use For:
- Complex timeline animations
- Hero text reveal
- Scroll-triggered parallax
- Process timeline animation

```typescript
"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".animate-item", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });
  }, { scope: containerRef });

  return <div ref={containerRef}>...</div>;
}
```

### Lottie - Use For:
- Loading spinners
- Success/error icons
- Decorative micro-animations

```typescript
import Lottie from "lottie-react";
import loadingAnimation from "@/animations/loading.json";

<Lottie animationData={loadingAnimation} loop={true} />
```

---

## Button Styles

### Primary Button
```typescript
<button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
  Start Your Journey
</button>
```

### With Framer Motion
```typescript
<motion.button
  className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium"
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
  Start Your Journey
</motion.button>
```

---

## Card Styles

### Service Card
```typescript
<motion.div
  className="bg-white p-6 rounded-xl border border-neutral-200 hover:border-primary-300 transition-colors"
  whileHover={{ y: -4 }}
>
  <Icon className="w-10 h-10 text-primary-500 mb-4" />
  <h3 className="text-lg font-heading font-semibold text-neutral-900 mb-2">
    Service Title
  </h3>
  <p className="text-neutral-600">Description text here.</p>
</motion.div>
```

### Project Card with Hover Overlay
```typescript
<motion.div
  className="relative overflow-hidden rounded-xl group cursor-pointer"
  whileHover={{ scale: 1.02 }}
>
  <Image src={image} alt={title} className="w-full h-64 object-cover" />
  <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/20 transition-colors" />
  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
    <h3 className="text-white font-medium">{title}</h3>
  </div>
</motion.div>
```

---

## Image Handling

### Next.js Image with Unsplash
```typescript
import Image from "next/image";

<Image
  src="https://images.unsplash.com/photo-XXXXX?w=800&q=80"
  alt="Interior design"
  width={800}
  height={600}
  className="object-cover rounded-xl"
/>
```

### Unsplash Categories for This Project
- Living rooms: `photo-1586023492125-27b2c045efd7`
- Kitchens: `photo-1556909114-f6e7ad7d3136`
- Bedrooms: `photo-1522771739844-6a9f6d5f14af`
- Offices: `photo-1497366216548-37526070297c`

---

## Responsive Patterns

### Breakpoints
- `sm`: 640px (mobile landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

### Grid Layouts
```typescript
// 4-column services grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

// 3-column projects grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// 2-column about layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
```

---

## File Naming Conventions

- Components: `kebab-case.tsx` (e.g., `hero-section.tsx`)
- Utilities: `kebab-case.ts` (e.g., `format-date.ts`)
- Types: `PascalCase` in files, exported as named types
- Constants: `SCREAMING_SNAKE_CASE`

---

## Import Aliases

```typescript
// Use @ alias for src directory
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Hero } from "@/components/sections/hero";
```
