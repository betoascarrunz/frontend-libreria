import { getAuthHeaders } from './auth'

const API_URL = 'http://127.0.0.1:8000/api/dashboard'

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
  //console.log('API request', url, options, response.status, payload)
  if (!response.ok) {
    const validationErrors = payload?.errors
      ? Object.values(payload.errors).flat().join(' ')
      : ''
    const message = validationErrors || payload?.message || 'No se pudo completar la operación.'
    throw new Error(message)
  }

  return payload
}

export function getTotales() {
  return request(API_URL+'/totales', { method: 'GET' })
}

export function getUltimosPedidos() {
  return request(API_URL+'/ultimos-pedidos', { method: 'GET' })
}

export function getUltimasVentas() {
  return request(API_URL+'/ultimas-ventas', { method: 'GET' })
}