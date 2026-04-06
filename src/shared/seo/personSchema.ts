import { SITE } from '@/shared/constants/site';

const KNOWS_ABOUT = [
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
] as const;

/** Global Person JSON-LD — aligned with structured employment; extended fields preserve prior SEO signals. */
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE.url}/#ancel-ajanga`,
  name: SITE.name,
  alternateName: ['Ancel', 'Duke'],
  url: SITE.url,
  image: `${SITE.url}${SITE.profileImage}`,
  jobTitle: 'Software Engineer',
  description:
    'Fullstack Software Engineer from Nairobi, Kenya. Creator of Inkly, NestFi, LedgerX, Aegis, SignFlow, OpsFlow, EduManage.',
  worksFor: {
    '@type': 'Organization',
    name: SITE.company.name,
  },
  sameAs: [SITE.github, SITE.linkedin, SITE.url],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SITE.phone,
    contactType: 'customer service',
    areaServed: 'KE',
    availableLanguage: ['English'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  email: SITE.email,
  knowsAbout: [...KNOWS_ABOUT],
} as const;
