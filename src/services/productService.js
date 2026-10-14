const URL = "https://dummyjson.com/products?limit=0";

export async function obtenerProductos() {
    try {
        const respuesta = await fetch(URL);

        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        return datos.products || [];

    } catch (error) {
        console.error("Error al consultar los productos:", error);
        return [];
    }
}