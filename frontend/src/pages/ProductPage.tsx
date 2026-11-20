import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'
import { Price } from '../components/Price'
import { ProductArtwork } from '../components/ProductArtwork'
import { ProductCard } from '../components/ProductCard'
import { Rating } from '../components/Rating'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import type { ProductDetail } from '../types'

export function ProductPage() {
  const { slug = '' } = useParams()
  const { t, price } = useLanguage()
  const { addItem } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [selectedOfferId, setSelectedOfferId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'description' | 'activation'>('description')
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    api
      .getProduct(slug)
      .then((result) => {
        if (active) {
          setProduct(result)
          setWishlisted(result.is_wishlisted)
          setSelectedOfferId(result.offers[0]?.id ?? result.best_offer_id)
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
  }, [slug, t])

  if (loading) {
    return <div className="page-state">{t('common.loading')}</div>
  }

  if (error || !product) {
    return (
      <div className="page-state">
        <h1>{t('common.error')}</h1>
        <p>{error}</p>
        <Link className="btn btn-primary" to="/store">
          {t('common.allProducts')}
        </Link>
      </div>
    )
  }

  const selectedOffer =
    product.offers.find((offer) => offer.id === selectedOfferId) ?? product.offers[0] ?? null

  const addToCart = () => {
    if (!selectedOffer) {
      return
    }
    addItem({
      offerId: selectedOffer.id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      platform: product.platform,
      region: product.region,
      imageUrl: product.image_url,
      price: selectedOffer.price,
      sellerName: selectedOffer.seller_name,
      stock: selectedOffer.stock,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  const toggleWishlist = async () => {
    if (!user) {
      navigate(`/login?returnTo=${encodeURIComponent(`/product/${product.slug}`)}`)
      return
    }
    if (wishlisted) {
      await api.removeWishlist(product.id)
    } else {
      await api.addWishlist(product.id)
    }
    setWishlisted((current) => !current)
  }

  return (
    <div className="product-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">{t('common.home')}</Link>
        <span>/</span>
        <Link to="/store">{t('nav.store')}</Link>
        <span>/</span>
        <Link to={`/store?platform=${encodeURIComponent(product.platform)}`}>{product.platform}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      <section className="product-hero">
        <div className="product-media-panel">
          <ProductArtwork src={product.image_url} alt={product.name} platform={product.platform} />
          <div className="product-trust-badges">
            <span>{t('product.secureCheckout')}</span>
            <span>Instant delivery</span>
            <span>Verified sellers</span>
          </div>
        </div>
        <div className="product-buy-panel">
          <div className="product-badges">
            <span className="platform-badge">{product.platform}</span>
            <span className="region-badge">{product.region}</span>
            <span className="category-badge">{product.category}</span>
          </div>
          <h1>{product.name}</h1>
          <Rating rating={product.rating} count={product.rating_count} />
          <div className="product-price-block">
            <Price
              price={selectedOffer?.price ?? product.price}
              originalPrice={product.original_price}
              discountPercent={product.discount_percent}
            />
            {product.offers.length > 0 && (
              <span className="offer-summary">
                {product.offers.length} {t('product.offers')} · {t('product.from')}{' '}
                {price(Math.min(...product.offers.map((offer) => offer.price)))}
              </span>
            )}
          </div>
          <div className="product-actions">
            <button
              type="button"
              className="btn btn-primary btn-large"
              onClick={addToCart}
              disabled={!selectedOffer || selectedOffer.stock <= 0}
            >
              {added ? t('product.added') : t('product.addToCart')}
            </button>
            <button
              type="button"
              className={wishlisted ? 'btn btn-ghost active' : 'btn btn-ghost'}
              onClick={() => {
                void toggleWishlist()
              }}
            >
              ♥ {wishlisted ? t('product.inWishlist') : t('product.wishlist')}
            </button>
          </div>
          <dl className="product-facts">
            <div>
              <dt>{t('product.platform')}</dt>
              <dd>{product.platform}</dd>
            </div>
            <div>
              <dt>{t('product.region')}</dt>
              <dd>{product.region}</dd>
            </div>
            <div>
              <dt>{t('product.category')}</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt>{t('product.releaseDate')}</dt>
              <dd>{product.release_date ?? '—'}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="content-section offers-section">
        <div className="section-heading">
          <div>
            <h2>
              {product.offers.length} {t('product.offers')}
            </h2>
            <p>{t('product.chooseOffer')}</p>
          </div>
        </div>
        <div className="offers-table">
          {product.offers.map((offer) => (
            <div
              key={offer.id}
              className={offer.id === selectedOfferId ? 'offer-row selected' : 'offer-row'}
            >
              <div className="offer-seller">
                <strong>{offer.seller_name}</strong>
                <span>★ {offer.seller_rating.toFixed(1)}</span>
              </div>
              <div className="offer-delivery">
                <span>{offer.delivery}</span>
                <span>
                  {offer.stock} {t('product.stock')}
                </span>
              </div>
              <Price price={offer.price} compact />
              <button
                type="button"
                className="btn btn-primary btn-small"
                onClick={() => {
                  setSelectedOfferId(offer.id)
                  addItem({
                    offerId: offer.id,
                    productId: product.id,
                    slug: product.slug,
                    name: product.name,
                    platform: product.platform,
                    region: product.region,
                    imageUrl: product.image_url,
                    price: offer.price,
                    sellerName: offer.seller_name,
                    stock: offer.stock,
                  })
                  setAdded(true)
                  window.setTimeout(() => setAdded(false), 1600)
                }}
                disabled={offer.stock <= 0}
              >
                {t('product.addToCart')}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section product-info-section">
        <div className="tab-row">
          <button
            type="button"
            className={tab === 'description' ? 'tab active' : 'tab'}
            onClick={() => setTab('description')}
          >
            {t('product.description')}
          </button>
          <button
            type="button"
            className={tab === 'activation' ? 'tab active' : 'tab'}
            onClick={() => setTab('activation')}
          >
            {t('product.activation')}
          </button>
        </div>
        <div className="tab-panel">
          {tab === 'description' ? <p>{product.description}</p> : <p>{t('product.activationText')}</p>}
        </div>
      </section>

      <section className="content-section reviews-section">
        <div className="section-heading">
          <h2>{t('product.reviews')}</h2>
          <Rating rating={product.rating} count={product.rating_count} />
        </div>
        {product.reviews.length === 0 && <p className="muted">{t('product.noReviews')}</p>}
        <div className="review-list">
          {product.reviews.map((review) => (
            <article className="review-card" key={review.id}>
              <div className="review-head">
                <strong>{review.author_name}</strong>
                <Rating rating={review.rating} />
              </div>
              <p>{review.comment}</p>
              <span className="muted">{new Date(review.created_at).toLocaleDateString()}</span>
            </article>
          ))}
        </div>
      </section>

      {product.related.length > 0 && (
        <section className="content-section">
          <div className="section-heading">
            <h2>{t('product.related')}</h2>
          </div>
          <div className="product-grid">
            {product.related.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
