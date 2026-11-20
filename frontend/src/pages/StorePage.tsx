import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { api } from '../api'
import { ProductCard } from '../components/ProductCard'
import { useLanguage } from '../context/LanguageContext'
import { paginationItems } from '../pagination'
import type { Filters, ProductListResponse } from '../types'

const PER_PAGE = 20

export function StorePage() {
  const { t } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<Filters | null>(null)
  const [data, setData] = useState<ProductListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [minPrice, setMinPrice] = useState(searchParams.get('min_price') ?? '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('max_price') ?? '')
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  const queryString = searchParams.toString()

  useEffect(() => {
    api.getFilters().then(setFilters).catch(() => setFilters(null))
  }, [])

  useEffect(() => {
    setMinPrice(searchParams.get('min_price') ?? '')
    setMaxPrice(searchParams.get('max_price') ?? '')
    setQuery(searchParams.get('q') ?? '')
  }, [queryString, searchParams])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    api
      .getProducts({
        platform: searchParams.get('platform') ?? '',
        region: searchParams.get('region') ?? '',
        category: searchParams.get('category') ?? '',
        min_price: searchParams.get('min_price') ?? '',
        max_price: searchParams.get('max_price') ?? '',
        sort: searchParams.get('sort') ?? 'popular',
        q: searchParams.get('q') ?? '',
        page: searchParams.get('page') ?? '1',
        per_page: PER_PAGE,
      })
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
  }, [searchParams, queryString, t])

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) {
      next.set(key, value)
    } else {
      next.delete(key)
    }
    if (key !== 'page') {
      next.delete('page')
    }
    setSearchParams(next)
  }

  const applyPriceAndQuery = () => {
    const next = new URLSearchParams(searchParams)
    if (minPrice) {
      next.set('min_price', minPrice)
    } else {
      next.delete('min_price')
    }
    if (maxPrice) {
      next.set('max_price', maxPrice)
    } else {
      next.delete('max_price')
    }
    if (query.trim()) {
      next.set('q', query.trim())
    } else {
      next.delete('q')
    }
    next.delete('page')
    setSearchParams(next)
  }

  const reset = () => {
    setSearchParams(new URLSearchParams())
  }

  const page = Number(searchParams.get('page') ?? '1')
  const pages = data?.pages ?? 1

  return (
    <div className="store-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">INTUS STORE</span>
          <h1>{t('store.title')}</h1>
        </div>
        <span className="results-count">
          {data?.total ?? 0} {t('store.results')}
        </span>
      </div>

      <div className="store-layout">
        <aside className="filter-panel">
          <div className="filter-heading">
            <h2>{t('store.filters')}</h2>
            <button type="button" className="text-button" onClick={reset}>
              {t('store.reset')}
            </button>
          </div>

          <label className="field">
            <span>{t('search.placeholder')}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  applyPriceAndQuery()
                }
              }}
            />
          </label>

          <label className="field">
            <span>{t('store.platform')}</span>
            <select
              value={searchParams.get('platform') ?? ''}
              onChange={(event) => updateParam('platform', event.target.value)}
            >
              <option value="">{t('store.all')}</option>
              {filters?.platforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>{t('store.region')}</span>
            <select
              value={searchParams.get('region') ?? ''}
              onChange={(event) => updateParam('region', event.target.value)}
            >
              <option value="">{t('store.all')}</option>
              {filters?.regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>{t('store.category')}</span>
            <select
              value={searchParams.get('category') ?? ''}
              onChange={(event) => updateParam('category', event.target.value)}
            >
              <option value="">{t('store.all')}</option>
              {filters?.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <div className="field">
            <span>{t('common.price')}</span>
            <div className="price-range">
              <input
                type="number"
                min="0"
                step="0.01"
                value={minPrice}
                placeholder={t('store.minPrice')}
                aria-label={t('store.minPrice')}
                onChange={(event) => setMinPrice(event.target.value)}
              />
              <input
                type="number"
                min="0"
                step="0.01"
                value={maxPrice}
                placeholder={t('store.maxPrice')}
                aria-label={t('store.maxPrice')}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
            </div>
          </div>

          <label className="field">
            <span>{t('store.sort')}</span>
            <select
              value={searchParams.get('sort') ?? 'popular'}
              onChange={(event) => updateParam('sort', event.target.value)}
            >
              <option value="popular">{t('store.sortPopular')}</option>
              <option value="newest">{t('store.sortNewest')}</option>
              <option value="price_asc">{t('store.sortPriceAsc')}</option>
              <option value="price_desc">{t('store.sortPriceDesc')}</option>
              <option value="name_asc">{t('store.sortNameAsc')}</option>
              <option value="name_desc">{t('store.sortNameDesc')}</option>
            </select>
          </label>

          <button type="button" className="btn btn-primary btn-block" onClick={applyPriceAndQuery}>
            {t('store.apply')}
          </button>
        </aside>

        <section className="store-results">
          {loading && <div className="page-state">{t('store.loading')}</div>}
          {!loading && error && (
            <div className="page-state">
              <p>{error}</p>
              <button type="button" className="btn btn-primary" onClick={() => setSearchParams(new URLSearchParams(searchParams))}>
                {t('common.retry')}
              </button>
            </div>
          )}
          {!loading && !error && data && data.products.length === 0 && (
            <div className="page-state">
              <h2>{t('store.empty')}</h2>
              <button type="button" className="btn btn-primary" onClick={reset}>
                {t('store.reset')}
              </button>
            </div>
          )}
          {!loading && !error && data && data.products.length > 0 && (
            <>
              <div className="product-grid product-grid-store">
                {data.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {pages > 1 && (
                <div className="pagination">
                  <button
                    type="button"
                    className="btn btn-ghost btn-small"
                    disabled={page <= 1}
                    onClick={() => updateParam('page', String(page - 1))}
                  >
                    {t('store.previous')}
                  </button>
                  <div className="pagination-pages">
                    {paginationItems(page, pages).map((item, index) =>
                      item === 'ellipsis' ? (
                        <span className="pagination-ellipsis" key={`ellipsis-${index}`}>
                          …
                        </span>
                      ) : (
                        <button
                          key={item}
                          type="button"
                          className={item === page ? 'page-button active' : 'page-button'}
                          aria-current={item === page ? 'page' : undefined}
                          onClick={() => updateParam('page', String(item))}
                        >
                          {item}
                        </button>
                      ),
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost btn-small"
                    disabled={page >= pages}
                    onClick={() => updateParam('page', String(page + 1))}
                  >
                    {t('store.next')}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <div className="store-footer-note">
        <Link className="text-link" to="/">
          {t('common.home')}
        </Link>
        <span>{t('product.secureCheckout')}</span>
      </div>
    </div>
  )
}
