import { AboutSectionClient } from "./about-client";

interface AboutContent {
  label?: string;
  headline?: { part1: string; highlight: string };
  description?: string[];
  experienceBadge?: string;
  images?: { primary: string; secondary?: string };
  values?: { title: string; description: string }[];
  stats?: { value: number; suffix: string; label: string }[];
  ctaButton?: { text: string; href: string };
}

interface AboutSectionProps {
  content?: AboutContent | null;
}

export function AboutSection({ content }: AboutSectionProps) {
  return (
    <AboutSectionClient
      label={content?.label}
      headline={content?.headline}
      description={content?.description}
      experienceBadge={content?.experienceBadge}
      images={content?.images}
      values={content?.values}
      stats={content?.stats}
      ctaButton={content?.ctaButton}
    />
  );
}

export default AboutSection;
