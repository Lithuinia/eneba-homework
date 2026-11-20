import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { ProductCard } from '../components/ProductCard'
import { useLanguage } from '../context/LanguageContext'
import type { ProductSummary } from '../types'

export function WishlistPage() {
  const { t } = useLanguage()
  const [products, setProducts] = useState<ProductSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    api
      .getWishlist()
      .then((result) => {
        if (active) {
          setProducts(result.products)
        }
      })
      .catch((caught) => {
        if (active) {
          setError(caught instanceof Error ? caught.message : t('common.error'))
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })
    return () => {
      active = false
    }
  }, [t])

  if (loading) {
    return <div className="page-state">{t('common.loading')}</div>
  }

  if (error) {
    return <div className="page-state">{error}</div>
  }

  if (products.length === 0) {
    return (
      <div className="page-state">
        <h1>{t('wishlist.empty')}</h1>
        <p>{t('wishlist.emptyText')}</p>
        <Link className="btn btn-primary" to="/store">
          {t('cart.continueShopping')}
        </Link>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">INTUS</span>
          <h1>{t('wishlist.title')}</h1>
        </div>
        <span className="results-count">{products.length}</span>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={{ ...product, is_wishlisted: true }} />
        ))}
      </div>
    </div>
  )
}
