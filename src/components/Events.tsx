"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  Headphones,
  MicrophoneStage,
  Monitor,
  MusicNote,
} from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    icon: Headphones,
    title: "DJ Nights",
    schedule: "Friday & Saturday",
    time: "9 PM onwards",
    desc: "Resident and guest DJs spinning everything from Bollywood to deep house under the stars.",
    image: "/images/dj-nightlife.jpg",
  },
  {
    icon: MicrophoneStage,
    title: "Karaoke Nights",
    schedule: "Wednesday",
    time: "8 PM onwards",
    desc: "Grab the mic, pick your anthem, and own the stage. Drinks specials all night.",
    image: "/images/karaoke-night.jpg",
  },
  {
    icon: Monitor,
    title: "Live Sports",
    schedule: "Match Days",
    time: "As scheduled",
    desc: "Big screens, cold beer, and the best seats for IPL, Premier League, and more.",
    image: "/images/sports-screening.jpg",
  },
  {
    icon: MusicNote,
    title: "Live Music",
    schedule: "Select Evenings",
    time: "7 PM onwards",
    desc: "Acoustic sessions and live bands bringing the rooftop alive with original and cover sets.",
    image: "/images/hero-rooftop.jpg",
  },
];

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
          y: "100%",
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power4.out",
        });
      }

      // Parallax background
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      // List stagger
      if (listRef.current) {
        const items = listRef.current.children;
        gsap.from(items, {
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 75%",
          },
          x: -40,
          opacity: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="section-padding overflow-hidden relative">
      
      {/* Background Parallax */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div ref={bgRef} className="absolute inset-[-10%] w-[120%] h-[120%]">
          <Image
            src="/images/dj-nightlife.jpg"
            alt=""
            fill
            className="object-cover grayscale contrast-125 mix-blend-screen"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Header Side (sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <span className="eyebrow block mb-4">Nightlife</span>
            <div className="line pb-4">
              <h2 ref={headingRef} className="font-[var(--font-display)] text-6xl md:text-8xl leading-[0.85] uppercase">
                Own The <span className="text-accent-amber block">Night</span>
              </h2>
            </div>
            <p className="text-text-secondary text-base md:text-lg mt-6 max-w-sm">
              Every night at Stella is a different story. Pick your vibe, bring your crew, and we&apos;ll handle the rest.
            </p>
          </div>

          {/* Events List */}
          <div ref={listRef} className="lg:col-span-7 lg:col-start-6 space-y-6 lg:space-y-12 mt-8 lg:mt-0">
            {events.map((event, i) => (
              <div 
                key={i} 
                className="group flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center py-6 border-b border-border-subtle hover:border-accent-amber transition-colors duration-500"
              >
                {/* Number indicator */}
                <div className="hidden md:block font-[var(--font-display)] text-4xl text-text-muted/20 group-hover:text-accent-amber/40 transition-colors">
                  0{i + 1}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <event.icon size={24} weight="duotone" className="text-accent-amber" />
                    <h3 className="text-3xl md:text-4xl font-[var(--font-display)] uppercase tracking-wide text-text-primary group-hover:text-accent-amber transition-all duration-300">
                      {event.title}
                    </h3>
                  </div>
                  <p className="text-xs tracking-[0.1em] text-accent-gold uppercase font-bold mb-3">
                    {event.schedule} · {event.time}
                  </p>
                  <p className="text-text-secondary text-sm md:text-base max-w-md">
                    {event.desc}
                  </p>
                </div>
                
                {/* Reveal Image on hover */}
                <div className="hidden md:block w-32 h-32 relative rounded-full overflow-hidden opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                  <div className="absolute inset-0 bg-accent-amber/20 mix-blend-overlay" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
