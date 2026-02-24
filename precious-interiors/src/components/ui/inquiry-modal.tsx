"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInquiryModal } from "@/context/inquiry-modal-context";
import { openWhatsApp } from "@/lib/whatsapp";

interface FormData {
  name: string;
  mobile: string;
  serviceType: string;
  spaceSize: string;
  budgetRange: string;
  address: string;
  pincode: string;
  confirmDetails: boolean;
}

const serviceOptions = [
  { value: "", label: "Select service type" },
  { value: "full-home-interior", label: "Full Home Interior" },
  { value: "modular-kitchen", label: "Modular Kitchen" },
  { value: "wardrobe", label: "Wardrobe" },
  { value: "living-room", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "bathroom", label: "Bathroom" },
  { value: "office-interior", label: "Office Interior" },
  { value: "other", label: "Other" },
];

const budgetOptions = [
  { value: "", label: "Select budget range" },
  { value: "under-5-lakh", label: "Under 5 Lakh" },
  { value: "5-10-lakh", label: "5 - 10 Lakh" },
  { value: "10-15-lakh", label: "10 - 15 Lakh" },
  { value: "15-25-lakh", label: "15 - 25 Lakh" },
  { value: "25-50-lakh", label: "25 - 50 Lakh" },
  { value: "above-50-lakh", label: "Above 50 Lakh" },
];

export function InquiryModal() {
  const { isOpen, closeModal } = useInquiryModal();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    serviceType: "",
    spaceSize: "",
    budgetRange: "",
    address: "",
    pincode: "",
    confirmDetails: false,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.confirmDetails) {
      return;
    }

    setIsSubmitting(true);

    const serviceLabel = serviceOptions.find(o => o.value === formData.serviceType)?.label || formData.serviceType;
    const budgetLabel = budgetOptions.find(o => o.value === formData.budgetRange)?.label || formData.budgetRange;

    const whatsappMessage = `*Request a Quote - Precious Interiors*

*Name:* ${formData.name}
*Mobile:* ${formData.mobile}
*Service Type:* ${serviceLabel}
*Space Size:* ${formData.spaceSize} sq.ft
*Budget Range:* ${budgetLabel}
*Address:* ${formData.address}
*Pincode:* ${formData.pincode}`;

    // Small delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));

    openWhatsApp(whatsappMessage);

    // Reset form and close modal
    setFormData({
      name: "",
      mobile: "",
      serviceType: "",
      spaceSize: "",
      budgetRange: "",
      address: "",
      pincode: "",
      confirmDetails: false,
    });
    setIsSubmitting(false);
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
              "relative z-10 w-full max-w-4xl",
              "bg-white shadow-2xl overflow-hidden",
              "flex flex-col lg:flex-row"
            )}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className={cn(
                "absolute top-4 right-4 z-20",
                "p-2 text-neutral-500 hover:text-neutral-900 lg:text-white lg:hover:text-white/80",
                "transition-colors duration-200"
              )}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Section - Image with Overlay */}
            <div className="relative lg:w-2/5 h-48 lg:h-auto min-h-[200px] bg-neutral-900">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop')",
                }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-neutral-900/70" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 lg:p-10">
                <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-2">
                  Request a Quote
                </h2>
                <p className="text-white/80 text-sm lg:text-base">
                  Get your free estimate from Precious Interiors
                </p>
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="lg:w-3/5 p-6 lg:p-8 max-h-[70vh] lg:max-h-[80vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className={cn(
                      "w-full px-4 py-3",
                      "bg-white border border-neutral-300 rounded-md",
                      "text-neutral-900 placeholder:text-neutral-400",
                      "focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
                      "transition-colors duration-200"
                    )}
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Mobile
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="Enter your mobile number"
                    className={cn(
                      "w-full px-4 py-3",
                      "bg-white border border-neutral-300 rounded-md",
                      "text-neutral-900 placeholder:text-neutral-400",
                      "focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
                      "transition-colors duration-200"
                    )}
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label
                    htmlFor="serviceType"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    I want to
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                    className={cn(
                      "w-full px-4 py-3",
                      "bg-white border border-neutral-300 rounded-md",
                      "text-neutral-900",
                      "focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
                      "transition-colors duration-200",
                      "appearance-none cursor-pointer",
                      "bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]",
                      "bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
                    )}
                  >
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Space Size */}
                <div>
                  <label
                    htmlFor="spaceSize"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Space Size (sq.ft)
                  </label>
                  <input
                    type="text"
                    id="spaceSize"
                    name="spaceSize"
                    value={formData.spaceSize}
                    onChange={handleChange}
                    required
                    placeholder="Enter space size in sq.ft"
                    className={cn(
                      "w-full px-4 py-3",
                      "bg-white border border-neutral-300 rounded-md",
                      "text-neutral-900 placeholder:text-neutral-400",
                      "focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
                      "transition-colors duration-200"
                    )}
                  />
                </div>

                {/* Budget Range */}
                <div>
                  <label
                    htmlFor="budgetRange"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Budget Range
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    required
                    className={cn(
                      "w-full px-4 py-3",
                      "bg-white border border-neutral-300 rounded-md",
                      "text-neutral-900",
                      "focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
                      "transition-colors duration-200",
                      "appearance-none cursor-pointer",
                      "bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')]",
                      "bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat"
                    )}
                  >
                    {budgetOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Enter your address"
                    className={cn(
                      "w-full px-4 py-3",
                      "bg-white border border-neutral-300 rounded-md",
                      "text-neutral-900 placeholder:text-neutral-400",
                      "focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
                      "transition-colors duration-200"
                    )}
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    placeholder="Enter your pincode"
                    className={cn(
                      "w-full px-4 py-3",
                      "bg-white border border-neutral-300 rounded-md",
                      "text-neutral-900 placeholder:text-neutral-400",
                      "focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500",
                      "transition-colors duration-200"
                    )}
                  />
                </div>

                {/* Confirm Details Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="confirmDetails"
                      name="confirmDetails"
                      checked={formData.confirmDetails}
                      onChange={handleChange}
                      required
                      className="peer sr-only"
                    />
                    <div
                      className={cn(
                        "w-5 h-5 border-2 border-neutral-300 rounded",
                        "peer-checked:bg-primary-500 peer-checked:border-primary-500",
                        "peer-focus:ring-2 peer-focus:ring-primary-500/20",
                        "transition-colors duration-200 cursor-pointer",
                        "flex items-center justify-center"
                      )}
                      onClick={() => setFormData(prev => ({ ...prev, confirmDetails: !prev.confirmDetails }))}
                    >
                      {formData.confirmDetails && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                  </div>
                  <label
                    htmlFor="confirmDetails"
                    className="text-sm text-neutral-600 cursor-pointer select-none"
                    onClick={() => setFormData(prev => ({ ...prev, confirmDetails: !prev.confirmDetails }))}
                  >
                    <span className="font-medium text-neutral-800">Confirm your details</span>
                    <br />
                    <span className="text-neutral-500">Yes, every detail are correct</span>
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.confirmDetails}
                  className={cn(
                    "w-full py-4 mt-4",
                    "bg-[#F5A623] text-white",
                    "font-semibold text-sm tracking-wide uppercase",
                    "hover:bg-[#E09515] transition-colors duration-200",
                    "disabled:opacity-70 disabled:cursor-not-allowed",
                    "rounded-md"
                  )}
                >
                  {isSubmitting ? "Sending..." : "GET FREE ESTIMATE"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default InquiryModal;
