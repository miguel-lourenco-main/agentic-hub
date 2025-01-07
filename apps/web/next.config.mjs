/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ["@workspace/ui"],
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
}

export default nextConfig
