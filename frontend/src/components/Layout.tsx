import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  return null
}

export function Layout() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Header />
      <main className="page-shell">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
