import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb } from '@/shared/components/ui/breadcrumb'
import {
  getBreadcrumbItemsForPath,
  getGlobalBreadcrumbSchema,
  normalizeSitePath,
  shouldShowSiteBreadcrumbs,
} from '@/shared/utils/breadcrumbs'

function RouterCrumbLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  )
}

/** CRA shell: same trail + JSON-LD as Next `GlobalSiteBreadcrumbs`. */
export function GlobalCraBreadcrumbs() {
  const { pathname } = useLocation()
  const path = normalizeSitePath(pathname)

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
        <Helmet>
          <script type="application/ld+json">{schemaJson}</script>
        </Helmet>
      ) : null}
      <div className="border-b border-border/50 bg-muted/20">
        <div className="container-custom max-w-full py-1.5 sm:py-2 px-4 sm:px-6">
          <Breadcrumb
            items={withCurrent}
            className="text-xs sm:text-sm text-muted-foreground min-w-0 [&_ol]:flex-wrap [&_ol]:gap-y-1"
            LinkComponent={RouterCrumbLink}
          />
        </div>
      </div>
    </>
  )
}
