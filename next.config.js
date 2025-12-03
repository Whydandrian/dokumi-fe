/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pastikan TIDAK ada output: 'export' (untuk SSR/ISR)
  
  // Environment variables untuk client-side
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://tools.itk.ac.id',
  },

  // Rewrite untuk API proxy (opsional, jika mau bypass CORS)
  async rewrites() {
    return [
      // Proxy API requests ke tools.itk.ac.id
      {
        source: '/api/tools/:path*',
        destination: 'http://tools.itk.ac.id/api/tools/:path*',
      },
    ];
  },

  // Headers untuk security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;