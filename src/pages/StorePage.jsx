import { Footer, Header, Link } from '../components/Layout'

const products = [
  {
    color: 'portada-verde',
    title: 'Cuadernos',
    subtitle: 'Espiral',
    brand: 'Artesanal',
    category: 'Cuaderno espiral',
    name: 'Tamaño carta cuadricula normal',
  },
  {
    color: 'portada-coral',
    title: 'Bolígrafos',
    subtitle: 'Azul - Negro - Rojo',
    brand: 'Sabonis',
    category: 'Bolígrafos',
    name: 'Bolígrafos de tinta',
  },
  {
    color: 'portada-azul',
    title: 'Pegamento',
    subtitle: 'Carpicola Blanca',
    brand: 'Monopol',
    category: 'Pegamento',
    name: 'Pegamento carpicola blanca',
  },
  {
    color: 'portada-amarilla',
    title: 'Regalos',
    subtitle: 'Muñecas Barbie',
    brand: 'Coleccion',
    category: 'Regalos',
    name: 'Muñecas Barbie',
  },
]

const categories = ['Regalos', 'Papel', 'Pegamentos', 'Material escolar']

function ProductCard({ product }) {
  return (
    <article className="tarjeta-producto">
      <div className={`portada-producto ${product.color}`}>
        <span>
          {product.title}<br />
          {product.subtitle}
        </span>
        <small>{product.brand}</small>
      </div>
      <div className="info-producto">
        <p className="categoria-producto">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="autor">{product.brand}</p>
      </div>
    </article>
  )
}

function Hero() {
  return (
    <section className="portada">
      <div className="contenedor contenido-portada">
        <div className="texto-portada">
          <p className="etiqueta">Historias que dejan huella</p>
          <h1>Encuentra tu material <em>escolar.</em></h1>
          <p className="descripcion-portada">
            Materiales didácticos para el aula y el estudio.
          </p>
          <Link className="boton" href="/#catalogo">
            Explorar catálogo <span>→</span>
          </Link>
        </div>

        <div className="ilustracion-portada" role="img" aria-label="Ilustración de productos">
          <div className="sol" />
          <div className="producto producto-atras">
            IMPRESIONES<br />B/N - COLORES
          </div>
          <div className="producto producto-medio">
            MATERIAL<br />ESCOLAR
          </div>
          <div className="producto producto-frontal">
            REGALOS<br />RECARGAS
          </div>
        </div>
      </div>
    </section>
  )
}

function Catalog() {
  return (
    <section className="seccion" id="catalogo">
      <div className="contenedor">
        <div className="encabezado-seccion">
          <div>
            <p className="etiqueta">Selección de la semana</p>
            <h2>Favoritos de nuestra librería</h2>
          </div>
          <Link className="enlace-texto" href="/productos">
            Ver todo el catálogo <span>→</span>
          </Link>
        </div>

        <div className="rejilla-productos">
          {products.map(product => (
            <ProductCard product={product} key={product.name} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Categories() {
  return (
    <section className="seccion-categorias" id="categorias">
      <div className="contenedor contenido-categorias">
        <div>
          <p className="etiqueta">Busca por categoría</p>
          <h2>Un material para<br /><em>cada momento.</em></h2>
        </div>
        <div className="lista-categorias">
          {categories.map(category => (
            <Link href="/#catalogo" key={category}>
              {category} <span>↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function StorePage() {
  return (
    <>
      <Header publicSite active="inicio" />
      <main id="inicio">
        <Hero />
        <Catalog />
        <Categories />
      </main>
      <Footer publicSite />
    </>
  )
}
