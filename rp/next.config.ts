import { NextConfig } from 'next';

const nextConfig: NextConfig & { experimental?: { optimizeFonts?: boolean } } = {
  experimental: {
    optimizeFonts: false,
  },
};

export default nextConfig;
