# Programmatic SEO System — Summary

This document summarizes the **programmatic SEO system** added to the Next.js 16 static-export portfolio. The system is designed to scale content (guides, deep dives, comparisons) without thin pages, duplicate content, or SEO/performance regression.

---

## Constraints Met

| Constraint | How it's met |
|-----------|----------------|
| **Static export** | All guide pages are pre-rendered via `getStaticPaths` + `getStaticProps`; `output: 'export'` unchanged. |
| **No thin content** | Every guide must be **800+ words** (summary + problem + architecture + measurable_outcome + body). Enforced by `npm run validate-seo-content`. |
| **No duplicate content** | Guide titles must be unique within guides; validator warns when a guide title matches a case study or blog title. |
| **No SEO regression** | Canonical, meta, JSON-LD (Article/TechArticle, BreadcrumbList) per guide; sitemap and robots unchanged for existing routes. |
| **No performance regression** | No new client JS beyond existing layout; guide pages are static HTML. |

---

## Phase 1 — Scalable Topic Templates

**Location:** `src/data/seo-topic-templates.json`

- **Template types:**
  - **Technology Deep Dives** — e.g. “Building X with Next.js”, “Scaling X using Y architecture”. Schema: `TechArticle`.
  - **Case Study Breakdowns** — e.g. “How I Built X”, “Architecture Behind X”. Schema: `Article`.
  - **Comparison Pages** — e.g. “Next.js vs Django for SaaS”. Schema: `Article`.
- **Content layer spec:** Defines required fields (`title`, `slug`, `summary`, `tech_stack`, `problem`, `architecture`, `measurable_outcome`, `related_topics`, `body`, `template_type`) and internal linking rules (tech stack → `/stack`, related topics → `/stack#cluster-id`, case studies → `/case-studies/[slug]`, contact → `/contact`).

---

## Phase 2 — Content Data Layer and Static Generation

**Source:** `src/data/guides.json`

- Each entry includes: `title`, `slug`, `summary`, `tech_stack`, `problem`, `architecture`, `measurable_outcome`, `related_topics`, `related_case_studies`, `template_type`, `body`, `date`, `readTime`.
- **Routes:**
  - `pages/guides/index.tsx` — listing of all guides (static).
  - `pages/guides/[slug].tsx` — detail page per guide; uses `getStaticPaths()` from `guides.json` and `getStaticProps({ params })`.
- **Rendering:** `src/pages/GuideDetailPage.tsx` renders problem, architecture, measurable outcome, and body (with simple **bold** and paragraph handling). No filler; content is data-driven.

---

## Phase 3 — No Thin Pages

- **Word count:** `scripts/validate-seo-content.js` ensures each guide has at least **800 words** (sum of summary, problem, architecture, measurable_outcome, body). Run: `npm run validate-seo-content`.
- **Internal links:** Every guide page includes links to:
  - Related topics (pillar links to `/stack#cluster-id`),
  - Tech stack (badges + “View full tech stack” → `/stack`),
  - Related case studies (buttons → `/case-studies/[slug]`),
  - Contact (“Get in touch” → `/contact`).
- **Structured data:** Article or TechArticle plus BreadcrumbList on every guide (see Phase 5).
- **Measurable insights:** Each guide has a `measurable_outcome` and optional code/architecture snippets in the body. No generic filler.

---

## Phase 4 — Internal Linking Graph

- **Automatic on guide pages:**
  - **Related topics** → from `related_topics` (cluster ids) to `topic-clusters.json` pillar paths (`/stack#next-js-architecture`, etc.).
  - **Tech stack** → badges + link to `/stack`.
  - **Related case studies** → from `related_case_studies` (slugs) to `/case-studies/[slug]`; only links that exist in `case-studies.json` are shown.
  - **Contact** → single link to `/contact`.
- **Contextual only:** No generic “related posts” widget; links are derived from the guide’s own `related_topics` and `related_case_studies`.

