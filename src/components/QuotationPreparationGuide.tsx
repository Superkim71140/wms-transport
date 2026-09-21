import React from "react";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Building2,
  ArrowUpDown,
  Package,
  Bike,
  Users,
  Camera,
  Phone,
  CheckCircle2,
  FileText,
} from "lucide-react";

interface QuotationPreparationGuideProps {
  pageContext?: string;
  className?: string;
}

export default function QuotationPreparationGuide({
  pageContext,
  className = "",
}: QuotationPreparationGuideProps) {
  const preparationPhases = [
    {
      phaseNumber: "01",
      phaseTitle: "เส้นทางและกำหนดการ",
      phaseDesc: "ตรวจสอบระยะทางและคิวรถว่างในวันเวลาที่ต้องการ",
      items: [
        {
          icon: MapPin,
          title: "จุดรับและจุดส่งจริง",
          desc: "ระบุพิกัดต้นทางและปลายทาง เช่น เขต ซอย หรือชื่อโครงการ เพื่อคำนวณระยะทางแม่นยำ",
        },
        {
          icon: Calendar,
          title: "วันและเวลาที่สะดวก",
          desc: "ระบุวันและช่วงเวลาขนย้าย เพื่อให้เจ้าหน้าที่ตรวจสอบสถานะคิวรถว่างล่วงหน้า",
        },
      ],
    },
    {
      phaseNumber: "02",
      phaseTitle: "สถานที่และการเข้าถึง",
      phaseDesc: "ประเมินความสะดวกในการจอดเทียบและการขนถ่าย",
      items: [
        {
          icon: Building2,
          title: "ประเภทที่พักและชั้นอาคาร",
          desc: "เช่น คอนโดมิเนียม ทาวน์โฮม หรือบ้านเดี่ยว พร้อมแจ้งชั้นและระยะทางเดินเท้า",
        },
        {
          icon: ArrowUpDown,
          title: "ลิฟต์หรือบันไดขนของ",
          desc: "แจ้งว่ามีลิฟต์ขนของ ลิฟต์โดยสาร หรือจำเป็นต้องเดินขึ้นลงบันไดกี่ชั้น",
        },
      ],
    },
    {
      phaseNumber: "03",
      phaseTitle: "รายการสัมภาระและของพิเศษ",
      phaseDesc: "เลือกขนาดพื้นที่กระบะตู้ทึบและอุปกรณ์ป้องกันที่เหมาะสม",
      items: [
        {
          icon: Package,
          title: "รายการสิ่งของโดยประมาณ",
          desc: "เช่น ที่นอน ตู้เย็น โซฟา โต๊ะทำงาน กล่องสัมภาระ เพื่อเลือกรถที่เหมาะสม",
        },
        {
          icon: Bike,
          title: "ของชิ้นใหญ่หรือมอเตอร์ไซค์",
          desc: "แจ้งรุ่นรถมอเตอร์ไซค์ บิ๊กไบค์ หรือสิ่งของเปราะบางที่ต้องใช้อุปกรณ์ยึดตรึงเป็นพิเศษ",
        },
      ],
    },
    {
      phaseNumber: "04",
      phaseTitle: "ทีมงานยกของและรูปภาพ",
      phaseDesc: "จัดสรรคนยกให้เพียงพอและป้องกันราคาบวกเพิ่ม",
      items: [
        {
          icon: Users,
          title: "ความต้องการคนช่วยยกของ",
          desc: "ระบุว่ามีคนช่วยยกเอง หรือต้องการทีมงานช่วยยกของและจัดเรียงอย่างมืออาชีพ",
        },
        {
          icon: Camera,
          title: "ภาพถ่ายหน้างาน (ถ้ามี)",
          desc: "ส่งรูปถ่ายสิ่งของหรือจุดจอดเทียบรถทาง LINE เพื่อให้ประเมินงานได้ชัดเจนที่สุด",
        },
      ],
    },
  ];

  return (
    <section
      className={`bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs ${className}`}
      aria-labelledby="quotation-guide-title"
    >
      {/* Section Header */}
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold mb-3 shadow-2xs">
          <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>ขั้นตอนเตรียมข้อมูลขอใบเสนอราคา</span>
        </div>
        <h2
          id="quotation-guide-title"
          className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0B1F3A] tracking-tight mb-3"
        >
          ข้อมูลที่ควรเตรียมสำหรับขอใบเสนอราคา {pageContext ? `(${pageContext})` : ""}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          เตรียมข้อมูลสำคัญ 4 หมวดหมู่นี้ก่อนติดต่อ เพื่อให้เจ้าหน้าที่ตรวจสอบขนาดรถ จัดเตรียมอุปกรณ์ป้องกัน และประเมินราคาได้อย่างถูกต้อง โปร่งใส ไม่มีค่าใช้จ่ายแอบแฝง
        </p>
      </div>

      {/* 4 Grouped Step Phases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 mb-8">
        {preparationPhases.map((phase) => (
          <div
            key={phase.phaseNumber}
            className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:bg-blue-50/30 hover:border-blue-200 transition-all duration-200"
          >
            <div>
              {/* Phase Header */}
              <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-200/80 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                    {phase.phaseNumber}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-[#0B1F3A]">
                    {phase.phaseTitle}
                  </h3>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </div>

              {/* 2 Items per Phase */}
              <div className="space-y-4">
                {phase.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  return (
                    <div key={iIdx} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200/90 flex items-center justify-center text-blue-600 shrink-0 mt-0.5 shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Card */}
      <div className="bg-gradient-to-r from-blue-50/80 via-slate-50 to-emerald-50/50 border border-blue-100 rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-5">
        <div className="text-center lg:text-left">
          <p className="font-bold text-sm sm:text-base text-slate-900 mb-1">
            พร้อมส่งข้อมูลให้เจ้าหน้าที่ตรวจสอบและประเมินราคาทันที
          </p>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            แจ้งรายละเอียดข้างต้นทาง LINE หรือโทรสอบถาม เพื่อตรวจสอบขนาดรถและทีมงานช่วยยกของ
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
          <a
            href="https://line.me/ti/p/DtICkMaDet"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-sm transition-all shadow-xs hover:shadow-emerald-600/20 active:scale-[0.98] min-h-[44px]"
          >
            <Image
              src="/images/LINE_icon.webp"
              alt="LINE"
              width={18}
              height={18}
              className="w-4.5 h-4.5 object-contain shrink-0"
            />
            <span>ส่งข้อมูลทาง LINE เพื่อประเมินราคา</span>
          </a>
          <a
            href="tel:0612402436"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0B1F3A] border border-slate-300 font-bold text-sm transition-all shadow-2xs active:scale-[0.98] min-h-[44px]"
          >
            <Phone className="w-4 h-4 text-blue-600 shrink-0" />
            <span>โทร 061-240-2436</span>
          </a>
        </div>
      </div>
    </section>
  );
}
