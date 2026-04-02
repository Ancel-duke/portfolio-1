const fs = require('fs');
const path = require('path');

const blogPath = path.join(__dirname, '../src/data/blog.json');
const blog = JSON.parse(fs.readFileSync(blogPath, 'utf8'));

// ─── Date ranges ─────────────────────────────────────────────────────────────
// beginner  : 2024-03-01 → 2024-09-30
// intermediate: 2024-10-01 → 2025-03-31
// advanced  : 2025-03-01 → 2026-04-02

// Image mapping – keyed by slug fragment (substring match)
const imageMap = {
  'building-taskforge': '/images/dev-journal/taskforge.webp',
  'scaling-an-e-learning': '/images/dev-journal/e-learning.webp',
  'why-i-built-a-finance-tracker': '/images/dev-journal/finance-tracker.webp',
  'angular-20': '/images/dev-journal/fitness.webp',
  'from-student-to-freelancer': '/images/dev-journal/rasoha.webp',
  'how-travelogue': '/images/dev-journal/travelogue.webp',
  'designing-a-console-banking': '/images/dev-journal/ledgerx.webp',
  'building-educhain': '/images/dev-journal/educhain.webp',
  'ledgerx-secure': '/images/dev-journal/ledgerx.webp',
  'building-opsflow': '/images/dev-journal/opsflow.webp',
  'building-signflow': '/images/dev-journal/signflow.webp',
  'aegis-zero-knowledge': '/images/dev-journal/aegis.webp',
  'nestfi-resilient': '/images/dev-journal/nestfi.webp',
  'fits-by-aliv': '/images/dev-journal/fits.webp',
  'inkly-architecting': '/images/dev-journal/inkly.webp',
  'building-frontend-that-feels-instant': '/images/dev-journal/building-frontend-that-feels-instant.webp',
  'why-most-uis-feel-slow': '/images/dev-journal/why-most-uis-feel-slow-and-how-i-fixed-mine.webp',
  'designing-interfaces-that-actually-scale': '/images/dev-journal/designing-interfaces-that-actually-scale.webp',
};

// Assign dates evenly across ranges
function spreadDates(posts, startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const n = posts.length;
  return posts.map((post, i) => {
    const t = n === 1 ? start : start + (i * (end - start)) / (n - 1);
    const d = new Date(t);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return { ...post, date: `${yyyy}-${mm}-${dd}` };
  });
}

// Fix level for the 3 new frontend posts (previously undefined)
blog.forEach(post => {
  if (!post.level) {
    post.level = 'intermediate';
  }
});

// Bucket by level
const beginnerPosts = blog.filter(p => p.level === 'beginner');
const intermediatePosts = blog.filter(p => p.level === 'intermediate');
const advancedPosts = blog.filter(p => p.level === 'advanced');

// Re-date each bucket
const datedBeginners = spreadDates(beginnerPosts, '2024-03-05', '2024-09-25');
const datedIntermediate = spreadDates(intermediatePosts, '2024-10-03', '2025-03-28');
const datedAdvanced = spreadDates(advancedPosts, '2025-03-15', '2026-04-02');

// Merge back, preserving original order by rebuilding the array
const lookup = {};
[...datedBeginners, ...datedIntermediate, ...datedAdvanced].forEach(p => {
  lookup[p.slug || p.id] = p;
});

const updated = blog.map(post => {
  const key = post.slug || post.id;
  const dated = lookup[key] || post;

  // Assign correct image
  let image = post.image;
  const slug = post.slug || '';
  for (const [fragment, imgPath] of Object.entries(imageMap)) {
    if (slug.includes(fragment)) {
      image = imgPath;
      break;
    }
  }

  return { ...dated, image };
});

fs.writeFileSync(blogPath, JSON.stringify(updated, null, 2));

// Report
console.log('\n📅 Date + image audit:');
updated.forEach(p => {
  console.log(`[${p.level}] ${p.date} | ${p.slug} | ${p.image}`);
});
console.log('\n✅ blog.json updated — dates spread and images assigned.');
