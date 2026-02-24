"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
import { useInquiryModal } from "@/context/inquiry-modal-context";

interface HeaderProps {
  contactInfo?: {
    phone?: string;
    email?: string;
  } | null;
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const defaultContactInfo = {
  phone: "+91 90100 91191",
  email: "manikanta@thepreciousinteriors.com",
};

const defaultSocialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/the_precious_interiors?igsh=bDR2cXl6cmpsNThx&utm_source=qr" },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/the-precious-interior-designing-s/" },
  { name: "YouTube", href: "https://youtube.com/@preciousinteriors-h7u?si=3kicvz-DIPFtH8VU" },
];

export function Header({ contactInfo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useInquiryModal();

  // Use props or defaults
  const phone = contactInfo?.phone || defaultContactInfo.phone;
  const email = contactInfo?.email || defaultContactInfo.email;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-cream/98 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.08)] py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Logo
                size="md"
                variant={isScrolled ? "dark" : "light"}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => {
                const active = isActive(link.href);

                return (
                  <Link key={link.name} href={link.href}>
                    <motion.span
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
                      className={cn(
                        "relative py-2 text-sm font-medium tracking-[0.08em] uppercase transition-all duration-300 block group",
                        isScrolled
                          ? active
                            ? "text-primary-600"
                            : "text-neutral-600 hover:text-primary-600"
                          : active
                          ? "text-gold-400"
                          : "text-white/90 hover:text-white"
                      )}
                    >
                      {link.name}
                      <span className={cn(
                        "absolute -bottom-1 left-0 h-[2px] transition-all duration-300",
                        active
                          ? "w-full"
                          : "w-0 group-hover:w-full",
                        isScrolled
                          ? "bg-primary-600"
                          : "bg-gold-400"
                      )} />
                    </motion.span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button - Desktop */}
            <motion.button
              onClick={openModal}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={cn(
                "hidden lg:inline-flex items-center gap-3 px-7 py-3.5",
                "text-sm font-semibold tracking-[0.08em] uppercase",
                "transition-all duration-400 cursor-pointer",
                isScrolled
                  ? "bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-600/25"
                  : "bg-gold-500 text-neutral-900 hover:bg-gold-400 shadow-lg shadow-gold-500/25"
              )}
              whileHover={{ scale: 1.03, x: 3 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get Quote</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden relative z-10 w-12 h-12 flex items-center justify-center transition-colors duration-200",
                isMobileMenuOpen
                  ? "text-white"
                  : isScrolled
                  ? "text-neutral-900"
                  : "text-white"
              )}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={2.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2.5} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary-600"
            >
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-700/30" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
            </motion.div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center px-8 md:px-12">
              <nav className="space-y-1">
                {navLinks.map((link, index) => (
                  <div key={link.name} className="overflow-hidden">
                    <motion.div
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 80, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "group flex items-center gap-4 py-3",
                          isActive(link.href)
                            ? "text-gold-400"
                            : "text-white"
                        )}
                      >
                        <span className={cn(
                          "text-xs font-medium tracking-wider text-gold-500/60",
                        )}>
                          0{index + 1}
                        </span>
                        <span className={cn(
                          "text-4xl sm:text-5xl font-cinzel font-semibold transition-all duration-300",
                          "group-hover:translate-x-3 group-hover:text-gold-400"
                        )}>
                          {link.name}
                        </span>
                        <motion.span
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ArrowRight className="w-6 h-6 text-gold-400" />
                        </motion.span>
                      </Link>
                    </motion.div>
                  </div>
                ))}
              </nav>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-16 pt-8 border-t border-white/10"
              >
                <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">Get in touch</p>
                <a
                  href={`mailto:${email}`}
                  className="block text-white/80 hover:text-gold-400 transition-colors text-lg font-medium mb-2"
                >
                  {email}
                </a>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="block text-white/80 hover:text-gold-400 transition-colors text-lg font-medium"
                >
                  {phone}
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8 flex gap-8"
              >
                {defaultSocialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-gold-400 transition-colors text-sm font-medium tracking-wider uppercase"
                  >
                    {social.name}
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Bold corner accent */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gold-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
