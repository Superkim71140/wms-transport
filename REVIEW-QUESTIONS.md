# WMS SEO Monitor — Technical Review Questions & Open Decisions for ChatGPT

Dear ChatGPT / Reviewer,

The core implementation of the WMS SEO Monitor is completed, functionally verified (23/23 unit/integration tests passing), and secured with zero credential leakage. Below are key architectural and technical decisions for your inspection and strategic feedback:

---

## 1. Google Search Console URL Inspection API Quota Management
- **Context**: The Search Console URL Inspection API has a daily quota of 2,000 queries per property and ~600 requests per minute limit. WMS currently has 155 published URLs in the live dynamic sitemap (and growing as new service corridors expand).
- **Current Solution**: We implemented a **bounded resumable batch inspection** system (`POST /api/seo-monitor/inspect-batch`) that executes 10 URLs per batch with a 500ms pacing delay, prioritizing uninspected URLs first, then error URLs, then oldest inspected URLs.
- **Question for Reviewer**: Would you recommend introducing an automated background cron job (e.g. running once nightly to inspect 20-30 URLs per day until the entire sitemap is refreshed), or keeping inspection user-triggered on demand?

---

## 2. Serverless Storage Persistence vs Self-Contained Local Snapshots
- **Context**: On Vercel, the filesystem is ephemeral and container storage resets between cold starts or deployments.
- **Current Solution**: We established PostgreSQL as the authoritative production storage engine (`migrations/002_seo_monitor_schema.sql`). If `DATABASE_URL` is omitted on Vercel, the system issues an explicit `ephemeral_serverless_warning` rather than silently writing to temporary files.
- **Question for Reviewer**: Is there any additional fallback or caching pattern (such as Vercel Edge Config or Upstash Redis for lightweight key-value snapshots) that would complement the PostgreSQL architecture?

---

## 3. Handling Low-Traffic Pages in Core Web Vitals (CrUX)
- **Context**: The Chrome User Experience Report (CrUX) requires a minimum threshold of real-user visits before field data (LCP, CLS, INP) is populated. High-level regional hubs or district landing pages frequently have "No CrUX field data".
- **Current Solution**: We clearly distinguish between Lighthouse lab audits and CrUX real-user data. If CrUX data is absent, the dashboard reports `hasCruxData: false` and explicitly clarifies that missing field data does not represent a failure or passing status.
- **Question for Reviewer**: How do you recommend prioritizing page-level performance optimization between Lighthouse lab scores and origin-level aggregate CrUX data?

---

## 4. Query Cannibalization vs Intent Separation Heuristics
- **Context**: In `deriveAlertsAndOpportunities`, multiple URLs receiving impressions for the same search query are flagged as `query_overlap`. In local transport logistics, regional hub pages and district pages may naturally overlap for broader brand/service queries (e.g. "รถกระบะรับจ้าง ธนบุรี").
- **Question for Reviewer**: Would you recommend refining this heuristic to only flag cannibalization when two pages rank within positions 1-20 with comparable impression shares, rather than any impression co-occurrence?

