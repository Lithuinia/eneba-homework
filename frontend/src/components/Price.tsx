import { useLanguage } from '../context/LanguageContext'

interface PriceProps {
  price: number
  originalPrice?: number | null
  discountPercent?: number
  compact?: boolean
}

export function Price({ price, originalPrice, discountPercent = 0, compact = false }: PriceProps) {
  const { price: formatPrice } = useLanguage()

  return (
    <div className={compact ? 'price price-compact' : 'price'}>
      <div className="price-main-row">
        <span className="price-current">{formatPrice(price)}</span>
        {discountPercent > 0 && <span className="discount-badge">-{discountPercent}%</span>}
      </div>
      {originalPrice !== null && originalPrice !== undefined && originalPrice > price && (
        <span className="price-old">{formatPrice(originalPrice)}</span>
      )}
    </div>
  )
}
