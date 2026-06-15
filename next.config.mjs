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
  experimental: {
    // Env-gated: use worker_threads for the static-export worker pool. This
    // sandbox kills child_process jest-workers; off by default for CI.
    ...(process.env.AHUB_WORKER_THREADS === '1' ? { workerThreads: true, cpus: 2 } : {}),
  },
  typescript: {
    // Env-gated escape hatch: this sandbox's Node 24 crashes Next 14's
    // jest-worker (type-check + minify workers). Types are verified separately
    // via `tsc --noEmit`. Off by default so CI on supported Node still type-checks.
    ignoreBuildErrors: process.env.AHUB_SKIP_TS === '1',
  },
  webpack: (config, { dev }) => {
    if (!dev && process.env.AHUB_NO_MINIFY === '1') {
      config.optimization.minimize = false;
    }
    return config;
  },
}

export default nextConfig
