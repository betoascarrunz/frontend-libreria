import { Footer, Header, Link } from '../components/Layout'

const summaries = [
  ['◷', 'Productos', '2', '/productos', 'Ver productos'],
  ['✓', 'Ventas de productos', '8', '/ventas', 'Ver ventas'],
  ['♡', 'Registro de Pedidos', '6', '/pedidos', 'Ver pedidos'],
]

const recentSales = [
  ['#AN-2026-024', '28 de agosto de 2026', 'Efectivo', 'Bs. 185.00', 'estado-preparando'],
  ['#AN-2026-018', '20 de agosto de 2026', 'QR', 'Bs. 320.50', 'estado-enviado'],
]

const recentPurchases = [
  ['mini-portada-verde', 'Cuaderno', 'Cuaderno espiral', 'Artesanal', 'Bs. 45.00'],
  ['mini-portada-coral', 'Bolígrafos', 'Set de bolígrafos', 'Sabonis', 'Bs. 28.50'],
]

function SummaryCard({ summary, featured }) {
  const [icon, label, value, href, action] = summary

  return (
    <article className={`tarjeta-resumen ${featured ? 'tarjeta-resumen-destacada' : ''}`}>
      <span className="icono-resumen">{icon}</span>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
      <Link className="boton" href={href}>
        {action} <span>→</span>
      </Link>
    </article>
  )
}

function RecentSales() {
  return (
    <section className="panel-dashboard">
      <div className="encabezado-panel">
        <div>
          <p className="etiqueta">Seguimiento</p>
          <h2>Ventas recientes</h2>
        </div>
        <Link className="enlace-texto" href="/ventas">Ver todos</Link>
      </div>

      {recentSales.map(([number, date, payment, total, status]) => (
        <div className="pedido" key={number}>
          <div>
            <strong>{number}</strong>
            <p>Realizado el {date}</p>
          </div>
          <span className={`estado ${status}`}>{payment}</span>
          <strong>{total}</strong>
        </div>
      ))}
    </section>
  )
}

function UserProfile() {
  return (
    <aside className="panel-dashboard panel-perfil">
      <div className="avatar-usuario">R</div>
      <p className="etiqueta">Mi cuenta</p>
      <h2>Roberto Ascarrunz</h2>
      <p className="correo-usuario">roberto.ascarrunz@email.com</p>
      <a className="boton" href="mailto:hola@analy.test">Editar perfil</a>
    </aside>
  )
}

function RecentPurchases() {
  return (
    <section className="panel-dashboard">
      <div className="encabezado-panel">
        <h2>Últimas compras</h2>
        <Link className="enlace-texto" href="/#catalogo">Ver catálogo</Link>
      </div>

      <div className="favoritos-lista">
        {recentPurchases.map(([cover, coverText, name, brand, price]) => (
          <div className="favorito-item" key={name}>
            <span className={`mini-portada ${cover}`}>{coverText}</span>
            <div>
              <strong>{name}</strong>
              <p>{brand}</p>
            </div>
            <span className="precio">{price}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="pagina-dashboard">
      <Header active="panel" />

      <main className="contenido-dashboard">
        <div className="contenedor">
          <section className="bienvenida-dashboard">
            <div>
              <p className="etiqueta">Panel personal</p>
              <h1>Hola, Roberto.</h1>
              <p>Este es el resumen de tu actividad en Analy's Librería.</p>
            </div>
          </section>

          <section className="resumen-dashboard">
            {summaries.map((summary, index) => (
              <SummaryCard key={summary[1]} summary={summary} featured={index === 0} />
            ))}
          </section>

          <div className="rejilla-dashboard">
            <RecentSales />
            <UserProfile />
            <RecentPurchases />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
