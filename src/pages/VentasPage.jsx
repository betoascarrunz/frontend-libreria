import { useEffect, useState } from 'react'
import { Footer, Header, Link } from '../components/Layout'
import { deleteRecurso, getRecursoId, getRecursoValue, getRecursos, getResourceList } from '../api/recursos'

export default function VentasPage() {
  const [ventas, setVentas] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => { getRecursos('ventas').then(response => setVentas(getResourceList(response))).catch(apiError => setError(apiError.message)).finally(() => setCargando(false)) }, [])

  const eliminarVenta = async id => {
    if (!id || !window.confirm('¿Deseas eliminar esta venta?')) return
    try { await deleteRecurso('ventas', id); setVentas(actuales => actuales.filter(venta => getRecursoId(venta) !== id)) } catch (apiError) { setError(apiError.message) }
  }

  const resultados = ventas.filter(venta => JSON.stringify(venta).toLowerCase().includes(busqueda.toLowerCase()))
  const estadoClass = estado => estado?.toLowerCase() === 'pendiente' ? 'estado-preparando' : 'estado-enviado'

  return (
    <div className="pagina-dashboard">
      <Header active="ventas" />
      <main className="contenido-dashboard contenido-ventas">
        <div className="contenedor">
          <section className="encabezado-productos">
            <div>
              <p className="etiqueta">Gestión comercial</p>
              <h1>Ventas realizadas.</h1>
              <p>Consulta el historial de ventas registradas en la librería.</p>
            </div>
            <Link className="boton" href="/registro-venta">+ Registrar nueva venta</Link>
          </section>
          <section className="barra-productos">
            <label className="buscador-productos">
              <span>⌕</span>
              <input type="search" placeholder="Buscar por cliente o venta" value={busqueda} onChange={event => setBusqueda(event.target.value)} />
            </label>
          </section>
          <section className="panel-dashboard tabla-productos tabla-ventas">
            <div className="encabezado-panel">
              <div>
                <p className="etiqueta">Historial completo</p>
                <h2>Lista de ventas</h2>
              </div>
              <span className="contador-productos">{ventas.length} ventas</span>
            </div>
            {cargando && <p>Cargando ventas...</p>}{error && <p role="alert">{error}</p>}
            {!cargando && !error && <div className="tabla-contenedor">
              <table>
                <thead>
                  <tr>
                    <th>N.º de venta</th>
                    <th>Cliente</th>
                    <th>Fecha</th>
                    <th>Productos</th>
                    <th>Pago</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>{resultados.map(venta => {
                  const id = getRecursoId(venta);
                  const estado = getRecursoValue(venta, 'estado') || '-';
                  return (
                    <tr key={id}>
                      <td><strong>{getRecursoValue(venta, 'numero', 'numero_venta') || `#${id}`}</strong></td>
                      <td>{getRecursoValue(venta, 'nombre_cliente', 'cliente') || '-'}</td>
                      <td>{getRecursoValue(venta, 'fecha') || '-'}</td>
                      <td>{getRecursoValue(venta, 'cantidad') || 0}</td>
                      <td>{getRecursoValue(venta, 'metodo_pago', 'pago') || '-'}</td>
                      <td><strong>Bs. {Number(getRecursoValue(venta, 'total') || 0).toFixed(2)}</strong></td>
                      <td><span className={`estado ${estadoClass(estado)}`}>{estado}</span></td>
                      <td><Link className="accion-producto" href={`/registro-venta?id=${id}`}>Editar</Link>{' '}<button className="accion-producto" type="button" onClick={() => eliminarVenta(id)}>Eliminar</button></td>
                    </tr>
                  )
                })}</tbody>
              </table>
            </div>}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
