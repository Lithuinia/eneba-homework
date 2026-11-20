import { useEffect, useState } from 'react'
import { api } from '../api'
import { useCart } from '../context/CartContext'
import type { CartItem } from '../types'

export function useCartAvailability() {
  const { items, setItemStock } = useCart()
  const [checking, setChecking] = useState(false)
  const offerKey = items.map((item) => `${item.offerId}:${item.slug}`).join('|')

  useEffect(() => {
    if (items.length === 0) {
      setChecking(false)
      return
    }

    let active = true
    setChecking(true)
    const snapshot = items.map((item) => ({ offerId: item.offerId, slug: item.slug }))

    Promise.all(
      snapshot.map(async (item) => {
        try {
          const product = await api.getProduct(item.slug)
          const offer = product.offers.find((entry) => entry.id === item.offerId)
          return { offerId: item.offerId, stock: offer?.stock ?? 0 }
        } catch {
          return { offerId: item.offerId, stock: 0 }
        }
      }),
    )
      .then((updates) => {
        if (!active) {
          return
        }
        updates.forEach((update) => setItemStock(update.offerId, update.stock))
      })
      .finally(() => {
        if (active) {
          setChecking(false)
        }
      })

    return () => {
      active = false
    }
  }, [offerKey, setItemStock])

  const stockIssue: CartItem | undefined = items.find(
    (item) => item.stock <= 0 || item.quantity > Math.min(10, item.stock),
  )

  return { checking, stockIssue }
}
