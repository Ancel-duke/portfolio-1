import Head from 'next/head'
import Link from 'next/link'
import { SITE } from '@/shared/constants/site'

/**
 * /blog is legacy; canonical and indexing point at Developer Journal.
 * Static export: use canonical + refresh (hosting may also add 301).
 */
export default function BlogPage() {
  const target = `${SITE.url}/developer-journal`
  return (
    <>
      <Head>
        <title>Developer Journal | {SITE.name}</title>
        <meta
          name="description"
          content="Technical articles and engineering notes by Ancel Ajanga — architecture, fullstack systems, and production lessons. The Developer Journal is the canonical blog."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={target} />
        <meta httpEquiv="refresh" content="0;url=/developer-journal" />
      </Head>
      <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-muted-foreground text-center">
          The blog lives on the{' '}
          <Link href="/developer-journal" className="text-primary font-medium hover:underline">
            Developer Journal
          </Link>
          .
        </p>
        <Link href="/developer-journal" className="text-sm text-primary hover:underline">
          Continue to Developer Journal →
        </Link>
      </div>
    </>
  )
}
