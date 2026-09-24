"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  {
    name: "Tandoori Lamb Chops",
    desc: "Charcoal-grilled with mint chutney and pickled onion",
    category: "Kitchen",
    image: "/images/food-plating.jpg",
  },
  {
    name: "Stella Old Fashioned",
    desc: "Bourbon, demerara, aromatic bitters, flamed orange peel",
    category: "Signature Cocktail",
    image: "/images/cocktail-signature.jpg",
  },
  {
    name: "Truffle Mushroom Risotto",
    desc: "Arborio rice, wild mushrooms, truffle oil, parmesan crisp",
    category: "Kitchen",
    image: "/images/food-plating.jpg",
  },
  {
    name: "Smoked Chicken Tikka",
    desc: "Yogurt-marinated, charcoal-finished with saffron aioli",
    category: "Kitchen",
    image: "/images/food-plating.jpg",
  },
  {
    name: "Craft Beer Flight",
    desc: "Four curated tasters from our rotating tap selection",
    category: "The Ale Program",
    image: "/images/beer-craft.jpg",
  },
  {
    name: "Sunset Spritz",
    desc: "Aperol, prosecco, blood orange, rosemary sprig",
    category: "Signature Cocktail",
    image: "/images/cocktail-signature.jpg",
  },
];

export default function MenuHighlights() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
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
            start: "top 80%",
          },
          opacity: 0,
          scale: 0.8,
          y: 20,
          stagger: 0.03,
          duration: 0.8,
          ease: "back.out(1.5)",
        });
      }

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

      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.from(cards, {
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
          y: 60,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="menu" className="section-padding bg-bg-secondary relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="eyebrow block mb-4">The Menu</span>
            <h2 ref={headingRef} className="font-[var(--font-display)] text-5xl md:text-7xl lg:text-[100px] leading-[0.85] uppercase">
              Taste the <span className="text-accent-amber">Night</span>
            </h2>
          </div>
          <div className="max-w-md">
            <p ref={textRef} className="text-text-secondary text-base md:text-lg mb-6">
              North Indian, Continental, Indo-Chinese, Mughlai, Italian — paired
              with craft ales, imported beers, and signature cocktails.
            </p>
            <a href="#" className="btn-primary">
              <span className="relative z-10">View Full Menu</span>
            </a>
          </div>
        </div>

        {/* Menu Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className="group relative bg-bg-primary border-glow flex flex-col"
            >
              {/* Image Container with zoom effect */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col grow">
                <span className="text-[10px] tracking-[0.2em] uppercase text-accent-amber font-medium mb-3">
                  {item.category}
                </span>
                <h3 className="text-2xl font-[var(--font-display)] tracking-wide uppercase text-text-primary mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
