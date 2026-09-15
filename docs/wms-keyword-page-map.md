# WMS TRANSPORT: Keyword-to-Page Map & Search Intent Architecture

## 1. Objective & Cannibalization Prevention Strategy

Search intent overlap (keyword cannibalization) occurs when multiple pages on the same website target identical search queries with equivalent content, forcing Google to choose between competing pages and diluting organic ranking authority.

### Cannibalization Prevention Safeguards:
1. **Homepage vs. Service Pages Separation:**
   - **Homepage (`/`)**: Focuses on overarching brand authority and high-level service scope ("รถกระบะตู้ทึบรับจ้าง").
   - **Moving Page (`/pricing/moving`)**: Specifically targets household, condo, and dorm relocation with helper teams ("ราคาย้ายบ้านคอนโด", "ย้ายหอพักพร้อมคนยก").
   - **Motorcycle Page (`/pricing/motorcycle-transport`)**: Strictly targets motorcycle & bigbike transport queries ("ราคาขนส่งมอเตอร์ไซค์", "ส่งบิ๊กไบค์").
   - **Freight Page (`/pricing/freight`)**: Exclusively targets commercial cargo and factory charter queries ("เหมารถกระบะตู้ทึบส่งสินค้า").
2. **Province Hubs vs. District Pages Separation:**
   - **Province Hubs (`/service/[province]`)**: Focuses on inter-district capability and regional dispatch across the province.
   - **District Landing Pages (`/areas/[province]/[district]`)**: Only indexed if they pass the indexability gate (`proofScore >= 70`, unique local notes, local road corridors, genuine job images).
3. **Route Pages (`/route/[from]/[to]`):**
   - Focuses strictly on inter-provincial origin-to-destination long-distance transport intent with live distance-based pricing.

---

## 2. Definitive Keyword-to-Page Mapping

