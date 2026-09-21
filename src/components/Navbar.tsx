"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown, MapPin, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

const priorityLocations = [
  {
    name: "กรุงเทพฯ ฝั่งธนบุรี (15 เขต)",
    corridor: "เพชรเกษม–บรมฯ",
    href: "/service/bkk-thonburi",
    dotColor: "bg-blue-600",
  },
  {
    name: "ย่านเพชรเกษม–บางแค",
    corridor: "กาญจนาภิเษก",
    href: "/areas/bkk-thonburi/bang-khae",
    dotColor: "bg-sky-500",
  },
  {
    name: "สมุทรสาคร (ฐานบริการหลัก)",
    corridor: "พระราม 2",
    href: "/service/samutsakhon",
    dotColor: "bg-emerald-600",
  },
  {
    name: "มหาชัย–นิคมอุตสาหกรรม",
    corridor: "กระทุ่มแบน",
    href: "/areas/samutsakhon/maha-chai",
    dotColor: "bg-emerald-500",
  },
];

const otherLocations = [
  { name: "สมุทรสงคราม", href: "/service/samut-songkhram" },
  { name: "ภูเก็ต / สายใต้", href: "/service/phuket" },
  { name: "กทม. ฝั่งพระนคร", href: "/service/bkk-phra-nakhon" },
];

