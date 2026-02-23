/**
 * Validates programmatic SEO content: no thin pages (800+ words per guide),
 * no duplicate titles across guides/case-studies/blog, required fields present.
 * Run after adding or editing guides.json.
 */
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const MIN_WORDS = 800;

function loadJson(name) {
  const filePath = path.join(dataDir, name);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.warn('Warning: could not load', name, e.message);
    return null;
  }
}

function wordCount(text) {
  if (!text || typeof text !== 'string') return 0;
  return text.split(/\s+/).filter(Boolean).length;
}

function main() {
  const errors = [];
  const successes = [];

  const guides = loadJson('guides.json');
  const caseStudies = loadJson('case-studies.json');
  const blog = loadJson('blog.json');

  if (!Array.isArray(guides)) {
    errors.push('guides.json missing or not an array');
    console.log('❌ ERRORS:', errors.join('\n'));
    process.exit(1);
  }

  const requiredGuideFields = ['title', 'slug', 'summary', 'tech_stack', 'problem', 'architecture', 'measurable_outcome', 'related_topics', 'body', 'template_type'];
  const guideTitles = new Map(); // for duplicate check within guides only
  const warnings = [];

  // Guides: required fields + word count + duplicate titles within guides
  guides.forEach((g, i) => {
    for (const field of requiredGuideFields) {
      if (g[field] === undefined || g[field] === null) {
        errors.push(`guides[${i}] (${g.slug || 'no-slug'}): missing required field "${field}"`);
      }
    }
    const totalWords =
      wordCount(g.summary) +
      wordCount(g.problem) +
      wordCount(g.architecture) +
      wordCount(g.measurable_outcome) +
      wordCount(g.body);
    if (totalWords < MIN_WORDS) {
      errors.push(`guides[${i}] "${g.title}" (${g.slug}): word count ${totalWords} < ${MIN_WORDS} (thin content)`);
    } else {
      successes.push(`Guide "${g.title}" word count: ${totalWords} (≥ ${MIN_WORDS})`);
    }
    const normTitle = (g.title || '').trim().toLowerCase();
    if (normTitle && guideTitles.has(normTitle)) {
      errors.push(`Duplicate guide title: "${g.title}" (guides/${g.slug}) and ${guideTitles.get(normTitle).source}`);
    } else if (normTitle) {
      guideTitles.set(normTitle, { source: `guides/${g.slug}`, slug: g.slug });
    }
  });

  // Cross-source title check (warn only): guide vs case-studies/blog
  const caseStudyTitles = new Set(Array.isArray(caseStudies) ? caseStudies.map((cs) => (cs.title || '').trim().toLowerCase()).filter(Boolean) : []);
  const blogTitles = new Set(Array.isArray(blog) ? blog.map((p) => (p.title || '').trim().toLowerCase()).filter(Boolean) : []);
  guides.forEach((g) => {
    const norm = (g.title || '').trim().toLowerCase();
    if (caseStudyTitles.has(norm)) warnings.push(`Guide title matches a case study: "${g.title}" (consider differentiating)`);
    if (blogTitles.has(norm)) warnings.push(`Guide title matches a blog post: "${g.title}" (consider differentiating)`);
  });

  console.log('🔍 Programmatic SEO content validation\n');
  if (successes.length) {
    successes.forEach((s) => console.log('  ', s));
    console.log('');
  }
  if (warnings.length) {
    console.log('⚠️ WARNINGS:');
    warnings.forEach((w) => console.log('  ', w));
    console.log('');
  }
  if (errors.length) {
    console.log('❌ ERRORS:');
    errors.forEach((e) => console.log('  ', e));
    console.log('');
    process.exit(1);
  }
  console.log('✅ No thin content; no duplicate guide titles; required fields present.');
  process.exit(0);
}

main();
