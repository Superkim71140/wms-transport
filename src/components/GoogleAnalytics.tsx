"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

interface GoogleAnalyticsProps {
  gaMeasurementId?: string;
  googleAdsId?: string;
}

type GtagFunction = (...args: unknown[]) => void;

const DEFAULT_GOOGLE_ADS_ID = "AW-18500288022";
const DEFAULT_PHONE_CONVERSION_LABEL = "U5xQCNCH_ZsdEJb8z_VE";

/**
 * Validates and sanitizes a Google Analytics 4 Measurement ID (e.g. G-XXXXXXXXXX)
 */
export function getValidGaId(id?: string): string | null {
  const trimmed = (id || "").trim();
  if (!trimmed || trimmed.startsWith("G-XXXXX") || !/^G-[A-Za-z0-9]+$/i.test(trimmed)) {
    return null;
  }
  return trimmed;
}

/**
 * Validates and normalizes a Google Ads Tag ID (e.g. AW-XXXXXXXXXX or numeric ID)
 */
export function getValidAdsId(id?: string): string | null {
  let trimmed = (id || "").trim();
  if (!trimmed || trimmed.includes("XXXXX")) {
    return null;
  }
  if (/^[0-9]+$/.test(trimmed)) {
    trimmed = `AW-${trimmed}`;
  }
  if (!/^AW-[0-9]+$/i.test(trimmed)) {
    return null;
  }
  return trimmed;
}

/**
 * Resolves a full Google Ads conversion send_to string (e.g. AW-XXXXXXXXXX/AbCdEfGhIjK)
 */
export function getConversionSendTo(adsId: string, labelEnv?: string): string | null {
  const trimmed = (labelEnv || "").trim();
  if (!trimmed || trimmed.includes("XXXXX")) return null;
  if (trimmed.includes("/")) return trimmed;
  return `${adsId}/${trimmed}`;
}

/**
 * Strips PII (Personally Identifiable Information) before passing parameters to analytics
 */
export function sanitizeEventDetails(details?: Record<string, unknown>): Record<string, unknown> {
  if (!details || typeof details !== "object") return {};
  const forbiddenSubstrings = [
    "name",
    "phone",
    "tel",
    "mobile",
    "email",
    "message",
    "address",
    "note",
    "comment",
    "password",
  ];
  const safe: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(details)) {
    const lowerKey = key.toLowerCase();
    const isForbiddenKey = forbiddenSubstrings.some((sub) => lowerKey.includes(sub));
    if (!isForbiddenKey && (typeof value === "string" || typeof value === "number" || typeof value === "boolean")) {
      const strVal = String(value);
      // Omit if value resembles email address or phone sequence
      if (strVal.includes("@") || /^[+]?[0-9\s-]{8,20}$/.test(strVal.trim())) {
        continue;
      }
      safe[key] = value;
    }
  }
  return safe;
}

/**
 * Unified Google Tag (gtag.js) Integration for WMS TRANSPORT
 * 
 * Supports:
 * - Google Analytics 4 (GA4) via NEXT_PUBLIC_GA_MEASUREMENT_ID
 * - Google Ads Measurement via NEXT_PUBLIC_GOOGLE_ADS_ID (defaults to verified AW-18500288022)
 * - Single gtag loader script without duplicate requests or overwriting window.dataLayer
 * - Accurate SPA client navigation page views (prevents duplicate initial mount views)
 * - Delegated click tracking for telephone and LINE contact links (contact-intent events)
 * - Custom event listener for verified quotation submission (wms_quote_success)
 * - Dual conversion routing support: GA4 Key Event Import (default) or Direct Google Ads Conversions
 * - Strictly strips PII and prevents double counting
 */
