/**
 * /ai-index — AI-first entity hub for Ancel Ajanga's portfolio.
 *
 * Design intent:
 *   - Text-first, server-rendered (Next.js static export)
 *   - Zero JS dependencies beyond Next.js
 *   - Structured for LLM/crawler single-pass comprehension
 *   - Full JSON-LD entity graph injected in <head>
 */

import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { SITE } from '@/shared/constants/site'
import {
  loadAiIndexPageProps,
  type AiIndexProject,
  type AiIndexCaseStudy,
  type AiIndexBlogPost,
  type AiIndexGuide,
} from '@/shared/utils/ai-index-selector'

interface PageProps {
  projects: AiIndexProject[]
  caseStudies: AiIndexCaseStudy[]
  blogPosts: AiIndexBlogPost[]
  guides: AiIndexGuide[]
}

/* ── JSON-LD schema ──────────────────────────────────────────────────────── */
function buildJsonLd(props: PageProps) {
  const { projects, caseStudies, blogPosts } = props
  const base = SITE.url

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${base}/#ancel-ajanga`,
    name: 'Ancel Ajanga',
    alternateName: ['Ancel', 'Duke'],
    url: base,
    image: `${base}/images/about/profile.webp`,
    jobTitle: 'Fullstack Software Engineer',
    description:
      'Fullstack Software Engineer from Nairobi, Kenya specializing in scalable backend systems and high-performance frontend experiences. Creator of Inkly, NestFi, LedgerX, Aegis, SignFlow, OpsFlow, and EduManage.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'Kenya',
    },
    sameAs: [SITE.github, SITE.linkedin, base],
    knowsAbout: [
      'Fullstack Engineering',
      'Frontend Architecture',
      'UI Engineering',
      'React',
      'Next.js',
      'Design Systems',
      'Performance Optimization',
      'TypeScript',
      'Node.js',
      'NestJS',
      'Distributed Systems',
      'Microservices',
      'Real-time Systems',
      'WebSockets',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'Kubernetes',
      'AI Systems',
      'AIOps',
      'Zero-Trust Security',
      'Fintech Systems',
      'M-Pesa Integration',
      'Flutter',
      'Blockchain',
      'Multi-tenant SaaS',
    ],
    makesOffer: projects.map((p) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'SoftwareApplication',
        name: p.title.split(' —')[0].split(' -')[0].trim(),
        url: p.liveUrl || `${base}/projects/${p.slug}`,
        description: p.excerpt,
      },
    })),
  }

  const projectList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Software Projects by Ancel Ajanga',
    description: 'All production software projects built by Ancel Ajanga',
    numberOfItems: projects.length,
    itemListElement: projects.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.title.split(' —')[0].split(' -')[0].trim(),
      url: p.liveUrl || `${base}/projects/${p.slug}`,
      description: p.excerpt,
    })),
  }

  const caseStudyList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Case Studies by Ancel Ajanga',
    description: 'Technical case studies showcasing architecture decisions and outcomes',
    numberOfItems: caseStudies.length,
    itemListElement: caseStudies.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.title,
      url: `${base}/case-studies/${c.slug}`,
      description: c.excerpt,
    })),
  }

  const articleList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Developer Journal by Ancel Ajanga',
    description: 'Engineering articles covering frontend, backend, and systems design',
    numberOfItems: blogPosts.length,
    itemListElement: blogPosts.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.title,
      url: `${base}/developer-journal/${b.slug}`,
      description: b.excerpt,
    })),
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Index — Ancel Ajanga Portfolio',
    url: `${base}/ai-index`,
    description: 'Machine-readable index of all content, projects, skills, and identity for Ancel Ajanga — Fullstack Software Engineer, Nairobi Kenya.',
    author: { '@id': `${base}/#ancel-ajanga` },
    about: { '@id': `${base}/#ancel-ajanga` },
    isPartOf: { '@type': 'WebSite', url: base, name: 'Ancel Ajanga — Fullstack Engineer' },
  }

  return [personSchema, projectList, caseStudyList, articleList, webPage]
}

