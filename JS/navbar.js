const header = document.getElementById("header");

header.innerHTML = `
<div class="nav nav-underline logo">
    <img id="nexoralogo" src="./assets/nexoralogo.png" alt="Logo Nexora">
    <a class="nav-link" href="index.html">Nexora</a>
    <button id="btnMenu" class="hamburger">
        ☰
    </button>
</div>

<ul id="apages" class="nav nav-underline">
    <li class="nav-item">
        <a class="nav-link" href="index.html">Inicio</a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="perfil.html">Perfil</a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="publicaciones.html">Publicaciones</a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="nosotros.html">Nosotros</a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="contactanos.html">Contáctanos</a>
    </li>
    
    <li class="nav-item">
        <a class="nav-link" href="login.html">Log in</a>
    </li>
</ul>
`;

window.addEventListener("DOMContentLoaded", () => {

  const links = document.querySelectorAll(".nav-link");

  const currentPath = window.location.pathname.split("/").pop();

  links.forEach(link => {
    link.classList.remove("nav-active");
  });


  links.forEach(link => {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPath) {
      link.classList.add("nav-active");
    }   

    const btnMenu = document.getElementById("btnMenu");
    const apages = document.getElementById("apages");

    btnMenu.addEventListener("click", () => {
        apages.classList.toggle("active");
    });

  });


});