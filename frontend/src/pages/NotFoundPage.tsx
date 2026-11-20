import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function NotFoundPage() {
  const { t } = useLanguage()
  return (
    <div className="page-state">
      <span className="eyebrow">404</span>
      <h1>{t('common.error')}</h1>
      <Link className="btn btn-primary" to="/">
        {t('common.home')}
      </Link>
    </div>
  )
}
