const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzun6MAYfdxRaBsQpC_hHLY5mPitTEPbtmjG26Eegu-cxTUWJT_kylzxUvU6zRrcI7FDw/exec";

const form = document.querySelector("#postia-form");
const statusMessage = document.querySelector("#formStatus");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const body = new URLSearchParams();

  body.append("nombre", form.querySelector('[name="nombre"]').value);
  body.append("empresa", form.querySelector('[name="empresa"]').value);
  body.append("tipo_negocio", form.querySelector('[name="tipo_negocio"]').value);

  console.log("Enviando:", body.toString());

  statusMessage.className = "form-status";
  statusMessage.textContent = "Sending your request...";

  try {
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    statusMessage.classList.add("success");
    statusMessage.textContent = "Done. We will contact you soon.";
    form.reset();
  } catch (error) {
    console.error("Error:", error);

    statusMessage.classList.add("error");
    statusMessage.textContent =
      "We could not send the request. Please try again in a moment.";
  }
});
