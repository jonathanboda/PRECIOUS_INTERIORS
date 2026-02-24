import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/animations/marquee";

// Disable caching to always show fresh data from database
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { AboutSection } from "@/components/sections/about";
import { ServicesSection } from "@/components/sections/services";
import { ServiceHighlights } from "@/components/sections/service-highlights";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { ProcessSection } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactSection } from "@/components/sections/contact-section";
import { LazySection } from "@/components/ui/lazy-section";
import { getFeaturedProjects } from "@/lib/queries/projects";
import { getServices } from "@/lib/queries/services";
import { getTestimonials } from "@/lib/queries/testimonials";
import { getProcessSteps } from "@/lib/queries/process";
import { getHomepageVideos } from "@/lib/queries/videos";
import { getServiceHighlights, getAboutContent, getHeroContent, getWhyChooseUsContent, getContactInfo } from "@/lib/queries/site-content";
import { HomepageVideos } from "@/components/sections/homepage-videos";

export const metadata: Metadata = {
  title: "The Precious Interiors | Crafting Timeless Luxury",
  description:
    "Transform your space with The Precious Interiors. We specialize in creating elegant, functional, and timeless interior designs that reflect your unique story and elevate everyday living.",
};

export default async function HomePage() {
  const [projects, services, testimonials, highlightsData, aboutContent, heroContent, whyChooseUsContent, processSteps, contactInfoData, homepageVideos] = await Promise.all([
    getFeaturedProjects(6),
    getServices(),
    getTestimonials(),
    getServiceHighlights(),
    getAboutContent(),
    getHeroContent(),
    getWhyChooseUsContent(),
    getProcessSteps(),
    getContactInfo(),
    getHomepageVideos(),
  ]);

  return (
    <>
      {/* Above the fold - Load immediately */}
      <Hero content={heroContent} />
      <Marquee variant="light" speed="slow" />

      {/* Below the fold - Lazy load */}
      <LazySection minHeight="600px">
        <AboutSection content={aboutContent} />
      </LazySection>

      <LazySection minHeight="500px">
        <WhyChooseUs content={whyChooseUsContent} />
      </LazySection>

      <LazySection minHeight="600px">
        <ProcessSection steps={processSteps} />
      </LazySection>

      <LazySection minHeight="500px">
        <ServicesSection services={services} />
      </LazySection>

      <LazySection minHeight="400px">
        <ServiceHighlights highlights={highlightsData?.highlights} />
      </LazySection>

      <LazySection minHeight="600px">
        <FeaturedProjects projects={projects} />
      </LazySection>

      {homepageVideos.length > 0 && (
        <LazySection minHeight="500px">
          <HomepageVideos videos={homepageVideos} />
        </LazySection>
      )}

      <LazySection minHeight="500px">
        <Testimonials testimonials={testimonials} />
      </LazySection>

      <LazySection minHeight="600px">
        <ContactSection contactInfo={contactInfoData} />
      </LazySection>
    </>
  );
}
