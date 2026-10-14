const APP_BASE = (() => {
  const script = document.currentScript;
  if (!script || !script.src) return "./";
  return new URL("../", script.src).href;
})();

const PARTIALS_BASE = new URL("partials/", APP_BASE).href;

async function fetchPage(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Error ${response.status} al cargar ${path}`);
  }
  return await response.text();
}

function resolveLinks(container) {
  if (!container) return;
  container.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;
    link.href = new URL(href, APP_BASE).href;
  });
}

async function renderPartial(selector, name) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    container.innerHTML = await fetchPage(PARTIALS_BASE + name);
    resolveLinks(container);
  } catch (error) {
    console.error(error);
  }
}

function extractContent(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const main = doc.querySelector("main");
  return main ? main.innerHTML : doc.body.innerHTML;
}

async function renderSection(selector, path) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    const html = await fetchPage(path);
    container.innerHTML = extractContent(html);
  } catch (error) {
    container.innerHTML = '<div class="alert alert-danger">No se pudo cargar el contenido.</div>';
    console.error(error);
  }
}