---

## Phase 5 — Schema per Template

- **Technology deep dive** (`template_type: "technology_deep_dive"`): **TechArticle** JSON-LD (headline, description, author, programmingLanguage, hasPart for problem/solution/impact/architecture).
- **Case study breakdown / comparison** (`template_type: "case_study_breakdown"` or `"comparison"`): **Article** JSON-LD (headline, description, author, datePublished, wordCount, keywords).
- **All guides:** **BreadcrumbList** (Home → Guides → [Guide title]).
- Implemented in `src/components/seo/schemas.ts`: `generateArticleSchema(guide)`, and reuse of `generateTechArticleSchema(syntheticCaseStudy)` for deep dives. Breadcrumbs via `generateBreadcrumbSchema(breadcrumbItems)`.

---

## Final Verification

| Check | Status |
|-------|--------|
| **Static export** | `npm run build` succeeds; `out/` contains `/guides`, `/guides/building-real-time-collaboration-nextjs-socketio`, `/guides/nextjs-vs-django-for-saas`. |
| **Sitemap** | `scripts/generate-sitemap.js` includes `/guides` and each `/guides/[slug]`; total URLs include Guides: 2. Run `npm run generate-sitemap`. |
| **No duplicate titles (guides)** | `validate-seo-content.js` errors if two guides share the same title; warns if a guide title matches a case study or blog title. |
| **No keyword cannibalization** | Guide titles and slugs are distinct from case study and blog slugs; internal links point to pillars and case studies, not duplicate targets. |
| **No increase in initial JS** | Guide pages use the same layout and components as the rest of the site; no extra heavy bundles. |

---

## Files Touched / Added

| File | Purpose |
|------|---------|
| `src/data/seo-topic-templates.json` | Template types and content-layer spec (Phase 1). |
| `src/data/guides.json` | Content data layer; 2 seed guides (800+ words each) (Phase 2). |
| `pages/guides/index.tsx` | Guides listing page (static). |
| `pages/guides/[slug].tsx` | Dynamic route; getStaticPaths from guides.json. |
| `src/pages/GuideDetailPage.tsx` | Renders guide with internal links and schema (Phases 3–5). |
| `src/components/seo/schemas.ts` | `generateArticleSchema()` for guides. |
| `scripts/generate-sitemap.js` | Adds `/guides` and `/guides/[slug]` to sitemap.xml. |
| `scripts/generate-sitemap-for-ai.js` | Adds guides and `/guides` to sitemap-for-ai.json. |
| `scripts/validate-seo-content.js` | Validates 800+ words per guide, required fields, duplicate guide titles. |
| `package.json` | Script `validate-seo-content` added. |

---

## How to Extend

1. **Add a new guide:** Append an object to `src/data/guides.json` with all required fields and a `body` long enough that total words ≥ 800. Run `npm run validate-seo-content` before committing.
2. **Add a template type:** Extend `seo-topic-templates.json` and, if needed, add a new schema in `schemas.ts` and branch in `GuideDetailPage.tsx` (e.g. schema by `template_type`).
3. **Internal links:** Keep `related_topics` as topic cluster ids from `topic-clusters.json` and `related_case_studies` as slugs from `case-studies.json` so links stay contextual and valid.

---

## Scalable SEO System — One-Paragraph Summary

The programmatic SEO system uses a **data-driven content layer** (`guides.json`) and **reusable topic templates** (`seo-topic-templates.json`) to generate static guide pages that meet a **minimum quality bar** (800+ words, internal links to stack/case studies/contact, Article or TechArticle + BreadcrumbList schema). **Thin content is avoided** by validation (`validate-seo-content`); **duplicate titles** among guides are blocked and cross-source overlaps warned. **Static export, sitemap, and performance** are unchanged; the system is designed to scale by adding more entries to `guides.json` and optional template types without regressing SEO or UX.
