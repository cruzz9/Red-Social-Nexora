class PostsController {
    constructor(currentId = 0) {
        this.posts = [];
        this.currentId = currentId;
    }

    addPost(img, nombre, especialidad, descripcion) {
        this.currentId++;

        const newPost = {
            id: this.currentId,
            img: img,
            nombre: nombre,
            especialidad: especialidad,
            descripcion: descripcion,
            comentarios: [],
            likes: []
        };

        this.posts.push(newPost);
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem(
            "posts",
            JSON.stringify(this.posts)
        );
    }

    loadPostsFromLocalStorage() {
        const posts = localStorage.getItem("posts");
        if (posts) {
            this.posts = JSON.parse(posts);
            if (this.posts.length > 0) {
                this.currentId = this.posts[this.posts.length - 1].id;
            }

            // Migración básica simplificada
            this.posts.forEach(post => {
                if (!post.likes) post.likes = [];
                if (!post.comentarios) post.comentarios = [];

                post.comentarios = post.comentarios.map(c => {
                    if (typeof c === 'string') {
                        return {
                            comentarioId: Date.now().toString() + Math.random().toString().slice(2, 5),
                            contenido: c,
                            autor: "Tú",
                            fechaCreacion: new Date().toISOString(),
                            publicacion: { id: post.id }
                        };
                    }
                    return c;
                });
            });

            this.saveToLocalStorage();
        }
    }

    eliminarPost(id) {
        this.posts = this.posts.filter(post => post.id !== id);
        this.saveToLocalStorage();
    }

    editarPost(id, nuevaDescripcion, nuevaImagen) {
        const post = this.posts.find(p => p.id === id);
        if (post) {
            post.descripcion = nuevaDescripcion;
            if (nuevaImagen) {
                post.img = nuevaImagen;
            }
            this.saveToLocalStorage();
        }
    }

    toggleLike(id, usuario = "Tú") {
        const post = this.posts.find(p => p.id === id);
        if (post) {
            if (!post.likes) post.likes = [];

            const index = post.likes.indexOf(usuario);
            if (index === -1) {
                post.likes.push(usuario);
            } else {
                post.likes.splice(index, 1);
            }
            this.saveToLocalStorage();
        }
    }

    addComentario(id, texto, autor = "Tú") {
        const post = this.posts.find(p => p.id === id);
        if (post) {
            if (!post.comentarios) post.comentarios = [];
            
            const datosAvatar = JSON.parse(localStorage.getItem("avatarUsuario"));
            let avatarUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${autor}`;

            if (datosAvatar) {
                avatarUrl = `https://api.dicebear.com/9.x/${datosAvatar.estilo}/svg?seed=${datosAvatar.seed}&backgroundColor=${datosAvatar.fondo}`;
            }

            const nuevoComentario = {
                comentarioId: Date.now().toString(), 
                contenido: texto.trim(),
                autor: autor,
                avatar: avatarUrl,
                fechaCreacion: new Date().toISOString(),
                publicacion: { id: post.id }
            };

            post.comentarios.push(nuevoComentario);
            this.saveToLocalStorage();
        }
    }
}

// 1. Instanciamos nuestro controlador
const testController = new PostsController();

// 2. Intentamos cargar los posts que ya existan en LocalStorage
testController.loadPostsFromLocalStorage();

// 3. Control de Datos de Prueba (Seeding)
if (testController.posts.length === 0) {
    testController.addPost("#", "Raul", "Developer Jr.", "Me gusta trabajar en equipo");
    testController.addPost("#", "Ana", "UX/UI Designer", "Apasionada por crear experiencias digitales accesibles.");
    testController.addPost("#", "Carlos", "Backend Developer", "Especializado en construir APIs robustas con Node.js.");
    testController.addPost("#", "Sofía", "Scrum Master", "Me encanta facilitar la comunicación en los equipos con metodologías ágiles.");
    testController.addPost("#", "Diego", "Data Analyst", "Transformando datos complejos en decisiones estratégicas.");
    testController.addPost("#", "Elena", "QA Engineer", "Asegurando que cada línea de código sea impecable.");
    testController.addPost("#", "Miguel", "DevOps Engineer", "Automatizando despliegues de forma eficiente.");
    testController.addPost("#", "Laura", "Product Manager", "Definiendo la visión del producto junto a ingeniería.");
    testController.addPost("#", "Javier", "Cybersecurity Specialist", "Protegiendo la infraestructura digital y promoviendo buenas prácticas.");
    testController.addPost("#", "Valeria", "Cloud Engineer", "Diseñando arquitecturas escalables en la nube.");
}

