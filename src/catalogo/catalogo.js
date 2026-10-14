// import { agregarProducto } from "../services/cartService.js";

export function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No hay productos.</p>";
        return;
    }

    for (const producto of productos) {
        contenedor.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-3">
                <div class="card tarjeta ${producto.category}" h-100">
                    <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
                    <div class="card-body">
                        <h5>${producto.title}</h5>
                        <p>${producto.category}</p>
                        <p>Precio: $${producto.price}</p>
                        <button class="btn btn-detalles" data-detalles="${producto.id}">Detalles</button>
                        <button class="btn btn-agregar" data-carrito="${producto.id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>`;
    }
}

// agregarProducto({ id: producto.id, nombre: producto.title, precio: producto.price, imagen: producto.image });