import { useEffect, useState } from 'react'
import { Footer, Header, Link } from '../components/Layout'
import { deleteProducto, getProductoId, getProductoValue, getProductos } from '../api/productos'

function ProductoRow({ producto, onDelete }) {
    const id = getProductoId(producto)
    const nombre = getProductoValue(producto, 'nombre', 'name', 'producto') || 'Sin nombre'
    const categoria = getProductoValue(producto, 'categoria', 'category') || 'Sin categoría'
    const precio = Number(getProductoValue(producto, 'precio', 'price') || 0)
    const stock = Number(getProductoValue(producto, 'stock', 'cantidad') || 0)
    const disponible = stock > 0

    return (
    <tr>
        <td>
            <strong>{nombre}</strong>
            <small>{categoria}</small>
        </td>
        <td>{categoria}</td>
        <td>Bs. {precio.toFixed(2)}</td>
        <td>{stock}</td>
        <td>
            <span className={`estado ${disponible ? 'estado-enviado' : 'estado-agotado'}`}>{disponible ? 'Disponible' : 'Agotado'}</span></td>
        <td>
            <Link className="accion-producto" href={`/registro-producto?id=${id}`}>Editar</Link>{' '}
            <button className="accion-producto" type="button" onClick={() => onDelete(id)}>Eliminar</button>
        </td>
    </tr>
    )
}

export default function ProductosPage() {
    const [productos, setProductos] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        getProductos()
            .then(response => setProductos(Array.isArray(response) ? response : response?.data?.data || response?.data || []))
            .catch(apiError => setError(apiError.message))
            .finally(() => setCargando(false))
    }, [])

    const eliminarProducto = async id => {
        if (!id || !window.confirm('¿Deseas eliminar este producto?')) return
        try {
            await deleteProducto(id)
            setProductos(actuales => actuales.filter(producto => getProductoId(producto) !== id))
        } catch (apiError) { setError(apiError.message) }
    }

    const productosFiltrados = productos.filter(producto => {
        const texto = `${getProductoValue(producto, 'nombre', 'name', 'producto') || ''} ${getProductoValue(producto, 'categoria', 'category') || ''}`
        return texto.toLowerCase().includes(busqueda.toLowerCase())
    })

    return (
        <div className="pagina-dashboard">
            <Header active="productos" />
            <main className="contenido-dashboard contenido-productos">
                <div className="contenedor">
                    <section className="encabezado-productos">
                        <div>
                            <p className="etiqueta">Gestión de inventario</p>
                            <h1>Materiales escolares.</h1>
                            <p>Administra los productos disponibles en tu librería.</p>
                        </div>
                        <Link className="boton" href="/registro-producto">+ Registrar nuevo producto</Link>
                    </section>
                    <section className="barra-productos">
                        <label className="buscador-productos">
                            <span>⌕</span>
                            <input type="search" placeholder="Buscar por nombre o categoría" value={busqueda} onChange={event => setBusqueda(event.target.value)} />
                        </label>
                    </section>
                    <section className="panel-dashboard tabla-productos">
                        <div className="encabezado-panel">
                            <div>
                                <p className="etiqueta">Inventario actual</p>
                                <h2>Lista de productos</h2>
                            </div>
                            <span className="contador-productos">{productos.length} productos</span>
                        </div>
                        {cargando && <p>Cargando productos...</p>}{error && <p role="alert">{error}</p>}
                        {!cargando && !error && <div className="tabla-contenedor">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productosFiltrados.map(producto => (
                                        <ProductoRow key={getProductoId(producto)} producto={producto} onDelete={eliminarProducto} />
                                    ))}
                                </tbody>
                            </table>
                        </div>}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    )
}
