import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { ProductArtwork } from '../components/ProductArtwork'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { useCartAvailability } from '../hooks/useCartAvailability'
import type { Order } from '../types'

export function CheckoutPage() {
  const { t, price } = useLanguage()
  const { items, total, clear } = useCart()
  const { checking, stockIssue } = useCartAvailability()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState<Order | null>(null)

  if (order) {
    return (
      <div className="checkout-page">
        <section className="checkout-success">
          <span className="success-mark">✓</span>
          <h1>{t('checkout.success')}</h1>
          <p>{t('checkout.successText')}</p>
          <div className="checkout-keys">
            <h2>{t('checkout.keysDelivered')}</h2>
            {order.items.map((item) => (
              <div className="checkout-key-row" key={item.id}>
                <span>{item.product_name}</span>
                <code>{item.key_code}</code>
              </div>
            ))}
          </div>
          <Link className="btn btn-primary" to="/orders">
            {t('checkout.viewOrders')}
          </Link>
        </section>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="page-state">
        <h1>{t('checkout.empty')}</h1>
        <Link className="btn btn-primary" to="/store">
          {t('cart.continueShopping')}
        </Link>
      </div>
    )
  }

  const placeOrder = async () => {
    setBusy(true)
    setError('')
    try {
      const result = await api.checkout({
        items: items.map((item) => ({ offer_id: item.offerId, quantity: item.quantity })),
      })
      setOrder(result.order)
      clear()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t('common.error'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="checkout-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">INTUS</span>
          <h1>{t('checkout.title')}</h1>
        </div>
      </div>
      <div className="checkout-layout">
        <section className="checkout-review">
          <div className="checkout-note">{t('checkout.simulated')}</div>
          {items.map((item) => (
            <article className="checkout-row" key={item.offerId}>
              <div className="cart-art">
                <ProductArtwork src={item.imageUrl} alt={item.name} platform={item.platform} />
              </div>
              <div className="cart-info">
                <strong>{item.name}</strong>
                <span>
                  {item.platform} · {item.region} · {item.sellerName}
                </span>
                <span className="muted">
                  {t('cart.quantity')}: {item.quantity}
                </span>
                <span className={item.stock <= 0 ? 'cart-stock danger' : 'cart-stock'}>
                  {item.stock <= 0
                    ? t('product.outOfStock')
                    : item.stock <= 10
                      ? t('cart.available', { count: item.stock })
                      : t('cart.maxPerItem', { count: 10 })}
                </span>
              </div>
              <span className="checkout-line-price">{price(item.price * item.quantity)}</span>
            </article>
          ))}
          {error && <p className="form-error">{error}</p>}
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
            onClick={() => {
              if (checking || stockIssue) {
                return
              }
              void placeOrder()
            }}
            disabled={busy || checking || Boolean(stockIssue)}
          >
            {busy ? t('checkout.processing') : t('checkout.placeOrder')}
          </button>
          <p className="muted secure-note">{t('product.secureCheckout')}</p>
        </aside>
      </div>
    </div>
  )
}
