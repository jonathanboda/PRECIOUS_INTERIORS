import { PageHero } from "@/components/sections/page-hero";
import { VideoSection } from "@/components/sections/video-section";
import { getVideosByCategory } from "@/lib/queries/videos";
import { GalleryCTA } from "./gallery-cta";

// Disable caching to always show fresh data from database
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Gallery | Precious Interiors",
  description: "Explore our video gallery showcasing workplace culture, renovation projects, and client testimonials.",
};

export default async function GalleryPage() {
  const [workplaceVideos, renovationVideos, testimonialVideos] = await Promise.all([
    getVideosByCategory("workplace"),
    getVideosByCategory("renovations"),
    getVideosByCategory("testimonials"),
  ]);

  // Map database videos to component format
  const mapVideos = (videos: Awaited<ReturnType<typeof getVideosByCategory>>) =>
    videos.map((video, index) => ({
      id: index + 1, // Use numeric index as id
      title: video.title,
      thumbnail: video.thumbnail_url,
      category: video.category as "workplace" | "renovations" | "testimonials",
      platform: video.platform as "youtube" | "instagram",
      url: video.url,
      duration: video.duration || undefined,
    }));

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
        videos={mapVideos(workplaceVideos)}
        className="bg-[#FAF9F6]"
      />

      {/* Renovation Videos */}
      <VideoSection
        label="Project Transformations"
        title="Renovation Stories"
        videos={mapVideos(renovationVideos)}
        className="bg-white"
      />

      {/* Testimonial Videos */}
      <VideoSection
        label="Client Stories"
        title="What Our Clients Say"
        videos={mapVideos(testimonialVideos)}
        className="bg-[#FAF9F6]"
      />

      {/* CTA Section */}
      <GalleryCTA />
    </>
  );
}
