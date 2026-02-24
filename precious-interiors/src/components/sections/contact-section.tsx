"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Phone, Mail, ArrowRight, Clock, Check } from "lucide-react";
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

// CSS-only floating gold sphere decoration
function FloatingGoldSphere() {
  return (
    <div className="relative w-full h-full">
      {/* Main sphere with gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 animate-[gentle-float_6s_ease-in-out_infinite] shadow-[0_0_40px_rgba(201,162,39,0.4)]" />
      {/* Highlight */}
      <div className="absolute top-2 left-2 w-1/3 h-1/3 rounded-full bg-white/30 blur-sm" />
    </div>
  );
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

// Form Input with Gold Underline Animation
function AnimatedInput({
  type,
  id,
  name,
  required,
  value,
  onChange,
  placeholder,
  label,
  index,
}: {
  type: string;
  id: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  index: number;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Staggered entrance animation
  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: 0.2 + index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index]);

  const handleFocus = () => {
    if (underlineRef.current) {
      gsap.to(underlineRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleBlur = () => {
    if (underlineRef.current && !value) {
      gsap.to(underlineRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <div ref={containerRef}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold tracking-[0.1em] uppercase text-neutral-700 mb-2"
      >
        {label} {required && "*"}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type={type}
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            "w-full px-4 py-3 bg-neutral-50 text-neutral-900",
            "border-2 border-neutral-200",
            "focus:outline-none focus:border-neutral-300",
            "transition-colors duration-300",
            "placeholder:text-neutral-400"
          )}
        />
        {/* Gold underline animation */}
        <div
          ref={underlineRef}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-400 to-gold-600 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

// Animated Textarea with Gold Underline
function AnimatedTextarea({
  id,
  name,
  required,
  rows,
  value,
  onChange,
  placeholder,
  label,
  index,
}: {
  id: string;
  name: string;
  required?: boolean;
  rows: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  label: string;
  index: number;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: 0.2 + index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index]);

  const handleFocus = () => {
    if (underlineRef.current) {
      gsap.to(underlineRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleBlur = () => {
    if (underlineRef.current && !value) {
      gsap.to(underlineRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <div ref={containerRef}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold tracking-[0.1em] uppercase text-neutral-700 mb-2"
      >
        {label} {required && "*"}
      </label>
      <div className="relative">
        <textarea
          ref={textareaRef}
          id={id}
          name={name}
          required={required}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            "w-full px-4 py-3 bg-neutral-50 resize-none text-neutral-900",
            "border-2 border-neutral-200",
            "focus:outline-none focus:border-neutral-300",
            "transition-colors duration-300",
            "placeholder:text-neutral-400"
          )}
        />
        <div
          ref={underlineRef}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-400 to-gold-600 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

// Animated Select with Gold Underline
function AnimatedSelect({
  id,
  name,
  value,
  onChange,
  label,
  index,
  options,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label: string;
  index: number;
  options: { value: string; label: string }[];
}) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        x: -30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: 0.2 + index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index]);

  const handleFocus = () => {
    if (underlineRef.current) {
      gsap.to(underlineRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handleBlur = () => {
    if (underlineRef.current && !value) {
      gsap.to(underlineRef.current, {
        scaleX: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <div ref={containerRef}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold tracking-[0.1em] uppercase text-neutral-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <select
          ref={selectRef}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "w-full px-4 py-3 bg-neutral-50",
            "border-2 border-neutral-200",
            "focus:outline-none focus:border-neutral-300",
            "transition-colors duration-300",
            "text-neutral-900"
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div
          ref={underlineRef}
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-400 to-gold-600 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

// Submit Button with Success Animation
function SubmitButton({
  isSubmitting,
  isSuccess,
}: {
  isSubmitting: boolean;
  isSuccess: boolean;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isSuccess && buttonRef.current && successRef.current) {
      // Success animation
      const tl = gsap.timeline();

      tl.to(buttonRef.current, {
        backgroundColor: "#22c55e",
        duration: 0.3,
      })
        .to(
          successRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          },
          "-=0.1"
        )
        .to(buttonRef.current, {
          boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)",
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        });
    }
  }, [isSuccess]);

  return (
    <motion.button
      ref={buttonRef}
      type="submit"
      disabled={isSubmitting || isSuccess}
      className={cn(
        "w-full flex items-center justify-center gap-3 relative overflow-hidden",
        "px-8 py-5 bg-primary-600 text-white",
        "font-semibold text-sm tracking-[0.1em] uppercase",
        "hover:bg-gold-500 hover:text-neutral-900",
        "transition-all duration-300",
        "disabled:cursor-not-allowed"
      )}
      whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.01 }}
      whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.99 }}
    >
      {isSuccess ? (
        <>
          <div
            ref={successRef}
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: 0, transform: "scale(0)" }}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500" strokeWidth={3} />
            </div>
          </div>
          <span className="opacity-0">Sent Successfully!</span>
        </>
      ) : isSubmitting ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Sending...
        </span>
      ) : (
        <>
          <span>Submit Inquiry</span>
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </motion.button>
  );
}

export function ContactSection({ contactInfo: propsContactInfo }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
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
    setIsSubmitting(true);

    const whatsappMessage = `*New Inquiry from Website*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || "Not provided"}
*Project Type:* ${formData.projectType || "Not specified"}

*Message:*
${formData.message}`;

    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Reset after showing success
    setTimeout(() => {
      openWhatsApp(whatsappMessage);
      setIsSuccess(false);
      setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-28 md:py-36 lg:py-44 bg-neutral-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary-600/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      {/* Floating Gold Sphere - CSS only */}
      <div className="absolute bottom-20 left-10 w-24 h-24 pointer-events-none opacity-50 hidden lg:block">
        <FloatingGoldSphere />
      </div>

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
              Let&apos;s Create
              <br />
              <span className="text-gold-400">Together</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-neutral-400 text-lg leading-relaxed mb-12"
            >
              Ready to transform your space into something extraordinary? We&apos;d
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
                Start Your Project
              </h3>
              <p className="text-neutral-500 mb-8">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedInput
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    label="Full Name"
                    index={0}
                  />

                  <AnimatedInput
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    label="Email Address"
                    index={1}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedInput
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    label="Phone Number"
                    index={2}
                  />

                  <AnimatedSelect
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    label="Project Type"
                    index={3}
                    options={[
                      { value: "", label: "Select a type" },
                      { value: "residential", label: "Residential" },
                      { value: "commercial", label: "Commercial" },
                      { value: "hospitality", label: "Hospitality" },
                      { value: "other", label: "Other" },
                    ]}
                  />
                </div>

                <AnimatedTextarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your vision, space, and any specific requirements..."
                  label="Tell Us About Your Project"
                  index={4}
                />

                <SubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
