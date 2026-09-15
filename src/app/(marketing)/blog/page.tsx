import Link from "next/link";
import Image from "next/image";
import { posts } from "./posts";
import { Metadata } from "next";

// Re-export posts so sitemap.ts can import it from here if configured
export { posts };

export const metadata: Metadata = {
  title: "บล็อกความรู้การขนย้ายและขนส่ง | WMS TRANSPORT",
  description: "อ่านบทความ เคล็ดลับ และคู่มือการย้ายบ้าน การแพ็กของ และการเตรียมตัวขนส่งมอเตอร์ไซค์อย่างมืออาชีพจาก WMS Transport",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogHubPage() {
  const articlesList = Object.entries(posts).map(([slug, post]) => ({
    slug,
    ...post,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      <main className="grow pt-14 pb-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="text-blue-700 tracking-wide uppercase font-bold text-xs bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 mb-4 inline-block">
              WMS Content Hub
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0B1F3A] mb-3 tracking-tight">
              บล็อกรวมความรู้ <span className="text-blue-600">เรื่องการขนย้าย</span>
            </h1>
            <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              เคล็ดลับการย้ายบ้าน วิธีแพ็กสินค้า การส่งมอเตอร์ไซค์ และคู่มือขนย้ายจากผู้เชี่ยวชาญตัวจริง
            </p>
          </div>

          {/* Grid Layout for Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articlesList.map((post) => (
              <article 
                key={post.slug}
                className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col group"
              >
                <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden block bg-slate-100">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover" 
                  />
                </Link>
                
                <div className="p-6 flex flex-col grow">
                  <span className="text-xs text-blue-700 font-bold mb-2.5 inline-block bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200 w-fit">
                    {post.date}
                  </span>
                  <h2 className="text-lg font-bold text-[#0B1F3A] mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 grow line-clamp-3 font-normal">
                    {post.description}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 group-hover:text-blue-800 transition-colors mt-auto w-fit"
                  >
                    <span>อ่านเพิ่มเติม</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
