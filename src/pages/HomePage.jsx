import { useEffect, useState } from 'react'
import { Footer, Header, Link } from '../components/Layout'
import { getUser } from '../api/auth'
import { getTotales, getUltimasVentas, getUltimosPedidos } from '../api/dashboard'

const summaries = [
  ['◷', 'Productos', '2', '/productos', 'Ver productos'],
  ['✓', 'Ventas de productos', '8', '/ventas', 'Ver ventas'],
  ['♡', 'Registro de Pedidos', '6', '/pedidos', 'Ver pedidos'],
]

const user = getUser()

function TotalesCard({ summary, featured }) {
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

function UltimasVentas({ ventas }) {
  //console.log('ventas', ventas)
  return (
    <section className="panel-dashboard">
      <div className="encabezado-panel">
        <div>
          <p className="etiqueta">Seguimiento</p>
          <h2>Ventas recientes</h2>
        </div>
        <Link className="enlace-texto" href="/ventas">Ver todos</Link>
      </div>

      {ventas.map((venta) => (
        <div className="pedido" key={venta.id}>
          <div>
            <strong>{venta.id} - {venta.producto.nombre}</strong>
            <p>Realizado el {venta.fecha}</p>
          </div>

          <span className={`estado-enviado`}>{venta.metodo_pago}</span>
          <strong>{venta.total}</strong>
        </div>
      ))}
    </section>
  )
}

function UserProfile() {
  
  return (
    <aside className="panel-dashboard panel-perfil">
      <div className="avatar-usuario">{user?.name?.charAt(0) || ''}</div>
      <p className="etiqueta">Mi cuenta</p>
      <h2>{user?.name || 'S/N'}</h2>
      <p className="correo-usuario">{user?.email || 'S/E'}</p>
    
    </aside>
  )
}

function UltimosPedidos({ pedidos }) {
  return (
    <section className="panel-dashboard">
      <div className="encabezado-panel">
        <h2>Últimos pedidos</h2>
        <Link className="enlace-texto" href="/pedidos">Ver todos</Link>
      </div>

      <div className="favoritos-lista">
        {pedidos.map(pedido => (
          <div className="favorito-item" key={pedido.id}>
            <span>{pedido.cantidad}</span>
            <div>
              <strong>{pedido.prioridad}</strong>
              <p>{pedido.estado}</p>
            </div>
            <div>
              <span className="precio">{pedido.producto.nombre}</span>
              <p className="fecha">{pedido.nombre_cliente}</p>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  const [totales, setTotales] = useState([])
  const [ultimosPedidos, setUltimosPedidos] = useState([])
  const [ultimasVentas, setUltimasVentas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
   const [busqueda, setBusqueda] = useState('')

    useEffect(() => {
        getTotales()
            .then(response => setTotales(response || []))
            .catch(apiError => setError(apiError.message))
            .finally(() => setCargando(false))
    }, [])
    //console.log('totales productos', totales )
    summaries[0][2] = totales?.total_productos || '0'
    summaries[1][2] = totales?.total_ventas || '0'
    summaries[2][2] = totales?.total_pedidos || '0'

    useEffect(() => {
        getUltimosPedidos()
            .then(response => setUltimosPedidos(Array.isArray(response) ? response : response?.data?.data || response?.data || []))
            .catch(apiError => setError(apiError.message))
            .finally(() => setCargando(false))
    }, [])

    useEffect(() => {
        getUltimasVentas()
            .then(response => setUltimasVentas(Array.isArray(response) ? response : response?.data?.data || response?.data || []))
            .catch(apiError => setError(apiError.message))
            .finally(() => setCargando(false))
    }, [])
    
    //console.log('ultimas ventas', ultimasVentas )
  return (
    <div className="pagina-dashboard">
      <Header active="panel" />

      <main className="contenido-dashboard">
        <div className="contenedor">
          <section className="bienvenida-dashboard">
            <div>
              <p className="etiqueta">Panel personal</p>
              <h1>Hola, {user?.name || 'S/N'}.</h1>
              <p>Este es el resumen de tu actividad en Analy's Librería.</p>
            </div>
          </section>

          <section className="resumen-dashboard">
            {summaries.map((summary, index) => (
              <TotalesCard key={summary[1]} summary={summary} featured={index === 0} />
            ))}
          </section>

          <div className="rejilla-dashboard">
            <UltimasVentas ventas={ultimasVentas} />
            <UserProfile />
            <UltimosPedidos pedidos={ultimosPedidos} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
