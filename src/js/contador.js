import { contarItems } from "../services/cartService.js";

const actualizarContador = () => {
  const contador = document.querySelector("#contador-carrito");
  if (!contador) return;
  contador.textContent = contarItems();
};

actualizarContador();
window.addEventListener("carrito:actualizado", actualizarContador);