class PostsController {
    constructor(currentId = 0) {
        this.posts = [];
        this.currentId = currentId;
    }
    addPost(img, nombre, rol, descripcion) {
        this.currentId++;
        const newPost = {
            id: this.currentId,
            img: img,
            nombre: nombre,
            rol: rol,
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
        
        //Migración: Agregar likes a posts antiguos
        this.posts.forEach(post => {
            if (!post.likes) post.likes = [];
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
            if(nuevaImagen){
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

function mostrarAlerta (mensaje, tipo = "danger"){
    const alertContainer = document.getElementById("alertContainer");
    if(!alertContainer) return;

alertContainer.innerHTML = `
   <div class="alert alert-${tipo} alert-dismissible fade show p-3 w-100 m-1" role="alert">
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
`;

}

// 4. Renderizado en el DOM al cargar la estructura HTML
document.addEventListener("DOMContentLoaded", () => {
    const prodRow = document.getElementById("prodRow");
    if (!prodRow) return;

    // Elementos del Formulario Principal (Creación/Edición)
    const toggleDudaForm = document.getElementById("toggleDudaForm");
    const dudaFormContainer = document.getElementById("dudaFormContainer");
    const btnPublicarDudaCard = document.getElementById("btnPublicarDudaCard");
    const btnCancelarDuda = document.getElementById("btnCancelarDuda");
    const textoNuevaDuda = document.getElementById("textoNuevaDuda");
    const inputImagen = document.getElementById("imagen");
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
                            <p class="author-role">${post.rol}</p>
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
                                ${(post.comentarios ?? []).map(c => `<div class="border rounded p-2 mb-2"><strong>Tú</strong><p class="mb-0">${c}</p></div>`).join("")}
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    };

    renderFeed();

    // --- DETECTOR DE CAMBIO DE IMAGEN EN EL FORMULARIO PRINCIPAL ---
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
    }

    // --- FUNCIÓN PARA RESETEAR EL FORMULARIO AL ESTADO INICIAL ---
    const resetearFormulario = () => {
        if (textoNuevaDuda) textoNuevaDuda.value = "";
        imagenBase64 = "#";
        if (preview) { preview.src = ""; preview.style.display = "none"; }
        if (inputImagen) inputImagen.value = "";
        if (dudaFormContainer) dudaFormContainer.classList.add("d-none");
        
        // Restauramos el botón a modo "Publicar"
        if (btnPublicarDudaCard) {
            btnPublicarDudaCard.textContent = "Publicar";
            btnPublicarDudaCard.dataset.editId = "";
        }
        if (btnCancelarDuda) btnCancelarDuda.classList.add("d-none");
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

            const idEdicion = btnPublicarDudaCard.dataset.editId;

            if (idEdicion) {
                // MODO EDICIÓN: Actualizamos el post existente
                testController.editarPost(Number(idEdicion), descripcionDuda, imagenBase64);
            } else {
                // MODO CREACIÓN: Añadimos un post nuevo
                testController.addPost(imagenBase64, "Tú", "Duda Pendiente", descripcionDuda);
            }

            const alertContainer = document.getElementById("alertContainer");
            if (alertContainer) alertContainer.innerHTML = "";

            resetearFormulario();
            renderFeed();
        });
    }

    // --- LISTENERS DEL FEED (PRODROW) ---
    prodRow.addEventListener("click", (evento) => {
        if(evento.target.closest("a")) evento.preventDefault();

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

        // MOSTRAR/OCULTAR COMENTARIOS
        const botonMostrar = evento.target.closest(".btnMostrarComentarios");
        if (botonMostrar) {
            const comentarios = botonMostrar.closest(".post-content").querySelector(".comentarios");
            comentarios.style.display = comentarios.style.display === "none" ? "block" : "none";
            return;
        }

        // PUBLICAR COMENTARIO
        const botonComentario = evento.target.closest(".btn-comentar");
        if (botonComentario) {
            const id = Number(botonComentario.dataset.id);
            const post = testController.posts.find(p => p.id === id);
            const contenedor = botonComentario.closest(".comentarios");
            const input = contenedor.querySelector(".comentario-input");
            const texto = input.value.trim();

            if (texto === "") return;
            post.comentarios.push(texto);
            testController.saveToLocalStorage();
            renderFeed();
            return;
        }
    });
});