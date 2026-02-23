import { Html, Head, Main, NextScript } from 'next/document'

const themeInitScript = `
(function() {
  var theme = 'light';
  try {
    var stored = localStorage.getItem('theme');
    if (stored) {
      var t = JSON.parse(stored);
      if (t === 'dark' || t === 'light') theme = t;
      else if (t === 'system') theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  } catch (e) {}
  document.documentElement.classList.add(theme);
})();
`

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ancel Ajanga',
              alternateName: ['Ajanga Ancel', 'Duke'],
              jobTitle: 'Fullstack Engineer',
              description: 'Ancel Ajanga is a Fullstack Engineer and Software Architect based in Nairobi and Narok, Kenya. Building production software since 2024. Specializes in system resilience, security, and AIOps: hardened backends, fluid frontends, and self-healing infrastructure. Delivers measurable outcomes including real-time systems with sub-500ms latency, platforms for 10K+ users, and fintech-grade auditability. Production systems: NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain, EduManage, TaskForge.',
              url: 'https://ancel.co.ke',
              image: 'https://ancel.co.ke/assets/profile_photo.jpg',
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://ancel.co.ke/',
              },
              alumniOf: [
                { '@type': 'EducationalOrganization', name: 'Moringa School' },
                { '@type': 'EducationalOrganization', name: 'Institute of Software Technologies' },
              ],
              knowsAbout: [
                'System Resilience',
                'Next.js',
                'React',
                'Node.js',
                'NestJS',
                'TypeScript',
                'Flutter',
                'PostgreSQL',
                'MongoDB',
                'Redis',
                'Full-Stack Systems Design',
                'Zero-Trust Infrastructure',
                'AI Automation Systems',
                'AI-Augmented Software Engineering',
                'Real-time Distributed Systems',
                'Polyglot Persistence (PostgreSQL, MongoDB, Redis)',
                'Cross-Platform Development (Flutter, React)',
                'Type-Safe Backend Architecture (Node.js, NestJS, TypeScript)',
              ],
              sameAs: [
                'https://github.com/Ancel-duke',
                'https://www.linkedin.com/in/ajanga-ancel',
                'https://ancel.co.ke',
              ],
            }),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json?v=2" />
        <meta name="theme-color" content="#0ea5a4" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
