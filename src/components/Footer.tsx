"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  InstagramLogo,
  FacebookLogo,
  Phone,
  MapPin,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!footerRef.current || !logoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
        y: -100,
        opacity: 0.5,
        ease: "none",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-bg-secondary border-t border-border-subtle pt-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand */}
          <div className="lg:col-span-5">
            <h3 className="font-[var(--font-display)] text-5xl tracking-wide uppercase text-text-primary mb-2">
              Stella
            </h3>
            <p className="text-[10px] tracking-[0.3em] uppercase text-accent-amber font-bold mb-6">
              The Land of Ale
            </p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
              Kota&apos;s premier rooftop bar, lounge & kitchen. Where every
              night is a celebration above the skyline.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-6">
              Explore
            </h4>
            <nav className="flex flex-col gap-4">
              {[
                { label: "Experience", href: "#experience" },
                { label: "Gallery", href: "#gallery" },
                { label: "Menu", href: "#menu" },
                { label: "Events", href: "#events" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative w-fit text-sm font-medium tracking-widest uppercase text-text-secondary"
                >
                  <span className="relative z-10 group-hover:text-text-primary transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent-amber scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100 group-hover:origin-left" />
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-6">
              Get in Touch
            </h4>
            <div className="space-y-4">
              <a
                href="tel:+919001711617"
                className="group flex items-center gap-3 text-sm text-text-secondary hover:text-accent-gold transition-colors w-fit"
              >
                <div className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center group-hover:border-accent-amber transition-colors">
                  <Phone size={16} weight="duotone" className="text-accent-amber" />
                </div>
                +91 90017 11617
              </a>
              <div className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                <div className="w-8 h-8 shrink-0 rounded-full border border-border-subtle flex items-center justify-center">
                  <MapPin size={16} weight="duotone" className="text-accent-amber" />
                </div>
                <span className="mt-1">
                  8th Floor, Akash Mall,<br />Aerodrome Circle, Kota,<br />Rajasthan 324007
                </span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-text-primary mb-6">
              Follow Us
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/stellakotaa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none border border-border-strong flex items-center justify-center text-text-muted hover:text-accent-gold hover:border-accent-amber transition-all duration-300"
                aria-label="Follow on Instagram"
              >
                <InstagramLogo size={20} weight="bold" />
              </a>
              <a
                href="https://facebook.com/stellathelandofale"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-none border border-border-strong flex items-center justify-center text-text-muted hover:text-accent-gold hover:border-accent-amber transition-all duration-300"
                aria-label="Follow on Facebook"
              >
                <FacebookLogo size={20} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Footer Logo Parallax */}
      <div className="w-full border-t border-border-strong relative overflow-hidden flex items-end justify-center pt-8 pb-4">
        <h2 ref={logoRef} className="font-[var(--font-display)] text-[12vw] leading-none tracking-normal uppercase text-bg-elevated whitespace-nowrap select-none">
          STELLA KOTA
        </h2>
        
        {/* Copyright Bar */}
        <div className="absolute bottom-4 left-0 w-full px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-2 mix-blend-difference">
          <p className="text-xs tracking-widest uppercase text-text-muted">
            &copy; {new Date().getFullYear()} Stella
          </p>
          <p className="text-[10px] tracking-widest uppercase text-text-muted/50">
            Crafted for Kota
          </p>
        </div>
      </div>
    </footer>
  );
}
