import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { safeReturnTo } from '../utils'

export function RegisterPage() {
  const { t } = useLanguage()
  const { register } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const returnTo = safeReturnTo(searchParams.get('returnTo'))
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [marketing, setMarketing] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async () => {
    setBusy(true)
    setError('')
    try {
      await register({ name, email, password })
      navigate(returnTo, { replace: true })
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : t('common.error'))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-panel auth-intro">
        <span className="eyebrow">INTUS</span>
        <h1>{t('auth.registerTitle')}</h1>
        <p>{t('auth.registerSubtitle')}</p>
      </section>
      <section className="auth-panel auth-form-panel">
        <h2>{t('auth.register')}</h2>
        <form
          className="auth-form"
          onSubmit={(event) => {
            event.preventDefault()
            void submit()
          }}
        >
          <label className="field">
            <span>{t('auth.name')}</span>
            <input
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>{t('auth.email')}</span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>{t('auth.password')}</span>
            <input
              type="password"
              autoComplete="new-password"
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(event) => setMarketing(event.target.checked)}
            />
            <span>{t('auth.marketing')}</span>
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
            {busy ? t('auth.creating') : t('auth.register')}
          </button>
        </form>
        <p className="muted auth-hint">{t('auth.terms')}</p>
        <p className="auth-switch">
          {t('auth.haveAccount')} <Link to="/login">{t('auth.signIn')}</Link>
        </p>
      </section>
    </div>
  )
}
