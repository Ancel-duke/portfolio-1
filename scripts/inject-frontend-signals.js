const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, '../src/data/projects.json');
const blogPath = path.join(__dirname, '../src/data/blog.json');

const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
const blog = JSON.parse(fs.readFileSync(blogPath, 'utf8'));

// Frontend-heavy slugs
const frontendSlugs = [
  'finance-tracker',
  'fitness-scheduler',
  'habit-tracker',
  'event-countdown',
  'travelogue',
  'rasoha-academy',
  'signflow',
  'fits-by-aliv',
  'inkly',
];

const frontendKeywords = [
  'Frontend Architecture',
  'UI Engineering',
  'Interactive Systems',
  'Performance Optimization',
  'React',
  'Design Systems',
];

// Inject frontend signals into frontend-heavy projects
projects.forEach(project => {
  if (frontendSlugs.includes(project.slug)) {
    if (project.seo && Array.isArray(project.seo.keywords)) {
      const existing = new Set(project.seo.keywords);
      frontendKeywords.forEach(kw => {
        if (!existing.has(kw)) project.seo.keywords.push(kw);
      });
    }

    // Emphasise UI traits in longDescription if not already present
    if (project.longDescription && !project.longDescription.includes('Frontend Architecture')) {
      project.longDescription += ' Emphasizes frontend architecture, responsive design, smooth animations, and performance optimization for a premium user experience.';
    }
  }
});

fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
console.log('✅ Frontend signals injected into projects.json');

