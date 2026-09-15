"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

const locationLinks = [
  { name: "บริการขนส่ง ภูเก็ต", href: "/service/phuket" },
  { name: "บริการขนส่ง สมุทรสาคร", href: "/service/samutsakhon" },
  { name: "บริการขนส่ง สมุทรสงคราม", href: "/service/samut-songkhram" },
  { name: "บริการขนส่ง กทม. ฝั่งธน", href: "/service/bkk-thonburi" },
  { name: "บริการขนส่ง กทม. ฝั่งพระนคร", href: "/service/bkk-phra-nakhon" },
];

const navLinks = [
  { name: "บริการของเรา", href: "/#services" },
  { name: "ขั้นตอนการขนย้าย", href: "/#process" },
  { name: "ราคาขนส่ง", href: "/#pricing" },
  { name: "พื้นที่บริการ", href: "/#areas" },
  { name: "ผลงาน", href: "/portfolio" },
  { name: "รีวิวลูกค้า", href: "/#reviews" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPhuketDropdownOpen, setIsPhuketDropdownOpen] = useState(false);
  const [isMobilePhuketOpen, setIsMobilePhuketOpen] = useState(false);
  const pathname = usePathname();
  const [activeHash, setActiveHash] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isIndicatorReady, setIsIndicatorReady] = useState(false);
  const navItemsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    let frameId: number;
    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        setIsScrolled((prev) => {
          const next = window.scrollY > 20;
          return prev !== next ? next : prev;
        });
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash((prev) => {
        const next = window.location.hash;
        return prev !== next ? next : prev;
      });
    };
    handleHashChange();

    if (pathname !== "/") {
      window.addEventListener("hashchange", handleHashChange, { passive: true });
      return () => window.removeEventListener("hashchange", handleHashChange);
    }

    const sections = navLinks
      .map((link) => link.href)
      .filter((href) => href.startsWith("/#"))
      .map((href) => href.replace("/#", ""));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newHash = `#${entry.target.id}`;
            setActiveHash((prev) => {
              if (prev !== newHash) {
                window.history.replaceState(null, "", newHash);
                return newHash;
              }
              return prev;
            });
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    const observeSections = () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    const timeout = setTimeout(observeSections, 150);
    window.addEventListener("hashchange", handleHashChange, { passive: true });

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsPhuketDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside, { passive: true });
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActiveLink = useCallback((href: string) => {
    if (href === "/portfolio") {
      return pathname === "/portfolio";
    }
    if (pathname === "/") {
      const hash = href.split("#")[1];
      return activeHash === `#${hash}` || (activeHash === "" && hash === "services");
    }
    return false;
  }, [pathname, activeHash]);

  const isLocationActive = pathname.startsWith("/service/");

  // Dynamic Indicator Effect
  useEffect(() => {
    const updateIndicator = () => {
      let activeElement: HTMLElement | null = null;

      for (const link of navLinks) {
        if (isActiveLink(link.href)) {
          activeElement = navItemsRef.current.get(link.href) || null;
          break;
        }
      }

      if (!activeElement && isLocationActive) {
        activeElement = navItemsRef.current.get("location") || null;
      }

      if (activeElement && activeElement.offsetWidth > 0) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
          opacity: 1,
        });
        setTimeout(() => setIsIndicatorReady(true), 50);
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    const timer = setTimeout(updateIndicator, 100);
    window.addEventListener("resize", updateIndicator);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [pathname, activeHash, isLocationActive, isActiveLink]);

  return (
    <nav
      className={`fixed z-100 transition-all duration-300 ease-in-out
        /* Mobile Layout */
        top-3 left-3 right-3 w-auto max-w-none rounded-2xl px-3.5 py-2.5 bg-white/95 backdrop-blur-md border border-slate-200/90
        flex items-center justify-between shadow-[0_4px_20px_-2px_rgba(11,31,58,0.08)] overflow-hidden lg:overflow-visible
        
        /* Desktop Layout (lg screens and up) */
        lg:left-1/2 lg:-translate-x-1/2 lg:right-auto lg:w-[98%] lg:max-w-7xl lg:rounded-full lg:px-6 lg:py-3 lg:bg-white/95 lg:backdrop-blur-md
        ${isScrolled ? "lg:top-2 lg:py-2.5 shadow-[0_10px_30px_-5px_rgba(11,31,58,0.12)] border-slate-300/80" : "lg:top-4 lg:py-3.5 border-slate-200/80"}`}
    >
      <div 
        aria-hidden="true" 
        className={`absolute top-0 h-[2px] rounded-full bg-linear-to-r from-transparent via-blue-600 to-transparent ${
          isIndicatorReady ? "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" : ""
        }`}
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          opacity: indicatorStyle.opacity,
        }}
      />
      {/* Brand Logo Lockup */}
      <div className="shrink-0 flex items-center">
        <Link href="/" className="relative group flex items-center gap-3">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-[#0B1F3A] flex items-center justify-center border border-slate-200/80 shadow-xs shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logoWMS.webp"
              alt="WMS Transport Logo"
              width={56}
              height={56}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col justify-center">
            <span className="text-[#0B1F3A] font-black text-lg leading-none tracking-wide whitespace-nowrap">WMS</span>
            <span className="text-blue-600 font-bold text-[10px] tracking-widest uppercase whitespace-nowrap">Transport</span>
          </div>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden xl:flex items-center gap-2 xl:gap-3">
        {navLinks.map((link) => {
          const active = isActiveLink(link.href);
          return (
            <Link
              key={link.name}
              href={link.href}
              ref={(el) => {
                if (el) navItemsRef.current.set(link.href, el);
                else navItemsRef.current.delete(link.href);
              }}
              className={`whitespace-nowrap text-[15px] font-semibold transition-all duration-200 px-3.5 py-1.5 rounded-full ${
                active
                  ? "text-blue-600 font-bold bg-blue-50"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              {link.name}
            </Link>
          );
        })}

        {/* Locations Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            ref={(el) => {
              if (el) navItemsRef.current.set("location", el);
              else navItemsRef.current.delete("location");
            }}
            onClick={() => setIsPhuketDropdownOpen((v) => !v)}
            className={`whitespace-nowrap text-[15px] font-semibold transition-all duration-200 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 cursor-pointer ${
              isLocationActive
                ? "text-blue-600 font-bold bg-blue-50"
                : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
            }`}
          >
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>พื้นที่ให้บริการ</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isPhuketDropdownOpen ? "rotate-180 text-blue-600" : "text-slate-400"
              }`}
            />
          </button>

          {/* Dropdown Panel */}
          {isPhuketDropdownOpen && (
            <div className="absolute top-[calc(100%+0.75rem)] right-0 w-[480px] bg-white border border-slate-200 rounded-2xl shadow-[0_15px_40px_-5px_rgba(11,31,58,0.15)] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-[1.3fr_1fr] gap-3 p-3.5">
                <div className="flex flex-col gap-1">
                  {locationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsPhuketDropdownOpen(false)}
                      className={`text-sm font-semibold px-3.5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2.5 whitespace-nowrap ${
                        pathname === link.href
                          ? "bg-blue-50 text-blue-600 border border-blue-100"
                          : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-blue-500 text-xs">→</span>
                      <span>{link.name}</span>
                    </Link>
                  ))}
                </div>
                
                {/* Featured Portfolio Card */}
                <div className="relative rounded-xl overflow-hidden group/portfolio block h-full min-h-[140px] bg-slate-900">
                  <Image 
                    src="/images/WMS24.webp" 
                    alt="ผลงานขนย้าย WMS" 
                    fill 
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full p-3.5 flex flex-col items-start gap-1.5 z-10">
                    <span className="text-white font-bold text-xs">ผลงานขนย้ายจริง</span>
                    <Link 
                      href="/portfolio" 
                      onClick={() => setIsPhuketDropdownOpen(false)} 
                      className="inline-flex items-center text-[11px] text-white font-bold bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg shadow-sm transition-colors"
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
      <div className="hidden lg:flex items-center gap-3 shrink-0">
        <a
          href="tel:0612402436"
          className="whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 shadow-xs group"
        >
          <Phone className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
          <span className="font-mono tracking-wide text-xs sm:text-sm">061-240-2436</span>
        </a>
        <a
          href="https://line.me/ti/p/DtICkMaDet"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact WMS Transport via LINE"
          className="whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full bg-[#06C755] hover:bg-[#05B34F] active:scale-95 text-white font-bold text-sm transition-all duration-200 shadow-xs border border-[#06C755]/40"
        >
          <Image
            src="/images/LINE_icon.webp"
            alt="LINE"
            width={18}
            height={18}
            className="h-4.5 w-4.5 object-contain shrink-0"
          />
          <span>ติดต่อ LINE</span>
        </a>
      </div>

      {/* Mobile Menu Toggle Button */}
      <div className="flex xl:hidden items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-800 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 focus:outline-none hover:text-blue-600 transition-colors cursor-pointer"
          aria-label={isMobileMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white/98 backdrop-blur-xl border border-slate-200 py-4 px-4 flex flex-col gap-1.5 rounded-2xl shadow-xl z-50">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-bold block py-2.5 px-3.5 rounded-xl transition-colors ${
                  active
                    ? "text-blue-600 bg-blue-50 border border-blue-100"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Mobile Locations Submenu */}
          <div className="border border-slate-200 rounded-xl overflow-hidden my-1">
            <button
              onClick={() => setIsMobilePhuketOpen((v) => !v)}
              className={`w-full flex items-center justify-between text-sm font-bold py-2.5 px-3.5 transition-colors cursor-pointer ${
                isLocationActive
                  ? "text-blue-600 bg-blue-50"
                  : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                พื้นที่ให้บริการ
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isMobilePhuketOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                }`}
              />
            </button>
            {isMobilePhuketOpen && (
              <div className="border-t border-slate-200 flex flex-col bg-slate-50/70">
                {locationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-xs font-semibold py-2.5 px-6 transition-colors ${
                      pathname === link.href
                        ? "text-blue-600 bg-blue-50 font-bold"
                        : "text-slate-600 hover:text-blue-600 hover:bg-white"
                    }`}
                  >
                    → {link.name}
                  </Link>
                ))}
                <div className="px-4 py-2.5">
                  <Link
                    href="/portfolio"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                  >
                    ผลงานขนย้ายล่าสุด →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2 mt-2 border-t border-slate-200 pt-3 px-1">
            <a
              href="tel:0612402436"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 text-slate-800 font-bold text-sm bg-slate-50 hover:bg-slate-100 transition-colors shadow-xs min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span className="font-mono">โทร 061-240-2436</span>
            </a>
            <a
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact WMS Transport via LINE"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-sm shadow-xs min-h-[44px]"
            >
              <Image
                src="/images/LINE_icon.webp"
                alt="LINE"
                width={18}
                height={18}
                className="h-4.5 w-4.5 object-contain shrink-0"
              />
              <span>ติดต่อผ่าน LINE</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
