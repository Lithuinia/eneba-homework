export type PaginationItem = number | 'ellipsis'

export function paginationItems(current: number, total: number): PaginationItem[] {
  if (total <= 0) {
    return []
  }
  if (total <= 5) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const items: PaginationItem[] = [1]
  let start = Math.max(2, current - 1)
  let end = Math.min(total - 1, current + 1)

  if (current <= 3) {
    start = 2
    end = 4
  } else if (current >= total - 2) {
    start = total - 3
    end = total - 1
  }

  if (start > 2) {
    items.push('ellipsis')
  }
  for (let page = start; page <= end; page++) {
    items.push(page)
  }
  if (end < total - 1) {
    items.push('ellipsis')
  }
  items.push(total)

  return items
}
