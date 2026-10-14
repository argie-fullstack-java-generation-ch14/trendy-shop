# Trendy Shop

Trendy Shop es una tienda virtual desarrollada como proyecto formativo de **Generation Colombia**. El sitio permite explorar un catálogo de productos, consultar información de la tienda y acceder a las secciones de contacto y carrito de compras.

## Tabla de contenido

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos](#requisitos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Uso de la aplicación](#uso-de-la-aplicación)
- [Datos de productos](#datos-de-productos)
- [Desarrollo y contribuciones](#desarrollo-y-contribuciones)
- [Despliegue](#despliegue)

## Características

- Página de inicio con presentación de la tienda, carrusel de imágenes y productos destacados.
- Catálogo con búsqueda y filtros por categoría.
- Secciones de información de la tienda y contacto.
- Sección de carrito de compras.
- Diseño adaptable a diferentes tamaños de pantalla.
- Componentes compartidos para la cabecera y el pie de página.

> Algunas funciones y contenidos pueden estar en desarrollo. Verifica en la aplicación la disponibilidad de cada funcionalidad.

## Tecnologías

- **HTML5** para la estructura de las páginas.
- **CSS3** para estilos y animaciones.
- **JavaScript** sin framework para la lógica del lado del cliente.
- **Bootstrap 5.3.8** para el diseño responsivo y componentes visuales.
- **Bootstrap Icons 1.11.3** para iconografía.
- **DummyJSON Products API** como fuente de datos del catálogo.
- **Git y GitHub** para control de versiones y colaboración.

Bootstrap y Bootstrap Icons se cargan mediante CDN, por lo que se necesita conexión a internet para obtener esos recursos.

## Estructura del proyecto

```text
trendy-shop/
├── .github/
│   └── workflows/
│       └── deploy.yml       # Flujo de despliegue a GitHub Pages
├── docs/
│   ├── DESARROLLO.md         # Convenciones y guía técnica del equipo
│   ├── INTEGRACION.md        # Flujo de Pull Requests
│   └── flujo-pr/             # Imágenes de apoyo para crear Pull Requests
├── src/
│   ├── index.html            # Entrada principal de la aplicación
│   ├── inicio/
│   │   ├── index.html
│   │   ├── inicio.css
│   │   └── inicio.js
│   ├── catalogo/
│   │   ├── index.html
│   │   ├── catalogo.css
│   │   └── funcionalidades.js
│   ├── quienes-somos/
│   ├── contactanos/
│   ├── carrito/
│   ├── css/
│   │   └── style.css         # Estilos compartidos
│   ├── js/
│   │   ├── app.js            # Carga de secciones y componentes compartidos
│   │   ├── ui.js             # Utilidades para cargar módulos y parciales
│   │   ├── productos.js
│   │   ├── carrito.js
│   │   └── contador.js
│   ├── partials/
│   │   ├── header.html
│   │   └── footer.html
│   ├── services/
│   │   ├── apiService.js
│   │   ├── productService.js
│   │   └── cartService.js
│   └── assets/
│       └── images/           # Imágenes utilizadas por la tienda
└── README.md
```

## Requisitos

- Un navegador actualizado (Chrome, Firefox, Edge o Safari).
- Conexión a internet para cargar Bootstrap, Bootstrap Icons y los productos desde la API.
- Python 3 **o** Node.js/npm si se desea iniciar un servidor local mediante esos comandos.

El proyecto no requiere un proceso de compilación ni instalar dependencias con `npm install`.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd trendy-shop
```

Reemplaza `<URL_DEL_REPOSITORIO>` por la URL real del repositorio en GitHub.

### 2. Iniciar un servidor local

La página principal carga secciones HTML mediante `fetch()`. Por este motivo, se recomienda abrir el proyecto desde un servidor local y no directamente con `file://`.

**Opción A: Python 3**

Desde la raíz del repositorio, ejecuta:

```bash
python3 -m http.server 8000 --directory src
```

**Opción B: Node.js**

Si tienes Node.js/npm instalado, puedes usar:

```bash
npx serve src
```

### 3. Abrir la aplicación

Si utilizaste Python, abre en el navegador:

```text
http://localhost:8000
```

Si utilizaste `npx serve`, abre la dirección local que muestre la terminal.

Para detener el servidor de Python, vuelve a la terminal y presiona `Ctrl + C`.

## Uso de la aplicación

1. Abre la página principal desde la dirección local.
2. Usa la navegación para acceder al inicio, catálogo, información de la tienda y contacto.
3. En el catálogo, utiliza el campo de búsqueda y los filtros disponibles para encontrar productos.
4. Consulta las opciones del carrito desde la navegación.
5. Para volver a la página principal, selecciona **Inicio** en el menú.

La disponibilidad de algunas acciones depende de la implementación actual de cada módulo.

## Datos de productos

El servicio `src/services/productService.js` consulta la API pública de DummyJSON:

```text
https://dummyjson.com/products?limit=0
```

Para que el catálogo obtenga los productos, el navegador debe tener conexión a internet y la API debe estar disponible. Si la consulta falla, revisa la consola del navegador y la conexión de red.

## Desarrollo y contribuciones

El equipo trabaja con ramas y Pull Requests para integrar cambios a `main`.

Antes de empezar a trabajar:

```bash
git checkout main
git pull origin main
git checkout -b iniciales/nombre-de-la-pagina
```

Al terminar los cambios:

```bash
git add .
git commit -m "feat: descripción breve del cambio"
git push origin iniciales/nombre-de-la-pagina
```

Después, crea un Pull Request en GitHub hacia `main` y solicita la revisión de un compañero.

Convenciones importantes del equipo:

- Cada integrante trabaja en los archivos de la página que tiene asignada.
- Los cambios en archivos compartidos deben coordinarse con el equipo.
- Los nombres de ramas usan el formato `iniciales/nombre-de-la-pagina`.
- Los mensajes de commit comienzan con un prefijo como `feat:`, `fix:`, `docs:`, `style:` o `refactor:`.
- No se debe hacer `git push --force` sobre `main`.

Consulta [docs/DESARROLLO.md](docs/DESARROLLO.md) para conocer las convenciones técnicas y [docs/INTEGRACION.md](docs/INTEGRACION.md) para el procedimiento de Pull Requests.

## Despliegue

El repositorio incluye un workflow de GitHub Actions en `.github/workflows/deploy.yml` que publica el contenido de la carpeta `src/` en GitHub Pages cuando se actualiza la rama `main` o se ejecuta manualmente el workflow.

Para habilitar el despliegue, configura GitHub Pages para utilizar **GitHub Actions** en la configuración del repositorio.

---

Proyecto académico desarrollado por el equipo de Trendy Shop.
