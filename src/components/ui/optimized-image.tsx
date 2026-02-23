import React from 'react';
import Image from 'next/image';
import { cn } from '../../lib/utils';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ancel.co.ke';

/** Loader that returns absolute URL (no Netlify CDN). Used for skipNetlifyCDN. */
function rawLoader({ src }: { src: string }) {
  return src.startsWith('http') ? src : `${BASE_URL}${src.startsWith('/') ? '' : '/'}${src}`;
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
  const effectiveHeight = height ?? Math.round((width * 5) / 8);

  return (
    <div className={cn('relative block overflow-hidden w-full h-full min-h-0 flex-shrink-0', className)}>
      <Image
        src={src}
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
        onError={onError}
        placeholder={_placeholder === 'blur' && _blurDataURL ? 'blur' : undefined}
        blurDataURL={_blurDataURL}
      />
    </div>
  );
};

export default OptimizedImage;
