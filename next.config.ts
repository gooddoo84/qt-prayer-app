import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/qt-prayer-app',
  images: { unoptimized: true },
};

export default nextConfig;
