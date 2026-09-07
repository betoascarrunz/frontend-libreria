# Analy's Librería

Frontend desarrollado con React y Vite para administrar productos, pedidos y ventas de una librería.

## Información académica

- **Maestrante:** Beto Roberto Ascarrunz Quispe
- **Actividad:** Evaluación práctica, semana 2
- **Tema:** Desarrollo de una aplicación web con backend y frontend conectada a una API REST

## Tecnologías

- React 19
- Vite 8
- Laravel 12 como backend
- SQLite como base de datos del backend
- `fetch` para las peticiones HTTP

## Requisitos

- Node.js 20 o superior
- npm
- PHP 8.2 o superior
- Composer
- Laravel 12
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

Desde la carpeta del backend:

```bash
cd backend-libreria
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve --host=127.0.0.1 --port=8000
```

Si la base de datos SQLite todavía no existe, créala antes de ejecutar las migraciones:

```bash
touch database/database.sqlite
php artisan migrate
```

En el archivo `.env` del backend:

```env
DB_CONNECTION=sqlite
DB_DATABASE=/ruta/absoluta/al/backend-libreria/database/database.sqlite
```

## Configuración CORS

El navegador debe permitir peticiones desde Vite. En Laravel, revisa `config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173'],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'supports_credentials' => false,
```

Después de cambiar la configuración:

```bash
php artisan config:clear
php artisan cache:clear
```

Si Vite usa otro puerto, reemplázalo en `allowed_origins`.

## Endpoints utilizados

| Recurso | Endpoint |
| --- | --- |
| Productos | `http://127.0.0.1:8000/api/productos` |
| Pedidos | `http://127.0.0.1:8000/api/pedidos` |
| Ventas | `http://127.0.0.1:8000/api/ventas` |

Operaciones disponibles para cada recurso:

| Operación | Método | URL |
| --- | --- | --- |
| Listar | `GET` | `/api/{recurso}` |
| Registrar | `POST` | `/api/{recurso}` |
| Actualizar | `PUT` | `/api/{recurso}/{id}` |
| Eliminar | `DELETE` | `/api/{recurso}/{id}` |

## Datos enviados a la API

### Pedidos

```json
{
	"nombre_cliente": "María Fernández",
	"fecha": "2026-08-28",
	"producto_id": 1,
	"cantidad": 3,
	"prioridad": "Normal",
	"estado": "Pendiente"
}
```

### Ventas

```json
{
	"nombre_cliente": "María Fernández",
	"fecha": "2026-08-28",
	"producto_id": 1,
	"cantidad": 3,
	"metodo_pago": "Efectivo",
	"total": 185.00
}
```

### Productos

```json
{
	"nombre": "Cuaderno espiral tamaño carta",
	"categoria": "Cuadernos",
	"precio": 45.00,
	"stock": 32
}
```

`producto_id` debe corresponder a un producto existente en la base de datos.

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

Cada página tiene su propio código. Solamente se comparten el layout y los módulos de conexión API.

## Problemas frecuentes

### Error de CORS

Verifica que Laravel esté en el puerto `8000`, que Vite esté en un origen permitido y ejecuta:

```bash
php artisan config:clear
```

### Error de validación

El frontend muestra los mensajes enviados por Laravel en `response.errors` o `response.message`. Comprueba que los nombres de los campos coincidan con las reglas del controlador.

### No se puede eliminar un producto

Si un producto está relacionado con un pedido o una venta, SQLite puede devolver:

```text
FOREIGN KEY constraint failed
```

Esto significa que existen registros relacionados mediante `producto_id`. Se recomienda impedir el borrado y mostrar un mensaje indicando que el producto tiene registros asociados, o utilizar borrado lógico con `SoftDeletes`.

### La API devuelve datos dentro de `data`

El frontend acepta respuestas directas o respuestas Laravel Resource:

```json
[
	{ "id": 1 }
]
```

```json
{
	"data": [
		{ "id": 1 }
	]
}
```

## Flujo de trabajo

1. Iniciar el backend Laravel en el puerto `8000`.
2. Iniciar el frontend con `npm run dev`.
3. Abrir `http://localhost:5173`.
4. Entrar al panel desde la opción de inicio de sesión.
5. Probar los módulos de productos, pedidos y ventas.