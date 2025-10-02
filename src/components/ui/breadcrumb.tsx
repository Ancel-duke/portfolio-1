import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BreadcrumbItem {
  name: string;
  url: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  // Generate breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://ancel.co.ke${item.url}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>
      
      <nav 
        className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
              )}
              
              {item.current ? (
                <span 
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.url}
                  className="hover:text-foreground transition-colors duration-200 flex items-center"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb;

