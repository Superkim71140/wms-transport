const fs = require('fs');

function replaceInFile(filePath, target, replacement) {
  let content = fs.readFileSync(filePath, 'utf8');
  const isCrlf = content.includes('\r\n');
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const normalizedTarget = target.replace(/\r\n/g, '\n');
  const normalizedReplacement = replacement.replace(/\r\n/g, '\n');

  if (!normalizedContent.includes(normalizedTarget)) {
    throw new Error(`Target not found in ${filePath}:\n${normalizedTarget.slice(0, 100)}...`);
  }

  let updated = normalizedContent.replace(normalizedTarget, normalizedReplacement);
  if (isCrlf) {
    updated = updated.replace(/\n/g, '\r\n');
  }
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log(`✅ Successfully updated ${filePath}`);
}

// 1. pickup-vs-box-truck
const pickupPath = 'src/app/(marketing)/compare/pickup-vs-box-truck/page.tsx';
replaceInFile(pickupPath, 'import TableOfContents from "@/components/TableOfContents";', 'import TableOfContents from "@/components/TableOfContents";\nimport RelatedComparisons from "@/components/compare/RelatedComparisons";');

const pickupCta = `                {/* Inline CTA block */}
                <div className="bg-navy border border-blue-950 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 text-white shadow-md">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white mb-1">สนใจจองคิวรถกระบะตู้ทึบรับจ้างขนของ</h3>
                    <p className="text-slate-300 text-xs sm:text-sm">บริการจริงใจ ประเมินราคาโปร่งใส ตลอด 24 ชั่วโมง</p>
                  </div>
                  <a
                    href="tel:0612402436"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-xs active:scale-95 shrink-0 text-sm"
                  >
                    <span>ติดต่อประเมินราคาฟรี</span>
                  </a>
                </div>

              </div>`;

const pickupReplacement = `                {/* Inline CTA block */}
                <div className="bg-navy border border-blue-950 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-5 text-white shadow-md">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white mb-1">สนใจจองคิวรถกระบะตู้ทึบรับจ้างขนของ</h3>
                    <p className="text-slate-300 text-xs sm:text-sm">บริการจริงใจ ประเมินราคาโปร่งใส ตลอด 24 ชั่วโมง</p>
                  </div>
                  <a
                    href="tel:0612402436"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-xs active:scale-95 shrink-0 text-sm"
                  >
                    <span>ติดต่อประเมินราคาฟรี</span>
                  </a>
                </div>

                <RelatedComparisons currentPath="/compare/pickup-vs-box-truck" />

              </div>`;
replaceInFile(pickupPath, pickupCta, pickupReplacement);

// 2. moving-alone-vs-helpers
const alonePath = 'src/app/(marketing)/compare/moving-alone-vs-helpers/page.tsx';
replaceInFile(alonePath, 'import Breadcrumbs from "@/components/Breadcrumbs";', 'import Breadcrumbs from "@/components/Breadcrumbs";\nimport RelatedComparisons from "@/components/compare/RelatedComparisons";');

const aloneSummary = `                {/* Comparison Summary */}
                <section className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 sm:p-7 space-y-2.5 shadow-xs">
                  <h3 className="text-base sm:text-lg font-bold text-navy">บทสรุปส่งท้าย:</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    หากสัมภาระมีเพียงกล่องขนาดเล็ก เสื้อผ้า ของจิปาถะไม่เกิน 5 กล่อง การย้ายของเองอาจเป็นคำตอบที่สมเหตุสมผลครับ แต่หากในของของคุณมีที่นอน 5-6 ฟุต โซฟา เครื่องซักผ้า หรือตู้เย็นขนาดใหญ่ การเรียกคนช่วยยกเสริมของ WMS จะคุ้มค่ากว่าอย่างมาก ช่วยให้ของถึงปลายทางในความปลอดภัยสูงสุด และเซฟหลังของคุณได้อย่างสมบูรณ์แบบ
                  </p>
                </section>
              </div>`;

