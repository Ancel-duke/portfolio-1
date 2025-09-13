import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '../../lib/utils';

interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
  animation?: boolean;
  animationVariants?: any;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  className,
  threshold = 0.1,
  rootMargin = '50px',
  fallback,
  animation = true,
  animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: rootMargin
  });

  if (!isInView && fallback) {
    return (
      <div ref={ref} className={cn('min-h-[200px]', className)}>
        {fallback}
      </div>
    );
  }

  if (!isInView && !fallback) {
    return (
      <div ref={ref} className={cn('min-h-[200px]', className)} />
    );
  }

  if (animation) {
    return (
      <motion.div
        ref={ref}
        className={className}
        variants={animationVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default LazySection;

