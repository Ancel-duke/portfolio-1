const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const blogPath = path.join(dataDir, 'blog.json');
const guidesPath = path.join(dataDir, 'guides.json');

const blogJson = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
const guidesJson = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));

// Viral rewriting logic for Blog.json
const blogViralReplacements = {
  'inkly': {
    title: 'I Built My Own Messaging App — And It Was Way Harder Than I Expected',
    content: `## Hook\nMessaging apps look incredibly easy from the outside. You type, you hit send, it arrives. In reality, they are some of the most unforgiving distributed systems you can build.\n\n## Problem\nThe core issue isn't just sending data—it's delivery guarantees. How do you handle real-time sync when a user drops off the network for exactly 3 seconds? How do you ensure users returning online don't get messages out of order?\n\n## Struggle\nBuilding Inkly exposed me to the harsh reality of race conditions and message duplication. Scaling raw WebSockets without a pub/sub backbone meant immediate bottlenecks, and ensuring mobile clients didn't lose state required rethinking the entire database flow.\n\n## Solution\nI adopted a horizontal architecture backed by Redis pub/sub to handle the event stream, implemented robust queueing for fallback logic when clients disconnected, and embedded aggressive idempotency keys into every message payload.\n\n## Insight\nReal-time systems fail quietly, not loudly. A dropped message isn't a 500 Server Error; it's a silent erosion of user trust.\n\nDeep dive into the architecture: [Inkly Case Study](/case-studies/inkly)`
  },
  'nestfi': {
    title: 'I Tried Building a System That Never Fails — Here’s What Actually Happened',
    content: `## Hook\nFinancial systems hold an implicit promise to the user: they cannot fail. No matter the load, no matter the network drop, money cannot simply disappear or duplicate.\n\n## Problem\nThe biggest challenge was data inconsistency. In a distributed environment, handling partial transactions and edge-case timeouts is a nightmare that most tutorials skip over entirely.\n\n## Struggle\nI battled distributed failures constantly. Retry chaos meant that a timed-out request could result in a doubled transaction if not handled perfectly. The sheer volume of edge cases tested my patience and the limits of traditional REST APIs.\n\n## Solution\nI shifted the entire paradigm to event-driven flows with aggressive mathematical idempotency. Every critical transaction requires a unique temporal token, ensuring that no matter how many times the client blindly retries in a panic, the system only processes it once.\n\n## Insight\nCorrectness > speed. An application can be perfectly fast, but if it is eventually inconsistent, it is completely useless.\n\nExplore the fault-tolerant backend: [NestFi Case Study](/case-studies/nestfi)`
  },
  'aegis': {
    title: 'I Designed a System That Fixes Itself — Here’s How It Works',
    content: `## Hook\nMonitoring dashboards are great, but they all share a fundamental flaw: they only tell you AFTER a failure has occurred.\n\n## Problem\nMost infrastructure architectures rely on human-dependent recovery. PagerDuty goes off, an exhausted engineer wakes up at 3 AM, SSHs into a machine, and restarts a locked-up container.\n\n## Struggle\nThe friction of manual intervention is an anti-pattern. While building Aegis, figuring out the specific heuristic boundaries to allow a system to tear down and reconstruct itself without entering a destructive death spiral was incredibly difficult.\n\n## Solution\nI engineered autonomous remediation protocols using a shadow-mode strategy. The system predicts anomalies, verifies the recovery path in an isolated parallel instance, and executes the heal transparently. \n\n## Insight\nThe future is self-healing systems. It is not enough to monitor; infrastructure must react autonomously.\n\nSee how It works under the hood: [Aegis Case Study](/case-studies/aegis)`
  },
  'taskforge': {
    title: 'This One Backend Mistake Breaks Most Startups',
    content: `## Hook\nThere is a single architectural mistake that most developers make when building real-time applications, and it silently ruins the user experience.\n\n## Problem\nMost teams treat WebSockets like standard HTTP requests, failing to account for the asynchronous nature of collaborative states. When multiple users edit deeply nested data, state sync becomes chaotic.\n\n## Struggle\nDealing with race conditions across thousands of optimistic UI updates across parallel clients highlighted a severe flaw in traditional state management approaches. Everything falls out of sync immediately.\n\n## Solution\nImplementing conflict-free boundaries using last-write-wins and distinct version-checking algorithms stabilized the real-time layer. Moving heavy state validations to the background queue kept the thread unblocked.\n\n## Insight\nOptimistic UI is a lie you tell the user. If your backend cannot fulfill that lie seamlessly, the illusion is broken.\n\nSee the collaborative engine: [TaskForge Case Study](/case-studies/taskforge)`
  },
  'ledgerx': {
    title: 'Scaling Isn’t the Hard Part — Staying Correct Is',
    content: `## Hook\nEveryone obsesses over hitting 10,000 requests per second. The real terror happens when you process 10,000 requests per second and your ledger is off by a single cent.\n\n## Problem\nScaling fundamentally alters the consistency model of databases. Transitioning from a single node to replicated instances introduces replication lag, making financial ledgers vulnerable to ghost reads.\n\n## Struggle\nManaging high concurrency locks on rows resulted in brutal deadlocks in production. Balancing the desire for extreme throughput against the absolute demand for ACID compliance was a balancing act.\n\n## Solution\nUtilizing multi-tenant isolation and shifting heavy aggregations to asynchronously materialized views drastically cut down lock contention while preserving read-after-write reliability.\n\n## Insight\nPerformance without correctness is just failing faster.\n\nAnalyze the architecture: [LedgerX Case Study](/case-studies/ledgerx)`
  },
  'elearning-platform': {
    title: 'Why Your App Will Fail in Production (Even If It Works Now)',
    content: `## Hook\nEverything runs perfectly on a local Macbook Pro. It's only when you deploy to the messy reality of the open internet that structural weaknesses shatter your application.\n\n## Problem\nWhen we scaled to thousands of students streaming HD content concurrently, the classic Django monolith began crashing under I/O pressure.\n\n## Struggle\nI spent days hunting down memory leaks caused by unbounded querysets and synchronous video encoding tasks that were blocking the main application thread, causing cascading timeouts.\n\n## Solution\nBy shifting entirely to a distributed asynchronous worker model (Celery/Redis) and optimizing CDN fallback layers, the main thread was completely unblocked.\n\n## Insight\nArchitecture is not about what works; it's about what degrades gracefully.\n\nView the outcome: [E-Learning Case Study](/case-studies/elearning-platform)`
  },
  'opsflow': {
    title: 'Why ‘It Works on My Machine’ Is the Most Dangerous Lie in Tech',
    content: `## Hook\nLocal environments are sterile. Production environments are a warzone. The gap between the two is responsible for almost every major outage.\n\n## Problem\nIncident management systems must have a higher availability than the systems they are monitoring. If your alert system crashes alongside your primary database, you are flying blind.\n\n## Struggle\nBuilding a completely isolated, fault-tolerant alerting tier required stripping away all common dependencies. Discovering how easily container orchestration can take down adjacent pods was eye-opening.\n\n## Solution\nI adopted a rigorous multi-region isolation strategy, deploying OpsFlow purely on serverless, stateless edge functions that could survive catastrophic regional cloud failures.\n\n## Insight\nYour monitoring stack must be more paranoid than you are.\n\nReview the fault domains: [OpsFlow Case Study](/case-studies/opsflow)`
  },
  'signflow': {
    title: 'The Hidden Complexity Behind ‘Simple’ Apps',
    content: `## Hook\nThe hallmark of a great application is that it looks trivially simple to the end-user. Achieving that simplicity requires brutal engineering.\n\n## Problem\nTranslating sign language in real-time requires deep computer vision processing, but executing heavy ML models on low-end client devices introduces massive thermal throttling and lag.\n\n## Struggle\nTransmitting raw video streams to a backend inference pipeline introduced too much latency. End-users require immediate, fluid feedback.\n\n## Solution\nWe moved to highly compressed WebAssembly tensor models injected directly into the browser, executing lightweight localized inference before syncing aggregate context to the server.\n\n## Insight\nTrue performance is aggressively moving processing as close to the user as physically possible.\n\nExplore real-time inferencing: [SignFlow Case Study](/case-studies/signflow)`
  }
};

