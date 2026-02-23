import { Metadata } from "next";
import { ProjectsHero } from "@/components/sections/projects-hero";
import { ProjectsGallery } from "@/components/sections/projects-gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { Marquee } from "@/components/animations/marquee";
import { getProjects } from "@/lib/queries/projects";

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
  const projectsData = await getProjects();

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
    sqft: p.sqft,
    featured: p.featured,
  }));

  return (
    <>
      <ProjectsHero />
      <ProjectsGallery projects={projects} />
      <Marquee variant="light" speed="slow" />
      <Testimonials />
    </>
  );
}
