import { Link, useNavigate } from 'react-router-dom'
import { Price } from '../components/Price'
import { ProductArtwork } from '../components/ProductArtwork'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { useCartAvailability } from '../hooks/useCartAvailability'

export function CartPage() {
  const { t, price } = useLanguage()
  const { user } = useAuth()
  const { items, total, updateQuantity, removeItem } = useCart()
  const { checking, stockIssue } = useCartAvailability()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="page-state">
        <h1>{t('cart.empty')}</h1>
        <p>{t('cart.emptyText')}</p>
        <Link className="btn btn-primary" to="/store">
          {t('cart.continueShopping')}
        </Link>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">INTUS</span>
          <h1>{t('cart.title')}</h1>
        </div>
        <span className="results-count">{items.length} {t('store.results')}</span>
      </div>
      <div className="cart-layout">
        <section className="cart-items">
          {items.map((item) => (
            <article className="cart-row" key={item.offerId}>
              <div className="cart-art">
                <ProductArtwork
                  src={item.imageUrl}
                  alt={item.name}
                  platform={item.platform}
                />
              </div>
              <div className="cart-info">
                <Link to={`/product/${item.slug}`}>{item.name}</Link>
                <span>
                  {item.platform} · {item.region}
                </span>
                <span className="muted">{item.sellerName}</span>
                <span className={item.stock <= 0 ? 'cart-stock danger' : 'cart-stock'}>
                  {item.stock <= 0
                    ? t('product.outOfStock')
                    : item.stock <= 10
                      ? t('cart.available', { count: item.stock })
                      : t('cart.maxPerItem', { count: 10 })}
                </span>
              </div>
              <div className="quantity-control">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={item.quantity <= 1}
                  onClick={() => updateQuantity(item.offerId, item.quantity - 1)}
                >
                  −
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={item.quantity >= Math.min(10, item.stock) || item.stock <= 0}
                  onClick={() => updateQuantity(item.offerId, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <Price price={item.price * item.quantity} compact />
              <button
                type="button"
                className="text-button danger"
                onClick={() => removeItem(item.offerId)}
              >
                {t('cart.remove')}
              </button>
            </article>
          ))}
        </section>
        <aside className="cart-summary">
          <h2>{t('checkout.orderSummary')}</h2>
          <div className="summary-row">
            <span>{t('cart.subtotal')}</span>
            <span>{price(total)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>{t('cart.total')}</span>
            <span>{price(total)}</span>
          </div>
          {checking && <p className="muted cart-stock-note">{t('cart.stockChecking')}</p>}
          {stockIssue && <p className="form-error">{t('cart.stockIssue')}</p>}
          <button
            type="button"
            className="btn btn-primary btn-block"
            disabled={checking || Boolean(stockIssue)}
            onClick={() => {
              if (checking || stockIssue) {
                return
              }
              if (user) {
                navigate('/checkout')
              } else {
                navigate('/login?returnTo=%2Fcheckout')
              }
            }}
          >
            {t('cart.checkout')}
          </button>
          <Link className="text-link" to="/store">
            {t('cart.continueShopping')}
          </Link>
        </aside>
      </div>
    </div>
  )
}
