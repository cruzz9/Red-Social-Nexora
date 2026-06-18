class PostsController{
    constructor(currentId = 0){    
        this.posts = [ ];
        this.currentId = currentId;    
    }
    addPost(img, nombre, rol, descripcion){
        this.currentId++;
        const newPost = {
            id: this.currentId,
            img: img,
            nombre: nombre,
            rol: rol,
            descripcion: descripcion,
        };
        this.posts.push(newPost);
    
    }
}

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
 
console.log(testController.posts);