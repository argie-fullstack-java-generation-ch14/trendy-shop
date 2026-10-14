export function mostrarProductos(productos) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = "<p>No hay productos.</p>";
        return;
    }

    for (const p of productos) {
        contenedor.innerHTML += `
            <div class="col-12 col-sm-6 col-lg-3">
                <div class="card h-100">
                    <img src="${p.thumbnail}" class="card-img-top" alt="${p.title}">
                    <div class="card-body">
                        <h5>${p.title}</h5>
                        <p>${p.category}</p>
                        <p>Precio: $${p.price}</p>
                        <button class="btn btn-primary" data-detalles="${p.id}">Detalles</button>
                        <button class="btn btn-secondary" data-carrito="${p.id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>`;
    }
}