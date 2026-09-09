const AUTH_URL = 'http://127.0.0.1:8000/api/auth/login'
const AUTH_STORAGE_KEY = 'libreria_auth'

function getStorage(remember = true) {
  return remember ? window.localStorage : window.sessionStorage
}

function getStoredAuth() {
  const stored = window.localStorage.getItem(AUTH_STORAGE_KEY)
    || window.sessionStorage.getItem(AUTH_STORAGE_KEY)

  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    clearAuth()
    return null
  }
}

export async function login(email, password, remember = true) {
  const response = await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const validationErrors = payload?.errors
      ? Object.values(payload.errors).flat().join(' ')
      : ''
    throw new Error(validationErrors || payload?.message || 'No se pudo iniciar sesión.')
  }

  const auth = {
    token: payload?.token || payload?.access_token || payload?.data?.token,
    user: payload?.user || payload?.data?.user || null,
  }

  if (!auth.token) throw new Error('El servidor no devolvió un token de acceso.')

  clearAuth()
  getStorage(remember).setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
  return auth
}

export function getToken() {
  return getStoredAuth()?.token || null
}

export function getUser() {
  return getStoredAuth()?.user || null
}

export function getAuthHeaders() {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function clearAuth() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY)
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
}