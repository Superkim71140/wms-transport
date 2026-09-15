# WMS TRANSPORT: Required Business Information & Verification Checklist

## Status Legend
- `[CONFIRMED]`: Verified directly from active WMS TRANSPORT codebase and operational files.
- `[OWNER CONFIRMATION REQUIRED]`: Information currently unavailable or provisional; requires business owner sign-off before entering production Schema.

---

## 1. Legal Entity & Physical Presence

| Attribute | Current Value / Setting | Status | SEO & Schema Impact |
| :--- | :--- | :--- | :--- |
| **Brand Name** | `WMS TRANSPORT` | `[CONFIRMED]` | Used in Titles, OpenGraph, Breadcrumbs, and Brand Schemas. |
| **Legal Entity Name** | Provisional: `WMS TRANSPORT` | `[OWNER CONFIRMATION REQUIRED]` | Needed for `Organization.legalName` to establish formal legal entity trust. |
| **Registered Street Address** | Currently omitted / generalized to Krathum Baen / Mueang Samut Sakhon | `[OWNER CONFIRMATION REQUIRED]` | Critical for Google `LocalBusiness.address` and Google Business Profile (GBP) consistency. |
| **Subdistrict / District / Province** | Samut Sakhon (Postal Code: 74110) | `[CONFIRMED]` | Used for geographic area targeting. |
| **Geo-Coordinates (HQ / Hub)** | Latitude: `13.6558`, Longitude: `100.2783` (Regional center) | `[OWNER CONFIRMATION REQUIRED]` | Must precisely match Google Maps pin if a physical storefront/office exists. |
| **Tax ID / Business Registration** | Not currently visible on site | `[OWNER CONFIRMATION REQUIRED]` | Enhances B2B freight trustworthiness for factory cargo clients. |

---

## 2. Customer Contact Channels

| Attribute | Current Value / Setting | Status | Action Required |
| :--- | :--- | :--- | :--- |
| **Primary Telephone** | `061-240-2436` | `[CONFIRMED]` | Verified in Footer, Navbar, and Mobile CTAs. |
| **International Format** | `+66-61-240-2436` | `[CONFIRMED]` | Implemented in `siteConfig.phoneFormatted` and JSON-LD schema. |
| **Official Email** | `1999.kittinanwimonset@gmail.com` | `[CONFIRMED]` | Primary customer service and quotation email. |
| **LINE Contact URL** | `https://line.me/ti/p/DtICkMaDet` | `[CONFIRMED]` | Direct personal invite link currently active on site. |
| **LINE Official Account (OA) ID** | Not configured (Using personal invite) | `[OWNER CONFIRMATION REQUIRED]` | Recommended to upgrade to verified LINE OA (e.g. `@wmstransport`) for professional branding. |
| **Facebook Page** | `https://www.facebook.com/wmstransport` | `[CONFIRMED]` | Verified social profile in footer and entity graph. |

---

## 3. Operational Policies & Pricing Boundaries

| Attribute | Current Value / Setting | Status | Action Required |
| :--- | :--- | :--- | :--- |
| **Operating Hours** | 24 Hours every day (เปิดตลอด 24 ชม.) | `[CONFIRMED]` | Confirmed in Footer and schema `OpeningHoursSpecification`. |
| **Schema Price Range** | `฿1,000-฿25,000` | `[OWNER CONFIRMATION REQUIRED]` | Needs sign-off from owner on typical minimum/maximum transaction range. |
| **Insurance Coverage** | Mentioned up to 100,000 THB in footer badge | `[OWNER CONFIRMATION REQUIRED]` | Confirm terms of insurance coverage (e.g. deductible, carrier policy, covered damage). |
| **Helper Team Pricing** | Disclosed in pricing tables per room size | `[CONFIRMED]` | Consistent across `/pricing/moving`. |

---

## 4. Analytics & Webmaster Verification

| Tool | Current Setting | Status | Action Required |
| :--- | :--- | :--- | :--- |
| **Google Search Console** | Token: `XBZroDGp_kA28tbvOnFUymh1DsDybkbicMoyPmsQ8JY` | `[CONFIRMED]` | Active in `src/app/layout.tsx` and `site-config.ts`. Do not alter. |
| **GA4 Measurement ID** | Not hardcoded in layout; Partytown initialized | `[OWNER CONFIRMATION REQUIRED]` | Provide dedicated WMS GA4 ID (format: `G-XXXXXXXXXX`). Never reuse MJ-TH IDs. |
| **GTM Container ID** | None installed | `[OWNER CONFIRMATION REQUIRED]` | Optional. If installed, ensure it does not duplicate GA4 tracking. |

---

## 5. Absolute Claims & Compliance Rules

- **Removed Claims:** Any claims stating "ปลอดภัย 100%" or "ไม่มีรอยแน่นอน" have been flagged in validation scripts for owner review.
- **Recommended Copy:** "ขนย้ายด้วยความระมัดระวังสูงสุด พร้อมสายรัดนิรภัยและผ้านวม/พลาสติกแรปกันรอย".
