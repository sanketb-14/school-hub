/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost:3000', 'your-vercel-domain.vercel.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Body parser configuration is now handled in individual API routes
}

export default nextConfig