| Page URL | Page Type | Search Intent | Primary Keyword | Supporting Keywords | Overlapping Pages & Distinction | Canonical Target | Internal Link Sources | Gaps / Owner Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Homepage | จ้างรถกระบะขนของ ย้ายบ้าน ขนส่งมอเตอร์ไซค์ภาพรวม | **รถกระบะตู้ทึบรับจ้าง** | ขนส่งมอเตอร์ไซค์, ย้ายบ้านคอนโด, รถขนของพร้อมคนยก | Distinct from sub-service pages by aggregating all services | `https://wms-transport.com/` | Sitewide Navbar, Footer, Breadcrumbs | Provide high-res fleet photos |
| `/portfolio` | Evidence | ตรวจสอบภาพผลงานและรีวิวหน้างานจริง | **ผลงานรถรับจ้างย้ายบ้าน** | รีวิวย้ายคอนโดของจริง, ภาพขนส่งมอเตอร์ไซค์, รีวิวรถตู้ทึบ WMS | Evidence hub, distinct from transactional pages | `https://wms-transport.com/portfolio` | Homepage, Footer, InContent CTA | Continuously upload real job photos |
| `/pricing` | Commercial | เช็กอัตราค่าบริการและตารางราคาเริ่มต้น | **ราคารถกระบะรับจ้าง** | ตารางค่าขนส่ง, ค่าจ้างคนยกของ, อัตราค่าบริการรถรับจ้าง | Overview hub for all pricing sub-categories | `https://wms-transport.com/pricing` | Navbar, Footer, Related Links | Owner confirmation on baseline price sheet |
| `/pricing/moving` | Service / Pricing | ค่าบริการย้ายบ้าน ย้ายคอนโด หอพัก พร้อมคนยก | **ราคาจ้างย้ายบ้านคอนโด** | ราคาย้ายหอพัก, ค่าบริการคนช่วยยกของ, ขนของย้ายคอนโด | Pure relocation intent (excludes commercial goods) | `https://wms-transport.com/pricing/moving` | Homepage Services, InternalLinks, Pricing Hub | Clarify extra-floor lifting fees |
| `/pricing/motorcycle-transport` | Service / Pricing | ส่งมอเตอร์ไซค์ บิ๊กไบค์ ทั่วไทย แยกตามรุ่น/cc | **ราคาขนส่งมอเตอร์ไซค์** | ค่าส่งบิ๊กไบค์, ราคาขนส่งมอเตอร์ไซค์ไปต่างจังหวัด, ส่งมอไซค์ทางรถยนต์ | Pure two-wheeler transport intent | `https://wms-transport.com/pricing/motorcycle-transport` | Homepage Services, InternalLinks, Pricing Hub | Provide insurance claim threshold details |
| `/pricing/freight` | Service / Pricing | เหมารถขนส่งสินค้าโรงงาน สินค้าเกษตร ทั่วประเทศ | **ราคาเหมารถกระบะตู้ทึบ** | ขนส่งสินค้าโรงงาน, ส่งของเหมาคัน, รถกระบะส่งของด่วน | Commercial B2B / factory shipping intent | `https://wms-transport.com/pricing/freight` | Homepage Services, InternalLinks, Footer | Clarify tax invoice / withholding tax procedures |
| `/compare/pickup-vs-box-truck` | Informational | เปรียบเทียบกระบะคอก vs กระบะตู้ทึบ เพื่อเลือกใช้ | **กระบะคอกกับกระบะตู้ทึบ ต่างกันอย่างไร** | ข้อดีของรถตู้ทึบ, รถรับจ้างกันฝน, เลือกรถขนของ | Educational comparison guiding toward box truck safety | `https://wms-transport.com/compare/pickup-vs-box-truck` | Guides, InContent Links | None |
| `/compare/moving-alone-vs-helpers` | Informational | ตัดสินใจย้ายของเอง vs จ้างทีมยกของมืออาชีพ | **ย้ายบ้านเองหรือจ้างคนยก** | ค่าจ้างคนยกของคุ้มไหม, วิธีย้ายของไม่ให้เหนื่อย | Educational decision-support | `https://wms-transport.com/compare/moving-alone-vs-helpers` | Guides, InContent Links | None |
| `/guides/truck-capacity-cbm` | Tool / Guide | วิธีคำนวณคิว (CBM) และขนาดตู้ทึบก่อนขนย้าย | **รถกระบะตู้ทึบใส่ของได้กี่คิว** | ขนาดตู้ทึบกระบะ, วิธีคิดคิวขนของ, คำนวณปริมาตรย้ายบ้าน | Informational utility for cargo planning | `https://wms-transport.com/guides/truck-capacity-cbm` | Footer, InternalLinks, FAQ | Verify internal box dimensions (LxWxH) |
| `/service/bangkok` | Regional Hub | รถรับจ้างเขตกรุงเทพมหานครและปริมณฑล | **รถรับจ้างกรุงเทพ** | รถกระบะรับจ้าง กทม, ย้ายหอพักกรุงเทพ, ส่งของกรุงเทพ | Regional hub covering Bangkok metropolitan | `https://wms-transport.com/service/bangkok` | Navbar, Footer, InternalLinks | List express route clearances |
| `/service/bkk-thonburi` | Sub-Hub | รถรับจ้างฝั่งธนบุรี บางแค เพชรเกษม ปิ่นเกล้า | **รถรับจ้างฝั่งธน** | รถรับจ้างบางแค, รถรับจ้างปิ่นเกล้า, ขนของฝั่งธนบุรี | Dedicated to Thonburi urban corridors and alleys | `https://wms-transport.com/service/bkk-thonburi` | Footer, Bangkok Hub | Add local depot details |
| `/service/samutsakhon` | Regional Hub | รถรับจ้างสมุทรสาคร มหาชัย กระทุ่มแบน | **รถรับจ้างสมุทรสาคร** | รถกระบะตู้ทึบสมุทรสาคร, ขนของมหาชัย, รถรับจ้างกระทุ่มแบน | Primary operational base for industrial and domestic moves | `https://wms-transport.com/service/samutsakhon` | Footer, InternalLinks, Navbar | Operational parking hub address |
| `/service/samut-songkhram` | Regional Hub | รถรับจ้างสมุทรสงคราม แม่กลอง อัมพวา | **รถรับจ้างสมุทรสงคราม** | รถรับจ้างแม่กลอง, ขนของอัมพวา, รถตู้ทึบสมุทรสงคราม | Western corridor and fruit/farming goods shipping | `https://wms-transport.com/service/samut-songkhram` | Footer, InternalLinks | Local route timing restrictions |
| `/service/phuket` | Long-Haul Hub | รถรับจ้างและขนส่งมอเตอร์ไซค์ไปภูเก็ต | **รถรับจ้างภูเก็ต** | ส่งมอเตอร์ไซค์ไปภูเก็ต, ย้ายบ้านไปภูเก็ต, รถตู้ทึบกรุงเทพภูเก็ต | High-value long-distance Southern route hub | `https://wms-transport.com/service/phuket` | Footer, Route Pages | Island access & checkpoint details |
| `/areas/bkk-thonburi/bang-khae` | Localized Area | ขนของ ย้ายบ้าน คอนโด ย่านบางแค เพชรเกษม | **รถรับจ้างบางแค** | ย้ายคอนโดบางแค, รถตู้ทึบเพชรเกษม, ขนของหลักสอง | Hyper-local intent gated by real parking/height proof | `https://wms-transport.com/areas/bkk-thonburi/bang-khae` | Thonburi Hub, InternalLinks | Real photo of condo height clearance |
| `/areas/bkk-thonburi/pinklao` | Localized Area | ย้ายหอพัก ย้ายคอนโด ย่านปิ่นเกล้า อรุณอมรินทร์ | **รถรับจ้างปิ่นเกล้า** | ย้ายหอปิ่นเกล้า, ส่งบิ๊กไบค์ปิ่นเกล้า, ขนของอรุณอมรินทร์ | Student and condo relocation in narrow alleys | `https://wms-transport.com/areas/bkk-thonburi/pinklao` | Thonburi Hub, InternalLinks | Real photo in university area |
| `/route/[from]/[to]` | Route Intent | ขนส่งและรถกระบะรับจ้างระหว่างจังหวัด | **รถรับจ้างจาก [ต้นทาง] ไป [ปลายทาง]** | ขนส่งสินค้า [ต้นทาง] [ปลายทาง], ย้ายบ้านข้ามจังหวัด | Dedicated inter-provincial corridor queries with live pricing | `https://wms-transport.com/route/[from]/[to]` | InternalLinks, Province Hubs | Confirm standard fuel surcharge policy |

---

## 3. Action Items & Owner Confirmation Requirements

1. **Verify Operating Hubs:** Ensure phone and dispatch operators actively serve all listed hubs (Bangkok, Samut Sakhon, Samut Songkhram, Chonburi, Phuket, Chiang Mai).
2. **Review High-Risk Marketing Claims:** Replaced absolute claims such as "ปลอดภัย 100%" with defensible statements: "คุ้มครองความปลอดภัยด้วยตู้ทึบมิดชิดและประกันสินค้าตามเงื่อนไข".
3. **Internal Anchor Text Discipline:** Ensure internal links never use generic anchors like "คลิกที่นี่" or "อ่านต่อ". Always use descriptive Thai keywords (e.g. "เช็กราคาย้ายบ้านคอนโด", "ดูตารางราคาขนส่งมอเตอร์ไซค์").
