export function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12">
                <p>No se encontraron productos.</p>
            </div>`;
        return;
    }

    productos.forEach(producto => {
        contenedor.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="card tarjeta">
                    <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
                    <div class="card-body">
                        <h5>${producto.title}</h5>
                        <span class="etiqueta">${producto.category}</span>
                        <p class="precio">$${producto.price}</p>
                        <button class="btn btn-detalles" data-detalles="${producto.id}">Detalles</button>
                        <button class="btn btn-agregar" data-carrito="${producto.id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>`;
    });
}

/* Mostrar los detalles en una ventana pequeña */
export function mostrarDetalles(producto) {
    const contenido = document.getElementById("contenidoDetalles");

    contenido.innerHTML = `
        <img src="${producto.thumbnail}" class="imagen-detalle" alt="${producto.title}">
        <h5 class="mt-3">${producto.title}</h5>
        <span class="etiqueta">${producto.category}</span>
        <p class="precio mt-3">$${producto.price}</p>
        <p class="descripcion">${producto.description}</p>
        <button class="btn btn-agregar w-100"  data-carrito="${producto.id}">Agregar al carrito</button>
    `;

    document.getElementById("tituloDetalles").textContent =
        "Detalles del producto";

    const elementoModal = document.getElementById("modalDetalles");
    const modal = bootstrap.Modal.getOrCreateInstance(elementoModal);

    modal.show();
}