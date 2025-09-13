import { useEffect } from 'react';
import type { Metric } from 'web-vitals';

// Web Vitals measurement function
const measureWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Performance monitoring component
export const WebVitals: React.FC = () => {
  useEffect(() => {
    // Only measure in production
    if (process.env.NODE_ENV === 'production') {
      measureWebVitals((metric) => {
        // Log to console for debugging
        console.log('Web Vital:', metric);
        
        // Send to analytics service (replace with your preferred service)
        // Example: gtag('event', metric.name, {
        //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        //   event_category: 'Web Vitals',
        //   event_label: metric.id,
        //   non_interaction: true,
        // });
      });
    }
  }, []);

  return null;
};

// Performance optimization hook
export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
      fontLink.as = 'style';
      document.head.appendChild(fontLink);

      // Preload critical images
      const criticalImages = [
        '/assets/profile-photo.jpg',
        '/assets/projects/taskforge.jpg',
        '/assets/projects/elearn.jpg'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    // Optimize images
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Add loading="lazy" if not already present
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        
        // Add decoding="async"
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });
    };

    // Defer non-critical JavaScript
    const deferNonCriticalJS = () => {
      const scripts = document.querySelectorAll('script[data-defer]');
      scripts.forEach(script => {
        script.setAttribute('defer', '');
      });
    };

    // Run optimizations
    preloadCriticalResources();
    optimizeImages();
    deferNonCriticalJS();

    // Cleanup
    return () => {
      // Cleanup if needed
    };
  }, []);
};

export default WebVitals;

