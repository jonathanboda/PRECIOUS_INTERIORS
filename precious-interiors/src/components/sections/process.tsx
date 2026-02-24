import { ProcessSectionClient } from "./process-client";

interface ProcessStep {
  id?: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  cumulative_payment?: number;
  cumulativePayment?: number;
  payment_note?: string;
  paymentNote?: string;
  deliverables: string[];
  image?: string;
  image_url?: string;
  image_alt?: string;
  imageAlt?: string;
  display_order?: number;
}

interface ProcessSectionProps {
  steps?: ProcessStep[] | null;
}

export function ProcessSection({ steps }: ProcessSectionProps) {
  // Map database fields to client component expected format
  const mappedSteps = steps?.map((step, index) => ({
    number: step.number || `0${index + 1}`,
    title: step.title,
    subtitle: step.subtitle,
    description: step.description,
    duration: step.duration,
    cumulativePayment: step.cumulative_payment || step.cumulativePayment || 0,
    paymentNote: step.payment_note || step.paymentNote || "",
    deliverables: step.deliverables || [],
    image: step.image_url || step.image || "",
    imageAlt: step.image_alt || step.imageAlt || step.title,
  }));

  return <ProcessSectionClient steps={mappedSteps} />;
}

export default ProcessSection;
