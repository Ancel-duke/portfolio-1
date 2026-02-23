const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: undefined, // default; static export writes to 'out' for Netlify publish
  images: {
    unoptimized: false,
    loader: 'custom',
    loaderFile: './netlify-image-loader.js',
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
