import { obtenerProductos } from "../services/productService.js";
import { mostrarProductos, mostrarDetalles } from "./catalogo.js";
import { agregarProducto } from "../services/cartService.js";

const productos = await obtenerProductos();

const buscador = document.getElementById("buscar");
const botonBuscar = document.getElementById("btnBuscar");
const categorias = document.querySelectorAll(".categoria");
const botonVerMas = document.getElementById("verMas");
const botonVerMenos = document.getElementById("verMenos");

const categoriasPermitidas = [
    "mens-shirts",
    "mens-shoes",
    "womens-dresses",
    "womens-shoes",
    "beauty",
    "womens-jewellery",
    "mens-watches"
];

const nombresCategorias = {
    "mens-shirts": "Camisas de hombre",
    "mens-shoes": "Zapatos de hombre",
    "womens-dresses": "Vestidos de mujer",
    "womens-shoes": "Zapatos de mujer",
    "beauty": "Belleza",
    "womens-jewellery": "Joyería de mujer",
    "mens-watches": "Relojes de hombre"
};

const productosValidos = productos.filter(producto =>
    categoriasPermitidas.includes(producto.category)
);

let cantidad = 8;

// Traducir el nombre de la categoría para mostrarlo.
function traducir(producto) {
    return {
        ...producto,
        category: nombresCategorias[producto.category]
    };
}

// Obtener productos según la búsqueda y los filtros.
function obtenerProductosFiltrados() {
    const texto = buscador.value.toLowerCase().trim();

    const seleccionadas = [...categorias]
        .filter(categoria => categoria.checked)
        .map(categoria => categoria.value);

    return productosValidos.filter(producto => {
        const coincideCategoria =
            seleccionadas.length === 0 ||
            seleccionadas.includes(producto.category);

        const coincideNombre =
            producto.title.toLowerCase().includes(texto);

        return coincideCategoria && coincideNombre;
    });
}

// Mostrar los productos y actualizar la paginación.
function filtrarProductos() {
    const resultado = obtenerProductosFiltrados();

    mostrarProductos(
        resultado.slice(0, cantidad).map(traducir)
    );

    botonVerMenos.disabled = cantidad <= 8;
    botonVerMas.disabled = cantidad >= resultado.length;
}

// Mostrar cuatro camisas y cuatro vestidos al iniciar.
function iniciarCatalogo() {
    categorias.forEach(categoria => {
        categoria.checked = [
            "mens-shirts",
            "womens-dresses"
        ].includes(categoria.value);
    });

    const camisas = productosValidos
        .filter(producto => producto.category === "mens-shirts")
        .slice(0, 4);

    const vestidos = productosValidos
        .filter(producto => producto.category === "womens-dresses")
        .slice(0, 4);

    const iniciales = [...camisas, ...vestidos];

    mostrarProductos(iniciales.map(traducir));

    const totalSeleccionados = obtenerProductosFiltrados().length;

    botonVerMenos.disabled = true;
    botonVerMas.disabled = totalSeleccionados <= 8;
}

// Buscar al pulsar el botón.
botonBuscar.addEventListener("click", () => {
    cantidad = 8;
    filtrarProductos();
});

// Buscar mientras se escribe.
buscador.addEventListener("input", () => {
    cantidad = 8;
    filtrarProductos();
});

// Aplicar filtros por categoría.
categorias.forEach(categoria => {
    categoria.addEventListener("change", () => {
        cantidad = 8;
        filtrarProductos();
    });
});

// Mostrar más productos.
botonVerMas.addEventListener("click", () => {
    cantidad += 8;
    filtrarProductos();
});

// Mostrar menos productos.
botonVerMenos.addEventListener("click", () => {
    cantidad = Math.max(8, cantidad - 8);
    filtrarProductos();
});

// Controlar los botones de detalles y carrito.
document.addEventListener("click", evento => {
    const botonDetalles = evento.target.closest("[data-detalles]");
    const botonCarrito = evento.target.closest("[data-carrito]");

    if (!botonDetalles && !botonCarrito) {
        return;
    }

    const idProducto = Number(
        botonDetalles
            ? botonDetalles.dataset.detalles
            : botonCarrito.dataset.carrito
    );

    const producto = productosValidos.find(
        producto => producto.id === idProducto
    );

    if (!producto) {
        return;
    }

    if (botonDetalles) {
        mostrarDetalles(traducir(producto));
    } else {
        agregarProducto({
            id: producto.id,
            nombre: producto.title,
            precio: producto.price,
            imagen: producto.thumbnail
        });
    }
});

// Iniciar el catálogo.
iniciarCatalogo();