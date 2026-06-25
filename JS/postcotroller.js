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
        }
    }//loadPostsFromLocalStorage


} //classPostsController

const testController = new PostsController();
testController.addPost(
    "#",
    "Raul",
    "Developer Jr.",
    "Me gusta trabajar en equipo",
);

testController.addPost(
    "#",
    "Ana",
    "UX/UI Designer",
    "Apasionada por crear experiencias digitales accesibles y centradas en el usuario."
);

testController.addPost(
    "#",
    "Carlos",
    "Backend Developer",
    "Especializado en construir APIs robustas y optimizar bases de datos con Node.js."
);

testController.addPost(
    "#",
    "Sofía",
    "Scrum Master",
    "Me encanta facilitar la comunicación en los equipos y optimizar los flujos de trabajo con metodologías ágiles."
);

testController.addPost(
    "#",
    "Diego",
    "Data Analyst",
    "Transformando datos complejos en historias visuales y decisiones estratégicas."
);

testController.addPost(
    "#",
    "Elena",
    "QA Engineer",
    "Siempre en busca de la excelencia en el software, asegurando que cada línea de código sea impecable."
);

testController.addPost(
    "#",
    "Miguel",
    "DevOps Engineer",
    "Automatizando despliegues y conectando el desarrollo con operaciones de forma eficiente."
);

testController.addPost(
    "#",
    "Laura",
    "Product Manager",
    "Definiendo la visión del producto y colaborando con ingeniería para dar vida a grandes ideas."
);

testController.addPost(
    "#",
    "Javier",
    "Cybersecurity Specialist",
    "Protegiendo la infraestructura digital y promoviendo buenas prácticas de seguridad en el código."
);

testController.addPost(
    "#",
    "Valeria",
    "Cloud Engineer",
    "Diseñando arquitecturas escalables y gestionando servicios en la nube para proyectos de alto impacto."
);

document.addEventListener("DOMContentLoaded", () => {

    const prodRow = document.getElementById("prodRow");
    if (!prodRow) return;
    prodRow.innerHTML = "";

    testController.posts.forEach((post) => {
        prodRow.insertAdjacentHTML('beforeend', `  
            <div class="post-card m-2" style="position: relative;"> <div class="post-header">
        <img src="${post.img !== '#' ? post.img : 'https://api.dicebear.com/7.x/bottts/svg?seed=' + post.nombre}" alt="Foto de perfil" class="profile-pic">

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
         <button type="button" class="btnCardOptions" data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </button>



            <ul class="dropdown-menu dropdown-menu-end">
                <li>
                    <a class="dropdown-item" href="#">
                        <i class="fa-solid fa-pen me-2"></i> Editar
                    </a>
                </li>

                <li>
                    <hr class="dropdown-divider">
                </li>

                <li>
                    <a class="dropdown-item text-danger" href="#">
                        <i class="fa-solid fa-trash me-2"></i> Eliminar
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <div class="post-content">
        <p>
            ${post.descripcion}
        </p>
        <div class="container d-flex containerImage containerImageOculte">
            <img class="imageCard" src="..." alt="image">
        </div>
        <hr>
        <div class="container d-flex justify-content-end">
            <button type="button" class="btn btn-outline-primary btnCard"><i class="fa-regular fa-thumbs-up"></i></button>
            <button type="button" class="btn btn-outline-primary btnCard"><i class="fa-regular fa-comment"></i></button>
        </div>
    </div>
</div>
        `);
    });
});