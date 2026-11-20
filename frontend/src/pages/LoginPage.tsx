import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { safeReturnTo } from '../utils'

export function LoginPage() {
  const { t } = useLanguage()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const returnTo = safeReturnTo(searchParams.get('returnTo'))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (nextEmail = email, nextPassword = password) => {
    setBusy(true)
    setError('')
    try {
      await login({ email: nextEmail, password: nextPassword })
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
        <h1>{t('auth.loginTitle')}</h1>
        <p>{t('auth.loginSubtitle')}</p>
      </section>
      <section className="auth-panel auth-form-panel">
        <h2>{t('auth.signIn')}</h2>
        <form
          className="auth-form"
          onSubmit={(event) => {
            event.preventDefault()
            void submit()
          }}
        >
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
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
            {busy ? t('auth.signingIn') : t('auth.signIn')}
          </button>
        </form>
        <button
          type="button"
          className="btn btn-ghost btn-block"
          onClick={() => {
            setEmail('demo@intus.test')
            setPassword('password')
            void submit('demo@intus.test', 'password')
          }}
          disabled={busy}
        >
          {t('auth.demo')}
        </button>
        <p className="muted auth-hint">{t('auth.demoHint')}</p>
        <p className="auth-switch">
          {t('auth.noAccount')} <Link to="/register">{t('auth.createAccount')}</Link>
        </p>
      </section>
    </div>
  )
}
