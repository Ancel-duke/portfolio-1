const fs = require('fs');
const path = 'src/data/blog-posts.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newPosts = [
  {
    slug: 'blind-trust-idempotency-microservices',
    title: 'The "Blind Trust" Problem: Why Microservices Corrupt Data Without Idempotency',
    excerpt: 'Exploring exactly-once delivery myths and building strict idempotent ledgers. We examine the Outbox Pattern in high-traffic environments.',
    content: `<h2>The Fragility of Request-Response</h2>
<p>When building standard RESTful microservices, architects often fall into the trap of "Blind Trust". Service A sends a mutation request to Service B, receives a <code>200 OK</code>, and blindly trusts that Service B successfully committed the data to disk.</p>
<p>In reality, networks are deeply unreliable. What if Service B's database transaction deadlocks exactly after returning the 200 status? What if the reverse proxy drops the packet on the return trip, causing Service A to retry the exact same mutation?</p>
<h2>Fixing the Ledger: Idempotency by Default</h2>
<p>While engineering financial workflows like those seen in <a href="/projects/ledgerx">LedgerX</a> and <a href="/projects/nestfi">NestFi</a>, eventual consistency is unacceptable. If a retry occurs, applying a payment twice is a catastrophic failure.</p>
<p>The solution is strict <strong>Idempotency</strong>. Every single mutation must be generated with a globally unique identifier (preferably UUID v7 for sequential indexing) at the absolute origin point. When the receiving service processes the payload, it attempts to insert this UUID into a unique <code>processed_events</code> table.</p>
<blockquote>
"If the insert throws a unique constraint violation, the system knows this is a retry. It gracefully ignores the payload and returns a success status."
</blockquote>
<h2>The Outbox Pattern</h2>
<p>To prevent split-brain states where a local database commits but the event broker drops the message, we enforce the Transactional Outbox Pattern. Mutations to the ledger and the outgoing event are written in the <strong>same database transaction</strong>. A background worker then constantly polls the outbox, guaranteeing At-Least-Once delivery to the message queue. This entirely mitigates the Blind Trust problem.</p>`,
    date: '2026-03-15',
    readTime: '8 min read',
    author: 'Ancel Ajanga',
    category: 'Backend Architecture',
    image: '/images/projects/nestfi.png',
    tags: ['Microservices', 'System Architecture', 'Idempotency']
  },
  {
    slug: 'stampeding-herd-redis-lua',
    title: 'Surviving the Stampeding Herd: Defensive Caching with Redis and Lua',
    excerpt: 'Naive caching fails under burst traffic. Learn how to implement token-bucket rate limiting via Lua to protect your primary databases.',
    content: `<h2>When Caches Become Liabilities</h2>
<p>Caching is universally taught as the silver bullet to database load. Just put Redis in front of PostgreSQL, right? Wrong. Under sudden, massive traffic spikes (the <em>Stampeding Herd</em>), if a critical cache key expires, thousands of concurrent requests will suddenly bypass the cache simultaneously, instantly drowning the database.</p>
<h2>Defensive Throttling via Lua</h2>
<p>To defend against this, your caching layer must be aggressive. When architecting <a href="/projects/aegis">Aegis</a>, a high-performance machine learning operational gateway, inference actions were too expensive to strictly rely on simple Time-To-Live (TTL) cache expirations.</p>
<p>Instead, we engineered distributed rate limiting using native <strong>Lua scripts</strong> executing directly on the Redis engine. Because Lua scripts run atomically in Redis, we can evaluate a user\'s Token Bucket quota, decrement it, and return the result without fear of race conditions across multiple Node.js instances.</p>
<h3>Mutex Locking the Herd</h3>
<p>To solve the actual Stampeding Herd, I implement Distributed Mutex Locks. If a cache key is empty, only the <strong>first</strong> request is allowed to query the database. All subsequent requests attempting to access that exact resource are forced to wait (via a slight backoff queue) until the first request repopulates the cache.</p>
<p>Building architecture is not about trusting the cache—it’s about strictly managing what happens the millisecond it fails.</p>`,
    date: '2026-02-12',
    readTime: '7 min read',
    author: 'Ancel Ajanga',
    category: 'Systems Engineering',
    image: '/images/projects/aegis.png',
    tags: ['Redis', 'Caching', 'Architecture']
  },
  {
    slug: 'zero-knowledge-frontends',
    title: 'Zero-Knowledge Frontends: Encrypting Data Before It Hits the Network',
    excerpt: 'Shifting encryption from the backend to the client via AES-GCM and the Web Crypto API for true data sovereignty.',
    content: `<h2>The Illusion of TLS Security</h2>
<p>Transport Layer Security (TLS) guarantees that data is encrypted while traveling across the network. But what happens when it reaches the server? In most traditional architectures, the Node.js or Python backend automatically decrypts the payload, holding user data in raw system memory before writing it to the database.</p>
<p>If a malicious actor gains superuser access to the cloud environment, or if a rogue dependency scrapes memory, the data is entirely exposed.</p>
<h2>True Data Sovereignty</h2>
<p>When engineering <a href="/projects/inkly">Inkly</a>, I designed the platform around a strict Zero-Knowledge (ZK) mandate. The server administrators themselves must be physically incapable of reading user documents.</p>
<p>This completely inverts the standard frontend-backend relationship. Because the server cannot be trusted, <strong>encryption must happen purely on the client side</strong>.</p>
<ul>
<li>Cryptographic keys are derived from a user passphrase using PBKDF2 directly in the browser.</li>
<li>The document content is encrypted using AES-GCM via the native Web Crypto API.</li>
<li>The React application only transmits an opaque, completely randomized ciphertext blob to the backend.</li>
</ul>
<h2>Backend as a Blind Relay</h2>
<p>In this architecture, the backend is no longer a data processor—it is a blind relay and a permissions enforcer. It stores encrypted blobs and manages JWT access control, but it can never index, read, or exploit the data it holds.</p>`,
    date: '2026-01-20',
    readTime: '9 min read',
    author: 'Ancel Ajanga',
    category: 'Security',
    image: '/images/projects/inkly.png',
    tags: ['Zero-Knowledge', 'Web Crypto API', 'React']
  },
  {
    slug: 'scaling-websocket-signflow',
    title: 'Scaling WebSocket Architecture: Lessons from Real-Time Orchestration',
    excerpt: 'Keeping massive concurrent connections alive, preventing socket bloat, and utilizing Redis Pub/Sub for horizontal scaling.',
    content: `<h2>The Stateful Trap</h2>
<p>REST pipelines are stateless, which makes them trivially easy to scale simply by adding more load-balanced containers. WebSockets are inherently stateful. Once a connection is established, that specific user is tied strictly to that single server instance.</p>
<p>When architecting <a href="/projects/signflow">SignFlow</a>, the platform required real-time push orchestration across thousands of concurrent clients. When a single container hit its file descriptor limit, attempting to spin up a second container caused a fatal issue logs originating on Node B could not reach clients connected to Node A.</p>
<h2>Redis Pub/Sub as the Nervous System</h2>
<p>The solution is an underlying message bus connecting all WebSocket nodes together. I utilized Redis Pub/Sub to act as the global nervous system for the cluster.</p>
<ol>
<li>User 1 (on Node A) sends a message to User 2 (on Node B).</li>
<li>Node A receives the payload via WebSocket, but it doesn't know where User 2 is.</li>
<li>Node A publishes the event to a Redis channel named <code>user_channel_2</code>.</li>
<li>Node B, which manages User 2, is subscribed to that channel. It receives the event from Redis and instantly pushes it down the WebSocket to User 2.</li>
</ol>
<h2>Connection Pruning</h2>
<p>Zombie connections are the silent killer of WebSocket servers. Clients disconnect poorly due to unstable mobile networks, leaving the server holding memory for a dead socket. Implementing aggressive heartbeat algorithms (sending Ping/Pong frames every 30 seconds) and sweeping dead connections ensures the garbage collector doesn't fall behind during extreme usage spikes.</p>`,
    date: '2025-07-05',
    readTime: '10 min read',
    author: 'Ancel Ajanga',
    category: 'Systems Engineering',
    image: '/images/projects/signflow.png',
    tags: ['WebSockets', 'Redis Pub/Sub', 'Real-Time']
  },
  {
    slug: 'multi-tenant-row-level-security-edumanage',
    title: 'Multi-Tenant Row-Level Security: Isolating Data in Distributed Systems',
    excerpt: 'How to safely host hundreds of distinct organizations in a single database using PostgreSQL RLS.',
    content: `<h2>The Cost of Physical Separation</h2>
<p>When building SaaS applications like <a href="/projects/edumanage">EduManage</a>, isolation is paramount. School A absolutely cannot see School B's student records. The naive approach is spinning up a unique database instance for every tenant. While extremely secure, this explodes infrastructure costs and makes schema migrations a nightmare.</p>
<h2>Logical Partitioning via Row-Level Security (RLS)</h2>
<p>Instead of physical hardware separation, I utilize deep logical separation directly inside the PostgreSQL engine using Row-Level Security (RLS).</p>
<p>By enabling RLS, every table behaves like a fortress. Even if a backend API route has a critical vulnerability allowing a SELECT * without a WHERE clause, the database itself will intercept the transaction and only return rows belonging to the active tenant session.</p>
<h3>The Implementation Architecture</h3>
<p>When a request hits the NestJS backend, we extract the <code>tenant_id</code> from the authenticated JWT. Before launching any transaction against the database, we fire a rapid setup query: <code>SET LOCAL app.current_tenant = 'tenant-xyz';</code>.</p>
<p>PostgreSQL's native RLS policies enforce that <code>document.tenant_id = current_setting('app.current_tenant')</code>. This pushes the isolation logic away from brittle application layer ORMs deeply down to the storage engine, drastically reducing code complexity while mathematically guaranteeing tenant separation.</p>`,
    date: '2026-03-18',
    readTime: '6 min read',
    author: 'Ancel Ajanga',
    category: 'Backend Architecture',
    image: '/images/projects/edumanage.png',
    tags: ['PostgreSQL', 'SaaS', 'Security']
  },
  {
    slug: 'automating-opsflow-ai-pipelines',
    title: 'Automating the Pipeline: AI-Driven Operational Flows',
    excerpt: 'Moving past simple hardcoded triggers to dynamic machine learning inferences in modern CI/CD architecture.',
    content: `<h2>Rigid Rules vs Fluid Operations</h2>
<p>Traditional deployment and operational flows rely on rigid, hardcoded boolean logic. We build CI pipelines that deploy if all tests pass. We trigger alerts if CPU exceeds 80%. But as infrastructure reaches massive scale, static rules result in alert fatigue and brittle deployment structures.</p>
<h2>Injecting Intelligence into Ops</h2>
<p>In developing <a href="/projects/opsflow">OpsFlow</a>, the goal was to replace static heuristics with contextual machine intelligence. By piping standard telemetry (Prometheus metrics, application logs, Jenkins webhooks) into a trained transformer model, the system stops treating anomalies as simple threshold breaches.</p>
<p>For example, if memory usage spikes to 85% at 2 AM, a static rule fires a critical page. However, an AI-driven pipeline recognizes this as a standard garbage collection phase on the specific microservice based on 60 days of historical context, and automatically suppresses the pager while quietly allocating a temporary horizontal pod via the Kubernetes API.</p>
<h3>Secure Telemetry Bridging</h3>
<p>Injecting AI into infrastructure pipelines requires severe security bounding. The AI model itself is utterly isolated from root network access. It acts purely as a Proposal Engine, dropping signed intent messages into a restricted Kafka queue, which are then explicitly validated by strict OPA (Open Policy Agent) gatekeepers before any real infrastructure mutation occurs.</p>`,
    date: '2025-11-11',
    readTime: '8 min read',
    author: 'Ancel Ajanga',
    category: 'Systems Engineering',
    image: '/images/projects/opsflow.png',
    tags: ['AI Operations', 'Pipelines', 'Kubernetes']
  },
  {
    slug: 'verifiable-credentials-educhain',
    title: 'Verifiable Credentials on the Blockchain: Redefining Academic Integrity',
    excerpt: 'How cryptographically signed educational records are replacing legacy PDF transcripts.',
    content: `<h2>The Flaw in Legacy Credentials</h2>
<p>Academic credentials today are fundamentally broken. A PDF transcript or a printed degree requires manual, time-consuming verification by contacting the issuing university directly. They are easily forged and brutally inefficient for global hiring teams.</p>
<h2>The EduChain Solution</h2>
<p>With <a href="/projects/educhain">EduChain</a>, we engineered a system that pushes academic transcripts onto a distributed ledger, creating instantly verifiable, cryptographically permanent credentials.</p>
<p>By leveraging W3C Verifiable Credentials (VC) standards, a university issues a degree by digitally signing a JSON payload using their private key. A hash of this signed payload is anchored permanently to a blockchain (acting as a decentralized, immutable registry).</p>
<h3>Decentralized Identity (DID)</h3>
<p>Students hold their credentials in self-sovereign digital wallets. When they apply for a job, they present a Verifiable Presentation. The employer\'s system automatically hashes the presentation, looks up the university\'s public Identity (DID) on the chain, and mathematically verifies that the diploma was issued by the institution and hasn\'t been altered by a single byte.</p>
<p>This removes the centralized university registrar from the verification loop entirely, granting the student absolute ownership of their academic history.</p>`,
    date: '2025-12-20',
    readTime: '7 min read',
    author: 'Ancel Ajanga',
    category: 'Architecture',
    image: '/images/projects/educhain.png',
    tags: ['Blockchain', 'Security', 'Cryptography']
  },
  {
    slug: 'fitness-ui-highfps-dashboards',
    title: 'Fitness Analytics UI: Achieving 60FPS on Hardware-Accelerated Dashboards',
    excerpt: 'Bypassing React’s Virtual DOM to build butter-smooth data visualization grids.',
    content: `<h2>The React Performance Ceiling</h2>
<p>React is deeply powerful, but when rendering thousands of granular data points on a mobile screen—such as live velocity or heart-rate timelines in <a href="/projects/fits-by-aliv">Fits by Aliv</a>—relying strictly on React state transitions will cause profound jank. If you tie a scroll listener or a real-time slider to a standard <code>setState</code>, React tries to diff the massive Virtual DOM repeatedly, blocking the main thread.</p>
<h2>Escaping to the RAF</h2>
<p>To hit a strict 60 Frames Per Second (FPS) target, you must abandon React\'s render cycle for the most volatile elements. Instead of updating state, we utilize <code>useRef</code> to hold direct references to DOM nodes, and update their CSS natively inside a <code>requestAnimationFrame</code> (RAF) loop.</p>
<blockquote>
"True frontend performance comes from knowing exactly when to stop using your framework."
</blockquote>
<h2>Hardware Accelerated Transforms</h2>
<p>When scrubbing through historical workout data across complex SVG charts, I strictly manipulated the <code>transform</code> and <code>opacity</code> CSS properties. Altering a margin, width, or top value forces the browser to recalculate the layout matrix across all child elements (Layout Thrashing). By isolating the animations to transforms, the GPU seamlessly slides the graphic layer computationally, keeping the CPU entirely free for data ingestion.</p>`,
    date: '2025-08-15',
    readTime: '6 min read',
    author: 'Ancel Ajanga',
    category: 'Frontend Authority',
    image: '/images/projects/fits-by-aliv.png',
    tags: ['React', 'Performance', 'UI Design']
  },
  {
    slug: 'uuid-v7-vs-v4-postgresql',
    title: 'UUID v7 vs v4: Why Your PostgreSQL Inserts Are Suffering from Page Fragmentation',
    excerpt: 'A deep database performance dive explaining why time-sorted UUIDs drastically improve clustered index inserts.',
    content: `<h2>The Scaling Trap of UUID v4</h2>
<p>Standardized unique identifiers (UUID v4) revolutionized distributed ID generation because they don't require database round-trips. However, at scale, using v4 as a Primary Key in PostgreSQL creates a massive infrastructure bottleneck.</p>
<p>PostgreSQL generally utilizes B-Tree structures for primary indices. Because UUID v4 values are entirely random, every new insert scatters across the entire B-Tree blindly. This induces severe <strong>Page Fragmentation</strong>. The database must constantly load completely random index pages from disk to memory, destroying caching efficiency and forcing the engine to constantly split B-Tree pages.</p>
<h2>The UUID v7 Fix</h2>
<p>To architect heavily loaded write-endpoints properly, I uniformly implement <strong>UUID v7</strong> across all my environments. UUID v7 combines the millisecond-precision timestamp at the beginning of the string, while leaving the remaining bits randomized for collision protection.</p>
<p>This fundamentally alters database mechanics. Because the first half of the UUID is time-sequential, all new records are inserted sequentially at the very right edge of the B-Tree index. This results in incredibly dense, perfectly ordered data pages, massively reducing disk I/O, solving the fragmentation problem natively without giving up the distributed predictability of UUIDs.</p>`,
    date: '2025-07-10',
    readTime: '7 min read',
    author: 'Ancel Ajanga',
    category: 'Database Optimization',
    image: '/images/projects/aegis.png',
    tags: ['PostgreSQL', 'Architecture', 'Scaling']
  },
  {
    slug: 'death-by-dual-writes-architecture',
    title: 'Death by Dual-Writes: Eliminating Split-Brain States in Architecture',
    excerpt: 'How synchronous API calls inside database transactions lead to catastrophic failures, and the Debezium fix.',
    content: `<h2>The Dual-Write Anti-Pattern</h2>
<p>One of the most dangerous, yet common, patterns in junior systems architecture is the Dual-Write. An HTTP request comes in, the developer initiates a local database transaction (e.g. creating a User), and inside that <em>exact same block of code</em>, they fire a REST API request to a secondary billing service or an email provider.</p>
<p>What happens if the billing API times out? Does the local transaction roll back? What happens if the billing API actually succeeded on their end, but the network timed out on the return trip, causing the local API to roll back? You now have a billed user who doesn\'t exist in your database. A split-brain state.</p>
<h2>Eventual Consistency via CDC</h2>
<p>Instead of relying on fragile in-app logic, high-tier architects utilize <strong>Change Data Capture (CDC)</strong> systems like Debezium alongside Kafka.</p>
<p>The application code makes precisely one action: it mutates the local database. It does not speak to the billing service. It does not send the email.</p>
<p>A CDC connector (Debezium) listens directly to the low-level PostgreSQL Write-Ahead Log (WAL). When it detects the actual disk commit of the new user, it automatically rips that event and pushes it onto a Kafka topic. A separate microservice consumes that topic and triggers the billing workflow safely, with guaranteed at-least-once delivery boundaries. The database itself becomes the singular source of truth for all distributed events.</p>`,
    date: '2025-11-22',
    readTime: '8 min read',
    author: 'Ancel Ajanga',
    category: 'Microservices',
    image: '/images/projects/nestfi.png',
    tags: ['Kafka', 'Architecture', 'Event-Driven']
  }
];

data.posts.unshift(...newPosts);

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Successfully injected 10 authority articles into the developer journal.');
