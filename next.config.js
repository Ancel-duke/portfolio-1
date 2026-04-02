const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const isNetlify = process.env.NETLIFY === 'true' || !!process.env.CONTEXT;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: undefined, // default; static export writes to 'out' for Netlify publish
  images: {
    unoptimized: !isNetlify,
    loader: isNetlify ? 'custom' : 'default',
    loaderFile: isNetlify ? './netlify-image-loader.js' : undefined,
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
