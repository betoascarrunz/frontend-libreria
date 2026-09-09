import { useState } from 'react'
import { login } from '../api/auth'
import { Footer, Header } from '../components/Layout'
import { goTo } from '../components/navigation'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password, remember)
      goTo('/home')
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="formulario-login" onSubmit={handleSubmit}>
      <div className="grupo-campo">
        <label htmlFor="correo">Correo electrónico</label>
        <input
          type="email"
          id="correo"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />
      </div>

      <div className="grupo-campo">
        <label htmlFor="contrasena">Contraseña</label>
        <input
          type="password"
          id="contrasena"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
      </div>

      <div className="opciones-login">
        <label className="recordarme">
          <input
            type="checkbox"
            checked={remember}
            onChange={event => setRemember(event.target.checked)}
          />
          <span>Recordarme</span>
        </label>
        <a href="mailto:hola@analy.test?subject=Recuperar%20contraseña">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      {error && <p className="error-formulario" role="alert">{error}</p>}
      <button className="boton boton-login" type="submit" disabled={loading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="pagina-login">
      <Header publicSite active="login" />

      <main className="contenido-login">
        <section className="tarjeta-login">
          <p className="etiqueta">Bienvenido de nuevo</p>
          <h1>Inicia sesión.</h1>
          <p className="descripcion-login">Accede a tu cuenta.</p>
          <LoginForm />
          <p className="registro-login">
            ¿Todavía no tienes una cuenta?{' '}
            <a href="mailto:hola@analy.test?subject=Crear%20una%20cuenta">
              Regístrate
            </a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
