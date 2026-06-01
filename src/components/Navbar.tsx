"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "บริการของเรา", href: "/#services" },
    { name: "ทำไมต้องเรา", href: "/#why-choose-us" },
    { name: "ขั้นตอนการขนย้าย", href: "/#process" },
    { name: "พื้นที่บริการ", href: "/#areas" },
    { name: "ผลงาน", href: "/portfolio" },
    { name: "รีวิวลูกค้า", href: "/#reviews" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-[#040b15]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] py-3"
          : "bg-gradient-to-b from-[#040b15]/85 via-[#040b15]/40 to-transparent py-6 drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]" 
      }`}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600/0 via-red-500 to-red-600/0 shadow-[0_0_10px_rgba(239,68,68,0.5)] z-[-1]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1">
        <div className="flex justify-between items-center gap-4">
          
          {/* Premium Logo Lockup */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="relative group flex items-center gap-3">
              <div className="relative bg-[#040b15] p-1 rounded-full border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-300 flex items-center justify-center shrink-0">
                <Image
                  src="/logoWMS.png"
                  alt="WMS Transport Logo"
                  width={120}
                  height={120}
                  className="w-auto h-10 sm:h-12 object-contain rounded-full"
                  priority
                />
              </div>
              <div className="hidden sm:flex flex-col justify-center">
                <span className="text-white font-black text-lg leading-none tracking-wide drop-shadow-lg whitespace-nowrap">WMS</span>
                <span className="text-blue-400 font-bold text-[10px] tracking-widest uppercase drop-shadow-lg whitespace-nowrap">Transport</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="whitespace-nowrap text-[13px] xl:text-sm font-bold text-white/90 hover:text-white transition-all duration-300 relative group drop-shadow-lg"
              >
                {link.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-red-500 transition-all duration-300 group-hover:w-full drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                <span className="absolute inset-0 bg-red-500/10 rounded-md scale-90 opacity-0 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 -z-10"></span>
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="tel:0612402436"
              className="whitespace-nowrap flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/15 text-white font-bold text-[13px] hover:bg-slate-800 hover:border-white/30 transition-all duration-300 shadow-lg group"
            >
              <Phone className="w-4 h-4 text-blue-400 drop-shadow-md group-hover:animate-pulse" />
              <span className="font-mono tracking-wide drop-shadow-lg">061-240-2436</span>
            </a>
            <a
              href="https://line.me/ti/p/~@wmstransport"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap flex items-center gap-2 px-5 xl:px-6 py-2.5 rounded-full bg-gradient-to-r from-[#06C755] to-[#05B34F] hover:from-[#05B34F] hover:to-[#04A045] text-white font-black text-[13px] transition-all duration-300 shadow-[0_0_20px_rgba(6,199,85,0.4)] hover:shadow-[0_0_30px_rgba(6,199,85,0.6)] hover:-translate-y-0.5 border border-[#06C755]/30 group"
            >
              <Image 
                src="/images/LINE_Brand_icon.png" 
                alt="LINE Logo" 
                width={18} 
                height={18} 
                className="w-4.5 h-4.5 object-contain shrink-0 filter brightness-100" 
              />
              <span className="drop-shadow-lg">ติดต่อขนส่งผ่าน LINE</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white drop-shadow-lg p-2 focus:outline-none hover:text-red-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-[#040b15]/98 backdrop-blur-3xl border-b border-white/10 py-6 px-4 flex flex-col gap-2 shadow-2xl z-50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-bold text-slate-200 hover:text-white hover:bg-white/5 block py-3.5 px-5 rounded-xl transition-colors border border-transparent hover:border-white/5"
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4 border-t border-white/10 pt-6 px-2">
            <a
              href="tel:0612402436"
              className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl border border-white/20 text-white font-bold text-sm bg-white/5 hover:bg-white/10 transition-colors shadow-inner"
            >
              <Phone className="w-5 h-5 text-blue-400" />
              <span className="font-mono">โทรด่วน: 061-240-2436</span>
            </a>
            <a
              href="https://line.me/ti/p/~@wmstransport"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl bg-gradient-to-r from-[#06C755] to-[#05B34F] text-white font-black text-sm shadow-[0_0_20px_rgba(6,199,85,0.3)] relative overflow-hidden group"
            >
              <Image 
                src="/images/LINE_Brand_icon.png" 
                alt="LINE Logo" 
                width={20} 
                height={20} 
                className="w-5 h-5 object-contain shrink-0 relative z-10" 
              />
              <span className="relative z-10">ติดต่อขนส่งผ่าน LINE</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
