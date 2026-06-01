import Image from "next/image";

type InContentCTAProps = {
  heading?: string;
  subtext?: string;
};

export default function InContentCTA({
  heading = "วางแผนย้ายของไปภูเก็ต? ให้ทีมงานผู้เชี่ยวชาญประเมินราคาฟรี!",
  subtext = "ไม่มีค่าใช้จ่าย ไม่ผูกมัด — แค่ส่งรูปถ่ายหรือวิดีโอสิ่งของทาง LINE เจ้าหน้าที่จะประเมินราคาให้ภายใน 5 นาที",
}: InContentCTAProps) {
  return (
    <div className="my-10 bg-gradient-to-r from-blue-900/40 to-[#040b15] border-y border-blue-500/20 py-8 px-6 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden">
      {/* Glow accent */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 text-center md:text-left">
        <p className="text-white font-black text-lg md:text-xl leading-snug mb-2">
          {heading}
        </p>
        <p className="text-slate-300 text-sm leading-relaxed max-w-lg">
          {subtext}
        </p>
      </div>

      <a
        href="https://line.me/ti/p/DtICkMaDet"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 shrink-0 inline-flex items-center gap-3 px-6 py-4 bg-[#06C755] hover:bg-[#05B34F] active:scale-95 text-white font-black text-base rounded-2xl shadow-[0_8px_25px_rgba(6,199,85,0.35)] transition-all duration-300 hover:-translate-y-0.5 border border-[#06C755]/40 whitespace-nowrap"
      >
        <Image
          src="/images/LINE_Brand_icon.png"
          alt="LINE"
          width={22}
          height={22}
          className="w-5 h-5 object-contain shrink-0"
        />
        <span>💬 ปรึกษาและประเมินราคาฟรี</span>
      </a>
    </div>
  );
}
