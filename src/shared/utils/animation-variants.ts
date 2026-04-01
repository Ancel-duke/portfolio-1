/**
 * Shared variants for Enhanced Animations toggle.
 * When enabled: spring-based stagger; when disabled: instant (no entrance, no leftover).
 */

export const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
}

export const springTransitionSofter = {
  type: "spring" as const,
  stiffness: 300,
  damping: 24,
}

export function getSectionVariants(enabled: boolean) {
  if (!enabled) {
    return {
      containerVariants: {
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0, delayChildren: 0 },
        },
      },
      itemVariants: {
        hidden: { opacity: 1, y: 0 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0 },
        },
      },
    }
  }
  return {
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.04,
        },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: springTransition,
      },
    },
  }
}

export function getNavItemVariants(enabled: boolean) {
  if (!enabled) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    }
  }
  return {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: springTransition,
    },
  }
}

/** Hover props for cards/buttons: spring scale when enabled, undefined when disabled (use CSS). */
export function getHoverScale(enabled: boolean) {
  if (!enabled) return undefined
  return { scale: 1.03 }
}

export function getHoverScaleCard(enabled: boolean) {
  if (!enabled) return undefined
  return { scale: 1.02, y: -4 }
}

export function getHoverTransition(enabled: boolean) {
  if (!enabled) return undefined
  return springTransition
}
