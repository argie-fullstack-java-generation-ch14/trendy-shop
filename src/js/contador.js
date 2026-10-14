import { contarItems } from "../services/cartService.js";

const actualizarContador = () => {
  const contador = document.querySelector("#contador-carrito");
  if (!contador) return false;
  contador.textContent = contarItems();
  return true;
};

// Si el navbar todavía no se pintó, espera a que aparezca y actualiza una vez
if (!actualizarContador()) {
  const observador = new MutationObserver(() => {
    if (actualizarContador()) observador.disconnect();
  });
  observador.observe(document.body, { childList: true, subtree: true });
}

window.addEventListener("carrito:actualizado", actualizarContador);