import { notFound } from "next/navigation";
import { getProjectBySlug, getRelatedProjects } from "@/lib/queries/projects";
import { ProjectDetailClient } from "./project-detail-client";

// Disable caching to always show fresh data from database
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

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
  description: string;
  services: string[];
  featured: boolean;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug) as ProjectData | null;

  if (!project) {
    return {
      title: "Project Not Found | The Precious Interiors",
    };
  }

  return {
    title: `${project.title} | The Precious Interiors`,
    description: project.description,
    openGraph: {
      title: `${project.title} | The Precious Interiors`,
      description: project.description,
      images: [project.image_url],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projectData = await getProjectBySlug(slug) as ProjectData | null;

  if (!projectData) {
    return notFound();
  }

  // Now TypeScript knows projectData is not null
  const project = projectData;

  const relatedProjectsData = await getRelatedProjects(
    slug,
    project.room_type,
    project.style,
    3
  ) as ProjectData[];

  // Map project fields
  const mappedProject = {
    id: project.id,
    slug: project.slug,
    title: project.title,
    location: project.location,
    roomType: project.room_type,
    style: project.style,
    image: project.image_url,
    year: project.year,
    duration: project.duration,
    sqft: String(project.sqft),
    description: project.description,
    services: project.services || [],
    featured: project.featured,
  };

  // Map related projects
  const relatedProjects = relatedProjectsData.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    image: p.image_url,
  }));

  return (
    <ProjectDetailClient
      project={mappedProject}
      relatedProjects={relatedProjects}
    />
  );
}
