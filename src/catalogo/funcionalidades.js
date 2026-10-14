import { obtenerProductos } from "../services/productService.js";
import { mostrarProductos } from "./catalogo.js";
import { agregarProducto } from "../services/cartService.js";

const productos = await obtenerProductos();
const buscar = document.getElementById("buscar");
const btnBuscar = document.getElementById("btnBuscar");
const categorias = document.querySelectorAll(".categoria");
const contenedor = document.getElementById("productos");
const verMas = document.getElementById("verMas");
const verMenos = document.getElementById("verMenos");

let cantidad = 8;

function filtrar() {
    const texto = buscar.value.toLowerCase();
    const seleccionadas = [...categorias]
        .filter(c => c.checked)
        .map(c => c.value);

    const resultado = productos.filter(p =>
        (!seleccionadas.length || seleccionadas.includes(p.category)) &&
        p.title.toLowerCase().includes(texto)
    );

    mostrarProductos(resultado.slice(0, cantidad));

    verMenos.disabled = cantidad <= 8;
    verMas.disabled = cantidad >= resultado.length;
}

categorias.forEach(c => c.addEventListener("change", filtrar));
btnBuscar.addEventListener("click", filtrar);

buscar.addEventListener("keydown", e => {
    if (e.key === "Enter") filtrar();
});

verMas.addEventListener("click", () => {
    cantidad += 8;
    filtrar();
});

verMenos.addEventListener("click", () => {
    cantidad -= 8;
    filtrar();
});

// Agregar al carrito
contenedor?.addEventListener("click", e => {
    const btn = e.target.closest("[data-carrito]");
    if (!btn) return;

    const producto = productos.find(p => p.id === Number(btn.dataset.carrito));

    if (producto) {
        agregarProducto({
            id: producto.id,
            nombre: producto.title,
            precio: producto.price,
            imagen: producto.thumbnail
        });
    }
});

filtrar();