const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzun6MAYfdxRaBsQpC_hHLY5mPitTEPbtmjG26Eegu-cxTUWJT_kylzxUvU6zRrcI7FDw/exec";

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
  console.error("No se encontró el iframe con id #postia-hidden-iframe");
}

if (form && statusMessage && hiddenIframe) {
  form.method = "POST";
  form.action = GOOGLE_APPS_SCRIPT_URL;
  form.target = "postia-hidden-iframe";
  form.enctype = "application/x-www-form-urlencoded";

  hiddenIframe.addEventListener("load", () => {
    const isSubmitting = form.dataset.submitting === "true";

    if (!isSubmitting) {
      return;
    }

    form.dataset.submitting = "false";

    statusMessage.className = "form-status success";
    statusMessage.textContent = "Done. We will contact you soon.";

    form.reset();

    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Reserve my access";
    }
  });

  form.addEventListener("submit", () => {
    const nombreInput = form.querySelector('[name="nombre"]');
    const empresaInput = form.querySelector('[name="empresa"]');
    const tipoNegocioInput = form.querySelector('[name="tipo_negocio"]');
    const submitButton = form.querySelector('button[type="submit"]');

    const payloadDebug = {
      nombre: nombreInput?.value ?? "",
      empresa: empresaInput?.value ?? "",
      tipo_negocio: tipoNegocioInput?.value ?? "",
    };

    console.log("Enviando POST x-www-form-urlencoded a Google Apps Script:");
    console.table(payloadDebug);

    form.dataset.submitting = "true";

    statusMessage.className = "form-status";
    statusMessage.textContent = "Sending your request...";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
  });
}
