import { Metadata } from "next";
import { ProjectsHero } from "@/components/sections/projects-hero";
import { ProjectsGallery } from "@/components/sections/projects-gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Marquee } from "@/components/animations/marquee";
import { getProjects } from "@/lib/queries/projects";
import { getTestimonials } from "@/lib/queries/testimonials";

// Disable caching to always show fresh data from database
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ProjectData {
  id: string;
  slug: string;
  title: string;
  location: string;
  room_type: string;
  style: string;
  image_url: string;
  year: string;
  duration: string;
  sqft: string;
  featured: boolean;
}

interface TestimonialData {
  id: string;
  quote: string;
  client_name: string;
  client_title: string;
  project_type: string;
  image_url: string;
  project_image_url: string | null;
  rating: number;
}

export const metadata: Metadata = {
  title: "Projects | The Precious Interiors",
  description:
    "Browse our featured interior design projects showcasing residential, commercial, and hospitality spaces transformed with timeless elegance.",
  openGraph: {
    title: "Projects | The Precious Interiors",
    description:
      "Browse our featured interior design projects and transformations.",
  },
};

export default async function ProjectsPage() {
  const projectsData = await getProjects() as ProjectData[];
  const testimonialsData = await getTestimonials() as TestimonialData[];

  // Map database fields to component expected fields
  const projects = projectsData.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    roomType: p.room_type,
    style: p.style,
    image: p.image_url,
    year: p.year,
    duration: p.duration,
    sqft: String(p.sqft),
    featured: p.featured,
  }));

  return (
    <>
      <ProjectsHero />
      <ProjectsGallery projects={projects} />
      <Marquee variant="light" speed="slow" />
      <Testimonials testimonials={testimonialsData} />
    </>
  );
}
