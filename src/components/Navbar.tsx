"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { List, X, Phone } from "@phosphor-icons/react";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Menu", href: "#menu" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 80);
  });

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[150] transition-colors duration-500 ${
          isScrolled ? "nav-solid" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1 }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between h-[80px]">
          {/* Logo */}
          <a
            href="#"
            className="flex flex-col leading-none group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="font-[var(--font-display)] text-3xl font-normal tracking-wide uppercase text-text-primary group-hover:text-accent-amber transition-colors">
              Stella
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="group relative text-sm font-semibold tracking-widest uppercase text-text-secondary py-2"
              >
                <span className="relative z-10 group-hover:text-text-primary transition-colors duration-300">
                  {link.label}
                </span>
                {/* Animated underline wipe */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-amber scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left" />
              </a>
            ))}
          </div>

          {/* Reserve CTA + Mobile Toggle */}
          <div className="flex items-center gap-6">
            <motion.a
              href="https://wa.me/919001711617?text=Hi%2C%20I%27d%20like%20to%20reserve%20a%20table%20at%20Stella."
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex text-xs font-semibold tracking-widest uppercase items-center gap-2 border-b border-accent-amber pb-1 text-text-primary hover:text-accent-amber transition-colors ${
                isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
              } transition-all duration-500`}
            >
              Reserve a Table
            </motion.a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-text-primary relative z-[160]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={28} /> : <List size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[140] bg-bg-primary flex flex-col items-center justify-center gap-8 px-6"
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="font-[var(--font-display)] text-5xl md:text-6xl tracking-wide uppercase text-text-primary hover:text-accent-amber transition-colors"
                initial={{ opacity: 0, y: 40, rotateX: -45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.5, ease: "back.out(1.5)" }}
                style={{ perspective: "400px" }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="tel:+919001711617"
              className="btn-primary mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <span className="flex items-center gap-2">
                <Phone size={20} weight="bold" />
                Call to Book
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
