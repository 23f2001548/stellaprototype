"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const images = [
  { src: "/images/hero-rooftop.jpg", alt: "Rooftop ambiance" },
  { src: "/images/beer-craft.jpg", alt: "Craft Beer Selection" },
  { src: "/images/cocktail-signature.jpg", alt: "Signature Cocktails" },
  { src: "/images/dj-nightlife.jpg", alt: "DJ Night Vibes" },
  { src: "/images/food-plating.jpg", alt: "Gourmet Tapas" },
  { src: "/images/about-interior.jpg", alt: "Stella Interior" },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply GSAP horizontal scroll on desktop
    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 1024px)", () => {
      if (!containerRef.current || !scrollRef.current) return;
      
      const sections = gsap.utils.toArray(".gallery-item");
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollRef.current?.offsetWidth || 0}`,
        }
      });
    });

    return () => matchMedia.revert();
  }, []);

  return (
    <section ref={containerRef} id="gallery" className="relative bg-bg-primary overflow-hidden py-20 lg:py-0 lg:h-[100dvh] flex flex-col justify-center">
      
      <div className="px-6 md:px-12 mb-12 lg:absolute lg:top-32 lg:left-0 lg:z-10 lg:pointer-events-none w-full max-w-[1600px] mx-auto lg:left-1/2 lg:-translate-x-1/2">
        <span className="font-eyebrow text-xs tracking-[0.2em] text-accent-amber mb-4 block">
          Visuals
        </span>
        <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] text-text-primary tracking-tight drop-shadow-lg">
          The <span className="text-accent-amber italic font-light">Vibe.</span>
        </h2>
      </div>

      {/* Mobile: Horizontal scrolling container. Desktop: GSAP pinned container */}
      <div 
        ref={scrollRef} 
        className="flex lg:h-[60vh] w-full overflow-x-auto lg:overflow-visible snap-x snap-mandatory hide-scrollbar pl-6 md:pl-12 lg:pl-[10vw]"
      >
        <div className="flex gap-4 md:gap-8 pr-6 md:pr-12 lg:pr-[10vw]">
          {images.map((img, i) => (
            <div 
              key={i} 
              className="gallery-item shrink-0 w-[85vw] sm:w-[60vw] lg:w-[45vw] h-[50vh] lg:h-full relative snap-center rounded-2xl overflow-hidden group glass-panel p-2"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="font-eyebrow text-xs text-accent-amber">{String(i + 1).padStart(2, '0')}</span>
                  <p className="font-sans font-medium text-text-primary text-lg mt-1">{img.alt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Custom CSS to hide scrollbar on mobile but keep functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
