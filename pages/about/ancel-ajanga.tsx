import React from 'react'
import { SEO } from '@/domains/seo/components/SEO'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function AboutAncelAjanga() {
  return (
    <>
      <SEO 
        title="Ancel Ajanga — The Fullstack Architect's Genesis; Engineering Philosophy & System Architecture"
        description="Deep dive into Ancel Ajanga's engineering philosophy, moving from traditional development to architecting resilient, self-healing distributed systems."
        canonicalUrl="/about/ancel-ajanga"
        keywords={[
          "Ancel Ajanga",
          "Engineering Philosophy",
          "Systems Architect",
          "Fullstack Developer",
          "Software Engineering",
          "Distributed Systems",
          "Resilient Systems",
          "Kenya"
        ]}
        ogTitle="Ancel Ajanga — Engineering Philosophy & System Architecture"
        ogImage="/images/about/profile-photo.png"
      />

      <LazyMotion features={domAnimation}>
        <article className="pt-24 pb-24 min-h-screen bg-background w-full">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container-custom max-w-3xl mx-auto px-4"
          >
            <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>

            <div className="blog-content">
              <h1>The Architecture of Resilience: Moving Beyond "It Works on My Machine"</h1>
              <p className="lead">
                I am Ancel Ajanga (Duke), a Staff Software Engineer and Lead Systems Architect based in Nairobi. My engineering ethos is simple: building software isn't about stringing APIs together. It's about designing systems that can survive failure, scale under extreme pressure, and maintain strict transactional integrity. 
              </p>

              <h2>The Genesis of a Systems Engineer</h2>
              <p>
                When I first began coding in 2021, my focus was entirely on the surface layer. I was building interactive UIs, stitching together simple database queries, and relying heavily on the default configurations of tools like React and Express. If a feature worked in staging, I shipped it.
              </p>
              <p>
                However, as I began tackling enterprise-level problems, the fragility of standard MVC applications became terrifyingly apparent. A dropped database connection during a financial transaction didn't just crash a server—it corrupted ledgers. A sudden spike in user registration didn't just slow down a UI—it overwhelmed the thread pool, causing cascading failures across loosely coupled microservices. 
              </p>
              <p>
                This realization marked my transition from a traditional "Fullstack Developer" to a <strong>Systems Architect</strong>. I stopped asking <em>"How do I build this feature?"</em> and started asking <em>"How does this feature fail, and how can the system heal itself when it does?"</em>
              </p>

              <h2>Defining the "Blind Trust" Problem</h2>
              <p>
                One of the most profound challenges in modern distributed architecture is what I call the "Blind Trust" problem. In standard RESTful microservices, Service A sends a payload to Service B, receives a 200 OK, and blindly trusts that Service B has successfully persisted the data.
              </p>
              <p>
                What happens if Service B's database connection is severed <em>exactly</em> after it sends the 200 OK? What if the message broker drops the event? 
              </p>
              <p>
                I tackled this aggressively when architecting <Link href="/projects/nestfi">NestFi</Link>, a decentralized financial engineering platform. In financial systems, a dropped record isn't a UI bug; it's lost capital. To solve this, I moved away from standard request-response cycles and implemented a strict, immutable append-only ledger pattern. 
              </p>
              <ul>
                <li>Every mutation generates a cryptographically unique <strong>UUID v7</strong>.</li>
                <li>Write operations are placed into an idempotent Event Queue (Kafka/BullMQ).</li>
                <li>The system employs an Outbox Pattern—ensuring that an event is <em>never</em> dispatched unless the local database transaction has successfully committed.</li>
              </ul>
              <p>
                This ensures that even if a node is wiped from existence mid-request, the system state remains perfectly consistent and reconcilable. 
              </p>

              <h2>Self-Healing Infrastructure</h2>
              <p>
                Resilience isn't just about data; it's about network topography. When building <Link href="/projects/aegis">Aegis</Link>, a high-performance machine learning operational gateway, the primary threat vector wasn't bad data—it was bad traffic. Model inference is notoriously expensive. A standard DDoS attack or even an accidental stampeding herd of legitimate users can exhaust GPU compute in seconds.
              </p>
              <p>
                My approach to Aegis was to build infrastructure that acts as a fortress. I employed <strong>Redis Enterprise</strong> acting not just as a cache, but as a rigid rate-limiting barricade implementing Token Bucket algorithms. 
              </p>
              <blockquote>
                "A system is only as strong as its ability to reject bad work quickly."
              </blockquote>
              <p>
                Before a request ever hits the inference engine, Aegis evaluates the JWT against OPA (Open Policy Agent) rules, checks the Redis quota, and inspects the payload signature. If the system detects strain, it automatically triggers Circuit Breakers, returning cached historical inferences or graceful degradation messages rather than allowing the core database to lock up.
              </p>

              <h2>Data Sovereignty and Zero-Knowledge Contexts</h2>
              <p>
                As distributed systems grow, so does the attack surface. In my work on <Link href="/projects/inkly">Inkly</Link>, the requirement was absolute data sovereignty. Users needed collaborative spaces where even the server administrators could not read the underlying data.
              </p>
              <p>
                This required pivoting from standard TLS encryption to a strict Zero-Knowledge (ZK) architecture. I engineered a lifecycle where cryptographic keys are generated and held exclusively on the client. Data payloads are encrypted in the browser using AES-GCM before ever touching a network socket. The backend (Node.js/PostgreSQL) simply acts as a blind relay, storing encrypted blobs and validating multi-tenant access via cryptographically signed intents.
              </p>

              <h2>Closing Thoughts: The Future is Distributed</h2>
              <p>
                The era of the "simple web app" is dying. Today's applications are highly concurrent, globally distributed ecosystems that demand rigorous engineering at every layer—from responsive, hardware-accelerated UIs down to idempotent database clustering. 
              </p>
              <p>
                My goal as an architect is to continue designing these systems. Whether it's optimizing a React render cycle to maintain 60fps under heavy load, or sharding a PostgreSQL database to handle tens of thousands of concurrent writes, my focus remains singular: building software that survives.
              </p>
              
              <div className="mt-12 p-8 bg-muted/50 rounded-2xl border border-border">
                <h3 className="!mt-0">Explore My Expertise</h3>
                <ul className="list-none !pl-0 !mt-4 space-y-3">
                  <li>
                    <Link href="/expertise/system-architecture" className="text-primary hover:underline font-medium">Read about my System Architecture methods &rarr;</Link>
                  </li>
                  <li>
                    <Link href="/expertise/backend-engineering" className="text-primary hover:underline font-medium">Dive into Backend Engineering & Databases &rarr;</Link>
                  </li>
                  <li>
                    <Link href="/expertise/frontend-engineering" className="text-primary hover:underline font-medium">Discover my Frontend & UI optimizations &rarr;</Link>
                  </li>
                </ul>
              </div>

            </div>
          </m.div>
        </article>
      </LazyMotion>
    </>
  )
}
