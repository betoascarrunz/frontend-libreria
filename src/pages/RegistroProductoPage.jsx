import { useEffect, useState } from 'react'
import { Footer, Header, Link } from '../components/Layout'
import { goTo } from '../components/navigation'
import { createProducto, getProductoId, getProductoValue, getProductos, updateProducto } from '../api/productos'

export default function RegistroProductoPage() {
  const id = new URLSearchParams(window.location.search).get('id')
  const [values, setValues] = useState({ nombre: '', categoria: '', precio: '', stock: '' })
  const [cargando, setCargando] = useState(Boolean(id))
  const [error, setError] = useState('')
  useEffect(() => { if (!id) return; getProductos().then(response => { const lista = Array.isArray(response) ? response : response?.data?.data || response?.data || []; const producto = lista.find(item => String(getProductoId(item)) === id); if (producto) setValues({ nombre: getProductoValue(producto, 'nombre', 'name', 'producto') || '', categoria: getProductoValue(producto, 'categoria', 'category') || '', precio: getProductoValue(producto, 'precio', 'price') || '', stock: getProductoValue(producto, 'stock', 'cantidad') || '' }) }).catch(apiError => setError(apiError.message)).finally(() => setCargando(false)) }, [id])
  const change = field => event => setValues(current => ({ ...current, [field]: event.target.value }))
  const submit = async event => { event.preventDefault(); try { const data = { nombre: values.nombre, categoria: values.categoria, precio: Number(values.precio), stock: Number(values.stock) }; if (id) await updateProducto(id, data); else await createProducto(data); goTo('/productos') } catch (apiError) { setError(apiError.message) } }
  return (
    <div className="pagina-dashboard">
      <Header active="productos" />
      <main className="contenido-dashboard contenido-productos">
        <div className="contenedor">
          <section className="encabezado-productos">
            <div>
              <p className="etiqueta">Gestión de inventario</p>
              <h1>{id ? 'Editar producto' : 'Registrar producto'}</h1>
              <p>Agrega un nuevo material escolar al inventario de la librería.</p>
            </div>
            <Link className="boton" href="/productos">Volver a productos</Link>
          </section>
          <section className="panel-dashboard registro-producto">
            <div className="encabezado-panel">
              <p className="etiqueta">Nuevo registro</p>
              <h2>Datos del producto</h2>
            </div>
            <form className="formulario-producto" onSubmit={submit}>
              {error && <p role="alert">{error}</p>}
              {cargando && <p>Cargando producto...</p>}
              <div className="campo-producto">
                <label>Nombre del producto</label>
                <input value={values.nombre} onChange={change('nombre')} required />
              </div>
              <div className="campo-producto">
                <label>Categoría</label>
                <select value={values.categoria} onChange={change('categoria')} required>
                  <option value="">Seleccionar categoría</option>
                  <option>Cuadernos</option>
                  <option>Escritura</option>
                  <option>Pegamentos</option>
                  <option>Arte</option>
                </select>
              </div>
              <div className="campo-producto">
                <label>Precio (Bs.)</label>
                <input type="number" value={values.precio} onChange={change('precio')} required />
              </div>
              <div className="campo-producto">
                <label>Cantidad en stock</label>
                <input type="number" value={values.stock} onChange={change('stock')} required />
              </div>
              <div className="acciones-formulario">
                <button className="boton" type="submit" disabled={cargando}>
                  {id ? 'Actualizar' : 'Guardar producto'}
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
