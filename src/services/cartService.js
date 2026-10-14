

const CLAVE_CUPON = 'cupon';// para que no s e pierda al recargar la pagina
const CUPONES = {
    TRENDY10: 0.1,
    TRENDY20: 0.2,
};



const CLAVE_CARRITO = "carrito"; // con esto nombramos la gaveta de ls donde esta el carrito

export function obtenerCarrito() {// trae el carrito guardado y lo devuelve como arreglo    
  try {// localstorage guarda texto; JSON.parse lo convierte otra vez en arreglo
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || []; // si no hay nada guardado devuelve nul y lo cambia por un arreglo vacio
  } catch (error) {// si el texto esta dañdo el json falla , lo que evita que la pagina se rompa 
    console.error("carrito corrupto en localStorage", error);
    return [];
  }
}

function guardarCarrito(carrito) {// guardamos el carrito 
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));// aca solo guardamos texto y se convierte a arreglo
    window.dispatchEvent(new Event("carrito:actualizado"));//avisa a la pagina que el carrito cambio ara que el contador se actualice solo
  
    }

export function agregarProducto(producto) {// la usa el boton agregar del catalogo - pendiente a cambios 
    const carrito = obtenerCarrito();
    const existente = carrito.find((item) => item.id === producto.id);// buscamos el producto en el carrito y find si lo encuentra undefine si no 

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito(carrito);// lo guardamos en el ls
}


export function eliminarProducto(id) {
    const carritoSinProdcuto = obtenerCarrito().filter((item)=> item.id !== id);
    // obtenerCarrito() trae el arreglo actual
    // filter crea un arreglo nuevo con todos los productos sin el que tiene ese id
    guardarCarrito(carritoSinProdcuto);
}

//botones de + y - para el producto 
export function cambiarCantidad(id, cantidadASumar){
    const carrito = obtenerCarrito();
    const item = carrito.find((p)=> p.id ==id);//buscamos el producto que quierean cambiar 
    if (!item) return; //si no existe sale de la funcion sin hacer nada 
    item.cantidad += cantidadASumar;
    guardarCarrito(item.cantidad > 0 ? carrito : carrito.filter((p)=> p.id !==id));
    // lo que hace guardar el carrito talcual si queda 1 
    //pero si llega a 0 lo quita del carrito para no dejar vacios 
}

export function vaciarCarrito(){// para vaicr los produtos del carrito
    guardarCarrito([]);// guardarlo vacio es lo mismo que dejarlo en 0 
     localStorage.removeItem(CLAVE_CUPON);// para  que al vaciar el carrito se borre el cupon 
}

export function contarItems(){// cuenta las unidades en total
    return obtenerCarrito().reduce((total,item)=> total + item.cantidad, 0); 
    // comienza desde 0 y cada vuelta le suma la cantidad 

}

export function calcularSubtotal(){// aca sumanos precio canitda 
    return obtenerCarrito().reduce((total, item)=> total + item.precio * item.cantidad ,0);
    //suma el precio multiplicado po r la canridad de cada producto 

}

export function aplicarCupon(codigo){
    if (obtenerCarrito().length === 0 )return false; 
    const codigoLimpio = codigo.trim().toUpperCase(); // quitamos espacios y funciona con minusculas 
    if (!CUPONES[codigoLimpio]) return false; // si el codigo no existe en la lista returna falso
    localStorage.setItem(CLAVE_CUPON, codigoLimpio);// si es valido lo guarda y se puede recargar y ver aun
    return true;
}

export function obtenerDescuento(){// creamos una para calcualr cuanto dinero se descuenta
    const codigo = localStorage.getItem(CLAVE_CUPON);//lee el cupon, su no hay da null

    return codigo &&CUPONES[codigo] ? calcularSubtotal()* CUPONES[codigo] : 0;
    // verifica si hay cupon valido sinp da 0 
}


export function calcularTotal() {
    return calcularSubtotal() - obtenerDescuento();
    // calcular y regresa el total menos deuento
}
