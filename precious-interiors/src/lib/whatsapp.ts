// WhatsApp Integration Utility
// To change the WhatsApp number, simply update the value below

const WHATSAPP_NUMBER = "919010091191"; // The Precious Interiors WhatsApp

/**
 * Opens WhatsApp with a pre-filled message
 * @param message - The message to pre-fill in WhatsApp
 */
export function openWhatsApp(message: string): void {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, "_blank");
}

/**
 * Returns a WhatsApp URL with a pre-filled message
 * @param message - The message to pre-fill in WhatsApp
 * @returns The WhatsApp URL
 */
export function getWhatsAppUrl(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

// Pre-defined messages for different CTAs
export const WHATSAPP_MESSAGES = {
  getQuote: "Hi! I'd like to get a quote for my interior design project.",
  startProject: "Hi! I'm interested in starting an interior design project with The Precious Interiors.",
  scheduleConsultation: "Hi! I'd like to schedule a consultation to discuss my project.",
  bookConsultation: "Hi! I'd like to book a free consultation for interior design services.",
  getInTouch: "Hi! I'd like to discuss an interior design project with you.",
  projectsInquiry: "Hi! I saw your projects and want to start my own interior design project.",
  galleryInquiry: "Hi! I saw your gallery and would like to discuss a project.",
  servicesInquiry: "Hi! I'm interested in your interior design services.",
  similarProject: "Hi! I'm interested in a similar project to what I saw on your website.",
} as const;
