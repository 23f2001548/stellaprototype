"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { InstagramLogo } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  { src: "/images/hero-rooftop.jpg", alt: "Stella rooftop evening" },
  { src: "/images/cocktail-signature.jpg", alt: "Signature cocktail" },
  { src: "/images/dj-nightlife.jpg", alt: "DJ night" },
  { src: "/images/food-plating.jpg", alt: "Gourmet plating" },
  { src: "/images/gallery-rooftop-view.jpg", alt: "City view" },
  { src: "/images/beer-craft.jpg", alt: "Craft beer flight" },
  { src: "/images/karaoke-night.jpg", alt: "Karaoke night" },
  { src: "/images/about-interior.jpg", alt: "Lounge interior" },
];

export default function InstagramFeed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Split heading
      if (headingRef.current) {
        const splitHeading = new SplitType(headingRef.current, { types: "chars" });
        gsap.from(splitHeading.chars, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
          },
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.8,
          ease: "power3.out",
        });
      }

      // Grid stagger
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          },
          scale: 0.9,
          opacity: 0,
          y: 30,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.5)",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-bg-primary relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="eyebrow block mb-4">Social</span>
            <h2 ref={headingRef} className="font-[var(--font-display)] text-5xl md:text-7xl uppercase">
              Follow the <span className="text-accent-amber">Night</span>
            </h2>
          </div>
          <a
            href="https://instagram.com/stellakotaa"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <span className="relative z-10 flex items-center gap-2">
              <InstagramLogo size={20} weight="bold" />
              @stellakotaa
            </span>
          </a>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {posts.map((post, i) => (
            <a
              key={i}
              href="https://instagram.com/stellakotaa"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden group block"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <InstagramLogo size={32} weight="fill" className="text-accent-gold scale-50 group-hover:scale-100 transition-transform duration-500 ease-out" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
