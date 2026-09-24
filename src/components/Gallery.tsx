"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useReducedMotion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  {
    src: "/images/hero-rooftop.jpg",
    alt: "Stella rooftop bar with city skyline views",
    aspect: "aspect-[3/4]",
    width: "w-[300px] md:w-[400px]",
    caption: "The Skyline",
  },
  {
    src: "/images/cocktail-signature.jpg",
    alt: "Signature craft cocktail at Stella",
    aspect: "aspect-square",
    width: "w-[260px] md:w-[320px]",
    caption: "Craft",
  },
  {
    src: "/images/gallery-rooftop-view.jpg",
    alt: "Panoramic night view from Stella rooftop",
    aspect: "aspect-[3/4]",
    width: "w-[280px] md:w-[360px]",
    caption: "Views",
  },
  {
    src: "/images/dj-nightlife.jpg",
    alt: "DJ performing at Stella nightclub",
    aspect: "aspect-[4/3]",
    width: "w-[340px] md:w-[480px]",
    caption: "Energy",
  },
  {
    src: "/images/food-plating.jpg",
    alt: "Gourmet dish plating at Stella kitchen",
    aspect: "aspect-square",
    width: "w-[260px] md:w-[320px]",
    caption: "Taste",
  },
  {
    src: "/images/about-interior.jpg",
    alt: "Stella lounge interior ambiance",
    aspect: "aspect-[3/4]",
    width: "w-[300px] md:w-[380px]",
    caption: "Ambiance",
  },
  {
    src: "/images/beer-craft.jpg",
    alt: "Craft beer selection at Stella",
    aspect: "aspect-[4/3]",
    width: "w-[320px] md:w-[440px]",
    caption: "The Ale",
  },
];

export default function Gallery() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrapRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      // Heading Split Reveal
      if (headingRef.current) {
        const split = new SplitType(headingRef.current, { types: "chars" });
        gsap.from(split.chars, {
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top 70%",
          },
          opacity: 0,
          y: 40,
          stagger: 0.05,
          duration: 0.8,
          ease: "power4.out",
        });
      }

      // Horizontal Scroll
      const distance = trackRef.current!.scrollWidth - window.innerWidth;
      gsap.to(trackRef.current, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      
    }, wrapRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={wrapRef}
      id="gallery"
      className="relative overflow-hidden bg-bg-primary border-y border-border-strong"
    >
      {/* Section Header (pinned with the section) */}
      <div className="absolute top-12 md:top-20 left-6 md:left-10 z-10 pointer-events-none">
        <span className="eyebrow block mb-2">Visuals</span>
        <h2 ref={headingRef} className="text-6xl md:text-8xl font-[var(--font-display)] uppercase">
          The <span className="text-accent-amber">Vibe</span>
        </h2>
      </div>

      {/* Horizontal Track */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 md:gap-12 h-[100dvh] px-6 md:px-10 pt-20 pb-10"
        style={{ width: "max-content" }}
      >
        <div className="w-[10vw] shrink-0" /> {/* Spacer for intro scroll */}
        
        {galleryItems.map((item, i) => (
          <div
            key={i}
            className={`${item.width} shrink-0 ${item.aspect} relative overflow-hidden group cursor-pointer`}
          >
            {/* The mask container */}
            <div className="w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[0.96]">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                sizes="(max-width: 768px) 80vw, 30vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Floating Caption */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="font-[var(--font-display)] text-3xl md:text-5xl uppercase tracking-widest text-text-primary drop-shadow-xl mix-blend-overlay">
                  {item.caption}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        <div className="w-[10vw] shrink-0" /> {/* Spacer for outro scroll */}
      </div>
    </section>
  );
}
