import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Home,
  Bike,
  Route,
  ChevronDown,
} from "lucide-react";
import InternalLinks from "@/components/InternalLinks";
import { escapeJsonLd } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import ServiceAreaLayout from "@/components/service-area/ServiceAreaLayout";
import ServiceAreaRouteTable from "@/components/service-area/ServiceAreaRouteTable";
import ServiceAreaCoverage from "@/components/service-area/ServiceAreaCoverage";
import ServiceAreaRelatedServices from "@/components/service-area/ServiceAreaRelatedServices";
import ServiceAreaQuoteForm from "@/components/service-area/ServiceAreaQuoteForm";
import { GalleryItem } from "@/components/service-area/ServiceAreaWorkGallery";
import TwoToneHeading from "@/components/service-area/TwoToneHeading";
import LocalPageJumpNav from "@/components/service-area/LocalPageJumpNav";
import JobTypeSelector from "@/components/service-area/JobTypeSelector";
import QuotationPlanner from "@/components/service-area/QuotationPlanner";
import ServiceContactBanner from "@/components/service-area/ServiceContactBanner";
import { provinceMap } from "../../app/(marketing)/service/[province]/page";
import {
  districtLandingPages,
  isDistrictPageIndexable,
  type DistrictRecord,
} from "@/data/districtLandingPages";
import { portfolioCasesData } from "@/data/mediaEvidence";

interface DistrictPageViewProps {
  province: string;
  district: string;
  record: DistrictRecord;
}

