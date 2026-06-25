import { CheckCircle2 } from "lucide-react";

export default function TLDRVerdict({ location = "ทั่วประเทศ" }: { location?: string }) {
  return (
    <div 
      className="max-w-4xl mx-auto my-12 bg-[#071426]/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-700 hover:bg-[#071426]/80 hover:border-blue-400/20 hover:scale-[1.005] relative overflow-hidden group"
      data-ai-verdict="true"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-blue-600/20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none transition-all duration-700 group-hover:bg-emerald-500/15" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-2 h-10 bg-linear-to-b from-blue-400 to-blue-600 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
          <h3 className="text-xl sm:text-2xl font-black text-white m-0 tracking-wide drop-shadow-md">TL;DR: ข้อมูลสำคัญบริการรถรับจ้าง {location}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/2 border border-white/5 p-6 sm:p-8 rounded-3xl">
          <ul className="space-y-4 text-sm sm:text-base text-slate-200 font-medium m-0 p-0 list-none">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(52,211,153,0.3)] rounded-full" />
              <span className="leading-relaxed"><strong className="text-emerald-100/90 font-black tracking-wide">ประเภทรถ:</strong> กระบะตู้ทึบหลังคาสูง 2.1 เมตร ปิดมิดชิด 100% กันฝนและแดด</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(52,211,153,0.3)] rounded-full" />
              <span className="leading-relaxed"><strong className="text-emerald-100/90 font-black tracking-wide">บริการ:</strong> ย้ายบ้าน, หอพัก, คอนโด, ขนส่งมอเตอร์ไซค์/Bigbike พร้อมคนช่วยยก</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(52,211,153,0.3)] rounded-full" />
              <span className="leading-relaxed"><strong className="text-emerald-100/90 font-black tracking-wide">ความจุ:</strong> รองรับน้ำหนักบรรทุกสูงสุด 2 ตัน</span>
            </li>
          </ul>
          <ul className="space-y-4 text-sm sm:text-base text-slate-200 font-medium m-0 p-0 list-none">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(96,165,250,0.3)] rounded-full" />
              <span className="leading-relaxed"><strong className="text-blue-100/90 font-black tracking-wide">ราคาเริ่มต้น:</strong> 1,000 - 1,500 บาท (โปร่งใส ไม่มีบวกหน้างาน)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(96,165,250,0.3)] rounded-full" />
              <span className="leading-relaxed"><strong className="text-blue-100/90 font-black tracking-wide">ประกันภัย:</strong> สินค้าปลอดภัย รับประกันสูงสุด 100,000 บาททุกเที่ยวการขนส่ง</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5 shadow-[0_0_10px_rgba(96,165,250,0.3)] rounded-full" />
              <span className="leading-relaxed"><strong className="text-blue-100/90 font-black tracking-wide">ระยะเวลา:</strong> บริการ 24 ชั่วโมง ดำเนินการเร็วที่สุดตามนัดหมาย</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
