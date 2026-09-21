"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";
import Image from "next/image";

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll visibility handler (show after 300px)
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;
      setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  // Close on Escape key and return focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        staggerDirection: -1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.03,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 16,
      scale: shouldReduceMotion ? 1 : 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.2,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
      scale: shouldReduceMotion ? 1 : 0.9,
      transition: {
        duration: shouldReduceMotion ? 0.05 : 0.15,
        ease: "easeIn" as const,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.2 }}
          className="fixed z-[100] right-4 sm:right-6 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6 flex flex-col items-end gap-3 select-none"
        >
          {/* Contact Actions Stack */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="floating-contact-actions"
                role="group"
                aria-label="ช่องทางการติดต่อ"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col items-end gap-2.5"
              >
                {/* 1. Facebook/Messenger Button (Top) */}
                <motion.div variants={itemVariants}>
                  <a
                    href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    aria-label="ติดต่อ WMS Transport ทาง Facebook Messenger"
                    className="group relative flex items-center justify-center w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full bg-[#0084FF] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0084FF]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0B1F3A] text-white text-xs font-semibold shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150"
                    >
                      Messenger
                    </span>
                    <svg
                      className="w-6 h-6 fill-current text-white"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.914 1.455 5.518 3.735 7.209v3.533l3.39-1.86c.91.252 1.876.388 2.875.388 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.066 12.443l-2.58-2.753-5.034 2.753 5.538-5.882 2.646 2.753 4.968-2.753-5.538 5.882z" />
                    </svg>
                  </a>
                </motion.div>

                {/* 2. Telephone Button (Middle) */}
                <motion.div variants={itemVariants}>
                  <a
                    href="tel:0612402436"
                    onClick={() => setIsOpen(false)}
                    aria-label="โทรหา WMS Transport ที่เบอร์ 061-240-2436"
                    className="group relative flex items-center justify-center w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full bg-[#EF4444] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#EF4444]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0B1F3A] text-white text-xs font-semibold shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 font-sans"
                    >
                      โทร 061-240-2436
                    </span>
                    <Phone className="w-5 h-5 text-white" fill="currentColor" aria-hidden="true" />
                  </a>
                </motion.div>

                {/* 3. LINE Button (Bottom Contact Action) */}
                <motion.div variants={itemVariants}>
                  <a
                    href="https://line.me/ti/p/DtICkMaDet"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    aria-label="ติดต่อ WMS Transport ผ่าน LINE"
                    className="group relative flex items-center justify-center w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full bg-[#06C755] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#06C755]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#0B1F3A] text-white text-xs font-semibold shadow-md whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150"
                    >
                      LINE
                    </span>
                    <Image
                      src="/images/LINE_icon.webp"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain shrink-0"
                      aria-hidden="true"
                    />
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="floating-contact-actions"
            aria-label={
              isOpen
                ? "ปิดช่องทางติดต่อ WMS Transport"
                : "เปิดช่องทางติดต่อ WMS Transport"
            }
            className="relative flex items-center justify-center w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-full bg-gradient-to-br from-blue-600 to-[#0B1F3A] text-white shadow-xl shadow-blue-950/25 border border-white/20 hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 cursor-pointer"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.05 : 1 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              {isOpen ? (
                <X className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
              ) : (
                <MessageCircle
                  className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                  aria-hidden="true"
                />
              )}
            </motion.div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
