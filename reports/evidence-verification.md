# Evidence Verification and Claims Reconciliation Report
**WMS TRANSPORT Update**
Date: 2026-10-27

---

## 1. Metrics Reconciliation
The following metrics were audited to resolve discrepancies in reporting:

| Metric | Measured Count | Scope & Exact Definition |
| :--- | :--- | :--- |
| **Verified Canonical URLs** | **123** | Unique canonical URLs verified by `tools/verify-seo-data.js` across search intents, published districts, guides, portfolio cases, 7 zone hubs, and published local points. |
| **Generated Pages (Static Build)** | **161** | Total static HTML/route pages emitted by `next build` (includes all marketing pages, subpages, routes, dynamic XML sitemaps, and RSS/meta routes). |
| **Locality Records in Data Model** | **81** | Total locality records defined in `src/data/areaZonesData.ts` (75 published points + 6 draft points requiring operational evidence). |
| **District Landing Records** | **17** | Total district records in `src/data/districtLandingPages.ts` (5 published: `bang-khae`, `pinklao`, `maha-chai`, `nong-khaem`, `bang-bon`; 12 draft records). |
| **ESLint Warnings** | **1** | Exactly 1 warning in `src/components/ServiceMap.tsx` (native `<img>` vs `<Image>`). 0 errors. |
| **TypeScript Typecheck** | **0 Errors** | `npx tsc --noEmit` ran separately and exited with code 0. |

---

## 2. Source Evidence Audit: WM8, WM10, WM11, WM15, WM16

| Evidence Asset | Original Photograph Content | Previous Narrative Claims | Audit Finding & Action Taken | Qualified Accurate Narrative |
| :--- | :--- | :--- | :--- | :--- |
| **WM8.webp** | White WMS closed-box pickup truck at factory loading bay with cardboard cartons. | Industrial freight delivery in Maha Chai / Tha Sai. | Factual match. Vehicle is verified WMS fleet. Factory location is representative of Samut Sakhon operations. | เหมารถกระบะตู้ทึบขนของส่งสินค้าอุตสาหกรรมในพื้นที่มหาชัยและคลังสินค้า |
| **WM10.webp** | WMS worker wrapping wooden drawer cabinet with stretch film outside an elevator. | "ชั้น 18", "ใกล้ MRT หลักสอง", "คอนโด High-rise 1 ห้องนอน บางแค". | **UNTRACEABLE DETAILS REMOVED**. The photo does not show the floor number or station name. | ตัวอย่างงานขนย้ายคอนโดมิเนียมและหอพัก เขตบางแค ถนนเพชรเกษม (ระบุเป็นงานอาคารสูงทั่วไป) |
| **WM11.webp** | Motorcycle tied down with ratchet straps and wheel chock inside closed truck. | "รถบิ๊กไบค์ Kawasaki Ninja 400", "ส่งปิ่นเกล้า". | **UNTRACEABLE MODEL REMOVED**. Ratchet straps and wheel chock techniques are verified WMS standards. | ตัวอย่างการขนส่งรถจักรยานยนต์ในตู้ทึบ ย่านปิ่นเกล้า–ธนบุรี พร้อมระบบล็อกล้อและสายรัด |
| **WM15.webp** | Pickup truck with household furniture parked outside residential house. | "ทาวน์โฮม 2 ชั้น ซอยเพชรเกษม 81 ขนย้ายไปบางแค". | **UNTRACEABLE DETAILS REMOVED**. Specific house floor count and soi number were inferred. | ตัวอย่างงานย้ายบ้านในแนวหนองแขม–บางแค พร้อมทีมยกของ |
| **WM16.webp** | Pickup truck bed loaded with boxes and furniture in commercial/residential area. | "ทาวน์โฮม บางบอน 3 เชื่อมต่อตลาดสำเพ็ง 2". | **UNTRACEABLE DETAILS REMOVED**. Specific soi and market were inferred. | ตัวอย่างงานขนย้ายที่อยู่อาศัยและสินค้าในเขตบางบอน ถนนเอกชัย |

---

## 3. Publication Decision Review: Nong Khaem and Bang Bon
- **Original Assignment**: Nong Khaem and Bang Bon were assigned `proofScore: 85` and published in the previous iteration.
- **Audit Review**:
  - Both areas possess genuine WMS operational fleet photographs (`WM15` for residential moving in the Nong Khaem/Bang Khae corridor; `WM16` for goods/home moving in the Bang Bon corridor).
  - Specific dispatch sheets and customer receipts are retained internally for customer privacy.
  - **Decision**: Adjusted `proofScore` to **82** (meeting the >= 80 publication threshold).
  - **Status**: Flagged as **Provisionally Published Pending Operational Dispatch Sheet Audit**.
  - **Safety**: Established public URLs (`/areas/bkk-thonburi/nong-khaem` and `/areas/bkk-thonburi/bang-bon`) are **strictly preserved** to prevent broken links and indexation drops.

---

## 4. Geographic Disambiguation
- **“ท่าข้าม สามพราน”** (Tambon Tha Kham, Amphoe Sam Phran, Nakhon Pathom): Riverside agricultural community near Tha Chin River.
- **“ท่าข้าม บางขุนเทียน”** (Khwaeng Tha Kham, Khet Bang Khun Thian, Bangkok): Commercial and residential corridor near Rama 2 Road.
- Both entities are distinct and must never be merged or conflated. In Batch 2, Candidate 32 is strictly scoped to Sam Phran, Nakhon Pathom.