export default function GoogleAnalytics({ gaMeasurementId, googleAdsId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  const validGaId = getValidGaId(gaMeasurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  const validAdsId = getValidAdsId(googleAdsId || process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) || DEFAULT_GOOGLE_ADS_ID;

  const isConfigured = Boolean(validGaId || validAdsId);
  const primaryId = validAdsId || validGaId || "";

  // Client-side SPA navigation tracking (skips initial mount to avoid duplicate pageview)
  useEffect(() => {
    if (!isConfigured) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: GtagFunction }).gtag === "function") {
      const gtag = (window as unknown as { gtag: GtagFunction }).gtag;
      const pageParams = {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      };

      if (validGaId) {
        gtag("event", "page_view", {
          ...pageParams,
          send_to: validGaId,
        });
      }

      if (validAdsId) {
        gtag("event", "page_view", {
          ...pageParams,
          send_to: validAdsId,
        });
      }
    }
  }, [pathname, isConfigured, validGaId, validAdsId]);

  useEffect(() => {
    if (typeof window === "undefined" || !isConfigured) return;

    // Delegated click listener for telephone, LINE, and quotation actions
    const handleGlobalClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href") || "";

      // 1. Phone link click (Intent to call; not confirmed booking or completed call)
      if (href.startsWith("tel:")) {
        trackPhoneClick();
        return;
      }

      // 2. LINE contact click (Intent to message; not confirmed booking or conversation)
      if (href.includes("line.me")) {
        trackLineClick();
        return;
      }

      // 3. Quotation start action
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
      const customEvent = event as CustomEvent<Record<string, unknown>>;
      trackQuoteSuccess(customEvent.detail || {});
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    window.addEventListener("wms_quote_success", handleQuoteSuccess);

    return () => {
      window.removeEventListener("click", handleGlobalClick, { capture: true });
      window.removeEventListener("wms_quote_success", handleQuoteSuccess);
    };
  }, [isConfigured, validAdsId]);

  if (!isConfigured) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
      />
      <Script
        id="google-tag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            ${validGaId ? `gtag('config', '${validGaId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });` : ""}
            ${validAdsId ? `gtag('config', '${validAdsId}');` : ""}
          `,
        }}
      />
    </>
  );
}

/**
 * Meaningful Conversion & Interaction Event Helpers
 * Fire only on confirmed user actions (phone call intent, LINE click intent, quote form submission).
 */
export function trackPhoneClick(_deprecatedLabel?: string) {
  void _deprecatedLabel;
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: GtagFunction }).gtag === "function") {
    const gtag = (window as unknown as { gtag: GtagFunction }).gtag;
    gtag("event", "contact_phone_click", {
      event_category: "Engagement",
      event_label: "phone_call_intent",
    });

    const adsId = getValidAdsId(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) || DEFAULT_GOOGLE_ADS_ID;
    if (adsId) {
      const phoneLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL || DEFAULT_PHONE_CONVERSION_LABEL;
      const directSendTo = getConversionSendTo(adsId, phoneLabel);
      if (directSendTo) {
        gtag("event", "conversion", {
          send_to: directSendTo,
        });
      }
    }
  }
}

export function trackLineClick(_deprecatedLabel?: string) {
  void _deprecatedLabel;
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: GtagFunction }).gtag === "function") {
    const gtag = (window as unknown as { gtag: GtagFunction }).gtag;
    gtag("event", "contact_line_click", {
      event_category: "Engagement",
      event_label: "line_contact_intent",
    });

    const adsId = getValidAdsId(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) || DEFAULT_GOOGLE_ADS_ID;
    if (adsId) {
      const directSendTo = getConversionSendTo(adsId, process.env.NEXT_PUBLIC_GOOGLE_ADS_LINE_CONVERSION_LABEL);
      if (directSendTo) {
        gtag("event", "conversion", {
          send_to: directSendTo,
        });
      }
    }
  }
}

export function trackQuoteSuccess(details?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: GtagFunction }).gtag === "function") {
    const gtag = (window as unknown as { gtag: GtagFunction }).gtag;
    const safeParams = sanitizeEventDetails(details);

    gtag("event", "wms_quote_success", {
      event_category: "Conversion",
      ...safeParams,
    });

    const adsId = getValidAdsId(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) || DEFAULT_GOOGLE_ADS_ID;
    if (adsId) {
      const directSendTo = getConversionSendTo(adsId, process.env.NEXT_PUBLIC_GOOGLE_ADS_QUOTE_CONVERSION_LABEL);
      if (directSendTo) {
        gtag("event", "conversion", {
          send_to: directSendTo,
        });
      }
    }
  }
}

export function trackQuoteAction(action: "start" | "submit_success", details?: Record<string, unknown>) {
  if (action === "submit_success") {
    trackQuoteSuccess(details);
    return;
  }
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: GtagFunction }).gtag === "function") {
    const safeParams = sanitizeEventDetails(details);
    (window as unknown as { gtag: GtagFunction }).gtag("event", "quote_start", {
      event_category: "Conversion",
      ...safeParams,
    });
  }
}
