// login.js

// Datos de usuarios de prueba que se almacenarán en LocalStorage
const usuariosPrueba = [
    {
        email: "usuario@nexora.com",
        password: "123456",
        nombre: "Usuario Demo"
    },
    {
        email: "admin@nexora.com",
        password: "admin123",
        nombre: "Administrador"
    }
];

// Inicializar usuarios en LocalStorage si no existen
function inicializarUsuarios() {
    if (!localStorage.getItem('usuarios')) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosPrueba));
    }
}

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

// Autenticar usuario
// En login.js, modificar la función autenticarUsuario:

function autenticarUsuario(email, password) {
    // Ya lee del LocalStorage correctamente
    const usuariosAlmacenados = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Para debugging (puedes quitarlo en producción)
    console.log('Usuarios registrados:', usuariosAlmacenados);
    
    const usuarioEncontrado = usuariosAlmacenados.find(
        usuario => usuario.email === email && usuario.password === password
    );
    
    if (usuarioEncontrado) {
        console.log('Usuario encontrado:', usuarioEncontrado);
        return usuarioEncontrado;
    } else {
        console.log('No se encontró el usuario');
        return null;
    }
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
function manejarLogin(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    
    // Obtener valores de los campos
    const email = document.getElementById('InputEmail').value;
    const password = document.getElementById('InputPassword').value;
    
    // Validar campos vacíos
    const erroresValidacion = validarCampos(email, password);
    
    if (erroresValidacion.length > 0) {
        mostrarError(erroresValidacion.join('. '));
        return;
    }
    
    // Validar formato de email
    if (!validarEmail(email)) {
        mostrarError('Por favor ingresa un email válido');
        return;
    }
    
    // Mostrar carga mientras se verifica
    Swal.fire({
        title: 'Verificando credenciales',
        text: 'Espere un momento...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
    
    // Simular tiempo de verificación
    setTimeout(() => {
        // Autenticar usuario
        const usuario = autenticarUsuario(email, password);
        
        if (usuario) {
            // Login exitoso - guardar sesión del usuario
            localStorage.setItem('usuarioLogueado', JSON.stringify({
                email: usuario.email,
                nombre: usuario.nombre
            }));
            
            mostrarExito(`¡Bienvenido ${usuario.nombre}! Redirigiendo...`);
            
            // Redirigir a la página de inicio después de 2 segundos
            setTimeout(() => {
                window.location.href = './index.html'; // Cambia esto a tu página de inicio
            }, 2000);
        } else {
            // Login fallido
            Swal.close(); // Cerrar el loader
            mostrarError('Usuario o contraseña inválidos');
        }
    }, 1500);
}

// Event Listener cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar usuarios de prueba en LocalStorage
    inicializarUsuarios();
    
    // Agregar event listener al formulario
    const formulario = document.querySelector('form');
    formulario.addEventListener('submit', manejarLogin);
    
    // Verificar si el usuario ya está logueado
    const usuarioLogueado = localStorage.getItem('usuarioLogueado');
    if (usuarioLogueado) {
        const usuario = JSON.parse(usuarioLogueado);
        mostrarExito(`Ya has iniciado sesión como ${usuario.nombre}`);
    }

    // Manejar clic en "Crear Cuenta"
    document.getElementById('btnCrearCuenta').addEventListener('click', function() {
    window.location.href = './cuenta.html'; // Cambia a tu página de crear cuenta
});
});

// Función para cerrar sesión (útil para otras páginas)
function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    window.location.href = './login.html';
}

// Hacer la función cerrarSesion globalmente disponible
window.cerrarSesion = cerrarSesion;
// Manejar clic en "Crear Cuenta"
document.getElementById('btnCrearCuenta').addEventListener('click', function() {
    window.location.href = './cuenta.html'; // Cambia a tu página de crear cuenta
});