"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import SplitType from "split-type";
import { ArrowRight, StarFour } from "@phosphor-icons/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current) return;

    const titleSplit = new SplitType(titleRef.current, { types: "lines,words,chars" });
    const subtitleSplit = new SplitType(subtitleRef.current, { types: "lines,words" });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      gsap.set(titleSplit.chars, { y: 100, opacity: 0, rotateX: -40 });
      gsap.set(subtitleSplit.words, { y: 20, opacity: 0 });
      gsap.set(imageWrapperRef.current, { scale: 1.2, opacity: 0, filter: "blur(20px)" });
      gsap.set(ctaRef.current, { y: 30, opacity: 0 });

      tl.to(imageWrapperRef.current, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 2,
        ease: "power4.out"
      })
      .to(titleSplit.chars, {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.02,
        duration: 1.2,
        ease: "power4.out"
      }, "-=1.5")
      .to(subtitleSplit.words, {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 1,
        ease: "power3.out"
      }, "-=1.2")
      .to(ctaRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=1");

      // Parallax effect on scroll
      gsap.to(imageWrapperRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => {
      titleSplit.revert();
      subtitleSplit.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden bg-bg-primary">
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div ref={imageWrapperRef} className="relative w-full h-full">
          <Image
            src="/images/hero-rooftop.jpg"
            alt="Stella Rooftop Lounge"
            fill
            priority
            className="object-cover opacity-60 mix-blend-screen"
            sizes="100vw"
          />
          {/* Subtle gradient overlay to blend image into background */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/80 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col justify-center h-full">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mb-8 md:mb-16 gap-8">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6 md:mb-10 overflow-hidden">
              <StarFour weight="fill" className="text-accent-amber animate-pulse" size={16} />
              <span className="font-eyebrow text-xs md:text-sm tracking-[0.3em] text-accent-amber">Kota&apos;s Highest Point</span>
            </div>
            
            <h1 ref={titleRef} className="font-display text-7xl md:text-[9rem] lg:text-[11rem] leading-[0.85] tracking-tight text-text-primary mb-6" style={{ perspective: "1000px" }}>
              Meet The<br/>
              <span className="text-accent-amber italic font-light">Skyline.</span>
            </h1>
          </div>
          
          <div className="max-w-xs md:max-w-sm mb-4 md:mb-12">
            <p ref={subtitleRef} className="text-base md:text-xl text-text-secondary font-light leading-relaxed mb-8">
              A cinematic escape above the city. Handcrafted cocktails, curated sounds, and an atmosphere built for the extraordinary.
            </p>
            
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <a href="#booking" className="group flex items-center justify-between gap-6 bg-text-primary text-bg-primary px-8 py-4 rounded-full font-medium hover:bg-accent-amber transition-colors duration-500 w-fit">
                <span>Reserve Table</span>
                <span className="bg-bg-primary text-text-primary p-2 rounded-full group-hover:bg-text-primary group-hover:text-bg-primary transition-colors duration-500">
                  <ArrowRight size={16} weight="bold" />
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom meta row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border-subtle/50 mt-auto">
          {[
            { label: "Elevation", value: "Level 8" },
            { label: "Vibe", value: "Sunset to Midnight" },
            { label: "Cuisine", value: "Global Tapas" },
            { label: "Music", value: "Curated Selectors" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="font-eyebrow text-[10px] md:text-xs text-text-muted">{item.label}</span>
              <span className="font-sans text-sm md:text-base text-text-primary font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
