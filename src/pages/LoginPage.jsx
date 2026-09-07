import { Footer, Header } from '../components/Layout'
import { goTo } from '../components/navigation'

function LoginForm() {
  const handleSubmit = event => {
    event.preventDefault()
    goTo('/home')
  }

  return (
    <form className="formulario-login" onSubmit={handleSubmit}>
      <div className="grupo-campo">
        <label htmlFor="correo">Correo electrónico</label>
        <input type="email" id="correo" required />
      </div>

      <div className="grupo-campo">
        <label htmlFor="contrasena">Contraseña</label>
        <input type="password" id="contrasena" required />
      </div>

      <div className="opciones-login">
        <label className="recordarme">
          <input type="checkbox" />
          <span>Recordarme</span>
        </label>
        <a href="mailto:hola@analy.test?subject=Recuperar%20contraseña">
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <button className="boton boton-login" type="submit">Entrar</button>
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
