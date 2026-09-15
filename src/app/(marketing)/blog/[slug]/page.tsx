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
  const decoded = decodeURIComponent(slug);
  const post = posts[slug] || posts[decoded];
  if (!post) {
    return {
      title: "ไม่พบหน้าบทความ | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `${post.title} | WMS TRANSPORT`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const post = posts[slug] || posts[decoded];

  if (!post) {
    notFound();
  }

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": `https://wms-transport.com${post.image}`,
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
        "url": "https://wms-transport.com/logoWMS.png"
      }
    },
    "description": post.description
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="grow pt-12 pb-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-blue-600 mb-6 transition-colors"
          >
            <span>← กลับไปยังหน้าบล็อก</span>
          </Link>

          <article>
            <header className="mb-8">
              <span className="text-xs text-blue-700 font-bold mb-2.5 inline-block bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                เผยแพร่เมื่อ {post.date}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] leading-tight mb-4 tracking-tight">
                {post.title}
              </h1>
              <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                {post.description}
              </p>
            </header>

            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 border border-slate-200/90 shadow-xs bg-slate-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Render formatted paragraphs */}
            <div className="text-slate-700 text-base md:text-lg leading-relaxed space-y-6 font-normal whitespace-pre-line">
              {post.content}
            </div>

            {/* Inline Conversion CTA */}
            <div className="mt-10 bg-[#0B1F3A] border border-blue-950 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-white shadow-md">
              <div>
                <p className="text-white font-extrabold text-lg sm:text-xl mb-1">ต้องการย้ายบ้านด่วน? ทัก LINE เลย</p>
                <p className="text-slate-300 text-xs sm:text-sm">ทีมงาน WMS พร้อมช่วยคุณตลอด 24 ชั่วโมง ประเมินราคาฟรี ไม่มีค่าใช้จ่าย</p>
              </div>
              <a
                href="https://line.me/ti/p/DtICkMaDet"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 whitespace-nowrap flex items-center gap-2 bg-[#06C755] hover:bg-[#05B34F] text-white font-bold px-6 py-3 rounded-xl shadow-xs transition-colors"
              >
                <Image
                  src="/images/LINE_icon.webp"
                  alt="LINE"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain shrink-0"
                />
                <span>ทัก LINE เลย</span>
              </a>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}
