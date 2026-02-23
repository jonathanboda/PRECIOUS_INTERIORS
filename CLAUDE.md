# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Precious Interiors - Professional interior design website built with Next.js 14, TypeScript, and modern animation libraries.

## Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint

# shadcn/ui components
npx shadcn@latest add [component]   # Add a component (e.g., button, card, input)
```

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion (UI), GSAP (complex sequences), Lottie (micro-animations)
- **3D**: Three.js via react-three-fiber (optional decorative elements)
- **Forms**: react-hook-form + zod validation

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main site routes with shared layout
│   │   ├── page.tsx       # Homepage (all sections)
│   │   └── layout.tsx     # Main layout with header/footer
│   ├── api/               # API routes
│   ├── globals.css        # Global styles + Tailwind
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Page sections (Hero, About, Services, etc.)
│   ├── ui/                # shadcn/ui components
│   └── animations/        # Reusable animation wrappers
├── lib/
│   └── utils.ts           # Utility functions (cn helper)
└── hooks/                 # Custom React hooks
```

## Design System

### Colors (Tailwind)
- **Primary**: Green palette (`primary-50` to `primary-600`)
- **Neutral**: Grays for text and backgrounds
- **Accent**: Light green for hover states and highlights

### Typography
- Headings: `font-heading` (Outfit/Montserrat)
- Body: `font-sans` (Inter/Geist)

## Animation Patterns

### Framer Motion
- Use `motion.div` for scroll-triggered animations
- Wrap sections with `<FadeIn>` component for consistent entrance animations
- Use `whileHover` and `whileTap` for interactive elements

### GSAP
- Use `useGSAP` hook from `@gsap/react` for timeline animations
- Register ScrollTrigger plugin for scroll-based animations
- Prefer GSAP for complex sequenced animations (hero text reveal, process timeline)

## Component Conventions

- All components use TypeScript with explicit prop types
- Section components are self-contained with their own data/content
- Use `cn()` utility for conditional Tailwind classes
- Prefer composition over props for complex components

## Image Handling

- Use Next.js `<Image>` component for optimization
- Unsplash URLs for placeholder images
- Add `sizes` prop for responsive images
