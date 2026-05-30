import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, Navigation } from "lucide-react";

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
    <footer className="bg-navy-dark border-t border-white/5 text-gray-400 font-sans pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/5">
          
          {/* Column 1: Company Profile with Logo */}
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
            <p className="text-sm leading-relaxed text-gray-400">
              บริการรถกระบะตู้ทึบรับจ้าง ขนของย้ายบ้าน ย้ายหอ คอนโด และขนส่งสินค้าทั่วไทย ด้วยทีมงานคนยกของมืออาชีพ ปลอดภัย ตรงเวลา พร้อมประกันสินค้าทุกเที่ยว
            </p>
            <div className="pt-2 flex items-center gap-4">
              <a
                href="https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr"
                aria-label="Facebook"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                aria-label="Youtube"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 00.5 6.163C0 8.07 0 12 0 12s0 3.93.5 5.837a3.003 3.003 0 002.11 2.108c1.858.555 9.388.555 9.388.555s7.53 0 9.388-.555a3.003 3.003 0 002.11-2.108C24 15.93 24 12 24 12s0-3.93-.5-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 border-l-2 border-blue-600 pl-3">
              ลิงก์ด่วน
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#services" className="hover:text-blue-500 transition-colors duration-200">
                  บริการของเรา
                </Link>
              </li>
              <li>
                <Link href="#why-choose-us" className="hover:text-blue-500 transition-colors duration-200">
                  ทำไมต้องเลือกเรา
                </Link>
              </li>
              <li>
                <Link href="#process" className="hover:text-blue-500 transition-colors duration-200">
                  ขั้นตอนการขนย้าย
                </Link>
              </li>
              <li>
                <Link href="#areas" className="hover:text-blue-500 transition-colors duration-200">
                  พื้นที่ให้บริการ
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="hover:text-blue-500 transition-colors duration-200">
                  ผลงานของเรา
                </Link>
              </li>
              <li>
                <Link href="#reviews" className="hover:text-blue-500 transition-colors duration-200">
                  รีวิวจากลูกค้า
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 border-l-2 border-blue-600 pl-3">
              ติดต่อเรา
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span>
                  75/535 ซ.13 หมู่บ้านสุขถาวร ต.บ้านเกาะ อ.เมือง จ.สมุทรสาคร 74000
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:0612402436" className="hover:text-blue-500 transition-colors duration-200">
                    061-240-2436 (คุณบอส)
                  </a>
                  <a href="tel:0981796946" className="hover:text-blue-500 transition-colors duration-200">
                    098-179-6946 (คุณดาว)
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                <a href="mailto:info@wmstransport.com" className="hover:text-blue-500 transition-colors duration-200">
                  info@wmstransport.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">เปิดบริการทุกวัน 24 ชั่วโมง</p>
                  <p className="text-xs text-gray-500">ไม่มีวันหยุดนักขัตฤกษ์</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Line & Visual Badge */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-base mb-6 border-l-2 border-blue-600 pl-3">
              ติดต่อประเมินราคาด่วน
            </h3>
            <p className="text-xs text-gray-400">
              แอดไลน์ ส่งภาพของประเมินราคา ทราบผลภายใน 10 นาที
            </p>
            <a
              href="https://line.me/ti/p/~@wmstransport"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 line-btn-pulse text-white font-bold rounded-lg text-sm transition-all duration-200 hover:scale-[1.02] transform active:scale-95"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 10.304c0-4.757-5.37-8.561-12-8.561s-12 3.804-12 8.561c0 4.22 4.266 7.748 10.029 8.442.39.084.92.258.92.657v1.815c0 .428-.23.931.817.636 1.048-.296 5.629-3.284 7.683-5.507 3.023-3.111 4.551-6.185 4.551-9.479z" />
              </svg>
              <span>💬 ขอใบเสนอราคาฟรีผ่าน LINE</span>
            </a>

            
            <div className="pt-3 flex flex-wrap gap-3">
              {/* Insured Badge */}
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-950/40 border border-blue-500/10 hover:bg-blue-900/50 hover:border-blue-400/40 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-blue-100 tracking-wide">
                  รับประกันสินค้าทุกเที่ยว
                </span>
              </div>
              
              {/* Live Status Badge */}
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-950/40 border border-blue-500/10 hover:bg-blue-900/50 hover:border-blue-400/40 hover:-translate-y-0.5 transition-all duration-300 cursor-default">
                <Navigation className="w-4 h-4 text-sky-400 flex-shrink-0 rotate-[45deg]" />
                <span className="text-sm font-semibold text-blue-100 tracking-wide">
                  อัปเดตสถานะตลอดทาง
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

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} WMS TRANSPORT. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">นโยบายความเป็นส่วนตัว</Link>
            <Link href="/terms" className="hover:underline">ข้อกำหนดการใช้งาน</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
