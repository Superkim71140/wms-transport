/**
 * Central Site Configuration for WMS TRANSPORT
 * Single authoritative source of truth for branding, contacts, metadata, and entity schemas.
 * 
 * Note: Unconfirmed operational parameters are excluded from customer-facing configs.
 */

export const siteConfig = {
  businessName: "WMS TRANSPORT",
  businessFullName: "WMS TRANSPORT รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์",
  phone: "061-240-2436",
  phoneFormatted: "+66-61-240-2436",
  phoneHref: "tel:0612402436",
  lineUrl: "https://line.me/ti/p/DtICkMaDet",
  facebookUrl: "https://www.facebook.com/wmstransport",
  facebookPageAlt: "https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr",
  email: "1999.kittinanwimonset@gmail.com",
  baseUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://wms-transport.com").trim().replace(/\/$/, ""),
  // priceRange is omitted until officially confirmed by owner
  priceRange: undefined,
  openingHours: "24 Hours every day",
  openingHoursTh: "เปิดบริการทุกวัน ตลอด 24 ชั่วโมง",
  googleMapsUrl: "https://maps.app.goo.gl/gw8LCFmdXuejr5N99",
  address: {
    streetAddress: "75 535 ซ.13",
    subDistrict: "บ้านเกาะ",
    district: "เมืองสมุทรสาคร",
    addressLocality: "ตำบลบ้านเกาะ อำเภอเมืองสมุทรสาคร",
    addressRegion: "สมุทรสาคร",
    postalCode: "74000",
    addressCountry: "TH",
  },
  geo: {
    latitude: 13.6018827,
    longitude: 100.2463594,
  },
  serviceAreas: [
    "สมุทรสาคร",
    "สมุทรสงคราม",
    "กรุงเทพมหานคร",
    "ฝั่งธนบุรี",
    "นนทบุรี",
    "ปทุมธานี",
    "ชลบุรี",
    "ภูเก็ต",
    "เชียงใหม่",
    "ทั่วประเทศ"
  ],
  primaryServices: [
    "รถกระบะตู้ทึบรับจ้าง",
    "ย้ายบ้านและคอนโด",
    "ขนส่งมอเตอร์ไซค์และบิ๊กไบค์",
    "ขนส่งสินค้าเหมาเที่ยวทั่วไทย",
    "บริการพนักงานช่วยยกของมืออาชีพ"
  ],
  defaultTitle: "รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ พร้อมคนยก | WMS TRANSPORT",
  titleTemplate: "%s | WMS TRANSPORT",
  defaultDescription: "บริการรถรับจ้างทั่วไป รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ย้ายคอนโด ย้ายบ้าน และขนส่งมอเตอร์ไซค์/Bigbike ทั่วไทย บริการพร้อมคนช่วยยกของอย่างมืออาชีพ สินค้าปลอดภัย ประเมินราคาฟรี 24 ชม.",
  defaultOgImage: "/images/logoWMS.webp",
  logoUrl: "/images/logoWMS.webp",
  locale: "th_TH",
  verification: {
    google: "XBZroDGp_kA28tbvOnFUymh1DsDybkbicMoyPmsQ8JY",
  },
  socials: [
    "https://www.facebook.com/wmstransport",
    "https://line.me/ti/p/DtICkMaDet"
  ],
  keywords: [
    "รถกระบะตู้ทึบรับจ้าง",
    "รถรับจ้างย้ายบ้าน",
    "ย้ายหอพักพร้อมคนยก",
    "ขนส่งมอเตอร์ไซค์ ทั่วไทย",
    "รับส่งบิ๊กไบค์",
    "ขนย้ายเฟอร์นิเจอร์",
    "รถรับจ้างขนของ",
    "ขนส่งสินค้า เหมาคัน",
    "WMS Transport",
    "รถรับจ้างสมุทรสาคร",
    "รถรับจ้างสมุทรสงคราม",
    "รถรับจ้างกรุงเทพ",
    "รถรับจ้างภูเก็ต"
  ]
};

export type SiteConfig = typeof siteConfig;
