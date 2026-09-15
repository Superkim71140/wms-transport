# WMS TRANSPORT Performance & Navbar Audit

## 1. Development Mode vs. Production Mode Navigation
- **Cold Navigation (Dev)**: In Next.js Development mode, pages are compiled on-demand. When navigating to `/service/phuket` for the first time, Turbopack compiles the route, taking several seconds. 
- **Warm Navigation (Dev)**: Subsequent navigations to the same route are much faster as the route is cached.
- **Production Mode**: `service/[province]/page.tsx` utilizes `generateStaticParams` (`SSG`). In production, navigating between provinces is instantaneous because pages are pre-rendered as static HTML. The user should not conflate dev-time compilation latency with production performance.

## 2. Repeated Navbar Mounting Behavior
Currently, `Navbar` is imported and mounted directly inside individual page components (`src/app/page.tsx` and `src/app/service/[province]/page.tsx`).
- **Impact**: When a user navigates from the homepage to a province page, the Next.js App Router entirely unmounts the old page (including its Navbar) and mounts the new page (with a new Navbar). This destroys Navbar state (e.g., mobile menu state) and forces client hydration to restart on every route change.
- **Solution**: Move `Navbar` and `Footer` into a shared layout group (`src/app/(marketing)/layout.tsx`) so they persist across navigations.

## 3. Main-Thread Stress: Polling & Event Listeners
- **Polling**: `Navbar.tsx` uses `setInterval(handleHashChange, 500)`. This forces a re-render cycle every 500ms on the main thread, wasting CPU and battery life, and causing hydration/main-thread bottlenecks.
- **Scroll Listeners**: The scroll event listener in `Navbar.tsx` is passive, but it directly sets state without debouncing or `requestAnimationFrame`. It also doesn't check if the state *actually* changed before calling `setIsScrolled`.

## 4. GPU, Compositing & Paint Costs
- **Excessive Blur**: Public pages rely heavily on fixed `blur-[150px]`, `blur-[200px]`, and `blur-[250px]` elements. In `src/app/service/[province]/page.tsx`, these huge blurred elements are positioned as `fixed inset-0`, forcing the GPU to re-composite the blurred layers on every scroll frame.
- **Stacked Backdrops**: There are numerous elements using `backdrop-blur-xl` and `backdrop-blur-md` overlaid on top of each other.
- **Solution**: Replace the `fixed` blurred backgrounds with static radial gradients using CSS, or move them to `absolute` positioning within `contain: paint` boundaries. Use lightweight opacity/transform animations instead of infinite shadow pulses where possible.

## 5. Client Hydration Boundaries
- `Navbar.tsx`: correctly uses `"use client"`.
- `SocialProofPopup.tsx`: correctly uses `"use client"`.
- `FloatingLine.tsx`: correctly uses `"use client"`.
- `TransitTimeVisualizer.tsx`: Unnecessarily uses `"use client"`. It contains purely static data mapping based on the `province` prop and renders UI. It can be converted to a Server Component, eliminating its JS payload entirely.
- **Dynamic Imports**: `page.tsx` correctly dynamically imports large components (`ServiceMap`, `ServiceSteps`, `CustomerReviews`, `DecisionAnswerSurface`), offloading initial server bundle size. 

## 6. CSS / Tailwind v4 Canonical Cleanups
There are numerous legacy arbitrary values and deprecations in the codebase:
- `bg-gradient-to-r` → `bg-linear-to-r` (Tailwind v4 syntax)
- `bg-gradient-to-b` → `bg-linear-to-b`
- Arbitrary opacities like `bg-white/[0.02]` → `bg-white/2`
- `aspect-[4/5]` → `aspect-4/5`
- `flex-grow` → `grow`

## 7. Navbar Hairline Sweep Animation
- `globals.css` defines `@keyframes wms-hairline-sweep`, but it is currently unutilized in `Navbar.tsx`.
- The audit confirms the need to create a dedicated `aria-hidden="true"` element inside the Navbar, pinned to the top, utilizing `transform: scaleX()` with a subtle, premium easing curve.

## 8. SEO & Schema Safety
- **Conflict**: `src/app/layout.tsx` injects a massive legacy `schemaObject` (`MovingCompany`) directly into the `<head>`, while also rendering `<EntityGraphSchema />`. 
- **Solution**: We must analyze `<EntityGraphSchema />` to determine the definitive source of truth and eliminate any duplicate `MovingCompany` / `Organization` / `LocalBusiness` JSON-LD scripts to prevent confusing search engine bots.
