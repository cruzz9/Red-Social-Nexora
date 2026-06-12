const header = document.getElementById("header");

header.innerHTML = `
<div class="nav nav-underline">
    <img id="nexoralogo" src="../assets/nexoralogo.png" alt="Logo Nexora">
    <a class="nav-link" href="index.html">Nexora</a>
</div>

<ul id="apages" class="nav nav-underline">
    <li class="nav-item">
        <a class="nav-link" href="index.html">Inicio</a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="#">Perfil</a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="#">Notificaciones</a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="nosotros.html">Nosotros</a>
    </li>

    <li class="nav-item">
        <a class="nav-link" href="contactanos.html">Contáctanos</a>
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

  });


});