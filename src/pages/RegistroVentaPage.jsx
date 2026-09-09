import { useEffect, useState } from 'react'
import { Footer, Header, Link } from '../components/Layout'
import { goTo } from '../components/navigation'
import { getProductoId, getProductoValue, getProductos } from '../api/productos'
import { createRecurso, getRecursoId, getRecursoValue, getRecursos, getResourceList, updateRecurso } from '../api/recursos'

export default function RegistroVentaPage() {
    const id = new URLSearchParams(window.location.search).get('id')
    const [productos, setProductos] = useState([])
    const [values, setValues] = useState({ cliente: '', fecha: '', producto_id: '', cantidad: '', metodo_pago: '', total: '' })
    const [cargando, setCargando] = useState(Boolean(id))
    const [error, setError] = useState('')
    useEffect(() => { getProductos().then(response => setProductos(getResourceList(response))).catch(apiError => setError(apiError.message)) }, [])
    useEffect(() => { if (!id) return; getRecursos('ventas').then(response => { const venta = getResourceList(response).find(item => String(getRecursoId(item)) === id); if (venta) setValues({ cliente: getRecursoValue(venta, 'nombre_cliente', 'cliente') || '', fecha: getRecursoValue(venta, 'fecha') || '', producto_id: getRecursoValue(venta, 'producto_id') || getProductoId(getRecursoValue(venta, 'producto') || {}), cantidad: getRecursoValue(venta, 'cantidad') || '', metodo_pago: getRecursoValue(venta, 'metodo_pago', 'pago') || '', total: getRecursoValue(venta, 'total') || '' }) }).catch(apiError => setError(apiError.message)).finally(() => setCargando(false)) }, [id])
    const change = field => event => setValues(current => ({ ...current, [field]: event.target.value }))
    const submit = async event => { event.preventDefault(); try { const data = { nombre_cliente: values.cliente, fecha: values.fecha, producto_id: Number(values.producto_id), cantidad: Number(values.cantidad), metodo_pago: values.metodo_pago, total: Number(values.total) }; if (id) await updateRecurso('ventas', id, data); else await createRecurso('ventas', data); goTo('/ventas') } catch (apiError) { setError(apiError.message) } }
    return (
        <div className="pagina-dashboard">
            <Header active="ventas" />
            <main className="contenido-dashboard contenido-productos">
                <div className="contenedor">
                    <section className="encabezado-productos">
                        <div>
                            <p className="etiqueta">Gestión comercial</p>
                            <h1>{id ? 'Editar venta' : 'Registrar venta'}</h1>
                            <p>Ingresa los datos de la venta realizada.</p>
                        </div>
                        <Link className="boton" href="/ventas">Volver a ventas</Link>
                    </section>
                    <section className="panel-dashboard registro-producto">
                        <div className="encabezado-panel">
                            <p className="etiqueta">Nuevo registro</p>
                            <h2>Datos de la venta</h2>
                        </div>
                        <form className="formulario-venta" onSubmit={submit}>{error && <p role="alert">{error}</p>}
                            <div className="campo-producto">
                                <label>Cliente</label>
                                <input value={values.cliente} onChange={change('cliente')} required /></div>
                            <div className="campo-producto">
                                <label>Fecha</label>
                                <input type="date" value={values.fecha} onChange={change('fecha')} required />
                            </div>
                            <div className="campo-producto">
                                <label>Producto</label>
                                <select value={values.producto_id} onChange={change('producto_id')} required>
                                    <option value="">Seleccionar producto</option>{productos.map(producto => <option key={getProductoId(producto)} value={getProductoId(producto)}>{getProductoValue(producto, 'nombre', 'name', 'producto')}</option>)}
                                </select>
                            </div>
                            <div className="campo-producto">
                                <label>Cantidad</label>
                                <input type="number" min="1" value={values.cantidad} onChange={change('cantidad')} required />
                            </div>
                            <div className="campo-producto">
                                <label>Método de pago</label>
                                <select value={values.metodo_pago} onChange={change('metodo_pago')} required>
                                    <option value="">Seleccionar método</option>
                                    <option>Efectivo</option>
                                    <option>QR</option>
                                    <option>Tarjeta</option>
                                </select>
                            </div>
                            <div className="campo-producto">
                                <label>Total (Bs.)</label>
                                <input type="number" min="0" step="0.01" value={values.total} onChange={change('total')} required />
                            </div>
                            <div className="acciones-formulario">
                                <button className="boton" type="submit" disabled={cargando}>
                                    {id ? 'Actualizar' : 'Guardar venta'}
                                </button>
                                <button className="boton boton-cancelar" type="reset">
                                    Limpiar
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
