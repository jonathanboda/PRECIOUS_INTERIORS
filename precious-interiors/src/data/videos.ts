export type VideoCategory = "workplace" | "renovations" | "testimonials";
export type VideoPlatform = "youtube" | "instagram";

export interface Video {
  id: number;
  title: string;
  thumbnail: string;
  category: VideoCategory;
  platform: VideoPlatform;
  url: string;
  duration?: string;
}

export const videos: Video[] = [
  // Workplace Videos
  {
    id: 1,
    title: "A Day at Precious Interiors",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85",
    category: "workplace",
    platform: "youtube",
    url: "https://youtube.com/watch?v=example1",
    duration: "3:45",
  },
  {
    id: 2,
    title: "Meet Our Design Team",
    thumbnail: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=85",
    category: "workplace",
    platform: "instagram",
    url: "https://instagram.com/reel/example1",
    duration: "1:00",
  },
  {
    id: 3,
    title: "Behind the Scenes: Material Selection",
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85",
    category: "workplace",
    platform: "youtube",
    url: "https://youtube.com/watch?v=example2",
    duration: "5:20",
  },

  // Renovation Videos
  {
    id: 4,
    title: "Living Room Transformation",
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=85",
    category: "renovations",
    platform: "youtube",
    url: "https://youtube.com/watch?v=example3",
    duration: "8:15",
  },
  {
    id: 5,
    title: "Kitchen Makeover Timelapse",
    thumbnail: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85",
    category: "renovations",
    platform: "instagram",
    url: "https://instagram.com/reel/example2",
    duration: "0:45",
  },
  {
    id: 6,
    title: "Bedroom Redesign Journey",
    thumbnail: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&q=85",
    category: "renovations",
    platform: "youtube",
    url: "https://youtube.com/watch?v=example4",
    duration: "6:30",
  },
  {
    id: 7,
    title: "Office Space Renovation",
    thumbnail: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=85",
    category: "renovations",
    platform: "instagram",
    url: "https://instagram.com/reel/example3",
    duration: "1:15",
  },

  // Testimonial Videos
  {
    id: 8,
    title: "The Sharma Family Experience",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85",
    category: "testimonials",
    platform: "youtube",
    url: "https://youtube.com/watch?v=example5",
    duration: "4:00",
  },
  {
    id: 9,
    title: "Client Review: Modern Villa Project",
    thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=85",
    category: "testimonials",
    platform: "instagram",
    url: "https://instagram.com/reel/example4",
    duration: "0:55",
  },
  {
    id: 10,
    title: "Why We Chose Precious Interiors",
    thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=85",
    category: "testimonials",
    platform: "youtube",
    url: "https://youtube.com/watch?v=example6",
    duration: "3:20",
  },
];

// Helper functions
export function getVideosByCategory(category: VideoCategory): Video[] {
  return videos.filter((video) => video.category === category);
}

export function getWorkplaceVideos(): Video[] {
  return getVideosByCategory("workplace");
}

export function getRenovationVideos(): Video[] {
  return getVideosByCategory("renovations");
}

export function getTestimonialVideos(): Video[] {
  return getVideosByCategory("testimonials");
}
