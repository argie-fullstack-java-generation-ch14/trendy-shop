function initContactForm() {
    const form = document.getElementById("contact-form");
    const formMessage = document.getElementById("form-message");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            formMessage.style.color = "red";
            formMessage.textContent = "Por favor, completa todos los campos.";
            return;
        }
        formMessage.style.color = "green";
        formMessage.textContent = `¡Gracias por tu mensaje, ${name}! Nos pondremos en contacto pronto.`;
        form.reset();
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactForm);
} else {
    initContactForm();
}