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
      className={`fixed left-1/2 -translate-x-1/2 w-[98%] max-w-7xl bg-[#040b15]/70 backdrop-blur-xl border border-white/10 rounded-full px-6 xl:px-8 flex items-center justify-between shadow-[0_15px_40px_rgba(0,0,0,0.6)] z-[100] transition-all duration-500 ease-out ${
        isScrolled ? "top-3 py-3 scale-[0.99]" : "top-5 py-4.5 scale-100"
      }`}
    >
      {/* Premium Logo Lockup */}
      <div className="flex-shrink-0 flex items-center">
        <Link href="/" className="relative group flex items-center gap-3">
          <div className="relative group-hover:scale-105 transition-transform duration-300 flex items-center justify-center shrink-0">
            <Image
              src="/logoWMS.png"
              alt="WMS Transport Logo"
              width={130}
              height={130}
              className="w-auto h-11 sm:h-13 object-contain mix-blend-screen"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col justify-center">
            <span className="text-white font-black text-xl leading-none tracking-wide drop-shadow-lg whitespace-nowrap">WMS</span>
            <span className="text-blue-400 font-bold text-[11px] tracking-widest uppercase drop-shadow-lg whitespace-nowrap">Transport</span>
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
                  ? "text-red-400 border-b-2 border-red-500 rounded-none"
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
            className={`whitespace-nowrap text-[15px] font-semibold transition-all duration-300 px-4 py-2 rounded-full flex items-center gap-1.5 ${
              isLocationActive
                ? "text-blue-400"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <MapPin className="w-4 h-4 text-blue-400" />
            📍 พื้นที่ให้บริการ
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isPhuketDropdownOpen ? "rotate-180 text-blue-400" : ""
              }`}
            />
          </button>

          {/* Dropdown Panel with fade-in and slide-up */}
          {isPhuketDropdownOpen && (
            <div className="absolute top-[calc(100%+0.75rem)] right-0 w-64 bg-[#040b15]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-2 flex flex-col gap-1">
                {locationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsPhuketDropdownOpen(false)}
                    className={`text-sm font-semibold px-4 py-3 rounded-xl transition-all duration-200 flex items-center gap-2.5 ${
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
            </div>
          )}
        </div>
      </div>

      {/* Desktop CTA Buttons */}
      <div className="hidden lg:flex items-center gap-4 shrink-0">
        <a
          href="tel:0612402436"
          className="whitespace-nowrap flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/15 text-white font-bold text-sm hover:bg-slate-800 hover:border-white/30 transition-all duration-300 shadow-lg group"
        >
          <Phone className="w-4 h-4 text-blue-400 drop-shadow-md group-hover:animate-pulse" />
          <span className="font-mono tracking-wide drop-shadow-lg">061-240-2436</span>
        </a>
        <a
          href="https://line.me/ti/p/DtICkMaDet"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact WMS Transport via LINE"
          className="whitespace-nowrap flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#06C755] to-[#05B34F] hover:scale-105 active:scale-95 text-white font-black text-sm transition-all duration-300 shadow-[0_0_20px_rgba(6,199,85,0.4)] border border-[#06C755]/30 group"
        >
          <Image
            src="/images/LINE_Brand_icon.png"
            alt="LINE Logo"
            width={18}
            height={18}
            className="w-4.5 h-4.5 object-contain shrink-0"
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
          {isMobileMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-[calc(100%+0.75rem)] left-0 w-full bg-[#040b15]/95 backdrop-blur-3xl border border-white/10 py-6 px-4 flex flex-col gap-2 rounded-3xl shadow-2xl z-50">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-bold block py-3.5 px-5 rounded-xl transition-colors border ${
                  active
                    ? "text-red-400 bg-red-500/10 border-red-500/30"
                    : "text-slate-200 hover:text-red-400 hover:bg-white/5 border-transparent"
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
              className={`w-full flex items-center justify-between text-base font-bold py-3.5 px-5 transition-colors ${
                isLocationActive
                  ? "text-blue-400 bg-blue-500/10"
                  : "text-slate-200 hover:text-blue-400 hover:bg-white/5"
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                📍 พื้นที่ให้บริการ
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isMobilePhuketOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isMobilePhuketOpen && (
              <div className="border-t border-white/5 flex flex-col">
                {locationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-semibold py-3 px-8 transition-colors ${
                      pathname === link.href
                        ? "text-blue-400 bg-blue-500/10"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    → {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-4 border-t border-white/10 pt-6 px-2">
            <a
              href="tel:0612402436"
              className="flex items-center justify-center gap-2 w-full px-4 py-4 rounded-xl border border-white/20 text-white font-bold text-sm bg-white/5 hover:bg-white/10 transition-colors shadow-inner"
            >
              <Phone className="w-5 h-5 text-blue-400" />
              <span className="font-mono">โทรด่วน: 061-240-2436</span>
            </a>
            <a
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact WMS Transport via LINE"
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
