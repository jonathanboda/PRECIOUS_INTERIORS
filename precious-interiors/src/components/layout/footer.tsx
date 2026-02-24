"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Youtube, ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

interface FooterProps {
  content?: {
    companyDescription?: string;
    copyrightText?: string;
    socialLinks?: { platform: string; url: string }[];
    quickLinks?: { label: string; href: string }[];
    newsletterTitle?: string;
    newsletterDescription?: string;
  } | null;
  contactInfo?: {
    phone?: string;
    email?: string;
  } | null;
}

const defaultFooterLinks = {
  company: [
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Interior Design", href: "/services" },
    { label: "Space Planning", href: "/services" },
    { label: "Custom Furniture", href: "/services" },
    { label: "Art Curation", href: "/services" },
  ],
};

const defaultSocialLinks = [
  { platform: "Instagram", url: "https://www.instagram.com/the_precious_interiors?igsh=bDR2cXl6cmpsNThx&utm_source=qr" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/company/the-precious-interior-designing-s/" },
  { platform: "YouTube", url: "https://youtube.com/@preciousinteriors-h7u?si=3kicvz-DIPFtH8VU" },
];

const defaultContent = {
  companyDescription: "Transforming spaces into extraordinary experiences since 2016. Where refined elegance meets purposeful design.",
  newsletterTitle: "Newsletter",
  newsletterDescription: "Subscribe for design inspiration and exclusive updates.",
};

const socialIcons: Record<string, typeof Instagram> = {
  Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
};

export function Footer({ content, contactInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Use props or defaults
  const companyDescription = content?.companyDescription || defaultContent.companyDescription;
  const quickLinks = content?.quickLinks && content.quickLinks.length > 0
    ? content.quickLinks
    : defaultFooterLinks.company;
  const servicesLinks = defaultFooterLinks.services; // Always use default services
  const socialLinksData = content?.socialLinks && content.socialLinks.length > 0
    ? content.socialLinks
    : defaultSocialLinks;
  const newsletterTitle = content?.newsletterTitle || defaultContent.newsletterTitle;
  const newsletterDescription = content?.newsletterDescription || defaultContent.newsletterDescription;
  const phone = contactInfo?.phone || "+91 90100 91191";
  const email = contactInfo?.email || "manikanta@thepreciousinteriors.com";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary-600 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Logo size="lg" variant="light" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral-400 leading-relaxed mb-8 max-w-sm"
            >
              {companyDescription}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              {socialLinksData.map((social) => {
                const Icon = socialIcons[social.platform] || Instagram;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-neutral-800 text-neutral-400 hover:bg-gold-500 hover:text-neutral-900 transition-all duration-300"
                    aria-label={social.platform}
                  >
                    <Icon />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 lg:col-start-7">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold tracking-[0.15em] uppercase text-gold-500 mb-6"
            >
              Company
            </motion.h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold tracking-[0.15em] uppercase text-gold-500 mb-6"
            >
              Services
            </motion.h4>
            <ul className="space-y-4">
              {servicesLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold tracking-[0.15em] uppercase text-gold-500 mb-6"
            >
              {newsletterTitle}
            </motion.h4>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral-400 text-sm mb-4"
            >
              {newsletterDescription}
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex"
            >
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-neutral-800 border-2 border-neutral-700 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-gold-500 transition-colors duration-200"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-gold-500 text-neutral-900 hover:bg-gold-400 transition-colors duration-200"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.form>

            {/* Contact Info */}
            <div className="mt-8 space-y-2">
              <a
                href={`mailto:${email}`}
                className="block text-neutral-400 hover:text-gold-400 transition-colors text-sm"
              >
                {email}
              </a>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="block text-neutral-400 hover:text-gold-400 transition-colors text-sm"
              >
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-500 text-sm text-center md:text-left">
              &copy; {currentYear} The Precious Interiors. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-neutral-500 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-neutral-500 hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </div>

              {/* Back to top button */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 flex items-center justify-center bg-neutral-800 text-neutral-400 hover:bg-gold-500 hover:text-neutral-900 transition-all duration-300"
                aria-label="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
