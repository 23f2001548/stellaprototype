"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const menuItems = [
  {
    category: "Signature Pours",
    items: [
      { name: "Liquid Amber Ale", price: "₹395", desc: "Our house specialty. Crisp, copper-toned, and infinitely refreshing." },
      { name: "Midnight Stout", price: "₹425", desc: "Rich espresso and dark chocolate notes with a velvet finish." },
      { name: "Skyline Witbier", price: "₹375", desc: "Cloudy, citrusy, and spiced with coriander. Perfect for sunset." },
    ]
  },
  {
    category: "Global Tapas",
    items: [
      { name: "Truffle & Parmesan Kulcha", price: "₹450", desc: "Wood-fired Indian bread infused with black truffle oil and sharp cheese." },
      { name: "Charred Citrus Salmon", price: "₹850", desc: "Norwegian salmon, burnt orange glaze, served on a bed of quinoa." },
      { name: "Crispy Lotus Stem", price: "₹395", desc: "Honey chili glaze, toasted sesame, spring onions." },
    ]
  }
];

export default function MenuHighlights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.from(headlineRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });

      // Menu items stagger
      gsap.from(".menu-item", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".menu-grid",
          start: "top 85%",
        }
      });
      
      // Image parallax
      gsap.to(".menu-image", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="menu" className="relative py-24 md:py-40 bg-bg-secondary">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left: Sticky Context */}
          <div className="lg:w-1/3 flex flex-col justify-between">
            <div className="sticky top-32">
              <span className="font-eyebrow text-xs tracking-[0.2em] text-accent-amber mb-6 block">
                The Tasting Room
              </span>
              <h2 ref={headlineRef} className="font-display text-5xl md:text-7xl lg:text-[5rem] leading-[0.9] text-text-primary tracking-tight mb-8">
                Curated <br/>
                <span className="text-accent-amber italic font-light">Flavors.</span>
              </h2>
              <p className="text-text-secondary text-base md:text-lg font-light leading-relaxed mb-10 max-w-sm">
                From micro-batch craft ales poured at exactly 3.8°C to wood-fired global tapas, our menu is an evolving curation of premium ingredients designed for elevation.
              </p>
              
              <div className="hidden lg:block w-full h-[400px] rounded-2xl overflow-hidden relative">
                <Image
                  src="/images/beer-craft.jpg"
                  alt="Craft beer pouring"
                  fill
                  className="menu-image object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: The Menu Grid */}
          <div className="lg:w-2/3 menu-grid flex flex-col gap-16 md:gap-24">
            {menuItems.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-8">
                <h3 className="font-display text-3xl md:text-4xl text-text-primary border-b border-border-subtle pb-4">
                  {section.category}
                </h3>
                
                <div className="flex flex-col gap-6 md:gap-8">
                  {section.items.map((item, i) => (
                    <div key={i} className="menu-item group flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8 relative">
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between items-baseline mb-2">
                          <h4 className="font-sans text-lg md:text-xl text-text-primary font-medium group-hover:text-accent-amber transition-colors">
                            {item.name}
                          </h4>
                          <span className="sm:hidden font-eyebrow text-sm text-accent-amber">{item.price}</span>
                        </div>
                        <p className="text-sm md:text-base text-text-secondary font-light max-w-md">
                          {item.desc}
                        </p>
                      </div>
                      
                      <div className="hidden sm:block shrink-0">
                        <span className="font-eyebrow text-base text-accent-amber">{item.price}</span>
                      </div>
                      
                      {/* Subtle hover line */}
                      <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-border-subtle scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="pt-8">
              <a href="#" className="btn-ghost w-full sm:w-auto">
                Download Full Menu (PDF)
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
