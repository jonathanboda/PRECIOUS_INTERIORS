import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/animations/marquee";
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { ServiceHighlights } from "@/components/sections/service-highlights";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ProcessSection } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactSection } from "@/components/sections/contact-section";
import { getFeaturedProjects } from "@/lib/queries/projects";
import { getServices } from "@/lib/queries/services";
import { getTestimonials } from "@/lib/queries/testimonials";
import { getServiceHighlights, getAboutContent } from "@/lib/queries/site-content";

export const metadata: Metadata = {
  title: "The Precious Interiors | Crafting Timeless Luxury",
  description:
    "Transform your space with The Precious Interiors. We specialize in creating elegant, functional, and timeless interior designs that reflect your unique story and elevate everyday living.",
};

export default async function HomePage() {
  const [projects, services, testimonials, highlightsData, aboutContent] = await Promise.all([
    getFeaturedProjects(6),
    getServices(),
    getTestimonials(),
    getServiceHighlights(),
    getAboutContent(),
  ]);

  return (
    <>
      <Hero />
      <Marquee variant="light" speed="slow" />
      <AboutSection content={aboutContent} />
      <WhyChooseUs />
      <ProcessSection />
      <ServicesSection services={services} />
      <ServiceHighlights highlights={highlightsData?.highlights} />
      <FeaturedProjects projects={projects} />
      <Testimonials testimonials={testimonials} />
      <ContactSection />
    </>
  );
}
