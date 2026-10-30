const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, target, replacement) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Normalize line endings for replacement
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

// 1. Footer.tsx
const footerPath = 'src/components/Footer.tsx';
const targetFooter = `  const serviceLinks = [
    { label: "บริการย้ายบ้านและย้ายคอนโด", href: "/#services" },
    { label: "บริการขนส่งมอเตอร์ไซค์ทั่วไทย", href: "/pricing/motorcycle-2026" },
    { label: "รถกระบะตู้ทึบขนส่งสินค้าโรงงาน", href: "/pricing/freight" },
    { label: "บริการพนักงานช่วยยกของ", href: "/compare/moving-alone-vs-helpers" },
    { label: "เปรียบเทียบกระบะตู้ทึบ VS กระบะคอก", href: "/compare/pickup-vs-box-truck" },
  ];`;

const replacementFooter = `  const serviceLinks = [
    { label: "บริการย้ายบ้านและย้ายคอนโด", href: "/#services" },
    { label: "บริการขนส่งมอเตอร์ไซค์ทั่วไทย", href: "/pricing/motorcycle-2026" },
    { label: "รถกระบะตู้ทึบขนส่งสินค้าโรงงาน", href: "/pricing/freight" },
    { label: "บริการพนักงานช่วยยกของ", href: "/compare/moving-alone-vs-helpers" },
    { label: "เปรียบเทียบกระบะตู้ทึบ VS กระบะคอก", href: "/compare/pickup-vs-box-truck" },
    { label: "ขนย้ายเที่ยวเดียว VS ขนย้ายหลายเที่ยว", href: "/compare/one-vehicle-vs-multiple-trips" },
  ];`;
replaceInFile(footerPath, targetFooter, replacementFooter);

const targetHelpful = `  const helpfulLinks = [
    { label: "เช็กขนาดรถและคิวบรรทุก (CBM Guide)", href: "/guides/truck-capacity-cbm" },
    { label: "คู่มือเตรียมตัวก่อนย้ายบ้านและหอพัก", href: "/blog/moving-house-checklist" },
    { label: "ขั้นตอนเตรียมรถมอเตอร์ไซค์ก่อนส่ง", href: "/blog/prepare-motorcycle-transport" },
    { label: "ตัวอย่างผลงานการขนย้ายจริง (Portfolio)", href: "/portfolio" },
  ];`;

const replacementHelpful = `  const helpfulLinks = [
    { label: "เช็กขนาดรถและคิวบรรทุก (CBM Guide)", href: "/guides/truck-capacity-cbm" },
    { label: "คู่มือขนย้ายคอนโดไม่มีลิฟต์", href: "/guides/condo-no-elevator" },
    { label: "คู่มือเตรียมตัวก่อนย้ายบ้านและหอพัก", href: "/blog/moving-house-checklist" },
    { label: "ขั้นตอนเตรียมรถมอเตอร์ไซค์ก่อนส่ง", href: "/blog/prepare-motorcycle-transport" },
    { label: "ตัวอย่างผลงานการขนย้ายจริง (Portfolio)", href: "/portfolio" },
  ];`;
replaceInFile(footerPath, targetHelpful, replacementHelpful);

// 2. InternalLinks.tsx
const internalLinksPath = 'src/components/InternalLinks.tsx';
const targetInternalRoutes = `              {displayRoutes.slice(0, 5).map((route) => (
                <Link
                  key={\`\${route.from}-\${route.to}\`}
                  href={\`/route/\${route.from}/\${route.to}\`}
                  className="group px-3 py-2.5 rounded-lg bg-white border border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-indigo-600"
                >
                  <span>{route.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                </Link>
              ))}`;

const replacementInternalRoutes = `              {displayRoutes.slice(0, 10).map((route) => (
                <Link
                  key={\`\${route.from}-\${route.to}\`}
                  href={\`/route/\${route.from}/\${route.to}\`}
                  className="group px-3 py-2.5 rounded-lg bg-white border border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-indigo-600"
                >
                  <span>{route.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                </Link>
              ))}`;
replaceInFile(internalLinksPath, targetInternalRoutes, replacementInternalRoutes);

// 3. ServiceMap.tsx
const serviceMapPath = 'src/components/ServiceMap.tsx';
const targetServiceMapHubs = `        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {priorityHubs.map((hub, i) => (
            <Link
              key={i}
              href={hub.href}
              className="p-4 bg-white hover:bg-blue-50/40 border border-slate-200/90 hover:border-blue-300 rounded-xl transition-all duration-200 group flex flex-col justify-between shadow-2xs hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className={\`text-[10px] font-bold px-2 py-0.5 rounded-full border \${hub.tagColor}\`}>
                    {hub.tag}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 mb-1">
                  {hub.title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  {hub.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                {hub.corridor}
              </div>
            </Link>
          ))}
        </div>
      </div>`;

const strategicZonesDataBlock = `  const strategicZones = [
    { id: 1, name: "มหาชัย – เมืองสมุทรสาคร", slug: "maha-chai" },
    { id: 2, name: "กระทุ่มแบน – อ้อมน้อย", slug: "krathumbaen-omnoi" },
    { id: 3, name: "พระราม 2 – บางกระดี่", slug: "rama2-bangkradi" },
    { id: 4, name: "บางบอน – เอกชัย", slug: "bangbon-ekachai" },
    { id: 5, name: "หนองแขม – เพชรเกษม 81", slug: "nongkhaem-phetkasem81" },
    { id: 6, name: "บางแค – เพชรเกษม", slug: "bang-khae" },
    { id: 7, name: "พุทธมณฑลสาย 1–4 – ศาลายา", slug: "phutthamonthon-sai-1-4" },
  ];`;

