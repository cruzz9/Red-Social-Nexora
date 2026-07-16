class PostsController {
    constructor(currentId = 0) {
        this.posts = [];
        this.currentId = currentId;
    }

    addPost(img, nombre, especialidad, descripcion) {
        this.currentId++;

        // Ahora sí funcionará, porque el parámetro se llama 'especialidad'
        const especialidadObj = typeof especialidad === 'string'
            ? { id: 0, especialidad: especialidad }
            : especialidad;

        const newPost = {
            id: this.currentId,
            img: img,
            nombre: nombre,
            especialidad: especialidadObj,
            descripcion: descripcion,
            comentarios: [],
            likes: []
        };
        this.posts.push(newPost);
        this.saveToLocalStorage();
    }//addPost


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

            //Migración: Agregar likes, comentarios y especialidad a posts antiguos
            this.posts.forEach(post => {
                // Migración 1: Agregar array de likes si no existe
                if (!post.likes) post.likes = [];

                // Migración 2: Agregar array de comentarios si no existe
                if (!post.comentarios) post.comentarios = [];

                // Migración 3: Agregar especialidad a posts antiguos
                if (!post.especialidad && post.rol) {
                    // Convertir el rol antiguo a objeto de especialidad
                    post.especialidad = {
                        id: 0,
                        especialidad: post.rol
                    };
                } else if (!post.especialidad) {
                    // Si no tiene ni especialidad ni rol, poner "Duda Pendiente"
                    post.especialidad = {
                        id: 0,
                        especialidad: "Duda Pendiente"
                    };
                }

                // Migración 4: Convertir comentarios de texto a objetos
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
            const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${autor}`;

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

//FUNCION PARA CARGAR ESPECIALIDADES

// Variable global para almacenar las especialidades

let especialidadesDisponibles = [];

async function cargarEspecialidades() {
    try {
        // IMPORTANTE: Cambia esta URL por la real de tu backend Spring Boot
        // Ejemplo: 'http://localhost:8080/api/especialidades'
        const response = await fetch('');

        if (response.ok) {
            especialidadesDisponibles = await response.json();
        } else {
            throw new Error("No se pudo conectar al backend");
        }
    } catch (error) {
        console.warn("Usando especialidades de respaldo (Fallback):", error);
        // Fallback por si el backend aún no está corriendo o no tiene el endpoint listo
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
        option.value = esp.id; // Guardamos el ID, que es lo que le gusta a JPA
        option.textContent = esp.especialidad; // Mostramos el nombre
        select.appendChild(option);
    });
}

////////////////////////////////////////////////////////////////////

// 4. Renderizado en el DOM al cargar la estructura HTML
document.addEventListener("DOMContentLoaded", () => {
    const prodRow = document.getElementById("prodRow");
    if (!prodRow) return;

    cargarEspecialidades();

    // Elementos del Formulario Principal (Creación/Edición)
    const toggleDudaForm = document.getElementById("toggleDudaForm");
    const dudaFormContainer = document.getElementById("dudaFormContainer");
    const btnPublicarDudaCard = document.getElementById("btnPublicarDudaCard");
    const btnCancelarDuda = document.getElementById("btnCancelarDuda");
    const textoNuevaDuda = document.getElementById("textoNuevaDuda");
    /* const inputImagen = document.getElementById("imagen"); */
    const preview = document.getElementById("preview");

    // Estado de la imagen en el formulario principal
    let imagenBase64 = "#";

    // --- RENDER FEED ---
    const renderFeed = () => {
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
                    
                    
                    <img src="${(post.img && post.img.startsWith('https://api.dicebear.com')) ? post.img : 'https://api.dicebear.com/7.x/bottts/svg?seed=' + post.nombre}" alt="Foto de perfil" class="profile-pic">
                            <div class="author-info">
                            <div class="name-container"><span class="author-name">${post.nombre}</span></div>
                           
                            <p class="author-role" style="color: #38bdf8; font-weight: 500;">
                                ${post.especialidad ? (typeof post.especialidad === 'object' ? post.especialidad.especialidad : post.especialidad) : 'Duda Pendiente'}
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
                const seed = encodeURIComponent(autor);
                const avatar = esObjeto && c.avatar
                    ? c.avatar
                    : `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
                const fecha = esObjeto && c.fechaCreacion
                    ? new Date(c.fechaCreacion).toLocaleString()
                    : '';

                return `
                                    <div class="d-flex mb-3">
                                        <img src="${avatar}" alt="${autor}" class="rounded-circle me-2" style="width: 35px; height: 35px; object-fit: cover;" onerror="this.src='https://api.dicebear.com/7.x/bottts/svg?seed=${seed}'">
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

    // --- DETECTOR DE CAMBIO DE IMAGEN EN EL FORMULARIO PRINCIPAL ---
    //maneja la selección de un archivo de imagen
    /*
    if (inputImagen) {
        inputImagen.addEventListener("change", function() {
            const archivo = this.files[0];
            if (archivo) {
                if (preview) {
                    preview.src = URL.createObjectURL(archivo);
                    preview.style.display = "block";
                }
                const reader = new FileReader();
                reader.onloadend = function() {
                    imagenBase64 = reader.result; 
                };
                reader.readAsDataURL(archivo);
            }
        });
    } */
    ////////////////////////////////////////////////////////////////

    // --- FUNCIÓN PARA RESETEAR EL FORMULARIO AL ESTADO INICIAL ---
    const resetearFormulario = () => {
        if (textoNuevaDuda) textoNuevaDuda.value = "";
        imagenBase64 = "#";
        if (preview) { preview.src = ""; preview.style.display = "none"; }
        if (inputImagen) inputImagen.value = "";
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

            // 1. Obtener el ID seleccionado
            const idEspecialidadSeleccionada = document.getElementById("especialidadUsuario").value;

            // 2. Buscar el objeto completo en nuestro array
            const especialidadObj = especialidadesDisponibles.find(e => e.id == idEspecialidadSeleccionada);

            if (!especialidadObj) {
                mostrarAlerta("Por favor, selecciona una especialidad válida.", "warning");
                return;
            }

            const idEdicion = btnPublicarDudaCard.dataset.editId;

            if (idEdicion) {
                // MODO EDICIÓN
                testController.editarPost(Number(idEdicion), descripcionDuda, imagenBase64);
            } else {
                // MODO CREACIÓN: Pasamos el objeto especialidad completo
                testController.addPost(imagenBase64, "Tú", especialidadObj, descripcionDuda);

                // NOTA PARA EL FUTURO: Cuando se conecte esto al backend real, 
                // en lugar de testController.addPost, haremos un fetch POST enviando:
                // { img: imagenBase64, nombre: "Tú", especialidadId: especialidadObj.id, descripcion: descripcionDuda }
            }

            const alertContainer = document.getElementById("alertContainer");
            if (alertContainer) alertContainer.innerHTML = "";

            resetearFormulario();
            renderFeed();
        });
    }

    // --- LISTENERS DEL FEED (PRODROW) ---
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
        // Aqui es donde liz puede hacer la lógica para publicar comentarios, pero la dejó comentada para que no se ejecute automáticamente.
        // 6. PUBLICAR COMENTARIO
        // Detectamos si el clic fue en un botón de publicar comentario
        // Esto se hace para que no se ejecute la lógica de publicar comentario al hacer clic en cualquier otro lugar del feed
        // y solo se ejecute cuando se haga clic en el botón específico de publicar comentario.

        // PUBLICAR COMENTARIO
        const botonComentario = evento.target.closest(".btn-comentar");
        if (botonComentario) {
            const idPost = Number(botonComentario.dataset.id);
            const contenedor = botonComentario.closest(".comentarios");
            const input = contenedor.querySelector(".comentario-input");
            const textoComentario = input.value.trim();

            if (textoComentario === "") {
                // función de alerta personalizada 
                mostrarAlerta("Por favor, escribe el contenido del comentario.", "warning");
                return;
            }

            // Enviamos el autor "Tú" 
            testController.addComentario(idPost, textoComentario, "Tú");

            // Se limpia el input después de publicar para que no quede el texto escrito
            input.value = "";

            renderFeed();
            return;
        }

    });
});