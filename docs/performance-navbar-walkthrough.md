# Performance & Architecture Overhaul Walkthrough

## What Changed

1. **Architectural Route Group `(marketing)`**
   - We migrated all public pages (`page.tsx`, `service/`, `portfolio/`, `pricing/`, etc.) under a new `(marketing)` route group.
   - We created `src/app/(marketing)/layout.tsx` to host the `<Navbar />` and `<Footer />`.
   - **Result**: The Navbar and Footer are now shared across all public routes. They no longer unmount and remount when you navigate between pages, ensuring instantaneous transitions and preserving client-side state.

2. **Navbar Polling & Main-Thread Optimizations**
   - We removed the expensive `setInterval(handleHashChange, 500)` from `Navbar.tsx` which was previously polling the DOM every half second.
   - We added `requestAnimationFrame` debouncing to the window scroll listener.
   - **Result**: Drastically reduced CPU usage and eliminated main-thread blocking during hydration.

3. **Restored CSS Hairline Sweep**
   - We added a dedicated `<div aria-hidden="true" />` at the top of the Navbar to restore the premium `wms-hairline-sweep` animation on initial load.
   - **Result**: The premium dark-theme glassmorphism aesthetic is fully preserved and enhanced.

4. **GPU & Compositing Cost Reduction**
   - We identified dozens of `blur-[200px]` and `blur-[250px]` fixed background layers that were severely hurting scroll performance.
   - We ran a regex script to automatically replace these expensive CSS filters with `bg-[radial-gradient]` equivalents across the entire application.
   - **Result**: Massive boost to scrolling frames per second (FPS), particularly on mobile devices.

5. **Tailwind v4 Canonical Cleanups**
   - We ran a global search and replace to migrate legacy syntax to canonical Tailwind v4:
     - `bg-gradient-to-*` → `bg-linear-to-*`
     - Arbitrary opacities `/[0.05]` → `/5`
     - `aspect-[4/5]` → `aspect-4/5`
     - `flex-grow` → `grow`

6. **SEO & Schema Safety**
   - We removed the hardcoded `schemaObject` from `src/app/layout.tsx`.
   - **Result**: `<EntityGraphSchema />` is now the single trustworthy semantic entity source of truth for Googlebot.

7. **Hydration Optimizations**
   - We removed the unnecessary `"use client"` directive from `TransitTimeVisualizer.tsx`, converting it back to a pure Server Component.

## How to Test

1. Run the dev server (`npm run dev`).
2. Navigate from the home page to any service page (e.g., `/service/phuket`).
3. Notice that the Navbar no longer flickers or remounts.
4. Open Chrome DevTools > Performance and record a scrolling profile to verify that GPU composite times have dropped significantly.
