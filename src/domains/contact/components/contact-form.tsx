import React from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Textarea } from '@/shared/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui/card'
import { CheckCircle2, Phone, MessageCircle } from 'lucide-react'
import { SITE, WHATSAPP_URL } from '@/shared/constants/site'
import { AvailabilityBadge } from '@/shared/components/AvailabilityBadge'

const PHONE = SITE.phone
const WHATSAPP = SITE.whatsapp
const WHATSAPP_LINK = WHATSAPP_URL

interface ContactFormProps {
  className?: string
  onSuccess?: () => void
}

export function ContactForm({ className, onSuccess }: ContactFormProps) {
  const [state, handleSubmit] = useForm('xqegylwz')

  React.useEffect(() => {
    if (state.succeeded && onSuccess) {
      onSuccess()
    }
  }, [state.succeeded, onSuccess])

  return (
    <section className={`py-8 sm:py-12 md:py-16 ${className || ''}`}>
      <div className="container-custom">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl">Get in Touch</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-2">
              Reach out to discuss building resilient, scalable, high-impact systems. Whether you need enterprise-grade architecture, hybrid database solutions, or real-time platforms, I design systems that scale with your business.
            </CardDescription>
            <div className="mt-3 flex justify-center sm:justify-start">
              <AvailabilityBadge />
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border">
              <a href={`tel:${PHONE?.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4" />
                <span>{PHONE}</span>
              </a>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp {WHATSAPP}</span>
              </a>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {state.succeeded ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground mb-4">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name *</label>
                    <Input id="name" type="text" name="name" required placeholder="John Doe" className="min-h-[48px] text-base" />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-sm text-destructive" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email *</label>
                    <Input id="email" type="email" name="email" required placeholder="your@email.com" className="min-h-[48px] text-base" />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm text-destructive" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message *</label>
                  <Textarea id="message" name="message" required placeholder="Tell me about your project..." className="min-h-[120px] sm:min-h-[150px] text-base" />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm text-destructive" />
                </div>

                <Button type="submit" disabled={state.submitting} className="w-full min-h-[48px] text-base">
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
