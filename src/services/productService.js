const URL = "https://dummyjson.com/products?limit=0";

export async function obtenerProductos() {
    try {
        const respuesta = await fetch(URL);
        const datos = await respuesta.json();
        return datos.products;

    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}