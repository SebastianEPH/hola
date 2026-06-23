const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzun6MAYfdxRaBsQpC_hHLY5mPitTEPbtmjG26Eegu-cxTUWJT_kylzxUvU6zRrcI7FDw/exec";

console.log("script.js cargado correctamente");

const form = document.querySelector("#postia-form");
const statusMessage = document.querySelector("#formStatus");

if (!form) {
  console.error("No se encontró el formulario con id #postia-form");
}

if (!statusMessage) {
  console.error("No se encontró el elemento con id #formStatus");
}

if (form && statusMessage) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    console.log("Formulario enviado");

    const formData = new FormData(form);

    const payload = Object.fromEntries(formData.entries());

    payload.submittedAt = new Date().toISOString();

    console.log("Payload:", payload);

    statusMessage.className = "form-status";
    statusMessage.textContent = "Sending your request...";

    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const body = new URLSearchParams(payload).toString();

      console.log("Body x-www-form-urlencoded:", body);

      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body,
      });

      statusMessage.classList.add("success");
      statusMessage.textContent = "Done. We will contact you soon.";

      form.reset();
    } catch (error) {
      console.error("Error enviando formulario:", error);

      statusMessage.classList.add("error");
      statusMessage.textContent =
        "We could not send the request. Please try again in a moment.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Reserve my access";
      }
    }
  });
}
