import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  rewrites() {
    return Promise.resolve([
      {
        source: '/api/:path*',
        destination: 'https://backend.thlm.site/api/:path*',
      },
    ])
  },
}

export default nextConfig
