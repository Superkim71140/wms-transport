import Link from "next/link";
import { Home, Phone, HelpCircle } from "lucide-react";

export const metadata = {
  title: "404 - ไม่พบหน้าที่ต้องการ | WMS TRANSPORT",
  description: "ขออภัย ไม่พบหน้าที่คุณต้องการในระบบ WMS TRANSPORT",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans text-slate-900">
      <main className="grow flex flex-col items-center justify-center text-center px-4 pt-32 pb-24 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mb-6 shadow-xs">
          <HelpCircle className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-4">
          Error 404
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1F3A] mb-4 tracking-tight">
          ไม่พบหน้าที่คุณต้องการ
        </h1>

        <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-md leading-relaxed">
          หน้าที่คุณกำลังค้นหาอาจถูกเปลี่ยนที่อยู่ ลบ หรือไม่มีอยู่ในระบบ WMS TRANSPORT คุณสามารถกลับไปยังหน้าหลักหรือเลือกบริการที่ต้องการได้จากลิงก์ด้านล่าง
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>กลับหน้าแรก</span>
          </Link>

          <Link
            href="/pricing"
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold rounded-xl text-sm transition-all shadow-xs"
          >
            <span>ดูอัตราค่าบริการ</span>
          </Link>

          <a
            href="tel:0612402436"
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-xs"
          >
            <Phone className="w-4 h-4" />
            <span>โทรสอบถาม 061-240-2436</span>
          </a>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} WMS TRANSPORT. All rights reserved.
      </footer>
    </div>
  );
}
