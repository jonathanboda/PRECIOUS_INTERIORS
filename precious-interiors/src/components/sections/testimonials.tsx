import { TestimonialsClient } from "./testimonials-client";

interface Testimonial {
  id: string;
  quote: string;
  client_name: string;
  client_title: string;
  project_type: string;
  image_url: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials: testimonialsData }: TestimonialsProps) {
  // Map database fields to component expected fields
  const testimonials = testimonialsData.map((t) => ({
    id: t.id,
    quote: t.quote,
    clientName: t.client_name,
    clientTitle: t.client_title,
    projectType: t.project_type,
    image: t.image_url,
    rating: t.rating,
  }));

  return <TestimonialsClient testimonials={testimonials} />;
}

export default Testimonials;
