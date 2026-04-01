const fs = require('fs');
const path = require('path');

// SEO Validation Script
const validateSEO = () => {
  console.log('🔍 Starting SEO validation...\n');

  const errors = [];
  const warnings = [];
  const successes = [];

  // Check if sitemap.xml exists
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // Validate sitemap structure
    if (sitemapContent.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      successes.push('✅ Sitemap.xml has proper XML declaration');
    } else {
      errors.push('❌ Sitemap.xml missing XML declaration');
    }

    if (sitemapContent.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
      successes.push('✅ Sitemap.xml has proper namespace');
    } else {
      errors.push('❌ Sitemap.xml missing proper namespace');
    }

    // Count URLs
    const urlCount = (sitemapContent.match(/<url>/g) || []).length;
    successes.push(`✅ Sitemap.xml contains ${urlCount} URLs`);

    // Check for required pages
    const requiredPages = [
  { path: '/', url: 'https://ancel.co.ke' },
  { path: '/about', url: 'https://ancel.co.ke/about' },
  { path: '/case-studies', url: 'https://ancel.co.ke/case-studies' },
  { path: '/blog', url: 'https://ancel.co.ke/blog' },
  { path: '/contact', url: 'https://ancel.co.ke/contact' }
    ];
    
    requiredPages.forEach(page => {
      if (sitemapContent.includes(`<loc>${page.url}</loc>`)) {
        successes.push(`✅ Required page ${page.path} found in sitemap`);
      } else {
        errors.push(`❌ Required page ${page.path} missing from sitemap`);
      }
    });
  } else {
    errors.push('❌ Sitemap.xml not found');
  }

  // Check if robots.txt exists
  const robotsPath = path.join(__dirname, '../public/robots.txt');
  if (fs.existsSync(robotsPath)) {
    const robotsContent = fs.readFileSync(robotsPath, 'utf8');
    
    if (robotsContent.includes('User-agent: *')) {
      successes.push('✅ Robots.txt allows all crawlers');
    } else {
      warnings.push('⚠️ Robots.txt may not allow all crawlers');
    }

    if (robotsContent.includes('Sitemap:')) {
      successes.push('✅ Robots.txt references sitemap');
    } else {
      errors.push('❌ Robots.txt missing sitemap reference');
    }

    // Check for AI crawler support
    const aiCrawlers = ['GPTBot', 'ChatGPT-User', 'CCBot', 'Claude-Web', 'Google-Extended'];
    aiCrawlers.forEach(crawler => {
      if (robotsContent.includes(`User-agent: ${crawler}`)) {
        successes.push(`✅ Robots.txt supports ${crawler}`);
      } else {
        warnings.push(`⚠️ Robots.txt may not support ${crawler}`);
      }
    });
  } else {
    errors.push('❌ Robots.txt not found');
  }

  // Check package.json for SEO scripts
  const packagePath = path.join(__dirname, '../package.json');
  if (fs.existsSync(packagePath)) {
    const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    if (packageContent.scripts && packageContent.scripts['generate-seo']) {
      successes.push('✅ SEO generation script found in package.json');
    } else {
      warnings.push('⚠️ SEO generation script not found in package.json');
    }
  }

  // Check for SEO components
  const seoComponents = [
    'src/domains/seo/components/SEOHead.tsx',
    'src/domains/seo/components/schemas.ts',
    'src/components/shared/ui/breadcrumb.tsx',
    'src/components/shared/ui/skip-link.tsx'
  ];

  seoComponents.forEach(component => {
    const componentPath = path.join(__dirname, '..', component);
    if (fs.existsSync(componentPath)) {
      successes.push(`✅ SEO component ${component} exists`);
    } else {
      errors.push(`❌ SEO component ${component} missing`);
    }
  });

  // Check for performance components
  const performanceComponents = [
    'src/domains/performance/components/WebVitals.tsx',
    'src/components/shared/ui/optimized-image.tsx',
    'src/components/shared/ui/lazy-section.tsx'
  ];

  performanceComponents.forEach(component => {
    const componentPath = path.join(__dirname, '..', component);
    if (fs.existsSync(componentPath)) {
      successes.push(`✅ Performance component ${component} exists`);
    } else {
      warnings.push(`⚠️ Performance component ${component} missing`);
    }
  });

  // Check App.tsx for SEO implementation
  const appPath = path.join(__dirname, '../src/App.tsx');
  if (fs.existsSync(appPath)) {
    const appContent = fs.readFileSync(appPath, 'utf8');
    
    if (appContent.includes('SEO') || appContent.includes('SEOHead')) {
      successes.push('✅ App.tsx uses SEO component');
    } else {
      errors.push('❌ App.tsx missing SEO implementation');
    }

    if (appContent.includes('SkipLink')) {
      successes.push('✅ App.tsx includes SkipLink for accessibility');
    } else {
      warnings.push('⚠️ App.tsx missing SkipLink for accessibility');
    }

    if (appContent.includes('Breadcrumb')) {
      successes.push('✅ App.tsx includes Breadcrumb navigation');
    } else {
      warnings.push('⚠️ App.tsx missing Breadcrumb navigation');
    }

    if (appContent.includes('role="main"')) {
      successes.push('✅ App.tsx has semantic main element');
    } else {
      warnings.push('⚠️ App.tsx missing semantic main element');
    }
  }

  // Check for JSON-LD schemas
  const schemasPath = path.join(__dirname, '../src/domains/seo/components/schemas.ts');
  if (fs.existsSync(schemasPath)) {
    const schemasContent = fs.readFileSync(schemasPath, 'utf8');
    
    const requiredSchemas = ['generatePersonSchema', 'generateProjectSchema', 'generateBlogPostSchema', 'generateCaseStudySchema'];
    requiredSchemas.forEach(schema => {
      if (schemasContent.includes(schema)) {
        successes.push(`✅ JSON-LD schema ${schema} exists`);
      } else {
        errors.push(`❌ JSON-LD schema ${schema} missing`);
      }
    });
  }

  // Print results
  console.log('📊 SEO Validation Results:\n');
  
  if (successes.length > 0) {
    console.log('✅ SUCCESSES:');
    successes.forEach(success => console.log(`   ${success}`));
    console.log('');
  }

  if (warnings.length > 0) {
    console.log('⚠️ WARNINGS:');
    warnings.forEach(warning => console.log(`   ${warning}`));
    console.log('');
  }

  if (errors.length > 0) {
    console.log('❌ ERRORS:');
    errors.forEach(error => console.log(`   ${error}`));
    console.log('');
  }

  // Summary
  const totalChecks = successes.length + warnings.length + errors.length;
  const successRate = ((successes.length / totalChecks) * 100).toFixed(1);
  
  console.log('📈 SUMMARY:');
  console.log(`   Total checks: ${totalChecks}`);
  console.log(`   Successes: ${successes.length}`);
  console.log(`   Warnings: ${warnings.length}`);
  console.log(`   Errors: ${errors.length}`);
  console.log(`   Success rate: ${successRate}%\n`);

  if (errors.length === 0) {
    console.log('🎉 SEO validation passed! Your portfolio is well-optimized for search engines and AI crawlers.');
  } else {
    console.log('⚠️ Please fix the errors above to ensure optimal SEO performance.');
  }

  // Return exit code
  return errors.length === 0 ? 0 : 1;
};

// Run validation
const exitCode = validateSEO();
process.exit(exitCode);
