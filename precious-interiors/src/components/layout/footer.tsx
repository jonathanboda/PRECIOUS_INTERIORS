"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const footerLinks = {
  company: [
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ],
  services: [
    { name: "Interior Design", href: "/services" },
    { name: "Space Planning", href: "/services" },
    { name: "Custom Furniture", href: "/services" },
    { name: "Art Curation", href: "/services" },
  ],
};

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { name: "Pinterest", icon: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
    </svg>
  ), href: "https://pinterest.com" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

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
              Transforming spaces into extraordinary experiences since 2016.
              Where refined elegance meets purposeful design.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center bg-neutral-800 text-neutral-400 hover:bg-gold-500 hover:text-neutral-900 transition-all duration-300"
                    aria-label={social.name}
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
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
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
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
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
              Newsletter
            </motion.h4>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-neutral-400 text-sm mb-4"
            >
              Subscribe for design inspiration and exclusive updates.
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
                href="mailto:manikanta@thepreciousinteriors.com"
                className="block text-neutral-400 hover:text-gold-400 transition-colors text-sm"
              >
                manikanta@thepreciousinteriors.com
              </a>
              <a
                href="tel:+919010091191"
                className="block text-neutral-400 hover:text-gold-400 transition-colors text-sm"
              >
                +91 90100 91191
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