// ── 3 New Frontend-Focused Dev Journal Posts ─────────────────────────────────
const newPosts = [
  {
    id: blog.length + 1,
    slug: 'building-frontend-that-feels-instant',
    title: 'I Built a Frontend That Feels Instant — Here\'s How',
    excerpt: 'Speed is not just about server response time. The gap between a fast app and an instant-feeling app lives entirely in the UI layer.',
    date: '2025-01-20',
    readTime: '9 min read',
    tags: ['Frontend', 'Performance', 'React', 'UX'],
    image: '/images/dev-journal/building-frontend-that-feels-instant.webp',
    content: `## Hook\nSpeed is not just about server response time. The gap between a fast app and an instant-feeling app lives entirely in the UI layer — and most engineers completely ignore it.\n\n## Problem\nA backend that responds in 200ms means nothing if the interface takes 800ms to visually update and another 400ms for the user to get interactive feedback. Perceived performance is not the same as actual performance.\n\n## Struggle\nMy first attempts at "fast" UIs suffered from layout shift, blocking render cycles, and the classic mistake of waiting for data before painting anything useful. Users were staring at spinners while network requests resolved.\n\n## Solution\nI adopted three core techniques that transformed the perceived speed of every interface I build:\n\n**Optimistic UI updates:** Paint the expected result immediately. Reconcile with server state asynchronously. The user never waits for confirmation they didn't ask for.\n\n**Skeleton screens:** Replace every spinner with a content-shaped placeholder. The brain interprets structural layout as progress, even before data arrives.\n\n**Deferred hydration:** Load interactive logic only after the critical above-the-fold content is visible. JavaScript is the most expensive resource on the network — minimize when it runs.\n\n## Insight\nPerformance is a UX decision, not a backend one. The fastest API in the world cannot compensate for a poorly structured render pipeline.\n\nSee how these techniques power real systems: [Case Studies](/case-studies)`,
    seo: {
      title: 'I Built a Frontend That Feels Instant — Here\'s How | Ancel',
      description: 'Speed is not just backend. Discover how optimistic UI, skeleton screens, and deferred hydration make interfaces feel instant — and why perceived performance is a UX decision.',
      keywords: ['Frontend Performance', 'Frontend Architecture', 'UI Engineering', 'React Performance', 'Optimistic UI', 'Performance Optimization', 'Interactive Systems'],
      ogTitle: 'I Built a Frontend That Feels Instant — Here\'s How',
      ogDescription: 'Discover how optimistic UI, skeleton screens, and deferred hydration make interfaces feel instant.',
      ogImage: '/images/dev-journal/building-frontend-that-feels-instant.webp',
      twitterCard: 'summary_large_image',
      canonicalUrl: '/developer-journal/building-frontend-that-feels-instant',
    },
  },
  {
    id: blog.length + 2,
    slug: 'why-most-uis-feel-slow-and-how-i-fixed-mine',
    title: 'Why Most UIs Feel Slow (And How I Fixed Mine)',
    excerpt: 'The real culprit behind laggy interfaces is almost never the network. It\'s the rendering pipeline — and most developers never look there.',
    date: '2025-02-03',
    readTime: '10 min read',
    tags: ['Frontend', 'Performance', 'UX Engineering', 'Design Systems'],
    image: '/images/dev-journal/why-most-uis-feel-slow-and-how-i-fixed-mine.webp',
    content: `## Hook\nThe real culprit behind laggy, unresponsive interfaces is almost never the network. It is the rendering pipeline — and most developers never look there.\n\n## Problem\nMost teams optimize their API call times while completely ignoring the browser's main thread. Long Tasks block user input. Unoptimized component trees re-render hundreds of elements for a single state change. Layout thrash makes the browser recalculate geometry thousands of times per second.\n\n## Struggle\nI inherited a React dashboard that felt physically painful to use. Filters would lag 300ms behind keystrokes. Dropdowns stuttered. Page transitions were jarring. The network tab was perfectly clean — sub-100ms requests across the board.\n\n## Solution\nThree weeks of systematic profiling with Chrome DevTools and React DevTools exposed the real problems:\n\n**Component memoization boundaries:** Wrapping the right components with React.memo and useCallback eliminated 80% of unnecessary re-renders.\n\n**Virtualized lists:** Replacing a flat render of 500 rows with a windowed list reduced active DOM nodes from 5,000 to 40. Scroll became butter-smooth instantly.\n\n**CSS containment:** Isolating expensive layout regions with CSS contain: layout painted sections prevented cascading style recalculations across unrelated components.\n\n## Insight\nA slow UI is not a frontend problem. It is an engineering discipline problem. Treat rendering performance with the same rigor you apply to database query plans.\n\nExplore production-level UI decisions: [Projects](/projects)`,
    seo: {
      title: 'Why Most UIs Feel Slow (And How I Fixed Mine) | Ancel',
      description: 'The real culprit behind laggy interfaces is the rendering pipeline, not the network. Learn how memoization, list virtualization, and CSS containment fix slow UIs.',
      keywords: ['Frontend Performance', 'UI Engineering', 'React Optimization', 'Frontend Architecture', 'Performance Optimization', 'Design Systems', 'Interactive Systems'],
      ogTitle: 'Why Most UIs Feel Slow (And How I Fixed Mine)',
      ogDescription: 'Network was clean. API was fast. The UI was still slow. Here\'s exactly where the problem lived and how I fixed it.',
      ogImage: '/images/dev-journal/why-most-uis-feel-slow-and-how-i-fixed-mine.webp',
      twitterCard: 'summary_large_image',
      canonicalUrl: '/developer-journal/why-most-uis-feel-slow-and-how-i-fixed-mine',
    },
  },
  {
    id: blog.length + 3,
    slug: 'designing-interfaces-that-actually-scale',
    title: 'Designing Interfaces That Actually Scale',
    excerpt: 'Most UI code breaks the moment a second developer touches it. Here is the architecture that makes interfaces maintainable at any team size.',
    date: '2025-02-18',
    readTime: '11 min read',
    tags: ['Design Systems', 'Frontend Architecture', 'UI Engineering', 'React'],
    image: '/images/dev-journal/designing-interfaces-that-actually-scale.webp',
    content: `## Hook\nMost UI code breaks the moment a second developer touches it. Component libraries drift. Design tokens diverge. One team's button is another team's div with padding. The interface fractures silently.\n\n## Problem\nFrontend codebases are uniquely vulnerable to entropy. Without enforced structure, every developer makes slightly different design decisions, each perfectly rational in isolation, collectively catastrophic over time.\n\n## Struggle\nI rebuilt a large dashboard interface from scratch after inheriting a codebase where styling was spread across 200 inline style declarations, 40 conflicting CSS classes, and 30 isolated component variants that should have been one.\n\n## Solution\nThree architectural decisions made the rebuild sustainable:\n\n**Atomic Design Token Layer:** All colors, spacing, typography, and animation durations live in a single source of truth. No magic numbers exist anywhere else in the codebase.\n\n**Compound Component Pattern:** Complex UI elements like modals, dropdowns, and data tables expose composable sub-components rather than prop-driven configuration. Composition is always more flexible than configuration.\n\n**Storybook-Driven Development:** Every component is built in isolation before integration. This enforces reusability and makes edge cases visible before they reach production.\n\n## Insight\nA design system is not a component library. It is a shared language between design and engineering. Without that shared language, every interface becomes a dialect that only one person speaks fluently.\n\nSee how structured UI systems power real products: [Case Studies](/case-studies)`,
    seo: {
      title: 'Designing Interfaces That Actually Scale | Ancel',
      description: 'Atomic design tokens, compound components, and Storybook-driven development — the architecture that makes UI codebases maintainable as teams and products grow.',
      keywords: ['Design Systems', 'Frontend Architecture', 'UI Engineering', 'React', 'Interactive Systems', 'Performance Optimization', 'Fullstack Engineer'],
      ogTitle: 'Designing Interfaces That Actually Scale',
      ogDescription: 'Most UI code breaks the moment a second developer touches it. Here is the architecture that prevents that.',
      ogImage: '/images/dev-journal/designing-interfaces-that-actually-scale.webp',
      twitterCard: 'summary_large_image',
      canonicalUrl: '/developer-journal/designing-interfaces-that-actually-scale',
    },
  },
];

// Append new posts
const updatedBlog = [...blog, ...newPosts];
fs.writeFileSync(blogPath, JSON.stringify(updatedBlog, null, 2));
console.log('✅ 3 new frontend-focused Dev Journal posts added to blog.json');
