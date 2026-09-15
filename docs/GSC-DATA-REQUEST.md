# Google Search Console Data Export Request & Guidelines

## Objective
To obtain real, unmanipulated organic search performance data for WMS TRANSPORT to identify:
1. High-opportunity queries with average positions between 4 and 20.
2. Underperforming landing pages with high impressions but low CTR.
3. Keyword cannibalization between service hubs, route pages, and area landing pages.
4. Pages that have actual search demand versus pages requiring evidence consolidation.

---

## 1. Required Export Periods
Please provide Google Search Console (GSC) exports for the following timeframes:
* **Primary Dataset (16 Months):** Full historical export covering all seasonal cycles.
* **Recent Dataset (90 Days):** Last 90 days to capture current performance baseline.
* **Previous Comparison (Prior 90 Days):** Comparable previous 90-day window for trend analysis.

---

## 2. Step-by-Step Export Instructions

1. Open [Google Search Console](https://search.google.com/search-console).
2. Select the verified property for **WMS TRANSPORT** (e.g., `https://wms-transport.com` or Domain property).
3. In the left navigation, click **Performance** (ประสิทธิภาพ) -> **Search results** (ผลการค้นหา).
4. Configure Date Range:
   - Select **Last 16 months** (16 เดือนที่ผ่านมา) or **Custom** range.
5. In the top right corner, click **Export** (ส่งออก) -> **Download CSV** (ดาวน์โหลดเป็น CSV) or **Google Sheets**.
6. The downloaded ZIP archive contains multiple CSV files:
   - `Queries.csv` (ข้อความค้นหา)
   - `Pages.csv` (หน้าเว็บ)
   - `Countries.csv` (ประเทศ)
   - `Devices.csv` (อุปกรณ์)
   - `Search Appearance.csv` (ลักษณะการแสดงผลในการค้นหา)
7. Save the raw files in a secure internal storage location or share with the SEO development team.

---

## 3. CSV Data Templates & Schemas

### Template 1: Query Performance (`gsc_queries_template.csv`)
```csv
Top queries,Clicks,Impressions,CTR,Position
รถรับจ้างตู้ทึบ,150,2200,6.82%,3.4
รถรับจ้าง บางแค,85,1100,7.73%,2.1
ส่งมอเตอร์ไซค์ไปภูเก็ต,42,890,4.72%,4.8
ขนส่งสินค้า มหาชัย,60,750,8.00%,2.5
รถกระบะรับจ้าง ย้ายหอ,35,920,3.80%,5.2
```

### Template 2: Landing Page Performance (`gsc_pages_template.csv`)
```csv
Top pages,Clicks,Impressions,CTR,Position
https://wms-transport.com/,450,8500,5.29%,4.2
https://wms-transport.com/pricing/moving,180,2400,7.50%,3.1
https://wms-transport.com/pricing/motorcycle-transport,140,1950,7.18%,3.8
https://wms-transport.com/service/bkk-thonburi,95,1400,6.79%,4.5
https://wms-transport.com/areas/bkk-thonburi/bang-khae,65,820,7.93%,2.4
https://wms-transport.com/areas/samutsakhon/maha-chai,55,710,7.75%,2.2
```

### Template 3: Query-to-Page Cannibalization Matrix (`gsc_query_page_matrix.csv`)
```csv
Query,Page URL,Clicks,Impressions,CTR,Position,Action Required
ส่งมอเตอร์ไซค์ บางแค,https://wms-transport.com/areas/bkk-thonburi/bang-khae,12,380,3.16%,5.4,Consolidate internal link to motorcycle pricing
ส่งมอเตอร์ไซค์ บางแค,https://wms-transport.com/service/bkk-thonburi/motorcycle,8,420,1.90%,7.8,Clarify H1 & canonical
```

---

## 4. Analytical Policy
* Until verified GSC data is received, the engineering team operates under a **non-destructive policy**: no existing indexable URL with established traffic will be deleted, redirected, or altered based on assumptions.
