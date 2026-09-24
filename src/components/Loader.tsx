"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "";
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg-primary"
          initial={{ y: 0 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="overflow-hidden">
            <motion.h1
              className="font-[var(--font-display)] text-5xl md:text-7xl font-bold tracking-tighter text-accent-amber uppercase"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            >
              Stella
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-2">
            <motion.p
              className="text-xs md:text-sm tracking-[0.3em] uppercase text-accent-amber font-medium"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            >
              The Land of Ale
            </motion.p>
          </div>
          <motion.div 
            className="absolute bottom-10 h-0.5 bg-accent-gold"
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
