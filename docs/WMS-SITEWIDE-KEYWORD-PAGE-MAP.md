# WMS TRANSPORT Sitewide Keyword-to-Page Architecture & Cannibalization Prevention Map

## URL Responsibility Model

| URL Pattern | Primary Responsibility | Primary Search Intent | Target Persona | Canonical Policy | Indexability |
|---|---|---|---|---|:---:|
| `/` | Brand entity, core moving services, trust anchors | Commercial / Navigational | General moving & transport searchers | Self-canonical (`https://wms-transport.com`) | **Indexable** |
| `/pricing/moving` | Moving cost estimation, base rates, service tiers | Transactional / Commercial | Home, condo, and dorm movers | Self-canonical | **Indexable** |
| `/pricing/motorcycle-transport` | Motorcycle shipping rates, strapping process | Transactional / Commercial | Bigbike & motorcycle owners | Self-canonical | **Indexable** |
| `/pricing/freight` | Commercial cargo, factory freight, chartered trips | Transactional / B2B | Business owners, factory logistics | Self-canonical | **Indexable** |
| `/service/bkk-thonburi` | Thonburi regional service hub, 15-district directory | Commercial / Navigational | Thonburi residents & businesses | Self-canonical | **Indexable** |
| `/service/samutsakhon` | Samut Sakhon regional hub, industrial corridor | Commercial / Navigational | Samut Sakhon residents & factories | Self-canonical | **Indexable** |
| `/service/phuket` | Long-haul Phuket transport hub | Commercial / Transactional | Interprovincial movers & shippers | Self-canonical | **Indexable** |
| `/areas/bkk-thonburi/bang-khae` | Bang Khae local district landing page (Verified) | Localized Commercial | Bang Khae condo/home movers | Self-canonical | **Indexable** |
| `/areas/bkk-thonburi/pinklao` | Pinklao local district landing page (Verified) | Localized Commercial | Pinklao students & condo residents | Self-canonical | **Indexable** |
| `/areas/samutsakhon/maha-chai` | Maha Chai industrial/local landing page (Verified) | Localized Commercial | Maha Chai factory & trade clients | Self-canonical | **Indexable** |
| `/areas/bkk-thonburi/[draft]` | 14 Unverified Thonburi districts | N/A (Gated Quality Control) | N/A | Returns HTTP 404 | 🛑 **Non-Indexable** |
| `/route/bangkok/phuket` | BKK-Phuket high-volume recurring transport corridor | Corridor Transactional | Direct route shippers | Self-canonical | **Indexable** |
| `/route/samut-sakhon/bangkok` | Samut Sakhon - Bangkok recurring cargo corridor | Corridor Transactional | Daily freight & factory logistics | Self-canonical | **Indexable** |
| `/portfolio/moving-condo-bang-khae` | Bang Khae High-rise Condo Case Study | E-E-A-T Evidence / Case Study | High-intent condo movers | Self-canonical | **Indexable** |
| `/portfolio/motorcycle-delivery-pinklao` | Pinklao Bigbike Delivery Case Study | E-E-A-T Evidence / Case Study | Motorcycle transport customers | Self-canonical | **Indexable** |
| `/portfolio/freight-delivery-maha-chai` | Maha Chai Factory Freight Case Study | E-E-A-T Evidence / Case Study | B2B cargo logistics managers | Self-canonical | **Indexable** |
| `/guides/[slug]` | Informational guides (CBM calculation, condo packing) | Informational | Researching movers | Self-canonical | **Indexable** |
| `/compare/[slug]` | Decision matrix comparisons (Pickup vs Box Truck, etc.) | Informational / Consideration | Comparison shoppers | Self-canonical | **Indexable** |
| `/dashboard/*` | Internal operational dashboard | Internal / Admin | WMS Operations Team | `noindex, nofollow` / Disallowed | 🛑 **Non-Indexable** |

---

## Keyword-to-Page Matrix & Cannibalization Resolutions

| Target Keyword Phrase | Primary Responsible URL | Secondary / Supporting URLs | Cannibalization Prevention Action |
|---|---|---|---|
| "รถรับจ้างตู้ทึบ", "รถกระบะรับจ้าง" | `/` | `/pricing/moving`, `/compare/pickup-vs-box-truck` | Homepage targets broad commercial terms; Pricing targets cost intent; Compare targets vehicle selection. |
| "ราคารถรับจ้างย้ายบ้าน", "ค่ารถขนของ" | `/pricing/moving` | `/`, `/guides/moving-cost-estimation` | Pricing page owns commercial cost queries; Guides provide informational calculators linking back to pricing. |
| "ขนส่งมอเตอร์ไซค์", "ส่งบิ๊กไบค์ ข้ามจังหวัด" | `/pricing/motorcycle-transport` | `/portfolio/motorcycle-delivery-pinklao`, `/route/bangkok/phuket` | Pricing owns commercial service intent; Portfolio provides physical proof; Route pages target specific origins/destinations. |
| "รถรับจ้างฝั่งธน", "ขนย้ายฝั่งธนบุรี" | `/service/bkk-thonburi` | `/areas/bkk-thonburi/bang-khae` | Hub page targets regional queries; District pages target subdistrict/street queries. |
| "รถรับจ้างบางแค", "ย้ายคอนโดบางแค" | `/areas/bkk-thonburi/bang-khae` | `/service/bkk-thonburi`, `/portfolio/moving-condo-bang-khae` | District page owns local queries; Case study links to district page as proof artifact. |
| "รถรับจ้างมหาชัย", "ขนของสมุทรสาคร" | `/areas/samutsakhon/maha-chai` | `/service/samutsakhon`, `/portfolio/freight-delivery-maha-chai` | Maha Chai page owns local industrial/moving queries; Hub page aggregates province level. |
| "รถกระบะตู้ทึบกี่คิว", "ขนาดตู้ทึบ" | `/guides/cbm-calculation-pickup` | `/compare/pickup-vs-box-truck` | Informational guide captures volumetric calculation queries; links to pricing. |
