# Service-Confidence Banner Placement Report
**WMS TRANSPORT Update — Consolidated UX/UI Deliverable**  
**Date:** 2026-10-27  

---

## 1. Approved Asset & Headline
- **Approved Asset:** `/images/wms-transport-moving-service-banner.webp` (2172x724 WebP, clean URL-safe path, 173 KB).
- **Approved Headline:** “ขนย้ายทุกงาน มั่นใจได้ทุกเส้นทาง”
- **Supporting Copy:** “บริการรถกระบะตู้ทึบ ขนส่งมอเตอร์ไซค์ ย้ายบ้านและย้ายคอนโด พร้อมทีมยกของ ประเมินราคาชัดเจนก่อนจอง”
- **Primary CTA:** “ขอประเมินราคา” ➔ เชื่อมโยงไปยังฟอร์มประเมินราคาบนหน้า (`#quote-prep`)
- **Secondary CTA:** “ดูบริการทั้งหมด” ➔ เชื่อมโยงไปยัง `/#services`
- **Promotional Artwork Disclosure:** ระบุชัดเจนว่าเป็นภาพกราฟิกประชาสัมพันธ์ของ WMS TRANSPORT ดำเนินงานด้วยฟลีตรถตู้ทึบจริง

---

## 2. Placement Hierarchy Across Templates

### Template 1: District Landing Pages (`DistrictPageView.tsx` via `ServiceAreaLayout.tsx`)
**Order:**
1. Jump Navigation (`LocalPageJumpNav.tsx`)
2. Local Direct Answer Summary (`#services`)
3. Job-Type Selector (`JobTypeSelector.tsx`)
4. Transport & Route Table
5. Verified Case Proofs (`#evidence`)
6. Local Pickup & Loading Logistics
7. 4-Item Quotation Preparation Panel (`QuotationPlanner.tsx` with `InputWithIcon`)
8. **“ขนย้ายทุกงาน มั่นใจได้ทุกเส้นทาง” Banner** (rendered via `ServiceAreaLayout.tsx`)
9. **“ภาพรถและตัวอย่างผลงาน WMS TRANSPORT” Gallery** (`ServiceAreaWorkGallery.tsx`)
10. Neighboring Area Links
11. Local FAQs (`ServiceAreaFAQ.tsx`)
12. Redesigned 4-Column Footer (`Footer.tsx`)

### Template 2: Local Point Pages (`LocalPointView.tsx`)
**Order:**
1. Deep Navy Hero `#07152F` with `<figure>` and `<figcaption>`
2. In-Page Navigation
3. Local Logistics & Direct Answers
4. Quotation Preparation Panel (`QuotationPlanner.tsx`)
5. Pickup, Parking, and Access Guidance
6. **“ขนย้ายทุกงาน มั่นใจได้ทุกเส้นทาง” Banner** (`ServiceAreaQuoteBanner.tsx`)
7. **“ภาพตัวอย่างมาตรฐานรถและอุปกรณ์การขนส่ง WMS TRANSPORT” Gallery** (`#evidence`)
8. Nearby Local Points
9. Local FAQs
10. Redesigned 4-Column Footer

### Template 3: Zone Hubs (`ZoneHubView.tsx`)
**Order:**
1. Deep Navy Hero `#07152F` with `<figure>` and `<figcaption>`
2. Zone Overview & Service Highlights
3. Sub-Area Grid
4. Quotation Preparation Guide
5. Inter-Zone Transport Routes
6. **“ขนย้ายทุกงาน มั่นใจได้ทุกเส้นทาง” Banner** (`ServiceAreaQuoteBanner.tsx`)
7. **“ภาพตัวอย่างงานขนส่งจริง WMS TRANSPORT” Showcase** (`#evidence`)
8. Connected Neighboring Zones
9. Zone FAQs
10. Redesigned 4-Column Footer

### Template 4: Full Area Directory (`AreasDirectoryView.tsx`)
**Order:**
1. Deep Navy Hero `#07152F` with `<figure>` and `<figcaption>`
2. Priority Service Areas (7 Zones)
3. **“ขนย้ายทุกงาน มั่นใจได้ทุกเส้นทาง” Banner**
4. WMS Headquarters & Distribution Hub Address Panel
5. Full Area Directory Matrix (75 Local Points)
6. Directory FAQs
7. Redesigned 4-Column Footer

---

## 3. Single-Instance Verification
- ทุกหน้าเผยแพร่มีแบนเนอร์เพียง **1 จุดพอดี**
- ป้องกันการเกิดแบนเนอร์ซ้ำ (Duplicate Rendering) โดยตัดแบนเนอร์ออกจากเนื้อหาชั้นในของ `DistrictPageView`, `service/[province]/page.tsx`, `service/[province]/[serviceId]/page.tsx`, และ `ThonburiHubView` และให้ `ServiceAreaLayout` แสดงผลครั้งเดียวเหนือแกลเลอรีผลงาน
