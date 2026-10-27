"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const TARGET_PRICING_ROUTES = new Set([
  "/pricing",
  "/pricing/freight",
  "/pricing/motorcycle-transport",
  "/pricing/moving",
]);

/**
 * Client-side URL cleanup component for the four core pricing routes.
 *
 * If an incoming visitor arrives with external ChatGPT attribution parameters
 * (?utm_source=chatgpt.com or ?utm_source=chatgpt), this component cleanly
 * removes only that parameter from the visible address bar using window.history.replaceState.
 *
 * Preserves:
 * - Clean canonical pathname
 * - All legitimate campaign parameters (e.g. Google Ads gclid, gbraid, wbraid, utm_medium, etc.)
 * - Genuine non-ChatGPT utm_source values (e.g. google, facebook)
 * - Hash fragments (#...)
 * - Existing window.history.state
 *
 * Does NOT reload the page, trigger SPA navigation, or fire duplicate GA4 pageviews.
 */
export default function PricingUrlCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const normalizedPath = pathname ? pathname.replace(/\/$/, "") : "";
    if (!TARGET_PRICING_ROUTES.has(normalizedPath)) return;

    try {
      const currentUrl = new URL(window.location.href);
      const utmSource = currentUrl.searchParams.get("utm_source");

      if (utmSource === "chatgpt.com" || utmSource === "chatgpt") {
        currentUrl.searchParams.delete("utm_source");
        const cleanSearch = currentUrl.searchParams.toString();
        const newUrl = `${currentUrl.pathname}${cleanSearch ? `?${cleanSearch}` : ""}${currentUrl.hash}`;
        window.history.replaceState(window.history.state, "", newUrl);
      }
    } catch {
      // Safe no-op on invalid URL parsing
    }
  }, [pathname]);

  return null;
}
