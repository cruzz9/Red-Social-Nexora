//SE INICIALIZA EL SERVICIO DE EMAILJS
(function() {
    emailjs.init({
        publicKey: "fnjDTbXcSoYWGWp-R", //se agrega la public key de nuestro service
    });
})();
// Inputs
const nameIpt = document.getElementById("nameIpt");
const lastIpt = document.getElementById("lastIpt");
const emailIpt = document.getElementById("emailIpt");
const phoneIpt = document.getElementById("phoneIpt");
const messageIpt = document.getElementById("messageIpt");

// Alertas
const nameAlert = document.getElementById("nameAlert");
const lastAlert = document.getElementById("lastAlert");
const emailAlert = document.getElementById("emailAlert");
const phoneAlert = document.getElementById("phoneAlert");
const messageAlert = document.getElementById("messageAlert");

// Botones
const formBtn = document.getElementById("formBtn");
const delBtn = document.getElementById("delBtn");

// Expresiones regulares
const regexEmail = (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

const regexName =(/^[A-Za-zÑñÁáÉéÍíÓóÚúüÜ]+(?:[' -][A-Za-zÑñÁáÉéÍíÓóÚúüÜ]+)*$/);

const regexPhone = (/^[0-9]{10}$/);

// Validación
formBtn.addEventListener("click", (e) => {

    e.preventDefault();

    let formularioValido = true;

    // Nombre
    if (
        !regexName.test(nameIpt.value) ||
        nameIpt.value.length < 3 ||
        nameIpt.value.length > 10
    ) {
        nameAlert.style.display = "block";
        nameAlert.innerText =
            "El nombre debe contener entre 3 y 10 letras.";
        formularioValido = false;
    } else {
        nameAlert.style.display = "none";
    }

    // Apellido
    if (
        !regexName.test(lastIpt.value) ||
        lastIpt.value.length < 3 ||
        lastIpt.value.length > 10
    ) {
        lastAlert.style.display = "block";
        lastAlert.innerText =
            "El apellido debe contener entre 3 y 10 letras.";
        formularioValido = false;
    } else {
        lastAlert.style.display = "none";
    }

    // Correo
    if (!regexEmail.test(emailIpt.value)) {
        emailAlert.style.display = "block";
        emailAlert.innerText =
            "Ingrese un correo electrónico válido.";
        formularioValido = false;
    } else {
        emailAlert.style.display = "none";
    }

    // Teléfono
    if (!regexPhone.test(phoneIpt.value) || 
    /^(\d)\1{9}$/.test(phoneIpt.value) || 
    phoneIpt.value === "1234567890" ||
    phoneIpt.value === "0123456789") {
        phoneAlert.style.display = "block";
        phoneAlert.innerText =
            "Ingrese un teléfono de 10 dígitos válido.";
        formularioValido = false;
    } else {
        phoneAlert.style.display = "none";
    }

    // Mensaje
    if (
        messageIpt.value.length === 0 ||
        messageIpt.value.length > 250
    ) {
        messageAlert.style.display = "block";
        messageAlert.innerText =
            "El mensaje debe contener entre 1 y 250 caracteres.";
        formularioValido = false;
    } else {
        messageAlert.style.display = "none";
    }

//ENVÍO CON EMAILJS (Solo si el formulario es válido)
     if (formularioValido) {
        // Cambiar el botón mientras se envía
        const originalText = formBtn.textContent;
        formBtn.textContent = 'Enviando...';
        formBtn.disabled = true;

        // Obtener el formulario (el section con id="formulario")
        const form = document.getElementById("formContacto");

        // Enviar con EmailJS
        emailjs.sendForm('service_ny8ixa3', 'template_67c5beb', form)
            .then(function() {
                alert('¡Gracias! Tu mensaje ha sido enviado correctamente.');
                
                // Limpiar el formulario
                nameIpt.value = "";
                lastIpt.value = "";
                emailIpt.value = "";
                phoneIpt.value = "";
                messageIpt.value = "";
                
                // Ocultar todas las alertas
                nameAlert.style.display = "none";
                lastAlert.style.display = "none";
                emailAlert.style.display = "none";
                phoneAlert.style.display = "none";
                messageAlert.style.display = "none";
                
                // Restaurar el botón
                formBtn.textContent = originalText;
                formBtn.disabled = false;
            }, function(error) {
                alert('Hubo un error al enviar el mensaje: ' + JSON.stringify(error));
                formBtn.textContent = originalText;
                formBtn.disabled = false;
            });
    }
});

// Limitar teléfono a 10 dígitos
phoneIpt.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
});

// Botón borrar
delBtn.addEventListener("click", () => {

    nameIpt.value = "";
    lastIpt.value = "";
    emailIpt.value = "";
    phoneIpt.value = "";
    messageIpt.value = "";

    nameAlert.style.display = "none";
    lastAlert.style.display = "none";
    emailAlert.style.display = "none";
    phoneAlert.style.display = "none";
    messageAlert.style.display = "none";

});