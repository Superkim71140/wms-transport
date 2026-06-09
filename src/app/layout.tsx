import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { Partytown } from '@builder.io/partytown/react';
import "./globals.css";
import SocialProofPopup from "@/components/SocialProofPopup";

export const revalidate = 3600;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wms-transport.com"),
  title: "รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ พร้อมคนยก | WMS TRANSPORT",
  description: "บริการรถรับจ้างทั่วไป รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ย้ายคอนโด ย้ายบ้าน และขนส่งมอเตอร์ไซค์/Bigbike ทั่วไทย บริการพร้อมคนช่วยยกของอย่างมืออาชีพ สินค้าปลอดภัย มีประกันอุบัติเหตุทุกเที่ยว ประเมินราคาฟรี 24 ชม.",
  keywords: [
    "รถกระบะตู้ทึบรับจ้าง",
    "รถรับจ้างย้ายบ้าน",
    "ย้ายหอพักพร้อมคนยก",
    "ขนส่งมอเตอร์ไซค์ ทั่วไทย",
    "รับส่งบิ๊กไบค์",
    "ขนย้ายเฟอร์นิเจอร์",
    "รถรับจ้างขนของ",
    "ขนส่งสินค้า เหมาคัน",
    "WMS Transport"
  ],
  authors: [{ name: "WMS TRANSPORT" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/logoWMS.png",
      },
    ],
  },
  openGraph: {
    title: "รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ พร้อมคนยก | WMS TRANSPORT",
    description: "บริการรถรับจ้างทั่วไป รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ย้ายคอนโด ย้ายบ้าน และขนส่งมอเตอร์ไซค์/Bigbike ทั่วไทย บริการพร้อมคนช่วยยกของอย่างมืออาชีพ สินค้าปลอดภัย มีประกันอุบัติเหตุทุกเที่ยว ประเมินราคาฟรี 24 ชม.",
    type: "website",
    locale: "th_TH",
    siteName: "WMS TRANSPORT",
    images: ["/logoWMS.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ พร้อมคนยก | WMS TRANSPORT",
    description: "บริการรถรับจ้างทั่วไป รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ย้ายคอนโด ย้ายบ้าน และขนส่งมอเตอร์ไซค์/Bigbike ทั่วไทย บริการพร้อมคนช่วยยกของอย่างมืออาชีพ สินค้าปลอดภัย มีประกันอุบัติเหตุทุกเที่ยว ประเมินราคาฟรี 24 ชม.",
    images: ["/logoWMS.png"],
  },
  robots: "index, follow",
  verification: {
    google: "XBZroDGp_kA28tbvOnFUymh1DsDybkbicMoyPmsQ8JY",
  },
};

const schemaObject = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  "name": "WMS TRANSPORT",
  "image": "https://wms-transport.com/logoWMS.png",
  "description": "บริการรถรับจ้างทั่วไป รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ย้ายคอนโด ย้ายบ้าน และขนส่งมอเตอร์ไซค์/Bigbike ทั่วไทย บริการพร้อมคนช่วยยกของอย่างมืออาชีพ",
  "telephone": "+66612402436",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "75/535 ซ.13 หมู่บ้านสุขถาวร",
    "addressLocality": "ต.บ้านเกาะ, อ.เมือง",
    "addressRegion": "สมุทรสาคร",
    "postalCode": "74000",
    "addressCountry": "TH"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "13.5475",
    "longitude": "100.2744"
  },
  "areaServed": ["สมุทรสาคร", "กรุงเทพมหานคร", "นนทบุรี", "ปทุมธานี", "ภูเก็ต"],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "128"
  },
  "offers": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "บริการย้ายบ้าน / คอนโด / หอพัก",
        "description": "บริการย้ายห้องชุด หอพัก อพาร์ทเม้นท์ คอนโดมิเนียม แพ็กซีลกันกระแทกอย่างดี"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "บริการขนส่งรถมอเตอร์ไซค์และบิ๊กไบค์",
        "description": "บริการขนส่งรถมอเตอร์ไซค์และบิ๊กไบค์ทั่วไทย มีการแพ็กกันรอย รัดยึดแน่นหนา"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "บริการรถกระบะตู้ทึบรับจ้างขนสินค้า",
        "description": "รับส่งสินค้าอุปโภคบริโภค สินค้าโรงงาน วัสดุก่อสร้าง แบบเหมาเที่ยวทั่วประเทศ"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${inter.variable} ${notoSansThai.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <link rel="preconnect" href="https://line.me" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://line.me" />
        <link rel="preconnect" href="https://www.facebook.com" crossOrigin="anonymous" />
        <Partytown debug={false} forward={['dataLayer.push']} />
      </head>
      <body className="min-h-full flex flex-col bg-[#040b15] text-slate-200 selection:bg-red-500/30 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }}
        />
        {children}
        <SocialProofPopup />
      </body>
    </html>
  );
}
