import React from 'react';
import Image from 'next/image';
import { cn } from '@/shared/utils';

// Remove the fixed BASE_URL fallback during local testing. 
// If NEXT_PUBLIC_SITE_URL is set, use it. Otherwise, fallback to the live site only in strictly production environments deployed online.
const IS_DEV = process.env.NODE_ENV !== 'production';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || (IS_DEV ? '' : 'https://ancel.co.ke');
const FALLBACK_IMAGE_SRC = '/images/fallback/fallback.png';

/** Loader that returns absolute URL (no Netlify CDN). Used for skipNetlifyCDN. */
function rawLoader({ src }: { src: string }) {
  if (src.startsWith('http')) return src;
  
  // If we're rendering on the client on localhost, always use relative to avoid hitting live prod
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return src;
  }
  
  return BASE_URL ? `${BASE_URL}${src.startsWith('/') ? '' : '/'}${src}` : src;
}

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
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
  /** When true, skip Netlify Image CDN and use the raw src (e.g. profile photo). */
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
  placeholder: _placeholder,
  blurDataURL: _blurDataURL,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 75,
  loading = 'lazy',
  onLoad,
  onError,
  skipNetlifyCDN = false,
}) => {
  const [currentSrc, setCurrentSrc] = React.useState(src);

  React.useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const handleImageError = () => {
    if (currentSrc !== FALLBACK_IMAGE_SRC) {
      setCurrentSrc(FALLBACK_IMAGE_SRC);
    }
    onError?.();
  };

  const effectiveHeight = height ?? Math.round((width * 5) / 8);

  return (
    <div className={cn('relative block overflow-hidden w-full h-full min-h-0 flex-shrink-0', className)}>
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={effectiveHeight}
        sizes={sizes}
        quality={quality}
        priority={!!priority}
        loading={priority ? undefined : loading}
        loader={skipNetlifyCDN ? rawLoader : undefined}
        className={cn('block w-full h-full object-cover', imgClassName)}
        onLoad={onLoad}
        onError={handleImageError}
        placeholder={_placeholder === 'blur' && _blurDataURL ? 'blur' : undefined}
        blurDataURL={_blurDataURL}
      />
    </div>
  );
};

export default OptimizedImage;
