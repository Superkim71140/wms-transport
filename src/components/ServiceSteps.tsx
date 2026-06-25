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
    icon: <ClipboardList className="w-6 h-6" />
  },
  {
    step: "02",
    title: "ประเมินราคาและตกลง",
    desc: "แอดมินคำนวณราคาตามระยะทางจริงและส่งใบเสนอราคาให้ทันที มั่นใจราคาโปร่งใส ไม่มีบวกเพิ่ม",
    icon: <Calculator className="w-6 h-6" />
  },
  {
    step: "03",
    title: "นัดวันขนย้าย",
    desc: "ล็อกคิวรถและพนักงานยกของ ยืนยันข้อมูล วันที่ เวลา และเบอร์ติดต่อผู้รับปลายทางให้เรียบร้อย",
    icon: <Calendar className="w-6 h-6" />
  },
  {
    step: "04",
    title: "ดำเนินการขนย้าย",
    desc: "รถและพนักงานเข้าปฏิบัติงาน แพ็กซีลของยกขึ้นรถอย่างระมัดระวัง พร้อมออกเดินทางไปยังจุดหมายอย่างปลอดภัย",
    icon: <Truck className="w-6 h-6" />
  },
  {
    step: "05",
    title: "ส่งถึงปลายทางปลอดภัย",
    desc: "ขนส่งถึงจุดหมายปลายทาง นำสิ่งของเข้าจัดวาง ณ จุดที่ต้องการ ตรวจเช็กความถูกต้อง และชำระเงินค่าบริการ",
    icon: <CheckCircle2 className="w-6 h-6" />
  }
];

export default function ServiceSteps() {
  return (
    <section 
      id="process" 
      className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 relative w-full z-10 section-contain"
    >
      {/* Background Glow Orbs for the timeline section - Desktop Only */}
      <div className="absolute top-1/4 left-[10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none hidden md:block" />
      <div className="absolute bottom-1/4 right-[10%] w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[180px] pointer-events-none hidden md:block" />

      {/* Header */}
      <div className="max-w-[1600px] mx-auto text-center mb-16 md:mb-24 relative z-10">
        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 inline-block shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          ขั้นตอนการบริการ
        </span>
        
        <h2 className="font-sans font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight">
          5 ขั้นตอนการบริการพรีเมียม
        </h2>
        
        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 md:mt-6 leading-relaxed font-medium">
          จากนาทีแรกที่ทักไลน์หาเรา จนส่งมอบงานเรียบร้อยแบบไร้กังวล ด้วยระบบจัดการที่ได้มาตรฐาน
        </p>

        <div className="relative w-48 h-[2px] mx-auto mt-8 bg-linear-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10 font-sans">
        
        {/* The "Active Route" Timeline Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-[3px] hidden md:block">
          {/* Faint background track */}
          <div className="absolute inset-0 w-full bg-white/5" />
          {/* Blue glowing gradient overlay */}
          <div className="absolute inset-0 w-full bg-linear-to-b from-blue-400 via-blue-600 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
        </div>

        {/* Mobile vertical line */}
        <div className="absolute left-6 top-0 bottom-0 -translate-x-1/2 w-[3px] md:hidden bg-linear-to-b from-blue-400 via-blue-600 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

        <div className="space-y-12 md:space-y-32">
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
                  className="absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 flex items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-blue-700 text-white text-lg font-black font-mono shadow-[0_0_25px_rgba(59,130,246,0.8)] ring-8 ring-[#04152D]"
                >
                  {i + 1}
                </div>

                {/* Card side: left or right */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-16">
                  <div
                    className="perf-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group/card transition-all duration-300 md:hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/4"
                  >
                    {/* Giant Watermark Numbers */}
                    <div className="absolute -right-4 -bottom-6 text-8xl sm:text-9xl font-black text-white/3 select-none pointer-events-none font-mono transition-all duration-500 group-hover/card:text-blue-500/5">
                      {step.step}
                    </div>

                    {/* Content */}
                    <div className="flex items-start gap-6 relative z-10">
                      {/* Icon wrapper with soft glow */}
                      <div className="w-14 h-14 bg-white/5 text-blue-400 border border-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg group-hover/card:bg-blue-600 group-hover/card:text-white group-hover/card:border-blue-500 transition-all duration-300 group-hover/card:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                        {step.icon}
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xl sm:text-2xl font-black text-white group-hover/card:text-blue-300 transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty spacer side for desktop layout */}
                <div className="w-full md:w-1/2 hidden md:block"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
