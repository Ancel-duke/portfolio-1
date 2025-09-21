const fs = require('fs');
const path = require('path');

/**
 * Minify JSON-LD scripts in HTML files for production builds
 * This script finds all <script type="application/ld+json"> blocks
 * and minifies them to reduce HTML file size
 */

function minifyJsonLdInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Find all JSON-LD script blocks
    const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
    
    content = content.replace(jsonLdRegex, (match, jsonContent) => {
      try {
        // Parse and minify the JSON
        const parsed = JSON.parse(jsonContent.trim());
        const minified = JSON.stringify(parsed);
        
        // Replace the original with minified version
        modified = true;
        return `<script type="application/ld+json">${minified}</script>`;
      } catch (error) {
        console.warn(`Warning: Could not parse JSON-LD in ${filePath}:`, error.message);
        return match; // Keep original if parsing fails
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Minified JSON-LD in ${filePath}`);
    }

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function findHtmlFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

function main() {
  const buildDir = path.join(__dirname, '../build');
  
  if (!fs.existsSync(buildDir)) {
    console.error('Build directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  console.log('🔍 Searching for HTML files with JSON-LD...');
  
  const htmlFiles = findHtmlFiles(buildDir);
  
  if (htmlFiles.length === 0) {
    console.log('No HTML files found in build directory.');
    return;
  }

  console.log(`Found ${htmlFiles.length} HTML file(s) to process:`);
  
  let processedCount = 0;
  for (const file of htmlFiles) {
    console.log(`Processing: ${path.relative(buildDir, file)}`);
    minifyJsonLdInFile(file);
    processedCount++;
  }

  console.log(`\n✅ Successfully processed ${processedCount} HTML file(s)`);
  console.log('📦 JSON-LD scripts have been minified for production');
}

// Only run if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = { minifyJsonLdInFile, findHtmlFiles };
