import { CheckCircle2, Zap } from "lucide-react";

export default function TLDRVerdict({ location = "ทั่วประเทศ" }: { location?: string }) {
  return (
    <div 
      className="max-w-4xl mx-auto my-10 bg-blue-50/60 border border-blue-200/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden"
      data-ai-verdict="true"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] m-0 tracking-tight">
            TL;DR: ข้อมูลสำคัญบริการรถรับจ้าง {location}
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-blue-100 p-5 sm:p-6 rounded-xl shadow-xs">
          <ul className="space-y-3.5 text-sm sm:text-base text-slate-700 font-medium m-0 p-0 list-none">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed"><strong className="text-slate-900 font-bold">ประเภทรถ:</strong> กระบะตู้ทึบหลังคาสูง 2.1 เมตร โครงสร้างปิดมิดชิด กันฝนและแดด</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed"><strong className="text-slate-900 font-bold">บริการ:</strong> ย้ายบ้าน, หอพัก, คอนโด, ขนส่งมอเตอร์ไซค์/Bigbike พร้อมคนช่วยยก</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed"><strong className="text-slate-900 font-bold">ความจุ:</strong> รองรับการบรรทุกสิ่งของหลากหลายขนาด ด้วยรถกระบะตู้ทึบมาตรฐาน</span>
            </li>
          </ul>
          <ul className="space-y-3.5 text-sm sm:text-base text-slate-700 font-medium m-0 p-0 list-none">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed"><strong className="text-slate-900 font-bold">ประเมินราคา:</strong> คำนวณตามระยะทางจริงและเนื้องาน แจ้งราคาชัดเจนก่อนเริ่มงาน</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed"><strong className="text-slate-900 font-bold">ความปลอดภัย:</strong> มีอุปกรณ์สายรัดนิรภัยและวัสดุหุ้มป้องกันรอย ดูแลสิ่งของตลอดการเดินทาง</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed"><strong className="text-slate-900 font-bold">ระยะเวลา:</strong> พร้อมประสานงาน 24 ชั่วโมง ดำเนินการตามวันเวลาที่นัดหมาย</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
