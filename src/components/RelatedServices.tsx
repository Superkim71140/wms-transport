import Link from "next/link";
import { Link2 } from "lucide-react";

type ServiceInfo = {
  slug: string;
  name: string;
  path: string;
};

const serviceData: Record<string, ServiceInfo[]> = {
  phuket: [
    { slug: "motorcycle", name: "ขนส่งมอเตอร์ไซค์ ภูเก็ต", path: "/service/phuket/motorcycle" },
    { slug: "freight", name: "รถรับจ้างขนส่งสินค้า ภูเก็ต", path: "/service/phuket/freight" },
    { slug: "moving", name: "ย้ายบ้าน ภูเก็ต", path: "/service/phuket/moving" },
  ],
};

type RelatedServicesProps = {
  province: string;
  currentServiceSlug: string;
};

export default function RelatedServices({ province, currentServiceSlug }: RelatedServicesProps) {
  const services = serviceData[province];
  if (!services) return null;

  // Filter out the current service to display other available services in the same location
  const otherServices = services.filter((s) => s.slug !== currentServiceSlug);

  return (
    <div className="mt-16 pt-8 border-t border-white/10">
      <div className="bg-gradient-to-br from-blue-950/20 via-white/[0.01] to-transparent border border-white/5 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
        <h4 className="text-lg font-extrabold text-white flex items-center gap-2 mb-4">
          <Link2 className="w-5 h-5 text-blue-400" />
          บริการขนส่งและขนย้ายอื่นๆ ในจังหวัดภูเก็ต
        </h4>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          นอกจากบริการนี้แล้ว เรายังมีบริการรถรับจ้างอื่นๆ ครอบคลุมทั่วพื้นที่ภูเก็ตและเส้นทางข้ามจังหวัด พร้อมให้บริการตลอด 24 ชั่วโมง:
        </p>
        <div className="flex flex-wrap gap-4">
          {otherServices.map((service) => (
            <Link
              key={service.slug}
              href={service.path}
              className="px-5 py-3 bg-white/[0.02] border border-white/10 hover:border-blue-400/50 hover:bg-blue-500/5 rounded-2xl text-slate-300 hover:text-white font-bold text-sm transition-all duration-300 flex items-center gap-2 group shadow-md"
            >
              <span>{service.name}</span>
              <span className="text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
