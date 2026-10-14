import { obtenerProductos } from "../services/productService.js";
import { mostrarProductos } from "./catalogo.js";

const productos = await obtenerProductos();
const buscar = document.getElementById("buscar");
const btnBuscar = document.getElementById("btnBuscar");
const categorias = document.querySelectorAll(".categoria");

function filtrar() {
    const texto = buscar.value.toLowerCase();
    const seleccionadas = [...categorias]
        .filter(c => c.checked)
        .map(c => c.value);

    const resultado = productos.filter(p =>
        (!seleccionadas.length || seleccionadas.includes(p.category)) &&
        p.title.toLowerCase().includes(texto)
    );

    mostrarProductos(resultado);
}

categorias.forEach(c => c.addEventListener("change", filtrar));
btnBuscar.addEventListener("click", filtrar);

mostrarProductos(productos);