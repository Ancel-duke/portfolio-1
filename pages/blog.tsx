// Redirect is handled in next.config.js (source: /blog -> /developer-journal)
// This page is only hit if redirect hasn't run (e.g. client nav to /blog)
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function BlogPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/developer-journal')
  }, [router])
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <p className="text-muted-foreground">Redirecting...</p>
    </div>
  )
}
