import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function SystemArchitecture() {
  return (
    <>
      <Head>
        <title>System Architecture | Architecting for Scale & Survival</title>
        <meta name="description" content="An exploration of System Architecture, distributed state, Event-Driven vs Request-Response models, and engineering infrastructure that survives failure." />
      </Head>

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
              <h1>Architecting for Scale & Survival</h1>
              <p className="lead">
                Building an application is easy. Building a system that survives hardware failures, network partitions, and stampeding traffic spikes requires deliberate, adversarial architecture.
              </p>

              <h2>When to Pivot: Monoliths vs Distributed Systems</h2>
              <p>
                There is a common fallacy in modern engineering: <em>"Start with microservices."</em> My architectural philosophy vehemently opposes this. Microservices solve organizational problems, but they introduce massive operational complexity. 
              </p>
              <p>
                A well-structured modular monolith is almost always the correct starting point. However, when traffic volume exceeds the compute limit of a single vertical stack, or when independent failure domains become necessary, the pivot to distributed systems becomes inevitable. In my architecture planning for high-load projects, I extract services based on <strong>volatility</strong> and <strong>compute asymmetry</strong>. 
              </p>
              <p>
                For example, in a system handling both user profiles and asynchronous PDF generation, the PDF generation should be isolated into a queue-driven worker service. A memory leak in a PDF library should never crash the authentication service.
              </p>

              <h2>Event-Driven vs Request-Response</h2>
              <p>
                Standard HTTP request-response cycles are inherently fragile. If Service A calls Service B synchronously over HTTP, Service A inherits Service B's uptime. If B goes down, A fails. This tightly coupled failure mode is the death of distributed systems.
              </p>
              <p>
                In my work on <Link href="/projects/signflow">SignFlow</Link> (a real-time WebSocket orchestration platform), relying on synchronous REST calls for state propagation would have resulted in devastating latency. Instead, I heavily utilized <strong>Event-Driven Architecture (EDA)</strong>.
              </p>
              <p>
                With EDA, Service A publishes an event to a message broker (like RabbitMQ or Apache Kafka) and immediately returns a success state to the user. Service B consumes that event asynchronously. If Service B goes offline, the events simply queue in the broker until Service B recovers. This achieves:
              </p>
              <ul>
                <li><strong>Temporal Decoupling:</strong> Services do not need to be online at the same time.</li>
                <li><strong>Elastic Scalability:</strong> If the queue backs up, we simply auto-scale the worker nodes consuming the queue.</li>
                <li><strong>Traffic Smoothing:</strong> Spiky, bursty traffic is absorbed by the queue, protecting the downstream database from being overwhelmed.</li>
              </ul>

              <h2>Idempotency & Distributed State</h2>
              <p>
                In an asynchronous, event-driven world, there is no guarantee of "Exactly-Once" delivery. Network retries mean a queue node might process the same event twice ("At-Least-Once" delivery). If your system is not idempotent, a retried payment event results in a double charge.
              </p>
              <p>
                To build indestructible ledgers—such as those implemented in <Link href="/projects/nestfi">NestFi</Link>—I engineer strict idempotency schemas. Every event must carry a globally unique identifier. I explicitly utilize <strong>UUID v7</strong> over v4, because v7 incorporates timestamp data, allowing the database to maintain sequential clustered indexing, which drastically prevents page fragmentation and improves insert speeds under heavy load.
              </p>
              <p>
                Before executing a state change, the worker atomically checks the database: <code>INSERT INTO processed_events (id) VALUES ($1) ON CONFLICT DO NOTHING</code>. If the insert fails, the event is a duplicate, and the worker safely ignores it.
              </p>

              <h2>Scaling Strategies: Beyond Vertical Muscle</h2>
              <p>
                Throwing more CPU and RAM at a database (Vertical Scaling) is a temporary band-aid with a fast-approaching ceiling. True scaling is horizontal and algorithmic.
              </p>
              <p>
                When architecting for massive scale, my first line of defense is aggressive caching. In the architecture of <Link href="/projects/aegis">Aegis</Link>, I employed Redis not merely as a key-value store, but as a strategic membrane. Frequent read queries are intercepted by Redis, bypassing the primary PostgreSQL database entirely. I implement <strong>Cache Aside</strong> patterns with strict TTLs and proactive cache-invalidation mechanisms.
              </p>
              <p>
                Once caching limits are reached, horizontal scaling becomes necessary. For web servers, this is trivial—keep compute nodes purely <em>stateless</em>, store session data in Redis, and place them behind a Load Balancer. For databases, I plan for Read-Replicas to offload heavy query reports, and as a final, extreme measure: intelligent database Sharding based on tenant or geographic IDs.
              </p>

              <h2>Conclusion</h2>
              <p>
                System architecture is not about selecting trendy tools. It is the applied discipline of mitigating risk. It requires understanding the CAP theorem, managing distributed transactions (such as the Saga pattern), and engineering resilience so that when a server inevitably goes up in flames at 3 AM, the system self-heals, and the user never notices.
              </p>
              
              <div className="mt-12 p-8 bg-muted/50 rounded-2xl border border-border">
                <h3 className="!mt-0">Read More</h3>
                <ul className="list-none !pl-0 !mt-4 space-y-3">
                  <li>
                    <Link href="/about/ancel-ajanga" className="text-primary hover:underline font-medium">&larr; Read my engineering Genesis</Link>
                  </li>
                  <li>
                    <Link href="/expertise/backend-engineering" className="text-primary hover:underline font-medium">Read about Backend Data Structures &rarr;</Link>
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
