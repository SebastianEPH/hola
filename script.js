const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzun6MAYfdxRaBsQpC_hHLY5mPitTEPbtmjG26Eegu-cxTUWJT_kylzxUvU6zRrcI7FDw/exec";

console.log("script.js cargado correctamente");

const form = document.querySelector("#postia-form");
const statusMessage = document.querySelector("#formStatus");
const hiddenIframe = document.querySelector("#postia-hidden-iframe");

if (!form) {
  console.error("No se encontró el formulario con id #postia-form");
}

if (!statusMessage) {
  console.error("No se encontró el elemento con id #formStatus");
}

if (!hiddenIframe) {
  console.error("No se encontró el iframe oculto con id #postia-hidden-iframe");
}

if (form && statusMessage && hiddenIframe) {
  form.setAttribute("method", "POST");
  form.setAttribute("action", GOOGLE_APPS_SCRIPT_URL);
  form.setAttribute("target", "postia-hidden-iframe");
  form.setAttribute("enctype", "application/x-www-form-urlencoded");

  form.addEventListener("submit", () => {
    const submitButton = form.querySelector('button[type="submit"]');

    const nombreInput = form.querySelector('[name="nombre"]');
    const empresaInput = form.querySelector('[name="empresa"]');
    const tipoNegocioInput = form.querySelector('[name="tipo_negocio"]');

    console.log("Enviando formulario como x-www-form-urlencoded:", {
      nombre: nombreInput?.value,
      empresa: empresaInput?.value,
      tipo_negocio: tipoNegocioInput?.value,
    });

    statusMessage.className = "form-status";
    statusMessage.textContent = "Sending your request...";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    setTimeout(() => {
      statusMessage.classList.add("success");
      statusMessage.textContent = "Done. We will contact you soon.";

      form.reset();

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Reserve my access";
      }
    }, 1500);
  });
}