function mostrarAlerta(mensaje, tipo = "danger") {
    const alertContainer = document.getElementById("alertContainer");
    if (!alertContainer) return;

    alertContainer.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show p-3 w-100 m-1" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

// Variable global para almacenar las especialidades
const BASE_URL = 'http://localhost:8080/api';
let especialidadesDisponibles = [];

async function cargarEspecialidades() {
    try {
        const response = await fetch(`${BASE_URL}/especialidades`);
        if (response.ok) {
            especialidadesDisponibles = await response.json();
        } else {
            throw new Error("No se pudo conectar al backend");
        }
    } catch (error) {
        console.warn("Usando especialidades de respaldo (Fallback):", error);
        especialidadesDisponibles = [
            { id: 1, especialidad: "Developer Jr." },
            { id: 2, especialidad: "UX/UI Designer" },
            { id: 3, especialidad: "Backend Developer" },
            { id: 4, especialidad: "Frontend Developer" },
            { id: 5, especialidad: "DevOps Engineer" },
            { id: 6, especialidad: "Data Analyst" }
        ];
    }
    renderizarSelectEspecialidades();
}

function renderizarSelectEspecialidades() {
    const select = document.getElementById("especialidadUsuario");
    if (!select) return;

    select.innerHTML = '<option value="">Selecciona tu especialidad...</option>';
    especialidadesDisponibles.forEach(esp => {
        const option = document.createElement("option");
        option.value = esp.id; 
        option.textContent = esp.especialidad; 
        select.appendChild(option);
    });
}

// Cargar especialidades al iniciar el script
cargarEspecialidades();

// 4. Renderizado en el DOM al cargar la estructura HTML
document.addEventListener("DOMContentLoaded", () => {
    const prodRow = document.getElementById("prodRow");

    function obtenerAvatarActual(nombreUsuario) {
        const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
        const nombreSesion = usuarioLogueado ? usuarioLogueado.nombre : localStorage.getItem("nombreUsuario");
        const datosAvatar = JSON.parse(localStorage.getItem("avatarUsuario"));

        if (datosAvatar && nombreSesion && (nombreUsuario === nombreSesion || nombreUsuario === "Tú")) {
            return `https://api.dicebear.com/9.x/${datosAvatar.estilo}/svg?seed=${datosAvatar.seed}&backgroundColor=${datosAvatar.fondo}`;
        }

        const seedUnico = encodeURIComponent(nombreUsuario || "Usuario");
        return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seedUnico}`;
    }

    const toggleDudaForm = document.getElementById("toggleDudaForm");
    const dudaFormContainer = document.getElementById("dudaFormContainer");
    const btnPublicarDudaCard = document.getElementById("btnPublicarDudaCard");
    const btnCancelarDuda = document.getElementById("btnCancelarDuda");
    const textoNuevaDuda = document.getElementById("textoNuevaDuda");
    const preview = document.getElementById("preview");
    const selectEspecialidad = document.getElementById("especialidadUsuario");

    let imagenBase64 = "#";

    // --- RENDER FEED ---
    const renderFeed = () => {
        if (!prodRow) return;
        prodRow.innerHTML = "";
        testController.posts.slice().reverse().forEach((post) => {
            let imagenAdjuntaHtml = "";
            if (post.img && post.img !== "#" && !post.img.startsWith("https://api.dicebear.com")) {
                imagenAdjuntaHtml = `
                    <div class="mb-3 text-center containerImage" style="border-radius: 8px; overflow: hidden; background-color: #0b1329; display: flex; align-items: center; justify-content: center; max-height: 450px;">
                        <img class="imageCard" src="${post.img}" alt="Imagen adjunta" style="max-width: 100%; max-height: 450px; object-fit: contain; display: block; margin: 0 auto;">
                    </div>
                `;
            }

            prodRow.insertAdjacentHTML('beforeend', `   
                <div class="post-card m-2 w-100" style="position: relative;"> 
                    <div class="post-header">
                        <img src="${obtenerAvatarActual(post.nombre)}" class="profile-pic">      
                        <div class="author-info">
                            <div class="name-container"><span class="author-name">${post.nombre}</span></div>
                            <p class="author-role" style="color: #38bdf8; font-weight: 500;">
                                ${
                                    post.especialidad 
                                        ? (typeof post.especialidad === 'object' ? (post.especialidad.especialidad || "Sin especialidad") : post.especialidad)
                                        : "Sin especialidad"
                                }
                            </p>
                        </div>
                        <div class="dropdown" style="position: absolute; top: 15px; right: 15px;"> 
                            <button type="button" class="btnCardOptions" data-bs-toggle="dropdown"><i class="fa-solid fa-ellipsis"></i></button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item btn-editar" href="#" data-id="${post.id}"><i class="fa-solid fa-pen me-2"></i> Editar</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-danger btn-eliminar" href="#" data-id="${post.id}"><i class="fa-solid fa-trash me-2"></i> Eliminar</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="post-content">
                        <p>${post.descripcion}</p>
                        ${imagenAdjuntaHtml}
                        <hr>
                        <div class="container d-flex justify-content-end align-items-center gap-2 mb-3">
                            <button type="button" class="btn btn-outline-primary btnCard btn-like" data-id="${post.id}">
                                <i class="${(post.likes && post.likes.includes('Tú')) ? 'fa-solid' : 'fa-regular'} fa-thumbs-up"></i>
                                <span class="ms-2 like-count">${post.likes ? post.likes.length : 0}</span>
                            </button>
                            <button type="button" class="btn btn-outline-primary btnCard btnMostrarComentarios"><i class="fa-regular fa-comment"></i></button>
                        </div>
                        <div class="comentarios" style="display:none;">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control comentario-input" placeholder="Escribe un comentario...">
                                <button class="btn btn-primary btn-comentar" data-id="${post.id}">Publicar</button>
                            </div>
                            <div class="lista-comentarios">
                                ${(post.comentarios ?? []).map(c => {
                                    const esObjeto = typeof c === 'object' && c !== null;
                                    const contenido = esObjeto ? (c.contenido || '') : (c || '');
                                    const autor = esObjeto ? (c.autor || 'Tú') : 'Tú';
                                    const avatar = esObjeto && c.avatar ? c.avatar : obtenerAvatarActual(autor);
                                    const fecha = esObjeto && c.fechaCreacion ? new Date(c.fechaCreacion).toLocaleString() : '';

                                    return `
                                        <div class="d-flex mb-3">
                                            <img src="${avatar}" alt="${autor}" class="rounded-circle me-2" style="width: 35px; height: 35px; object-fit: cover;" onerror="this.src='https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(autor)}'">
                                            <div class="flex-grow-1">
                                                <div class="border rounded p-2" style="background-color: #1e293b; border-color: #334155;">
                                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                                        <strong style="color: #38bdf8; font-size: 0.875rem;">${autor}</strong>
                                                        ${fecha ? `<small style="font-size: 0.75rem; color: #94a3b8; background: transparent;">${fecha}</small>` : ''}
                                                    </div>
                                                    <p class="mb-0 text-break" style="color: #e2e8f0; font-size: 0.9rem;">${contenido}</p>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                }).join("")}
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    };

    renderFeed();

    const resetearFormulario = () => {
        if (textoNuevaDuda) textoNuevaDuda.value = "";
        imagenBase64 = "#";
        if (preview) { preview.src = ""; preview.style.display = "none"; }
        if (dudaFormContainer) dudaFormContainer.classList.add("d-none");
        if (selectEspecialidad) selectEspecialidad.value = "";

        if (btnPublicarDudaCard) {
            btnPublicarDudaCard.innerHTML = `<i class="fa-solid fa-paper-plane me-2"></i>Publicar en Tiempo Real`;
            btnPublicarDudaCard.dataset.editId = "";
        }
    };

    if (btnCancelarDuda) {
        btnCancelarDuda.addEventListener("click", resetearFormulario);
    }

    if (toggleDudaForm && dudaFormContainer) {
        toggleDudaForm.addEventListener("click", () => {
            dudaFormContainer.classList.toggle("d-none");
            if (!dudaFormContainer.classList.contains("d-none") && textoNuevaDuda) textoNuevaDuda.focus();
        });
    }

    // --- ACCIÓN DEL BOTÓN PRINCIPAL (PUBLICAR O GUARDAR EDICIÓN) ---
    if (btnPublicarDudaCard) {
        btnPublicarDudaCard.addEventListener("click", () => {
            if (!textoNuevaDuda) return;

            const descripcionDuda = textoNuevaDuda.value.trim();
            if (descripcionDuda === "") {
                mostrarAlerta("Por favor, escribe el contenido de la publicación.");
                return;
            }

            // Recuperar datos de la sesión activa
            const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
            const nombreFinal = usuarioLogueado ? usuarioLogueado.nombre : (localStorage.getItem("nombreUsuario") || "Usuario");
            
            // Obtener la especialidad seleccionada (para JPA) u obtenerla del localStorage de respaldo
            let especialidadId = selectEspecialidad ? selectEspecialidad.value : null;
            let especialidadObj = null;

            if (especialidadId) {
                especialidadObj = especialidadesDisponibles.find(e => e.id == especialidadId);
            } else if (usuarioLogueado && usuarioLogueado.especialidad) {
                especialidadObj = typeof usuarioLogueado.especialidad === 'object' 
                    ? usuarioLogueado.especialidad 
                    : { id: 1, especialidad: usuarioLogueado.especialidad };
            } else {
                especialidadObj = { id: 1, especialidad: "Sin especialidad" };
            }

            const idEdicion = btnPublicarDudaCard.dataset.editId;

            // MODO EDITAR (LOCAL)
            if (idEdicion) {
                testController.editarPost(Number(idEdicion), descripcionDuda, imagenBase64);
                resetearFormulario();
                renderFeed();
                return; // Termina la ejecución de la función aquí
            } 

            // MODO CREAR PUBLICACIÓN (Backend Fetch + Local Fallback)
            const textoOriginalBtn = btnPublicarDudaCard.innerHTML;
            btnPublicarDudaCard.textContent = "Publicando...";
            btnPublicarDudaCard.disabled = true;

            // El backend solo guarda contenido, likes y usuario (ver Publicacion.java)
            const token = localStorage.getItem("token");
            const usuarioId = localStorage.getItem("usuarioId");

            const nuevaPublicacionData = {
                contenido: descripcionDuda,
                likes: 0,
                usuario: { id: Number(usuarioId) }
            };

            fetch(`${BASE_URL}/publicaciones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(nuevaPublicacionData)
            })
            .then(response => {
                if (!response.ok) throw new Error("Error en la respuesta del servidor");
                return response.json();
            })
            .then(() => {
                // El backend no devuelve img/nombre/especialidad, se arma la tarjeta con los datos locales
                testController.addPost(
                    imagenBase64,
                    nombreFinal,
                    especialidadObj,
                    descripcionDuda
                );
                
                const alertContainer = document.getElementById("alertContainer");
                if (alertContainer) alertContainer.innerHTML = "";

                resetearFormulario();
                renderFeed();
            })
            .catch(error => {
                console.error("Error al enviar la publicación:", error);
                mostrarAlerta("No se pudo conectar con el servidor. La publicación se guardó localmente.", "warning");
                
                // Fallback: Guardado offline / LocalStorage directo
                testController.addPost(
                    imagenBase64, 
                    nombreFinal, 
                    especialidadObj, 
                    descripcionDuda
                );
                
                resetearFormulario();
                renderFeed();
            })
            .finally(() => {
                btnPublicarDudaCard.innerHTML = textoOriginalBtn;
                btnPublicarDudaCard.disabled = false;
            });
        });
    }

    // --- LISTENERS DEL FEED (PRODROW) ---
    if (prodRow) {
        prodRow.addEventListener("click", (evento) => {
            if (evento.target.closest("a")) evento.preventDefault();

            const botonLike = evento.target.closest(".btn-like");
            if (botonLike) {
                const idPost = Number(botonLike.dataset.id);
                testController.toggleLike(idPost);
                renderFeed();
                return;
            }

            const botonEliminar = evento.target.closest(".btn-eliminar");
            if (botonEliminar) {
                const idPost = parseInt(botonEliminar.getAttribute("data-id"));
                if (confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
                    testController.eliminarPost(idPost);
                    renderFeed();
                }
                return;
            }

            const botonEditar = evento.target.closest(".btn-editar");
            if (botonEditar) {
                const idPost = Number(botonEditar.dataset.id);
                const post = testController.posts.find(p => p.id === idPost);

                if (!post) return;

                if (dudaFormContainer) dudaFormContainer.classList.remove("d-none");
                if (textoNuevaDuda) textoNuevaDuda.value = post.descripcion;
                imagenBase64 = post.img;

                if (preview) {
                    if (post.img && post.img !== "#") {
                        preview.src = post.img;
                        preview.style.display = "block";
                    } else {
                        preview.src = "";
                        preview.style.display = "none";
                    }
                }

                if (btnPublicarDudaCard) {
                    btnPublicarDudaCard.textContent = "Guardar Cambios";
                    btnPublicarDudaCard.dataset.editId = post.id;
                }

                if (btnCancelarDuda) btnCancelarDuda.classList.remove("d-none");

                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (textoNuevaDuda) textoNuevaDuda.focus();
                return;
            }

            const botonMostrar = evento.target.closest(".btnMostrarComentarios");
            if (botonMostrar) {
                const comentarios = botonMostrar.closest(".post-content").querySelector(".comentarios");
                comentarios.style.display = comentarios.style.display === "none" ? "block" : "none";
                return;
            }

            const botonComentario = evento.target.closest(".btn-comentar");
            if (botonComentario) {
                const idPost = Number(botonComentario.dataset.id);
                const contenedor = botonComentario.closest(".comentarios");
                const input = contenedor.querySelector(".comentario-input");
                const textoComentario = input.value.trim();

                if (textoComentario === "") {
                    mostrarAlerta("Por favor, escribe el contenido del comentario.", "warning");
                    return;
                }

                testController.addComentario(idPost, textoComentario, "Tú");
                input.value = "";
                renderFeed();
                return;
            }
        });
    }
});