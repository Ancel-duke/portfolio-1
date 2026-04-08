import dynamic from 'next/dynamic'
import SEO from '@/domains/seo'
import { generateBreadcrumbSchema } from '@/domains/seo/schemas'

const ContactForm = dynamic(
  () => import('@/domains/contact').then((m) => m.ContactForm),
  { ssr: false }
)

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Ancel Ajanga — Full-Stack Engineer Narok & Nairobi, Kenya"
        description="Contact Ancel Ajanga, Software Engineer at Maxson Programming Limited — Narok and Nairobi, Kenya. Phone, WhatsApp, email. Available for select consulting and high-impact systems work."
        canonicalUrl="https://ancel.co.ke/contact"
        keywords={['Contact Ancel Ajanga', 'Narok software engineer', 'Nairobi software architect', 'Hire full-stack developer Kenya', 'East Africa developer']}
        jsonLd={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ])}
      />
      <ContactForm />
    </>
  )
}
