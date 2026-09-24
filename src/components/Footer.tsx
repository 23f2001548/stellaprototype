"use client";

import { InstagramLogo, FacebookLogo, ArrowUpRight } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
        }
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-bg-primary pt-20 md:pt-32 pb-12 relative overflow-hidden border-t border-border-subtle">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          <div className="lg:col-span-2 max-w-sm">
            <h3 className="font-display text-3xl text-text-primary mb-6">Join the List.</h3>
            <p className="text-text-secondary font-light mb-6">
              Subscribe for priority access to private events, secret tasting menus, and guest DJ list drops.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-bg-secondary border border-border-subtle rounded-full px-6 py-3 text-sm focus:outline-none focus:border-accent-amber text-text-primary w-full transition-colors"
              />
              <button className="bg-accent-amber text-bg-primary px-6 rounded-full font-medium text-sm hover:bg-accent-gold transition-colors">
                Join
              </button>
            </form>
          </div>

          <div>
            <h4 className="font-eyebrow text-xs text-text-muted mb-6">Location</h4>
            <address className="not-italic text-text-secondary font-light flex flex-col gap-2">
              <span className="text-text-primary font-medium">Stella — The Land of Ale</span>
              <span>8th Floor, Akash Mall</span>
              <span>Aerodrome Circle, Ramchandrapura</span>
              <span>Kota, Rajasthan 324007</span>
            </address>
          </div>

          <div>
            <h4 className="font-eyebrow text-xs text-text-muted mb-6">Contact & Social</h4>
            <div className="flex flex-col gap-4 text-text-secondary font-light">
              <a href="tel:+919001711617" className="hover:text-accent-amber transition-colors flex items-center gap-2 w-fit group">
                +91 90017 11617
                <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
              <div className="flex gap-4 mt-2">
                <a href="https://instagram.com/stellakotaa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center hover:border-accent-amber hover:text-accent-amber transition-colors">
                  <InstagramLogo size={20} />
                </a>
                <a href="https://facebook.com/stellathelandofale" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border-subtle flex items-center justify-center hover:border-accent-amber hover:text-accent-amber transition-colors">
                  <FacebookLogo size={20} />
                </a>
              </div>
            </div>
          </div>
          
        </div>

        {/* Massive Logo */}
        <div className="w-full overflow-hidden border-b border-border-subtle pb-8 mb-8">
          <h2 ref={logoRef} className="font-display text-[15vw] leading-[0.75] text-text-primary text-center tracking-tighter">
            STELLA
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-eyebrow text-text-muted">
          <div>© {new Date().getFullYear()} Stella Rooftop Bar. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-primary transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
