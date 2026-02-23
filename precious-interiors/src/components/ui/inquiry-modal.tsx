"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInquiryModal } from "@/context/inquiry-modal-context";
import { openWhatsApp } from "@/lib/whatsapp";

interface FormData {
  name: string;
  phone: string;
  message: string;
}

export function InquiryModal() {
  const { isOpen, closeModal } = useInquiryModal();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeModal]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappMessage = `*New Inquiry from Website*

*Name:* ${formData.name}
*Phone:* ${formData.phone}

*Message:*
${formData.message}`;

    // Small delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));

    openWhatsApp(whatsappMessage);

    // Reset form and close modal
    setFormData({ name: "", phone: "", message: "" });
    setIsSubmitting(false);
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "relative z-10 w-[90%] max-w-md",
              "bg-cream shadow-2xl",
              "p-8 md:p-10"
            )}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className={cn(
                "absolute top-4 right-4",
                "p-2 text-neutral-500 hover:text-neutral-900",
                "transition-colors duration-200"
              )}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="font-heading text-2xl md:text-3xl text-neutral-900 mb-2">
                Get in Touch
              </h2>
              <p className="text-neutral-600 text-sm">
                Fill out the form and we&apos;ll get back to you shortly.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className={cn(
                    "w-full px-4 py-3",
                    "bg-white border border-neutral-200",
                    "text-neutral-900 placeholder:text-neutral-400",
                    "focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500",
                    "transition-colors duration-200"
                  )}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98765 43210"
                  className={cn(
                    "w-full px-4 py-3",
                    "bg-white border border-neutral-200",
                    "text-neutral-900 placeholder:text-neutral-400",
                    "focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500",
                    "transition-colors duration-200"
                  )}
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  className={cn(
                    "w-full px-4 py-3 resize-none",
                    "bg-white border border-neutral-200",
                    "text-neutral-900 placeholder:text-neutral-400",
                    "focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500",
                    "transition-colors duration-200"
                  )}
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-4 mt-2",
                  "bg-gold-500 text-primary-900",
                  "font-medium text-sm tracking-[0.1em] uppercase",
                  "hover:bg-gold-600 transition-colors duration-200",
                  "disabled:opacity-70 disabled:cursor-not-allowed"
                )}
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default InquiryModal;
