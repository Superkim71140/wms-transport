import {
  buildMovingCompanySchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
  escapeJsonLd,
} from "@/lib/seo/schema";

export default function EntityGraphSchema() {
  const orgSchema = buildOrganizationSchema();
  const movingCompanySchema = buildMovingCompanySchema();
  const websiteSchema = buildWebSiteSchema();

  // Safe serialization mitigating XSS with canonical root entity graph
  const safeJsonLd = escapeJsonLd(
    JSON.stringify([orgSchema, movingCompanySchema, websiteSchema])
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd }}
    />
  );
}
