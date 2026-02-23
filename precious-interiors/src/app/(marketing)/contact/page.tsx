import { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Contact Us | The Precious Interiors",
  description:
    "Get in touch with our design team. Start your interior design journey with a free consultation. We're here to bring your vision to life.",
  openGraph: {
    title: "Contact Us | The Precious Interiors",
    description:
      "Get in touch with our design team and start your interior design journey.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Let's Create Together"
        backgroundImage="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1920&q=85"
      />
      <ContactSection />
    </>
  );
}
