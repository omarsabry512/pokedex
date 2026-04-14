/** Page numbers with ellipsis gaps, e.g. 1 2 3 4 5 … 66 */
export function buildPaginationItems(
  current: number,
  total: number,
): Array<number | 'ellipsis'> {
  if (total <= 0) return []
  if (total === 1) return [1]

  const want = new Set<number>()
  want.add(1)
  want.add(total)
  for (let d = -2; d <= 2; d++) {
    const p = current + d
    if (p >= 1 && p <= total) want.add(p)
  }

  const sorted = [...want].sort((a, b) => a - b)
  const out: Array<number | 'ellipsis'> = []
  for (let i = 0; i < sorted.length; i++) {
    const n = sorted[i]!
    if (i > 0 && n - sorted[i - 1]! > 1) {
      out.push('ellipsis')
    }
    out.push(n)
  }
  return out
}
