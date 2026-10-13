import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['localhost', '192.168.3.9', '192.168.*', '192.168.3.*'],
  experimental: {
    reactCompiler: false,
  },
  turbopack: {},
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = { type: 'memory' }
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/project/motion',
        destination: '/projects/motion',
        permanent: true,
      },
    ]
  },
}

export default nextConfig