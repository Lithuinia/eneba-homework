import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'
import { ProductCard } from '../components/ProductCard'
import { useLanguage } from '../context/LanguageContext'
import type { SearchResponse } from '../types'

export function SearchPage() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const [data, setData] = useState<SearchResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!query.trim()) {
      setData(null)
      return
    }
    let active = true
    setLoading(true)
    setError('')
    api
      .search(query, 60)
      .then((result) => {
        if (active) {
          setData(result)
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
  }, [query, t])

  return (
    <div className="search-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">{t('nav.categories')}</span>
          <h1>
            {query ? `${t('search.resultsFor')} "${query}"` : t('search.prompt')}
          </h1>
        </div>
        {data && <span className="results-count">{data.total} {t('store.results')}</span>}
      </div>

      {!query && <div className="page-state">{t('search.prompt')}</div>}
      {query && loading && <div className="page-state">{t('common.loading')}</div>}
      {query && !loading && error && <div className="page-state">{error}</div>}
      {query && !loading && !error && data && data.products.length === 0 && (
        <div className="page-state">
          <h2>{t('search.noResults')}</h2>
          <p>{t('search.prompt')}</p>
        </div>
      )}
      {query && !loading && !error && data && data.products.length > 0 && (
        <div className="product-grid">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
