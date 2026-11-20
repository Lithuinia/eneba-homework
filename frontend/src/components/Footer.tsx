import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-newsletter">
          <div>
            <h2>{t('common.newsletter')}</h2>
            <p>{t('common.newsletterText')}</p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault()
              if (email.trim()) {
                setSubscribed(true)
                setEmail('')
              }
            }}
          >
            <input
              type="email"
              value={email}
              placeholder={t('common.emailPlaceholder')}
              aria-label={t('common.emailPlaceholder')}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              {t('common.subscribe')}
            </button>
          </form>
          {subscribed && <span className="newsletter-success">{t('common.trust')}</span>}
        </div>
        <div className="footer-columns">
          <div>
            <h3>{t('common.footerAbout')}</h3>
            <Link to="/store">Intus marketplace</Link>
            <a href="#contact">Contact us</a>
            <a href="#careers">Careers</a>
            <a href="#engineering">Engineering</a>
          </div>
          <div>
            <h3>{t('common.footerHelp')}</h3>
            <Link to="/store">How to buy</Link>
            <Link to="/orders">{t('nav.orders')}</Link>
            <a href="#faq">FAQ</a>
            <a href="#refunds">Refund policy</a>
          </div>
          <div>
            <h3>{t('common.footerPartners')}</h3>
            <a href="#partners">Become a partner</a>
            <a href="#sell">Sell on Intus</a>
            <a href="#advertise">Advertise with us</a>
            <a href="#giveaway">{t('nav.giveaway')}</a>
          </div>
          <div>
            <h3>{t('common.footerLegal')}</h3>
            <a href="#terms">Terms of service</a>
            <a href="#privacy">Privacy notice</a>
            <a href="#cookies">Cookie settings</a>
            <a href="#trust">Trust and transparency</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Intus Marketplace. {t('common.rights')}</span>
          <span className="payment-strip">{t('common.paymentMethods')}</span>
          <span className="social-strip">Facebook · X · Instagram · Discord · Reddit</span>
        </div>
      </div>
    </footer>
  )
}
