import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { Partytown } from "@builder.io/partytown/react";
import "./globals.css";
import EntityGraphSchema from "@/components/EntityGraphSchema";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { siteConfig } from "@/lib/seo/site-config";

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
  metadataBase: new URL(siteConfig.baseUrl),
  // Direct title without template to prevent double brand duplication ("... | WMS TRANSPORT | WMS TRANSPORT") on child pages
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.businessName }],
  // Root alternates.canonical is intentionally omitted so child pages do not inherit the Homepage URL.
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: siteConfig.logoUrl,
      },
    ],
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.baseUrl,
    siteName: siteConfig.businessName,
    images: [
      {
        url: `${siteConfig.baseUrl}${siteConfig.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.businessName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [`${siteConfig.baseUrl}${siteConfig.defaultOgImage}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: siteConfig.verification.google,
  },
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
        <Partytown debug={false} forward={["dataLayer.push"]} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
        <EntityGraphSchema />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
