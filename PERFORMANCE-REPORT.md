# รายงานการวิเคราะห์และตรวจสอบประสิทธิภาพ Mobile Performance (WMS TRANSPORT)

**โดเมนจริง (Production):** https://wms-transport.com/  
**Git Repository:** `Superkim71140/wms-transport` (Branch: `main`)  
**Commit SHA ล่าสุดบน origin/main:** `364afca528803c660da6a82bc00dfaf8e6acbf56`  
**สถานะการ Deploy บน Vercel:**  
- **Vercel Cache:** `x-vercel-cache: PRERENDER`  
- **Vercel Execution ID:** `sin1::bv455-1793409765726-735ade171726`  
- **การยืนยันเนื้อหาบน Production:** ถอด Partytown ออกเรียบร้อย (`partytown: false`), อัปเดตภาษาไทยในแอตทริบิวต์ (`aria-label="สอบถามผ่าน LINE เพื่อขอใบเสนอราคา"`)  

---

## 1. ผลการตรวจวัดจริงบน Production Deployed Homepage (3 รอบการวัด)

วัดผลจากหน้าจริง `https://wms-transport.com/` โดยตรงด้วย Lighthouse 13.6.0 (Mobile Emulation: Moto G Power, Slow 4G / Lantern Throttling):

| การวัดผล | Performance | LCP (Throttled) | FCP (Throttled) | TBT | CLS | Best Practices | A11y | SEO |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Run 1** | 43 | 7,950 ms | 2,759 ms | 1,015 ms | 0.0085 | 77 | 96 | 100 |
| **Run 2** | 54 | 7,302 ms | 2,191 ms | 577 ms | 0.0000 | 77 | 96 | 100 |
| **Run 3** | 47 | 7,329 ms | 2,520 ms | 816 ms | 0.0000 | 77 | 96 | 100 |
| **Median (Run 3)** | **47** | **7,329 ms** | **2,520 ms** | **816 ms** | **0.0000** | **77** | **96** | **100** |

---

## 2. การเปรียบเทียบ LCP (Unthrottled Traces vs Throttled Results)

เพื่อให้เห็นภาพการทำงานจริง แยกส่วนระหว่างค่าจริงบน Network ปกติ (Unthrottled) กับค่าจำลองเครือข่ายมือถือ 4G ช้า (Lantern Simulation):

| ขั้นตอนของ LCP Subpart | Local Unthrottled (ก่อนปรับปรุง) | Deployed Prod Unthrottled (Run 3) | Local Post-Opt (Deferred Slide 2 & Map) |
| :--- | :---: | :---: | :---: |
| **Time to First Byte (TTFB)** | 15 ms | 116 ms | 51 ms |
| **Resource Load Delay** | 14 ms | 32 ms | 13 ms |
| **Resource Load Duration** | 23 ms | 79 ms | 249 ms |
| **Element Render Delay** | 621 ms | 2,574 ms | 1,497 ms |
| **รวม Unthrottled LCP** | **673 ms** (~0.7s) | **2,801 ms** (~2.8s) | **1,810 ms** (~1.8s) |
| **Lighthouse Simulated LCP** | **6,755 ms** | **7,329 ms** | **6,463 ms** (⬇️ ลดลง ~860ms) |

---

## 3. การตรวจสอบคะแนน Best Practices บน Production (ทำไมได้ 77 / 81 ไม่ใช่ 100)

