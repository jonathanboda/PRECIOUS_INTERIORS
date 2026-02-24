import { getServices } from "@/lib/queries/services";
import ServicesPageClient from "./services-page-client";

// Disable caching to always show fresh data from database
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Services | Precious Interiors",
  description: "Explore our premium interior design services including residential design, custom furniture, renovation, and 3D visualization.",
};

export default async function ServicesPage() {
  const servicesData = await getServices();

  // Map database fields to component format
  const services = servicesData.map((service) => ({
    id: service.id,
    number: service.number,
    icon: service.icon,
    title: service.title,
    description: service.description,
    image: service.image_url,
    subServices: service.sub_services,
  }));

  return <ServicesPageClient services={services} />;
}
