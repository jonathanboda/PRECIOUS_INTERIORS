import { HeroClient } from "./hero-client";

interface HeroContent {
  label?: string;
  headline1?: string;
  headline2?: string;
  headline3?: string;
  subheading?: string;
  ctaPrimary?: { text: string };
  ctaSecondary?: { text: string; href: string };
  videoUrl?: string;
}

interface HeroProps {
  content?: HeroContent | null;
}

export function Hero({ content }: HeroProps) {
  return (
    <HeroClient
      label={content?.label}
      headline1={content?.headline1}
      headline2={content?.headline2}
      headline3={content?.headline3}
      subheading={content?.subheading}
      ctaPrimary={content?.ctaPrimary}
      ctaSecondary={content?.ctaSecondary}
      videoUrl={content?.videoUrl}
    />
  );
}

export default Hero;
