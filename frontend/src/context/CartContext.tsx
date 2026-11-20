import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { CartItem } from '../types'

interface AddCartItem extends Omit<CartItem, 'quantity'> {}

interface CartContextValue {
  items: CartItem[]
  count: number
  total: number
  addItem: (item: AddCartItem, quantity?: number) => void
  updateQuantity: (offerId: number, quantity: number) => void
  setItemStock: (offerId: number, stock: number) => void
  removeItem: (offerId: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)
const STORAGE_KEY = 'intus_cart'
const MAX_PER_ITEM = 10

function maxQuantityFor(stock: number): number {
  return Math.max(0, Math.min(MAX_PER_ITEM, Math.floor(stock)))
}

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed
      .filter((item): item is CartItem => {
        return (
          typeof item === 'object' &&
          item !== null &&
          typeof item.offerId === 'number' &&
          typeof item.productId === 'number' &&
          typeof item.price === 'number' &&
          typeof item.quantity === 'number'
        )
      })
      .map((item) => {
        const stock = typeof item.stock === 'number' ? item.stock : MAX_PER_ITEM
        const max = Math.max(1, maxQuantityFor(stock))
        return {
          ...item,
          stock,
          quantity: Math.max(1, Math.min(item.quantity, max)),
        }
      })
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback((item: AddCartItem, quantity = 1) => {
    const max = maxQuantityFor(item.stock)
    if (max <= 0) {
      return
    }
    setItems((current) => {
      const existing = current.find((entry) => entry.offerId === item.offerId)
      if (existing) {
        return current.map((entry) =>
          entry.offerId === item.offerId
            ? {
                ...entry,
                stock: item.stock,
                quantity: Math.max(1, Math.min(entry.quantity + quantity, max)),
              }
            : entry,
        )
      }
      return [...current, { ...item, quantity: Math.max(1, Math.min(quantity, max)) }]
    })
  }, [])

  const updateQuantity = useCallback((offerId: number, quantity: number) => {
    setItems((current) =>
      current.map((entry) => {
        if (entry.offerId !== offerId) {
          return entry
        }
        const max = Math.max(1, maxQuantityFor(entry.stock))
        return { ...entry, quantity: Math.max(1, Math.min(quantity, max)) }
      }),
    )
  }, [])

  const setItemStock = useCallback((offerId: number, stock: number) => {
    setItems((current) =>
      current.map((entry) => {
        if (entry.offerId !== offerId) {
          return entry
        }
        const nextStock = Math.max(0, Math.floor(stock))
        const max = maxQuantityFor(nextStock)
        return {
          ...entry,
          stock: nextStock,
          quantity: max > 0 ? Math.max(1, Math.min(entry.quantity, max)) : entry.quantity,
        }
      }),
    )
  }, [])

  const removeItem = useCallback((offerId: number) => {
    setItems((current) => current.filter((entry) => entry.offerId !== offerId))
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return { items, count, total, addItem, updateQuantity, setItemStock, removeItem, clear }
  }, [items, addItem, updateQuantity, setItemStock, removeItem, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }
  return context
}
