const header = document.getElementById("header");


header.innerHTML = `<div class="nav nav-underline">
        <img id="nexoralogo" src="../assets/nexoralogo.png" alt="Logo Nexora" width="60px" height="60px">
        <a class="nav-link buttonactive" href="#">Nexora</a>

      </div>

      <div id="apages" class="nav nav-underline" >
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#">Inicio</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Perfil</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Notificaciones</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Nosotros</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Contáctanos</a>
        </li>
        </div>`;

      

window.addEventListener("DOMContentLoaded", () => {

  const links = document.querySelectorAll(".nav-link");

  const currentPath = window.location.pathname.split("/").pop();

  links.forEach(link => {
    link.classList.remove("active");
  });


  links.forEach(link => {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPath) {
      link.classList.add("active");
    }

  });


});