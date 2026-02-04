import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SEO from '@/components/seo/SEO'

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | Ancel Ajanga"
        description="The page you are looking for does not exist."
        canonicalUrl="https://ancel.co.ke/404"
        noindex
        nofollow
      />
      <div className="flex flex-col items-center justify-center min-h-[80vh] py-16">
      <div className="container-custom text-center">
        <h1 className="text-7xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
    </>
  )
}
