"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { label: "Reserve", href: "#hero" },
  { label: "Atmosphere", href: "#about" },
  { label: "Tasting Menu", href: "#menu" },
  { label: "Nightlife", href: "#events" },
  { label: "Gallery", href: "#gallery" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled 
            ? "bg-bg-primary/70 backdrop-blur-xl border-border-subtle py-4" 
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="font-display text-2xl md:text-3xl text-text-primary tracking-wide relative z-[60]">
            Stella
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10 items-center">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-accent-amber transition-colors tracking-wide"
              >
                {link.label}
              </a>
            ))}
            <a href="https://wa.me/919001711617" className="btn-primary py-2 px-6 text-xs rounded-full">
              Book Table
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden relative z-[60] text-text-primary p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <List size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-bg-secondary/95 backdrop-blur-2xl flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                  className="font-display text-5xl sm:text-6xl text-text-primary hover:text-accent-amber transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                href="https://wa.me/919001711617" 
                className="mt-8 btn-primary text-center py-4 w-full"
              >
                Book Your Table
              </motion.a>
            </nav>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-12 left-8 right-8 flex justify-between items-end border-t border-border-subtle pt-6"
            >
              <div className="font-eyebrow text-xs text-text-muted">
                Kota, RJ
              </div>
              <div className="text-right text-sm text-text-secondary">
                8th Floor, Akash Mall<br/>
                +91 90017 11617
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
