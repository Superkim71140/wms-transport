import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "../posts";

// Re-export posts to support any backwards-compatibility import
export { posts };

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) {
    return {
      title: "ไม่พบหน้าบทความ | WMS TRANSPORT",
    };
  }
  return {
    title: `${post.title} | WMS TRANSPORT`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    notFound();
  }

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": `https://www.wmstransport.com${post.image}`,
    "datePublished": post.dateISO,
    "author": {
      "@type": "Organization",
      "name": "WMS TRANSPORT"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WMS TRANSPORT",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.wmstransport.com/logoWMS.png"
      }
    },
    "description": post.description
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#040b15] overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Navbar />

      <main className="flex-grow pt-32 pb-24 md:pt-40 md:pb-36 relative">
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[-5%] w-[1000px] h-[1000px] bg-blue-600/[0.04] rounded-full blur-[200px]" />
          <div className="absolute bottom-[10%] right-[-5%] w-[1000px] h-[1000px] bg-indigo-500/[0.05] rounded-full blur-[250px]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <span>← กลับไปยังหน้าบล็อก</span>
          </Link>

          <article>
            <header className="mb-12">
              <span className="text-sm text-blue-400 font-bold mb-3 inline-block">
                เผยแพร่เมื่อ {post.date}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                {post.title}
              </h1>
              <p className="text-lg text-slate-300 font-medium leading-relaxed">
                {post.description}
              </p>
            </header>

            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Render formatted paragraphs */}
            <div className="text-slate-300 text-base md:text-lg leading-relaxed space-y-6 font-medium whitespace-pre-line">
              {post.content}
            </div>

            {/* Inline Conversion CTA */}
            <div className="mt-12 bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 backdrop-blur-xl rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-white font-black text-xl mb-1">ต้องการย้ายบ้านด่วน? ทัก LINE เลย</p>
                <p className="text-slate-300 text-sm">ทีมงาน WMS พร้อมช่วยคุณตลอด 24 ชั่วโมง ประเมินราคาฟรี ไม่มีค่าใช้จ่าย</p>
              </div>
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 whitespace-nowrap flex items-center gap-2.5 bg-[#06C755] hover:bg-[#05B34F] text-white font-black px-7 py-3.5 rounded-2xl shadow-[0_0_25px_rgba(6,199,85,0.4)] transition-all duration-300 hover:scale-105 border border-[#06C755]/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                  <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.036 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.572-3.843 2.572-5.992zm-15.008 3.018h-2.158c-.287 0-.521-.233-.521-.52v-4.996c0-.287.234-.521.521-.521h2.158c.287 0 .521.233.521.521v3.954h1.479c.287 0 .521.234.521.521v1.041c0 .287-.234.521-.521.521zm4.842 0h-1.042c-.287 0-.521-.233-.521-.52v-4.996c0-.287.234-.521.521-.521h1.042c.287 0 .521.233.521.521v4.996c0 .287-.234.521-.521.521zm2.355 0h-1.042c-.287 0-.521-.233-.521-.52v-4.996c0-.287.234-.521.521-.521h1.042c.287 0 .521.233.521.521v1.942l1.62-1.942c.13-.156.326-.239.531-.239h1.018c.36 0 .584.382.399.696l-1.688 2.015 1.776 2.456c.164.228-.002.548-.283.548h-.988c-.173 0-.336-.084-.438-.224l-1.306-1.851v1.597c0 .287-.234.521-.521.521z"/>
                </svg>
                ทัก LINE เลย
              </a>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
