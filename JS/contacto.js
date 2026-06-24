//constantes nombre, correo, telefono y mensaje
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const correo = document.getElementById("correo");
const telefono = document.getElementById("telefono");
const mensaje = document.getElementById("mensaje");
const formBtn = document.getElementById("formBtn");

//Expresiones regulares
const regexEmail = (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);
const regexName = (/^[A-Za-zÑñÁáÉéÍíÓóÚúüÜ]+(?:[' -][A-Za-zÑñÁáÉéÍíÓóÚúüÜ]+)*$/);
const regexPhone = (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);

//condicionales 
formBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // NOMBRE (mínimo 3, máximo 20 letras)
    if (!regexName.test(nombre.value) || nombre.value.length < 3 || nombre.value.length > 10) {
        feedbacknameAlert.style.display = "block";
        feedbacknameAlert.innerText = "El nombre debe contener entre 3 y 10 letras.";
    } else {
        feedbacknameAlert.style.display = "none";
    }

    // APELLIDO (mínimo 3, máximo 10 letras)
    if (!regexName.test(apellido.value) || apellido.value.length < 3 || apellido.value.length > 10) {
        feedbackapellidoAlert.style.display = "block";
        feedbackapellidoAlert.innerText = "El apellido debe contener entre 3 y 10 letras.";
    } else {
        feedbackapellidoAlert.style.display = "none";
    }

    if (!regexPhone.test(telefono.value)) {
        feedbackphoneAlert.style.display = "block";
        feedbackphoneAlert.innerText = "Ingrese un número de teléfono válido.";
    } else {
        feedbackphoneAlert.style.display = "none";
        
    }

    if (!regexEmail.test(correo.value)) {
        feedbackEmailAlert.style.display = "block";
        feedbackEmailAlert.innerText = "Ingrese un correo valido por favor.";
    }else {
        feedbackEmailAlert.style.display = "none";
    }//correo

    if (mensaje.value.length <= 250){
        feedbackMessageAlert.style.display = "block";
        feedbackMessageAlert.innerText = "El mensaje puede tener máximo 250 caracteres y evita lenguaje ofensivo.";
    } else {
        feedbackMessageAlert.style.display = "none";
    }//mensaje

});//Addeventlistener

document.getElementById('telefono').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
});