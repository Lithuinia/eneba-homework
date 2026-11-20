import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useLanguage } from '../context/LanguageContext'
import type { ProductSummary } from '../types'
import { Price } from './Price'

export function SearchBar() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<ProductSummary[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setSuggestions([])
      setLoading(false)
      return
    }

    let active = true
    setLoading(true)
    const timer = window.setTimeout(async () => {
      try {
        const result = await api.search(trimmed, 6)
        if (active) {
          setSuggestions(result.products)
          setOpen(true)
        }
      } catch {
        if (active) {
          setSuggestions([])
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }, 220)

    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [query])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const submit = () => {
    const trimmed = query.trim()
    if (!trimmed) {
      return
    }
    setOpen(false)
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <div className="search-root" ref={rootRef}>
      <form
        className="search-form"
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
        role="search"
      >
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>
        <input
          className="search-input"
          type="search"
          value={query}
          placeholder={t('search.placeholder')}
          aria-label={t('search.placeholder')}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => {
            if (suggestions.length > 0) {
              setOpen(true)
            }
          }}
        />
        {query && (
          <button
            type="button"
            className="search-clear"
            aria-label={t('search.clear')}
            onClick={() => {
              setQuery('')
              setSuggestions([])
              setOpen(false)
            }}
          >
            ×
          </button>
        )}
      </form>
      {open && query.trim().length >= 2 && (
        <div className="search-suggestions">
          {loading && <div className="search-suggestion-state">{t('common.loading')}</div>}
          {!loading && suggestions.length === 0 && (
            <div className="search-suggestion-state">{t('search.noResults')}</div>
          )}
          {!loading &&
            suggestions.map((product) => (
              <button
                key={product.id}
                type="button"
                className="search-suggestion"
                onMouseDown={(event) => {
                  event.preventDefault()
                  setOpen(false)
                  navigate(`/product/${product.slug}`)
                }}
              >
                <span className="search-suggestion-name">{product.name}</span>
                <span className="search-suggestion-platform">{product.platform}</span>
                <Price price={product.price} compact />
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
