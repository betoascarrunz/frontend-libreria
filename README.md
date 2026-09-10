# Analy's Librería

Frontend desarrollado con React y Vite para administrar productos, pedidos y ventas de una librería.

## Información académica

- **Maestrante:** Beto Roberto Ascarrunz Quispe
- **Actividad:** Evaluación práctica, semana 2
- **Tema:** Desarrollo de una aplicación web con backend y frontend conectada a una API REST

## Tecnologías

- React 19
- Vite 8

## Requisitos

- Node.js 20 o superior
- npm
- Backend ejecutándose en `http://127.0.0.1:8000`

## Instalación del frontend

Desde la carpeta del proyecto:

```bash
cd frontend-libreria
npm install
```

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en `http://localhost:5173`.

Comandos adicionales:

```bash
npm run build    # Genera la versión de producción

## Configuración del backend Laravel

El frontend espera que el backend Laravel esté en `http://127.0.0.1:8000`.
```

## Estructura principal

```text
src/
	api/
		productos.js       # CRUD de productos
		recursos.js        # CRUD de pedidos y ventas
	components/
		Layout.jsx         # Encabezado, navegación y pie compartidos
		navigation.js      # Navegación interna
	pages/               # Una implementación independiente por página
```

## Flujo de trabajo

1. Iniciar el backend Laravel en el puerto `8000`.
2. Iniciar el frontend con `npm run dev`.
3. Abrir `http://localhost:5173`.
4. Entrar al panel desde la opción de inicio de sesión.
5. Probar los módulos de productos, pedidos y ventas.