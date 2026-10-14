import { obtenerProductos } from "../services/productService.js";

async function mostrarProductos() {
    const contenedor = document.getElementById("productos");
    const productos = await obtenerProductos();

    for (const producto of productos) {
        contenedor.innerHTML += `
        <div class="card" style="width: 18rem;">
            <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
                <div class="card-body">
                    <h5 class="card-title">${producto.title}</h5>
                    <p class="card-text">${producto.price}</p>
                    <a href="#" class="btn btn-primary">Agregar a Carrito</a>
                </div>
            </div>`;
    }
}

mostrarProductos();