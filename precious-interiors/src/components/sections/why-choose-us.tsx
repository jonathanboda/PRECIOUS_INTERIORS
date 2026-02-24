"use client";

import { WhyChooseUsClient } from "./why-choose-us-client";

interface WhyChooseUsContent {
  label?: string;
  headline?: string;
  features?: { title: string; description: string; image: string }[];
}

interface WhyChooseUsProps {
  content?: WhyChooseUsContent | null;
}

export function WhyChooseUs({ content }: WhyChooseUsProps) {
  return (
    <WhyChooseUsClient
      label={content?.label}
      headline={content?.headline}
      features={content?.features}
    />
  );
}

export default WhyChooseUs;
