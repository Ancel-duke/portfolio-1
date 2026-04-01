import { useState, useEffect, useRef } from 'react'

const DESKTOP_BREAKPOINT = 1024 // lg in Tailwind
const SCROLL_THRESHOLD = 10
const SCROLL_DELTA_MIN = 1

/**
 * Returns whether the navbar should be visible.
 * On desktop (lg+): hide when scrolling down, show when scrolling up or at top.
 * On mobile: always visible (scroll behavior not applied).
 */
export function useScrollDirection(): boolean {
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY ?? document.documentElement.scrollTop
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= DESKTOP_BREAKPOINT

      if (!isDesktop) {
        setVisible(true)
        lastScrollY.current = scrollY
        ticking.current = false
        return
      }

      const delta = scrollY - lastScrollY.current

      if (scrollY <= SCROLL_THRESHOLD) {
        setVisible(true)
      } else if (Math.abs(delta) >= SCROLL_DELTA_MIN) {
        if (delta > 0) {
          setVisible(false)
        } else {
          setVisible(true)
        }
      }

      lastScrollY.current = scrollY
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return visible
}
