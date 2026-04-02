const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

const files = ['projects.json', 'case-studies.json', 'blog.json'];

// We want to map these wrong slugs to correct image basenames:
const mappings = {
  'elearning-platform.webp': 'e-learning.webp',
  'attendance-system.webp': 'attendance.webp',
  'rasoha-academy.webp': 'rasoha.webp',
  'fitness-scheduler.webp': 'fitness.webp',
  'fitness-class-scheduler.webp': 'fitness.webp',
  'personal-finance-tracker.webp': 'finance-tracker.webp'
};

// For blog.json specifically:
const blogMappings = {
  'building-taskforge-with-next-js-and-socket-io-lessons-learned.webp': 'taskforge.webp',
  'scaling-an-e-learning-platform-with-django-react.webp': 'e-learning.webp',
  'why-i-built-a-finance-tracker-in-vue-3.webp': 'finance-tracker.webp',
  'angular-20-in-production-the-fitness-class-scheduler-journey.webp': 'fitness.webp',
  'from-student-to-freelancer-my-journey-since-2021.webp': 'rasoha.webp', // fallback
  'how-travelogue-taught-me-the-power-of-maps-in-web-apps.webp': 'travelogue.webp',
  'designing-a-console-banking-system-to-showcase-oop-java.webp': 'ledgerx.webp', // no banking image, fallback to ledgerx
  'building-educhain-a-web3-journey-into-blockchain-certificate-management.webp': 'educhain.webp',
  'ledgerx-secure-multi-tenant-financial-platform.webp': 'ledgerx.webp',
  'building-opsflow-a-production-ready-incident-management-platform.webp': 'opsflow.webp',
  'building-signflow-a-real-time-assistive-technology-platform-for-sign-language-translation.webp': 'signflow.webp',
  'aegis-zero-knowledge-self-healing-multi-cluster-pull-based-execution-shadow-mode-oidc-ready.webp': 'aegis.webp',
  'nestfi-resilient-financial-coordination-platform-correctness-under-failure.webp': 'nestfi.webp',
  'fits-by-aliv-kenya-first-e-commerce-with-payment-safe-workflows.webp': 'fits.webp',
  'inkly-architecting-a-secure-real-time-messaging-platform.webp': 'inkly.webp'
};

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // General replacements
    for (const [wrong, right] of Object.entries(mappings)) {
      content = content.replace(new RegExp(wrong, 'g'), right);
    }
    
    // Blog specific replacements
    if (file === 'blog.json') {
      for (const [wrong, right] of Object.entries(blogMappings)) {
        content = content.replace(new RegExp(wrong, 'g'), right);
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
