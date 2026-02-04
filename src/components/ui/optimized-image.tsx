import React, { useState, useRef, useEffect, useMemo } from 'react';
import { cn } from '../../lib/utils';

const SRCSET_WIDTHS = [400, 800, 1200] as const;

/** Netlify Image CDN: only when deployed on Netlify. Returns optimized URL with optional format (webp/avif). */
function getNetlifyImageUrl(
  originalSrc: string,
  width: number,
  quality: number,
  format: 'webp' | 'avif' = 'webp'
): string | null {
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
    fm: format,
  });
  return `/.netlify/images?${params.toString()}`;
}

/** Build responsive srcSet for Netlify (multiple widths). Returns null when not on Netlify. */
function getNetlifySrcSet(originalSrc: string, quality: number, format: 'webp' | 'avif'): string | null {
  if (typeof window === 'undefined') return null;
  const origin = window.location.origin;
  const isNetlify = origin.includes('netlify.app') || origin.includes('ancel.co.ke');
  if (!isNetlify || !originalSrc || originalSrc.startsWith('data:')) return null;
  return SRCSET_WIDTHS.map((w) => {
    const url = getNetlifyImageUrl(originalSrc, w, quality, format);
    return url ? `${url} ${w}w` : '';
  }).filter(Boolean).join(', ') || null;
}

interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string;
  alt: string;
  className?: string;
  /** Applied to the <img> for object-fit etc. */
  imgClassName?: string;
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
  /** When true, skip Netlify Image CDN and use the raw src (avoids CDN issues for critical images like profile photo). */
  skipNetlifyCDN?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  imgClassName,
  width = 800,
  height,
  priority = false,
  placeholder = 'skeleton',
  blurDataURL,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  loading = 'lazy',
  onLoad,
  onError,
  skipNetlifyCDN = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Derive height from width if not provided (assume 16:10 or use aspect from first SRCSET)
  const effectiveHeight = height ?? Math.round((width * 5) / 8);

  const { singleSrc, srcSetWebP, srcSetAvif, useNetlify } = useMemo(() => {
    if (!isInView) {
      return { singleSrc: '', srcSetWebP: null, srcSetAvif: null, useNetlify: false };
    }
    if (skipNetlifyCDN) {
      return { singleSrc: src, srcSetWebP: null, srcSetAvif: null, useNetlify: false };
    }
    const w = width || 800;
    const netlifyWebP = getNetlifyImageUrl(src, w, quality, 'webp');
    const srcSetW = getNetlifySrcSet(src, quality, 'webp');
    const srcSetA = getNetlifySrcSet(src, quality, 'avif');
    return {
      singleSrc: netlifyWebP || src,
      srcSetWebP: srcSetW,
      srcSetAvif: srcSetA,
      useNetlify: !!netlifyWebP,
    };
  }, [isInView, src, width, quality, skipNetlifyCDN]);

  // Intersection Observer for lazy loading (defer until in view)
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.01 }
    );

    const el = imgRef.current;
    if (el) observer.observe(el);
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

  // Picture/img absolutely positioned so image never affects layout; wrapper size comes from parent only.
  const imageClassName = cn(
    'block w-full h-full object-cover transition-opacity duration-300',
    imgClassName,
    isLoaded ? 'opacity-100' : 'opacity-0'
  );

  return (
    <div
      ref={imgRef}
      className={cn('relative block overflow-hidden w-full h-full min-h-0 flex-shrink-0', className)}
    >
      {!isLoaded && !hasError && (
        <div
          className={cn(
            'absolute inset-0 bg-muted animate-pulse',
            placeholder === 'blur' && blurDataURL && 'bg-cover bg-center blur-sm'
          )}
          style={{
            backgroundImage: placeholder === 'blur' && blurDataURL ? `url(${blurDataURL})` : undefined,
          }}
          aria-hidden="true"
        />
      )}

      {hasError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="text-muted-foreground text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {isInView && !hasError &&
        (useNetlify && (srcSetAvif || srcSetWebP) ? (
          <picture className="absolute inset-0 block w-full h-full overflow-hidden">
            {srcSetAvif && <source type="image/avif" srcSet={srcSetAvif} sizes={sizes} />}
            {srcSetWebP && <source type="image/webp" srcSet={srcSetWebP} sizes={sizes} />}
            <img src={singleSrc} alt={alt} className={imageClassName} width={width} height={effectiveHeight} loading={priority ? 'eager' : loading} decoding="async" fetchPriority={priority ? 'high' : undefined} onLoad={handleLoad} onError={handleError} sizes={sizes} {...props} />
          </picture>
        ) : (
          <img src={singleSrc} alt={alt} className={cn(imageClassName, 'absolute inset-0')} width={width} height={effectiveHeight} loading={priority ? 'eager' : loading} decoding="async" fetchPriority={priority ? 'high' : undefined} onLoad={handleLoad} onError={handleError} sizes={sizes} {...props} />
        ))
      }
    </div>
  );
};

export default OptimizedImage;
