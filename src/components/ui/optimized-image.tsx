import React, { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '../../lib/utils';

/** Netlify Image CDN: only when deployed on Netlify (ancel.co.ke or *.netlify.app). Targets 50–150KB with WebP. */
function getNetlifyImageUrl(originalSrc: string, width: number, quality: number): string | null {
  if (typeof window === 'undefined') return null;
  const origin = window.location.origin;
  const isNetlify = origin.includes('netlify.app') || origin.includes('ancel.co.ke');
  if (!isNetlify || !originalSrc || originalSrc.startsWith('data:')) return null;
  const fullUrl = originalSrc.startsWith('http') ? originalSrc : `${origin}${originalSrc.startsWith('/') ? '' : '/'}${originalSrc}`;
  const params = new URLSearchParams({
    url: fullUrl,
    w: String(Math.min(width, 1200)),
    q: String(Math.min(100, Math.max(1, quality))),
    fit: 'cover',
    fm: 'webp',
  });
  return `/.netlify/images?${params.toString()}`;
}

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty' | 'skeleton';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  placeholder = 'skeleton',
  blurDataURL,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  const imageSrc = useMemo(() => {
    if (!isInView) return '';
    const w = width || 800;
    const netlifyUrl = getNetlifyImageUrl(src, w, quality);
    return netlifyUrl || src;
  }, [isInView, src, width, quality]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        className
      )}
      style={{ width, height }}
    >
      {/* Skeleton / blur-up placeholder — stable layout while image loads */}
      {!isLoaded && !hasError && (
        <div
          className={cn(
            'absolute inset-0 bg-muted animate-pulse',
            (placeholder === 'blur' && blurDataURL) && 'bg-cover bg-center blur-sm'
          )}
          style={{
            backgroundImage: placeholder === 'blur' && blurDataURL ? `url(${blurDataURL})` : undefined,
          }}
          aria-hidden="true"
        />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-muted-foreground text-center">
            <svg
              className="w-8 h-8 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs">Failed to load</p>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {isInView && !hasError && (
        <img
          src={imageSrc}
          alt={alt}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          loading={priority ? 'eager' : loading}
          decoding="async"
          fetchPriority={priority ? 'high' : undefined}
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
          {...props}
        />
      )}
    </div>
  );
};

export default OptimizedImage;





