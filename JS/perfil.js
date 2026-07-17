
const API_URL_PERFIL = 'http://localhost:8080/api'; 

async function obtenerDatosServidor() {
    try {
        
        const respuesta = await fetch(API_URL_PERFIL);
        if (!respuesta.ok) throw new Error(`Error en el servidor: ${respuesta.status}`);
        
        
        const usuario = await respuesta.json();

        
        if (usuario.nombre) document.getElementById('nombrePerfil').textContent = usuario.nombre;
        if (usuario.carrera) document.getElementById('carreraPerfil').textContent = usuario.carrera;
        if (usuario.sobreMi) document.getElementById('sobreMi').textContent = usuario.sobreMi;
        if (usuario.sobreCarrera) document.getElementById('sobreCarrera').textContent = usuario.sobreCarrera;
        
        
        if (usuario.avatarUrl) document.getElementById('fotoPerfil').src = usuario.avatarUrl;

    } catch (error) {
        console.error("No se pudo conectar con el backend, usando datos locales de respaldo:", error);
        
        
        const nombreGuardado = localStorage.getItem('nombreUsuario') || "Juan Perez";
        const carreraGuardada = localStorage.getItem('carreraUsuario') || "Software Developer";
        
        if (document.getElementById('nombrePerfil')) document.getElementById('nombrePerfil').textContent = nombreGuardado;
        if (document.getElementById('carreraPerfil')) document.getElementById('carreraPerfil').textContent = carreraGuardada;
    }
}


document.addEventListener("DOMContentLoaded", obtenerDatosServidor);

const btnEditar = document.getElementById("btnEditar");

btnEditar.addEventListener("click", editarPerfil);

function editarPerfil() {
    const sobreMi = document.getElementById("sobreMi");
    const sobreCarrera = document.getElementById("sobreCarrera");

    sobreMi.outerHTML = `
        <textarea id="txtSobreMi">${sobreMi.textContent}</textarea>
    `;

    sobreCarrera.outerHTML = `
        <textarea id="txtSobreCarrera">${sobreCarrera.textContent}</textarea>
    `;

    btnEditar.textContent = "Guardar";
    btnEditar.removeEventListener("click", editarPerfil);
    btnEditar.addEventListener("click", guardarPerfil);
}

function guardarPerfil() {
    const textoSobreMi = document.getElementById("txtSobreMi").value;
    const textoSobreCarrera = document.getElementById("txtSobreCarrera").value;

    document.getElementById("txtSobreMi").outerHTML = `
        <p id="sobreMi">${textoSobreMi}</p>
    `;

    document.getElementById("txtSobreCarrera").outerHTML = `
        <p id="txtSobreCarrera">${textoSobreCarrera}</p> 
    `;

    btnEditar.textContent = "Editar Perfil";
    btnEditar.removeEventListener("click", guardarPerfil);
    btnEditar.addEventListener("click", editarPerfil);
}

/* --- LEER DATOS DEL USUARIO ACTIVO --- */
const nombreGuardado = localStorage.getItem('nombreUsuario') || "";
const carreraGuardada = localStorage.getItem('carreraUsuario') || "";

// Pintar los datos del usuario en su tarjeta de perfil inmediatamente
const elemNombre = document.getElementById('nombrePerfil');
if (elemNombre) elemNombre.textContent = nombreGuardado;

const elemCarrera = document.getElementById('carreraPerfil');
if (elemCarrera) elemCarrera.textContent = carreraGuardada;


/* --- PUBLICACIONES --- */
const tarjeta = document.getElementById("nuevaPublicacion");
const encabezado = document.getElementById("togglePublicacion");
let tarjetaEditar = null; // Controla qué post se está editando

let publicaciones = JSON.parse(
    localStorage.getItem("publicaciones")
) || [];

// Si no hay publicaciones, creamos las iniciales usando los datos reales del usuario actual
if (publicaciones.length === 0) {
    publicaciones.push(
        {
            usuario: nombreGuardado,
            carrera: carreraGuardada,
            texto: "¡Hola a todos! Bienvenidos a Nexora 🚀",
            fecha: "Hace 5 minutos"
        },
        {
            usuario: nombreGuardado,
            carrera: carreraGuardada,
            texto: "Estoy desarrollando mi primer proyecto usando Spring Boot y Java.",
            fecha: "Hace 2 horas"
        },
        {
            usuario: nombreGuardado,
            carrera: carreraGuardada,
            texto: "¿Qué opinan sobre usar Docker para el desarrollo?",
            fecha: "Ayer"
        }
    );

    localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
}

