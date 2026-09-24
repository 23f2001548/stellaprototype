"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { Wine, MusicNotes, Buildings, ForkKnife } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: Buildings, label: "8th Floor Skyline Views" },
  { icon: MusicNotes, label: "Live DJ & Music Nights" },
  { icon: Wine, label: "Craft Cocktails & Full Bar" },
  { icon: ForkKnife, label: "Multi-Cuisine Kitchen" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Heading Split
      if (headingRef.current) {
        const splitHeading = new SplitType(headingRef.current, { types: "lines, words" });
        gsap.from(splitHeading.words, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
          y: 40,
          opacity: 0,
          rotationX: -45,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)",
        });
      }

      // Paragraph fade
      if (textRef.current) {
        gsap.from(textRef.current, {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
          },
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      }

      // Image Mask Reveal + Parallax
      if (imageWrapRef.current && imageRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top 80%",
          }
        });

        tl.fromTo(imageWrapRef.current, 
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.5, ease: "power4.inOut" }
        )
        .fromTo(imageRef.current, 
          { scale: 1.4 }, 
          { scale: 1, duration: 2, ease: "power3.out" }, "-=1.5"
        );

        gsap.to(imageRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: imageWrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // Highlights Stagger
      if (statsRef.current) {
        gsap.from(statsRef.current.children, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-padding overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative">
          
          {/* Text Side (lg: 5 cols, offset by 1) */}
          <div className="order-2 lg:order-1 lg:col-span-5 lg:col-start-2 z-10">
            <span className="eyebrow block mb-6">The Experience</span>
            <h2 
              ref={headingRef}
              className="font-[var(--font-display)] text-5xl md:text-7xl leading-[0.9] mb-8"
              style={{ perspective: "400px" }}
            >
              Where the City <br />
              <span className="text-accent-amber">Meets the Sky</span>
            </h2>

            <p ref={textRef} className="text-text-secondary text-base md:text-lg max-w-md mb-12">
              Perched on the 8th floor of Akash Mall, Stella offers an escape
              above Kota&apos;s skyline. From signature cocktails and craft ales to
              live DJ sets under the open sky, every evening here is designed to
              be unforgettable.
            </p>

            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <div
                  key={item.label}
                  className="group flex items-start gap-4 p-5 border-glow bg-bg-card"
                >
                  <item.icon
                    size={28}
                    weight="duotone"
                    className="text-accent-amber shrink-0 transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="text-sm text-text-primary font-medium mt-1 leading-snug">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image Side (lg: 6 cols, offset by 0 to overlap slightly) */}
          <div className="order-1 lg:order-2 lg:col-span-6 lg:-ml-12 relative z-0">
            <div ref={imageWrapRef} className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
              <div ref={imageRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
                <Image
                  src="/images/about-interior.jpg"
                  alt="Stella lounge interior with warm amber lighting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-accent-amber/20 rounded-full blur-[2px] hidden lg:block" />
          </div>
          
        </div>
      </div>
    </section>
  );
}
