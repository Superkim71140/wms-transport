import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false, // Disabled to prevent Dev Server memory leaks
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 390, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75, 78, 80, 82, 90, 100], // ADDED THIS to fix warnings
    minimumCacheTTL: 604800,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
