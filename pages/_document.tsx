import { Html, Head, Main, NextScript } from 'next/document'
import { SITE } from '@/shared/constants/site'

const themeInitScript = `
(function() {
  var theme = 'dark'; /* safe default until we know OS pref */
  try {
    var stored = localStorage.getItem('theme');
    if (stored) {
      var t = JSON.parse(stored);
      if (t === 'dark' || t === 'light') {
        theme = t;
      } else {
        /* 'system' or unknown: follow OS */
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    } else {
      /* No saved preference — follow OS */
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  } catch (e) {
    /* Storage blocked or matchMedia unavailable — fallback to dark */
    theme = 'dark';
  }
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
              '@id': 'https://ancel.co.ke/#ancel-ajanga',
              name: 'Ancel Ajanga',
              alternateName: ['Ancel', 'Duke'],
              url: 'https://ancel.co.ke',
              image: 'https://ancel.co.ke/images/about/profile.webp',
              sameAs: [
                SITE.github,
                SITE.linkedin,
                SITE.twitter,
                SITE.url,
              ],
              jobTitle: 'Fullstack Software Engineer',
              description: 'Fullstack Software Engineer from Nairobi, Kenya. Creator of Inkly, NestFi, LedgerX, Aegis, SignFlow, OpsFlow, EduManage.',
              address: { '@type': 'PostalAddress', addressLocality: 'Nairobi', addressCountry: 'Kenya' },
              knowsAbout: [
                'Distributed Systems',
                'Microservices',
                'Real-time Systems',
                'AI Systems',
                'Web Development',
                'Frontend Development',
                'Frontend Architecture',
                'UI Engineering',
                'React Systems',
                'Design Systems',
                'Performance Optimization',
                'TypeScript',
                'Node.js',
                'NestJS',
                'PostgreSQL',
                'MongoDB',
                'Redis',
                'Flutter',
                'Fintech Systems',
                'M-Pesa Integration',
                'Zero-Trust Security',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Ancel Ajanga',
              }
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
