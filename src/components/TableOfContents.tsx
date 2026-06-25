"use client";

import { useEffect, useState } from "react";
import { ChevronRight, Menu } from "lucide-react";

type HeadingItem = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents() {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const contentContainer = document.querySelector(".toc-content");
    if (!contentContainer) return;

    const headingElements = Array.from(
      contentContainer.querySelectorAll<HTMLElement>("h2[id], h3[id]")
    );

    const items: HeadingItem[] = headingElements.map((el) => ({
      id: el.id,
      text: el.textContent?.trim() || "",
      level: el.tagName === "H2" ? 2 : 3,
    }));

    const timer = setTimeout(() => {
      setHeadings(items);
      if (items.length > 0) setActiveId(items[0].id);
    }, 0);

    // IntersectionObserver — tracks which heading is in the top zone of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting entry (first one visible near the top)
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -55% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    return () => {
      clearTimeout(timer);
      headingElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementTop =
        element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: elementTop, behavior: "smooth" });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* ── Mobile Collapsible TOC ── */}
      <div className="lg:hidden w-full mb-8 bg-white/2 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 font-bold text-white text-left focus:outline-none"
        >
          <span className="flex items-center gap-2 text-sm uppercase tracking-wider text-slate-300">
            <Menu className="w-4 h-4 text-blue-400" />
            สารบัญเนื้อหา
          </span>
          <ChevronRight
            className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
              isOpen ? "rotate-90 text-blue-400" : ""
            }`}
          />
        </button>

        {isOpen && (
          <nav className="px-5 pb-5 border-t border-white/5 pt-3">
            <ul className="space-y-1.5 text-sm">
              {headings.map((h) => (
                <li
                  key={h.id}
                  style={{ paddingLeft: h.level === 3 ? "1rem" : "0" }}
                >
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => handleScroll(e, h.id)}
                    className={`block py-1.5 px-3 rounded-lg transition-all duration-200 ${
                      activeId === h.id
                        ? "text-blue-400 font-bold bg-blue-500/10"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* ── Desktop Sticky Sidebar TOC ── */}
      <nav className="hidden lg:block sticky top-36 bg-white/1 border border-white/5 hover:border-white/10 rounded-3xl p-6 backdrop-blur-xl transition-all duration-300 max-h-[calc(100vh-180px)] overflow-y-auto">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4 border-b border-white/5 pb-3">
          สารบัญเนื้อหา
        </h4>
        <ul className="space-y-0.5">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li
                key={h.id}
                style={{ marginLeft: h.level === 3 ? "0.75rem" : "0" }}
              >
                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleScroll(e, h.id)}
                  className={`flex items-center gap-2 py-2 px-3 rounded-xl text-sm leading-snug transition-all duration-200 ${
                    isActive
                      ? "text-blue-400 font-bold bg-blue-500/10 border-l border-blue-400 rounded-l-none pl-2.5"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0 animate-pulse" />
                  )}
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
