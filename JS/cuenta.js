
// Inputs
const nameIpt = document.getElementById("nameIpt");
const lastIpt = document.getElementById("lastIpt");
const dateIpt = document.getElementById("dateIpt");
const genderIpt = document.getElementById("genderIpt");
const emailIpt = document.getElementById("emailIpt");
const phoneIpt = document.getElementById("phoneIpt");
const passwordIpt = document.getElementById("passwordIpt");
const passwordConfirmIpt = document.getElementById("passwordConfirmIpt");
const roleIpt = document.getElementById("roleIpt");
const areaIpt = document.getElementById("areaIpt");

// Alertas
const nameAlert = document.getElementById("nameAlert");
const lastAlert = document.getElementById("lastAlert");
const dateAlert = document.getElementById("dateAlert");
const genderAlert = document.getElementById("genderAlert");
const emailAlert = document.getElementById("emailAlert");
const phoneAlert = document.getElementById("phoneAlert");
const passwordAlert = document.getElementById("passwordAlert");
const passwordConfirmAlert = document.getElementById("passwordConfirmAlert");
const roleAlert = document.getElementById("roleAlert");
const areaAlert = document.getElementById("areaAlert");

// Botones
const formBtn = document.getElementById("formBtn");
const delBtn = document.getElementById("delBtn");

// Expresiones regulares
const regexEmail = (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
const regexName = (/^[A-Za-zÑñÁáÉéÍíÓóÚúüÜ]+(?:[' -][A-Za-zÑñÁáÉéÍíÓóÚúüÜ]+)*$/);
const regexPhone = /^\d{10}$/;
const regexPassword = (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])[a-zA-Z0-9]{8,}$/);


// Validar contraseña con lista en tiempo real
function validateRequirement(elementId, requirement) {
    const element = document.getElementById(elementId);
    if (element) {
        if (requirement) {
            element.classList.remove("invalid");
            element.classList.add("valid");
        } else {
            element.classList.remove("valid");
            element.classList.add("invalid");
        }
    }
}

passwordIpt.addEventListener("input", (evento) => {
    const password = evento.target.value;
    validateRequirement("lengthPassword", password.length >= 8);
    validateRequirement("mayuscPassword", /[A-Z]/.test(password));
    validateRequirement("minuscPassword", /[a-z]/.test(password));
    validateRequirement("numberPassword", /[0-9]/.test(password));
});


// Cargar rango de fechas dinámico
dateIpt.addEventListener("click", () => {
    const hoy = new Date();
    const max = new Date(hoy);
    max.setFullYear(hoy.getFullYear() - 12);
    const min = new Date(hoy);
    min.setFullYear(hoy.getFullYear() - 120);
    dateIpt.max = max.toISOString().split('T')[0];
    dateIpt.min = min.toISOString().split('T')[0];
});


// Validación y Envío del Formulario
formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let formularioValido = true;

    // Nombre
    if (!regexName.test(nameIpt.value) || nameIpt.value.length < 3 || nameIpt.value.length > 10) {
        nameAlert.style.display = "block";
        nameAlert.innerText = "El nombre debe contener entre 3 y 10 letras.";
        formularioValido = false;
    } else {
        nameAlert.style.display = "none";
    }

    // Apellido
    if (!regexName.test(lastIpt.value) || lastIpt.value.length < 3 || lastIpt.value.length > 10) {
        lastAlert.style.display = "block";
        lastAlert.innerText = "El apellido debe contener entre 3 y 10 letras.";
        formularioValido = false;
    } else {
        lastAlert.style.display = "none";
    }

    // Fecha de Nacimiento
    const hoy = new Date();
    const max = new Date(hoy);
    const dateUser = new Date(dateIpt.value);
    max.setFullYear(hoy.getFullYear() - 12);
    const min = new Date(hoy);
    min.setFullYear(hoy.getFullYear() - 120);

    if (dateIpt.value != "") {
        if (dateUser > max || dateUser < min) {
            dateAlert.style.display = "block";
            dateAlert.innerHTML = "Debes tener 12 años o más para crear una cuenta";
            formularioValido = false;
        } else {
            dateAlert.style.display = "none";
        }
    } else {
        dateAlert.style.display = "block";
        dateAlert.innerHTML = "El campo de fecha está vacío";
        formularioValido = false;
    }

    // Género
    if (genderIpt.value == "") {
        genderAlert.style.display = "block";
        genderAlert.innerHTML = "Por favor, selecciona tu género antes de continuar.";
        formularioValido = false;
    } else {
        genderAlert.style.display = "none";
    }

    // Contraseña
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

    // Confirmar Contraseña
    if (passwordConfirmIpt.value != "") {
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
        emailAlert.innerText = "Ingrese un correo electrónico válido.";
        formularioValido = false;
    } else {
        emailAlert.style.display = "none";
    }

    // Teléfono
    const numerosRepetidos = /^(\d)\1{9}$/;
    if (!regexPhone.test(phoneIpt.value.trim())) {
        phoneAlert.style.display = "block";
        phoneAlert.innerText = "Ingrese un teléfono de 10 dígitos válido.";
        formularioValido = false;
    } else if (numerosRepetidos.test(phoneIpt.value)) {
        phoneAlert.style.display = "block";
        phoneAlert.innerText = "El teléfono no puede contener los 10 dígitos iguales.";
        formularioValido = false;
    } else if (phoneIpt.value === "1234567890" || phoneIpt.value === "0123456789") {
        phoneAlert.style.display = "block";
        phoneAlert.innerText = "Ingrese un teléfono válido.";
        formularioValido = false;
    } else {
        phoneAlert.style.display = "none";
    }

    // Rol
    if (roleIpt.value == "") {
        roleAlert.style.display = "block";
        roleAlert.innerHTML = "Por favor, selecciona tu rol.";
        formularioValido = false;
    } else {
        roleAlert.style.display = "none";
    }

    // Especialidad
    if (areaIpt.value == "") {
        areaAlert.style.display = "block";
        areaAlert.innerHTML = "Por favor, selecciona tu especialidad.";
        formularioValido = false;
    } else {
        areaAlert.style.display = "none";
    }

    // Guardar en JSON si el formulario es válido
    if (formularioValido) {
        const originalText = formBtn.textContent;
        formBtn.textContent = 'Creando...';
        formBtn.disabled = true;

        // 1. Crear el objeto con los datos del nuevo usuario
        const nuevoUsuario = {
            nombre: nameIpt.value.trim(),
            apellido: lastIpt.value.trim(),
            fechaNacimiento: dateIpt.value,
            genero: genderIpt.value,
            email: emailIpt.value.trim(),
            telefono: phoneIpt.value,
            password: passwordIpt.value, 
            rol: roleIpt.value,
            area: areaIpt.value
        };

        // 2. Obtener lista existente
        const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        
        // 3. Empujar nuevo usuario
        usuariosGuardados.push(nuevoUsuario);

        // 4. Guardar base de datos actualizada
        localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));

        // 5. Opcional: Si quieres que el último usuario registrado inicie sesión automáticamente al crearse
        localStorage.setItem('nombreUsuario', `${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`);
        localStorage.setItem('carreraUsuario', nuevoUsuario.area);

        setTimeout(() => {
            alert("¡Cuenta creada con éxito! Serás redirigido.");
            delBtn.click(); // Limpia los campos
            formBtn.textContent = originalText;
            formBtn.disabled = false;
            
            // Aquí decides si mandarlo a iniciar sesión al login o directo al perfil
            window.location.href = "login.html"; 
        }, 1500);
    }
});

