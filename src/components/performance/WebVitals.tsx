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
      measureWebVitals((_metric) => {
        // Send to analytics: gtag('event', _metric.name, { value: ..., event_category: 'Web Vitals', ... })
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

// Performance optimization hook (optional; not used by default to avoid blocking LCP).
// Preloading multiple images delays first paint; priority/fetchPriority on components is preferred.
export const usePerformanceOptimization = () => {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const optimizeImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
        if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
      });
    };
    optimizeImages();
  }, []);
};

export default WebVitals;

