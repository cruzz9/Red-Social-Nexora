
// Inputs
const nameIpt = document.getElementById("nameIpt");
const lastIpt = document.getElementById("lastIpt");
const dateIpt = document.getElementById("dateIpt");
//
const genderIpt = document.getElementById("genderIpt");
//
const emailIpt = document.getElementById("emailIpt");
const phoneIpt = document.getElementById("phoneIpt");
const passwordIpt = document.getElementById("passwordIpt");
const passwordConfirmIpt = document.getElementById("passwordConfirmIpt");


// Alertas
const nameAlert = document.getElementById("nameAlert");
const lastAlert = document.getElementById("lastAlert");
const dateAlert = document.getElementById("dateAlert");
//
const genderAlert = document.getElementById("genderAlert");
//
const emailAlert = document.getElementById("emailAlert");
const phoneAlert = document.getElementById("phoneAlert");
const passwordAlert = document.getElementById("passwordAlert");
const passwordConfirmAlert = document.getElementById("passwordConfirmAlert");

// Botones
const formBtn = document.getElementById("formBtn");
const delBtn = document.getElementById("delBtn");

// Expresiones regulares
const regexEmail = (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

const regexName = (/^[A-Za-zÑñÁáÉéÍíÓóÚúüÜ]+(?:[' -][A-Za-zÑñÁáÉéÍíÓóÚúüÜ]+)*$/);

const regexPhone = (/^[0-9]{10}$/);

const regexPassword = (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{8,}$/);

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

    //fecha
    const hoy = new Date();
    const max = new Date(hoy);
    const dateUser = new Date(dateIpt.value);
    max.setFullYear(hoy.getFullYear() - 12);
    const min = new Date(hoy);
    min.setFullYear(hoy.getFullYear() - 120);
    dateIpt.max = max.toISOString().split('T')[0];
    dateIpt.min = min.toISOString().split('T')[0];

    if (dateIpt.value != "") {
        if (dateIpt.value != "" && (dateUser > max || dateUser < min)) {
            dateAlert.style.display = "block";
            dateAlert.innerHTML = "Debes tener 12 años o mas para crear una cuenta";
            formularioValido = false;
        } else {
            dateAlert.style.display = "none";
        }
    } else {
        dateAlert.style.display = "block";
        dateAlert.innerHTML = "El campo de fecha está vacío";
        formularioValido = false;
    }
    


//genero
    if (genderIpt.value == "") {
        genderAlert.style.display = "block";
        genderAlert.innerHTML = "Por favor, selecciona tu género antes de continuar.";
        formularioValido = false;
    } else {
        genderAlert.style.display = "none";
    }

//Contraseña
    if (passwordIpt.value != "") {
        if (!regexPassword.test(passwordIpt.value)) {
            passwordAlert.style.display = "block";
            passwordAlert.innerHTML = "Contraseña inválida: usa mínimo 8 caracteres con al menos 1 mayúscula, 1 minúscula y 1 número (sin espacios ni acentos).";
            formularioValido = false;
        } else {
            passwordAlert.style.display = "none";

        }
    } else {
        passwordAlert.style.display = "block";
        passwordAlert.innerHTML = "Este campo es requerido";
        formularioValido = false;
    }

    
    //Confirmar contraseña
    if (passwordConfirmIpt.value != ("")) {
        if (passwordConfirmIpt.value != passwordIpt.value) {
            passwordConfirmAlert.style.display = "block";
            passwordConfirmAlert.innerHTML = "Las contraseñas no coinciden.";
            formularioValido = false;
        } else if (!regexPassword.test(passwordConfirmIpt.value)) {
            passwordConfirmAlert.style.display = "block";
            passwordConfirmAlert.innerHTML = "Ingresa un formato válido";
            formularioValido = false;
        } else {
            passwordConfirmAlert.style.display = "none";
        }
    } else {
        passwordConfirmAlert.style.display = "block";
        passwordConfirmAlert.innerHTML = "Este campo es requerido";
        formularioValido = false;
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

    //Crear Formato JSON
    if (formularioValido) {
        // Cambiar el botón mientras se envía
        const originalText = formBtn.textContent;
        formBtn.textContent = 'Creando...';
        formBtn.disabled = true;


        //AQUI DEBE IR EL JSON---------------------------

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
    dateIpt.value = "";
    genderIpt.value = "";
    passwordIpt.value = "";
    passwordConfirmIpt.value = "";
    emailIpt.value = "";
    phoneIpt.value = "";


    nameAlert.style.display = "none";
    lastAlert.style.display = "none";
    dateAlert.style.display = "none"
    genderAlert.style.display = "none";
    passwordAlert.style.display = "none";
    passwordConfirmAlert.style.display = "none";
    emailAlert.style.display = "none";
    phoneAlert.style.display = "none";


});