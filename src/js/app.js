document.addEventListener("DOMContentLoaded", async () => {
  await renderPartial("#header", "header.html");
  await renderPartial("#footer", "footer.html");

  const routes = {
    "#inicio": "inicio/index.html",
    "#catalogo": "catalogo/index.html",
    "#crea-tu-lumina": "contactanos/index.html",
    "#about-us": "quienes-somos/index.html",
  };

  Object.entries(routes).forEach(([selector, path]) => {
    renderSection(selector, path);
  });
});
