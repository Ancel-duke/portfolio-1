import { SITE, WHATSAPP_URL } from '@/shared/constants/site';

const KNOWS_ABOUT = [
  'Distributed Systems',
  'Microservices',
  'Real-time Systems',
  'Real-time Messaging',
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
  'Next.js',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'Flutter',
  'Fintech Systems',
  'Fintech Architecture',
  'M-Pesa Integration',
  'Zero-Trust Security',
  'System Design',
  'Event-driven Architecture',
] as const;

export const EMPLOYER_ORG_ID = `${SITE.url}/#organization-maxson-programming-limited` as const;
export const PERSON_ID = `${SITE.url}/#ancel-ajanga` as const;

/** Employer entity (employee relationship via Person.worksFor). */
export const employerOrganizationNode = {
  '@type': 'Organization',
  '@id': EMPLOYER_ORG_ID,
  name: SITE.company.name,
  description:
    'Kenya-based technology employer. Featured portfolio systems on ancel.co.ke are independently authored by Ancel Ajanga unless explicitly stated otherwise.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  areaServed: 'Kenya',
  sameAs: [SITE.linkedin],
} as const;

/** Person node for JSON-LD @graph (no root @context). */
export const personLdNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE.name,
  alternateName: ['Ancel', 'Duke'],
  url: SITE.url,
  image: `${SITE.url}${SITE.profileImage}`,
  jobTitle: SITE.role,
  description:
    'Software Engineer at Maxson Programming Limited. Fullstack engineer from Nairobi, Kenya. Creator of Inkly, NestFi, LedgerX, Aegis, SignFlow, OpsFlow, EduManage.',
  worksFor: { '@id': EMPLOYER_ORG_ID },
  sameAs: [SITE.github, SITE.linkedin, SITE.twitter, SITE.url, WHATSAPP_URL],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      email: SITE.email,
      contactType: 'professional service',
      areaServed: 'Kenya',
      availableLanguage: ['English', 'Swahili'],
    },
  ],
  areaServed: 'Kenya',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
  email: SITE.email,
  knowsAbout: [...KNOWS_ABOUT],
} as const;

/**
 * Global identity graph: Organization (employer) + Person. Injected once in _document.
 */
export const siteIdentityJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [employerOrganizationNode, personLdNode],
} as const;

