// navbar.js
const header = document.getElementById("header");

// 1. Verificamos si existe un usuario logueado en el LocalStorage
const usuarioLogueado = localStorage.getItem('usuarioLogueado');

// 2. Definimos dinámicamente el último elemento de la lista según el estado de la sesión
let botonSesionHTML = '';

if (usuarioLogueado) {
    // Si el usuario ya inició sesión, mostramos la opción de salir
    botonSesionHTML = `
        <li class="nav-item">
            <a class="nav-link text-danger" href="#" id="btnCerrarSesion">Cerrar Sesión</a>
        </li>
    `;git 
} else {
    // Si no hay sesión, mostramos el enlace tradicional de ingreso
    botonSesionHTML = `
        <li class="nav-item">
            <a class="nav-link" href="login.html">Log in</a>
        </li>
    `;
}

// 3. Inyectamos la estructura completa del navbar incluyendo nuestro botón dinámico
header.innerHTML = ` 
    <div class="nav nav-underline logo">
        <img id=\"nexoralogo\" src=\"./assets/nexoralogo.png\" alt=\"Logo Nexora\">
        <a class=\"nav-link\" href=\"index.html\">Nexora</a>
        <button id=\"btnMenu\" class=\"hamburger\">
            ☰
        </button>
    </div>

    <ul id=\"apages\" class=\"nav nav-underline\">
        <li class=\"nav-item\">
            <a class=\"nav-link\" href=\"index.html\">Inicio</a>
        </li>
        <li class=\"nav-item\">
            <a class=\"nav-link\" href=\"perfil.html\">Perfil</a>
        </li>
        <li class=\"nav-item\">
            <a class=\"nav-link\" href=\"cuenta.html\">Crear cuenta</a>
        </li>
        <li class=\"nav-item\">
            <a class=\"nav-link\" href=\"nosotros.html\">Nosotros</a>
        </li>
        <li class=\"nav-item\">
            <a class=\"nav-link\" href=\"contactanos.html\">Contáctanos</a>
        </li>
        ${botonSesionHTML}
    </ul>
`;

// 4. Esperamos a que el DOM esté completamente cargado para activar la lógica interactiva
window.addEventListener("DOMContentLoaded", () => {

    // Gestión del estado activo (subrayado de la página actual)
    const links = document.querySelectorAll(".nav-link");
    const currentPath = window.location.pathname.split("/").pop();

    links.forEach(link => {
        link.classList.remove("nav-active");
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("nav-active");
        }
    });

    // Lógica del menú hamburguesa (código existente de tu app)
    const btnMenu = document.getElementById("btnMenu");
    // ... (aquí mantienen la lógica de apertura/cierre de su menú móvil) ...


    // 5. ASIGNACIÓN DEL EVENTO CLIC PARA CERRAR SESIÓN
    // Buscamos el botón interactivo que acabamos de inyectar
    const botonSalir = document.getElementById("btnCerrarSesion");

    // Si el elemento existe (lo que significa que el usuario está logueado)
    if (botonSalir) {
        botonSalir.addEventListener("click", (evento) => {
            // Evitamos que el enlace '#' intente recargar o saltar al inicio de la página
            evento.preventDefault(); 
            
            // Eliminamos la sesión del almacenamiento local del navegador
            localStorage.removeItem('usuarioLogueado');
            
            // Redireccionamos inmediatamente a la pestaña de login
            window.location.href = 'login.html';
        });
    }
});