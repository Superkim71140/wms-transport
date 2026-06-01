import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Navigation } from "lucide-react";

export default function Footer() {
  const seoKeywords = [
    "รถกระบะตู้ทึบรับจ้าง",
    "ย้ายบ้าน",
    "ย้ายคอนโด",
    "ย้ายหอพัก",
    "รถรับจ้างพร้อมคนยก",
    "ขนส่งมอเตอร์ไซค์",
    "ส่งของชิ้นใหญ่",
    "รถกระบะตู้ทึบกรุงเทพ",
    "ขนส่งสินค้าทั่วไทย",
    "ขนของด่วนวันเดียว",
    "รถรับจ้างปทุมธานี",
    "รถรับจ้างนนทบุรี"
  ];

  return (
    <footer className="bg-navy-dark border-t border-white/5 text-gray-400 font-sans pt-16 pb-8 lg:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-4">
              <Image 
                src="/logoWMS.png" 
                alt="WMS Transport Logo Badge" 
                width={112} 
                height={112} 
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-2xl shadow-blue-500/20 border-2 border-slate-700"
              />
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              บริการรถกระบะตู้ทึบรับจ้าง ขนส่งมอเตอร์ไซค์ และย้ายบ้านทั่วไทย บริการด้วยใจ ปลอดภัยทุกเส้นทาง
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-[#1877F2] hover:border-[#1877F2] text-slate-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(24,119,242,0.4)] hover:-translate-y-1 group"
              >
                <svg className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                aria-label="Contact WMS Transport via LINE"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-[#06C755] hover:border-[#06C755] transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(6,199,85,0.4)] hover:-translate-y-1 group"
              >
                <Image 
                  src="/images/LINE_Brand_icon.png" 
                  alt="LINE Logo" 
                  width={20} 
                  height={20} 
                  className="w-5 h-5 object-contain shrink-0 filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 group-hover:brightness-0 group-hover:invert" 
                />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 border-l-2 border-blue-600 pl-3">
              บริการของเรา
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="#services" className="inline-block hover:text-blue-400 hover:translate-x-1 transition-transform duration-300">
                  ย้ายบ้าน/คอนโด
                </Link>
              </li>
              <li>
                <Link href="#services" className="inline-block hover:text-blue-400 hover:translate-x-1 transition-transform duration-300">
                  ขนส่งมอเตอร์ไซค์
                </Link>
              </li>
              <li>
                <Link href="#services" className="inline-block hover:text-blue-400 hover:translate-x-1 transition-transform duration-300">
                  เหมาเที่ยวต่างจังหวัด
                </Link>
              </li>
              <li>
                <Link href="#services" className="inline-block hover:text-blue-400 hover:translate-x-1 transition-transform duration-300">
                  แพ็กสินค้า
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Top Areas */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 border-l-2 border-blue-600 pl-3">
              พื้นที่ยอดฮิต
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="#areas" className="inline-block hover:text-blue-400 hover:translate-x-1 transition-transform duration-300">
                  กรุงเทพมหานคร
                </Link>
              </li>
              <li>
                <Link href="#areas" className="inline-block hover:text-blue-400 hover:translate-x-1 transition-transform duration-300">
                  สมุทรสาคร
                </Link>
              </li>
              <li>
                <Link href="#areas" className="inline-block hover:text-blue-400 hover:translate-x-1 transition-transform duration-300">
                  ชลบุรี
                </Link>
              </li>
              <li>
                <Link href="#areas" className="inline-block hover:text-blue-400 hover:translate-x-1 transition-transform duration-300">
                  ภูเก็ต
                </Link>
              </li>
              <li>
                <Link href="#areas" className="inline-block hover:text-blue-400 hover:translate-x-1 transition-transform duration-300">
                  เชียงใหม่
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Contact */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 border-l-2 border-blue-600 pl-3">
              ติดต่อเรา
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 text-sm">
                <Phone className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:0612402436" className="hover:text-blue-400 transition-colors duration-200 text-white font-bold text-base">
                    061-240-2436
                  </a>
                  <a href="mailto:1999.kittinanwimonset@gmail.com" className="hover:text-blue-400 transition-colors duration-200 text-xs">
                    1999.kittinanwimonset@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20 shadow-inner">
                <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-white tracking-wide">
                  เปิดบริการ 24 ชม.
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20 shadow-inner">
                <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-white tracking-wide">
                  รับประกันสินค้าสูงสุด 100k
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Keywords Block */}
        <div className="py-8 border-b border-white/5">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
            พื้นที่ให้บริการ & คีย์เวิร์ด
          </h4>
          <div className="flex flex-wrap gap-2">
            {seoKeywords.map((word) => (
              <span
                key={word}
                className="text-xs bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-2 py-1 rounded transition-colors duration-150 cursor-default"
              >
                #{word}
              </span>
            ))}
          </div>
        </div>

        {/* Subtle SEO District Block */}
        <div className="pt-6 border-t border-white/5 text-center md:text-left">
          <p className="text-xs text-slate-500 leading-relaxed">
            พื้นที่ให้บริการหลัก: [ภูเก็ต]: อ.เมืองภูเก็ต, อ.กะทู้, อ.ถลาง | [สมุทรสาคร]: อ.เมืองสมุทรสาคร, อ.กระทุ่มแบน, อ.บ้านแพ้ว | [กทม. ฝั่งธน]: ธนบุรี, คลองสาน, บางกอกน้อย, บางกอกใหญ่, ตลิ่งชัน
          </p>
        </div>

        {/* Copyright & Developer Credit */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 mb-16 lg:mb-0">
          <p>© {new Date().getFullYear()} WMS TRANSPORT. All rights reserved.</p>
          <div className="flex items-center gap-1 font-medium">
            <span>Developed by</span>
            <a 
              href="https://kimx-wed.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-400 hover:text-blue-300 hover:underline transition-all duration-300 relative group"
            >
              kimx-wed
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
