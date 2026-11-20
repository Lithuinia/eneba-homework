import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { useLanguage } from '../context/LanguageContext'
import type { Order } from '../types'

export function OrdersPage() {
  const { t, price } = useLanguage()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    api
      .getOrders()
      .then((result) => {
        if (active) {
          setOrders(result.orders)
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

  if (orders.length === 0) {
    return (
      <div className="page-state">
        <h1>{t('orders.empty')}</h1>
        <p>{t('orders.emptyText')}</p>
        <Link className="btn btn-primary" to="/store">
          {t('cart.continueShopping')}
        </Link>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">INTUS</span>
          <h1>{t('orders.title')}</h1>
        </div>
        <span className="results-count">{orders.length}</span>
      </div>
      <div className="order-list">
        {orders.map((order) => (
          <article className="order-card" key={order.id}>
            <div className="order-head">
              <div>
                <h2>
                  {t('orders.order')} #{order.id}
                </h2>
                <span className="muted">{new Date(order.created_at).toLocaleString()}</span>
              </div>
              <span className="order-status">{order.status}</span>
              <strong>{price(order.total)}</strong>
            </div>
            <div className="order-items">
              {order.items.map((item) => (
                <div className="order-item" key={item.id}>
                  <span>{item.product_name}</span>
                  <span className="muted">
                    {item.seller_name} · {price(item.unit_price)} × {item.quantity}
                  </span>
                  <code>{item.key_code}</code>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
