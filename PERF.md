# Performance (LCP & Load Time)

Target: **sub-3s LCP** on ancel.co.ke.

## Implemented

- **Hero LCP**: Hero headline and subline are plain HTML (no Framer Motion on LCP text) so they paint in the first frame.
- **Code-splitting**: Below-the-fold sections (About, TodaysHighlights, CaseStudiesGrid, LabsExperiments, TechStack, Fun, CTA) are lazy-loaded; Hero stays in the main bundle.
- **Images**: `OptimizedImage` uses Netlify Image CDN (/.netlify/images) in production with WebP, width/quality params, and skeleton placeholders. Project cards and case study cards use it.
- **Netlify**: Long cache for `/assets/*`, favicon, manifest; Gzip/Brotli applied automatically by Netlify.
- **No blocking fetches**: No M-Pesa/GitHub/external API calls on initial render; data is from static JSON or client-side hooks (e.g. `useDailyFeaturedContent`).

## Dependency audit

- **lucide-react**: Use named imports only (`import { Icon } from 'lucide-react'`) so the bundler can tree-shake. Avoid `import *`.
- **framer-motion**: Kept; Hero no longer depends on it for LCP text. Below-fold sections that use it are in lazy chunks.
- **recharts**: Used only in `TechStack`, which is lazy-loaded — not in the main bundle.
- **react-syntax-highlighter**: Used in blog/code blocks; ensure those routes are lazy (BlogDetailPage is lazy).
- **Scripts**: Any new external scripts in `index.html` should use `defer` (or `async` where order doesn’t matter).

## Image sizes

- **Check `/public` and `/public/assets`**: If any image is **>500KB**, compress it. Aim for **50–150KB** (e.g. WebP, 800px width, quality 75–80).
- Netlify Image CDN (used by `OptimizedImage` in production) serves WebP and resized images; originals should still be reasonable size for dev and fallback.

## Critical CSS

- Hero “Fullstack Engineer” text is server-rendered in the initial HTML (no JS injection). Critical path CSS is in `index.html` inline styles (e.g. `:root`, `body`, `#root`).
