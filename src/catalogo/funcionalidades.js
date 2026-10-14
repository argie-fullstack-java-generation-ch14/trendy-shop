import { obtenerProductos } from "../services/productService.js";
import { mostrarProductos } from "./catalogo.js";

const productos = await obtenerProductos();
const categoria = document.getElementById("categoria");
const buscar = document.getElementById("buscar");

const categorias = [
    "mens-shirts", 
    "mens-shoes",
    "womens-dresses",
    "womens-shoes",
    "beauty",
    "skin-care",
    "womens-jewellery",
    "mens-watches",
    "sports-accessories",
    "mobile-accessories", "motorcycle"
];

for (const nombre of categorias) {
    if (productos.some(p => p.category === nombre)) {
        categoria.innerHTML += `<option value="${nombre}">${nombre}</option>`;
    }
}

function filtrar() {
    const texto = buscar.value.toLowerCase();

    const resultado = productos.filter(p =>
        (!categoria.value || p.category === categoria.value) &&
        p.title.toLowerCase().includes(texto)
    );

    mostrarProductos(resultado);
}

categoria.addEventListener("change", filtrar);
buscar.addEventListener("input", filtrar);

filtrar();