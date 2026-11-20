import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { SearchBar } from './SearchBar'

export function Header() {
  const { t, language, toggleLanguage } = useLanguage()
  const { user, logout } = useAuth()
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)

  const navItems = [
    { label: t('nav.categories'), to: '/store' },
    { label: t('nav.cheap'), to: '/store?sort=price_asc' },
    { label: t('nav.software'), to: '/store?category=Software' },
    { label: t('nav.giftCards'), to: '/store?category=Gift%20Cards' },
    { label: t('nav.topUps'), to: '/store?category=In-game%20currency' },
    { label: t('nav.preorder'), to: '/store?category=Add-ons' },
  ]

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          type="button"
          className="menu-toggle"
          aria-label={t('nav.menu')}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <Link className="brand" to="/" aria-label="Intus">
          <img src="/logo.svg" alt="Intus logo" />
        </Link>
        <nav className="primary-nav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.label} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <SearchBar />
        <div className="header-actions">
          <button
            type="button"
            className="header-link language-toggle"
            onClick={toggleLanguage}
            aria-label={t('nav.language')}
          >
            {language === 'en' ? 'LT' : 'EN'}
          </button>
          <span className="currency-label">EUR</span>
          <Link className="header-link wishlist-link" to="/wishlist">
            <span aria-hidden="true">♥</span>
            <span className="header-link-label">{t('nav.wishlist')}</span>
          </Link>
          <Link className="cart-link" to="/cart" aria-label={t('nav.cart')}>
            <img className="cart-icon-image" src="/images/cart-removebg-preview.png" alt="" />
            <span className="cart-count">{count}</span>
          </Link>
          {user ? (
            <div className="user-menu">
              <button
                type="button"
                className="user-button"
                onClick={() => setUserOpen((current) => !current)}
              >
                {user.name.slice(0, 1).toUpperCase()}
              </button>
              {userOpen && (
                <div className="user-dropdown">
                  <span className="user-email">{user.email}</span>
                  <Link to="/orders" onClick={() => setUserOpen(false)}>
                    {t('nav.orders')}
                  </Link>
                  <Link to="/wishlist" onClick={() => setUserOpen(false)}>
                    {t('nav.wishlist')}
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setUserOpen(false)
                      void logout()
                    }}
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link className="header-link" to="/login">
                {t('nav.signIn')}
              </Link>
              <Link className="btn btn-primary btn-small" to="/register">
                {t('nav.register')}
              </Link>
            </div>
          )}
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile">
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
            {t('nav.wishlist')}
          </Link>
          {!user && (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              {t('nav.signIn')}
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}
