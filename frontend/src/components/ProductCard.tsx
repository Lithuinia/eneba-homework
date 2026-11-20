import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import type { ProductSummary } from '../types'
import { Price } from './Price'
import { ProductArtwork } from './ProductArtwork'
import { Rating } from './Rating'

interface ProductCardProps {
  product: ProductSummary
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage()
  const { addItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [wishlisted, setWishlisted] = useState(Boolean(product.is_wishlisted))
  const [added, setAdded] = useState(false)

  const toggleWishlist = async () => {
    if (!user) {
      navigate(`/login?returnTo=${encodeURIComponent(`/product/${product.slug}`)}`)
      return
    }
    try {
      if (wishlisted) {
        await api.removeWishlist(product.id)
      } else {
        await api.addWishlist(product.id)
      }
      setWishlisted((current) => !current)
    } catch {
      setWishlisted((current) => current)
    }
  }

  const addToCart = () => {
    if (!product.best_offer_id) {
      return
    }
    addItem({
      offerId: product.best_offer_id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      platform: product.platform,
      region: product.region,
      imageUrl: product.image_url,
      price: product.price,
      sellerName: product.best_offer_seller ?? 'Intus seller',
      stock: product.best_offer_stock,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="product-card">
      <Link className="product-card-link" to={`/product/${product.slug}`} aria-label={product.name}>
        <div className="product-card-media">
          <ProductArtwork src={product.image_url} alt={product.name} platform={product.platform} />
          <span className="platform-badge">{product.platform}</span>
          {product.region && <span className="region-badge">{product.region}</span>}
          {product.discount_percent > 0 && (
            <span className="card-discount">-{product.discount_percent}%</span>
          )}
        </div>
        <div className="product-card-body">
          <h3 className="product-card-title">{product.name}</h3>
          <Rating rating={product.rating} count={product.rating_count} />
          <Price
            price={product.price}
            originalPrice={product.original_price}
            discountPercent={0}
            compact
          />
        </div>
      </Link>
      <div className="product-card-actions">
        <button
          type="button"
          className="btn btn-primary btn-small"
          onClick={addToCart}
          disabled={!product.best_offer_id || product.best_offer_stock <= 0}
        >
          {product.best_offer_stock <= 0
            ? t('product.outOfStock')
            : added
              ? t('product.added')
              : t('product.addToCart')}
        </button>
        <button
          type="button"
          className={wishlisted ? 'icon-button active' : 'icon-button'}
          onClick={() => {
            void toggleWishlist()
          }}
          aria-label={wishlisted ? t('product.inWishlist') : t('product.wishlist')}
          title={wishlisted ? t('product.inWishlist') : t('product.wishlist')}
        >
          ♥
        </button>
      </div>
    </article>
  )
}
