import { useState, useEffect, useRef } from 'react';

/** Ignore sub-threshold movement to reduce jitter from trackpads / mobile overscroll. */
const SCROLL_JITTER_PX = 8;

export type ScrollDirection = 'up' | 'down';

/**
 * Tracks vertical scroll direction by comparing the current scroll position to the previous one.
 * Uses a ref for the last Y value, a passive scroll listener, and a small threshold so the UI does not flicker.
 */
export function useScrollDirection(): { direction: ScrollDirection } {
  const [direction, setDirection] = useState<ScrollDirection>('up');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const readScrollY = () => window.scrollY ?? document.documentElement.scrollTop;

    lastScrollY.current = readScrollY();

    const onScroll = () => {
      const currentScrollY = readScrollY();

      if (currentScrollY <= 0) {
        setDirection((d) => (d === 'up' ? d : 'up'));
        lastScrollY.current = 0;
        return;
      }

      const delta = currentScrollY - lastScrollY.current;

      if (Math.abs(delta) < SCROLL_JITTER_PX) {
        return;
      }

      const next: ScrollDirection =
        currentScrollY > lastScrollY.current ? 'down' : 'up';

      setDirection((d) => (d === next ? d : next));
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { direction };
}
