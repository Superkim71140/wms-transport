"use client";

import { useEffect } from "react";

/**
 * HashNavigationHandler
 * Ensures that if a URL anchor points to an element inside or on a native <details> disclosure,
 * that disclosure automatically opens prior to scrolling, and respects sticky header offset.
 */
export default function HashNavigationHandler() {
  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash;
      if (!hash) return;
      try {
        const target = document.querySelector(hash);
        if (target) {
          if (target instanceof HTMLDetailsElement) {
            target.open = true;
          }
          let parent = target.parentElement;
          while (parent) {
            if (parent instanceof HTMLDetailsElement) {
              parent.open = true;
            }
            parent = parent.parentElement;
          }
          // Slight timeout to let layout settle after opening disclosure
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 50);
        }
      } catch {
        // Ignore malformed hash selectors
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return null;
}
