/**
 * WMS Entity & Provenance Graph
 * Generates stable JSON-LD @id canonical identifiers for the WMS Transport graph.
 * This establishes one consistent organization identity across the entire site.
 */

import { siteConfig } from "./site-config";

// Enforce stable canonical production domain to protect Entity IDs from preview environment overrides
const PRODUCTION_DOMAIN = siteConfig.productionUrl;

export const entityGraph = {
  organization: `${PRODUCTION_DOMAIN}/#organization`,
  movingCompany: `${PRODUCTION_DOMAIN}/#moving-company`,
  website: `${PRODUCTION_DOMAIN}/#website`,
  webpage: (path: string) => `${PRODUCTION_DOMAIN}${path.startsWith('/') ? path : `/${path}`}#webpage`,
  service: (serviceId: string) => `${PRODUCTION_DOMAIN}/service/${serviceId}#service`,
  provinceHub: (provinceId: string) => `${PRODUCTION_DOMAIN}/service/${provinceId}#hub`,
  route: (from: string, to: string) => `${PRODUCTION_DOMAIN}/route/${from}/${to}#route`,
  portfolio: (id: string) => `${PRODUCTION_DOMAIN}/portfolio/${id}#evidence`,
  logo: `${PRODUCTION_DOMAIN}${siteConfig.logoUrl}`,
  socials: siteConfig.socials
};

/**
 * Utility to safely escape JSON-LD strings.
 * Mitigates XSS risks in dynamically injected schema.
 */
export function escapeJsonLd(str: string): string {
  if (!str) return str;
  return str.replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}