// Limitar teléfono a 10 dígitos en tiempo real
phoneIpt.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 10);
});

// Botón de Borrar (Limpieza)
delBtn.addEventListener("click", (e) => {
    e.preventDefault();

    nameIpt.value = "";
    lastIpt.value = "";
    dateIpt.value = "";
    genderIpt.value = "";
    passwordIpt.value = "";
    passwordConfirmIpt.value = "";
    emailIpt.value = "";
    phoneIpt.value = "";
    roleIpt.value = "";
    areaIpt.value = "";

    nameAlert.style.display = "none";
    lastAlert.style.display = "none";
    dateAlert.style.display = "none";
    genderAlert.style.display = "none";
    passwordAlert.style.display = "none";
    passwordConfirmAlert.style.display = "none";
    emailAlert.style.display = "none";
    phoneAlert.style.display = "none";
    roleAlert.style.display = "none";
    areaAlert.style.display = "none";
    
    document.getElementById("lengthPassword").classList.remove("valid");
    document.getElementById("lengthPassword").classList.add("invalid");
    document.getElementById("mayuscPassword").classList.remove("valid");
    document.getElementById("mayuscPassword").classList.add("invalid");
    document.getElementById("minuscPassword").classList.remove("valid");
    document.getElementById("minuscPassword").classList.add("invalid");
    document.getElementById("numberPassword").classList.remove("valid");
    document.getElementById("numberPassword").classList.add("invalid");
});