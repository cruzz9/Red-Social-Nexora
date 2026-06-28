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

// 4. Renderizado en el DOM al cargar la estructura HTML
document.addEventListener("DOMContentLoaded", () => {
    const prodRow = document.getElementById("prodRow");
    if (!prodRow) return;
    
    // Limpiamos el contenedor por seguridad
    prodRow.innerHTML = "";

    // Iteramos sobre nuestra fuente de verdad (que ahora incluye persistencia JSON)
    testController.posts.forEach((post) => {
        prodRow.insertAdjacentHTML('beforeend', `  
            <div class="post-card m-2" style="position: relative;"> 
                <div class="post-header">
                    <img src="${post.img !== '#' ? post.img : 'https://api.dicebear.com/7.x/bottts/svg?seed=' + post.nombre}" alt="Foto de perfil" class="profile-pic">
                    <div class="author-info">
                        <div class="name-container">
                            <span class="author-name">${post.nombre}</span>
                        </div>
                        <p class="author-role">${post.rol}</p>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.descripcion}</p>
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
   