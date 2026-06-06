"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

const locationLinks = [
  { name: "บริการขนส่ง ภูเก็ต", href: "/service/phuket" },
  { name: "บริการขนส่ง สมุทรสาคร", href: "/service/samutsakhon" },
  { name: "บริการขนส่ง กทม. ฝั่งธน", href: "/service/bkk-thonburi" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPhuketDropdownOpen, setIsPhuketDropdownOpen] = useState(false);
  const [isMobilePhuketOpen, setIsMobilePhuketOpen] = useState(false);
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    const interval = setInterval(handleHashChange, 500);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      clearInterval(interval);
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsPhuketDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "บริการของเรา", href: "/#services" },
    { name: "ขั้นตอนการขนย้าย", href: "/#process" },
    { name: "ราคาขนส่ง", href: "/#pricing" },
    { name: "พื้นที่บริการ", href: "/#areas" },
    { name: "ผลงาน", href: "/portfolio" },
    { name: "รีวิวลูกค้า", href: "/#reviews" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/portfolio") {
      return pathname === "/portfolio";
    }
    if (pathname === "/") {
      const hash = href.split("#")[1];
      return activeHash === `#${hash}` || (activeHash === "" && hash === "services");
    }
    return false;
  };

  const isLocationActive = pathname.startsWith("/service/");

  return (
    <nav
      className={`fixed z-[100] transition-all duration-300 ease-in-out
        /* Mobile Layout */
        top-3 left-3 right-3 w-auto max-w-none rounded-2xl px-3 py-2 bg-[#040b15]/95 border border-white/10
        flex items-center justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)]
        
        /* Desktop Layout (lg screens and up) */
        lg:left-1/2 lg:-translate-x-1/2 lg:right-auto lg:w-[98%] lg:max-w-7xl lg:rounded-full lg:px-6 lg:py-3.5 lg:bg-[#040b15]/90 lg:backdrop-blur-2xl
        ${isScrolled ? "lg:top-2 lg:py-2.5 lg:scale-[0.99]" : "lg:top-4 lg:py-3.5 lg:scale-100"}`}
    >
      {/* Premium Logo Lockup */}
      <div className="flex-shrink-0 flex items-center">
        <Link href="/" className="relative group flex items-center gap-3">
          <div className="relative group-hover:scale-105 transition-transform duration-300 flex items-center justify-center shrink-0">
            <Image
              src="/images/logoWMS.webp"
              alt="WMS Transport Logo"
              width={120}
              height={120}
              className="w-auto h-8 sm:h-10 md:h-12 object-contain mix-blend-screen"
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
      <div className="hidden xl:flex items-center gap-4 xl:gap-6">
        {navLinks.map((link) => {
          const active = isActiveLink(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`whitespace-nowrap text-[15px] font-semibold transition-all duration-300 relative group drop-shadow-lg px-4 py-2 hover:text-white ${
                active
                  ? "text-blue-400 border-b-2 border-blue-500 rounded-none"
                  : "text-slate-300 rounded-full"
              }`}
            >
              {link.name}
            </Link>
          );
        })}

        {/* Locations Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsPhuketDropdownOpen((v) => !v)}
            className={`whitespace-nowrap text-[15px] font-semibold transition-all duration-300 px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer ${
              isLocationActive
                ? "text-blue-400"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <MapPin className="w-4 h-4 text-blue-400" />
            พื้นที่ให้บริการ
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isPhuketDropdownOpen ? "rotate-180 text-blue-400" : ""
              }`}
            />
          </button>

          {/* Dropdown Panel with fade-in and slide-up */}
          {isPhuketDropdownOpen && (
            <div className="absolute top-[calc(100%+0.75rem)] right-0 w-[500px] bg-[#040b15]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-[1.3fr_1fr] gap-4 p-4">
                <div className="flex flex-col gap-1">
                  {locationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsPhuketDropdownOpen(false)}
                      className={`text-sm font-semibold px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap ${
                        pathname === link.href
                          ? "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span className="text-blue-400 text-sm">→</span>
                      {link.name}
                    </Link>
                  ))}
                </div>
                
                {/* Featured Portfolio Card */}
                <div className="relative rounded-xl overflow-hidden group/portfolio block h-full min-h-[140px] bg-slate-800 bg-[url('/images/WMS24.webp')] bg-cover bg-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent group-hover/portfolio:via-slate-900/50 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col items-start gap-2 transform group-hover/portfolio:-translate-y-1 transition-transform duration-300">
                    <span className="text-white font-bold text-sm drop-shadow-md">ผลงานขนย้ายล่าสุด</span>
                    <Link 
                      href="/portfolio" 
                      onClick={() => setIsPhuketDropdownOpen(false)} 
                      className="inline-flex items-center text-[11px] text-white hover:text-white font-bold bg-blue-600/80 hover:bg-blue-500 border border-blue-400/50 px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all"
                    >
                      ดูภาพผลงาน →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop CTA Buttons */}
      <div className="hidden lg:flex items-center gap-4 shrink-0">
        <a
          href="tel:0612402436"
          className="whitespace-nowrap flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/15 text-white font-bold text-sm hover:bg-slate-800 hover:border-white/30 transition-all duration-300 shadow-lg group"
        >
          <Phone className="w-4 h-4 text-blue-400 drop-shadow-md group-hover:animate-pulse" />
          <span className="font-mono tracking-wide drop-shadow-lg">061-240-2436</span>
        </a>
        <a
          href="https://line.me/ti/p/DtICkMaDet"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact WMS Transport via LINE"
          className="whitespace-nowrap flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#06C755] hover:bg-[#05B34F] hover:scale-105 active:scale-95 text-white font-black text-sm transition-all duration-300 shadow-[0_0_20px_rgba(6,199,85,0.4)] border border-[#06C755]/30 group"
        >
          <Image
            src="/images/LINE_icon.webp"
            alt="LINE"
            width={20}
            height={20}
            className="h-5 w-5 object-contain shrink-0"
          />
          <span className="drop-shadow-lg">ติดต่อผ่าน LINE</span>
        </a>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="flex xl:hidden items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white drop-shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center p-2 focus:outline-none hover:text-blue-400 transition-colors cursor-pointer"
          aria-label={isMobileMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-[calc(100%+0.5rem)] left-0 w-full bg-[#040b15]/95 backdrop-blur-3xl border border-white/10 py-5 px-4 flex flex-col gap-2 rounded-3xl shadow-2xl z-50">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold block py-3 px-4 rounded-xl transition-colors border ${
                  active
                    ? "text-blue-400 bg-blue-500/10 border-blue-500/20"
                    : "text-slate-200 hover:text-blue-400 hover:bg-white/5 border-transparent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Mobile Locations Submenu */}
          <div className="border border-white/5 rounded-xl overflow-hidden">
            <button
              onClick={() => setIsMobilePhuketOpen((v) => !v)}
              className={`w-full flex items-center justify-between text-sm font-bold py-3 px-4 transition-colors cursor-pointer ${
                isLocationActive
                  ? "text-blue-400 bg-blue-500/10"
                  : "text-slate-200 hover:text-blue-400 hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                พื้นที่ให้บริการ
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isMobilePhuketOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isMobilePhuketOpen && (
              <div className="border-t border-white/5 flex flex-col bg-black/20">
                {locationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-xs font-semibold py-2.5 px-8 transition-colors ${
                      pathname === link.href
                        ? "text-blue-400 bg-blue-500/10"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    → {link.name}
                  </Link>
                ))}
                <div className="px-6 py-3">
                  <Link
                    href="/portfolio"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 rounded-xl text-xs font-bold transition-all shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                  >
                    ผลงานขนย้ายล่าสุด →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2.5 mt-2 border-t border-white/10 pt-4 px-1">
            <a
              href="tel:0612402436"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/10 text-white font-bold text-sm bg-white/5 hover:bg-white/10 transition-colors shadow-inner min-h-[44px]"
            >
              <Phone className="w-4.5 h-4.5 text-blue-400 animate-pulse" />
              <span className="font-mono">โทร 061-240-2436</span>
            </a>
            <a
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact WMS Transport via LINE"
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-black text-sm shadow-[0_0_20px_rgba(6,199,85,0.3)] min-h-[44px]"
            >
              <Image
                src="/images/LINE_icon.webp"
                alt="LINE"
                width={20}
                height={20}
                className="h-5 w-5 object-contain shrink-0"
              />
              <span>ติดต่อผ่าน LINE</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
