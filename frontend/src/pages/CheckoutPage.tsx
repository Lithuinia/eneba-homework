import { useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { ProductArtwork } from '../components/ProductArtwork'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { useCartAvailability } from '../hooks/useCartAvailability'
import type { Order } from '../types'

type PaymentMethod = 'card' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank' | 'crypto'

const paymentMethods: Array<{ value: PaymentMethod; labelKey: string }> = [
  { value: 'card', labelKey: 'checkout.card' },
  { value: 'paypal', labelKey: 'checkout.paypal' },
  { value: 'apple_pay', labelKey: 'checkout.applePay' },
  { value: 'google_pay', labelKey: 'checkout.googlePay' },
  { value: 'bank', labelKey: 'checkout.bank' },
  { value: 'crypto', labelKey: 'checkout.crypto' },
]

export function CheckoutPage() {
  const { t, price } = useLanguage()
  const { items, total, clear } = useCart()
  const { checking, stockIssue, productLimitIssue } = useCartAvailability()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState<Order | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const selectedPaymentLabel = t(
    paymentMethods.find((method) => method.value === paymentMethod)?.labelKey ?? 'checkout.card',
  )

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

          <section className="payment-section">
            <h2>{t('checkout.paymentMethod')}</h2>
            <div className="payment-options">
              {paymentMethods.map((method) => (
                <label
                  key={method.value}
                  className={
                    paymentMethod === method.value ? 'payment-option selected' : 'payment-option'
                  }
                >
                  <input
                    type="radio"
                    name="payment_method"
                    value={method.value}
                    checked={paymentMethod === method.value}
                    onChange={() => setPaymentMethod(method.value)}
                  />
                  <span>{t(method.labelKey)}</span>
                </label>
              ))}
            </div>

            <div className="payment-details">
              {paymentMethod === 'card' && (
                <div className="payment-fields">
                  <label className="field full">
                    <span>{t('checkout.cardholder')}</span>
                    <input type="text" name="cardholder" autoComplete="off" />
                  </label>
                  <label className="field full">
                    <span>{t('checkout.cardNumber')}</span>
                    <input
                      type="text"
                      name="card_number"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="0000 0000 0000 0000"
                    />
                  </label>
                  <label className="field">
                    <span>{t('checkout.expiry')}</span>
                    <input type="text" name="card_expiry" autoComplete="off" placeholder="MM/YY" />
                  </label>
                  <label className="field">
                    <span>{t('checkout.cvv')}</span>
                    <input type="text" name="card_cvv" autoComplete="off" placeholder="123" />
                  </label>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="payment-fields">
                  <label className="field full">
                    <span>{t('checkout.paypalEmail')}</span>
                    <input type="text" name="paypal_email" autoComplete="off" />
                  </label>
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div className="payment-fields">
                  <label className="field full">
                    <span>{t('checkout.appleEmail')}</span>
                    <input type="text" name="apple_email" autoComplete="off" />
                  </label>
                </div>
              )}

              {paymentMethod === 'google_pay' && (
                <div className="payment-fields">
                  <label className="field full">
                    <span>{t('checkout.googleEmail')}</span>
                    <input type="text" name="google_email" autoComplete="off" />
                  </label>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="payment-fields">
                  <label className="field">
                    <span>{t('checkout.bankName')}</span>
                    <select name="bank_name" defaultValue="">
                      <option value="">—</option>
                      <option value="swedbank">Swedbank</option>
                      <option value="seb">SEB</option>
                      <option value="luminor">Luminor</option>
                      <option value="revolut">Revolut</option>
                    </select>
                  </label>
                  <label className="field">
                    <span>{t('checkout.accountHolder')}</span>
                    <input type="text" name="account_holder" autoComplete="off" />
                  </label>
                  <label className="field full">
                    <span>{t('checkout.iban')}</span>
                    <input type="text" name="iban" autoComplete="off" placeholder="LT00 0000 0000 0000 0000" />
                  </label>
                </div>
              )}

              {paymentMethod === 'crypto' && (
                <div className="payment-fields">
                  <label className="field">
                    <span>{t('checkout.network')}</span>
                    <select name="crypto_network" defaultValue="">
                      <option value="">—</option>
                      <option value="bitcoin">Bitcoin</option>
                      <option value="ethereum">Ethereum</option>
                      <option value="solana">Solana</option>
                      <option value="usdt">USDT</option>
                    </select>
                  </label>
                  <label className="field full">
                    <span>{t('checkout.walletAddress')}</span>
                    <input type="text" name="wallet_address" autoComplete="off" />
                  </label>
                </div>
              )}

              <p className="muted payment-note">{t('checkout.demoFields')}</p>
            </div>
          </section>
        </section>
        <aside className="cart-summary">
          <h2>{t('checkout.orderSummary')}</h2>
          <div className="summary-row">
            <span>{t('cart.subtotal')}</span>
            <span>{price(total)}</span>
          </div>
          <div className="summary-row">
            <span>{t('checkout.paymentMethod')}</span>
            <span>{selectedPaymentLabel}</span>
          </div>
          <div className="summary-row summary-total">
            <span>{t('cart.total')}</span>
            <span>{price(total)}</span>
          </div>
          {checking && <p className="muted cart-stock-note">{t('cart.stockChecking')}</p>}
          {stockIssue && <p className="form-error">{t('cart.stockIssue')}</p>}
          {productLimitIssue && <p className="form-error">{t('cart.productLimitIssue')}</p>}
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => {
              if (checking || stockIssue || productLimitIssue) {
                return
              }
              void placeOrder()
            }}
            disabled={busy || checking || Boolean(stockIssue) || productLimitIssue}
          >
            {busy ? t('checkout.processing') : t('checkout.placeOrder')}
          </button>
          <p className="muted secure-note">{t('product.secureCheckout')}</p>
        </aside>
      </div>
    </div>
  )
}
