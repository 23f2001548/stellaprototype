"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import SplitType from "split-type";
import { CaretDown } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headlineRef.current || !taglineRef.current) return;

    // Split text
    const splitHeadline = new SplitType(headlineRef.current, { types: "chars, words" });
    const splitTagline = new SplitType(taglineRef.current, { types: "words" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1.5 }); // Wait for loader

      // Initial state
      gsap.set(splitHeadline.chars, { yPercent: 100, opacity: 0 });
      gsap.set(splitTagline.words, { y: 20, opacity: 0 });
      gsap.set(ctaRef.current, { y: 20, opacity: 0 });
      
      // bg scale in
      gsap.fromTo(bgRef.current, 
        { scale: 1.1, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
      );

      // Headline
      tl.to(splitHeadline.chars, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
      })
      // Tagline
      .to(splitTagline.words, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      // CTAs
      .to(ctaRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6");

      // Scroll parallax
      gsap.to(bgRef.current, {
        scale: 1.15,
        opacity: 0.3,
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      
    }, containerRef);

    return () => {
      splitHeadline.revert();
      splitTagline.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero-rooftop.jpg"
          alt="Stella rooftop bar overlooking city skyline at night"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Dark gradient overlay & Vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-bg-primary/70 to-transparent" />
      <div className="vignette absolute inset-0 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full pt-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="overflow-hidden mb-4">
            <span className="block text-xs md:text-sm tracking-[0.3em] uppercase text-accent-amber font-bold">
              Est. 2024
            </span>
          </div>
          
          {/* Wordmark reveal */}
          <div className="overflow-hidden mb-6 py-2">
            <h1
              ref={headlineRef}
              className="text-7xl md:text-8xl lg:text-[140px] font-[var(--font-display)] tracking-normal leading-[0.8] text-text-primary uppercase drop-shadow-2xl"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
            >
              STELLA
            </h1>
          </div>

          {/* Tagline */}
          <p
            ref={taglineRef}
            className="text-lg md:text-2xl text-text-secondary font-medium tracking-wide mb-10 max-w-lg"
          >
            Kota&apos;s Rooftop. Redefined.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-wrap gap-4">
            <a
              href="https://wa.me/919001711617?text=Hi%2C%20I%27d%20like%20to%20reserve%20a%20table%20at%20Stella."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span className="relative z-10 flex items-center gap-2">Reserve a Table</span>
            </a>
            <a href="#menu" className="btn-ghost">
              View Menu
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-text-muted">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <CaretDown size={18} className="text-accent-amber" weight="bold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
