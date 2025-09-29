import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ImageWithLightboxProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageWithLightbox({ src, alt, className = '' }: ImageWithLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${className}`}
        onClick={() => setIsOpen(true)}
        loading="lazy"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.button
              className="absolute top-4 right-4 p-2 text-white hover:text-primary transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-6 w-6" />
            </motion.button>

            <motion.img
              src={src}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}