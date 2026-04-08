import React from 'react'
import Link from 'next/link'
import { ExpertiseSeo, ExpertiseRelatedHub } from '@/domains/expertise/components/ExpertiseSeo'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function DistributedSystems() {
  return (
    <>
      <ExpertiseSeo
        title="Distributed Systems | Concurrency & Fault Tolerance"
        description="How to build distributed systems that survive partitions: queues, idempotency, circuit breakers, and multi-tenant ops—patterns reflected in NestFi and Aegis."
        path="/expertise/distributed-systems"
        keywords={[
          'Distributed systems',
          'Fault tolerance',
          'Message queues',
          'NestFi',
          'Aegis',
          'Ancel Ajanga',
        ]}
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
              <h1>Distributed Systems: Orchestrating Chaos</h1>
              <p className="lead">
                The moment you deploy a second node, your application is no longer a codebase. It is an ecosystem. Distributed systems engineering is the art of orchestrating chaos—ensuring that multiple machines, experiencing independent failures across an unreliable network, present a single, unbreakable truth to the user.
              </p>

              <h2>Consensus and Consistency Models</h2>
              <p>
                In a distributed environment, you cannot bypass the CAP theorem (Consistency, Availability, Partition Tolerance). In my infrastructure architecture, I explicitly define which data stores favor which side of the triangle.
              </p>
              <p>
                For <Link href="/projects/nestfi">NestFi</Link>, eventual consistency in the core ledger was unacceptable. If a user withdraws funds simultaneously from two different nodes, the system must enforce strict, linearizable consistency to prevent double-spending. I utilized PostgreSQL's strict isolation levels and distributed pessimistic locking. The system explicitly sacrifices Availability in the event of a network partition (choosing CP) because dropping a ledger request is infinitely safer than committing a fragmented one.
              </p>
              <p>
                Conversely, for high-volume telemetry ingestion and user-activity logging, I favor Availability (AP). If an analytics point is dropped or recorded out of order across a Kafka cluster, the business impact is zero. Knowing exactly when to loosen consistency constraints to achieve 10,000 requests per second is the mark of a mature architect.
              </p>

              <h2>Fault-Tolerant Communication (The Outbox Pattern)</h2>
              <p>
                Microservices demand asynchronous communication. However, dual-write scenarios—where a service writes to its local database and then pushes an event to a message queue—are catastrophic. If the database commits but the queue drops the connection, the system state splits instantly.
              </p>
              <p>
                To eliminate this, I strictly implement the <strong>Transactional Outbox Pattern</strong>. When a service mutates state, it writes the payload and the corresponding event into the <em>same</em> transactional database bounded context. A separate background worker (or Debezium CDC pipeline) continuously polls the outbox table and guarantees At-Least-Once delivery to the broker. This entirely closes the dual-write vulnerability. 
              </p>

              <h2>Containerization Setup & Multi-Tenancy</h2>
              <p>
                Deploying distributed systems manually is impossible. I engineer applications to be utterly disposable. Using <strong>Docker</strong> and <strong>Kubernetes</strong> paradigms, nodes are stateless compute blocks that pull configuration at runtime.
              </p>
              <p>
                When building <strong>EduManage</strong>, a major challenge was data segregation across multi-tenant school districts. Rather than spinning up independent infrastructure grids which bloat costs, I utilized logical partitioning with Row-Level Security (RLS) inside a massive distributed database. The containerized application nodes effortlessly scaled horizontally across demand spikes, injecting the authenticated tenant ID into every underlying database query natively. Tenants share the compute, but access is cryptographically bounded.
              </p>

              <h2>Conclusion</h2>
              <p>
                Designing distributed systems is fundamentally an exercise in paranoia. By assuming the network will fail, the disk will fill, and the queue will stall, I build mechanisms like Circuit Breakers, Outbox patterns, and Idempotent schemas. These layers of defense turn an otherwise catastrophic failure into a simple, recoverable log warning.
              </p>
              
              <div className="mt-12 p-8 bg-muted/50 rounded-2xl border border-border">
                <h3 className="!mt-0">Connect the Dots</h3>
                <ul className="list-none !pl-0 !mt-4 space-y-3">
                  <li>
                    <Link href="/about/ancel-ajanga" className="text-primary hover:underline font-medium">&larr; Return to my Architect overview</Link>
                  </li>
                  <li>
                    <Link href="/expertise/system-architecture" className="text-primary hover:underline font-medium">Review System Architecture &rarr;</Link>
                  </li>
                </ul>
              </div>

              <ExpertiseRelatedHub />
            </div>
          </m.div>
        </article>
      </LazyMotion>
    </>
  )
}