export default function DistrictPageView({
  province,
  district,
  record,
}: DistrictPageViewProps) {
  const provConfig = provinceMap[province];
  const name = record.districtThaiName;
  const provThai = provConfig?.name ?? province;
  const provShort = provConfig?.shortName ?? province;

  // JSON-LD Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "หน้าหลัก",
        item: siteConfig.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: provThai,
        item: `${siteConfig.baseUrl}/service/${province}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `เขต${name}`,
        item: `${siteConfig.baseUrl}/areas/${province}/${district}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.baseUrl}/areas/${province}/${district}#service`,
    name: `บริการรถรับจ้างขนของ เขต${name} WMS TRANSPORT`,
    description: record.directAnswer,
    provider: {
      "@id": `${siteConfig.baseUrl}/#moving-company`,
    },
    serviceType: "Moving and Freight Transportation",
    areaServed: {
      "@type": "AdministrativeArea",
      name: `เขต${name}`,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: provThai,
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: record.localFaq.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const verifiedEvidence = record.evidenceItems || [];
  const primaryCaseSlug = record.projectEvidenceIds?.[0];
  const primaryCase = primaryCaseSlug ? portfolioCasesData[primaryCaseSlug] : undefined;

  const imageSchema = verifiedEvidence.length > 0 && verifiedEvidence[0].realImagePath
    ? {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        contentUrl: `${siteConfig.baseUrl}${verifiedEvidence[0].realImagePath}`,
        description: verifiedEvidence[0].shortJobDescription || `ภาพงานจริงเขต${name}`,
      }
    : null;

  const customGalleryItems: GalleryItem[] | undefined =
    verifiedEvidence.length > 0
      ? verifiedEvidence
          .filter((ev): ev is typeof ev & { realImagePath: string } => Boolean(ev.realImagePath))
          .map((ev, i) => ({
            id: `district-ev-${i}`,
            image: ev.realImagePath,
            alt: ev.shortJobDescription || `งานขนย้ายจริงโดย WMS TRANSPORT เขต${name}`,
            title: ev.shortJobDescription || `ผลงานจริงเขต${name}`,
            location: ev.verifiedJobLocation || `เขต${name}`,
            category: "moving" as const,
            tag: "งานจริง WMS",
            date: ev.verifiedJobDate,
          }))
      : undefined;

  const routeRates = [
    {
      route: `ในเขต ${name} และถนนสายหลักใกล้เคียง`,
      distanceOrScope: "ย้ายหอพัก คอนโด บ้าน ทาวน์โฮม และส่งมอเตอร์ไซค์",
      transitTime: "30 - 60 นาที",
      price: "เริ่มต้น 1,500 บาท",
    },
    {
      route: `เขต${name} ➔ ทั่วเขตกรุงเทพฯ และปริมณฑล`,
      distanceOrScope: "ขนส่งสินค้าโรงงาน เหมาเที่ยว ย้ายคอนโด และส่งบิ๊กไบค์",
      transitTime: "1 - 2 ชั่วโมง",
      price: "เริ่มต้น 1,800 บาท",
    },
    {
      route: `เขต${name} ➔ ต่างจังหวัดทุกเส้นทางทั่วประเทศ`,
      distanceOrScope: "เหมารถกระบะตู้ทึบวิ่งตรง ไม่รวมของ ส่งมอบ Door-to-Door",
      transitTime: "ตามระยะทางจริง",
      price: "เริ่มต้นตามระยะทาง",
    },
  ];

  // UX E: Only link to published, indexable pages for nearby areas
  const publishedNearbyDistricts = (record.nearbyDistrictSlugs || [])
    .map((slug) => districtLandingPages[slug])
    .filter((nb): nb is DistrictRecord => Boolean(nb && isDistrictPageIndexable(nb)));

  // If fewer than 3 published nearby, supplement with established published districts (excluding self)
  const establishedPublishedSlugs = ["bang-khae", "pinklao", "nong-khaem", "bang-bon", "maha-chai"];
  const fallbackPublished = establishedPublishedSlugs
    .filter((slug) => slug !== district && !publishedNearbyDistricts.some((nb) => nb.districtSlug === slug))
    .map((slug) => districtLandingPages[slug])
    .filter((nb): nb is DistrictRecord => Boolean(nb));

  const finalNearbyList = [...publishedNearbyDistricts, ...fallbackPublished].slice(0, 3);

  const nearbyAreaLinks = finalNearbyList.map((nb) => ({
    name: `เขต${nb.districtThaiName}`,
    slug: nb.districtSlug,
    href: `/areas/${nb.province}/${nb.districtSlug}`,
  }));

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(breadcrumbSchema)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(serviceSchema)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(faqSchema)) }}
      />
      {imageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(imageSchema)) }}
        />
      )}

      <ServiceAreaLayout
        heroProps={{
          breadcrumbs: [
            { label: "หน้าแรก", href: "/" },
            { label: "พื้นที่ให้บริการ", href: "/areas" },
            { label: provThai, href: `/service/${province}` },
            { label: `เขต${name}`, href: `/areas/${province}/${district}` },
          ],
          h1: record.h1,
          thaiName: `เขต${name}`,
          description: record.directAnswer,
          isHeadquarters: false,
          isRegionalHub: false,
          startingPrice: "เริ่มต้น 1,500 บาท",
          deliveryEstimate: "เข้าถึงหน้างานภายใน 30-60 นาที",
          imageSrc: record.images?.[0]?.path || "/images/WM10.webp",
          imageAlt: record.images?.[0]?.alt,
          imageCaption: record.images?.[0]?.caption || `ภาพงานจริง: รถกระบะตู้ทึบ WMS ให้บริการในพื้นที่เขต${name}`,
          highlightPhrase: [record.districtThaiName, name, `เขต${name}`],
        }}
        sidebarProps={{
          thaiName: `เขต${name}`,
          isHeadquarters: false,
          isRegionalHub: false,
          geographicType: "service_area",
          startingPrice: "เริ่มต้น 1,500 บาท",
          deliveryEstimate: "เข้าถึงหน้างานภายใน 30-60 นาที",
          parentArea: {
            name: `${provThai} (${province === "samutsakhon" ? "สำนักงานใหญ่" : "ศูนย์รวมข้อมูล"})`,
            href: `/service/${province}`,
          },
          corridors: record.travelCorridors.map((c) => ({ name: c })),
          nearbyAreas: nearbyAreaLinks,
        }}
        nearbyAreas={finalNearbyList.map((nb) => ({
          name: `เขต${nb.districtThaiName}`,
          badge: "เปิดหน้าบริการแล้ว",
          description: nb.directAnswer,
          href: `/areas/${nb.province}/${nb.districtSlug}`,
        }))}
        galleryItems={customGalleryItems}
        faqProps={{
          thaiName: `เขต${name}`,
          faqs: record.localFaq,
        }}
      >
        {/* ── UX A: Local Page Jump Navigation ── */}
        <LocalPageJumpNav areaName={`เขต${name}`} />

        {/* ── 1. LOCAL DIRECT ANSWER SUMMARY ── */}
        <section className="mb-10" id="services">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block animate-pulse" />
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              พื้นที่บริการย่อย · เขต{name} ({provShort})
            </span>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs text-left mb-8">
            <TwoToneHeading
              as="h2"
              text={`ข้อมูลสรุปการบริการ เขต${name}`}
              highlight={`เขต${name}`}
              variant="light"
              className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-2"
              highlightClassName="text-blue-600 font-bold"
            />
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              {record.directAnswer}
            </p>
          </div>

          {/* Sub-Services Triad */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link
              href={`/service/${province}/moving`}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold mb-3">
                  <Home className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  ย้ายบ้าน คอนโด ทาวน์โฮม
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  พร้อมทีมงานช่วยยกของ แรปฟิล์มป้องกันรอย และจัดเรียงสัมภาระอย่างเป็นระบบ
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                <span>ดูข้อมูลย้ายบ้าน{name}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href={`/service/${province}/motorcycle`}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold mb-3">
                  <Bike className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  ขนส่งมอเตอร์ไซค์ บิ๊กไบค์
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  ขนส่งในตู้ทึบมิดชิด รัดตรึงด้วยอุปกรณ์ยึดตรึงสิ่งของและล็อกล้อ ปลอดภัยไร้ริ้วรอย
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                <span>ดูข้อมูลส่งมอเตอร์ไซค์</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href={`/service/${province}/freight`}
              className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center font-bold mb-3">
                  <Truck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  ขนส่งสินค้า เหมาเที่ยว
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  รถกระบะตู้ทึบรับส่งสินค้าทั่วไป อุปกรณ์สำนักงาน สินค้าโรงงาน กระจายสู่ทุกจังหวัด
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
                <span>ดูข้อมูลขนส่งสินค้า</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </section>

        {/* ── Contact Banner matching Screenshot 1 ── */}
        <ServiceContactBanner areaName={`เขต${name}`} className="mb-8" />

        {/* ── UX B: Job-Type Selector & Tailored Checklist ── */}
        <JobTypeSelector areaName={`เขต${name}`} provinceSlug={province} />

        {/* ── 2. TRANSPORT & ROUTE TABLE ── */}
        <ServiceAreaRouteTable
          thaiName={`เขต${name}`}
          rates={routeRates}
          customTitle={`ตารางอัตราค่าบริการรถรับจ้างขนของเขต${name}`}
          customDescription={`อัตราค่าบริการเริ่มต้นสำหรับการขนย้ายในเขต ${name} และเส้นทางเชื่อมต่อ`}
        />

        {/* ── 3. ROAD CORRIDORS & LOGISTICS ANALYSIS (Progressive Disclosure) ── */}
        <section className="mb-10 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs scroll-mt-24" id="local-logistics">
          <TwoToneHeading
            as="h3"
            text={`ข้อมูลการรับ–ส่งและเส้นทางสำคัญเขต${name}`}
            highlight={`เขต${name}`}
            variant="light"
            className="text-xl sm:text-2xl font-black text-slate-900 mb-1 flex items-center gap-2.5"
            highlightClassName="text-blue-600 font-black"
          />
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            สรุปภาพรวมแขวงการปกครอง โครงข่ายถนน และข้อมูลความพร้อมในการเข้าเทียบรับ–ส่งสิ่งของในย่าน{name}
          </p>

          <div className="space-y-6">
            {/* Subdistricts (Khwaeng) - Always Visible */}
            {record.subdistricts && record.subdistricts.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-slate-800 font-bold text-xs sm:text-sm mb-2">
                  แขวงการปกครองอย่างเป็นทางการในเขต{name}:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {record.subdistricts.map((sub, i) => (
                    <span
                      key={i}
                      className="text-xs bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-medium"
                    >
                      แขวง{sub}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Service Corridors - Sibling Disclosures */}
            {record.serviceCorridors && record.serviceCorridors.length > 0 ? (
              <div className="space-y-3">
                <h4 className="text-slate-900 font-bold text-xs sm:text-sm mb-1 flex items-center gap-2">
                  <Route className="w-4 h-4 text-blue-600" />
                  <span>กลุ่มเส้นทางบริการและจุดรับ–ส่งสำคัญ:</span>
                </h4>
                {record.serviceCorridors.map((corridor, idx) => (
                  <details
                    key={idx}
                    className="group bg-slate-50/70 rounded-2xl border border-slate-200/90 transition-all duration-200 overflow-hidden open:bg-white open:border-blue-300 open:shadow-xs"
                  >
                    <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none select-none hover:bg-slate-100/60 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                      <div className="pr-4">
                        <h5 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors mb-0.5">
                          {corridor.title}
                        </h5>
                        <p className="text-xs text-slate-500 font-normal line-clamp-1">
                          จุดผ่านสำคัญ: {corridor.coverageAreas.join(" • ")}
                        </p>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white text-slate-400 group-open:bg-blue-50 group-open:text-blue-600 flex items-center justify-center shrink-0 border border-slate-200/80 transition-colors">
                        <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-200" />
                      </div>
                    </summary>
                    <div className="p-4 sm:p-5 pt-2 border-t border-slate-200/70 bg-white space-y-3 text-xs sm:text-sm text-slate-600">
                      <div>
                        <strong className="text-slate-900 block mb-0.5 font-bold">ความเหมาะสมของงานขนย้าย:</strong>
                        <p className="leading-relaxed">{corridor.suitability}</p>
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-0.5 font-bold">โครงข่ายและการเชื่อมต่อเส้นทาง:</strong>
                        <p className="leading-relaxed">{corridor.routeConnections}</p>
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-0.5 font-bold">ปัจจัยประเมินราคา:</strong>
                        <p className="leading-relaxed">{corridor.pricingFactors}</p>
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-0.5 font-bold">คำแนะนำการเตรียมตัวของลูกค้า:</strong>
                        <p className="leading-relaxed">{corridor.customerPrep}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-slate-900 font-bold text-xs sm:text-sm mb-2">
                  เส้นทางคมนาคมหลักที่ทีมงานใช้สัญจร:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {record.travelCorridors.map((c, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1 rounded-full font-bold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Operational Notes & Access Constraints */}
            <div className="pt-2">
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 mb-3">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  รถกระบะตู้ทึบ WMS เข้าตรอกซอยในเขต{name} ได้คล่องตัว พร้อมพนักงานช่วยยกของ แนะนำแจ้งความสูงคานกั้นและจองลิฟต์อาคารล่วงหน้า
                </span>
              </div>

              <details className="group bg-slate-50/70 rounded-2xl border border-slate-200/90 transition-all duration-200 overflow-hidden open:bg-white open:border-blue-300 open:shadow-xs">
                <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none select-none hover:bg-slate-100/60 transition-colors font-bold text-xs sm:text-sm text-slate-800 focus-visible:outline-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
                  <span>ดูรายละเอียดหน้างานและข้อกำหนดความสูงอาคาร</span>
                  <div className="w-7 h-7 rounded-full bg-white text-slate-400 group-open:bg-blue-50 group-open:text-blue-600 flex items-center justify-center shrink-0 border border-slate-200/80 transition-colors">
                    <ChevronDown className="w-4 h-4 transform group-open:rotate-180 transition-transform duration-200" />
                  </div>
                </summary>
                <div className="p-4 sm:p-5 pt-2 border-t border-slate-200/70 bg-white space-y-4 text-xs sm:text-sm text-slate-600">
                  <div>
                    <h5 className="text-slate-900 font-bold text-xs sm:text-sm mb-1">
                      สภาพการเข้าถึงและข้อจำกัดหน้างาน:
                    </h5>
                    <p className="leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                      {record.localOperationalNotes}
                    </p>
                  </div>
                  <div>
                    <h5 className="text-slate-900 font-bold text-xs sm:text-sm mb-1">
                      การเข้าถึงประเภทอาคารและข้อกำหนดความสูง:
                    </h5>
                    <p className="leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                      {record.propertyAccessContext}
                    </p>
                  </div>
                  {record.propertyTypes && record.propertyTypes.length > 0 && (
                    <div>
                      <h5 className="text-slate-900 font-bold text-xs sm:text-sm mb-1.5">
                        ประเภทอสังหาริมทรัพย์ที่ให้บริการเป็นประจำ:
                      </h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                        {record.propertyTypes.map((pt, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* ── 4. COVERAGE CHECKLIST ── */}
        <div id="coverage" className="scroll-mt-24">
          <ServiceAreaCoverage
            coverageAreas={
              record.travelCorridors && record.travelCorridors.length > 0
                ? record.travelCorridors
                : [record.districtThaiName, "พื้นที่ใกล้เคียง"]
            }
            title={`พื้นที่และเส้นทางครอบคลุมในเขต${name}`}
          />
        </div>

        {/* ── UX D: Service Standards & Case Study Link ── */}
        <section
          id="standards"
          aria-labelledby="standards-heading"
          className="mb-10 bg-white border border-slate-200/80 rounded-2xl shadow-xs p-5 sm:p-7 scroll-mt-24"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4 pb-2 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                มาตรฐานการดูแลความปลอดภัย WMS
              </span>
              <h3 id="standards-heading" className="text-lg sm:text-xl font-black text-slate-900">
                มาตรฐานฟลีตรถกระบะตู้ทึบ WMS TRANSPORT พร้อมให้บริการเขต{name}
              </h3>
            </div>

            {primaryCase && (
              <Link
                href={`/portfolio/${primaryCase.slug}`}
                className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 group no-underline"
              >
                <span>อ่านเคสงานฉบับเต็ม</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>

          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/80">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              <h4 className="text-slate-900 font-bold text-sm">
                การันตีความปลอดภัยและข้อกำหนดการปฏิบัติงาน
              </h4>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>รถกระบะตอนเดียวตู้ทึบปิดมิดชิด ความสูง 2.1 ม. ป้องกันแดด ฝน และฝุ่น 100%</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>อุปกรณ์ยึดตรึงสิ่งของและตัวล็อกล้อหน้าสำหรับมอเตอร์ไซค์/บิ๊กไบค์</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>ทีมงานช่วยยกของมืออาชีพ แรปฟิล์มกันรอยเฟอร์นิเจอร์หลักทุกชิ้น</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>แจ้งราคาสุทธิตั้งแต่ก่อนยืนยันบริการ ไม่มีค่าใช้จ่ายแอบแฝง</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── UX C: Four-Item Quote Preparation Panel ── */}
        <QuotationPlanner areaName={`เขต${name}`} />

        {/* ── 8. RELATED SERVICES GRID ── */}
        <ServiceAreaRelatedServices currentProvince={province} />

        {/* ── 9. QUOTATION REQUEST FORM ── */}
        <ServiceAreaQuoteForm
          currentLocationName={`เขต${name} (${provShort})`}
          currentProvince={province}
        />
      </ServiceAreaLayout>

      {/* Internal Links for cluster crawlability */}
      <InternalLinks currentCategory="area" currentSlug={district} />
    </>
  );
}