const aloneReplacement = `                {/* Comparison Summary */}
                <section className="bg-blue-50/70 border border-blue-200 rounded-2xl p-6 sm:p-7 space-y-2.5 shadow-xs">
                  <h3 className="text-base sm:text-lg font-bold text-navy">บทสรุปส่งท้าย:</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    หากสัมภาระมีเพียงกล่องขนาดเล็ก เสื้อผ้า ของจิปาถะไม่เกิน 5 กล่อง การย้ายของเองอาจเป็นคำตอบที่สมเหตุสมผลครับ แต่หากในของของคุณมีที่นอน 5-6 ฟุต โซฟา เครื่องซักผ้า หรือตู้เย็นขนาดใหญ่ การเรียกคนช่วยยกเสริมของ WMS จะคุ้มค่ากว่าอย่างมาก ช่วยให้ของถึงปลายทางในความปลอดภัยสูงสุด และเซฟหลังของคุณได้อย่างสมบูรณ์แบบ
                  </p>
                </section>

                <RelatedComparisons currentPath="/compare/moving-alone-vs-helpers" />
              </div>`;
replaceInFile(alonePath, aloneSummary, aloneReplacement);

// 3. one-vehicle-vs-multiple-trips
const onePath = 'src/app/(marketing)/compare/one-vehicle-vs-multiple-trips/page.tsx';
replaceInFile(onePath, 'import Breadcrumbs from "@/components/Breadcrumbs";', 'import Breadcrumbs from "@/components/Breadcrumbs";\nimport RelatedComparisons from "@/components/compare/RelatedComparisons";');

const oneSummary = `                {/* Comparison Summary */}
                <section className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-6 sm:p-8 space-y-3">
                  <h3 className="text-lg font-black text-blue-950">คำแนะนำเชิงโลจิสติกส์:</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    WMS Transport แนะนำว่า หากระยะทางขนย้ายเกิน 10 กิโลเมตรขึ้นไป การจัดสรรรถกระบะตอนเดียวตู้ทึบที่มีปริมาตร 7.62 คิว ขนย้ายเสร็จสิ้นในเที่ยวเดียวคือทางเลือกที่คุ้มค่า ปลอดภัย และเซฟต้นทุนพลังงานรวมได้สูงสุดครับ ช่วยลดความเสี่ยงจากการขีดข่วนของเคลื่อนตัวระหว่างทางได้เป็นอย่างดี
                  </p>
                </section>
              </div>`;

const oneReplacement = `                {/* Comparison Summary */}
                <section className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-6 sm:p-8 space-y-3">
                  <h3 className="text-lg font-black text-blue-950">คำแนะนำเชิงโลจิสติกส์:</h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    WMS Transport แนะนำว่า หากระยะทางขนย้ายเกิน 10 กิโลเมตรขึ้นไป การจัดสรรรถกระบะตอนเดียวตู้ทึบที่มีปริมาตร 7.62 คิว ขนย้ายเสร็จสิ้นในเที่ยวเดียวคือทางเลือกที่คุ้มค่า ปลอดภัย และเซฟต้นทุนพลังงานรวมได้สูงสุดครับ ช่วยลดความเสี่ยงจากการขีดข่วนของเคลื่อนตัวระหว่างทางได้เป็นอย่างดี
                  </p>
                </section>

                <RelatedComparisons currentPath="/compare/one-vehicle-vs-multiple-trips" />
              </div>`;
replaceInFile(onePath, oneSummary, oneReplacement);

// 4. pricing/moving/page.tsx: Add links to guides and compare
const pricingMovingPath = 'src/app/(marketing)/pricing/moving/page.tsx';
const targetMovingCards = `              <Link
                href="/areas/bkk-thonburi/bang-khae"
                className="p-3.5 bg-white border border-slate-200 hover:border-blue-300 rounded-xl block transition-all group"
              >
                <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600 mb-1">
                  รถรับจ้างย้ายบ้านเพชรเกษม–บางแค
                </div>
                <div className="text-xs text-slate-500">
                  เจาะลึกจุดโหลดของ MRT หลักสอง พุทธมณฑลสาย 1–3 และตรอกซอยแคบ
                </div>
              </Link>
            </div>
          </section>`;

