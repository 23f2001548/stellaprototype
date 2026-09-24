"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quotes } from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Hands down the best rooftop in Kota. The view at sunset is unreal, and their old fashioned is top-tier.",
    name: "Arjun Mehra",
    role: "Regular Patron",
    rating: 5,
  },
  {
    quote:
      "Friday DJ nights here hit different. Great music, good crowd, and the vibe is always on point.",
    name: "Priya Sharma",
    role: "Nightlife Enthusiast",
    rating: 5,
  },
  {
    quote:
      "We hosted a birthday here and the staff went above and beyond. Food was incredible, especially the tandoori lamb chops.",
    name: "Rohit Gupta",
    role: "Event Host",
    rating: 5,
  },
  {
    quote:
      "Came for the craft beer, stayed for the vibe. The rooftop seating with the city lights is chef's kiss.",
    name: "Sneha Patel",
    role: "Food & Drink Blogger",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const splitHeading = new SplitType(headingRef.current, { types: "chars" });
        gsap.from(splitHeading.chars, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
          opacity: 0,
          scale: 0.5,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(2)",
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const t = testimonials[current];

  return (
    <section ref={sectionRef} className="section-padding bg-bg-secondary relative overflow-hidden border-t border-border-strong">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-amber/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 md:px-10 text-center">
        
        <span className="eyebrow block mb-4">The Word</span>
        <h2 ref={headingRef} className="font-[var(--font-display)] text-5xl md:text-7xl uppercase mb-12">
          What <span className="text-accent-amber">They Say</span>
        </h2>

        {/* Carousel */}
        <div className="min-h-[300px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <Quotes size={48} weight="fill" className="text-accent-amber/20 mb-6" />
              
              {/* Quote */}
              <p className="text-xl md:text-3xl lg:text-4xl font-[var(--font-display)] tracking-wide leading-[1.2] text-text-primary uppercase mb-8 max-w-[20ch] mx-auto">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 border-r border-border-strong pr-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} weight="fill" className="text-accent-gold" />
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-text-primary uppercase tracking-widest">
                    {t.name}
                  </p>
                  <p className="text-[10px] text-accent-amber uppercase tracking-widest mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="group relative w-12 h-12 flex items-center justify-center"
              aria-label={`Go to testimonial ${i + 1}`}
            >
              <div className={`h-[2px] transition-all duration-500 bg-accent-amber ${
                i === current ? "w-8 opacity-100" : "w-4 opacity-30 group-hover:opacity-70 group-hover:w-6"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
