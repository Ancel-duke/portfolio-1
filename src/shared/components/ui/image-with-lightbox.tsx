import React, { useState } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { OptimizedImage } from './optimized-image';

interface ImageWithLightboxProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export function ImageWithLightbox({ src, alt, className = '', width = 800, height = 450 }: ImageWithLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <>
      <div
        className={`cursor-zoom-in ${className}`}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setIsOpen(true))}
        aria-label="View full size"
      >
        <OptimizedImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 80vw"
          className="w-full h-full"
        />
      </div>

      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isOpen && (
            <m.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <m.button
              type="button"
              aria-label="Close lightbox"
              className="absolute top-4 right-4 p-2 text-white hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </m.button>

            <m.img
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  );
}