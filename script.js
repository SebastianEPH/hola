const ENDPOINT_URL =
    "https://script.google.com/macros/s/AKfycbzun6MAYfdxRaBsQpC_hHLY5mPitTEPbtmjG26Eegu-cxTUWJT_kylzxUvU6zRrcI7FDw/exec"

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#postia-form")
    const message = document.querySelector("#postia-message")
    const submitButton = document.querySelector("#postia-submit")

    if (!form) {
        console.error("No se encontró el formulario con id #postia-form")
        return
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault()

        console.log("POSTIA FORMULARIO EJECUTADO")

        if (submitButton) {
            submitButton.disabled = true
            submitButton.textContent = "Enviando..."
        }

        if (message) {
            message.textContent = ""
        }

        const formData = new FormData(form)
        const body = new URLSearchParams()

        for (const [key, value] of formData.entries()) {
            const stringValue = String(value)

            console.log("Campo capturado:", key, stringValue)

            body.append(key, stringValue)
        }

        console.log("BODY FINAL:", body.toString())

        try {
            await fetch(ENDPOINT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: body.toString(),
            })

            form.reset()

            if (message) {
                message.textContent =
                    "Gracias por registrarte. Hemos recibido tus datos correctamente."
            }

            console.log("Formulario enviado correctamente")
        } catch (error) {
            console.error("Error enviando formulario:", error)

            if (message) {
                message.textContent = "No se pudo enviar el formulario."
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false
                submitButton.textContent = "Enviar"
            }
        }
    })
})
