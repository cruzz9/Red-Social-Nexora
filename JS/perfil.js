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

/*POST*/

const tarjeta = document.getElementById("nuevaPublicacion");
const encabezado = document.getElementById("togglePublicacion");


document.querySelector(".btn-publicar").addEventListener("click", () => {

    const texto = document.getElementById("textoPublicacion").value.trim();

    if (texto === "") {
        alert("Escribe una publicación.");
        return;
    }

    publicaciones.unshift({

        usuario: document.getElementById("nombrePerfil").textContent || "Juan Pérez",

        carrera: document.getElementById("carreraPerfil").textContent || "Software Developer",

        texto: texto,

        fecha: "Ahora"

    });

    localStorage.setItem(
        "publicaciones",
        JSON.stringify(publicaciones)
    );

    mostrarPublicaciones();

    document.getElementById("textoPublicacion").value = "";

    tarjeta.classList.remove("activo");

});

encabezado.addEventListener("click", () => {

    tarjeta.classList.toggle("activo");

});

document.querySelector(".btn-cancelar").addEventListener("click",(e)=>{

    e.stopPropagation();

    document.getElementById("textoPublicacion").value="";

    tarjeta.classList.remove("activo");

});

document.querySelector(".post-body").addEventListener("click",(e)=>{

    e.stopPropagation();

});


let publicaciones = JSON.parse(

    localStorage.getItem("publicaciones")

) || [];

if(publicaciones.length===0){

    publicaciones.push(

        {

            usuario:"Juan Pérez",

            carrera:"Software Developer",

            texto:"¡Hola a todos! Bienvenidos a Nexora 🚀",

            fecha:"Hace 5 minutos"

        },

        {

            usuario:"Juan Pérez",

            carrera:"Software Developer",

            texto:"Estoy desarrollando mi primer proyecto usando Spring Boot y Java.",

            fecha:"Hace 2 horas"

        },

        {

            usuario:"Juan Pérez",

            carrera:"Software Developer",

            texto:"¿Qué opinan sobre usar Docker para el desarrollo?",

            fecha:"Ayer"

        }

    );

    localStorage.setItem(

        "publicaciones",

        JSON.stringify(publicaciones)

    );

}

function mostrarPublicaciones(){

    const contenedor=

    document.getElementById(

        "contenedorPublicaciones"

    );

    contenedor.innerHTML="";

    const datosAvatar=

    JSON.parse(

        localStorage.getItem(

            "avatarUsuario"

        )

    );

    let avatar=

    "https://api.dicebear.com/9.x/adventurer/svg?seed=Juan";

    if(datosAvatar){

        avatar=

        `https://api.dicebear.com/9.x/${datosAvatar.estilo}/svg?seed=${datosAvatar.seed}&backgroundColor=${datosAvatar.fondo}`;

    }

    publicaciones.forEach((p,index) => {
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

                            <i class="bi bi-pencil style=color: "red"></i> 

                            ✏️ Editar

                        </button>

                        <button class="eliminar-post">

                            <i class="bi bi-trash"></i>

                            🗑️ Eliminar

                        </button>

                    </div>

                </div>

            </div>

            <div class="publicacion-contenido">
                ${p.texto}
            </div>

            <hr>

            <div class="publicacion-footer">

                <button>
                    <i class="bi bi-hand-thumbs-up"></i>
                    👍
                </button>

                <button>
                    <i class="bi bi-chat"></i>
                    💬
                </button>

            </div>

        </div>
        `;
    });
}

mostrarPublicaciones();

document.addEventListener("click",(e)=>{

    if(e.target.closest(".menu-post")){

        const menu = e.target
        .closest(".menu-container")
        .querySelector(".menu-opciones");

        document
        .querySelectorAll(".menu-opciones")
        .forEach(m=>{

            if(m!==menu){

                m.classList.remove("activo");

            }

        });

        menu.classList.toggle("activo");

    }

    else{

        document
        .querySelectorAll(".menu-opciones")
        .forEach(m=>m.classList.remove("activo"));

    }

});



document.addEventListener("click",(e)=>{

    if(e.target.closest(".eliminar-post")){

        const tarjeta = e.target.closest(".publicacion");

        const id = tarjeta.dataset.id;

        publicaciones.splice(id,1);

        localStorage.setItem(

            "publicaciones",

            JSON.stringify(publicaciones)

        );

        mostrarPublicaciones();

    }

});

document.addEventListener("click",(e)=>{

    if(e.target.closest(".editar-post")){

        const tarjeta = e.target.closest(".publicacion");

        const id = tarjeta.dataset.id;

        document.getElementById("textoPublicacion").value = publicaciones[id].texto;

        tarjetaEditar = id;

        document
        .getElementById("nuevaPublicacion")
        .classList.add("activo");

    }

});

let tarjetaEditar = null;

if(tarjetaEditar!==null){

    publicaciones[tarjetaEditar].texto = texto;

    tarjetaEditar = null;

}else{

    publicaciones.unshift({

        usuario:"Juan Perez",

        carrera:"Software Developer",

        texto:"",

        fecha:"Ahora"

    });

}
