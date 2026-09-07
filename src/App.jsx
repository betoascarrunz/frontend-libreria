import { useEffect, useState } from 'react'
import './assets/styles.css'
import StorePage from './pages/StorePage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProductosPage from './pages/ProductosPage'
import PedidosPage from './pages/PedidosPage'
import VentasPage from './pages/VentasPage'
import RegistroProductoPage from './pages/RegistroProductoPage'
import RegistroPedidoPage from './pages/RegistroPedidoPage'
import RegistroVentaPage from './pages/RegistroVentaPage'

const pageRoutes = {
  '/': StorePage,
  '/login': LoginPage,
  '/home': HomePage,
  '/productos': ProductosPage,
  '/pedidos': PedidosPage,
  '/ventas': VentasPage,
  '/registro-producto': RegistroProductoPage,
  '/registro-pedido': RegistroPedidoPage,
  '/registro-venta': RegistroVentaPage,
}

function App() {
  const getCurrentPath = () => window.location.pathname.replace(/\.html$/, '') || '/'
  const [path, setPath] = useState(getCurrentPath)

  useEffect(() => {
    const updatePage = () => setPath(getCurrentPath())

    const navigateToLink = event => {
      const link = event.target.closest('a')
      const isInternalLink = link && link.origin === window.location.origin
      const hasKnownPage = link && pageRoutes[link.pathname]

      if (!isInternalLink || link.hash || !hasKnownPage) return

      event.preventDefault()
      window.history.pushState({}, '', link.pathname)
      setPath(link.pathname)
    }

    window.addEventListener('popstate', updatePage)
    document.addEventListener('click', navigateToLink)

    return () => {
      window.removeEventListener('popstate', updatePage)
      document.removeEventListener('click', navigateToLink)
    }
  }, [])

  const Page = pageRoutes[path] || StorePage
  return <Page />
}

export default App
