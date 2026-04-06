import * as React from 'react';
import { cn } from '@/shared/utils';
import { SITE } from '@/shared/constants/site';

interface AvailabilityBadgeProps {
  className?: string;
}

export function AvailabilityBadge({ className }: AvailabilityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-[11px] sm:text-xs font-medium text-primary/90 tracking-wide',
        className
      )}
    >
      {SITE.copy.availabilityBadge}
    </span>
  );
}
