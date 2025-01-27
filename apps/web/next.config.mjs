/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
}

export default nextConfig
