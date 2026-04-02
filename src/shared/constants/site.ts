export const SITE = {
  name: 'Ancel',
  /** Full legal/public name — use in schema.org Person, author fields, and anywhere canonical identity matters. */
  fullName: 'Ancel Ajanga',
  url: 'https://ancel.co.ke',
  phone: '+25479355755',
  whatsapp: '+25479355755',
  email: 'ancel.ajanga@yahoo.com',
  github: 'https://github.com/Ancel-duke',
  linkedin: 'https://www.linkedin.com/in/ajanga-ancel',
  /** Twitter/X — add handle URL when account is public */
  twitter: 'https://twitter.com/ancel_ajanga',
  profileImage: '/images/about/profile.webp',
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp.replace('+', '')}`;