// Mostrar posts al cargar
mostrarPublicaciones();


// Evento para Publicar o Guardar Edición
document.querySelector(".btn-publicar").addEventListener("click", () => {
    const texto = document.getElementById("textoPublicacion").value.trim();

    if (texto === "") {
        alert("Escribe una publicación.");
        return;
    }

    if (tarjetaEditar !== null) {
        // Si estamos editando un post existente
        publicaciones[tarjetaEditar].texto = texto;
        tarjetaEditar = null; // Resetear bandera de edición
    } else {
        // Si es una publicación nueva
        publicaciones.unshift({
            usuario: nombreGuardado,
            carrera: carreraGuardada,
            texto: texto,
            fecha: "Ahora"
        });
    }

    localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
    mostrarPublicaciones();

    document.getElementById("textoPublicacion").value = "";
    tarjeta.classList.remove("activo");
});

// Cancelar publicación/edición
document.querySelector(".btn-cancelar").addEventListener("click", (e) => {
    e.stopPropagation();
    document.getElementById("textoPublicacion").value = "";
    tarjetaEditar = null; // Cancelamos edición si estaba activa
    tarjeta.classList.remove("activo");
});

encabezado.addEventListener("click", () => {
    tarjeta.classList.toggle("activo");
});

document.querySelector(".post-body").addEventListener("click", (e) => {
    e.stopPropagation();
});


// Renderizar las publicaciones en el HTML
function mostrarPublicaciones() {
    const contenedor = document.getElementById("contenedorPublicaciones");
    if (!contenedor) return;
    
    contenedor.innerHTML = "";

    const datosAvatar = JSON.parse(localStorage.getItem("avatarUsuario"));
    let avatar = "https://api.dicebear.com/9.x/adventurer/svg?seed=Juan";

    if (datosAvatar) {
        avatar = `https://api.dicebear.com/9.x/${datosAvatar.estilo}/svg?seed=${datosAvatar.seed}&backgroundColor=${datosAvatar.fondo}`;
    }

    publicaciones.forEach((p, index) => {
        contenedor.innerHTML += `
        <div class="publicacion" data-id="${index}">
            <div class="publicacion-top">
                <div class="usuario-info">
                    <img class="avatar-post" src="${avatar}">
                    <div>
                        <h5>${p.usuario}</h5>
                        <span>${p.carrera}</span>
                    </div>
                </div>
                <div class="menu-container">
                    <button class="menu-post">
                        <i class="bi bi-three-dots"></i>
                        ...
                    </button>
                    <div class="menu-opciones">
                        <button class="editar-post">
                            <i class="bi bi-pencil"></i> ✏️ Editar
                        </button>
                        <button class="eliminar-post">
                            <i class="bi bi-trash"></i> 🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>
            <div class="publicacion-contenido">
                ${p.texto}
            </div>
            <hr>
            <div class="publicacion-footer">
                <button><i class="bi bi-hand-thumbs-up"></i> 👍</button>
                <button><i class="bi bi-chat"></i> 💬</button>
            </div>
        </div>
        `;
    });
}

// Mostrar/Ocultar Menú de los tres puntos (...)
document.addEventListener("click", (e) => {
    if (e.target.closest(".menu-post")) {
        const menu = e.target.closest(".menu-container").querySelector(".menu-opciones");

        document.querySelectorAll(".menu-opciones").forEach(m => {
            if (m !== menu) m.classList.remove("activo");
        });

        menu.classList.toggle("activo");
    } else {
        document.querySelectorAll(".menu-opciones").forEach(m => m.classList.remove("activo"));
    }
});

// Eliminar Publicación
document.addEventListener("click", (e) => {
    if (e.target.closest(".eliminar-post")) {
        const tarjetaPost = e.target.closest(".publicacion");
        const id = tarjetaPost.dataset.id;

        publicaciones.splice(id, 1);
        localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
        mostrarPublicaciones();
    }
});

// Cargar Publicación en el área de edición
document.addEventListener("click", (e) => {
    if (e.target.closest(".editar-post")) {
        const tarjetaPost = e.target.closest(".publicacion");
        const id = tarjetaPost.dataset.id;

        document.getElementById("textoPublicacion").value = publicaciones[id].texto;
        tarjetaEditar = id; // Guardamos el índice que estamos editando

        document.getElementById("nuevaPublicacion").classList.add("activo");
    }
});

// Cerrar Sesión
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', function() {
        localStorage.removeItem('nombreUsuario');
        localStorage.removeItem('carreraUsuario');
        window.location.href = 'login.html';
    });
}