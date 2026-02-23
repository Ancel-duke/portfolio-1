/**
 * Custom Next.js image loader for static export.
 * Returns Netlify Image CDN URLs (WebP) so builds work without a Next server.
 * Deployed site (ancel.co.ke / netlify.app) serves optimized images via /.netlify/images
 */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ancel.co.ke';

module.exports = function netlifyImageLoader({ src, width, quality }) {
  const fullSrc = src.startsWith('http') ? src : `${baseUrl}${src.startsWith('/') ? '' : '/'}${src}`;
  const params = new URLSearchParams({
    url: fullSrc,
    w: String(Math.min(width, 1200)),
    q: String(quality || 75),
    fit: 'cover',
    fm: 'webp',
  });
  return `/.netlify/images?${params.toString()}`;
};
