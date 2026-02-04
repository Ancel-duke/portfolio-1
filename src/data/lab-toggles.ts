/**
 * Experiment toggle keys and labels. Persistence uses useLocalStorageToggle("labs:<key>", default).
 */
export const LAB_STORAGE_KEYS = {
  customCursor: "labs:customCursor",
  parallax: "labs:parallax",
  nowPlaying: "labs:nowPlaying",
  animations: "labs:animations",
} as const

export const LAB_DEFAULTS: Record<keyof typeof LAB_STORAGE_KEYS, boolean> = {
  customCursor: false,
  parallax: false,
  nowPlaying: true,
  animations: true,
}

export const LAB_DESCRIPTIONS: Record<keyof typeof LAB_STORAGE_KEYS, string> = {
  customCursor: "Custom cursor with particle effects",
  parallax: "Parallax scrolling effects on hero sections",
  nowPlaying: "Now playing music widget",
  animations: "Enhanced animations and transitions",
}

export type LabKey = keyof typeof LAB_STORAGE_KEYS
