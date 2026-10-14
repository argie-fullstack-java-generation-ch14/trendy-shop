const aboutSectionsData = [
  {
    title: "Nuestra Misión",
    text: "Ofrecer moda accesible, juvenil y vanguardista a todo Colombia, combinando calidad excepcional, transparencia en los envíos y un servicio al cliente humano y cercano que garantice la mejor experiencia de compra online.",
    image1: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800",
    image2: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600",
    image1Alt: "Diseño y tendencias de moda",
    image2Alt: "Detalle de telas y calidad",
    image1Width: 8,
    image2Width: 4,
    bullets: [
      "Impulsar la moda sostenible y el talento local.",
      "Innovación constante en nuestro catálogo de tendencias.",
      "Enfoque 100% centrado en la satisfacción del cliente.",
      "Construir una comunidad transparente y confiable."
    ]
  },
  {
    title: "Nuestra Visión",
    text: "En Trendy Shop rediseñamos la experiencia de compra digital. Para el 2030, buscamos posicionarnos como la plataforma de moda digital número uno en velocidad de entrega, transparencia y logística sostenible.",
    image1: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600",
    image2: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800",
    image1Alt: "Estilo urbano juvenil",
    image2Alt: "Vestuario y showroom",
    image1Width: 5,
    image2Width: 7,
    bullets: [
      "Inspirar la moda moderna e inclusiva para todos.",
      "Liderar la logística rápida con empaques ecológicos."
    ]
  }
];

const teamMembersData = [
  {
    name: "Gabriela Cardona",
    role: "Coordinadora de Marketing",
    photo: "https://res.cloudinary.com/dvvwfb2tr/image/upload/v1792002129/generation/TRENDY-SHOP/Gabriela_h7sloz.png",
    linkedin: "#"
  },
  {
    name: "Alan Giraldo",
    role: "Coordinadora de Marketing",
    photo: "https://res.cloudinary.com/dvvwfb2tr/image/upload/v1792002129/generation/TRENDY-SHOP/alan_l93oc5.png",
    linkedin: "#"
  },
  {
    name: "Nayant Gonzalez",
    role: "Coordinador de Marketing",
    photo: "https://res.cloudinary.com/dvvwfb2tr/image/upload/v1792002794/generation/TRENDY-SHOP/naya_ngakmp.png",
    linkedin: "#"
  },
  {
    name: "Andrés Satoba",
    role: "Coordinadora de Marketing",
    photo: "https://res.cloudinary.com/dvvwfb2tr/image/upload/v1792003934/generation/TRENDY-SHOP/andres_ht6fyq.png",
    linkedin: "#"
  },
  {
    name: "Stefanía Redondo",
    role: "Coordinadora de Marketing",
    photo: "https://res.cloudinary.com/dvvwfb2tr/image/upload/v1792005295/generation/TRENDY-SHOP/stef_mjqxts.png",
    linkedin: "#"
  },
  {
    name: "Argie Rincón",
    role: "Coordinadora de Marketing",
    photo: "https://res.cloudinary.com/dvvwfb2tr/image/upload/v1792002129/generation/TRENDY-SHOP/argie_caricatura_easomo.png",
    linkedin: "#"
  }
];

function createAboutSectionTemplate(section, index) {
  // Alterna el diseño para que las secciones queden en espejo.
  // `index` es la posición en el arreglo y `index % 2 === 0` es verdadero en posiciones pares (0, 2, 4...).
  // Las secciones pares muestran imagen-izquierda/texto-derecha; las impares invierten la fila y cambian el lado del padding.
  const isEven = index % 2 === 0;
  const reverseClass = isEven ? '' : 'flex-lg-row-reverse';
  const paddingClass = isEven ? 'ps-lg-5' : 'pe-lg-5';

  const bulletsMarkup = section.bullets
    .map(bullet => `<li><i class="bi bi-patch-check-fill text-success me-2"></i> ${bullet}</li>`)
    .join("");

  return `
    <section class="row align-items-center mb-5 pb-lg-4 ${reverseClass}">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <div class="row g-3 align-items-center">
          <div class="col-${section.image1Width}">
            <img src="${section.image1}" class="img-fluid img-rounded-custom-1 shadow-sm w-100" alt="${section.image1Alt}">
          </div>
          <div class="col-${section.image2Width}">
            <img src="${section.image2}" class="img-fluid img-rounded-custom-2 shadow-sm w-100" alt="${section.image2Alt}">
          </div>
        </div>
      </div>
      <div class="col-lg-6 ${paddingClass}">
        <h2 class="display-6 fw-bold mb-3">${section.title}</h2>
        <p class="text-secondary lead fs-6 mb-4">${section.text}</p>
        <ul class="list-unstyled about-list text-secondary">
          ${bulletsMarkup}
        </ul>
      </div>
    </section>
  `;
}

