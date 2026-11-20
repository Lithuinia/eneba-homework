import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { api } from '../api'
import type { AuthPayload, User } from '../types'

interface AuthContextValue {
  user: User | null
  loading: boolean
  login: (payload: AuthPayload) => Promise<User>
  register: (payload: AuthPayload & { name: string }) => Promise<User>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)
const AUTH_EVENT_KEY = 'intus_auth_event'

function broadcastAuthEvent(type: 'login' | 'logout') {
  try {
    localStorage.setItem(AUTH_EVENT_KEY, JSON.stringify({ type, at: Date.now() }))
  } catch {
    return
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const result = await api.me()
      setUser(result.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== AUTH_EVENT_KEY || !event.newValue) {
        return
      }
      try {
        const payload = JSON.parse(event.newValue) as { type?: string }
        if (payload.type === 'logout') {
          setUser(null)
        } else if (payload.type === 'login') {
          void refresh()
        }
      } catch {
        return
      }
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [refresh])

  const login = useCallback(async (payload: AuthPayload) => {
    const result = await api.login(payload)
    setUser(result.user)
    broadcastAuthEvent('login')
    return result.user
  }, [])

  const register = useCallback(async (payload: AuthPayload & { name: string }) => {
    const result = await api.register(payload)
    setUser(result.user)
    broadcastAuthEvent('login')
    return result.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.logout()
    } finally {
      setUser(null)
      broadcastAuthEvent('logout')
    }
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, login, register, logout, refresh }),
    [user, loading, login, register, logout, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
