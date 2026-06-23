const form = document.querySelector("#earlyAccessForm");
const statusMessage = document.querySelector("#formStatus");

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzun6MAYfdxRaBsQpC_hHLY5mPitTEPbtmjG26Eegu-cxTUWJT_kylzxUvU6zRrcI7FDw/exec";

form.addEventListener("submit", async (event) => {
  console.log("Entro al boton")
  event.preventDefault();

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());
  payload.submittedAt = new Date().toISOString();
  console.log("este es el payload", payload)
  statusMessage.className = "form-status";
  statusMessage.textContent = "Sending your request...";

  if (!GOOGLE_APPS_SCRIPT_URL) {
    console.table("No existe la variable",payload);
    statusMessage.classList.add("success");
    statusMessage.textContent =
      "Request captured in preview mode. Add your Google Apps Script URL in script.js to send it to Sheets.";
    form.reset();
    return;
  }

  try {
    console.log("intenta ")
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",

      },
      body: JSON.stringify(payload),
    });

    statusMessage.classList.add("success");
    statusMessage.textContent = "Done. We will contact you soon.";
    console.log("se reseteará")
    form.reset();
    
  } catch (error) {
    console.log("Error al enviar el formulario ")
    statusMessage.classList.add("error");
    statusMessage.textContent =
      "We could not send the request. Please try again in a moment.";
  }
});
