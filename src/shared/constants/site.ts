export const SITE = {
  name: 'Ancel Ajanga',
  url: 'https://ancel.co.ke',
  phone: '+25479355755',
  whatsapp: '+25479355755',
  email: 'ancel.ajanga@yahoo.com',
  github: 'https://github.com/Ancel-duke',
  linkedin: 'https://www.linkedin.com/in/ajanga-ancel',
  twitter: 'https://twitter.com/ancel_ajanga',
  profileImage: '/images/about/profile.webp',

  role: 'Systems Engineer & Fullstack Developer',

  company: {
    name: 'Maxson Programming Limited',
    role: 'Software Engineer',
    type: 'Full-time',
    note: 'All projects showcased on this portfolio are independently built and are not affiliated with my employer.',
  },

  availability: {
    type: 'select',
    message:
      'Available for select consulting and high-impact system design projects.',
  },

  /** UI copy derived from employment / portfolio boundaries (single source). */
  copy: {
    professionalContext:
      'Currently working as a Software Engineer. All featured projects are independently designed and built.',
    projectsPageIntro:
      'All projects listed here are independently built and showcase my personal engineering work.',
    currentRoleLead:
      'Software Engineer at Maxson Programming Limited, contributing to production-grade systems focused on scalability, reliability, and secure architecture.',
    aboutPortfolioIndependence:
      'All portfolio projects are independently built and represent my personal work.',
    footerTrustLine:
      'Working full-time in engineering • Available for select consulting projects',
    availabilityBadge: 'Limited Availability • High-Impact Projects Only',
    heroSupportingLead:
      'Software Engineer at Maxson Programming Limited. I design and build fault-tolerant, scalable systems and take on select high-impact projects.',
  },
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp.replace('+', '')}`;
