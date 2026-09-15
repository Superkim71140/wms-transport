import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { provinceMap } from "@/app/(marketing)/service/[province]/page";
import { isApprovedRouteCorridor, approvedRouteCorridors } from "@/data/approvedRouteCorridors";

export const alt = "WMS TRANSPORT - บริการขนส่งและรถรับจ้าง";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return approvedRouteCorridors.map(({ from, to }) => ({
    from,
    to,
  }));
}

export default async function Image({ params }: { params: Promise<{ from: string; to: string }> }) {
  const { from, to } = await params;

  if (!isApprovedRouteCorridor(from, to)) {
    notFound();
  }

  const fromName = provinceMap[from]?.name || from;
  const toName = provinceMap[to]?.name || to;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#040b15",
          backgroundImage: "radial-gradient(circle at 50% 0%, rgba(30, 58, 138, 0.6) 0%, rgba(4, 11, 21, 1) 70%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px" }}>
          <h2 style={{ color: "#60a5fa", fontSize: 32, fontWeight: "bold", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 0 }}>
            WMS TRANSPORT
          </h2>
          
          <h1
            style={{
              color: "#ffffff",
              fontSize: 72,
              fontWeight: 900,
              textAlign: "center",
              marginTop: 30,
              marginBottom: 0,
              lineHeight: 1.2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>รถรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์</span>
            <div style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
              <span style={{ color: "#ffffff" }}>{fromName}</span>
              <span style={{ color: "#60a5fa", margin: "0 20px" }}>→</span>
              <span style={{ color: "#34d399" }}>{toName}</span>
            </div>
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              border: "2px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "24px",
              padding: "18px 36px",
              marginTop: 50,
            }}
          >
            <span style={{ color: "#ffffff", fontSize: 36, fontWeight: "bold" }}>
              ประเมินราคาฟรี 24 ชม. ตามระยะทางจริง
            </span>
          </div>
          
          <div style={{ display: "flex", color: "#94a3b8", fontSize: 24, marginTop: 50, alignItems: "center" }}>
            <span>ตู้ทึบปิดมิดชิด</span>
            <span style={{ margin: "0 15px", color: "#334155" }}>•</span>
            <span>ดูแลความปลอดภัย</span>
            <span style={{ margin: "0 15px", color: "#334155" }}>•</span>
            <span>คนช่วยยกของมืออาชีพ</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
