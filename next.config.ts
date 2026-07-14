import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['127.0.0.1'],
  async redirects() {
    return ['zh', 'en', 'ja'].map(lang => ({
      source: `/${lang}/architect/alejandro-alavena`,
      destination: `/${lang}/architect/aravena`,
      permanent: true,
    }))
  },
  images: {
    localPatterns: [
      { pathname: '/api/image-proxy' },
      { pathname: '/images/curated/**' },
      { pathname: '/images/graduation/**' },
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'commons.wikimedia.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
