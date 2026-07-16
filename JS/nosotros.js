document.addEventListener("DOMContentLoaded", function () {
    function actualizarBotones() {
        const descripciones = document.querySelectorAll(".descripcion");

        descripciones.forEach(function (descripcion) {
            const boton = descripcion.nextElementSibling;

            if (!boton || !boton.classList.contains("ver-mas")) return;

            // Reiniciar estado
            descripcion.classList.remove("expandida");
            boton.textContent = "Ver más";

            // Esperar a que el navegador calcule el tamaño
            requestAnimationFrame(() => {

                if (descripcion.scrollHeight > descripcion.clientHeight + 2) {
                    boton.style.display = "inline-block";
                } else {
                    boton.style.display = "none";
                }
            });
        });
    }

    // Evento de Ver más / Ver menos
    document.querySelectorAll(".ver-mas").forEach(function (boton) {
        boton.addEventListener("click", function (e) {
            e.preventDefault();

            const descripcion = this.previousElementSibling
            descripcion.classList.toggle("expandida");
            if (descripcion.classList.contains("expandida")) {
                this.textContent = "Ver menos";
            } else {
                this.textContent = "Ver más";
            }
        });
    });

    // Primera comprobación
    actualizarBotones();

    // Cuando cambia el carrusel
    document.querySelectorAll(".carousel").forEach(function (carousel) {
        carousel.addEventListener("slid.bs.carousel", function () {
            setTimeout(actualizarBotones, 50);
        });
    });

    // Si cambia el tamaño de la ventana
    window.addEventListener("resize", actualizarBotones);
});