import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: false, // Отключает автоматическую предзагрузку CSS
  },
};

export default nextConfig;
