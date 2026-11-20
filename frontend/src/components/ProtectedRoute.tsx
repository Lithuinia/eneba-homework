import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const location = useLocation()

  if (loading) {
    return <div className="page-state">{t('common.loading')}</div>
  }

  if (!user) {
    const returnTo = `${location.pathname}${location.search}`
    return <Navigate to={`/login?returnTo=${encodeURIComponent(returnTo)}`} replace />
  }

  return <Outlet />
}
