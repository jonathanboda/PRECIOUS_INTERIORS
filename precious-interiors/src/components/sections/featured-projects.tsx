import { FeaturedProjectsClient } from "./featured-projects-client";

interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  room_type: string;
  style: string;
  image_url: string;
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Map database fields to component expected fields
  const mappedProjects = projects.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    roomType: p.room_type,
    style: p.style,
    image: p.image_url,
  }));

  return <FeaturedProjectsClient projects={mappedProjects} />;
}

export default FeaturedProjects;
