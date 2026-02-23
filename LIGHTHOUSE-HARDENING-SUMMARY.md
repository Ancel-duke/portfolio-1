# Lighthouse Hardening Pass — Summary

Production-grade hardening for **Performance**, **Accessibility**, **Best Practices**, and **SEO** (target 95–100). Static export and routing unchanged; no SSR introduced.

---

## Phase 1 — Core Web Vitals (LCP)

| Item | Status |
|------|--------|
| **LCP element** | Homepage: hero text (no above-the-fold image). First image: About section profile (`/assets/profile_photo.jpg`) when in view. |
| **Preload** | `SEOHead` preloads `profile_photo.jpg` on homepage only via `<link rel="preload" href={lcpImage} as="image" />`. |
| **Single priority image** | About section profile uses `priority` and `skipNetlifyCDN`; all other images use `priority={false}` or default lazy. |
| **AVIF/WebP** | `next.config.js`: `images.formats: ['image/avif', 'image/webp']`; Netlify loader serves WebP. |
| **Fixed dimensions** | All images use `OptimizedImage` (next/image) with explicit `width` and `height` (or computed height). |
| **Target** | LCP &lt; 1.8s: preload + single priority + optimized formats and dimensions support fast first paint. |

---

## Phase 2 — Layout Shift (CLS &lt; 0.05)

| Item | Status |
|------|--------|
| **Image dimensions** | Every `OptimizedImage` and next/image usage has `width` and `height`; no unsized images. |
| **Font reflow** | Inter via `next/font` with `display: 'swap'`; no custom @font-face without font-display. |
| **Animations** | LazyMotion used; animations are opacity/transform only; no layout-thrashing. |
| **Hydration** | No intentional layout jumps; `suppressHydrationWarning` only on `<Html>` for theme class. |

---

## Phase 3 — Total Blocking Time (TBT &lt; 100ms)

| Item | Status |
|------|--------|
| **Framer Motion** | LazyMotion + `domAnimation` only; no full `motion` bundle on initial load. |
| **Dynamic imports** | Homepage: About, TodaysHighlights, CaseStudiesGrid, LabsExperiments, TechStack, Fun, CTA loaded dynamically (non-blocking). |
| **Heavy layout** | No single client-only wrapper around entire app; Header/Footer are server-rendered in static export. |
| **Console** | `next.config.js`: `removeConsole: { exclude: ['error', 'warn'] }` in production. |
| **Bundle analysis** | Run `ANALYZE=true npm run analyze` (webpack build) for report; Turbopack build does not emit analyzer output. |

---

## Phase 4 — Accessibility

| Fix / Check | Applied |
|-------------|--------|
| **Viewport** | `<meta name="viewport" content="width=device-width, initial-scale=1" />` added in `_document.tsx`. |
| **Skip link** | `SkipLink` present; targets `#main-content`; focus visible. |
| **Image lightbox** | Trigger div: `role="button"`, `tabIndex={0}`, `aria-label="View full size"`, Enter + Space key handlers. Lightbox: `role="dialog"`, `aria-modal="true"`, `aria-label="Image lightbox"`. Close: `<button type="button" aria-label="Close lightbox">` with explicit `onClick`; icon `aria-hidden="true"`. |
| **Project modal** | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="project-modal-title"`; close `<button type="button" aria-label="Close modal">`; icon `aria-hidden="true"`. |
| **Theme toggle** | Uses `<Button>` with `aria-label` and `title`; icons `aria-hidden="true"`. |
| **Interactive elements** | Buttons are `<button>` or Radix `Slot` (asChild); no clickable divs without role + keyboard. |
| **Alt text** | All `OptimizedImage` and image usages have meaningful `alt`. |
| **Heading hierarchy** | Pages use semantic h1/h2/h3; modal title is `<h3 id="project-modal-title">`. |

---

## Phase 5 — Best Practices

| Item | Status |
|------|--------|
| **Console** | Production build strips `console.log`; `error`/`warn` kept per config. |
| **Viewport** | Set in `_document.tsx`; single, correct. |
| **Deprecated APIs** | None introduced; next/image and standard React used. |
| **Mixed content** | Canonical/OG/Twitter use `https://ancel.co.ke`; no http resources in meta. |
| **Links** | External links use `rel="noopener noreferrer"` where applicable (e.g. ProjectCard, footer). |

---

## Phase 6 — SEO

| Item | Status |
|------|--------|
| **Canonical** | Every page uses `SEO` or `SEOHead` with `canonical` / `canonicalUrl`; relative paths normalized to full URL in `SEOHead`. |
| **Open Graph** | `SEOHead`: og:type, og:url, og:title, og:description, og:image, og:image:width/height, og:locale, og:site_name; article pages get publishedTime/modifiedTime. |
| **Twitter** | twitter:card, twitter:url, title, description, image, twitter:creator. |
| **Structured data** | Person in `_document`; per-page JSON-LD (Organization, BlogPost, CaseStudy, etc.) via `SEOHead` `jsonLd`. |
| **Sitemap** | `scripts/generate-sitemap.js` builds sitemap from static routes + case-studies + developer-journal slugs; matches SSG routes. |
| **Blog 404** | `BlogDetailPage` 404 canonical and back link use `/developer-journal` (not `/blog`). |
| **Breadcrumbs** | BlogDetailPage breadcrumb: "Developer Journal" with url `/developer-journal` and current post url `/developer-journal/${slug}`. |

---

## Final Verification

- **Production build:** `npm run build` completes successfully (TypeScript clean, 45 static pages, 13 export workers).
- **Static export:** Unchanged; output to `out/` for Netlify.
- **Routing:** All static and SSG routes generated; no breakage.
- **Regressions:** No removal of canonical/OG/Twitter; no duplicate viewport; no extra priority images.

---

## Before / After (bundle size)

- **Turbopack** is the default build; it does not produce bundle-analyzer output. No before/after JS bundle comparison was run in this pass.
- For a **bundle size comparison**, run:
  - `ANALYZE=true npm run analyze` (uses `next build --webpack`) and compare client chunks before/after any future changes.

---

## LCP improvement summary

- **Before:** Homepage LCP could be delayed by missing viewport or non-preloaded profile image when About is in view.
- **After:** Viewport set; LCP image preloaded on homepage; single priority image (About profile); all images have dimensions and optimized formats. Hero is text-only, so first paint is text; preload ensures the first image (when scrolled or in view) loads early.

---

## Accessibility fixes applied

1. Viewport meta added in `_document.tsx`.
2. Image lightbox: dialog role, aria-modal, keyboard (Enter + Space), labeled close button, type="button".
3. Project modal: role="dialog", aria-modal, aria-labelledby, close button type="button" and aria-label, icon aria-hidden.
4. Blog 404 and breadcrumb: canonical and links point to `/developer-journal`; breadcrumb label "Developer Journal" with correct URL.

---

## Lighthouse target estimate

| Category | Target | Notes |
|----------|--------|------|
| **Performance** | 95–100 | LCP (preload, priority, dimensions); CLS (sized images, font swap); TBT (LazyMotion, dynamic sections, console stripped). |
| **Accessibility** | 95–100 | Viewport, skip link, dialogs, buttons, aria-labels, keyboard, semantic headings. |
| **Best Practices** | 95–100 | Viewport, no console.log, HTTPS, no deprecated APIs. |
| **SEO** | 95–100 | Canonical, OG, Twitter, structured data, sitemap aligned with routes. |

Run Lighthouse (DevTools or CI) on the production `out/` (e.g. `npx serve out`) to capture actual scores and iterate if needed.