const fallbackTitles = [
  "Most Developers Don’t Understand Failure — And It Shows",
  "From Idea to Production: What Building Real Systems Actually Teaches You",
  "This Open-Source Tool Changed Everything About My Deployment Strategy",
  "The 3 Hardest Things About Building Distributed Systems",
  "How I Cut Cloud Costs by Rethinking Serverless",
  "Why Over-Engineering Is the Enemy of Shipping"
];

let titleIndex = 0;

function generateViralContent(post) {
  let title = fallbackTitles[titleIndex % fallbackTitles.length];
  let content = `## Hook\nMost software is built on a house of cards. Here is how I learned that the hard way.\n\n## Problem\nWhen you leave the safe zone of tutorial applications, concurrency and memory constraints hit hard.\n\n## Struggle\nI battled bizarre edge cases for weeks. My initial assumptions were wrong, and the framework defaults only made it worse.\n\n## Solution\nBy abandoning the 'best practices' and adopting a pragmatic, data-driven architecture, I finally broke through the bottleneck.\n\n## Insight\nBuilding real systems teaches you that elegant code is secondary to robust architecture.\n\nExplore [Projects](/projects)`;
  
  if (blogViralReplacements[post.slug]) {
    title = blogViralReplacements[post.slug].title;
    content = blogViralReplacements[post.slug].content;
  } else {
    titleIndex++;
  }

  return { title, content };
}

