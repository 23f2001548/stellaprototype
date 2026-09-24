"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Quotes } from "@phosphor-icons/react";

const testimonials = [
  {
    quote: "Easily the best rooftop experience in Kota. The ambiance, the crafted cocktails, and that skyline view—absolutely unmatched.",
    author: "Rohan M.",
    role: "Local Guide"
  },
  {
    quote: "Stella has redefined nightlife for us. The acoustics during their DJ nights are incredible, and the truffle kulcha is a must-try.",
    author: "Priya S.",
    role: "Food Critic"
  },
  {
    quote: "From the sunset golden hour to the midnight vibe, the transition is flawless. Excellent service and premium crowd.",
    author: "Vikram K.",
    role: "Entrepreneur"
  }
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-bg-secondary relative overflow-hidden">
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="font-eyebrow text-xs tracking-[0.2em] text-accent-amber mb-6 block">
              The Word
            </span>
            <h2 className="font-display text-5xl md:text-7xl lg:text-[5rem] leading-[0.9] text-text-primary tracking-tight">
              What They <br/>
              <span className="text-accent-amber italic font-light">Say.</span>
            </h2>
          </div>
          
          <div className="hidden md:flex gap-2">
            {/* Desktop decorative element */}
            <div className="h-[1px] w-32 bg-border-strong self-center mr-4" />
          </div>
        </div>

        {/* Mobile swipable, Desktop grid */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar pb-8 -mx-6 px-6 md:mx-0 md:px-0">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="testimonial-card shrink-0 w-[85vw] sm:w-[60vw] md:w-auto snap-center glass-panel p-8 md:p-10 flex flex-col justify-between h-full min-h-[300px]"
            >
              <div>
                <Quotes size={32} weight="fill" className="text-accent-amber/40 mb-6" />
                <p className="text-text-primary font-light text-lg md:text-xl leading-relaxed">
                  "{t.quote}"
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-border-subtle">
                <div className="font-sans text-text-primary font-medium">{t.author}</div>
                <div className="font-eyebrow text-[10px] text-text-muted mt-1">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
