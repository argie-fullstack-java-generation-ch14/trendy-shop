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

function injectStyles(doc, path) {
  const base = new URL(path, APP_BASE).href;

  doc.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    const absolute = new URL(href, base).href;
    const alreadyLoaded = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'))
      .some((existing) => existing.href === absolute);
    if (alreadyLoaded) return;

    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = absolute;
    document.head.appendChild(style);
  });
}

function injectScripts(doc, path) {
  const base = new URL(path, APP_BASE).href;

  doc.querySelectorAll("script[src]").forEach((script) => {
    const src = script.getAttribute("src");
    if (!src) return;

    const absolute = new URL(src, base).href;
    const alreadyLoaded = Array.from(document.querySelectorAll("script[src]"))
      .some((existing) => existing.src === absolute);
    if (alreadyLoaded) return;

    const element = document.createElement("script");
    element.src = absolute;
    element.async = false;
    document.body.appendChild(element);
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

async function renderSection(selector, path) {
  const container = document.querySelector(selector);
  if (!container) return;

  try {
    const html = await fetchPage(path);
    const doc = new DOMParser().parseFromString(html, "text/html");
    injectStyles(doc, path);

    const main = doc.querySelector("main");
    container.innerHTML = main ? main.innerHTML : doc.body.innerHTML;

    injectScripts(doc, path);
  } catch (error) {
    container.innerHTML = '<div class="alert alert-danger">No se pudo cargar el contenido.</div>';
    console.error(error);
  }
}
