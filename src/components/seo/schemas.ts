// Note: JSON imports are handled dynamically in the components
// This avoids build-time import issues with JSON files

// Person Schema for Homepage
export const generatePersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ancel Ajanga",
  "jobTitle": "Fullstack Software Engineer",
  "description": "Ancel Ajanga is a fullstack software engineer who crafts complete software applications — mobile, web, and desktop — using diverse tech stacks including React, Node.js, Python, and modern web technologies. Specializes in building user-friendly applications with clean code and beautiful UI design.",
  "url": "https://ancel-ajanga.netlify.app/",
  "image": "https://ancel-ajanga.netlify.app/assets/profile-photo.jpg",
  "email": "ancel.ajanga@yahoo.com",
  "telephone": "+254768901257",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Kenya"
  },
  "sameAs": [
    "https://github.com/Ancel-duke",
    "https://www.instagram.com/lema.yian._/#"
  ],
  "knowsAbout": [
    "React", "React Native", "Flutter", "Node.js", "Python", "JavaScript", 
    "MongoDB", "Express", "Laravel", "Machine Learning", "Angular", "Vue", 
    "TypeScript", "Django", "Full Stack Development", "Mobile App Development",
    "Web Development", "UI/UX Design", "API Development", "Database Design"
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Fullstack Software Engineer",
    "description": "Develops complete software applications across mobile, web, and desktop platforms"
  },
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Moringa School"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance Developer"
  }
});

// Project Schema for individual projects
export const generateProjectSchema = (project: any) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": project.title,
  "description": project.description,
  "applicationCategory": getApplicationCategory(project.title),
  "operatingSystem": "Web Browser",
  "url": project.liveUrl,
  "author": {
    "@type": "Person",
    "name": "Ancel Ajanga"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "softwareVersion": "1.0",
  "datePublished": project.year || "2024",
  "programmingLanguage": project.technologies || [],
  "featureList": project.features || [],
  "image": `https://ancel-ajanga.netlify.app${project.image}`,
  "screenshot": `https://ancel-ajanga.netlify.app${project.image}`
});

// Blog Post Schema
export const generateBlogPostSchema = (post: any) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "image": `https://ancel-ajanga.netlify.app${post.image}`,
  "author": {
    "@type": "Person",
    "name": post.author.name,
    "image": `https://ancel-ajanga.netlify.app${post.author.avatar}`,
    "description": post.author.bio
  },
  "publisher": {
    "@type": "Person",
    "name": "Ancel Ajanga",
    "image": "https://ancel-ajanga.netlify.app/assets/profile-photo.jpg"
  },
  "datePublished": post.date,
  "dateModified": post.date,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://ancel-ajanga.netlify.app/blog/${post.id}`
  },
  "url": `https://ancel-ajanga.netlify.app/blog/${post.id}`,
  "keywords": post.tags.join(', '),
  "articleSection": "Technology",
  "wordCount": post.content.split(' ').length,
  "timeRequired": post.readTime
});

// Case Study Schema
export const generateCaseStudySchema = (caseStudy: any) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": caseStudy.title,
  "description": caseStudy.description,
  "author": {
    "@type": "Person",
    "name": "Ancel Ajanga"
  },
  "datePublished": caseStudy.year,
  "url": `https://ancel-ajanga.netlify.app/case-studies/${caseStudy.slug}`,
  "image": `https://ancel-ajanga.netlify.app${caseStudy.images.hero}`,
  "keywords": caseStudy.technologies.map((tech: any) => tech.name).join(', '),
  "about": {
    "@type": "Thing",
    "name": "Software Development",
    "description": "Full-stack software development and project management"
  },
  "mentions": caseStudy.technologies.map((tech: any) => ({
    "@type": "Thing",
    "name": tech.name
  }))
});

// Website Schema
export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ancel Ajanga Portfolio",
  "description": "Fullstack Software Engineer Portfolio showcasing modern web applications and mobile apps",
  "url": "https://ancel-ajanga.netlify.app",
  "author": {
    "@type": "Person",
    "name": "Ancel Ajanga"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://ancel-ajanga.netlify.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

// Breadcrumb Schema
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://ancel-ajanga.netlify.app${item.url}`
  }))
});

// Portfolio Collection Schema
export const generatePortfolioSchema = (projects: any[] = []) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Ancel Ajanga's Software Projects",
  "description": "Portfolio of software applications built by Ancel Ajanga",
  "itemListElement": projects.map((project, index) => ({
    "@type": "SoftwareApplication",
    "position": index + 1,
    "name": project.title,
    "description": project.description,
    "applicationCategory": getApplicationCategory(project.title),
    "operatingSystem": "Web Browser",
    "url": project.liveUrl,
    "author": {
      "@type": "Person",
      "name": "Ancel Ajanga"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "softwareVersion": "1.0",
    "datePublished": "2024",
    "programmingLanguage": project.technologies || [],
    "featureList": project.features || [],
    "image": `https://ancel-ajanga.netlify.app${project.image}`
  }))
});

// Helper function to determine application category
const getApplicationCategory = (title: string): string => {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('finance') || titleLower.includes('money')) {
    return 'FinanceApplication';
  } else if (titleLower.includes('fitness') || titleLower.includes('health')) {
    return 'HealthApplication';
  } else if (titleLower.includes('habit') || titleLower.includes('productivity')) {
    return 'ProductivityApplication';
  } else if (titleLower.includes('travel') || titleLower.includes('trip')) {
    return 'TravelApplication';
  } else if (titleLower.includes('school') || titleLower.includes('education') || titleLower.includes('learning')) {
    return 'EducationalApplication';
  } else if (titleLower.includes('attendance') || titleLower.includes('management')) {
    return 'BusinessApplication';
  } else {
    return 'WebApplication';
  }
};

// Organization Schema for the portfolio
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ancel Ajanga - Freelance Developer",
  "description": "Fullstack software development services specializing in React, Node.js, Python, and modern web technologies",
  "url": "https://ancel-ajanga.netlify.app",
  "logo": "https://ancel-ajanga.netlify.app/assets/profile-photo.jpg",
  "founder": {
    "@type": "Person",
    "name": "Ancel Ajanga"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Kenya"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+254768901257",
    "contactType": "customer service",
    "email": "ancel.ajanga@yahoo.com"
  },
  "sameAs": [
    "https://github.com/Ancel-duke",
    "https://www.instagram.com/lema.yian._/#"
  ],
  "knowsAbout": [
    "React", "Node.js", "Python", "JavaScript", "TypeScript", 
    "MongoDB", "Express", "Django", "Full Stack Development", 
    "Mobile App Development", "Web Development", "UI/UX Design"
  ]
});
