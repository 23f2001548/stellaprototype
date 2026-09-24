"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const texts = [
  "ROOFTOP VIEWS",
  "LIVE DJ NIGHTS",
  "SIGNATURE COCKTAILS",
  "KARAOKE FRIDAYS",
  "CRAFT ALES",
  "SKYLINE DINING",
];

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!marqueeRef.current) return;
    
    const track = marqueeRef.current.querySelector(".marquee-track");
    if (!track) return;

    // Create a seamless loop by duplicating the text content
    const tl = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="py-6 border-y border-border-strong bg-bg-primary overflow-hidden flex whitespace-nowrap">
      <div ref={marqueeRef} className="flex relative w-full">
        <div className="marquee-track flex gap-8 items-center pl-8 text-xl md:text-3xl font-[var(--font-display)] text-text-muted tracking-wider">
          {[...texts, ...texts, ...texts, ...texts].map((text, i) => (
            <div key={i} className="flex items-center gap-8">
              <span>{text}</span>
              <span className="text-accent-amber opacity-50">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
