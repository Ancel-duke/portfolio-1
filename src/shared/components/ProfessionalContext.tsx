import * as React from 'react';
import { cn } from '@/shared/utils';
import { SITE } from '@/shared/constants/site';

interface ProfessionalContextProps {
  className?: string;
  /** Slightly tighter typography for dense headers (e.g. projects). */
  variant?: 'hero' | 'header';
}

export function ProfessionalContext({ className, variant = 'hero' }: ProfessionalContextProps) {
  return (
    <p
      className={cn(
        'text-muted-foreground leading-relaxed',
        variant === 'hero' && 'text-xs sm:text-sm max-w-2xl mx-auto mt-3 sm:mt-4',
        variant === 'header' && 'text-xs sm:text-sm max-w-2xl mx-auto mt-3',
        className
      )}
    >
      {SITE.copy.professionalContext}
    </p>
  );
}
