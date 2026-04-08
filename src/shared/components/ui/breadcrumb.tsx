import React from 'react'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/shared/utils'

export interface BreadcrumbItem {
  name: string
  url: string
  current?: boolean
}

type DefaultLinkProps = {
  href: string
  className?: string
  children: React.ReactNode
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
  /** Defaults to `<a>`. Pass `next/link` for SPA navigation on the Next app. */
  LinkComponent?: React.ComponentType<DefaultLinkProps>
}

function AnchorLink({ href, className, children }: DefaultLinkProps) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className,
  LinkComponent = AnchorLink,
}) => {
  return (
    <nav
      className={cn('flex items-center min-w-0 text-sm text-muted-foreground', className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-0.5 min-w-0 list-none m-0 p-0">
        {items.map((item, index) => (
          <li key={`${item.url}-${index}`} className="flex items-center min-w-0 max-w-full">
            {index > 0 && (
              <ChevronRight
                className="h-3.5 w-3.5 mx-0.5 shrink-0 text-muted-foreground/50"
                aria-hidden
              />
            )}

            {item.current ? (
              <span
                className="font-medium text-foreground truncate max-w-[min(100%,14rem)] sm:max-w-[min(100%,24rem)]"
                aria-current="page"
                title={item.name}
              >
                {item.name}
              </span>
            ) : (
              <LinkComponent
                href={item.url}
                className="hover:text-foreground transition-colors duration-200 flex items-center min-w-0 shrink"
              >
                {index === 0 && <Home className="h-3.5 w-3.5 mr-1 shrink-0" aria-hidden />}
                <span className="truncate max-w-[min(100%,12rem)] sm:max-w-[min(100%,20rem)]" title={item.name}>
                  {item.name}
                </span>
              </LinkComponent>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
