const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/guides.json');
const guides = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const inklyGuide = {
  title: "Building a Secure, Horizontally Scalable Real-Time Messaging Platform with Inkly",
  slug: "secure-real-time-messaging-architecture-inkly",
  summary: "How to guarantee privacy, scale WebSockets horizontally, and maintain real-time sync when networks fail using Sacred Bond Encryption, CRDT notebooks, and Redis pub/sub. Lessons from Inkly.",
  tech_stack: [
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "WebSockets",
    "Flutter",
    "Riverpod",
    "TypeScript"
  ],
  problem: "Real-time systems degrade under heavy traffic, and building secure messaging often compromises user experience. Collaboration features like shared notebooks introduce high conflict-resolution complexity, and maintaining real-time sync reliably when networks drop is notoriously hard.",
  architecture: "A hybrid architecture utilizing MongoDB for document storage, PostgreSQL for relational data, and Redis for distributed rate limits and horizontal WebSocket scaling via pub/sub. The backend leverages Node.js, Express, and ws for connections. The client is built in Flutter using Riverpod, integrating robust cryptography (HKDF, X25519, AES-256-GCM) to ensure bonds and data are secured end-to-end. Sacred Bond Encryption guarantees the server only stores wrapped secrets.",
  measurable_outcome: "Inkly achieves secure and private messaging with Conflict-free Replicated Data Types (CRDTs) for seamless merging of collaborative notebook edits. It utilizes Opossum-based circuit breakers and hybrid realtime recovery to remain resilient even under degraded network conditions or Redis unavailability.",
  related_topics: [
    "real-time-systems",
    "full-stack-systems-design",
    "zero-trust-infrastructure",
    "nodejs-backend"
  ],
  related_case_studies: [
    "inkly",
    "taskforge"
  ],
  template_type: "technology_deep_dive",
  date: "2026-03-10",
  readTime: "10 min read",
  body: "Inkly is a real-time messaging platform built to handle secure communication and seamless collaboration without compromising on performance or reliability. This guide explains how we built a system that guarantees privacy, scales WebSockets, and survives network failure.\n\n**Sacred Bond End-to-End Encryption**\n\nThe core of Inkly's privacy model is what we call Sacred Bond Encryption. The client derives a bond key using HKDF and X25519, ensuring the server only stores wrapped secrets. Communication occurs via AES-256-GCM, meaning the server facilitates message passing but has zero knowledge of the actual payload. This guarantees complete privacy for users while maintaining high performance since the server acts predominantly as a smart router rather than a decryption bottleneck.\n\n**Horizontally Scaling WebSockets**\n\nReal-time systems often fail to scale because WebSocket connections are stateful. To solve this, Inkly uses Redis for both distributed rate limiting and as a pub/sub backbone. The backend is built on Node.js and Express using the `ws` library. When a message is sent, the handling backend node publishes it to Redis. Any other node holding a connected WebSocket for the recipient subscribes and pushes the message to the client. This decouples connection handling from message distribution, allowing the WebSocket tier to scale horizontally by simply adding more Node.js instances.\n\n**CRDT Notebooks for Collaboration**\n\nTo solve the conflict-resolution complexity in shared notebooks, Inkly implements Conflict-free Replicated Data Types (CRDTs). Instead of dealing with operational transformation or server-side locks, clients can make edits locally. These edits are merged seamlessly when broadcasted, ensuring all users eventually reach the exact same state without data loss or blocking.\n\n**Resilience and Failure Modes**\n\nNetworks fail, and mobile clients drop connections. Inkly employs a hybrid architecture for recovery. Instead of continuous heavy polling, it uses WebSocket-first detection paired with an exponential backoff offline queue. If a client disconnects, events are queued and automatically synced upon reconnection. On the backend, Opossum-based circuit breakers isolate critical paths from non-critical loads. If Redis becomes unavailable, the system safely drops the WebSocket tier to a degraded mode, protecting core stateless REST endpoints from failing in cascade.\n\n**When to choose this architecture**\n\nThis pattern fits applications demanding strict data privacy, offline-first client architecture, and horizontal scale. It is more complex than a standard CRUD API to implement, but crucial for ensuring real-time features like messaging and collaborative editing don't break under load or network drops. For more insights on building similar distributed communication architectures, explore the TaskForge case study."
};

// Insert at the end or replace based on slug
const index = guides.findIndex(g => g.slug === inklyGuide.slug);
if (index >= 0) {
  guides[index] = inklyGuide;
} else {
  guides.push(inklyGuide);
}

fs.writeFileSync(filePath, JSON.stringify(guides, null, 2) + "\n", 'utf8');
console.log('Successfully added Inkly guide to guides.json');
