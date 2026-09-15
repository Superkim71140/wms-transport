import { 
  ClipboardList, 
  Calculator, 
  Calendar, 
  Truck, 
  CheckCircle2 
} from "lucide-react";

type Step = {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  {
    step: "01",
    title: "แจ้งรายละเอียด",
    desc: "ส่งข้อมูลจุดรับ-ส่ง ประเภทของที่ขนย้าย วันเวลา และเลือกขนาดรถที่ต้องการผ่าน LINE หรือเบอร์โทร",
    icon: <ClipboardList className="w-5 h-5" />
  },
  {
    step: "02",
    title: "ประเมินราคาและตกลง",
    desc: "แอดมินคำนวณราคาตามระยะทางจริงและส่งใบเสนอราคาให้ทันที มั่นใจราคาโปร่งใส ไม่มีบวกเพิ่ม",
    icon: <Calculator className="w-5 h-5" />
  },
  {
    step: "03",
    title: "นัดวันขนย้าย",
    desc: "ล็อกคิวรถและพนักงานยกของ ยืนยันข้อมูล วันที่ เวลา และเบอร์ติดต่อผู้รับปลายทางให้เรียบร้อย",
    icon: <Calendar className="w-5 h-5" />
  },
  {
    step: "04",
    title: "ดำเนินการขนย้าย",
    desc: "รถและพนักงานเข้าปฏิบัติงาน แพ็กซีลของยกขึ้นรถอย่างระมัดระวัง พร้อมออกเดินทางไปยังจุดหมายอย่างปลอดภัย",
    icon: <Truck className="w-5 h-5" />
  },
  {
    step: "05",
    title: "ส่งถึงปลายทางปลอดภัย",
    desc: "ขนส่งถึงจุดหมายปลายทาง นำสิ่งของเข้าจัดวาง ณ จุดที่ต้องการ ตรวจเช็กความถูกต้อง และชำระเงินค่าบริการ",
    icon: <CheckCircle2 className="w-5 h-5" />
  }
];

export default function ServiceSteps() {
  return (
    <section 
      id="process" 
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative w-full z-10 section-contain bg-slate-50/60"
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-14 md:mb-20 relative z-10">
        <span className="bg-blue-50 text-blue-700 border border-blue-200/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block shadow-xs">
          ขั้นตอนการบริการ
        </span>
        
        <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl text-[#0B1F3A] tracking-tight">
          5 ขั้นตอนการบริการมาตรฐาน WMS
        </h2>
        
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mt-4 leading-relaxed font-normal">
          จากนาทีแรกที่ทัก LINE หาเรา จนส่งมอบงานเรียบร้อยแบบไร้กังวล ด้วยระบบจัดการที่ได้มาตรฐาน
        </p>

        <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mt-6" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 font-sans">
        
        {/* Timeline Line (Desktop) */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 hidden md:block bg-blue-200" />

        {/* Mobile vertical line */}
        <div className="absolute left-6 top-4 bottom-4 -translate-x-1/2 w-0.5 md:hidden bg-blue-200" />

        <div className="space-y-8 md:space-y-16">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;

            return (
              <div 
                key={i} 
                className={`flex flex-col md:flex-row items-start md:items-center relative ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline node number badge */}
                <div 
                  className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-[#2563EB] text-white text-base font-black font-mono shadow-md ring-8 ring-white"
                >
                  {i + 1}
                </div>

                {/* Card side: left or right */}
                <div className="w-full md:w-1/2 pl-14 md:pl-0 md:px-12">
                  <div
                    className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-xs transition-all duration-300 hover:shadow-md hover:border-blue-300"
                  >
                    {/* Watermark Numbers */}
                    <div className="absolute -right-2 -bottom-4 text-7xl sm:text-8xl font-black text-slate-100 select-none pointer-events-none font-mono">
                      {step.step}
                    </div>

                    {/* Content */}
                    <div className="flex items-start gap-4 sm:gap-5 relative z-10">
                      {/* Icon wrapper */}
                      <div className="w-11 h-11 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl flex-shrink-0 flex items-center justify-center shadow-xs">
                        {step.icon}
                      </div>

                      <div className="space-y-2 min-w-0">
                        <h3 className="text-lg sm:text-xl font-bold text-[#0B1F3A]">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty spacer side for desktop layout */}
                <div className="w-full md:w-1/2 hidden md:block" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
