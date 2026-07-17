
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
    }//saveToLocalStorage

    loadPostsFromLocalStorage() {
        const posts = localStorage.getItem("posts");
        if (posts) {
            this.posts = JSON.parse(posts);
            this.currentId = this.posts[this.posts.length - 1].id;

            //Migración básica simplificada (sin especialidades)
            this.posts.forEach(post => {
                // Migración 1: Agregar array de likes si no existe
                if (!post.likes) post.likes = [];

                // Migración 2: Agregar array de comentarios si no existe
                if (!post.comentarios) post.comentarios = [];

                // Migración 3: Convertir comentarios de texto a objetos
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
                    return c; // Si ya es objeto, lo dejamos igual
                });
            });

            this.saveToLocalStorage();
        }
    }//loadPostsFromLocalStorage

    eliminarPost(id) {
        this.posts = this.posts.filter(post => post.id !== id);
        this.saveToLocalStorage();
    }//eliminar post

    editarPost(id, nuevaDescripcion, nuevaImagen) {
        const post = this.posts.find(p => p.id === id);
        if (post) {
            post.descripcion = nuevaDescripcion;
            if (nuevaImagen) {
                post.img = nuevaImagen;
            }
            this.saveToLocalStorage();
        }
    }//editar post

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
    //agregar comentario
    addComentario(id, texto, autor = "Tú") {
        const post = this.posts.find(p => p.id === id);
        if (post) {
            if (!post.comentarios) post.comentarios = [];
            //Se genera el avatar usando el mismo servicio que los posts
            const datosAvatar = JSON.parse(localStorage.getItem("avatarUsuario"));

            let avatarUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${autor}`;

            if (datosAvatar) {
                avatarUrl = `https://api.dicebear.com/9.x/${datosAvatar.estilo}/svg?seed=${datosAvatar.seed}&backgroundColor=${datosAvatar.fondo}`;
            }

            avatar: avatarUrl;

            // Se crea el objeto completo segun el modelo del backend
            const nuevoComentario = {
                comentarioId: Date.now().toString(), // ID único temporal 
                contenido: texto.trim(),
                autor: autor,
                avatar: avatarUrl,
                fechaCreacion: new Date().toISOString(),
                publicacion: { id: post.id } // Referencia a la publicación
            };

            post.comentarios.push(nuevoComentario);
            this.saveToLocalStorage();
        }
    }
} //classPostsController

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



