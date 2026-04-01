export const SITE = {
  name: 'Ancel Ajanga',
  url: 'https://ancel.co.ke',
  phone: '+25479355755',
  whatsapp: '+25479355755',
  email: 'ancel.ajanga@yahoo.com',
  github: 'https://github.com/Ancel-duke',
  linkedin: 'https://www.linkedin.com/in/ajanga-ancel',
  profileImage: '/images/about/profile-photo.png',
} as const;

export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp.replace('+', '')}`;
