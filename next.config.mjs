/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/haa-future-spark',
  assetPrefix: '/haa-future-spark/',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

export default nextConfig