// 4. Renderizado en el DOM al cargar la estructura HTML
document.addEventListener("DOMContentLoaded", () => {
    // Definimos explícitamente prodRow para evitar errores de referencia en el navegador
    const prodRow = document.getElementById("prodRow");

    function obtenerAvatarActual(nombreUsuario) {
        // Obtenemos los datos del usuario logueado actualmente
        const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
        const nombreSesion = usuarioLogueado ? usuarioLogueado.nombre : localStorage.getItem("nombreUsuario");
        
        // Obtenemos los datos visuales del avatar configurado en sesión
        const datosAvatar = JSON.parse(localStorage.getItem("avatarUsuario"));

        // Si el post pertenece al usuario activo (o es marcado como "Tú") Y tiene avatar configurado, lo usamos
        if (datosAvatar && nombreSesion && (nombreUsuario === nombreSesion || nombreUsuario === "Tú")) {
            return `https://api.dicebear.com/9.x/${datosAvatar.estilo}/svg?seed=${datosAvatar.seed}&backgroundColor=${datosAvatar.fondo}`;
        }

        // Para cualquier otro usuario, generamos un avatar único basado en su propio nombre
        const seedUnico = encodeURIComponent(nombreUsuario || "Usuario");
        return `https://api.dicebear.com/9.x/adventurer/svg?seed=${seedUnico}`;
    }

    // Elementos del Formulario Principal (Creación/Edición)
    const toggleDudaForm = document.getElementById("toggleDudaForm");
    const dudaFormContainer = document.getElementById("dudaFormContainer");
    const btnPublicarDudaCard = document.getElementById("btnPublicarDudaCard");
    const btnCancelarDuda = document.getElementById("btnCancelarDuda");
    const textoNuevaDuda = document.getElementById("textoNuevaDuda");
    const preview = document.getElementById("preview");

    // Estado de la imagen en el formulario principal
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
                    
                        <img src="${obtenerAvatarActual(post.nombre)}"
                        class="profile-pic">      
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
                
                // Usamos la misma función de avatares para los comentarios
                const avatar = esObjeto && c.avatar
                    ? c.avatar
                    : obtenerAvatarActual(autor);

                const fecha = esObjeto && c.fechaCreacion
                    ? new Date(c.fechaCreacion).toLocaleString()
                    : '';

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

    // --- FUNCIÓN PARA RESETEAR EL FORMULARIO AL ESTADO INICIAL ---
    const resetearFormulario = () => {
        if (textoNuevaDuda) textoNuevaDuda.value = "";
        imagenBase64 = "#";
        if (preview) { preview.src = ""; preview.style.display = "none"; }
        if (dudaFormContainer) dudaFormContainer.classList.add("d-none");

        // Restauramos el botón a su modo original conservando el icono de FontAwesome
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

    // --- BOTÓN PRINCIPAL: ACCIÓN MIXTA (PUBLICAR O GUARDAR EDICIÓN) ---

    if (btnPublicarDudaCard) {
        btnPublicarDudaCard.addEventListener("click", () => {
            if (!textoNuevaDuda) return;

            const descripcionDuda = textoNuevaDuda.value.trim();
            if (descripcionDuda === "") {
                mostrarAlerta("Por favor, escribe el contenido de la publicación.");
                return;
            }

            // Intentamos obtener el nombre directamente de tu localStorage
            const nombreUsuario = localStorage.getItem("nombreUsuario");
            const carreraUsuario = localStorage.getItem("carreraUsuario") || "Sin especialidad";

            // Si por alguna razón no existen, intentamos buscar en 'usuarioLogueado' (que también se ve en tu captura)
            const usuarioLogueado = JSON.parse(
                localStorage.getItem("usuarioLogueado")
            );

            const nombreFinal = usuarioLogueado
                ? usuarioLogueado.nombre
                : "Usuario";

            const especialidadFinal = usuarioLogueado
                ? usuarioLogueado.especialidad
                : "Sin especialidad";

            // Si de plano no hay rastro de sesión activa, mostramos la alerta
            if (!nombreFinal) {
                mostrarAlerta("No hay un usuario autenticado.");
                return;
            }

            const idEdicion = btnPublicarDudaCard.dataset.editId;

           if (idEdicion) {

                testController.editarPost(
                    Number(idEdicion),
                    descripcionDuda,
                    imagenBase64
                );

            } else {

                const usuarioLogueado = JSON.parse(
                    localStorage.getItem("usuarioLogueado")
                );

                const nombreFinal = usuarioLogueado
                    ? usuarioLogueado.nombre
                    : "Usuario";


                const especialidadFinal = usuarioLogueado
                    ? usuarioLogueado.especialidad
                    : "Sin especialidad";


                testController.addPost(
                    imagenBase64,
                    nombreFinal,
                    especialidadFinal,
                    descripcionDuda
                );
            }
            
            const alertContainer = document.getElementById("alertContainer");
            if (alertContainer) alertContainer.innerHTML = "";

            resetearFormulario();
            renderFeed();
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

            // ACCIÓN: ELIMINAR
            const botonEliminar = evento.target.closest(".btn-eliminar");
            if (botonEliminar) {
                const idPost = parseInt(botonEliminar.getAttribute("data-id"));
                if (confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
                    testController.eliminarPost(idPost);
                    renderFeed();
                }
                return;
            }

            // ACCIÓN: ENVIAR A EDICIÓN (CARGAR EN LA TARJETA DE CREACIÓN SUPERIOR)
            const botonEditar = evento.target.closest(".btn-editar");
            if (botonEditar) {
                const idPost = Number(botonEditar.dataset.id);
                const post = testController.posts.find(p => p.id === idPost);

                if (!post) return;

                // 1. Abrir la tarjeta contenedora de arriba si estaba oculta
                if (dudaFormContainer) dudaFormContainer.classList.remove("d-none");

                // 2. Transferir los datos del post al formulario de creación
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

                // 3. Mutar el botón para que actúe en modo "Guardar"
                if (btnPublicarDudaCard) {
                    btnPublicarDudaCard.textContent = "Guardar Cambios";
                    btnPublicarDudaCard.dataset.editId = post.id;
                }

                // 4. Mostrar botón cancelar por si se arrepiente
                if (btnCancelarDuda) btnCancelarDuda.classList.remove("d-none");

                // 5. Hacer scroll suave hacia arriba
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (textoNuevaDuda) textoNuevaDuda.focus();
                return;
            }

            // MOSTRAR/OCULTAR COMENTARIOS////
            const botonMostrar = evento.target.closest(".btnMostrarComentarios");
            if (botonMostrar) {
                const comentarios = botonMostrar.closest(".post-content").querySelector(".comentarios");
                comentarios.style.display = comentarios.style.display === "none" ? "block" : "none";
                return;
            }

            // PUBLICAR COMENTARIO
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