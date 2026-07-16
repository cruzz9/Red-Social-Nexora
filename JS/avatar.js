/*AVATAR*/
const modal =
document.getElementById("modalAvatar");

const boton =
document.getElementById("editarAvatar");

const preview =
document.getElementById("previewAvatar");

const estilo =
document.getElementById("estilo");

const fondo =
document.getElementById("fondo");

const seed =
document.getElementById("seed");

const datos=

JSON.parse(

    localStorage.getItem("avatarUsuario")

);

if(datos){

    seed.value=datos.seed;

    estilo.value=datos.estilo;

    fondo.value=datos.fondo;

    actualizarAvatar();

    document
    .getElementById("fotoPerfil")
    .src=preview.src;

}

boton.onclick=()=>{

    modal.style.display="flex";

    actualizarAvatar();

}

cerrarAvatar.onclick=()=>{

    modalAvatar.style.display="none";

}

cancelarAvatar.onclick=()=>{

    modalAvatar.style.display="none";

}

function actualizarAvatar(){

    const url=

    `https://api.dicebear.com/9.x/${estilo.value}/svg?seed=${seed.value}&backgroundColor=${fondo.value}`;

    preview.src=url;

}

generarAvatar.onclick=()=>{

    seed.value=Math.random().toString(36).substring(2,10);

    actualizarAvatar();

}

estilo.onchange=actualizarAvatar;

fondo.onchange=actualizarAvatar;

seed.oninput=actualizarAvatar;

document
.getElementById("guardarAvatar")
.onclick=()=>{

    const avatar={

    seed:seed.value,

    estilo:estilo.value,

    fondo:fondo.value

    };

    localStorage.setItem(

    "avatarUsuario",

    JSON.stringify(avatar)

    );

    document
    .getElementById("fotoPerfil")
    .src=preview.src;

    modal.style.display="none";

}