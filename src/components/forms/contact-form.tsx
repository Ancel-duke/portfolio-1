import * as React from "react"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { cn, isValidEmail } from "../../lib/utils"
import { Send, CheckCircle, AlertCircle, Phone, MessageCircle } from "lucide-react"

const PHONE = "0793558755"
const WHATSAPP = "0793558755"
const WHATSAPP_LINK = `https://wa.me/254793558755`

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

interface ContactFormProps {
  className?: string
  onSuccess?: () => void
}

export function ContactForm({ className, onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long"
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    } else if (formData.email.length > 100) {
      newErrors.email = "Email must be less than 100 characters"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long"
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Message must be less than 1000 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

    if (serviceId && templateId && publicKey && typeof window !== 'undefined') {
      try {
        const emailjs = (await import('emailjs-com')).default
        emailjs.init(publicKey)
        await emailjs.send(serviceId, templateId, {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }, publicKey)
        setSubmitStatus('success')
        setFormData({ name: "", email: "", message: "" })
        onSuccess?.()
      } catch (error) {
        console.error('EmailJS error:', error)
        setSubmitStatus('error')
      } finally {
        setIsSubmitting(false)
      }
    } else {
      // Fallback: open mailto
      try {
        const subject = encodeURIComponent("Contact from Portfolio Website")
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )
        window.open(`mailto:ancel.ajanga@yahoo.com?subject=${subject}&body=${body}`)
        setSubmitStatus('success')
        setFormData({ name: "", email: "", message: "" })
        onSuccess?.()
      } catch (error) {
        console.error('Error opening mail client:', error)
        setSubmitStatus('error')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent("Contact from Portfolio")
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.open(`mailto:ancel.ajanga@yahoo.com?subject=${subject}&body=${body}`)
  }

  return (
    <section className={cn("py-8 sm:py-12 md:py-16", className)}>
      <div className="container-custom">
        <Card className={cn("w-full max-w-2xl mx-auto", className)}>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl">Get in Touch</CardTitle>
            <CardDescription className="text-sm sm:text-base mt-2">
              Reach out to discuss building resilient, scalable, high-impact systems. Whether you need enterprise-grade architecture, hybrid database solutions, or real-time platforms, I design systems that scale with your business.
            </CardDescription>
            <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border">
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
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
        {submitStatus === 'success' ? (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for reaching out. I'll get back to you within 24 hours.
            </p>
            <Button onClick={() => setSubmitStatus('idle')}>
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={cn(errors.name && "border-destructive", "min-h-[48px] text-base")}
                  placeholder="Your name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={cn(errors.email && "border-destructive")}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message *
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={cn(errors.message && "border-destructive", "min-h-[120px] sm:min-h-[150px] text-base")}
                placeholder="Tell me about your project..."
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message}</p>
              )}
            </div>

            {submitStatus === 'error' && (
              <div className="flex items-center space-x-2 text-destructive">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">
                  Something went wrong. Please try again or use the email link below.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 min-h-[48px] text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleMailtoFallback}
                disabled={isSubmitting}
              >
                Email Instead
              </Button>
            </div>
          </form>
        )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

