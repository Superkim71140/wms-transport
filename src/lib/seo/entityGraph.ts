/**
 * WMS Entity & Provenance Graph
 * Generates stable JSON-LD @id canonical identifiers for the WMS Transport graph.
 * This establishes one consistent organization identity across the entire site.
 */

const DOMAIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://wms-transport.com").trim().replace(/\/$/, "");

export const entityGraph = {
  organization: `${DOMAIN}/#organization`,
  website: `${DOMAIN}/#website`,
  webpage: (path: string) => `${DOMAIN}${path}#webpage`,
  service: (serviceId: string) => `${DOMAIN}/service/${serviceId}#service`,
  provinceHub: (provinceId: string) => `${DOMAIN}/service/${provinceId}#hub`,
  route: (from: string, to: string) => `${DOMAIN}/route/${from}/${to}#route`,
  portfolio: (id: string) => `${DOMAIN}/portfolio/${id}#evidence`,
  logo: `${DOMAIN}/images/logoWMS.webp`,
  socials: [
    "https://www.facebook.com/wmstransport",
    "https://line.me/ti/p/DtICkMaDet"
  ]
};

/**
 * Utility to safely escape JSON-LD strings.
 * Mitigates XSS risks in dynamically injected schema.
 */
export function escapeJsonLd(str: string): string {
  if (!str) return str;
  return str.replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}
