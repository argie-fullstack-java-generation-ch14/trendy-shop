const URL = "https://dummyjson.com/products?limit=8";

export async function obtenerProductos() {
    try {
        const respuesta = await fetch(URL);

        if (!respuesta.ok) {
            throw new Error("Error al consultar la API");
        }

        const datos = await respuesta.json();
        return datos.products;

    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}