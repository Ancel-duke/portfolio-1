import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Breadcrumb } from '@/shared/components/ui/breadcrumb'
import {
  getBreadcrumbItemsForPath,
  getGlobalBreadcrumbSchema,
  normalizeSitePath,
  shouldShowSiteBreadcrumbs,
} from '@/shared/utils/breadcrumbs'

function NextCrumbLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

/**
 * Site-wide trail + BreadcrumbList JSON-LD (below header, above page content).
 * Hidden on `/` only.
 */
export function GlobalSiteBreadcrumbs() {
  const { asPath } = useRouter()
  const path = normalizeSitePath(asPath)

  if (!shouldShowSiteBreadcrumbs(path)) return null

  const items = getBreadcrumbItemsForPath(path)
  if (items.length < 2) return null

  const withCurrent = items.map((item, i) => ({
    name: item.name,
    url: item.url,
    current: i === items.length - 1,
  }))

  const schema = getGlobalBreadcrumbSchema(path)
  const schemaJson = schema ? JSON.stringify(schema) : null

  return (
    <>
      {schemaJson ? (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schemaJson }}
          />
        </Head>
      ) : null}
      <div className="border-b border-border/50 bg-muted/20">
        <div className="container-custom max-w-full py-1.5 sm:py-2 px-4 sm:px-6">
          <Breadcrumb
            items={withCurrent}
            className="text-xs sm:text-sm text-muted-foreground min-w-0 [&_ol]:flex-wrap [&_ol]:gap-y-1"
            LinkComponent={NextCrumbLink}
          />
        </div>
      </div>
    </>
  )
}
