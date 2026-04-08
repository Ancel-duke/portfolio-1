import { SITE } from '@/shared/constants/site'

const MAX_LEN = 520

function takeSentences(text: string, maxSentences: number): string {
  const t = text.replace(/\s+/g, ' ').trim()
  if (!t) return ''
  const parts = t.split(/(?<=[.!?])\s+/)
  if (parts.length <= maxSentences) return t
  return parts.slice(0, maxSentences).join(' ')
}

/** Plain 2–3 sentence extract for [data-ai-summary] on project pages. */
export function buildProjectAiSummary(opts: {
  title: string
  slug: string
  description: string
  longDescription?: string
}): string {
  const base = opts.longDescription?.trim() || opts.description.trim()
  const what = takeSentences(base, 2)
  const role = `${SITE.name} (${SITE.role}) independently architected and built ${opts.title.split('—')[0].split(':')[0].trim()} as a portfolio showcase at ${SITE.url}/projects/${opts.slug}.`
  const out = `${what} ${role}`
  return out.length > MAX_LEN ? `${out.slice(0, MAX_LEN - 1).trim()}…` : out
}

/** Case study page — what it is, problem space, author expertise. */
export function buildCaseStudyAiSummary(cs: {
  title: string
  subtitle?: string
  description?: string
  problemSolutionBridge?: string
}): string {
  const name = cs.title.trim()
  const sub = (cs.subtitle || '').trim()
  const bridge = cs.problemSolutionBridge?.trim()
  const desc = takeSentences((bridge || cs.description || sub || '').trim(), 2)
  const line = `${name}${sub ? ` — ${sub}` : ''} is a technical case study on ancel.co.ke documenting architecture, trade-offs, and outcomes. ${desc}`
  const role = `${SITE.name} wrote this case study from hands-on delivery experience in Kenya.`
  const out = `${line} ${role}`
  return out.length > MAX_LEN ? `${out.slice(0, MAX_LEN - 1).trim()}…` : out
}

/** Developer journal — article intent + problem + author. */
export function buildJournalAiSummary(post: {
  title: string
  excerpt?: string
  problem?: string
}): string {
  const title = post.title.trim()
  const ex = takeSentences(post.excerpt?.trim() || '', 2)
  const problemBit = post.problem?.trim()
    ? ` It focuses on: ${takeSentences(post.problem, 1)}`
    : ''
  const role = `${SITE.name} (${SITE.role}) authored this piece from production engineering work.`
  const out = `${title} is a Developer Journal article by ${SITE.name} on ${SITE.url}. ${ex}${problemBit} ${role}`
  return out.length > MAX_LEN ? `${out.slice(0, MAX_LEN - 1).trim()}…` : out
}

/** Guide — practical intent + summary slice + author. */
export function buildGuideAiSummary(guide: { title: string; summary?: string; problem?: string }): string {
  const title = guide.title.trim()
  const sum = takeSentences((guide.summary || '').trim(), 2)
  const prob = guide.problem?.trim() ? ` It answers how teams should think about: ${takeSentences(guide.problem, 1)}` : ''
  const role = `${SITE.name} wrote this guide tying patterns to real portfolio systems.`
  const out = `${title} is an expert-authored guide on ${SITE.url}/guides. ${sum}${prob} ${role}`
  return out.length > MAX_LEN ? `${out.slice(0, MAX_LEN - 1).trim()}…` : out
}
