import { entityGraph, escapeJsonLd } from "@/lib/seo/entityGraph";

export default function EntityGraphSchema() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": entityGraph.organization,
    "name": "WMS Transport",
    "url": entityGraph.website.split('#')[0],
    "logo": entityGraph.logo,
    "sameAs": entityGraph.socials,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+66-61-240-2436",
      "contactType": "customer service",
      "areaServed": "TH",
      "availableLanguage": "Thai"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": entityGraph.website,
    "url": entityGraph.website.split('#')[0],
    "name": "WMS Transport",
    "publisher": {
      "@id": entityGraph.organization
    }
  };

  // Safe serialization mitigating XSS
  const safeJsonLd = escapeJsonLd(JSON.stringify([orgSchema, websiteSchema]));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd }}
    />
  );
}
