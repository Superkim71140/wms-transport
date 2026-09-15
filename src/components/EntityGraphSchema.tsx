import { buildOrganizationSchema, buildWebSiteSchema, escapeJsonLd } from "@/lib/seo/schema";

export default function EntityGraphSchema() {
  const orgSchema = buildOrganizationSchema();
  const websiteSchema = buildWebSiteSchema();

  // Safe serialization mitigating XSS
  const safeJsonLd = escapeJsonLd(JSON.stringify([orgSchema, websiteSchema]));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd }}
    />
  );
}
