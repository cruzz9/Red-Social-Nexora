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
        <p id="sobreCarrera">${textoSobreCarrera}</p> 
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
            fecha: "Hace 5 minutos",
            likes: [],
            comentarios: []
            
        },
        {
            usuario: nombreGuardado,
            carrera: carreraGuardada,
            texto: "Estoy desarrollando mi primer proyecto usando Spring Boot y Java.",
            fecha: "Hace 2 horas",
            likes: [],
            comentarios: []
        },
        {
            usuario: nombreGuardado,
            carrera: carreraGuardada,
            texto: "¿Qué opinan sobre usar Docker para el desarrollo?",
            fecha: "Ayer",
            likes: [],
            comentarios: []
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
            fecha: "Ahora",
            likes: [],
            comentarios: []
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
        // Asegurar que las propiedades existan
        if (!p.likes) p.likes = [];
        if (!p.comentarios) p.comentarios = [];

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
            <div class="publicacion-contenido mb-2">
                ${p.texto}
            </div>
            <hr>
            <div class="container d-flex justify-content-end align-items-center gap-2 mb-3">
                <!-- Botón de Like -->
                <button type="button" class="btn btnCard btn-like" data-id="${index}">
                    <i class="${p.likes.includes('Tú') ? 'fa-solid' : 'fa-regular'} fa-thumbs-up"></i>
                    <span class="ms-2 like-count">${p.likes.length}</span>
                </button>
                
                <!-- Botón de Comentarios -->
                <button type="button" class="btn btnCard btn-mostrar-comentarios" data-id="${index}">
                    <i class="fa-regular fa-comment"></i>
                </button>
            </div>

            <!-- Sección de Comentarios (Oculta por defecto) -->
            <div class="comentarios-seccion" id="comentarios-${index}" style="display: none;">
                <div class="input-group mb-3">
                    <input type="text" class="form-control comentario-input" placeholder="Escribe un comentario...">
                    <button class="btn btn-primary btn-comentar" data-id="${index}">Publicar</button>
                </div>
                
                <div class="lista-comentarios">
                    ${p.comentarios.map(c => {
                        const autor = c.autor || 'Tú';
                        const seed = encodeURIComponent(autor);
                        const avatarComentario = `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
                        const fecha = c.fechaCreacion ? new Date(c.fechaCreacion).toLocaleString() : '';

                        return `
                        <div class="d-flex mb-2">
                            <img src="${avatarComentario}" class="rounded-circle me-2" style="width: 30px; height: 30px; object-fit: cover;">
                            <div class="flex-grow-1">
                                <div class="border rounded p-2" style="background-color: #1e293b; border-color: #334155;">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <strong style="color: #38bdf8; font-size: 0.8rem;">${autor}</strong>
                                        ${fecha ? `<small style="font-size: 0.7rem; color: #94a3b8;">${fecha}</small>` : ''}
                                    </div>
                                    <p class="mb-0 text-break" style="color: #e2e8f0; font-size: 0.85rem;">${c.contenido}</p>
                                </div>
                            </div>
                        </div>
                        `;
                    }).join("")}
                </div>
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


/* --- EVENTOS DE LIKES Y COMENTARIOS --- */
document.addEventListener("click", (evento) => {
    // 1. Lógica del Like
    const botonLike = evento.target.closest(".btn-like");
    if (botonLike) {
        const index = Number(botonLike.dataset.id);
        const publicacion = publicaciones[index];

        if (publicacion) {
            if (!publicacion.likes) publicacion.likes = [];

            const indexLike = publicacion.likes.indexOf("Tú");
            if (indexLike === -1) {
                publicacion.likes.push("Tú");
            } else {
                publicacion.likes.splice(indexLike, 1);
            }

            localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
            mostrarPublicaciones();
        }
        return;
    }

    // 2. Lógica de Mostrar/Ocultar Comentarios
    const botonMostrar = evento.target.closest(".btn-mostrar-comentarios");
    if (botonMostrar) {
        const index = botonMostrar.dataset.id;
        const seccionComentarios = document.getElementById(`comentarios-${index}`);
        if (seccionComentarios) {
            seccionComentarios.style.display = seccionComentarios.style.display === "none" ? "block" : "none";
        }
        return;
    }

    // 3. Lógica de Publicar Comentario
    const botonComentar = evento.target.closest(".btn-comentar");
    if (botonComentar) {
        const index = Number(botonComentar.dataset.id);
        const input = botonComentar.closest(".comentarios-seccion").querySelector(".comentario-input");
        const texto = input.value.trim();

        if (texto === "") {
            alert("Por favor, escribe un comentario.");
            return;
        }

        const publicacion = publicaciones[index];
        if (publicacion) {
            if (!publicacion.comentarios) publicacion.comentarios = [];

            const nuevoComentario = {
                autor: "Tú",
                contenido: texto,
                fechaCreacion: new Date().toISOString()
            };

            publicacion.comentarios.push(nuevoComentario);
            localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
            mostrarPublicaciones();

            // Mantenemos la sección de comentarios abierta tras renderizar
            const seccionComentarios = document.getElementById(`comentarios-${index}`);
            if (seccionComentarios) seccionComentarios.style.display = "block";
        }
        return;
    }
});