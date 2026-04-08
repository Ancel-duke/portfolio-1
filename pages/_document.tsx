import { Html, Head, Main, NextScript } from 'next/document'
import { siteIdentityJsonLd } from '@/shared/seo/personSchema'

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
            __html: JSON.stringify(siteIdentityJsonLd),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/*
          Static export: allow shared caches to store HTML but require revalidation (ETag/304).
          Avoid no-store — it disables edge caching. HTTP Cache-Control from the host (e.g. Netlify)
          should match; this meta helps plain static file servers without header config.
        */}
        <meta
          httpEquiv="Cache-Control"
          content="public, max-age=0, must-revalidate"
        />
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
