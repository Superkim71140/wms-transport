"use client";

import { useEffect } from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  gaMeasurementId?: string;
}

type GtagFunction = (...args: unknown[]) => void;

/**
 * Dedicated WMS GA4 Analytics Integration & Interaction Listener
 * 
 * Note: GA4 is measurement and observability infrastructure, NOT a direct search ranking factor.
 * Only initializes external scripts if a valid NEXT_PUBLIC_GA_MEASUREMENT_ID is configured in environment.
 * If absent, all helper methods safely no-op without client errors.
 */
export default function GoogleAnalytics({ gaMeasurementId }: GoogleAnalyticsProps) {
  const measurementId = gaMeasurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const isConfigured = Boolean(
    measurementId && 
    measurementId.trim() !== "" && 
    !measurementId.startsWith("G-XXXXX")
  );

  useEffect(() => {
    if (typeof window === "undefined" || !isConfigured) return;

    // Delegated click listener for telephone, LINE, and quotation actions
    const handleGlobalClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href") || "";

      // 1. Phone link click
      if (href.startsWith("tel:")) {
        trackPhoneClick(href.replace("tel:", "").trim());
        return;
      }

      // 2. LINE contact click
      if (href.includes("line.me")) {
        trackLineClick(href);
        return;
      }

      // 3. Real quotation start action
      if (
        target.getAttribute("data-analytics") === "quote-start" ||
        target.getAttribute("id") === "quote-calculator" ||
        (target.tagName === "BUTTON" && (target.textContent?.includes("คำนวณ") || target.textContent?.includes("เช็กราคา")))
      ) {
        trackQuoteAction("start", { label: target.textContent?.trim() || "quote_start_button" });
      }
    };

    // 4. Real verified quotation submission success
    // Only fires if a genuine form submission event was completed
    const handleQuoteSuccess = (event: Event) => {
      const customEvent = event as CustomEvent<Record<string, string>>;
      trackQuoteAction("submit_success", customEvent.detail || {});
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    window.addEventListener("wms_quote_success", handleQuoteSuccess);

    return () => {
      window.removeEventListener("click", handleGlobalClick, { capture: true });
      window.removeEventListener("wms_quote_success", handleQuoteSuccess);
    };
  }, [isConfigured]);

  if (!isConfigured) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Meaningful Conversion Event Helpers
 * Fire only on confirmed user actions (phone call, LINE click, quote form submission).
 */
export function trackPhoneClick(phoneNumber: string = "general") {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: GtagFunction }).gtag === "function") {
    (window as unknown as { gtag: GtagFunction }).gtag("event", "contact_phone_click", {
      event_category: "Engagement",
      event_label: phoneNumber,
    });
  }
}

export function trackLineClick(lineUrl: string = "general") {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: GtagFunction }).gtag === "function") {
    (window as unknown as { gtag: GtagFunction }).gtag("event", "contact_line_click", {
      event_category: "Engagement",
      event_label: lineUrl,
    });
  }
}

export function trackQuoteAction(action: "start" | "submit_success", details?: Record<string, string>) {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: GtagFunction }).gtag === "function") {
    (window as unknown as { gtag: GtagFunction }).gtag("event", action === "submit_success" ? "quote_submit_success" : "quote_start", {
      event_category: "Conversion",
      ...details,
    });
  }
}
