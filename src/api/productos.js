import { getAuthHeaders } from './auth'

const API_URL = 'http://127.0.0.1:8000/api/productos'

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const validationErrors = payload?.errors
      ? Object.values(payload.errors).flat().join(' ')
      : ''
    const message = validationErrors || payload?.message || 'No se pudo completar la operación.'
    throw new Error(message)
  }

  return payload
}

export function getProductos() {
  return request(API_URL, { method: 'GET' })
}

export function createProducto(producto) {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify(producto),
  })
}

export function updateProducto(id, producto) {
  return request(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(producto),
  })
}

export function deleteProducto(id) {
  return request(`${API_URL}/${id}`, { method: 'DELETE' })
}

export function getProductoId(producto) {
  return producto.id ?? producto.id_producto ?? producto.producto_id ?? producto.product_id ?? producto.codigo
}

export function getProductoValue(producto, ...keys) {
  return keys.reduce((value, key) => value ?? producto[key], undefined)
}