const navLinks = [
  { name: "บริการของเรา", href: "/#services" },
  { name: "ขั้นตอนการขนย้าย", href: "/#process" },
  { name: "ราคาขนส่ง", href: "/#pricing" },
  { name: "ผลงาน", href: "/portfolio" },
  { name: "รีวิวลูกค้า", href: "/#reviews" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [isMobileAreaOpen, setIsMobileAreaOpen] = useState(false);
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
        setIsAreaDropdownOpen(false);
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

  const isLocationActive = pathname.startsWith("/service/") || pathname.startsWith("/areas");

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

  // Close mobile menu and area submenu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setIsMobileAreaOpen(false);
  }, []);

  // Close mobile menu and area submenu on pathname change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileAreaOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsMobileAreaOpen(false);
        setIsAreaDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background-page scrolling while drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Backdrop Overlay - Sibling of nav for clean stacking */}
      {isMobileMenuOpen && (
        <div
          role="button"
          tabIndex={-1}
          aria-label="ปิดเมนู"
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[190] xl:hidden transition-opacity duration-300 animate-in fade-in cursor-pointer"
        />
      )}

      <nav
        className={`fixed z-[200] transition-all duration-300 ease-in-out
          /* Mobile Layout */
          top-3 left-3 right-3 w-auto max-w-none rounded-2xl px-3.5 py-2.5 border
          ${isMobileMenuOpen ? "bg-white border-slate-200 shadow-xl" : "bg-white/95 backdrop-blur-md border-slate-200/90 shadow-[0_4px_20px_-2px_rgba(11,31,58,0.08)]"}
          flex items-center justify-between overflow-visible
          
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
          <Link href="/" className="relative group flex items-center gap-3" onClick={closeMobileMenu}>
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
        <div className="hidden xl:flex items-center gap-1.5 xl:gap-2">
          {navLinks.slice(0, 3).map((link) => {
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

          {/* Locations Dropdown (Canonical Menu Entry) */}
          <div className="relative" ref={dropdownRef}>
            <button
              ref={(el) => {
                if (el) navItemsRef.current.set("location", el);
                else navItemsRef.current.delete("location");
              }}
              onClick={() => setIsAreaDropdownOpen((v) => !v)}
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
                  isAreaDropdownOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                }`}
              />
            </button>

            {/* Dropdown Panel */}
            {isAreaDropdownOpen && (
              <div className="absolute top-[calc(100%+0.75rem)] right-0 w-[380px] max-w-[calc(100vw-2rem)] bg-white border border-slate-200 rounded-2xl shadow-[0_15px_40px_-5px_rgba(11,31,58,0.15)] overflow-hidden z-50 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Top Featured Hub Link */}
                <Link
                  href="/areas"
                  onClick={() => setIsAreaDropdownOpen(false)}
                  className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#0B1F3A] to-[#163761] text-white hover:opacity-95 transition-all shadow-xs mb-2.5 group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-sky-300 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>ศูนย์รวมพื้นที่บริการทั้งหมด</span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-blue-500/30 rounded text-sky-200">Hub</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">
                        เช็คจุดจอด ต.บ้านเกาะ และ 4 โซนหลัก
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-300 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                {/* Priority Corridors Header */}
                <div className="px-2 py-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  พื้นที่บริการหลัก & โซนเศรษฐกิจ
                </div>

                {/* Priority Hubs List */}
                <div className="space-y-1">
                  {priorityLocations.map((loc) => {
                    const isActive = pathname === loc.href;
                    return (
                      <Link
                        key={loc.href}
                        href={loc.href}
                        onClick={() => setIsAreaDropdownOpen(false)}
                        className={`text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center justify-between ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-bold border border-blue-100"
                            : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${loc.dotColor}`}></span>
                          <span>{loc.name}</span>
                        </div>
                        <span className="text-[11px] text-slate-500">{loc.corridor}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Other corridors row */}
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                  {otherLocations.slice(0, 2).map((loc) => (
                    <Link
                      key={loc.href}
                      href={loc.href}
                      onClick={() => setIsAreaDropdownOpen(false)}
                      className="text-slate-600 hover:text-blue-600 px-2 py-1 rounded-lg hover:bg-slate-50 transition-colors text-[11px] font-medium"
                    >
                      {loc.name}
                    </Link>
                  ))}
                  <span className="text-slate-300">•</span>
                  <Link
                    href="/portfolio"
                    onClick={() => setIsAreaDropdownOpen(false)}
                    className="text-blue-600 hover:text-blue-700 font-bold px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors text-[11px]"
                  >
                    ภาพงานจริง →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(3).map((link) => {
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
        <div className="flex xl:hidden items-center relative z-10">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="text-slate-800 min-w-[44px] min-h-[44px] flex items-center justify-center p-2 focus:outline-none hover:text-blue-600 transition-colors cursor-pointer rounded-xl hover:bg-slate-100"
            aria-label={isMobileMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Solid, Fully Opaque Mobile Drawer */}
        <div
          id="mobile-navigation-menu"
          aria-label="เมนูหลัก"
          aria-hidden={!isMobileMenuOpen}
          className={`xl:hidden absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white border border-slate-200 p-3.5 sm:p-4 flex flex-col gap-1 rounded-2xl shadow-2xl z-50 max-h-[calc(100dvh-5rem)] overflow-y-auto overflow-x-hidden transition-all duration-200 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none invisible"
          }`}
        >
          {/* Navigation Links - Unified System */}
          {navLinks.slice(0, 3).map((link) => {
            const active = isActiveLink(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className={`flex items-center min-h-12 w-full px-4 rounded-xl font-semibold text-[15px] transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-slate-800 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Mobile Locations Submenu (Unified Accordion Row) */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => setIsMobileAreaOpen((v) => !v)}
              aria-expanded={isMobileAreaOpen}
              aria-controls="mobile-area-menu"
              className={`flex items-center justify-between min-h-12 w-full px-4 rounded-xl font-semibold text-[15px] transition-colors cursor-pointer ${
                isLocationActive
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-slate-800 hover:bg-slate-50 hover:text-blue-600"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>พื้นที่ให้บริการ</span>
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 shrink-0 ${
                  isMobileAreaOpen ? "rotate-180 text-blue-600" : "text-slate-400"
                }`}
              />
            </button>
            {isMobileAreaOpen && (
              <div
                id="mobile-area-menu"
                className="bg-slate-50 rounded-xl p-2.5 mt-1 space-y-1 border border-slate-100"
              >
                {/* Main Hub Link */}
                <Link
                  href="/areas"
                  onClick={closeMobileMenu}
                  className={`text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-between transition-colors ${
                    pathname === "/areas"
                      ? "text-blue-600 bg-white border border-blue-200 shadow-xs"
                      : "text-slate-800 bg-white border border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>ภาพรวมพื้นที่บริการทั้งหมด</span>
                  </span>
                  <span className="text-[10px] text-blue-600 font-bold">ศูนย์รวมจุดจอด</span>
                </Link>

                {/* Priority Hubs */}
                {priorityLocations.map((loc) => (
                  <Link
                    key={loc.href}
                    href={loc.href}
                    onClick={closeMobileMenu}
                    className={`text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-between transition-colors ${
                      pathname === loc.href
                        ? "text-blue-600 bg-white font-bold shadow-xs border border-blue-100"
                        : "text-slate-600 hover:text-blue-600 hover:bg-white"
                    }`}
                  >
                    <span>→ {loc.name}</span>
                    <span className="text-[10px] text-slate-500">{loc.corridor}</span>
                  </Link>
                ))}

                {/* Other locations */}
                <div className="pt-1.5 border-t border-slate-200/80 flex flex-wrap gap-1 px-1">
                  {otherLocations.map((loc) => (
                    <Link
                      key={loc.href}
                      href={loc.href}
                      onClick={closeMobileMenu}
                      className="text-[11px] font-medium text-slate-500 hover:text-blue-600 bg-white px-2 py-1 rounded border border-slate-200/70"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Remaining Navigation Links */}
          {navLinks.slice(3).map((link) => {
            const active = isActiveLink(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className={`flex items-center min-h-12 w-full px-4 rounded-xl font-semibold text-[15px] transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "text-slate-800 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Streamlined Quick-Contact CTAs (Exactly 2 Buttons, Responsive Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100">
            <a
              href="tel:0612402436"
              onClick={closeMobileMenu}
              aria-label="โทรหา WMS Transport ที่เบอร์ 061-240-2436"
              className="flex items-center justify-center gap-2 w-full py-3 px-3 rounded-xl bg-[#0B1F3A] hover:bg-[#163761] text-white font-bold text-sm shadow-xs min-h-[44px] transition-colors"
            >
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="font-mono tracking-wide">061-240-2436</span>
            </a>
            <a
              href="https://line.me/ti/p/DtICkMaDet"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              aria-label="ติดต่อ WMS Transport ผ่าน LINE"
              className="flex items-center justify-center gap-2 w-full py-3 px-3 rounded-xl bg-[#06C755] hover:bg-[#05B34F] text-white font-bold text-sm shadow-xs min-h-[44px] transition-colors"
            >
              <Image
                src="/images/LINE_icon.webp"
                alt=""
                width={18}
                height={18}
                className="h-4.5 w-4.5 object-contain shrink-0"
                aria-hidden="true"
              />
              <span>ติดต่อผ่าน LINE</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
