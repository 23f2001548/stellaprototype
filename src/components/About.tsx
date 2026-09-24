"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import SplitType from "split-type";
import { motion } from "framer-motion";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!headlineRef.current || !textRef.current) return;

    const headlineSplit = new SplitType(headlineRef.current, { types: "words" });

    const ctx = gsap.context(() => {
      // Headline reveal
      gsap.from(headlineSplit.words, {
        yPercent: 120,
        opacity: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 80%",
        }
      });

      // Text fade in
      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        }
      });

      // Images parallax & scale
      imageRefs.current.forEach((img, i) => {
        if (!img) return;
        
        // Parallax wrapper
        gsap.to(img, {
          yPercent: i % 2 === 0 ? -15 : 15,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
        
        // Inner image scale down on scroll
        const innerImg = img.querySelector('img');
        if (innerImg) {
          gsap.fromTo(innerImg, 
            { scale: 1.3 },
            { 
              scale: 1, 
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      });
    }, containerRef);

    return () => {
      headlineSplit.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="about" className="relative py-24 md:py-40 bg-bg-primary overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Images */}
          <div className="lg:col-span-6 relative h-[60vh] md:h-[80vh] w-full">
            <div 
              ref={el => { imageRefs.current[0] = el; }}
              className="absolute top-0 left-0 w-[65%] h-[70%] rounded-2xl overflow-hidden glass-panel p-2 z-10"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/images/about-interior.jpg"
                  alt="Stella Interior Design"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            
            <div 
              ref={el => { imageRefs.current[1] = el; }}
              className="absolute bottom-0 right-0 w-[55%] h-[60%] rounded-2xl overflow-hidden glass-panel p-2 z-20"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/images/cocktail-signature.jpg"
                  alt="Signature Cocktails at Stella"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-6 lg:pl-10 relative z-30">
            <span className="font-eyebrow text-xs tracking-[0.2em] text-accent-amber mb-6 block">
              The Architecture of Night
            </span>
            
            <div className="line overflow-hidden mb-8">
              <h2 ref={headlineRef} className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.9] text-text-primary tracking-tight">
                Designed to <br/>
                <span className="text-accent-amber italic font-light">Elevate.</span>
              </h2>
            </div>
            
            <p ref={textRef} className="text-lg md:text-xl text-text-secondary font-light leading-relaxed max-w-xl mb-12">
              Situated on the 8th floor of Akash Mall, Stella breaks the boundaries of traditional nightlife. We merged raw brutalist architecture with warm amber lighting to create a space that feels both infinitely expansive and intimately private. 
              <br/><br/>
              Whether you are here for the sunset acoustic sets or the midnight electronic sessions, the space adapts to the rhythm of the night.
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-fit"
            >
              <a href="#menu" className="group flex items-center gap-4 text-text-primary font-medium tracking-wide">
                <span className="border-b border-accent-amber/30 group-hover:border-accent-amber pb-1 transition-colors">
                  Explore the Menu
                </span>
                <span className="h-8 w-8 rounded-full border border-border-subtle flex items-center justify-center group-hover:bg-text-primary group-hover:text-bg-primary transition-all">
                  →
                </span>
              </a>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
