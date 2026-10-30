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

const moto2026Path = 'src/app/(marketing)/pricing/motorcycle-2026/page.tsx';
const targetSafety = `                {/* 4. Safety Guarantee Section */}
                <section className="space-y-4">
                  <h2 id="safety-guarantee" className="text-xl md:text-2xl font-bold text-navy border-b border-slate-200 pb-2.5">
                    มาตรฐานความปลอดภัยระหว่างขนย้าย
                  </h2>
                  <ul className="space-y-2.5 text-slate-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-600 font-bold">✓</span> <span>ล็อกด้วยสายรัดประเภท Webbing Straps คุณภาพสูง ไม่สร้างริ้วรอยขูดขีดบนตัวถังรถ</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-600 font-bold">✓</span> <span>ขนส่งด้วยรถกระบะตู้ทึบที่ปิดล็อกอย่างแน่นหนา ปลอดภัยจากสภาพอากาศเลวร้าย</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-600 font-bold">✓</span> <span>มีมาตรการดูแลความปลอดภัยของตัวรถและอุปกรณ์ตลอดการเดินทางอย่างเข้มงวด</span>
                    </li>
                  </ul>
                </section>`;

const replacementSafety = `                {/* 4. Safety Guarantee Section */}
                <section className="space-y-4">
                  <h2 id="safety-guarantee" className="text-xl md:text-2xl font-bold text-navy border-b border-slate-200 pb-2.5">
                    มาตรฐานความปลอดภัยระหว่างขนย้าย
                  </h2>
                  <ul className="space-y-2.5 text-slate-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-600 font-bold">✓</span> <span>ล็อกด้วยสายรัดประเภท Webbing Straps คุณภาพสูง ไม่สร้างริ้วรอยขูดขีดบนตัวถังรถ</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-600 font-bold">✓</span> <span>ขนส่งด้วยรถกระบะตู้ทึบที่ปิดล็อกอย่างแน่นหนา ปลอดภัยจากสภาพอากาศเลวร้าย</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="text-emerald-600 font-bold">✓</span> <span>มีมาตรการดูแลความปลอดภัยของตัวรถและอุปกรณ์ตลอดการเดินทางอย่างเข้มงวด</span>
                    </li>
                  </ul>
                </section>

                {/* Contextual Guide Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-0.5">
                      คู่มือเตรียมตัวก่อนส่งรถ
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      ขั้นตอนและวิธีเตรียมรถมอเตอร์ไซค์ก่อนส่งข้ามจังหวัด
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      เช็กระดับน้ำมันเชื้อเพลิง เอกสารเล่มทะเบียน และอุปกรณ์ยึดล็อกที่ถูกต้อง
                    </p>
                  </div>
                  <Link
                    href="/guides/prep-motorcycle-transport"
                    className="shrink-0 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
                  >
                    <span>อ่านคู่มือเตรียมรถ ›</span>
                  </Link>
                </div>`;

replaceInFile(moto2026Path, targetSafety, replacementSafety);