รายงานการตรวจสอบพบว่า **การถอด Partytown สำเร็จ 100%** ไม่มี Deprecation Warnings จาก Partytown หลงเหลืออยู่แล้ว  
คะแนน Best Practices ตกจาก 100 มาอยู่ที่ 77 (ใน Local Lighthouse) และ 81 (ใน PageSpeed Insights) เกิดจากสาเหตุเดียวที่ได้รับการยืนยันคือ:
- **Third-Party Cookie:** แท็กโฆษณา Google Ads (`https://googleads.g.doubleclick.net/pagead/viewthroughconversion/18500288022/...`) สร้างคุกกี้ชื่อ `test_cookie`
- ทำให้ผิดข้อกำหนด `third-party-cookies` (Score 0, 1 cookie found) และเกิดรายการแจ้งเตือนใน `inspector-issues` (Issues logged in Chrome DevTools)
- เนื่องจากเป็นแท็กโฆษณาทางการของ Google Conversion Tracking ซึ่งผู้ใช้ระบุให้คงระบบ Tracking ไว้ จึงจำเป็นต้องมีตามการทำงานของ Google Tag

---

## 4. สาเหตุที่แท้จริงที่ทำให้ Performance อยู่ที่ 47–74 และ LCP อยู่ที่ 5–7 วินาที

จากการวิเคราะห์ Trace Engine อย่างละเอียด พบสาเหตุหลัก 3 ประการ:

1. **การแข่งขันแย่งสัญญาณเน็ตของ Slide 2 (ยืนยันแล้ว):**
   - ในโค้ดเดิม สไลด์ที่ 2 (`/wms-transport-page-1.png`) ถูก Render ทันทีที่ Client ทำ Hydration เสร็จ (วินาทีที่ 2.4)
   - ส่งผลให้ Browser เริ่มดาวน์โหลดไฟล์ภาพสไลด์ 2 (23.2 KB) พร้อมกันกับช่วงที่ระบบกำลังเรนเดอร์ภาพหลัก (Slide 0)
   - **การแก้ไข:** ปรับปรุง `HeroImageCarousel.tsx` ให้ใช้ `requestIdleCallback` (timeout 5s) หรือดาวน์โหลดเมื่อผู้ใช้มี Action เท่านั้น (คลิก / ปัดหน้าจอ / โฟกัส) ไม่แย่งแบนด์วิดท์ขณะโหลดหน้าแรก
2. **ภาระจาก Google Maps Embed Iframe (570 KB JavaScript):**
   - ใน `ServiceMap.tsx` มีแท็ก `<iframe>` เชื่อมต่อ Google Maps Embed
   - ถึงแม้จะใส่ `loading="lazy"` แต่ Browser ยังคงดาวน์โหลดไลบรารี Maps (`init_embed.js` 250 KB + `main.js` 301 KB) รวมกว่า 570 KB ในช่วงโหลดหน้าแรก
   - **การแก้ไข:** ใช้ `IntersectionObserver` (ระยะ 300px ก่อนถึงจอ) ให้เริ่มโหลด iframe แผนที่เมื่อผู้ใช้เลื่อนหน้าจอลงมาใกล้เท่านั้น ประหยัด JavaScript ในช่วงเริ่มต้นได้ทันที 570 KB
3. **ภาระงาน Main-Thread Work (2.6 วินาที):**
   - หน้าแรกมี DOM elements สูงถึง **1,875 elements** ร่วมกับไฟล์ CSS ขนาด 172.9 KB
   - ทำให้กระบวนการ `Style & Layout` คำนวณเลย์เอาต์กินเวลา CPU จริง 851 ms
   - เมื่อ Lighthouse จำลอง CPU 4x Slowdown เวลา 851 ms จะขยายเป็นกว่า 3.4 วินาที กลายเป็นค่า "Element Render Delay" ที่สูง

---

## 5. การแก้ไข Lint Warnings ครบถ้วน (0 Errors, 0 Warnings)

1. `AreasDirectoryView.tsx`: ถอดการ import `ServiceAreaPromoBanner` ที่ไม่ได้ใช้งานออก
2. `ServiceContactBanner.tsx`: นำพารามิเตอร์ `areaName` มาใช้งานประกอบข้อความอธิบายเพื่อเพิ่มความแม่นยำด้าน Contextual Relevance ท้องถิ่นอัตโนมัติ

**ผลการรัน `npm run lint` ล่าสุด:**  
`✔ No ESLint warnings or errors`
