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
    <div className="my-10 bg-[#0B1F3A] border border-blue-950/50 py-7 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl shadow-sm relative overflow-hidden">
      <div className="relative z-10 text-center md:text-left">
        <p className="text-white font-extrabold text-lg md:text-xl leading-snug mb-2">
          {heading}
        </p>
        <p className="text-slate-300 text-sm leading-relaxed max-w-lg font-medium">
          {subtext}
        </p>
      </div>

      <a
        href="https://line.me/ti/p/DtICkMaDet"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 shrink-0 inline-flex items-center gap-3 px-6 py-3.5 bg-[#06C755] hover:bg-[#05B34F] active:scale-95 text-white font-bold text-base rounded-xl shadow-xs transition-colors whitespace-nowrap"
      >
        <Image
          src="/images/LINE_icon.webp"
          alt="LINE"
          width={20}
          height={20}
          className="h-5 w-5 object-contain shrink-0"
        />
        <span>ปรึกษาและประเมินราคาฟรี</span>
      </a>
    </div>
  );
}
