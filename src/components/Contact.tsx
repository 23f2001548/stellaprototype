"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  MapPin,
  Phone,
  Clock,
  WhatsappLogo,
  NavigationArrow,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const hours = [
  { days: "Monday", time: "5 PM – 12 AM" },
  { days: "Tuesday", time: "5 PM – 2 AM" },
  { days: "Wednesday", time: "5 PM – 12 AM" },
  { days: "Thursday", time: "5 PM – 12 AM" },
  { days: "Friday", time: "5 PM – 2 AM" },
  { days: "Saturday", time: "5 PM – 2 AM" },
  { days: "Sunday", time: "5 PM – 2 AM" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Split heading
      if (headingRef.current) {
        const splitHeading = new SplitType(headingRef.current, { types: "words" });
        gsap.from(splitHeading.words, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          rotationX: -90,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.5)",
          transformOrigin: "center bottom",
        });
      }

      // Info slide up
      if (infoRef.current) {
        gsap.from(infoRef.current.children, {
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Map scale in
      if (mapRef.current) {
        gsap.fromTo(mapRef.current, 
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          { 
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 80%",
            },
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.2,
            ease: "power4.inOut"
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section-padding bg-bg-primary relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="mb-16">
          <span className="eyebrow block mb-4">Visit Us</span>
          <h2 ref={headingRef} className="font-[var(--font-display)] text-6xl md:text-8xl uppercase" style={{ perspective: "400px" }}>
            Find <span className="text-accent-amber">Us</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          {/* Info Column */}
          <div ref={infoRef} className="space-y-12">
            {/* Address */}
            <div className="flex gap-5 group">
              <div className="w-12 h-12 shrink-0 border border-border-subtle rounded-none flex items-center justify-center group-hover:border-accent-amber transition-colors duration-300">
                <MapPin size={24} weight="duotone" className="text-accent-amber" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-2">
                  Location
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-3">
                  8th Floor, Akash Mall,<br />
                  Aerodrome Circle, Ramchandrapura,<br />
                  Gumanpura, Kota, Rajasthan 324007
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=25.1679440,75.8531320"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-accent-gold font-bold uppercase tracking-widest hover:text-accent-amber transition-colors"
                >
                  <NavigationArrow size={14} weight="bold" />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-5 group">
              <div className="w-12 h-12 shrink-0 border border-border-subtle rounded-none flex items-center justify-center group-hover:border-accent-amber transition-colors duration-300">
                <Phone size={24} weight="duotone" className="text-accent-amber" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-2">
                  Reservations
                </h3>
                <a
                  href="tel:+919001711617"
                  className="text-text-secondary text-sm hover:text-accent-gold transition-colors block mb-4"
                >
                  +91 90017 11617
                </a>
                <a
                  href="https://wa.me/919001711617?text=Hi%2C%20I%27d%20like%20to%20reserve%20a%20table%20at%20Stella."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full max-w-[240px] text-[10px]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <WhatsappLogo size={16} weight="fill" />
                    Book via WhatsApp
                  </span>
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-5 group">
              <div className="w-12 h-12 shrink-0 border border-border-subtle rounded-none flex items-center justify-center group-hover:border-accent-amber transition-colors duration-300">
                <Clock size={24} weight="duotone" className="text-accent-amber" />
              </div>
              <div className="w-full">
                <h3 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4">
                  Hours
                </h3>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div
                      key={h.days}
                      className="flex justify-between text-sm text-text-secondary border-b border-border-subtle pb-2 last:border-0"
                    >
                      <span className="font-medium text-text-primary">{h.days}</span>
                      <span className="text-text-muted">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div
            ref={mapRef}
            className="relative aspect-square lg:aspect-auto lg:h-full border border-border-strong p-2"
          >
            <div className="relative w-full h-full border border-border-subtle overflow-hidden group">
              <div className="absolute inset-0 bg-accent-amber/10 mix-blend-color pointer-events-none group-hover:opacity-0 transition-opacity duration-1000 z-10" />
              <iframe
                title="Stella Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1800!2d75.8531320!3d25.1679440!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDEwJzA0LjYiTiA3NcKwNTEnMTEuMyJF!5e0!3m2!1sen!2sin!4v1700000000000"
                className="absolute inset-0 w-full h-full border-0 grayscale contrast-125 transition-all duration-1000 group-hover:grayscale-0 group-hover:contrast-100"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
