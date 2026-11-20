export function sanitizePriceInput(value: string): string {
  const cleaned = value.replace(/[^\d.]/g, '')
  const [whole, ...decimalParts] = cleaned.split('.')
  if (decimalParts.length === 0) {
    return whole
  }
  return `${whole}.${decimalParts.join('').slice(0, 2)}`
}

export function safeReturnTo(value: string | null): string {
  if (!value) {
    return '/'
  }
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) {
    return '/'
  }
  return value
}
