# WMS TRANSPORT: Deployment, Monitoring & Rollback Plan

## 1. Deployment Guardrails

> [!IMPORTANT]
> **NO AUTOMATIC DEPLOYMENT WAS PERFORMED.**
> In accordance with safety rules, all changes have been implemented, validated, and documented locally. Production deployment must only be initiated after human owner review and explicit approval.

---

## 2. Pre-Deployment Verification Checklist

Before deploying changes to production, the owner/lead developer must verify:

- [ ] `node tools/verify-seo-data.js` passes with 0 errors (`npm run seo:verify`).
- [ ] `npx tsc --noEmit` completes with 0 type errors.
- [ ] Environment variable `NEXT_PUBLIC_SITE_URL` is set to `https://wms-transport.com` on the production hosting environment (e.g. Vercel).
- [ ] Google Search Console verification token matches `XBZroDGp_kA28tbvOnFUymh1DsDybkbicMoyPmsQ8JY`.
- [ ] No unconfirmed business data or reference tokens exist in production builds.

---

## 3. Step-by-Step Deployment Procedure

1. **Review Git Staging:**
   Run `git status --short` to inspect all staged and modified files.
2. **Commit Changes on Dedicated Branch:**
   ```bash
   git add src/lib/seo/ src/components/Breadcrumbs.tsx src/components/InternalLinks.tsx src/app/robots.ts src/app/sitemap.ts src/app/layout.tsx tools/ docs/ package.json
   git commit -m "feat(seo): implement adapted central SEO architecture and validation suite"
   ```
3. **Trigger Production Build:**
   Deploy through your established CI/CD pipeline or Vercel dashboard.
4. **Inspect Live Production Headers & Robots:**
   - Verify `https://wms-transport.com/robots.txt` returns `HTTP 200` with `Disallow: /dashboard/`.
   - Verify `https://wms-transport.com/sitemap.xml` returns `HTTP 200` with valid XML URLs.
   - Inspect `<head>` of `https://wms-transport.com/` for `<link rel="canonical" href="https://wms-transport.com">` and valid JSON-LD.

---

## 4. Post-Deployment Monitoring & Telemetry

### 24 to 48 Hours Post-Launch:
1. **Google Search Console Indexing:**
   - Submit updated `https://wms-transport.com/sitemap.xml` in Search Console.
   - Request URL Inspection for high-priority pages: `/`, `/pricing/moving`, `/pricing/motorcycle-transport`, `/service/samutsakhon`.
2. **Crawl & 404 Error Tracking:**
   - Monitor the "Pages" index coverage report in Search Console.
   - Ensure zero 404 / 500 spikes.
3. **Structured Data Validation:**
   - Test live URLs using Google's [Rich Results Test](https://search.google.com/test/rich-results).
   - Confirm `Organization`, `LocalBusiness`, and `BreadcrumbList` schemas are recognized without errors.

---

## 5. Rollback Procedures & Contingency

### Scenario A: Minor Metadata or Configuration Issue
- Edit `src/lib/seo/site-config.ts` or `src/lib/seo/metadata.ts`.
- Re-run `npm run seo:verify`.
- Push immediate fix patch.

### Scenario B: Unexpected Indexation or Routing Regression
If unexpected URL errors occur post-deploy:
1. **Revert Git Commit:**
   ```bash
   git revert HEAD
   git push origin main
   ```
2. **Emergency Fallback in Vercel:**
   - In Vercel Deployment history, locate the previous stable deployment.
   - Click "Instant Rollback" to restore the previous production bundle in < 1 minute.
3. **Preservation Guarantee:**
   - Since all original WMS datasets and dynamic routing components remain intact, rolling back restores the exact baseline without database or asset loss.