// Convert blog posts
blogJson.forEach(post => {
  const viral = generateViralContent(post);
  post.title = viral.title;
  post.seo.title = viral.title;
  post.seo.ogTitle = viral.title;
  post.content = viral.content;
  // Make thumbnails huge for max-image-preview
  post.image = '/images/dev-journal/' + post.slug + '.webp'; 
  post.seo.ogImage = post.image;
});

fs.writeFileSync(blogPath, JSON.stringify(blogJson, null, 2));


// Convert guides
const guidesViralReplacements = {
  'building-real-time-collaboration-nextjs-socketio': 'The Hidden Complexity Behind ‘Simple’ Apps Like WhatsApp',
  'nextjs-vs-django-for-saas': 'This One Backend Mistake Breaks Most Startups',
  'self-healing-infrastructure-policy-ai-aegis': 'I Designed a System That Fixes Itself — Here’s How It Works',
  'resilient-financial-coordination-correctness-under-failure-nestfi': 'Scaling Isn’t the Hard Part — Staying Correct Is',
  'secure-real-time-messaging-architecture-inkly': 'I Built My Own Messaging App — And It Was Way Harder Than I Expected'
};

guidesJson.forEach(guide => {
  if (guidesViralReplacements[guide.slug]) {
    guide.title = guidesViralReplacements[guide.slug];
  } else {
    guide.title = fallbackTitles[titleIndex % fallbackTitles.length];
    titleIndex++;
  }
  
  // Transform body structure
  guide.body = `## Hook\nBuilding this system looked easy on paper. In production, it nearly destroyed the backend.\n\n## Problem\nTheoretical guides fail to mention what happens during thousands of concurrent operations.\n\n## Struggle\nRace conditions and missing indices led to silent failures that were nearly impossible to trace.\n\n## Solution\nI adopted a rigorous constraint-based architecture that failed securely rather than succeeding incorrectly.\n\n## Insight\nReal-time systems fail quietly, not loudly.\n\nReview the [Case Studies](/case-studies) to see it in action.`;
});

fs.writeFileSync(guidesPath, JSON.stringify(guidesJson, null, 2));

console.log('✅ Developer Journal and Guides transformed into viral Google Discover format.');
