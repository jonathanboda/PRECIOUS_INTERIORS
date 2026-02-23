// Room type categories
export const roomTypes = ["All Projects", "Kitchens", "Living Spaces", "Wardrobes", "Bedrooms", "Offices"] as const;
export type RoomType = (typeof roomTypes)[number];

// Style categories
export const styles = ["All Styles", "Modern", "French", "Luxury", "Smart", "Traditional"] as const;
export type Style = (typeof styles)[number];

export interface Project {
  id: number;
  slug: string;
  title: string;
  location: string;
  roomType: Exclude<RoomType, "All Projects">;
  style: Exclude<Style, "All Styles">;
  image: string;
  year: string;
  duration: string;
  sqft: string;
  description: string;
  services: string[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: "serene-living-room",
    title: "Serene Living Room",
    location: "Whitefield, Bangalore",
    roomType: "Living Spaces",
    style: "Modern",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85",
    year: "2025",
    duration: "45 days",
    sqft: "1200 sq.ft",
    description: "A luxurious living space featuring floor-to-ceiling windows with panoramic city views and custom Italian furnishings. The design harmoniously blends contemporary aesthetics with functional comfort, creating an inviting atmosphere that reflects modern sophistication.",
    services: ["Full Interior Design", "Custom Furniture", "Lighting Design"],
    featured: true,
  },
  {
    id: 2,
    slug: "modern-living-space",
    title: "Modern Living Space",
    location: "Delhi, NCR",
    roomType: "Living Spaces",
    style: "Modern",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85",
    year: "2024",
    duration: "2 weeks",
    sqft: "320 sq.ft",
    description: "Contemporary living area with clean lines and natural light optimization. Every element was carefully selected to create a cohesive design that maximizes space while maintaining an open, airy feel throughout.",
    services: ["Space Planning", "Furniture Selection", "Decor"],
    featured: true,
  },
  {
    id: 3,
    slug: "minimalist-galley-kitchen",
    title: "Minimalist Galley Kitchen",
    location: "Bangalore, Karnataka",
    roomType: "Kitchens",
    style: "Modern",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85",
    year: "2024",
    duration: "2 weeks",
    sqft: "120 sq.ft",
    description: "Efficient galley kitchen with premium appliances and smart storage solutions. The streamlined design maximizes every inch of space while incorporating high-end finishes and state-of-the-art functionality.",
    services: ["Kitchen Design", "Custom Cabinetry", "Appliance Selection"],
    featured: true,
  },
  {
    id: 4,
    slug: "french-provincial-bedroom",
    title: "French Provincial Bedroom",
    location: "Mumbai, Maharashtra",
    roomType: "Bedrooms",
    style: "French",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=85",
    year: "2024",
    duration: "3 weeks",
    sqft: "280 sq.ft",
    description: "Elegant bedroom inspired by French countryside aesthetics with ornate details. Soft neutral tones, intricate moldings, and carefully curated antique pieces create a romantic sanctuary that transcends time.",
    services: ["Bedroom Design", "Custom Headboard", "Drapery"],
    featured: true,
  },
  {
    id: 5,
    slug: "luxury-master-suite",
    title: "Luxury Master Suite",
    location: "Hyderabad, Telangana",
    roomType: "Bedrooms",
    style: "Luxury",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85",
    year: "2024",
    duration: "6 weeks",
    sqft: "450 sq.ft",
    description: "Opulent master suite with walk-in closet and spa-inspired bathroom. Premium materials, bespoke furnishings, and meticulous attention to detail create an unparalleled retreat of comfort and sophistication.",
    services: ["Full Suite Design", "Walk-in Wardrobe", "Ensuite Design"],
    featured: true,
  },
  {
    id: 6,
    slug: "smart-home-office",
    title: "Smart Home Office",
    location: "Pune, Maharashtra",
    roomType: "Offices",
    style: "Smart",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=85",
    year: "2024",
    duration: "10 days",
    sqft: "150 sq.ft",
    description: "Tech-integrated home office with ergonomic design and smart lighting. Seamlessly blending productivity with comfort, this workspace features automated controls and future-proof technology infrastructure.",
    services: ["Office Design", "Tech Integration", "Ergonomic Planning"],
    featured: true,
  },
  {
    id: 7,
    slug: "traditional-kitchen",
    title: "Traditional Kitchen",
    location: "Chennai, Tamil Nadu",
    roomType: "Kitchens",
    style: "Traditional",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85",
    year: "2024",
    duration: "4 weeks",
    sqft: "200 sq.ft",
    description: "Warm traditional kitchen with wooden cabinets and classic brass fixtures. Heritage-inspired design elements meet modern functionality, creating a timeless cooking space that celebrates craftsmanship.",
    services: ["Kitchen Renovation", "Custom Woodwork", "Brass Fittings"],
  },
  {
    id: 8,
    slug: "walk-in-wardrobe",
    title: "Walk-in Wardrobe",
    location: "Gurgaon, Haryana",
    roomType: "Wardrobes",
    style: "Modern",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=800&q=85",
    year: "2024",
    duration: "2 weeks",
    sqft: "100 sq.ft",
    description: "Custom walk-in wardrobe with island storage and LED lighting system. Thoughtful organization solutions and premium finishes transform this space into a personal boutique experience.",
    services: ["Wardrobe Design", "Custom Storage", "Lighting"],
  },
  {
    id: 9,
    slug: "contemporary-living",
    title: "Contemporary Living",
    location: "Kolkata, West Bengal",
    roomType: "Living Spaces",
    style: "Modern",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85",
    year: "2023",
    duration: "5 weeks",
    sqft: "400 sq.ft",
    description: "Open-plan living with minimalist furniture and statement art pieces. The design philosophy embraces negative space and carefully curated elements to create a gallery-like living experience.",
    services: ["Interior Design", "Art Curation", "Furniture"],
  },
  {
    id: 10,
    slug: "luxury-french-kitchen",
    title: "Luxury French Kitchen",
    location: "Jaipur, Rajasthan",
    roomType: "Kitchens",
    style: "French",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85",
    year: "2023",
    duration: "8 weeks",
    sqft: "350 sq.ft",
    description: "Elegant kitchen with marble counters and classic French cabinetry. Every detail, from the intricate door profiles to the carefully selected hardware, speaks to timeless European elegance.",
    services: ["Kitchen Design", "Marble Work", "Custom Cabinets"],
  },
  {
    id: 11,
    slug: "executive-office",
    title: "Executive Office",
    location: "Noida, UP",
    roomType: "Offices",
    style: "Luxury",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85",
    year: "2023",
    duration: "3 weeks",
    sqft: "250 sq.ft",
    description: "Premium executive office with leather furnishings and wood paneling. Commanding yet refined, this workspace conveys success while providing an environment conducive to focused decision-making.",
    services: ["Office Design", "Custom Furniture", "Wall Paneling"],
  },
  {
    id: 12,
    slug: "smart-bedroom",
    title: "Smart Bedroom",
    location: "Ahmedabad, Gujarat",
    roomType: "Bedrooms",
    style: "Smart",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=85",
    year: "2023",
    duration: "4 weeks",
    sqft: "300 sq.ft",
    description: "Automated bedroom with smart controls for lighting, blinds, and climate. Cutting-edge home automation seamlessly integrates with serene design aesthetics for the ultimate in modern comfort.",
    services: ["Smart Home Integration", "Bedroom Design", "Automation"],
  },
];

// Helper to get featured projects
export function getFeaturedProjects(count: number = 6): Project[] {
  return projects.filter(p => p.featured).slice(0, count);
}

// Helper to get project by slug
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

// Helper to get related projects (same room type or style, excluding current)
export function getRelatedProjects(currentSlug: string, count: number = 3): Project[] {
  const current = getProjectBySlug(currentSlug);
  if (!current) return [];

  return projects
    .filter(p => p.slug !== currentSlug && (p.roomType === current.roomType || p.style === current.style))
    .slice(0, count);
}
