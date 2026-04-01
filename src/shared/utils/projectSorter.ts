/**
 * Date-seeded project randomizer utility
 * Ensures projects remain the same for the entire 24-hour period
 */

/**
 * Get the current date as a string (YYYY-MM-DD)
 */
export function getDailySeed(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Simple hash function to convert date string to numeric seed
 * Uses Mulberry32-like algorithm
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Seeded random number generator (Mulberry32)
 */
function seededRandom(seed: number): () => number {
  let state = seed;
  return function() {
    state = (state + 0x6D2B79F5) | 0;
    let t = Math.imul(state ^ (state >>> 15), state | 1);
    t = t ^ Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Shuffle array using seeded random number generator
 */
export function seededShuffle<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  const random = seededRandom(seed);
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

/**
 * Sorts projects by id descending (newest / highest id first).
 * No pinning: when you add a new project with the next id, it appears in position 1.
 */
export function getMasterSortedProjects<T extends { id: number; type?: string; slug?: string; title?: string }>(
  projects: T[]
): T[] {
  if (projects.length === 0) return [];
  return [...projects].sort((a, b) => b.id - a.id);
}

/**
 * Daily featured selection helper
 * Returns the first N projects from the master sorted list (newest first).
 *
 * @param projects - The list of projects
 * @param count - Number of projects to select (default: 4)
 * @returns Array of selected projects (newest first)
 */
export function getDailySelection<T extends { id: number; type?: string; slug?: string; title?: string }>(
  projects: T[],
  count: number = 4
): T[] {
  const sortedProjects = getMasterSortedProjects(projects);
  return sortedProjects.slice(0, count);
}

/**
 * Generic function to shuffle any array with date-seeded randomization
 * Useful for case studies or other content that needs daily rotation
 */
export function getDailyShuffled<T>(items: T[], limit?: number): T[] {
  const dateSeed = getDailySeed();
  const numericSeed = hashString(dateSeed);
  const shuffled = seededShuffle(items, numericSeed);
  return limit ? shuffled.slice(0, limit) : shuffled;
}
