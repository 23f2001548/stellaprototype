"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      duration: 1.4,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Expose lenis globally for GSAP integration
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
