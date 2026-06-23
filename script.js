const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzun6MAYfdxRaBsQpC_hHLY5mPitTEPbtmjG26Eegu-cxTUWJT_kylzxUvU6zRrcI7FDw/exec";

console.log("script.js RAW JSON cargado correctamente");

const form = document.querySelector("#earlyAccessForm");
const statusMessage = document.querySelector("#formStatus");

if (!form) {
  console.error("No se encontró el formulario con id #earlyAccessForm");
} else {
  console.log("Formulario encontrado:", form);
}

if (!statusMessage) {
  console.error("No se encontró el elemento con id #formStatus");
} else {
  console.log("Status encontrado:", statusMessage);
}

if (form && statusMessage) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');

    const payload = {
      nombre: form.elements.name.value.trim(),
      empresa: form.elements.business.value.trim(),
      telefono: form.elements.phone.value.trim(),
      email: form.elements.email.value.trim(),
      tipo_negocio: form.elements.socialManagement.value.trim(),
      submittedAt: new Date().toISOString(),
    };

    console.log("Payload JSON raw enviado:");
    console.log(JSON.stringify(payload, null, 2));

    statusMessage.className = "form-status";
    statusMessage.textContent = "Sending your request...";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const responseText = await response.text();

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);
      console.log("Response redirected:", response.redirected);
      console.log("Response url:", response.url);
      console.log("Response body:", responseText);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${responseText}`);
      }

      statusMessage.classList.add("success");
      statusMessage.textContent =
        responseText.trim() || "Done. We will contact you soon.";

      form.reset();
    } catch (error) {
      console.error("Error enviando formulario:", error);

      statusMessage.classList.add("error");
      statusMessage.textContent =
        "No se pudo enviar la solicitud. Revisa la consola para ver el error.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Reserve my access";
      }
    }
  });
}
