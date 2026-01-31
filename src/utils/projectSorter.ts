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

/** Project titles/slugs that appear in fixed order after the newest (2nd, 3rd, 4th, …). */
const PINNED_AFTER_NEWEST = ['nestfi', 'edumanage', 'ledgerx'] as const;

function getProjectKey(p: { slug?: string; title?: string }): string {
  const slug = (p.slug || '').toLowerCase().trim();
  const title = (p.title || '').toLowerCase().trim();
  if (slug) return slug;
  // Match "NestFi" -> "nestfi", "EduManage" -> "edumanage", "LedgerX - ..." -> need ledgerx
  const firstWord = title.split(/\s+/)[0] || '';
  return firstWord.replace(/[^a-z0-9]+/g, '');
}

export function getMasterSortedProjects<T extends { id: number; type?: string; slug?: string; title?: string }>(
  projects: T[]
): T[] {
  if (projects.length === 0) return [];

  const byKey = new Map<string, T>();
  projects.forEach((p) => {
    const key = getProjectKey(p);
    if (key) byKey.set(key, p);
  });
  // Ensure LedgerX (title "LedgerX - Finance Management Application") is findable as "ledgerx"
  const ledgerxProject = projects.find((p) => (p.title || '').toLowerCase().startsWith('ledgerx'));
  if (ledgerxProject) byKey.set('ledgerx', ledgerxProject);

  const newest = projects.reduce((a, b) => (a.id >= b.id ? a : b));
  const pinned: T[] = [];
  for (const slug of PINNED_AFTER_NEWEST) {
    const found = byKey.get(slug);
    if (found && found !== newest && !pinned.includes(found)) pinned.push(found);
  }

  const used = new Set<T>([newest, ...pinned]);
  const rest = projects.filter((p) => !used.has(p)).sort((a, b) => b.id - a.id);

  return [newest, ...pinned, ...rest];
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
