"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const slides: Slide[] = [
  {
    src: "/wms-transport-page.png",
    alt: "WMS TRANSPORT รถกระบะตู้ทึบรับจ้าง ขนส่งมอเตอร์ไซค์ และบริการย้ายบ้าน ย้ายคอนโดทั่วไทย",
    width: 1745,
    height: 901,
  },
  {
    src: "/wms-transport-page-1.png",
    alt: "WMS TRANSPORT บริการขนส่งสินค้า ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ และย้ายหอพัก พร้อมคนช่วยยกของ",
    width: 1774,
    height: 887,
  },
];

export default function HeroImageCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadSecondary, setLoadSecondary] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Defer secondary slides until browser is completely idle or after a generous delay
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("requestIdleCallback" in window) {
      const handle = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => setLoadSecondary(true),
        { timeout: 5000 }
      );
      return () => {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
      };
    } else {
      const timer = setTimeout(() => setLoadSecondary(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Trigger secondary slide immediately upon any user engagement
  const ensureSecondaryLoaded = useCallback(() => {
    setLoadSecondary(true);
  }, []);

  const nextSlide = useCallback(() => {
    ensureSecondaryLoaded();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [ensureSecondaryLoaded]);

  const prevSlide = useCallback(() => {
    ensureSecondaryLoaded();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [ensureSecondaryLoaded]);

  const goToSlide = useCallback((index: number) => {
    ensureSecondaryLoaded();
    setCurrentSlide(index);
  }, [ensureSecondaryLoaded]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    ensureSecondaryLoaded();
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const swipeThreshold = 40;

    if (diff > swipeThreshold) {
      nextSlide();
    } else if (diff < -swipeThreshold) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    ensureSecondaryLoaded();
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    }
  };

  return (
    <section
      aria-label="โปรโมชั่นและบริการ WMS TRANSPORT"
      aria-roledescription="carousel"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-2"
      onMouseEnter={ensureSecondaryLoaded}
      onFocus={ensureSecondaryLoaded}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
    >
      <div className="relative w-full rounded-2xl border border-slate-200/90 bg-slate-50/70 shadow-xs overflow-hidden select-none">
        {/* Aspect ratio container for artwork */}
        <div className="relative w-full aspect-16/10 sm:aspect-video lg:aspect-[1.95/1] max-h-135 bg-white flex items-center justify-center">
          {slides.map((slide, index) => {
            const isActive = currentSlide === index;
            // Never mount secondary slide until idle or explicit user interaction to avoid network competition
            if (index > 0 && !loadSecondary) {
              return null;
            }

            return (
              <div
                key={slide.src}
                className={`absolute inset-0 w-full h-full flex items-center justify-center motion-reduce:transition-none transition-opacity duration-400 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
                aria-hidden={!isActive}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1280px"
                  className="object-contain"
                  quality={80}
                />
              </div>
            );
          })}

          {/* Left Arrow Navigation Button (min 44x44px touch target) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            aria-label="สไลด์ก่อนหน้า"
            className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-blue-600 shadow-md border border-slate-200/90 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Right Arrow Navigation Button (min 44x44px touch target) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            aria-label="สไลด์ถัดไป"
            className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/95 hover:bg-white text-slate-800 hover:text-blue-600 shadow-md border border-slate-200/90 transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Pagination Indicators */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-xs">
            {slides.map((_, index) => {
              const isActive = currentSlide === index;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToSlide(index);
                  }}
                  aria-label={`ไปยังสไลด์ที่ ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className="min-w-11 min-h-11 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                >
                  <span
                    className={`block h-2 rounded-full motion-reduce:transition-none transition-all duration-300 ${
                      isActive ? "w-8 bg-blue-500 shadow-xs" : "w-2.5 bg-white/75 hover:bg-white"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Screen reader polite announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        สไลด์ที่ {currentSlide + 1} จาก {slides.length}
      </div>
    </section>
  );
}
