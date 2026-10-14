import { obtenerCarrito, calcularSubtotal, obtenerDescuento, calcularTotal, cambiarCantidad, eliminarProducto,
    aplicarCupon,
    vaciarCarrito, } from "../services/cartService.js";    

const lista = document.querySelector("#carrito-lista");
const formatearPrecio = (valor) => `$${valor.toFixed(2)}`;
// convertimos numero a texto y tofixe impone 2 decimales

function renderizarCarrito(){
    const carrito = obtenerCarrito();// trae ekl arreglo desde ls 

    if (carrito.length ===0){
        lista.innerHTML = "<p> tu carrito esta vacio</p>";
        return;// si no hay producto muesta un mensaje 
    }


lista.innerHTML = carrito 
    .map(
      (item) => `
      <article class="carrito__item">
        <img src="${item.imagen}" alt="${item.nombre}" />
        <h3>${item.nombre}</h3>
        <p>precio: ${formatearPrecio(item.precio)}</p>
        <div class="carrito__cantidad">
            <button data-accion="restar" data-id="${item.id}">-</button>
            <span>${item.cantidad}</span>
            <button data-accion="sumar" data-id="${item.id}">+</button>
        </div>
        <p>subtotal: ${formatearPrecio(item.precio * item.cantidad)}</p>
        <button data-accion="eliminar" data-id="${item.id}">eliminar</button> 
      </article>`
    )
    .join("");
}

function renderizarResumen(){// va separada por que tambien tiene que funcionar con el carro vacio
    document.querySelector("#resumen-subtotal").textContent = formatearPrecio(calcularSubtotal());
    // pone el texto plano y busca cada span del html

    //agrega el singo menos por delante del texto
    document.querySelector("#resumen-descuento").textContent = `-${formatearPrecio(obtenerDescuento())}`;

    document.querySelector("#resumen-total").textContent = formatearPrecio(calcularTotal());

}

lista.addEventListener("click",(evento)=>{
    const boton =evento.target.closest("button[data-accion]");
    if (!boton) return;

    const id = Number(boton.dataset.id);// para que coincida con el id del numnero 
    if (boton.dataset.accion ==="sumar")cambiarCantidad(id,1);
    if (boton.dataset.accion ==="restar")cambiarCantidad(id,-1);
    if (boton.dataset.accion ==="eliminar")eliminarProducto(id);

    renderizarCarrito();
    renderizarResumen();

});

const formCupon = document.querySelector("#form-cupon");
const inputCupon = document.querySelector("#input-cupon");
const mensajeCupon = document.querySelector("#mensaje-cupon");

formCupon.addEventListener("submit", (evento) => {
    evento.preventDefault(); // por defecto al enviar se recarga la pagina esto lo evita

    const valido = aplicarCupon(inputCupon.value);//devuelve true si el codigo es valido
    mensajeCupon.textContent = valido ? "cupon aplicado" : "cupon no valido";


    renderizarResumen();
});

document.querySelector("#btn-vaciar").addEventListener("click", () => {
    vaciarCarrito();
    mensajeCupon.textContent = "";
    renderizarCarrito();
    renderizarResumen();
});

renderizarCarrito();
renderizarResumen();
