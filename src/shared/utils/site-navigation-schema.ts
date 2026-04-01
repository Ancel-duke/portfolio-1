import { SITE } from '@/shared/constants/site'

const BASE_URL = SITE.url

/**
 * SiteNavigationElement JSON-LD for main nav (shared — used by layout shell).
 */
export function generateSiteNavigationSchema(
  navItems: Array<{ name: string; href: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Main site navigation',
    description:
      'Navigation for Ancel Ajanga portfolio — Fullstack Engineer, system resilience.',
    itemListElement: navItems.map((item, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: item.name,
      url: item.href === '/' ? `${BASE_URL}/` : `${BASE_URL}${item.href}`,
    })),
  }
}

