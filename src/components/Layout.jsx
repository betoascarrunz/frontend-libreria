import { clearAuth } from '../api/auth'
import { goTo } from './navigation'

export function Link({ href, children, ...props }) {
  return <a href={href} {...props}>{children}</a>
}

const publicLinks = [
  ['/', 'Inicio'],
  ['/#catalogo', 'Catálogo'],
  ['/#categorias', 'Categorías'],
]

const privateLinks = [
  ['/home', 'Panel'],
  ['/productos', 'Productos'],
  ['/ventas', 'Ventas'],
  ['/pedidos', 'Pedidos'],
]

function Brand({ href }) {
  return (
    <Link className="marca" href={href}>
      <span className="marca-simbolo">A</span>
      <span>
        Analy's<span className="marca-punto">.</span>
      </span>
    </Link>
  )
}

export function Header({ active = '', publicSite = false }) {
  const links = publicSite ? publicLinks : privateLinks
  const homePath = publicSite ? '/' : '/home'
  const handleLogout = event => {
    event.preventDefault()
    clearAuth()
    goTo('/login')
  }

  return (
    <header className="encabezado-sitio">
      <div className="contenedor contenido-encabezado">
        <Brand href={homePath} />

        <nav className="navegacion-principal" aria-label="Navegación principal">
          {links.map(([href, text]) => (
            <Link
              className={active === text.toLowerCase() ? 'activo' : ''}
              href={href}
              key={text}
            >
              {text}
            </Link>
          ))}
        </nav>

        <Link
          className={`enlace-login ${active === 'login' ? 'activo' : ''}`}
          href="/login"
          onClick={publicSite ? undefined : handleLogout}
        >
          {publicSite ? 'Inicia Sesión' : 'Cerrar sesión'}
        </Link>
      </div>
    </header>
  )
}

export function Footer({ publicSite = false }) {
  return (
    <footer className={`pie-sitio ${publicSite ? '' : 'pie-dashboard'}`}>
      <div className="contenedor contenido-pie">
        {publicSite && (
          <div>
            <Brand href="/" />
            <p>
              Una buena historia siempre<br />
              encuentra su momento.
            </p>
          </div>
        )}

        {publicSite && (
          <div className="nota-pie">
            <span>¿Necesitas una recomendación?</span>
            <a href="mailto:hola@analy.test">hola@analy.test</a>
          </div>
        )}

        <p className="derechos">© 2026 Analy's Librería. Todos los derechos reservados.</p>

        {!publicSite && (
          <Link className="enlace-texto" href="/home">
            Volver a la tienda
          </Link>
        )}
      </div>
    </footer>
  )
}
