import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";
import { escapeJsonLd } from "@/lib/seo/schema";

export type BreadcrumbItem = {
  name: string;
  item: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  // Ensure the list starts with Home
  const fullItems = [
    { name: "หน้าแรก", item: "/" },
    ...items.filter((item) => item.item !== "/"),
  ];

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item.startsWith("http")
        ? item.item
        : `${siteConfig.baseUrl}${item.item.startsWith("/") ? item.item : `/${item.item}`}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500 font-medium select-none mb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(schemaJson)) }}
      />

      <Link
        href="/"
        className="hover:text-blue-600 flex items-center gap-1.5 transition-colors"
      >
        <Home className="w-4 h-4 text-slate-400" />
        <span>หน้าแรก</span>
      </Link>

      {fullItems.slice(1).map((item, index, arr) => {
        const isLast = index === arr.length - 1;
        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            {isLast ? (
              <span className="text-slate-900 font-semibold">{item.name}</span>
            ) : (
              <Link href={item.item} className="hover:text-blue-600 transition-colors">
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
