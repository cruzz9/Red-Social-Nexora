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
        dudas: [] // <- Añadimos esta propiedad para almacenar las dudas
    };
    this.posts.push(newPost);
    this.saveToLocalStorage();;


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
        }
    }//loadPostsFromLocalStorage

    eliminarPost(id) {
        // Mantiene en el arreglo todos los posts MENOS el que coincide con el ID que queremos borrar
        this.posts = this.posts.filter(post => post.id !== id);
        // Guardamos los cambios actualizados en el almacenamiento local
        this.saveToLocalStorage();
    }//eliminar post

    //Buscar el objeto por ID y modificar su descripción
    editarPost(id, nuevaDescripcion) {
        // Buscamos el post exacto en el arreglo
        const post = this.posts.find(p => p.id === id);
        if (post) {
            post.descripcion = nuevaDescripcion;
            this.saveToLocalStorage(); // Guardamos la actualización
        }
    }//editar post


} //classPostsController

// 1. Instanciamos nuestro controlador
const testController = new PostsController();

// 2. Intentamos cargar los posts que ya existan en LocalStorage
testController.loadPostsFromLocalStorage();

// 3. Control de Datos de Prueba (Seeding)
// Si el arreglo sigue vacío tras intentar cargar, significa que es la primera vez que se abre la app.
// Procedemos a precargar los 10 perfiles de muestra.
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
    const alertContainer = 
    document.getElementById("alertContainer");

    if(!alertContainer) return;

    alertContainer.innerHTML =  `
   <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close">
            </button>
        </div>
    `;
}

// 4. Renderizado en el DOM al cargar la estructura HTML
document.addEventListener("DOMContentLoaded", () => {
    const prodRow = document.getElementById("prodRow");
    if (!prodRow) return;

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
                            <div class="name-container">
                                <span class="author-name">${post.nombre}</span>
                                <span class="connection-degree"></span>
                            </div>
                            <p class="author-role">${post.rol}</p>
                            <div class="post-meta">
                                <span class="separator"></span>
                                <span class="privacy-icon"></span>
                            </div>
                        </div>
                        
                        <div class="dropdown" style="position: absolute; top: 15px; right: 15px;"> 
                            <button type="button" class="btnCardOptions" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </button>

                           
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <a class="dropdown-item btn-editar" href="#" data-id="${post.id}">
                                <i class="fa-solid fa-pen me-2"></i> Editar
                                </a>
                            </li>

                            <li>
                                <hr class="dropdown-divider">
                            </li>

                            <li>
                                <a class="dropdown-item text-danger btn-eliminar" href="#" data-id="${post.id}">
                                <i class="fa-solid fa-trash me-2"></i> Eliminar
                                </a>
                            </li>
                        </ul>
                        </div>
                    </div>

                    <div class="post-content">
                        <p>${post.descripcion}</p>
                        
                        ${imagenAdjuntaHtml}
                        
                        <hr>
                        
                        <div class="container d-flex justify-content-end align-items-center gap-2">
                            <button type="button" class="btn btn-outline-primary btnCard"><i class="fa-regular fa-thumbs-up"></i></button>
                            <button type="button" class="btn btn-outline-primary btnCard"><i class="fa-regular fa-comment"></i></button>
                        </div>
                    </div>
                </div>
            `);
        });
    };

    renderFeed();

    if (prodRow) {
        prodRow.addEventListener("click", (evento) => {
            // Evitamos que el enlace '#' recargue o mueva la pantalla hacia arriba
            evento.preventDefault();

            // 1. LÓGICA DE ELIMINACIÓN
            // Buscamos si el usuario hizo clic en el botón Eliminar (o dentro de él)
            const botonEliminar = evento.target.closest(".btn-eliminar");
            if (botonEliminar) {
                const idPost = parseInt(botonEliminar.getAttribute("data-id"));
                
                // Ventana de confirmación pedagógica estándar
                const confirmar = confirm("¿Estás seguro de que deseas eliminar esta publicación?");
                if (confirmar) {
                    testController.eliminarPost(idPost); // Lo borra de la lógica
                    renderFeed(); // Re-renderiza la interfaz al instante
                }
                return;
            }

            // 2. LÓGICA DE EDICIÓN
            // Buscamos si el usuario hizo clic en el botón Editar
            const botonEditar = evento.target.closest(".btn-editar");
            if (botonEditar) {
                const idPost = parseInt(botonEditar.getAttribute("data-id"));
                
                // Obtenemos el post actual para mostrar el texto previo en la alerta
                const postActual = testController.posts.find(p => p.id === idPost);
                
                if (postActual) {
                    // Usamos un prompt interactivo sencillo para actualizar el texto
                    const nuevoTexto = prompt("Edita el contenido de tu publicación:", postActual.descripcion);
                    
                    // Validamos que el usuario no haya cancelado o dejado vacío el campo
                    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
                        testController.editarPost(idPost, nuevoTexto.trim()); // Lo actualiza en la lógica
                        renderFeed(); // Re-renderiza la interfaz al instante
                    }
                }
                return;
            }
        });
    }

    const toggleDudaForm = document.getElementById("toggleDudaForm");
    const dudaFormContainer = document.getElementById("dudaFormContainer");
    const btnPublicarDudaCard = document.getElementById("btnPublicarDudaCard");
    const textoNuevaDuda = document.getElementById("textoNuevaDuda");
    const inputImagen = document.getElementById("imagen");
    const preview = document.getElementById("preview");
    let imagenBase64 = "#";

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

    if (toggleDudaForm && dudaFormContainer) {
        toggleDudaForm.addEventListener("click", () => {
            dudaFormContainer.classList.toggle("d-none");
            if (!dudaFormContainer.classList.contains("d-none") && textoNuevaDuda) {
                textoNuevaDuda.focus();
            }
        });
    }

    const btnCancelarDuda = document.getElementById("btnCancelarDuda");
    if (btnCancelarDuda) {
        btnCancelarDuda.addEventListener("click", () => {
            if (textoNuevaDuda) textoNuevaDuda.value = "";
            imagenBase64 = "#"; 
            if (preview) { preview.src = ""; preview.style.display = "none"; }
            if (inputImagen) inputImagen.value = "";
            if (dudaFormContainer) dudaFormContainer.classList.add("d-none");
        });
    }

    if (btnPublicarDudaCard) {
        btnPublicarDudaCard.addEventListener("click", () => {
            if (!textoNuevaDuda) return;
            
            const descripcionDuda = textoNuevaDuda.value.trim();

            if (descripcionDuda === "") {
                mostrarAlerta("Por favor, escribe tu duda antes de publicar.");
                return;
            }

            document.getElementById("alertContainer").innerHTML="";

            testController.addPost(
                imagenBase64, 
                "Tú", 
                "Duda Pendiente", 
                descripcionDuda
            );

            textoNuevaDuda.value = "";
            imagenBase64 = "#";
            
            if (preview) {
                preview.src = "";
                preview.style.display = "none";
            }
            if (inputImagen) {
                inputImagen.value = "";
            }
            if (dudaFormContainer) {
                dudaFormContainer.classList.add("d-none");
            }

            renderFeed();
        });
    }

});
