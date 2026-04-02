const fs = require('fs');
const path = require('path');

const srcDataPath = path.join(__dirname, '../src/data');

const getTechHighlights = (item) => {
  let techHighlights = '';
  if (item.technologies && Array.isArray(item.technologies)) {
    const techNames = item.technologies.slice(0, 4).map(t => typeof t === 'string' ? t : t.name);
    techHighlights = techNames.join(', ');
  } else if (item.tags && Array.isArray(item.tags)) {
    const techNames = item.tags.slice(0, 4);
    techHighlights = techNames.join(', ');
  }
  return techHighlights || 'modern web technologies';
};

const getCategory = (item) => {
  if (item.applicationCategory) return item.applicationCategory;
  if (item.type === 'frontend') return 'frontend application';
  if (item.type === 'fullstack') return 'full-stack application';
  return 'platform';
};

const getKeywords = (item) => {
  const shortName = item.title.split('-')[0].split('—')[0].trim();
  const kw = [
    shortName,
    `${shortName} app`,
    `${shortName} platform`,
    'Ancel',
    'Ancel portfolio',
    'software engineer Ancel',
    'Ancel Ajanga'
  ];
  if (item.technologies && Array.isArray(item.technologies)) {
    kw.push(...item.technologies.map(t => typeof t === 'string' ? t : t.name));
  }
  if (item.tags && Array.isArray(item.tags)) {
    kw.push(...item.tags);
  }
  return Array.from(new Set(kw));
};

const getFeatures = (item) => {
  if (item.featureList && Array.isArray(item.featureList)) return item.featureList.slice(0, 3).join(', ').toLowerCase();
  if (item.features && Array.isArray(item.features)) return item.features.slice(0, 3).join(', ').toLowerCase();
  return 'real-time, robust capabilities, and excellent performance';
};

function generateSeo(item, section) {
  const titleSplit = item.title.split('-');
  const titleSplit2 = item.title.split('—');
  let shortName = titleSplit[0].trim();
  let primaryFunction = titleSplit.slice(1).join('-').trim() || "";
  
  if (titleSplit2.length > 1 && titleSplit2[0].length < titleSplit[0].length) {
    shortName = titleSplit2[0].trim();
    primaryFunction = titleSplit2.slice(1).join('—').trim();
  }

  if (!primaryFunction && item.subtitle) {
    primaryFunction = item.subtitle;
  }
  
  if (!primaryFunction) {
    primaryFunction = "Software Application";
  }

  // Capitalize primary Function
  primaryFunction = primaryFunction.replace(/^([a-z])/, (match) => match.toUpperCase());

  const seoTitle = `${shortName} — Built by Ancel | ${primaryFunction}`;
  
  const techHighlights = getTechHighlights(item);
  const category = getCategory(item);
  const features = getFeatures(item);
  const seoDesc = `${shortName} is a ${category} built by Ancel featuring ${features}. Designed with ${techHighlights}.`;
  
  const imageFileName = (item.slug === 'fits-by-aliv' || shortName.toLowerCase() === 'fits by aliv') ? 'fits.webp' : `${item.slug || item.id}.webp`;
  const imagePath = `/images/${section}/${imageFileName}`;
  
  const canonicalBase = section === 'projects' ? 'projects' : section === 'case-studies' ? 'case-studies' : 'developer-journal';

  return {
    title: seoTitle,
    description: seoDesc.substring(0, 160), // standard length
    keywords: getKeywords(item).slice(0, 10),
    ogTitle: seoTitle,
    ogDescription: seoDesc.substring(0, 160),
    ogImage: imagePath,
    twitterCard: "summary_large_image",
    canonicalUrl: `/${canonicalBase}/${item.slug}`
  };
}

function processProjects() {
  const file = path.join(srcDataPath, 'projects.json');
  const items = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  items.forEach(item => {
    const imageFileName = (item.slug === 'fits-by-aliv' || item.title.toLowerCase().includes('fits by aliv')) ? 'fits.webp' : `${item.slug}.webp`;
    item.image = `/images/projects/${imageFileName}`;
    item.seo = generateSeo(item, 'projects');
  });

  fs.writeFileSync(file, JSON.stringify(items, null, 2) + '\n');
  console.log('projects.json updated');
}

function processCaseStudies() {
  const file = path.join(srcDataPath, 'case-studies.json');
  const items = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  items.forEach(item => {
    const slug = item.slug || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    item.slug = slug;
    const imageFileName = (item.slug === 'fits-by-aliv' || item.title.toLowerCase().includes('fits by aliv')) ? 'fits.webp' : `${item.slug}.webp`;
    item.image = `/images/case-studies/${imageFileName}`;
    
    if (item.images) {
      if (item.images.hero) item.images.hero = item.image;
      if (item.images.before) item.images.before = item.image;
      if (item.images.after) item.images.after = item.image;
      if (item.images.gallery && item.images.gallery.length > 0) {
        item.images.gallery = item.images.gallery.map(() => item.image);
      }
    }
    
    item.seo = generateSeo(item, 'case-studies');
  });

  fs.writeFileSync(file, JSON.stringify(items, null, 2) + '\n');
  console.log('case-studies.json updated');
}

function processBlog() {
  const file = path.join(srcDataPath, 'blog.json');
  const items = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  items.forEach(item => {
    // Generate slug from title since blog posts might lack a dedicated slug prop in json
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    item.slug = slug; // Add slug so seo generator can use it
    
    const imageFileName = `${slug}.webp`;
    item.image = `/images/dev-journal/${imageFileName}`;
    
    item.seo = generateSeo(item, 'dev-journal');
  });

  fs.writeFileSync(file, JSON.stringify(items, null, 2) + '\n');
  console.log('blog.json updated');
}

processProjects();
processCaseStudies();
processBlog();
