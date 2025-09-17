import { NextConfig } from "next";

const nextConfig: NextConfig & {
  experimental?: { optimizeFonts?: boolean };
} = {
  experimental: {
    optimizeFonts: false,
  },
  images: {
    unoptimized: true, \
  },
};

export default nextConfig;

