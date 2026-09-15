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
      <div className="lg:hidden w-full mb-8 bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 font-bold text-slate-800 text-left focus:outline-none"
        >
          <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <Menu className="w-4 h-4 text-blue-600" />
            สารบัญเนื้อหา
          </span>
          <ChevronRight
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-90 text-blue-600" : ""
            }`}
          />
        </button>

        {isOpen && (
          <nav className="px-4 pb-4 border-t border-slate-100 pt-3">
            <ul className="space-y-1 text-sm">
              {headings.map((h) => (
                <li
                  key={h.id}
                  style={{ paddingLeft: h.level === 3 ? "1rem" : "0" }}
                >
                  <a
                    href={`#${h.id}`}
                    onClick={(e) => handleScroll(e, h.id)}
                    className={`block py-1.5 px-3 rounded-lg transition-colors ${
                      activeId === h.id
                        ? "text-blue-700 font-bold bg-blue-50"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
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
      <nav className="hidden lg:block sticky top-32 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs max-h-[calc(100vh-160px)] overflow-y-auto">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b border-slate-100 pb-2.5">
          สารบัญเนื้อหา
        </h4>
        <ul className="space-y-1">
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
                  className={`flex items-center gap-2 py-1.5 px-3 rounded-lg text-sm leading-snug transition-colors ${
                    isActive
                      ? "text-blue-700 font-bold bg-blue-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
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
