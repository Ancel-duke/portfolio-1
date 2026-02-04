import * as React from 'react'
import { cn } from '../../lib/utils'

export interface TechSummaryTableProps {
  /** Tech stack (e.g. technologies[].name) */
  stack: string[]
  /** Role (e.g. Full-Stack Software Engineer) */
  role: string
  /** Year (e.g. 2025) */
  year: string
  /** Status (e.g. Live, In Progress) */
  status: string
  className?: string
}

const ROWS: { key: keyof Omit<TechSummaryTableProps, 'className'>; label: string }[] = [
  { key: 'stack', label: 'Stack' },
  { key: 'role', label: 'Role' },
  { key: 'year', label: 'Year' },
  { key: 'status', label: 'Status' },
]

/**
 * AI-first summary table at the top of case study pages.
 * Dynamically pulls Stack, Role, Year, Status from case study data.
 */
export function TechSummaryTable({ stack, role, year, status, className }: TechSummaryTableProps) {
  const values = { stack: stack?.length ? stack.join(', ') : '—', role, year, status }

  return (
    <div
      className={cn('overflow-x-auto rounded-lg border border-border bg-muted/20', className)}
      role="region"
      aria-label="Case study summary"
    >
      <table className="w-full min-w-[280px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {ROWS.map(({ label }) => (
              <th key={label} className="px-4 py-3 font-semibold text-foreground">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/80">
            {ROWS.map(({ key }) => (
              <td key={key} className="px-4 py-3 text-muted-foreground">
                {key === 'stack' ? values.stack : values[key]}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TechSummaryTable
