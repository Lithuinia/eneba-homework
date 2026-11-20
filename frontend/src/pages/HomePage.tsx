import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { ProductCard } from '../components/ProductCard'
import { ProductArtwork } from '../components/ProductArtwork'
import { useLanguage } from '../context/LanguageContext'
import type { HomeData } from '../types'

const sectionTitleKeys: Record<string, string> = {
  best_sellers: 'home.bestSellers',
  deals: 'home.deals',
  recommended: 'home.recommended',
  gift_cards: 'home.giftCards',
  upcoming: 'home.upcoming',
  addons: 'home.popularAddons',
}

export function HomePage() {
  const { t, language } = useLanguage()
  const [data, setData] = useState<HomeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await api.getHome(language)
      setData(result)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t('home.error'))
    } finally {
      setLoading(false)
    }
  }, [language, t])

  useEffect(() => {
    void load()
  }, [load])

  if (loading) {
    return (
      <div className="page-state">
        <div className="loader" />
        <span>{t('common.loading')}</span>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="page-state">
        <h1>{t('home.error')}</h1>
        <p>{error}</p>
        <button type="button" className="btn btn-primary" onClick={() => void load()}>
          {t('common.retry')}
        </button>
      </div>
    )
  }

  const hero = data.hero

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">INTUS MARKETPLACE</span>
          <h1>{hero?.title ?? t('home.heroTitle')}</h1>
          <p>{hero?.subtitle ?? t('home.heroText')}</p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to={hero?.cta_url ?? '/store'}>
              {hero?.cta_label ?? t('home.shopNow')}
            </Link>
            <Link className="btn btn-ghost" to="/store?sort=price_asc">
              {t('nav.cheap')}
            </Link>
          </div>
          <div className="hero-trust">
            <span>★ {t('common.trust')}</span>
            <span>{t('product.secureCheckout')}</span>
          </div>
        </div>
        <div className="hero-media">
          {hero?.image_url ? (
            <ProductArtwork src={hero.image_url} alt={hero.title} platform="PC" />
          ) : (
            <div className="hero-art">
              <span>GTA VI</span>
              <span>MEGA GIVEAWAY</span>
              <span>CHEAP GAMES</span>
            </div>
          )}
        </div>
      </section>

      {data.sections.map((section) => (
        <section className="content-section" key={section.id}>
          <div className="section-heading">
            <div>
              <h2>{section.title || t(sectionTitleKeys[section.type] ?? 'home.bestSellers')}</h2>
              {section.subtitle && <p>{section.subtitle}</p>}
            </div>
          </div>
          {section.products.length > 0 ? (
            <>
              <div className="product-grid product-grid-section">
                {section.products.slice(0, 5).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="section-cta">
                <Link className="btn btn-ghost" to={section.cta_url ?? '/store'}>
                  {t('home.viewAll')}
                </Link>
              </div>
            </>
          ) : (
            <p className="muted">{t('store.empty')}</p>
          )}
        </section>
      ))}
    </div>
  )
}
