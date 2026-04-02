import { Html, Head, Main, NextScript } from 'next/document'
import { SITE } from '@/shared/constants/site'

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
              name: 'Ancel',
              url: 'https://ancel.co.ke',
              image: 'https://ancel.co.ke/images/about/profile.webp',
              sameAs: [
                SITE.linkedin,
                SITE.github,
                SITE.url
              ],
              jobTitle: 'Software Engineer',
              knowsAbout: [
                'Distributed Systems',
                'Microservices',
                'Real-time Systems',
                'AI Systems',
                'Web Development',
                'Frontend Development',
                'UI/UX Engineering',
                'React Systems',
                'Design Systems'
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Ancel'
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
