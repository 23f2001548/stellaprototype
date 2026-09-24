"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Headphones, MicrophoneStage, Trophy } from "@phosphor-icons/react";

const events = [
  {
    title: "Vinyl & Jazz",
    day: "Thursdays",
    icon: Headphones,
    desc: "Acoustic sessions and curated jazz vinyls against the sunset."
  },
  {
    title: "High Altitude Sets",
    day: "Fri & Sat",
    icon: MicrophoneStage,
    desc: "Our resident DJs bring the deep minimal and house beats until 2 AM."
  },
  {
    title: "Derby Days",
    day: "Sundays",
    icon: Trophy,
    desc: "Live sports screenings on the massive rooftop projector."
  }
];

export default function Events() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".event-card", {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="events" className="relative py-24 md:py-40 bg-bg-primary overflow-hidden">
      {/* Abstract background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-amber/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <span className="font-eyebrow text-xs tracking-[0.2em] text-accent-amber mb-6 block">
            The Programming
          </span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] text-text-primary tracking-tight">
            Own The <span className="text-accent-amber italic font-light">Night.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {events.map((event, i) => (
            <div 
              key={i} 
              className="event-card glass-panel group p-8 md:p-12 flex flex-col relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-accent-amber/50"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110 group-hover:rotate-12">
                <event.icon size={120} weight="fill" className="text-accent-amber" />
              </div>
              
              <div className="mb-auto relative z-10">
                <div className="font-eyebrow text-xs text-text-muted mb-4">{event.day}</div>
                <h3 className="font-display text-3xl md:text-4xl text-text-primary mb-4">{event.title}</h3>
                <p className="text-text-secondary font-light leading-relaxed">
                  {event.desc}
                </p>
              </div>

              <div className="mt-12 relative z-10">
                <a href="#booking" className="inline-flex items-center gap-2 text-sm font-medium text-accent-amber group/link">
                  <span className="border-b border-transparent group-hover/link:border-accent-amber pb-0.5 transition-colors">
                    Reserve List
                  </span>
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
