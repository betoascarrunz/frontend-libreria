import { getAuthHeaders } from './auth'

const API_URLS = {
  pedidos: 'http://127.0.0.1:8000/api/pedidos',
  ventas: 'http://127.0.0.1:8000/api/ventas',
}

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
    throw new Error(validationErrors || payload?.message || 'No se pudo completar la operación.')
  }

  return payload
}

function getUrl(type, id) {
  return id ? `${API_URLS[type]}/${id}` : API_URLS[type]
}

export function getRecursos(type) {
  return request(getUrl(type), { method: 'GET' })
}

export function createRecurso(type, data) {
  return request(getUrl(type), {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateRecurso(type, id, data) {
  return request(getUrl(type, id), {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteRecurso(type, id) {
  return request(getUrl(type, id), { method: 'DELETE' })
}

export function getRecursoId(resource) {
  return resource.id ?? resource.id_pedido ?? resource.id_venta ?? resource.pedido_id ?? resource.venta_id ?? resource.codigo
}

export function getRecursoValue(resource, ...keys) {
  return keys.reduce((value, key) => value ?? resource[key], undefined)
}

export function getResourceList(response) {
  return Array.isArray(response) ? response : response?.data?.data || response?.data || []
}