const replacementMovingCards = `              <Link
                href="/areas/bkk-thonburi/bang-khae"
                className="p-3.5 bg-white border border-slate-200 hover:border-blue-300 rounded-xl block transition-all group"
              >
                <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600 mb-1">
                  รถรับจ้างย้ายบ้านเพชรเกษม–บางแค
                </div>
                <div className="text-xs text-slate-500">
                  เจาะลึกจุดโหลดของ MRT หลักสอง พุทธมณฑลสาย 1–3 และตรอกซอยแคบ
                </div>
              </Link>
            </div>

            {/* Contextual Guides & Comparison Links */}
            <div className="mt-4 pt-4 border-t border-slate-200/80">
              <div className="text-xs font-bold text-slate-900 mb-2">
                คู่มือและบทวิเคราะห์แนะนำสำหรับการย้ายบ้าน คอนโด:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <Link
                  href="/guides/condo-no-elevator"
                  className="p-3 bg-white border border-slate-200 hover:border-blue-300 rounded-xl block text-xs font-semibold text-slate-800 hover:text-blue-600 transition-all shadow-2xs"
                >
                  <span className="block text-blue-600 text-[10px] uppercase font-bold mb-0.5">คู่มือหอพัก/คอนโด</span>
                  <span>ย้ายคอนโดและอาคารไม่มีลิฟต์</span>
                </Link>
                <Link
                  href="/guides/one-bedroom-condo-move"
                  className="p-3 bg-white border border-slate-200 hover:border-blue-300 rounded-xl block text-xs font-semibold text-slate-800 hover:text-blue-600 transition-all shadow-2xs"
                >
                  <span className="block text-blue-600 text-[10px] uppercase font-bold mb-0.5">คู่มือจัดระเบียบของ</span>
                  <span>ย้ายคอนโด 1 ห้องนอนให้ประหยัดรอบ</span>
                </Link>
                <Link
                  href="/compare/one-vehicle-vs-multiple-trips"
                  className="p-3 bg-white border border-slate-200 hover:border-blue-300 rounded-xl block text-xs font-semibold text-slate-800 hover:text-blue-600 transition-all shadow-2xs"
                >
                  <span className="block text-blue-600 text-[10px] uppercase font-bold mb-0.5">เปรียบเทียบความคุ้มค่า</span>
                  <span>ขนย้ายเที่ยวเดียวจบ VS หลายเที่ยว</span>
                </Link>
              </div>
            </div>
          </section>`;
replaceInFile(pricingMovingPath, targetMovingCards, replacementMovingCards);

// 5. pricing/motorcycle-transport/page.tsx: Add link to prep-motorcycle-transport guide
const pricingMotoPath = 'src/app/(marketing)/pricing/motorcycle-transport/page.tsx';
const targetMotoFaq = `          {/* 8. Brief FAQ & Final Contact Section */}
          <PricingFAQ`;

const replacementMotoFaq = `          {/* Contextual Motorcycle Prep Guide Link */}
          <section className="mb-10 bg-slate-50 border border-slate-200/90 rounded-2xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  คู่มือแนะนำสำหรับผู้ส่งรถมอเตอร์ไซค์
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  ขั้นตอนและวิธีเตรียมรถมอเตอร์ไซค์ก่อนส่งข้ามจังหวัด
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  คำแนะนำการถ่ายน้ำมันเชื้อเพลิง การเตรียมเอกสารเล่มทะเบียน และอุปกรณ์ล็อกล้อหน้านิรภัย
                </p>
              </div>
              <Link
                href="/guides/prep-motorcycle-transport"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-2xs"
              >
                <span>อ่านคู่มือเตรียมรถ</span>
                <span className="text-sm">›</span>
              </Link>
            </div>
          </section>

          {/* 8. Brief FAQ & Final Contact Section */}
          <PricingFAQ`;
replaceInFile(pricingMotoPath, targetMotoFaq, replacementMotoFaq);

console.log('Compare and pricing links applied successfully!');

