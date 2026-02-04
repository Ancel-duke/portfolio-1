import dynamic from 'next/dynamic'
import SEO from '@/components/seo/SEO'

const ContactForm = dynamic(
  () => import('@/components/forms/contact-form').then((m) => m.ContactForm),
  { ssr: false }
)

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Ancel Ajanga — Full-Stack Engineer Narok & Nairobi, Kenya"
        description="Contact Ancel Ajanga, Fullstack Software Engineer and Architect in Narok and Nairobi, Kenya. Hire a full-stack developer East Africa for NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain. Phone, WhatsApp, email."
        canonicalUrl="https://ancel.co.ke/contact"
        keywords={['Contact Ancel Ajanga', 'Narok software engineer', 'Nairobi software architect', 'Hire full-stack developer Kenya', 'East Africa developer']}
      />
      <ContactForm />
    </>
  )
}