/* ── Page ─────────────────────────────────────────────────────────────────── */
const AiIndexPage: NextPage<PageProps> = (props) => {
  const { projects, caseStudies, blogPosts, guides } = props
  const jsonLdArray = buildJsonLd(props)
  const base = SITE.url

  return (
    <>
      <Head>
        <title>AI Index — Ancel Ajanga | Fullstack Software Engineer, Nairobi Kenya</title>
        <meta
          name="description"
          content="Machine-readable portfolio index for Ancel Ajanga — Fullstack Software Engineer from Nairobi, Kenya. Projects: Inkly, NestFi, LedgerX, Aegis, SignFlow, OpsFlow, EduManage. Skills: React, Node.js, NestJS, PostgreSQL, distributed systems, UI engineering."
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:title" content="AI Index — Ancel Ajanga | Fullstack Software Engineer" />
        <meta
          property="og:description"
          content="Complete entity index for AI crawlers and knowledge graph systems. All projects, skills, case studies, and identity for Ancel Ajanga."
        />
        <meta property="og:url" content={`${base}/ai-index`} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${base}/ai-index`} />

        {jsonLdArray.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>

      <main
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '2rem 1.5rem 4rem',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          lineHeight: 1.65,
          color: 'var(--foreground, #111)',
        }}
      >
        {/* ── Nav back ────────────────────────────────────────────────────── */}
        <nav style={{ marginBottom: '2rem', fontSize: '0.875rem' }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'underline' }}>
            ← Portfolio
          </Link>
          {' · '}
          <Link href="/projects" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Projects
          </Link>
          {' · '}
          <Link href="/case-studies" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Case Studies
          </Link>
          {' · '}
          <Link href="/developer-journal" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Dev Journal
          </Link>
          {' · '}
          <Link href="/guides" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Guides
          </Link>
          {' · '}
          <Link href="/about" style={{ color: 'inherit', textDecoration: 'underline' }}>
            About
          </Link>
          {' · '}
          <Link href="/contact" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Contact
          </Link>
        </nav>

        <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '2rem' }}>
          This page is optimised for AI crawlers, LLMs, and knowledge graph systems.
          Human portfolio: <a href={base} style={{ color: 'inherit' }}>{base}</a>
        </p>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* PART 1 — IDENTITY */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section aria-label="Identity" style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Ancel Ajanga — Fullstack Software Engineer
          </h1>
          <table style={{ borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '1rem' }}>
            <tbody>
              {[
                ['Full Name', 'Ancel Ajanga'],
                ['Also known as', 'Ancel, Duke'],
                ['Role', 'Fullstack Software Engineer & Systems Architect'],
                ['Location', 'Nairobi, Kenya (originally from Narok)'],
                ['Portfolio', base],
                ['GitHub', SITE.github],
                ['LinkedIn', SITE.linkedin],
                ['Email', SITE.email],
                ['Started coding', '2021'],
                ['Current status', 'Independent Consultant, 2024–Present'],
              ].map(([label, value]) => (
                <tr key={label}>
                  <td style={{ padding: '0.2rem 1rem 0.2rem 0', fontWeight: 600, verticalAlign: 'top', whiteSpace: 'nowrap' }}>
                    {label}
                  </td>
                  <td style={{ padding: '0.2rem 0', verticalAlign: 'top' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* PART 2 — SUMMARY */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section aria-label="Professional summary" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Summary</h2>
          <p>
            Ancel Ajanga is a Fullstack Software Engineer specializing in scalable backend systems and
            high-performance frontend experiences. Based in Nairobi, Kenya, Ancel designs and ships
            production-grade software end-to-end — from pixel-precise, accessible user interfaces to
            resilient distributed backends — with a focus on correctness, performance, and long-term
            maintainability.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            On the backend, Ancel architects microservices, event-driven systems, and multi-tenant SaaS
            platforms using Node.js, NestJS, and PostgreSQL. Projects include a self-healing infrastructure
            platform (Aegis) with AI-driven anomaly detection, a fintech coordination layer (NestFi) with
            fail-closed distributed locks and double-entry ledgers, and a secure real-time messaging
            architecture (Inkly) with horizontal WebSocket scaling.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            On the frontend, Ancel builds high-performance React and Next.js interfaces with atomic design
            token systems, optimistic UI patterns, and list virtualization. Work spans consumer mobile apps
            (Fits by Aliv in Flutter), accessibility platforms (SignFlow with WCAG compliance), and
            blockchain frontends (EduChain on Ethereum).
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* PART 3 — SKILLS */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section aria-label="Technical skills" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Technical Skills</h2>

          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem' }}>Frontend &amp; UI</h3>
          <p>React 18/19, Next.js 14, TypeScript, Vue.js 3, Angular 20, Flutter, Tailwind CSS, HTML5, CSS3, Design Token Systems, Atomic Design, Component Libraries, Performance Optimization, Optimistic UI, List Virtualization, PWA, WebGL / Three.js, Accessibility (WCAG), Framer Motion</p>

          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: '1rem', marginBottom: '0.4rem' }}>Backend &amp; APIs</h3>
          <p>Node.js, NestJS, Express.js, Django, RESTful APIs, WebSockets (Socket.io), GraphQL, BullMQ, CQRS, Event-Driven Architecture, Multi-tenant SaaS, Microservices, Circuit Breakers</p>

          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: '1rem', marginBottom: '0.4rem' }}>Databases &amp; Storage</h3>
          <p>PostgreSQL, MongoDB, Redis, Prisma ORM, MySQL, Firebase, IPFS</p>

          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: '1rem', marginBottom: '0.4rem' }}>Infrastructure &amp; DevOps</h3>
          <p>Docker, Kubernetes, Terraform, CI/CD, AWS, Cloudflare, Prometheus, Grafana, OpenTelemetry, OPA (Open Policy Agent), Zero-Trust Security, HMAC, JWT/RBAC</p>

          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: '1rem', marginBottom: '0.4rem' }}>Specialized</h3>
          <p>AIOps (Anomaly Detection), Double-Entry Ledgers, Cryptographic Hash Chains, M-Pesa Daraja API, Blockchain (Solidity, ERC721, Hardhat), CRDT, Idempotency Patterns</p>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* PART 4 — PROJECTS */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section aria-label="All projects" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Projects ({projects.length})
          </h2>
          <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {projects.map((p) => {
              return (
                <li key={p.slug} style={{ marginBottom: '1.25rem' }}>
                  <strong>
                    <a
                      href={p.liveUrl || `${base}/projects/${p.slug}`}
                      style={{ color: 'inherit', textDecoration: 'underline' }}
                    >
                      {p.title.split(' —')[0].split(' -')[0].trim()}
                    </a>
                  </strong>
                  <br />
                  {p.excerpt}
                  {p.techSummary && (
                    <><br /><em>Tech: {p.techSummary}</em></>
                  )}
                  {' · '}
                  <Link href={`/projects/${p.slug}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
                    Details
                  </Link>
                  {p.liveUrl && (
                    <>
                      {' · '}
                      <a href={p.liveUrl} style={{ color: 'inherit', textDecoration: 'underline' }}>
                        Live
                      </a>
                    </>
                  )}
                </li>
              )
            })}
          </ol>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* PART 5 — CASE STUDIES */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section aria-label="Case studies" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Case Studies ({caseStudies.length})
          </h2>
          <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {caseStudies.map((c) => (
              <li key={c.slug} style={{ marginBottom: '1rem' }}>
                <strong>
                  <Link href={`/case-studies/${c.slug}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
                    {c.title}
                  </Link>
                </strong>
                {c.year && (
                  <>
                    {' '}
                    · <time dateTime={c.year}>{c.year}</time>
                  </>
                )}
                <br />
                {c.excerpt}
                <br />
                <em>Role: {c.role}</em>
              </li>
            ))}
          </ol>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* PART 6 — DEV JOURNAL */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section aria-label="Developer journal" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Developer Journal ({blogPosts.length})
          </h2>
          <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {blogPosts.map((b) => (
              <li key={b.slug} style={{ marginBottom: '1rem' }}>
                <strong>
                  <Link
                    href={`/developer-journal/${b.slug}`}
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    {b.title}
                  </Link>
                </strong>
                {b.level && <> · <em>Level: {b.level}</em></>}
                {b.date && <> · <time dateTime={b.date}>{b.date}</time></>}
                <br />
                {b.excerpt}
                {b.tagsSummary && (
                  <><br /><em>Tags: {b.tagsSummary}</em></>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* PART 7 — GUIDES */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section aria-label="Technical guides" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Guides ({guides.length})
          </h2>
          <ol style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {guides.map((g) => (
              <li key={g.slug} style={{ marginBottom: '1rem' }}>
                <strong>
                  <Link href={`/guides/${g.slug}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
                    {g.title}
                  </Link>
                </strong>
                {g.date && (
                  <>
                    {' '}
                    · <time dateTime={g.date}>{g.date}</time>
                  </>
                )}
                <br />
                {g.excerpt}
                {g.techSummary && (
                  <><br /><em>Tech: {g.techSummary}</em></>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* PART 8 — NAVIGATION HUB */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <section aria-label="Site navigation" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>All Pages</h2>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            {[
              ['/', 'Homepage'],
              ['/about', 'About Ancel Ajanga'],
              ['/projects', 'All Projects'],
              ['/case-studies', 'Case Studies'],
              ['/developer-journal', 'Developer Journal'],
              ['/guides', 'Technical Guides'],
              ['/timeline', 'Career Timeline'],
              ['/stack', 'Tech Stack'],
              ['/labs-experiments', 'Labs & Experiments'],
              ['/contact', 'Contact'],
              ['/nextjs-developer-kenya', 'Next.js Developer Kenya (Service Page)'],
              ['/sitemap.xml', 'Sitemap XML'],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} style={{ color: 'inherit', textDecoration: 'underline' }}>
                  {label}
                </Link>
                {' '}— <code style={{ fontSize: '0.8rem' }}>{href}</code>
              </li>
            ))}
          </ul>
        </section>

        <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '2rem 0' }} />
        <p style={{ fontSize: '0.8rem', color: '#888' }}>
          AI Index for <a href={base} style={{ color: 'inherit' }}>ancel.co.ke</a>.
          Maintained by Ancel Ajanga. All content © 2024–2026 Ancel Ajanga.
          Last entity: Inkly (2026-04-01). Canonical identity: &quot;Ancel Ajanga&quot;.
        </p>
      </main>
    </>
  )
}

/* ── Static props — runs at build time, content available to crawlers ──── */
export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const props = await loadAiIndexPageProps()
  return { props }
}

export default AiIndexPage
