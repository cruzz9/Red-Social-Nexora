// login.js

// Validar campos vacíos
function validarCampos(email, password) {
    const errores = [];

    if (!email || email.trim() === '') {
        errores.push('El campo Usuario está vacío');
    }

    if (!password || password.trim() === '') {
        errores.push('El campo Contraseña está vacío');
    }

    return errores;
}

// Validar formato de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostrar mensaje de error con SweetAlert2
function mostrarError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
        confirmButtonText: 'Intentar de nuevo',
        confirmButtonColor: '#dc3545'
    });
}

// Mostrar mensaje de éxito con SweetAlert2
function mostrarExito(mensaje) {
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: mensaje,
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true
    });
}

// Manejar el envío del formulario
async function manejarLogin(event) {
    event.preventDefault();

    const email = document.getElementById('InputEmail').value;
    const password = document.getElementById('InputPassword').value;

    const erroresValidacion = validarCampos(email, password);

    if (erroresValidacion.length > 0) {
        mostrarError(erroresValidacion.join('. '));
        return;
    }

    if (!validarEmail(email)) {
        mostrarError('Por favor ingresa un email válido');
        return;
    }

    Swal.fire({
        title: 'Verificando credenciales',
        text: 'Espere un momento...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        const respuesta = await fetch('http://localhost:8080/api/usuarios/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                contrasena: password
            })
        });

        Swal.close();

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            throw new Error(errorData.error || 'Usuario o contraseña incorrectos');
        }

        const data = await respuesta.json();

        // Guardamos el token, indispensable para peticiones protegidas más adelante
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuarioId', data.usuarioId);
        localStorage.setItem('nombreUsuario', data.nombre);

        mostrarExito(`¡Bienvenido ${data.nombre}! Redirigiendo...`);

        setTimeout(() => {
            window.location.href = './perfil.html';
        }, 2000);
    } catch (error) {
        Swal.close();
        mostrarError(error.message || 'Usuario o contraseña inválidos o error de conexión en el servidor.');
        console.error(error);
    }
}

// Event Listener cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector('form');
    formulario.addEventListener('submit', manejarLogin);

    // Verificar si el usuario ya está logueado
    const tokenExistente = localStorage.getItem('token');
    if (tokenExistente) {
        const nombre = localStorage.getItem('nombreUsuario');
        mostrarExito(`Ya has iniciado sesión como ${nombre}`);
        setTimeout(() => {
            window.location.href = './perfil.html';
        }, 1200);
    }

    // Manejar clic en "Crear Cuenta"
    document.getElementById('btnCrearCuenta').addEventListener('click', function () {
        window.location.href = './cuenta.html';
    });
});

// Función para cerrar sesión (útil para otras páginas)
function cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('nombreUsuario');
    window.location.href = './login.html';
}

window.cerrarSesion = cerrarSesion;