// Check if strategicZones is already in ServiceMap
const smContent = fs.readFileSync(serviceMapPath, 'utf8');
if (!smContent.includes('strategicZones')) {
  // Add strategicZones before return
  const targetSmReturn = '  return (\n    <section className="py-12 md:py-18';
  replaceInFile(serviceMapPath, '  return (', `${strategicZonesDataBlock}\n\n  return (`);
}

const replacementServiceMapHubs = `        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {priorityHubs.map((hub, i) => (
            <Link
              key={i}
              href={hub.href}
              className="p-4 bg-white hover:bg-blue-50/40 border border-slate-200/90 hover:border-blue-300 rounded-xl transition-all duration-200 group flex flex-col justify-between shadow-2xs hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className={\`text-[10px] font-bold px-2 py-0.5 rounded-full border \${hub.tagColor}\`}>
                    {hub.tag}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 mb-1">
                  {hub.title}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  {hub.desc}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-medium">
                {hub.corridor}
              </div>
            </Link>
          ))}
        </div>

        {/* 7 Strategic Zone Hubs (Direct Crawlable Pathway) */}
        <div className="mt-8 pt-6 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-navy">
                7 โซนยุทธศาสตร์การให้บริการ (สมุทรสาคร · กรุงเทพฯ ฝั่งธนบุรี · นครปฐม)
              </h4>
              <span className="text-xs text-slate-500">
                เลือกสำรวจตามโซนเพื่อเข้าถึงพื้นที่บริการและจุดจอดเทียบรถเฉพาะแห่ง
              </span>
            </div>
            <Link
              href="/areas"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
            >
              สารบัญพื้นที่ทั้งหมด 70+ จุด ›
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
            {strategicZones.map((zone) => (
              <Link
                key={zone.slug}
                href={\`/areas/\${zone.slug}\`}
                className="p-3 bg-white hover:bg-blue-50/50 border border-slate-200/90 hover:border-blue-300 rounded-xl transition-all flex flex-col justify-between group shadow-2xs no-underline"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 block w-fit mb-1.5">
                    โซน {zone.id}
                  </span>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
                    {zone.name}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 group-hover:text-blue-500 flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100">
                  <span>เข้าสู่ฮับ</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>`;
replaceInFile(serviceMapPath, targetServiceMapHubs, replacementServiceMapHubs);

// 4. DistrictPageView.tsx: dynamically link verified case studies
const districtViewPath = 'src/components/service-area/DistrictPageView.tsx';
const targetDistrictCase = `              {district === "bang-khae" && (
                <Link href="/portfolio/moving-condo-bang-khae" className="hover:text-blue-800 inline-flex items-center gap-1">
                  <span>ดูรายละเอียดงานย้ายคอนโดบางแค</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}`;

const replacementDistrictCase = `              {primaryCase && (
                <Link href={\`/portfolio/\${primaryCase.slug}\`} className="hover:text-blue-800 inline-flex items-center gap-1">
                  <span>ดูบันทึกผลงานจริง: {primaryCase.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
              {record.province === "bkk-thonburi" && (
                <Link href="/guides/condo-no-elevator" className="hover:text-blue-800 inline-flex items-center gap-1">
                  <span>คู่มือขนย้ายอาคารไม่มีลิฟต์</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}`;
replaceInFile(districtViewPath, targetDistrictCase, replacementDistrictCase);

// 5. service/[province]/page.tsx: fix Samut Sakhon childAreas self-links
const serviceProvPath = 'src/app/(marketing)/service/[province]/page.tsx';
const targetSamutChild = `  // Specific child areas
  const childAreas =
    province === "samutsakhon"
      ? [
          {
            name: "มหาชัย – พระราม 2 (ตัวเมืองสมุทรสาคร)",
            href: "/areas/samutsakhon/maha-chai",
            subtitle: "ศูนย์บริการสำนักงานใหญ่ WMS ขนส่งสินค้าโรงงานและย้ายบ้าน",
          },
          {
            name: "กระทุ่มแบน (พุทธสาคร – พุทธมณฑลสาย 4/5)",
            href: \`/service/\${province}\`,
            subtitle: "บริการรถตู้ทึบรับจ้าง ย้ายหอพักพนักงานและบ้านจัดสรร",
          },
          {
            name: "บ้านแพ้ว (เกษตรกรรม – คลองดำเนินสะดวก)",
            href: \`/service/\${province}\`,
            subtitle: "รถกระบะรับจ้างขนส่งสินค้าเกษตรและขนย้ายทั่วไป",
          },
        ]`;

const replacementSamutChild = `  // Specific child areas
  const childAreas =
    province === "samutsakhon"
      ? [
          {
            name: "มหาชัย – พระราม 2 (ตัวเมืองสมุทรสาคร)",
            href: "/areas/samutsakhon/maha-chai",
            subtitle: "ศูนย์บริการสำนักงานใหญ่ WMS ขนส่งสินค้าโรงงานและย้ายบ้าน",
          },
          {
            name: "กระทุ่มแบน (พุทธสาคร – พุทธมณฑลสาย 4/5)",
            href: "/areas/krathumbaen-omnoi/krathum-baen",
            subtitle: "บริการรถตู้ทึบรับจ้าง ย้ายหอพักพนักงานและบ้านจัดสรร",
          },
          {
            name: "บ้านแพ้ว (เกษตรกรรม – คลองดำเนินสะดวก)",
            href: "/areas/maha-chai/ban-phaeo",
            subtitle: "รถกระบะรับจ้างขนส่งสินค้าเกษตรและขนย้ายทั่วไป",
          },
        ]`;
replaceInFile(serviceProvPath, targetSamutChild, replacementSamutChild);

console.log('All basic link improvements applied successfully!');

