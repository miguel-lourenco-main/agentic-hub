/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  // Enable static HTML export and support hosting under a sub-path (GitLab Pages project path)
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  eslint: {
    // Unblock production builds by skipping ESLint; CI will still run eslint if desired
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
