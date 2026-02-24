"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Phone, Mail, Clock, Check } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";
import { gsap } from "@/lib/gsap-config";
import { useGSAP } from "@gsap/react";

interface ContactSectionProps {
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
    whatsappNumber?: string;
    businessHours?: { day: string; hours: string }[];
  } | null;
}

const defaultContactInfo = {
  phone: "+91 90100 91191",
  email: "manikanta@thepreciousinteriors.com",
  businessHours: [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "By Appointment" },
  ],
};

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

export function ContactSection({ contactInfo: propsContactInfo }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    mobile: "",
    serviceType: "",
    spaceSize: "",
    budgetRange: "",
    pincode: "",
    confirmDetails: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Use props or defaults
  const phone = propsContactInfo?.phone || defaultContactInfo.phone;
  const email = propsContactInfo?.email || defaultContactInfo.email;
  const businessHours = propsContactInfo?.businessHours && propsContactInfo.businessHours.length > 0
    ? propsContactInfo.businessHours
    : defaultContactInfo.businessHours;

  const contactInfoItems = [
    {
      icon: Phone,
      title: "Call Us",
      content: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      title: "Email Us",
      content: email,
      href: `mailto:${email}`,
    },
  ];

  // Form container slide-in animation
  useGSAP(() => {
    if (!formRef.current) return;

    gsap.fromTo(
      formRef.current,
      {
        opacity: 0,
        x: 80,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: sectionRef });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.confirmDetails) {
      return;
    }

    setIsSubmitting(true);

    const serviceLabel = serviceOptions.find(o => o.value === formData.serviceType)?.label || formData.serviceType;
    const budgetLabel = budgetOptions.find(o => o.value === formData.budgetRange)?.label || formData.budgetRange;

    const whatsappMessage = `*Request a Quote - Precious Interiors*

*Mobile:* ${formData.mobile}
*Service Type:* ${serviceLabel}
*Space Size:* ${formData.spaceSize} sq.ft
*Budget Range:* ${budgetLabel}
*Pincode:* ${formData.pincode}`;

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      openWhatsApp(whatsappMessage);
      setIsSuccess(false);
      setFormData({
        mobile: "",
        serviceType: "",
        spaceSize: "",
        budgetRange: "",
        pincode: "",
        confirmDetails: false,
      });
    }, 1500);
  };

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

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 md:py-36 lg:py-44 bg-neutral-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary-600/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="w-12 h-[2px] bg-gold-500" />
              <span className="text-gold-500 text-sm font-semibold tracking-[0.25em] uppercase">
                Get In Touch
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-semibold text-white leading-[1.1] mb-6"
            >
              Request a
              <br />
              <span className="text-gold-400">Quote</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-400 text-lg leading-relaxed mb-12"
            >
              Get your free estimate from Precious Interiors. We&apos;d
              love to hear about your vision and discuss how we can bring it to life.
            </motion.p>

            {/* Contact Info Cards */}
            <div className="space-y-4 mb-10">
              {contactInfoItems.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.title}
                    href={info.href}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-5 p-5 bg-neutral-800/50 hover:bg-primary-600 border border-neutral-700 hover:border-primary-600 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-gold-500 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors duration-300">
                      <Icon className="w-6 h-6 text-neutral-900" strokeWidth={2} />
                    </div>
                    <div>
                      <span className="text-neutral-500 group-hover:text-white/70 text-xs font-semibold tracking-[0.15em] uppercase mb-1 block transition-colors">
                        {info.title}
                      </span>
                      <span className="text-white font-medium group-hover:text-gold-400 transition-colors duration-300">
                        {info.content}
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 bg-primary-600"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-gold-400" />
                <h4 className="text-lg font-cinzel font-semibold text-white">
                  Business Hours
                </h4>
              </div>
              <div className="space-y-2 text-sm">
                {businessHours.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-white/70">{item.day}</span>
                    <span className="text-white font-medium">{item.hours}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form with Slide-in Animation */}
          <div ref={formRef}>
            <div className="bg-white p-8 md:p-10 lg:p-12 shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-cinzel font-semibold text-neutral-900 mb-2">
                Get Free Estimate
              </h3>
              <p className="text-neutral-500 mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Mobile */}
                <div>
                  <label
                    htmlFor="contact-mobile"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Mobile
                  </label>
                  <input
                    type="tel"
                    id="contact-mobile"
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
                    htmlFor="contact-serviceType"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    I want to
                  </label>
                  <select
                    id="contact-serviceType"
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
                    htmlFor="contact-spaceSize"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Space Size (sq.ft)
                  </label>
                  <input
                    type="text"
                    id="contact-spaceSize"
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
                    htmlFor="contact-budgetRange"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Budget Range
                  </label>
                  <select
                    id="contact-budgetRange"
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

                {/* Pincode */}
                <div>
                  <label
                    htmlFor="contact-pincode"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="contact-pincode"
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
                      id="contact-confirmDetails"
                      name="confirmDetails"
                      checked={formData.confirmDetails}
                      onChange={handleChange}
                      required
                      className="peer sr-only"
                    />
                    <div
                      className={cn(
                        "w-5 h-5 border-2 border-neutral-300 rounded",
                        formData.confirmDetails && "bg-primary-500 border-primary-500",
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
                    htmlFor="contact-confirmDetails"
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
                  disabled={isSubmitting || isSuccess || !formData.confirmDetails}
                  className={cn(
                    "w-full py-4 mt-4",
                    isSuccess ? "bg-green-500" : "bg-[#F5A623]",
                    "text-white",
                    "font-semibold text-sm tracking-wide uppercase",
                    "hover:bg-[#E09515] transition-colors duration-200",
                    "disabled:cursor-not-allowed",
                    !formData.confirmDetails && !isSubmitting && !isSuccess && "opacity-70",
                    "rounded-md"
                  )}
                >
                  {isSuccess ? (
                    <span className="flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Sent Successfully!
                    </span>
                  ) : isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "GET FREE ESTIMATE"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
