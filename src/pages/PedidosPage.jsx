import { useEffect, useState } from 'react'
import { Footer, Header, Link } from '../components/Layout'
import { deleteRecurso, getRecursoId, getRecursoValue, getRecursos, getResourceList } from '../api/recursos'

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => { getRecursos('pedidos').then(response => setPedidos(getResourceList(response))).catch(apiError => setError(apiError.message)).finally(() => setCargando(false)) }, [])

  const eliminarPedido = async id => {
    if (!id || !window.confirm('¿Deseas eliminar este pedido?')) return
    try { await deleteRecurso('pedidos', id); setPedidos(actuales => actuales.filter(pedido => getRecursoId(pedido) !== id)) } catch (apiError) { setError(apiError.message) }
  }

  const resultados = pedidos.filter(pedido => JSON.stringify(pedido).toLowerCase().includes(busqueda.toLowerCase()))
  const estadoClass = estado => estado?.toLowerCase() === 'cancelado' ? 'estado-cancelado' : estado?.toLowerCase() === 'pendiente' ? 'estado-preparando' : 'estado-enviado'

  return <div className="pagina-dashboard"><Header active="pedidos" /><main className="contenido-dashboard contenido-pedidos"><div className="contenedor">
    <section className="encabezado-productos"><div><p className="etiqueta">Gestión de pedidos</p><h1>Pedidos registrados.</h1><p>Consulta los pedidos atendidos y los que todavía están pendientes.</p></div><Link className="boton" href="/registro-pedido">+ Registrar nuevo pedido</Link></section>
    <section className="barra-productos"><label className="buscador-productos"><span>⌕</span><input type="search" placeholder="Buscar por cliente o pedido" value={busqueda} onChange={event => setBusqueda(event.target.value)} /></label></section>
    <section className="panel-dashboard tabla-productos tabla-pedidos"><div className="encabezado-panel"><div><p className="etiqueta">Historial completo</p><h2>Lista de pedidos</h2></div><span className="contador-productos">{pedidos.length} pedidos</span></div>
      {cargando && <p>Cargando pedidos...</p>}{error && <p role="alert">{error}</p>}
      {!cargando && !error && <div className="tabla-contenedor"><table><thead><tr><th>N.º de pedido</th><th>Cliente</th><th>Fecha</th><th>Productos</th><th>Prioridad</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>{resultados.map(pedido => { const id = getRecursoId(pedido); const estado = getRecursoValue(pedido, 'estado') || '-'; return <tr key={id}><td><strong>{getRecursoValue(pedido, 'numero', 'numero_pedido') || `#${id}`}</strong></td><td>{getRecursoValue(pedido, 'nombre_cliente', 'cliente') || '-'}</td><td>{getRecursoValue(pedido, 'fecha') || '-'}</td><td>{getRecursoValue(pedido, 'cantidad') || 0}</td><td>{getRecursoValue(pedido, 'prioridad') || '-'}</td><td><span className={`estado ${estadoClass(estado)}`}>{estado}</span></td><td><Link className="accion-producto" href={`/registro-pedido?id=${id}`}>Editar</Link>{' '}<button className="accion-producto" type="button" onClick={() => eliminarPedido(id)}>Eliminar</button></td></tr> })}</tbody></table></div>}
    </section>
  </div></main><Footer /></div>
}