// Template string "Nuestra Historia"
function createHistorySectionTemplate() {
  return `
    <section class="row align-items-center mb-5 pb-lg-5">
      <div class="col-lg-6 mb-4 mb-lg-0">
        <div class="row g-3 align-items-center">
          <div class="col-7">
            <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800"
              class="img-fluid img-rounded-custom-1 shadow-sm w-100" alt="Orígenes de la marca">
          </div>
          <div class="col-5">
            <img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600"
              class="img-fluid img-rounded-custom-2 shadow-sm w-100" alt="Equipo creativo">
          </div>
        </div>
      </div>
      <div class="col-lg-6 ps-lg-5">
        <h2 class="display-6 fw-bold mb-3">Nuestra Historia</h2>
        <p class="text-secondary lead fs-6 mb-4">
          Fundada en 2018 con el objetivo de llevar prendas únicas a Bogotá y Medellín, Trendy Shop evolucionó hasta
          convertirse en una tienda 100% digital. Tras superar diversos retos, resurgimos con una plataforma veloz,
          segura y transparente pensada para nuestros clientes.
        </p>
        <ul class="list-unstyled about-list text-secondary">
          <li><i class="bi bi-patch-check-fill text-success me-2"></i> Comienzos apasionados con visión de crecimiento.</li>
          <li><i class="bi bi-patch-check-fill text-success me-2"></i> Hitos de innovación y adaptación constante.</li>
          <li><i class="bi bi-patch-check-fill text-success me-2"></i> Construcción de una marca sólida y transparente.</li>
          <li><i class="bi bi-patch-check-fill text-success me-2"></i> Redefiniendo el e-commerce juvenil de Colombia.</li>
        </ul>
      </div>
    </section>
  `;
}

// Template string card member
function createTeamCardTemplate(member) {
  return `
    <div class="col">
      <div class="team-card">
        <img src="${member.photo}" class="img-rounded-team shadow-sm" alt="${member.name}">
        <div class="team-social-overlay">
          <a href="${member.linkedin}" target="_blank" class="team-social-btn" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
        </div>
        <div class="mt-3">
          <h5 class="fw-bold mb-1">${member.name}</h5>
          <p class="text-secondary small mb-0">${member.role}</p>
        </div>
      </div>
    </div>
  `;
}

// Template string padre de la sección del equipo
function createTeamSectionTemplate() {
  // Genera el HTML de cada tarjeta por integrante y los une en un solo string de fila.
  const teamCardTemplate = teamMembersData.map(member => createTeamCardTemplate(member)).join("");

  return `
    <section class="mt-5 pt-3">
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h2 class="display-6 fw-bold mb-2">Creando excelencia en equipo</h2>
          <p class="text-secondary mb-0">Nuestro éxito se apoya en el compromiso y talento de cada persona detrás de Trendy Shop.</p>
        </div>
        <a href="../catalogo/index.html" class="btn btn-warning rounded-pill px-4 py-2 fw-semibold text-dark text-nowrap shadow-sm">Explorar Catálogo</a>
      </div>

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center g-4 mt-2 team-row-custom">
        ${teamCardTemplate}
      </div>
    </section>
  `;
}

// Inyección de los template strings
function renderAboutSection() {
  // Elemento contenedor donde se inyecta el HTML generado.
  const aboutContainer = document.getElementById("about-us");

  // Guarda: renderiza solo cuando el contenedor existe; si no, asignar innerHTML sobre null lanzaría error.
  if (aboutContainer) {
    // Genera el HTML de cada sección (pasando el índice para controlar el diseño alternado) y los une.
    const missionAndVissionSections = aboutSectionsData.map((section, index) => createAboutSectionTemplate(section, index)).join("");

    const ourHistorySection = createHistorySectionTemplate();
    const ourTeamSection = createTeamSectionTemplate();

    aboutContainer.innerHTML = `
      ${missionAndVissionSections}
      ${ourHistorySection}
      ${ourTeamSection}
    `;
  }
}

renderAboutSection();